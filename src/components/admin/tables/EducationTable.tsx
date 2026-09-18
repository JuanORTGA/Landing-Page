import React from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { EducationItem } from '../../../types/database';
import { AdminGraduationEduIcon } from '../icons/AdminIcons';
import { AcademicDegreeIcon } from '../../icons/FlaticonVectors';

interface EducationTableProps {
  educationList: EducationItem[];
  onEdit: (item: EducationItem) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

const EducationTable: React.FC<EducationTableProps> = ({ 
  educationList, 
  onEdit, 
  onDelete, 
  onAddNew 
}) => {

  const handleDeleteWithConfirm = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar el registro académico o certificado "${name}"?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="education-manager-root">
      {/* Cabecera Resumen & Botón de Acción Principal */}
      <div className="education-header-summary">
        <div className="edu-summary-left">
          <span className="module-section-kicker">// FORMACIÓN & CERTIFICACIONES</span>
          <h3 className="edu-summary-title">Gestión de Estudios & Certificados</h3>
          <span className="edu-summary-subtitle">
            Configura títulos universitarios, carreras y certificaciones técnicas oficiales.
          </span>
        </div>

        <div className="edu-summary-actions">
          <button 
            type="button" 
            className="btn-add-edu-primary"
            onClick={onAddNew}
          >
            <Plus size={16} strokeWidth={2.2} />
            <span>Nuevo Estudio o Certificado</span>
          </button>
        </div>
      </div>

      {/* Grid de Tarjetas de Educación */}
      <div className="education-cards-grid">
        {educationList.map((edu, idx) => {
          const isComplete = Boolean(
            edu.degree_es && edu.degree_en && edu.degree_et
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

          const stackList = parseStack(edu.stack);

          return (
            <div 
              key={edu.id || idx} 
              className="education-card-item"
              onClick={() => onEdit(edu)}
            >
              {/* Cabecera de la Tarjeta */}
              <div className="edu-card-header">
                <div className="edu-institution-block">
                  <div className="edu-building-icon">
                    {edu.institution_logo ? (
                      <img 
                        src={edu.institution_logo} 
                        alt={edu.institution} 
                        className="edu-admin-thumb-img" 
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <AcademicDegreeIcon size={20} color="#0072ce" />
                    )}
                  </div>
                  <div>
                    <h4 className="edu-degree-title">{edu.degree_es || 'Sin título configurado'}</h4>
                    <div className="edu-meta-line">
                      <span className="edu-institution-name">
                        {edu.institution}
                      </span>
                      {edu.field_of_study && (
                        <>
                          <span className="edu-dot-sep">•</span>
                          <span className="edu-field-badge">{edu.field_of_study}</span>
                        </>
                      )}
                      <span className="edu-dot-sep">•</span>
                      <span className="edu-period-pill">
                        <Calendar size={13} />
                        {edu.start_date} — {edu.is_current ? 'Presente' : (edu.end_date || 'Completado')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Acciones */}
                <div className="edu-card-actions" onClick={e => e.stopPropagation()}>
                  <button 
                    type="button" 
                    className="btn-edu-edit"
                    onClick={() => onEdit(edu)}
                    title="Editar detalles y traducciones"
                  >
                    <Edit size={14} />
                    <span>Editar</span>
                  </button>

                  <button 
                    type="button" 
                    className="btn-edu-delete"
                    onClick={(e) => handleDeleteWithConfirm(edu.id!, edu.degree_es || edu.institution, e)}
                    title="Eliminar este estudio"
                  >
                    <Trash2 size={14} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>

              {/* Títulos Trilingües */}
              <div className="edu-roles-stack">
                <div className="edu-role-row">
                  <span className="edu-lang-badge es">ES</span>
                  <span className="edu-role-text primary">{edu.degree_es || <em className="missing">Sin título en español</em>}</span>
                </div>
                <div className="edu-role-row">
                  <span className="edu-lang-badge en">EN</span>
                  <span className="edu-role-text">{edu.degree_en || <em className="missing">Sin traducción en inglés</em>}</span>
                </div>
                <div className="edu-role-row">
                  <span className="edu-lang-badge et">ET</span>
                  <span className="edu-role-text">{edu.degree_et || <em className="missing">Sin traducción en estonio</em>}</span>
                </div>
              </div>

              {/* Credenciales y enlaces */}
              {(edu.credential_id || edu.credential_url) && (
                <div className="edu-cred-bar">
                  {edu.credential_id && (
                    <span className="edu-cred-id">ID: {edu.credential_id}</span>
                  )}
                  {edu.credential_url && (
                    <a 
                      href={edu.credential_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="edu-cred-link"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink size={12} />
                      <span>Ver enlace de credencial</span>
                    </a>
                  )}
                </div>
              )}

              {/* Stack de Competencias */}
              {stackList.length > 0 && (
                <div className="edu-admin-stack-row">
                  <span className="edu-admin-stack-lbl">Aptitudes / Competencias:</span>
                  <div className="edu-admin-stack-chips">
                    {stackList.map((t, sIdx) => (
                      <span key={sIdx} className="edu-admin-chip">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer con estado de traducción */}
              <div className="edu-card-footer">
                <div className="edu-status-indicator">
                  {isComplete ? (
                    <span className="edu-status-ready">
                      <CheckCircle2 size={13} color="#34d399" />
                      <span>3/3 Traducido (ES, EN, ET)</span>
                    </span>
                  ) : (
                    <span className="edu-status-pending">
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
        .education-manager-root {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Cabecera Resumen Sutil */
        .education-header-summary {
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

        .edu-summary-left {
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

        .edu-summary-title {
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.015em;
        }

        .edu-summary-subtitle {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 0;
        }

        .btn-add-edu-primary {
          background: rgba(0, 114, 206, 0.15);
          border: 1px solid rgba(0, 114, 206, 0.35);
          color: #38bdf8;
          font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 0.55rem 1.25rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-add-edu-primary:hover {
          background: #0072ce;
          border-color: #0072ce;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .education-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .education-card-item {
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

        .education-card-item:hover {
          background: #0d1522;
          border-color: rgba(0, 114, 206, 0.35);
          transform: translateY(-2px);
        }

        .edu-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .edu-institution-block {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          flex: 1;
        }

        .edu-building-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.85rem;
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          color: #0072ce;
        }

        .edu-admin-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .edu-degree-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .edu-meta-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          color: #94a3b8;
          margin-top: 0.25rem;
          flex-wrap: wrap;
        }

        .edu-institution-name {
          color: #e2e8f0;
          font-weight: 600;
        }

        .edu-dot-sep {
          color: #475569;
        }

        .edu-field-badge {
          font-size: 0.72rem;
          font-weight: 600;
          color: #0072ce;
          background: rgba(0, 114, 206, 0.08);
          padding: 0.15rem 0.5rem;
          border-radius: 0.35rem;
          border: 1px solid rgba(0, 114, 206, 0.2);
        }

        .edu-period-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          padding: 0.2rem 0.65rem;
          border-radius: 2rem;
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.25);
          color: #ffffff;
        }

        .edu-card-actions {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .btn-edu-edit {
          background: rgba(0, 114, 206, 0.08);
          border: 1px solid rgba(0, 114, 206, 0.25);
          color: #0072ce;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-edu-edit:hover {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
          box-shadow: 0 2px 8px rgba(0, 114, 206, 0.2);
          transform: translateY(-1px);
        }

        .btn-edu-delete {
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

        .btn-edu-delete:hover {
          background: #ef4444;
          color: #ffffff;
        }

        .edu-roles-stack {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          background: #070d18;
          border: 1px solid #1e293b;
          border-radius: 0.95rem;
          padding: 0.85rem 1.15rem;
        }

        .edu-role-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.88rem;
        }

        .edu-lang-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 0.3rem;
          flex-shrink: 0;
        }

        .edu-lang-badge.es { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.25); }
        .edu-lang-badge.en { background: rgba(0, 114, 206, 0.1); color: #0072ce; border: 1px solid rgba(0, 114, 206, 0.25); }
        .edu-lang-badge.et { background: rgba(16, 185, 129, 0.1); color: #059669; border: 1px solid rgba(16, 185, 129, 0.25); }

        .edu-role-text {
          color: #cbd5e1;
        }

        .edu-role-text.primary {
          color: #ffffff;
          font-weight: 700;
        }

        .edu-cred-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.78rem;
          flex-wrap: wrap;
        }

        .edu-cred-id {
          font-family: var(--font-mono);
          color: #94a3b8;
          background: #070d18;
          padding: 0.2rem 0.55rem;
          border-radius: 0.35rem;
          border: 1px solid rgba(0, 114, 206, 0.25);
        }

        .edu-cred-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #0072ce;
          text-decoration: none;
          font-weight: 600;
        }

        .edu-cred-link:hover {
          text-decoration: underline;
        }

        .edu-admin-stack-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .edu-admin-stack-lbl {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748b;
        }

        .edu-admin-stack-chips {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .edu-admin-chip {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: #ffffff;
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.2);
          padding: 0.2rem 0.55rem;
          border-radius: 0.35rem;
        }

        .edu-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 0.85rem;
          font-size: 0.78rem;
        }

        .edu-status-ready {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #059669;
          font-family: var(--font-mono);
          font-weight: 700;
        }

        .edu-status-pending {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #dc2626;
          font-family: var(--font-mono);
          font-weight: 700;
        }

        .edu-click-hint {
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default EducationTable;
