import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import type { ExperienceItem } from '../../../types/database';
import { EmptyState } from '../AdminShared';
import { AdminBriefcaseExpIcon } from '../icons/AdminIcons';
import { EnterpriseWorkIcon } from '../../icons/FlaticonVectors';

interface ExperienceTableProps {
  experiences: ExperienceItem[];
  onEdit: (exp: ExperienceItem) => void;
  onDelete: (id: string) => void;
}

const ExperienceTable: React.FC<ExperienceTableProps> = ({ experiences, onEdit, onDelete }) => {
  if (experiences.length === 0) {
    return <EmptyState text="Aún no hay experiencias registradas en la base de datos." />;
  }

  const handleDeleteWithConfirm = (id: string, company: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar la experiencia en "${company}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="experience-manager-root">
      {/* Barra superior de métricas */}
      <div className="experience-header-summary">
        <div className="exp-summary-left">
          <span className="module-section-kicker">// TRAYECTORIA LABORAL</span>
          <h3 className="exp-summary-title">Historial de Trayectoria Profesional</h3>
          <p className="exp-summary-subtitle">
            Gestiona empleos, cargos, responsabilidades y logros técnicos mostrados en la sección de Experiencia.
          </p>
        </div>
        <span className="exp-count-text">
          {experiences.length} {experiences.length === 1 ? 'puesto registrado' : 'puestos registrados'}
        </span>
      </div>

      {/* Grid de Tarjetas de Experiencia */}
      <div className="experience-cards-grid">
        {experiences.map((exp, idx) => {
          const isComplete = Boolean(
            exp.role_es && exp.role_en && exp.role_et &&
            exp.description_es && exp.description_en && exp.description_et
          );

          const parseStack = (rawStack: any): string[] => {
            if (Array.isArray(rawStack)) return rawStack;
            if (typeof rawStack === 'string') {
              try {
                if (rawStack.trim().startsWith('[')) return JSON.parse(rawStack);
                return rawStack.split(',').map((s: string) => s.trim()).filter(Boolean);
              } catch {
                return [rawStack];
              }
            }
            return [];
          };

          const stackList = parseStack(exp.stack);

          return (
            <div 
              key={exp.id || idx} 
              className="experience-card-item"
              onClick={() => onEdit(exp)}
            >
              {/* Cabecera de la Tarjeta */}
              <div className="exp-card-header">
                <div className="exp-company-block">
                  <div className="exp-building-icon">
                    {exp.company_logo ? (
                      <img 
                        src={exp.company_logo} 
                        alt={exp.company} 
                        className="exp-admin-thumb-img" 
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <EnterpriseWorkIcon size={20} color="#0072ce" />
                    )}
                  </div>
                  <div>
                    <h4 className="exp-company-name">{exp.company}</h4>
                    <div className="exp-meta-line">
                      <span className="exp-location-tag">
                        <MapPin size={13} /> {exp.location || 'Caracas, Venezuela'}
                      </span>
                      {exp.employment_type && (
                        <>
                          <span className="exp-dot-sep">•</span>
                          <span className="exp-work-badge">{exp.employment_type}</span>
                        </>
                      )}
                      {exp.work_mode && (
                        <>
                          <span className="exp-dot-sep">•</span>
                          <span className="exp-mode-badge">{exp.work_mode}</span>
                        </>
                      )}
                      <span className="exp-dot-sep">•</span>
                      <span className={`exp-period-pill ${exp.is_current ? 'current' : ''}`}>
                        <Calendar size={13} />
                        {exp.start_date} — {exp.is_current ? 'Presente' : (exp.end_date || 'Presente')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="exp-card-actions" onClick={e => e.stopPropagation()}>
                  <button 
                    type="button" 
                    className="btn-exp-edit"
                    onClick={() => onEdit(exp)}
                    title="Editar detalles y traducciones de este puesto"
                  >
                    <Edit size={14} />
                    <span>Editar</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-exp-delete"
                    onClick={(e) => handleDeleteWithConfirm(exp.id!, exp.company, e)}
                    title="Eliminar este empleo"
                  >
                    <Trash2 size={14} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>

              {/* Cargos y Roles Trilingües */}
              <div className="exp-roles-stack">
                <div className="exp-role-row">
                  <span className="exp-lang-badge es">ES</span>
                  <span className="exp-role-text primary">{exp.role_es || <em className="missing">Sin cargo configurado</em>}</span>
                </div>
                <div className="exp-role-row">
                  <span className="exp-lang-badge en">EN</span>
                  <span className="exp-role-text">{exp.role_en || <em className="missing">Sin traducción en inglés</em>}</span>
                </div>
                <div className="exp-role-row">
                  <span className="exp-lang-badge et">ET</span>
                  <span className="exp-role-text">{exp.role_et || <em className="missing">Sin traducción en estonio</em>}</span>
                </div>
              </div>

              {/* Logros y Descripción */}
              <div className="exp-desc-box">
                <span className="exp-desc-lbl">Logros técnicos & Arquitectura (Español):</span>
                <p className="exp-desc-text">
                  {exp.description_es || <em className="missing">Sin descripción de responsabilidades</em>}
                </p>
              </div>

              {/* Stack de Tecnologías Aplicadas */}
              {stackList.length > 0 && (
                <div className="exp-admin-stack-row">
                  <span className="exp-admin-stack-lbl">Stack / Tecnologías:</span>
                  <div className="exp-admin-stack-chips">
                    {stackList.map((t, sIdx) => (
                      <span key={sIdx} className="exp-admin-chip">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer con estado de traducción */}
              <div className="exp-card-footer">
                <div className="exp-status-indicator">
                  {isComplete ? (
                    <span className="exp-status-ready">
                      <CheckCircle2 size={13} color="#34d399" />
                      <span>3/3 Traducido (ES, EN, ET)</span>
                    </span>
                  ) : (
                    <span className="exp-status-pending">
                      <AlertCircle size={13} color="#f87171" />
                      <span>Traducciones Pendientes</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .experience-manager-root {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Cabecera Resumen Sutil */
        .experience-header-summary {
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

        .exp-summary-left {
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

        .exp-summary-title {
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .exp-summary-subtitle {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 0;
        }

        .exp-count-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.02em;
        }

        /* Grid de Tarjetas */
        .experience-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .experience-card-item {
          background: #090e17;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.15rem;
          padding: 1.4rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          color: #ffffff;
        }

        .experience-card-item:hover {
          background: #0d1522;
          border-color: rgba(0, 114, 206, 0.35);
          transform: translateY(-2px);
        }

        .exp-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .exp-company-block {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          flex: 1;
        }

        .exp-building-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.85rem;
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #0072ce;
        }

        .exp-company-name {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .exp-meta-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: #94a3b8;
          margin-top: 0.25rem;
          flex-wrap: wrap;
        }

        .exp-location-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #94a3b8;
        }

        .exp-dot-sep {
          color: #475569;
        }

        .exp-period-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.25);
          color: #ffffff;
          font-family: var(--font-mono);
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.15rem 0.6rem;
          border-radius: 1rem;
        }

        .exp-period-pill.current {
          background: rgba(0, 114, 206, 0.1);
          border-color: rgba(0, 114, 206, 0.3);
          color: #0072ce;
        }

        /* Botones de acción sutiles y naturales */
        .exp-card-actions {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .btn-exp-edit {
          background: rgba(0, 114, 206, 0.08);
          border: 1px solid rgba(0, 114, 206, 0.25);
          color: #0072ce;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 1.05rem;
          border-radius: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-exp-edit:hover {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
          box-shadow: 0 2px 8px rgba(0, 114, 206, 0.2);
          transform: translateY(-1px);
        }

        .btn-exp-delete {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 0.95rem;
          border-radius: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-exp-delete:hover {
          background: #ef4444;
          color: #ffffff;
        }

        /* Roles Stack */
        .exp-roles-stack {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          background: #070d18;
          border: 1px solid #1e293b;
          border-radius: 0.95rem;
          padding: 0.85rem 1.15rem;
        }

        .exp-role-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.88rem;
        }

        .exp-lang-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 0.3rem;
          flex-shrink: 0;
        }

        .exp-lang-badge.es { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.25); }
        .exp-lang-badge.en { background: rgba(0, 114, 206, 0.1); color: #0072ce; border: 1px solid rgba(0, 114, 206, 0.25); }
        .exp-lang-badge.et { background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.25); }

        .exp-role-text {
          color: #cbd5e1;
        }

        .exp-role-text.primary {
          color: #ffffff;
          font-weight: 700;
        }

        /* Descripción */
        .exp-desc-box {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .exp-desc-lbl {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .exp-desc-text {
          font-size: 0.88rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin: 0;
        }

        .missing {
          color: #64748b;
          font-style: italic;
        }

        .exp-admin-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.85rem;
        }

        .exp-work-badge, .exp-mode-badge {
          font-size: 0.72rem;
          font-weight: 600;
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.15);
          padding: 0.15rem 0.5rem;
          border-radius: 0.35rem;
          border: 1px solid rgba(0, 114, 206, 0.3);
        }

        .exp-admin-stack-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          padding-top: 0.4rem;
        }

        .exp-admin-stack-lbl {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
        }

        .exp-admin-stack-chips {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .exp-admin-chip {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: #ffffff;
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.2);
          padding: 0.2rem 0.55rem;
          border-radius: 0.35rem;
        }

        /* Footer */
        .exp-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 0.85rem;
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .exp-status-ready {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #059669;
          font-family: var(--font-mono);
          font-weight: 700;
        }

        .exp-status-pending {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #dc2626;
          font-family: var(--font-mono);
          font-weight: 700;
        }

        .exp-click-hint {
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ExperienceTable;
