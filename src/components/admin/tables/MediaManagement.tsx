import React, { useState } from 'react';
import { 
  Upload, 
  Trash2, 
  RefreshCw, 
  Image as ImageIcon, 
  Eye, 
  X, 
  Plus, 
  Check, 
  Copy, 
  FolderKanban, 
  User, 
  Compass, 
  Code2, 
  Cpu, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import juanImg from '../../../assets/juan.jpg';
import visionEstoniaImg from '../../../assets/vision-estonia.jpg';
import contactCodeImg from '../../../assets/contact-code.jpg';
import contactTechImg from '../../../assets/contact-tech.jpg';
import type { Project } from '../../../types/database';

// Importar automáticamente las 18 fotos del hero desde src/assets/hero-*.jpg
const heroImageModules = import.meta.glob<{ default: string }>('../../../assets/hero-*.{jpg,jpeg,png,webp}', { eager: true });

export const defaultHeroList = Object.entries(heroImageModules)
  .sort(([pathA], [pathB]) => {
    const numA = parseInt(pathA.match(/hero-(\d+)/)?.[1] || '0', 10);
    const numB = parseInt(pathB.match(/hero-(\d+)/)?.[1] || '0', 10);
    return numA - numB;
  })
  .map(([path, mod], idx) => ({
    id: idx + 1,
    url: typeof mod === 'string' ? mod : mod.default,
    fileName: path.split('/').pop() || `hero-${idx + 1}.jpg`,
    title: `Foto #${String(idx + 1).padStart(2, '0')}`,
  }));

interface MediaManagementProps {
  mediaContent: Record<string, string>;
  projects?: Project[];
  isUploading: boolean;
  onUploadImage: (file: File, key: string) => Promise<void> | void;
  onResetImage: (key: string) => void;
  onAddHeroBackground: (file: File) => Promise<void> | void;
  onDeleteHeroBackground: (index: number) => void;
  isUploadModalOpen?: boolean;
  setIsUploadModalOpen?: (open: boolean) => void;
}

const MediaManagement: React.FC<MediaManagementProps> = ({
  mediaContent,
  projects = [],
  isUploading,
  onUploadImage,
  onResetImage,
  onAddHeroBackground,
  onDeleteHeroBackground,
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<string>('all');
  const [previewLightboxUrl, setPreviewLightboxUrl] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Lista activa de imágenes del hero (personalizadas desde Supabase o las 18 por defecto)
  let activeHeroBgs: { url: string; title: string; isCustom: boolean }[] = [];
  try {
    if (mediaContent['image_hero_backgrounds']) {
      const parsed = JSON.parse(mediaContent['image_hero_backgrounds']);
      if (Array.isArray(parsed) && parsed.length > 0) {
        activeHeroBgs = parsed.map((url: string, idx: number) => ({
          url,
          title: `Foto #${String(idx + 1).padStart(2, '0')}`,
          isCustom: true,
        }));
      }
    }
  } catch {
    // Usar lista por defecto si falla el parseo
  }

  if (activeHeroBgs.length === 0) {
    activeHeroBgs = defaultHeroList.map((item) => ({
      url: item.url,
      title: item.title,
      isCustom: false,
    }));
  }

  const profileImg = mediaContent['image_about_profile'] || juanImg;
  const isCustomProfile = Boolean(mediaContent['image_about_profile']);

  const visionImg = mediaContent['image_vision_scenic'] || visionEstoniaImg;
  const isCustomVision = Boolean(mediaContent['image_vision_scenic']);

  const contactCode = mediaContent['image_contact_code'] || contactCodeImg;
  const isCustomContactCode = Boolean(mediaContent['image_contact_code']);

  const contactTech = mediaContent['image_contact_tech'] || contactTechImg;
  const isCustomContactTech = Boolean(mediaContent['image_contact_tech']);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyFeedback(url);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (key === 'hero') {
        onAddHeroBackground(file);
      } else {
        onUploadImage(file, key);
      }
    }
  };

  return (
    <div className="media-sections-root">
      {/* Cabecera del Gestor de Secciones */}
      <div className="media-main-header">
        <div className="media-title-group">
          <span className="media-main-kicker">GESTIÓN MULTIMEDIA POR SECCIONES</span>
          <h2>Imágenes y Recursos Visuales de la Landing</h2>
          <p>
            Cada sección cuenta con su propio panel independiente para subir, cambiar o restablecer imágenes en tiempo real.
          </p>
        </div>

        {/* Barra de Filtros Rápida */}
        <div className="media-nav-filters">
          <button 
            className={`media-filter-tab-btn ${activeFilterTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilterTab('all')}
          >
            <span>Todas las Secciones</span>
          </button>
          <button 
            className={`media-filter-tab-btn ${activeFilterTab === 'hero' ? 'active' : ''}`}
            onClick={() => setActiveFilterTab('hero')}
          >
            <span>01 · Hero / Portada ({activeHeroBgs.length})</span>
          </button>
          <button 
            className={`media-filter-tab-btn ${activeFilterTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveFilterTab('about')}
          >
            <span>02 · Sobre Mí (1)</span>
          </button>
          <button 
            className={`media-filter-tab-btn ${activeFilterTab === 'vision' ? 'active' : ''}`}
            onClick={() => setActiveFilterTab('vision')}
          >
            <span>03 · Visión Estonia (1)</span>
          </button>
          <button 
            className={`media-filter-tab-btn ${activeFilterTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveFilterTab('contact')}
          >
            <span>04 · Contacto (2)</span>
          </button>
          {projects.length > 0 && (
            <button 
              className={`media-filter-tab-btn ${activeFilterTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('projects')}
            >
              <span>05 · Proyectos ({projects.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECCIÓN 01: HERO & PORTADA PRINCIPAL (18 FOTOS PANORÁMICAS)
          ========================================================================= */}
      {(activeFilterTab === 'all' || activeFilterTab === 'hero') && (
        <section className="section-media-panel">
          <div className="section-panel-header">
            <div className="section-panel-info">
              <span className="panel-kicker">SECCIÓN 01 · HERO & PORTADA PRINCIPAL</span>
              <div className="panel-title-row">
                <h3>Fondos Panorámicos Rotativos de la Portada</h3>
                <span className="panel-count-subtle">
                  {activeHeroBgs.length} fotos activas
                </span>
              </div>
              <p>
                Imágenes en alta resolución que rotan automáticamente cada 6 segundos en la cabecera principal de la web.
                Formato recomendado: <strong>16:9 Panorámica (1920x1080)</strong>.
              </p>
            </div>

            <div className="section-panel-actions">
              <label className="btn btn-primary panel-upload-btn">
                <Plus size={16} strokeWidth={2.5} />
                <span>{isUploading ? 'Subiendo...' : 'Agregar Nueva Foto al Hero'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => handleFileInputChange(e, 'hero')} 
                  disabled={isUploading} 
                  hidden 
                />
              </label>

              {Boolean(mediaContent['image_hero_backgrounds']) && (
                <button
                  className="btn btn-secondary panel-reset-btn"
                  onClick={() => onResetImage('image_hero_backgrounds')}
                  title="Restablecer a las 18 fotos originales por defecto"
                >
                  <RefreshCw size={14} />
                  <span>Restablecer las 18 Originales</span>
                </button>
              )}
            </div>
          </div>

          {/* Cuadrícula de fotos del hero */}
          <div className="hero-photos-grid">
            {activeHeroBgs.map((item, idx) => (
              <div key={idx} className="photo-card-item">
                <div className="photo-thumb-container" onClick={() => setPreviewLightboxUrl(item.url)}>
                  <img src={item.url} alt={item.title} className="photo-img" />
                  <div className="photo-thumb-overlay">
                    <span className="overlay-zoom-tag"><Eye size={14} /> Ver HD</span>
                  </div>
                  <span className="photo-index-pill">#{String(idx + 1).padStart(2, '0')}</span>
                </div>

                <div className="photo-card-footer">
                  <div className="photo-meta">
                    <span className="photo-title-label">{item.title}</span>
                    <span className="photo-sub-label">Fondo Rotativo</span>
                  </div>

                  <div className="photo-actions-group">
                    <button 
                      className="photo-action-icon" 
                      onClick={() => handleCopyLink(item.url)}
                      title="Copiar enlace público de la imagen"
                    >
                      {copyFeedback === item.url ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                    </button>
                    <button 
                      className="photo-action-icon delete" 
                      onClick={() => onDeleteHeroBackground(idx)}
                      title="Eliminar esta foto de la rotación"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECCIÓN 02: SOBRE MÍ (FOTO DE PERFIL PRINCIPAL)
          ========================================================================= */}
      {(activeFilterTab === 'all' || activeFilterTab === 'about') && (
        <section className="section-media-panel">
          <div className="section-panel-header">
            <div className="section-panel-info">
              <span className="panel-kicker">SECCIÓN 02 · SOBRE MÍ</span>
              <div className="panel-title-row">
                <h3>Foto de Perfil Principal</h3>
                {isCustomProfile ? (
                  <span className="panel-count-subtle active">
                    Personalizada
                  </span>
                ) : (
                  <span className="panel-count-subtle">
                    Foto Original (juan.jpg)
                  </span>
                )}
              </div>
              <p>
                Tu fotografía profesional mostrada en la tarjeta de presentación personal de la sección Sobre Mí.
                Formato recomendado: <strong>1:1 Cuadrada o Vertical (800x800)</strong>.
              </p>
            </div>

            <div className="section-panel-actions">
              <label className="btn btn-primary panel-upload-btn">
                <Plus size={16} strokeWidth={2.5} />
                <span>{isUploading ? 'Subiendo...' : 'Agregar Nueva Imagen de Perfil'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => handleFileInputChange(e, 'image_about_profile')} 
                  disabled={isUploading} 
                  hidden 
                />
              </label>

              {isCustomProfile && (
                <button
                  className="btn btn-secondary panel-reset-btn"
                  onClick={() => onResetImage('image_about_profile')}
                  title="Restablecer a la foto original (juan.jpg)"
                >
                  <RefreshCw size={14} />
                  <span>Restablecer Original</span>
                </button>
              )}
            </div>
          </div>

          <div className="single-photo-preview-card">
            <div className="single-thumb-wrapper profile-shape" onClick={() => setPreviewLightboxUrl(profileImg)}>
              <img src={profileImg} alt="Foto de Perfil" className="single-preview-img" />
              <div className="photo-thumb-overlay">
                <span className="overlay-zoom-tag"><Eye size={14} /> Ver Ampliada</span>
              </div>
            </div>

            <div className="single-photo-details">
              <div className="detail-row">
                <span className="detail-label">Destino en la Web:</span>
                <span className="detail-value">Tarjeta de Presentación · Sección Sobre Mí</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Estado de Publicación:</span>
                <span className="detail-value active-status" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={12} color="#38bdf8" />
                  <span>Activa y visible en la landing page</span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Acciones Rápidas:</span>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <label className="btn btn-primary btn-sm-copy" style={{ cursor: 'pointer' }}>
                    <Plus size={13} strokeWidth={2.5} />
                    <span>Subir / Cambiar Imagen</span>
                    <input type="file" accept="image/*" onChange={e => handleFileInputChange(e, 'image_about_profile')} disabled={isUploading} hidden />
                  </label>
                  <button className="btn btn-secondary btn-sm-copy" onClick={() => handleCopyLink(profileImg)}>
                    <Copy size={13} />
                    <span>Copiar URL</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECCIÓN 03: VISIÓN ESTONIA (FOTO PANORÁMICA DE PAISAJE)
          ========================================================================= */}
      {(activeFilterTab === 'all' || activeFilterTab === 'vision') && (
        <section className="section-media-panel">
          <div className="section-panel-header">
            <div className="section-panel-info">
              <span className="panel-kicker">SECCIÓN 03 · VISIÓN ESTONIA</span>
              <div className="panel-title-row">
                <h3>Fotografía Panorámica de Visión</h3>
                {isCustomVision ? (
                  <span className="panel-count-subtle active">
                    Personalizada
                  </span>
                ) : (
                  <span className="panel-count-subtle">
                    Foto Original (vision-estonia.jpg)
                  </span>
                )}
              </div>
              <p>
                Fotografía arquitectónica o paisajística que acompaña la propuesta de valor sobre el ecosistema estonio.
                Formato recomendado: <strong>16:9 Horizontal (1200x800)</strong>.
              </p>
            </div>

            <div className="section-panel-actions">
              <label className="btn btn-primary panel-upload-btn">
                <Plus size={16} strokeWidth={2.5} />
                <span>{isUploading ? 'Subiendo...' : 'Agregar Nueva Imagen de Visión'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => handleFileInputChange(e, 'image_vision_scenic')} 
                  disabled={isUploading} 
                  hidden 
                />
              </label>

              {isCustomVision && (
                <button
                  className="btn btn-secondary panel-reset-btn"
                  onClick={() => onResetImage('image_vision_scenic')}
                  title="Restablecer a la foto original (vision-estonia.jpg)"
                >
                  <RefreshCw size={14} />
                  <span>Restablecer Original</span>
                </button>
              )}
            </div>
          </div>

          <div className="single-photo-preview-card">
            <div className="single-thumb-wrapper scenic-shape" onClick={() => setPreviewLightboxUrl(visionImg)}>
              <img src={visionImg} alt="Foto Visión Estonia" className="single-preview-img" />
              <div className="photo-thumb-overlay">
                <span className="overlay-zoom-tag"><Eye size={14} /> Ver Ampliada</span>
              </div>
            </div>

            <div className="single-photo-details">
              <div className="detail-row">
                <span className="detail-label">Destino en la Web:</span>
                <span className="detail-value">Cabecera de la Sección Visión Estonia</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Estado de Publicación:</span>
                <span className="detail-value active-status" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={12} color="#38bdf8" />
                  <span>Activa y visible en la landing page</span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Acciones Rápidas:</span>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <label className="btn btn-primary btn-sm-copy" style={{ cursor: 'pointer' }}>
                    <Plus size={13} strokeWidth={2.5} />
                    <span>Subir / Cambiar Imagen</span>
                    <input type="file" accept="image/*" onChange={e => handleFileInputChange(e, 'image_vision_scenic')} disabled={isUploading} hidden />
                  </label>
                  <button className="btn btn-secondary btn-sm-copy" onClick={() => handleCopyLink(visionImg)}>
                    <Copy size={13} />
                    <span>Copiar URL</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECCIÓN 04: CONTACTO (COLLAGE MULTIMEDIA: CÓDIGO Y TECNOLOGÍA)
          ========================================================================= */}
      {(activeFilterTab === 'all' || activeFilterTab === 'contact') && (
        <section className="section-media-panel">
          <div className="section-panel-header">
            <div className="section-panel-info">
              <span className="panel-kicker">SECCIÓN 04 · SECCIÓN CONTACTO</span>
              <div className="panel-title-row">
                <h3>Collage Multimedia de Contacto</h3>
                <span className="panel-count-subtle">
                  2 fotos activas
                </span>
              </div>
              <p>
                Las dos imágenes complementarias que forman el collage visual en la sección de contacto: código y tecnología.
              </p>
            </div>

            <div className="section-panel-actions">
              <label className="btn btn-primary panel-upload-btn">
                <Plus size={16} strokeWidth={2.5} />
                <span>{isUploading ? 'Subiendo...' : 'Agregar Foto Código'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => handleFileInputChange(e, 'image_contact_code')} 
                  disabled={isUploading} 
                  hidden 
                />
              </label>

              <label className="btn btn-secondary panel-upload-btn" style={{ background: 'rgba(0,114,206,0.12)', borderColor: 'rgba(0,114,206,0.35)', color: '#38bdf8' }}>
                <Plus size={16} strokeWidth={2.5} />
                <span>{isUploading ? 'Subiendo...' : 'Agregar Foto Tech'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => handleFileInputChange(e, 'image_contact_tech')} 
                  disabled={isUploading} 
                  hidden 
                />
              </label>
            </div>
          </div>

          <div className="contact-collage-grid">
            {/* Tarjeta A: Código */}
            <div className="collage-sub-card">
              <div className="collage-card-head">
                <div className="collage-card-title-col">
                  <span className="collage-slot-tag">TARJETA IZQUIERDA</span>
                  <h4>Imagen de Código de Programación</h4>
                </div>
                {isCustomContactCode && (
                  <span className="panel-count-pill custom-pill"><CheckCircle2 size={12} /> Personalizada</span>
                )}
              </div>

              <div className="collage-thumb-wrapper" onClick={() => setPreviewLightboxUrl(contactCode)}>
                <img src={contactCode} alt="Collage Código" className="collage-preview-img" />
                <div className="photo-thumb-overlay"><Eye size={14} /> Ver HD</div>
              </div>

              <div className="collage-card-actions">
                <label className="btn btn-primary collage-upload-btn">
                  <Plus size={14} strokeWidth={2.5} />
                  <span>{isUploading ? 'Subiendo...' : 'Cambiar Foto Código'}</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleFileInputChange(e, 'image_contact_code')} 
                    disabled={isUploading} 
                    hidden 
                  />
                </label>

                {isCustomContactCode && (
                  <button 
                    className="btn btn-secondary collage-reset-btn"
                    onClick={() => onResetImage('image_contact_code')}
                    title="Restablecer a la foto original"
                  >
                    <RefreshCw size={13} />
                    <span>Restablecer</span>
                  </button>
                )}
              </div>
            </div>

            {/* Tarjeta B: Tecnología */}
            <div className="collage-sub-card">
              <div className="collage-card-head">
                <div className="collage-card-title-col">
                  <span className="collage-slot-tag">TARJETA DERECHA</span>
                  <h4>Imagen de Hardware & Tecnología</h4>
                </div>
                {isCustomContactTech && (
                  <span className="panel-count-pill custom-pill"><CheckCircle2 size={12} /> Personalizada</span>
                )}
              </div>

              <div className="collage-thumb-wrapper" onClick={() => setPreviewLightboxUrl(contactTech)}>
                <img src={contactTech} alt="Collage Tech" className="collage-preview-img" />
                <div className="photo-thumb-overlay"><Eye size={14} /> Ver HD</div>
              </div>

              <div className="collage-card-actions">
                <label className="btn btn-primary collage-upload-btn">
                  <Plus size={14} strokeWidth={2.5} />
                  <span>{isUploading ? 'Subiendo...' : 'Cambiar Foto Tech'}</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleFileInputChange(e, 'image_contact_tech')} 
                    disabled={isUploading} 
                    hidden 
                  />
                </label>

                {isCustomContactTech && (
                  <button 
                    className="btn btn-secondary collage-reset-btn"
                    onClick={() => onResetImage('image_contact_tech')}
                    title="Restablecer a la foto original"
                  >
                    <RefreshCw size={13} />
                    <span>Restablecer</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECCIÓN 05: PROYECTOS (PORTADAS DE PROYECTOS)
          ========================================================================= */}
      {(activeFilterTab === 'all' || activeFilterTab === 'projects') && projects.length > 0 && (
        <section className="section-media-panel">
          <div className="section-panel-header">
            <div className="section-panel-info">
              <span className="panel-kicker">SECCIÓN 05 · PROYECTOS</span>
              <div className="panel-title-row">
                <h3>Imágenes de Proyectos del Portafolio</h3>
                <span className="panel-count-subtle">
                  {projects.length} proyectos con imagen
                </span>
              </div>
              <p>
                Capturas de pantalla y mockups vinculados a tus proyectos principales en la landing page.
              </p>
            </div>
          </div>

          <div className="projects-media-grid">
            {projects.map((proj) => (
              <div key={proj.id} className="project-media-card">
                <div className="project-thumb-wrapper" onClick={() => proj.image_url && setPreviewLightboxUrl(proj.image_url)}>
                  {proj.image_url ? (
                    <img src={proj.image_url} alt={proj.title_es} className="project-preview-img" />
                  ) : (
                    <div className="project-no-img"><ImageIcon size={28} /></div>
                  )}
                  {proj.image_url && (
                    <div className="photo-thumb-overlay"><Eye size={14} /> Ver Portada</div>
                  )}
                  <span className="project-category-tag">{proj.category || 'PROYECTO'}</span>
                </div>

                <div className="project-media-meta">
                  <span className="project-title-name">{proj.title_es}</span>
                  <span className="project-subtitle-desc">{proj.description_short_es || 'Sin descripción'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          LIGHTBOX DE VISTA PREVIA EN PANTALLA COMPLETA
          ========================================================================= */}
      {previewLightboxUrl && (
        <div className="media-lightbox-overlay" onClick={() => setPreviewLightboxUrl(null)}>
          <div className="media-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="media-lightbox-close" onClick={() => setPreviewLightboxUrl(null)}>
              <X size={20} />
            </button>
            <img src={previewLightboxUrl} alt="Vista Ampliada HD" className="lightbox-img" />
          </div>
        </div>
      )}

      <style>{`
        .media-sections-root {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        /* ─── Main Header ─── */
        .media-main-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .media-main-kicker {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #0072ce;
          letter-spacing: 0.1em;
        }

        .media-title-group h2 {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0.25rem 0 0.35rem;
          letter-spacing: -0.02em;
        }

        .media-title-group p {
          color: #94a3b8;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.5;
        }

        /* ─── Nav Filters ─── */
        .media-nav-filters {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .media-filter-tab-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          padding: 0.45rem 1rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .media-filter-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }

        .media-filter-tab-btn.active {
          background: #0072ce;
          border-color: #0072ce;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 114, 206, 0.35);
        }

        /* ─── Section Media Panel ─── */
        .section-media-panel {
          background: rgba(12, 18, 26, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .section-panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section-panel-info {
          max-width: 680px;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .panel-kicker {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #0072ce;
          letter-spacing: 0.08em;
        }

        .panel-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin: 0.15rem 0;
        }

        .panel-title-row h3 {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .panel-count-subtle {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.02em;
        }

        .panel-count-subtle.active {
          color: #38bdf8;
        }

        .section-panel-info p {
          color: #94a3b8;
          font-size: 0.88rem;
          line-height: 1.5;
          margin: 0;
        }

        .section-panel-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .panel-upload-btn {
          background: #0072ce !important;
          color: #ffffff !important;
          font-size: 0.85rem !important;
          padding: 0.6rem 1.25rem !important;
          border-radius: 2rem !important;
          cursor: pointer;
        }

        .panel-reset-btn {
          font-size: 0.8rem !important;
          padding: 0.6rem 1.05rem !important;
          border-radius: 2rem !important;
        }

        /* ─── Hero Photos Grid ─── */
        .hero-photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
          gap: 1.15rem;
        }

        .photo-card-item {
          background: rgba(18, 26, 38, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.25s ease;
        }

        .photo-card-item:hover {
          border-color: rgba(0, 114, 206, 0.45);
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);
        }

        .photo-thumb-container {
          position: relative;
          width: 100%;
          height: 125px;
          cursor: pointer;
          overflow: hidden;
          background: #04080c;
        }

        .photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .photo-thumb-container:hover .photo-img {
          transform: scale(1.06);
        }

        .photo-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(2px);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }

        .photo-thumb-container:hover .photo-thumb-overlay,
        .single-thumb-wrapper:hover .photo-thumb-overlay,
        .collage-thumb-wrapper:hover .photo-thumb-overlay,
        .project-thumb-wrapper:hover .photo-thumb-overlay {
          opacity: 1;
        }

        .overlay-zoom-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(0, 114, 206, 0.9);
          color: #ffffff;
          padding: 0.3rem 0.7rem;
          border-radius: 2rem;
          font-family: var(--font-heading);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .photo-index-pill {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #38bdf8;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 0.4rem;
        }

        .photo-card-footer {
          padding: 0.75rem 0.9rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .photo-meta {
          display: flex;
          flex-direction: column;
        }

        .photo-title-label {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
        }

        .photo-sub-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #64748b;
        }

        .photo-actions-group {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .photo-action-icon {
          width: 28px;
          height: 28px;
          border-radius: 0.45rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .photo-action-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .photo-action-icon.delete:hover {
          background: #ef4444;
          border-color: #ef4444;
          color: #ffffff;
        }

        /* ─── Single Photo Card (Perfil / Visión) ─── */
        .single-photo-preview-card {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: rgba(18, 26, 38, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1.25rem;
          padding: 1.5rem;
          flex-wrap: wrap;
        }

        .single-thumb-wrapper {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #04080c;
          cursor: pointer;
          flex-shrink: 0;
        }

        .single-thumb-wrapper.profile-shape {
          width: 140px;
          height: 140px;
          border-radius: 1.15rem;
        }

        .single-thumb-wrapper.scenic-shape {
          width: 240px;
          height: 140px;
          border-radius: 1.15rem;
        }

        .single-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .single-photo-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          min-width: 250px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .detail-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #64748b;
          min-width: 150px;
        }

        .detail-value {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: #cbd5e1;
        }

        .detail-value.active-status {
          color: #34d399;
          font-family: var(--font-mono);
          font-size: 0.78rem;
        }

        .btn-sm-copy {
          font-size: 0.78rem !important;
          padding: 0.4rem 0.85rem !important;
          border-radius: 2rem !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.4rem !important;
        }

        /* ─── Contact Collage Grid ─── */
        .contact-collage-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .collage-sub-card {
          background: rgba(18, 26, 38, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.25rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .collage-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .collage-slot-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: #c084fc;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.25);
          padding: 0.15rem 0.45rem;
          border-radius: 0.4rem;
          display: inline-block;
          margin-bottom: 0.35rem;
        }

        .collage-card-title-col h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .collage-thumb-wrapper {
          position: relative;
          width: 100%;
          height: 155px;
          border-radius: 0.85rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #04080c;
          cursor: pointer;
        }

        .collage-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .collage-card-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .collage-upload-btn {
          font-size: 0.82rem !important;
          padding: 0.55rem 1rem !important;
          border-radius: 2rem !important;
          flex: 1;
          cursor: pointer;
        }

        .collage-reset-btn {
          font-size: 0.78rem !important;
          padding: 0.55rem 0.85rem !important;
          border-radius: 2rem !important;
        }

        /* ─── Projects Media Grid ─── */
        .projects-media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.25rem;
        }

        .project-media-card {
          background: rgba(18, 26, 38, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.15rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
        }

        .project-thumb-wrapper {
          position: relative;
          width: 100%;
          height: 140px;
          border-radius: 0.75rem;
          overflow: hidden;
          background: #04080c;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
        }

        .project-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .project-no-img {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .project-category-tag {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          background: rgba(0, 0, 0, 0.75);
          color: #60a5fa;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 0.4rem;
        }

        .project-media-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .project-title-name {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 800;
          color: #ffffff;
        }

        .project-subtitle-desc {
          color: #94a3b8;
          font-size: 0.78rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ─── Lightbox Overlay ─── */
        .media-lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          padding: 2rem;
        }

        .media-lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.95);
        }

        .media-lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .media-lightbox-close:hover {
          background: #ef4444;
          border-color: #ef4444;
        }

        .lightbox-img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default MediaManagement;
