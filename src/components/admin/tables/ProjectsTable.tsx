import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  ExternalLink, 
  Github, 
  Search, 
  FolderCode, 
  Globe 
} from 'lucide-react';
import type { Project } from '../../../types/database';
import { EmptyState } from '../AdminShared';
import { AdminFolderProjectsIcon } from '../icons/AdminIcons';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (projects.length === 0) {
    return <EmptyState text="Aún no hay proyectos registrados. Haz clic en '+ Nuevo Proyecto' para agregar el primero." />;
  }

  const filteredProjects = projects.filter(p => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const titleEs = (p.title_es || '').toLowerCase();
    const titleEn = (p.title_en || '').toLowerCase();
    const cat = (p.category || '').toLowerCase();
    const stackStr = Array.isArray(p.stack) ? p.stack.join(' ').toLowerCase() : (p.stack || '').toLowerCase();
    return titleEs.includes(q) || titleEn.includes(q) || cat.includes(q) || stackStr.includes(q);
  });

  const handleDeleteWithConfirm = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar el proyecto "${title}"?`)) {
      onDelete(id);
    }
  };

  const parseStack = (rawStack: any): string[] => {
    if (Array.isArray(rawStack)) return rawStack;
    if (typeof rawStack === 'string') {
      try {
        if (rawStack.trim().startsWith('[')) return JSON.parse(rawStack);
        return rawStack.split(',').map(s => s.trim()).filter(Boolean);
      } catch {
        return [rawStack];
      }
    }
    return [];
  };

  return (
    <div className="projects-admin-wrapper">
      {/* Header Resumen y Buscador */}
      <div className="projects-header-summary">
        <div className="projects-summary-left">
          <span className="module-section-kicker">// CATÁLOGO OFICIAL</span>
          <h3 className="projects-summary-title">Portafolio de Proyectos</h3>
          <p className="projects-summary-subtitle">
            Gestiona el catálogo de soluciones, imágenes de portada, repositorios y demos en vivo.
          </p>
        </div>

        <div className="projects-summary-right">
          <div className="projects-search-box">
            <Search size={14} className="projects-search-icon" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, categoría o stack..."
              className="projects-search-input"
            />
          </div>
          <span className="projects-count-text">
            {projects.length} {projects.length === 1 ? 'proyecto' : 'proyectos'}
          </span>
        </div>
      </div>

      {/* Grid de Tarjetas Ejecutivas de Proyectos */}
      {filteredProjects.length === 0 ? (
        <div className="projects-empty-filter">
          <p>No se encontraron proyectos con el término "{searchQuery}".</p>
        </div>
      ) : (
        <div className="projects-cards-grid">
          {filteredProjects.map((p, idx) => {
            const stackList = parseStack(p.stack);
            const displayTitle = p.title_es || p.title_en || 'Proyecto sin título';

            return (
              <div 
                key={p.id || idx} 
                className="project-card-item"
                onClick={() => onEdit(p)}
              >
                {/* Portada del Proyecto */}
                <div className="project-card-cover">
                  {p.image_url ? (
                    <img 
                      src={p.image_url} 
                      alt={displayTitle} 
                      className="project-cover-img"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="project-cover-placeholder">
                      <FolderCode size={28} color="#0072ce" strokeWidth={1.5} />
                      <span>Sin imagen asignada</span>
                    </div>
                  )}

                  {/* Badge de Categoría Flotante */}
                  <div className="project-cover-badge">
                    <span>{p.category || 'Full Stack'}</span>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="project-card-body">
                  <div className="project-title-row">
                    <h4 className="project-name-heading">{displayTitle}</h4>
                  </div>

                  {/* Descripción Corta */}
                  <p className="project-desc-preview">
                    {p.description_short_es || p.description_short_en || 'Sin descripción añadida.'}
                  </p>

                  {/* Stack Tecnológico (Sin puntos de IA) */}
                  <div className="project-stack-chips">
                    {stackList.length > 0 ? (
                      stackList.slice(0, 5).map((tech, tIdx) => (
                        <span key={tIdx} className="project-mini-chip">
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="project-no-stack">Sin tecnologías asignadas</span>
                    )}
                    {stackList.length > 5 && (
                      <span className="project-more-chip">+{stackList.length - 5} más</span>
                    )}
                  </div>

                  {/* Footer con Enlaces y Botones de Acción */}
                  <div className="project-card-footer">
                    <div className="project-links-group" onClick={e => e.stopPropagation()}>
                      {p.github_url && (
                        <a 
                          href={p.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-quick-link"
                          title="Ver repositorio en GitHub"
                        >
                          <Github size={13} />
                          <span>Repo</span>
                        </a>
                      )}
                      {p.live_url && (
                        <a 
                          href={p.live_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-quick-link live"
                          title="Abrir demo en vivo"
                        >
                          <Globe size={13} />
                          <span>Demo</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>

                    <div className="project-actions-group">
                      <button 
                        type="button" 
                        className="btn-project-action edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(p);
                        }}
                        title="Editar Proyecto"
                      >
                        <Edit size={13} />
                        <span>Editar</span>
                      </button>
                      <button 
                        type="button" 
                        className="btn-project-action delete"
                        onClick={(e) => handleDeleteWithConfirm(p.id!, displayTitle, e)}
                        title="Eliminar Proyecto"
                        aria-label="Eliminar Proyecto"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;
