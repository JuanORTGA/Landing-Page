import React from 'react';
import { 
  LogOut, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import joeLogo from '../../assets/joe-technology-logo-transparent.png';
import {
  AdminFolderProjectsIcon,
  AdminChipSkillsIcon,
  AdminBriefcaseExpIcon,
  AdminGraduationEduIcon,
  AdminDocumentCopyIcon,
  AdminPdfCvIcon,
  AdminMediaGalleryIcon
} from './icons/AdminIcons';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  handleLogout, 
  isCollapsed, 
  setIsCollapsed 
}) => {
  const tabs = [
    { key: 'projects', label: 'Proyectos', kicker: '01', icon: <AdminFolderProjectsIcon size={18} /> },
    { key: 'skills', label: 'Stack & Skills', kicker: '02', icon: <AdminChipSkillsIcon size={18} /> },
    { key: 'experience', label: 'Trayectoria', kicker: '03', icon: <AdminBriefcaseExpIcon size={18} /> },
    { key: 'education', label: 'Educación & Certs', kicker: '04', icon: <AdminGraduationEduIcon size={18} /> },
    { key: 'content', label: 'Textos & Copys', kicker: '05', icon: <AdminDocumentCopyIcon size={18} /> },
    { key: 'cvs', label: 'Archivos CV', kicker: '06', icon: <AdminPdfCvIcon size={18} /> },
    { key: 'media', label: 'Imágenes & Media', kicker: '07', icon: <AdminMediaGalleryIcon size={18} /> },
  ];

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="admin-sidebar-top">
        {/* Brand Logo & Studio Name */}
        <div className="admin-logo">
          <img src={joeLogo} alt="JoE TECHNOLOGY" className="admin-brand-logo-img" />
          {!isCollapsed && (
            <div className="admin-brand-text">
              <span className="brand-name">JUAN ORTEGA</span>
              <span className="brand-badge">JoE TECHNOLOGY</span>
            </div>
          )}
        </div>

        {/* Toggle Collapse Button */}
        <button 
          className="sidebar-collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir barra lateral' : 'Contraer barra lateral'}
          aria-label={isCollapsed ? 'Expandir barra lateral' : 'Contraer barra lateral'}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Navegación por Pestañas */}
        <nav className="admin-nav-list">
          {tabs.map(t => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`admin-nav-btn ${isActive ? 'active' : ''}`}
                title={isCollapsed ? t.label : ''}
              >
                <div className="nav-btn-icon-box">
                  {t.icon}
                </div>
                {!isCollapsed && (
                  <div className="nav-btn-content">
                    <span className="nav-btn-label">{t.label}</span>
                    <span className="nav-btn-kicker">{t.kicker}</span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Botones Inferiores */}
      <div className="admin-sidebar-bottom">
        <a 
          href="/" 
          className="sidebar-action-btn btn-to-site" 
          title={isCollapsed ? 'Ver Landing Page' : ''}
        >
          <ArrowLeft size={16} />
          {!isCollapsed && <span>Ver Landing Page</span>}
        </a>

        <button 
          className="sidebar-action-btn logout-btn" 
          onClick={handleLogout} 
          title={isCollapsed ? 'Cerrar Sesión' : ''}
        >
          <LogOut size={16} />
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
