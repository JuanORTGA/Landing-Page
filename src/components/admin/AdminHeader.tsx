import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { AdminSyncIcon } from './icons/AdminIcons';

interface AdminHeaderProps {
  activeTab: string;
  onNewItem: () => void;
  onSyncData?: () => void;
  isSyncing?: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, onNewItem, onSyncData, isSyncing }) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case 'projects':
        return { kicker: '01 — GESTIÓN DE PROYECTOS', title: 'Portafolio de Proyectos', item: 'Proyecto', showAddBtn: true };
      case 'skills':
        return { kicker: '02 — STACK TECNOLÓGICO', title: 'Habilidades & Tecnologías', item: 'Tecnología', showAddBtn: true };
      case 'experience':
        return { kicker: '03 — TRAYECTORIA', title: 'Experiencia Profesional', item: 'Experiencia', showAddBtn: true };
      case 'education':
        return { kicker: '04 — EDUCACIÓN & CERTS', title: 'Estudios y Certificaciones', item: 'Estudio', showAddBtn: true };
      case 'content':
        return { kicker: '05 — TEXTOS & COPYS', title: 'Textos de la Landing Page', item: 'Texto', showAddBtn: true };
      case 'cvs':
        return { kicker: '06 — CURRICULUM VITAE', title: 'Curriculum Vitae Multilenguaje', item: '', showAddBtn: false };
      case 'media':
        return { kicker: '07 — IMÁGENES & MEDIA', title: 'Gestor de Portadas & Media', item: 'Imagen', showAddBtn: true };
      default:
        return { kicker: 'PANEL DE CONTROL', title: 'Administración', item: '', showAddBtn: false };
    }
  };

  const info = getTabInfo();

  return (
    <header className="admin-header">
      <div className="admin-header-title-group">
        <span className="admin-header-crumb">ADMIN</span>
        <span className="admin-header-sep">/</span>
        <h1 className="admin-header-heading">{info.title}</h1>
      </div>

      <div className="admin-header-actions-group">
        {onSyncData && (
          <button 
            className="btn-header-sync" 
            onClick={onSyncData}
            disabled={isSyncing}
            title="Sincronizar información de la landing page con la base de datos Supabase"
          >
            {isSyncing ? <RefreshCw size={14} className="spin-icon" /> : <AdminSyncIcon size={14} color="#0072ce" />}
            <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Base de Datos'}</span>
          </button>
        )}

        {info.showAddBtn && (
          <button className="btn-header-add" onClick={onNewItem}>
            <Plus size={15} strokeWidth={2.2} />
            <span>
              {activeTab === 'projects' && 'Nuevo Proyecto'}
              {activeTab === 'skills' && 'Nueva Tecnología'}
              {activeTab === 'experience' && 'Nueva Experiencia'}
              {activeTab === 'education' && 'Nuevo Estudio / Cert'}
              {activeTab === 'content' && 'Nuevo Texto'}
              {activeTab === 'media' && 'Subir Imagen'}
            </span>
          </button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
