import React from 'react';
import { 
  Edit, 
  Trash2 
} from 'lucide-react';
import type { Skill } from '../../../types/database';
import { EmptyState } from '../AdminShared';
import { getTechLogoUrl, techPresetsList } from '../../../services/techLogos';
import { AdminChipSkillsIcon } from '../icons/AdminIcons';

interface SkillsTableProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

const SkillsTable: React.FC<SkillsTableProps> = ({ skills, onEdit, onDelete }) => {
  if (skills.length === 0) {
    return <EmptyState text="Aún no hay tecnologías registradas. Haz clic en 'Nueva Tecnología' para agregar una." />;
  }

  const handleDeleteWithConfirm = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar "${name}" del stack tecnológico?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="skills-admin-wrapper">
      {/* Header Resumen */}
      <div className="skills-header-summary">
        <div className="skills-summary-left">
          <span className="module-section-kicker">// STACK & HABILIDADES</span>
          <h3 className="skills-summary-title">Stack Tecnológico & Herramientas</h3>
          <p className="skills-summary-subtitle">
            Tecnologías, lenguajes y frameworks mostrados en la sección de Skills de la landing page.
          </p>
        </div>
        <span className="skills-count-text">
          {skills.length} {skills.length === 1 ? 'tecnología activa' : 'tecnologías activas'}
        </span>
      </div>

      {/* Grid de Tarjetas de Tecnologías */}
      <div className="skills-cards-grid">
        {skills.map((s, idx) => {
          const logoUrl = getTechLogoUrl(s.icon || s.name);
          const presetMatch = techPresetsList.find(p => p.name.toLowerCase() === s.name.toLowerCase() || p.id === s.icon?.toLowerCase());
          const brandColor = presetMatch?.color || '#0072ce';

          return (
            <div 
              key={s.id || idx} 
              className="skill-card-item"
              onClick={() => onEdit(s)}
            >
              <div className="skill-card-body">
                {/* Logo oficial */}
                <div className="skill-logo-box" style={{ borderColor: `${brandColor}25` }}>
                  <img 
                    src={logoUrl} 
                    alt={s.name} 
                    className="skill-logo-img"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="skill-info-block">
                  <div className="skill-title-row">
                    <h4 className="skill-name-heading">{s.name}</h4>
                  </div>

                  <div className="skill-category-row">
                    <span className="skill-cat-pill" style={{ color: brandColor, borderColor: `${brandColor}30`, background: `${brandColor}10` }}>
                      {s.category || presetMatch?.category || 'General'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de acción mejorados */}
              <div className="skill-card-actions" onClick={e => e.stopPropagation()}>
                <button 
                  type="button" 
                  className="btn-skill-edit"
                  onClick={() => onEdit(s)}
                  title="Editar detalles y logo de esta tecnología"
                >
                  <Edit size={13} />
                  <span>Editar</span>
                </button>

                <button 
                  type="button" 
                  className="btn-skill-delete"
                  onClick={(e) => handleDeleteWithConfirm(s.id!, s.name, e)}
                  title="Eliminar esta tecnología"
                  aria-label="Eliminar esta tecnología"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .skills-admin-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Header Resumen Sutil */
        .skills-header-summary {
          background: #090e17;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .skills-summary-left {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .module-section-kicker {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          font-weight: 700;
          color: #0072ce;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .skills-summary-title {
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .skills-summary-subtitle {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 0;
        }

        .skills-count-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.02em;
        }

        /* Grid de Tarjetas */
        .skills-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
        }

        .skill-card-item {
          background: #090e17;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 1.1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          color: #ffffff;
        }

        .skill-card-item:hover {
          background: #0d1522;
          border-color: rgba(0, 114, 206, 0.35);
          transform: translateY(-2px);
        }

        .skill-card-body {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .skill-logo-box {
          width: 46px;
          height: 46px;
          border-radius: 0.75rem;
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.45rem;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .skill-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .skill-info-block {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
        }

        .skill-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .skill-name-heading {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .skill-order-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #64748b;
          font-weight: 700;
        }

        .skill-category-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .skill-cat-pill {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid transparent;
        }

        .skill-status-tag {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #64748b;
        }

        /* Botones de acción sutiles, suaves y naturales */
        .skill-card-actions {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .btn-skill-edit {
          background: rgba(0, 114, 206, 0.08);
          border: 1px solid rgba(0, 114, 206, 0.25);
          color: #0072ce;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          border-radius: 0.65rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-skill-edit:hover {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
          box-shadow: 0 2px 8px rgba(0, 114, 206, 0.2);
          transform: translateY(-1px);
        }

        .btn-skill-delete {
          width: 30px;
          height: 30px;
          border-radius: 0.65rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-skill-delete:hover {
          background: #ef4444;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default SkillsTable;
