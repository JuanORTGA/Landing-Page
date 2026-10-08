import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../services/supabase';
import { Save, Loader2, Monitor, Smartphone, Tablet, AlertCircle } from 'lucide-react';

interface PageContent {
  key: string;
  content_es: string;
  content_en: string;
  content_et: string;
}

interface LiveContentStudioProps {
  contents: PageContent[];
  onUpdate: (updatedContent: PageContent) => void;
  showToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const translateText = async (text: string, langPair: string) => {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    const data = await res.json();
    return data?.responseData?.translatedText || text;
  } catch {
    return text;
  }
};

const LiveContentStudio: React.FC<LiveContentStudioProps> = ({ contents: _contents, onUpdate, showToast }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [deviceSize, setDeviceSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'LIVE_UPDATE') {
        const { key, value } = event.data;
        setPendingChanges(prev => ({ ...prev, [key]: value }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSaveAll = async () => {
    const keys = Object.keys(pendingChanges);
    if (keys.length === 0) return;
    
    setIsSaving(true);
    let successCount = 0;
    const errors: string[] = [];

    try {
      for (const key of keys) {
        const esText = pendingChanges[key];
        
        // Auto-traducción a EN y ET con fallback a texto en español si falla
        let enText = esText;
        let etText = esText;
        try {
          enText = await translateText(esText, 'es|en');
          etText = await translateText(esText, 'es|et');
        } catch {
          // Fallback silencioso
        }

        // 1. Intentar actualizar directamente por clave (muy seguro con PostgreSQL RLS)
        const { data: updatedData, error: updateError } = await supabase
          .from('page_content')
          .update({
            content_es: esText,
            content_en: enText || esText,
            content_et: etText || esText
          })
          .eq('key', key)
          .select();

        let finalSaved: PageContent | null = (updatedData && updatedData.length > 0) ? updatedData[0] : null;

        // 2. Si no existía aún en la base de datos, ejecutar upsert
        if (updateError || !finalSaved) {
          const { data: upsertData, error: upsertError } = await supabase
            .from('page_content')
            .upsert({
              key,
              content_es: esText,
              content_en: enText || esText,
              content_et: etText || esText
            }, { onConflict: 'key' })
            .select();

          if (upsertError) {
            console.error(`Error guardando ${key}:`, upsertError);
            errors.push(`${key}: ${upsertError.message}`);
          } else if (upsertData && upsertData.length > 0) {
            finalSaved = upsertData[0];
          }
        }

        if (finalSaved) {
          successCount++;
          onUpdate(finalSaved);
          // Actualizar el iframe en vivo
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage({
              type: 'UPDATE_TRANSLATION',
              key,
              updates: { content_es: esText, content_en: enText, content_et: etText }
            }, '*');
          }
        }
      }

      if (successCount > 0) {
        setPendingChanges({});
        if (showToast) {
          showToast(`¡${successCount} texto(s) guardado(s) y publicados con éxito en la landing!`, 'success');
        }
      }

      if (errors.length > 0 && showToast) {
        showToast(`Error al guardar: ${errors.join(', ')}`, 'error');
      }
    } catch (err: any) {
      console.error("Error guardando:", err);
      if (showToast) {
        showToast(err.message || 'Error al guardar los textos', 'error');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const getWidth = () => {
    if (deviceSize === 'mobile') return '375px';
    if (deviceSize === 'tablet') return '768px';
    return '100%';
  };

  const hasChanges = Object.keys(pendingChanges).length > 0;

  return (
    <div className="live-studio-container">
      {/* Panel: Live Preview */}
      <div className="live-preview-wrapper">
        <div className="preview-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="toolbar-title">Estudio WYSIWYG en Vivo</span>
            {hasChanges && (
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                <AlertCircle size={14} color="#38bdf8" /> Cambios pendientes de guardar
              </span>
            )}
          </div>
          
          <div className="device-toggles" style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              className="btn-save-live" 
              onClick={handleSaveAll} 
              disabled={!hasChanges || isSaving}
              style={{ marginRight: '1rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}
            >
              {isSaving ? <Loader2 size={14} className="spin" /> : <Save size={14} />}
              {isSaving ? 'Traduciendo...' : 'Guardar y Traducir'}
            </button>
            <button className={`device-btn ${deviceSize === 'desktop' ? 'active' : ''}`} onClick={() => setDeviceSize('desktop')}><Monitor size={16} /></button>
            <button className={`device-btn ${deviceSize === 'tablet' ? 'active' : ''}`} onClick={() => setDeviceSize('tablet')}><Tablet size={16} /></button>
            <button className={`device-btn ${deviceSize === 'mobile' ? 'active' : ''}`} onClick={() => setDeviceSize('mobile')}><Smartphone size={16} /></button>
          </div>
        </div>
        <div className="preview-frame-container">
          <iframe 
            ref={iframeRef}
            src="/" 
            className="live-iframe"
            style={{ width: getWidth(), transition: 'width 0.3s ease' }}
            title="Live Preview"
          />
        </div>
      </div>

      <style>{`
        .live-studio-container {
          display: flex;
          height: 100vh;
          background: #060a0e;
          overflow: hidden;
        }

        /* SIDEBAR EDITOR */
        .live-editor-sidebar {
          width: 380px;
          background: #0c131c;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .editor-sidebar-header {
          padding: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .editor-sidebar-header h3 {
          margin: 0 0 0.25rem 0;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
        }
        
        .editor-sidebar-header p {
          margin: 0;
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .editor-keys-list {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        .editor-group {
          margin-bottom: 1.5rem;
        }

        .editor-group-title {
          font-size: 0.75rem;
          color: #38bdf8;
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .editor-key-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          margin-bottom: 0.5rem;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .editor-key-item.active {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.05);
        }

        .editor-key-btn {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 0.75rem 1rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .editor-key-btn:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .key-name {
          font-weight: 600;
          color: #e2e8f0;
          font-size: 0.9rem;
          font-family: monospace;
        }

        .key-preview {
          font-size: 0.8rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .editor-fields-box {
          padding: 1rem;
          border-top: 1px solid rgba(56, 189, 248, 0.2);
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 0.35rem;
        }

        .form-group textarea {
          width: 100%;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          color: #f8fafc;
          padding: 0.65rem;
          font-size: 0.9rem;
          resize: vertical;
          min-height: 60px;
          font-family: inherit;
        }

        .form-group textarea:focus {
          outline: none;
          border-color: #38bdf8;
          box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
        }

        .btn-save-live {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #0072ce;
          color: #ffffff;
          border: 1px solid #38bdf8;
          padding: 0.45rem 1rem;
          border-radius: 2rem;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 114, 206, 0.35);
        }

        .btn-save-live:hover:not(:disabled) {
          background: #0284c7;
          box-shadow: 0 6px 16px rgba(0, 114, 206, 0.5);
          transform: translateY(-1px);
        }

        .btn-save-live:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .live-preview-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #060a0e;
          min-width: 0;
        }

        .preview-toolbar {
          height: 48px;
          background: #0c131c;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
        }

        .toolbar-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #cbd5e1;
        }

        .device-toggles {
          display: flex;
          gap: 0.25rem;
        }

        .device-btn {
          background: none;
          border: none;
          color: #64748b;
          padding: 0.4rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .device-btn:hover {
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.1);
        }

        .device-btn.active {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.15);
        }

        .preview-frame-container {
          flex: 1;
          display: flex;
          justify-content: center;
          padding: 1rem;
          background: #020617;
          overflow: hidden;
        }

        .live-iframe {
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: #ffffff;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

export default LiveContentStudio;
