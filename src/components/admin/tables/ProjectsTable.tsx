import React from 'react';
import { Edit, Trash2, Code } from 'lucide-react';
import type { Project } from '../../../types/database';
import { EmptyState } from '../AdminShared';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onEdit, onDelete }) => {
  if (projects.length === 0) {
    return <EmptyState text="No projects yet. Click 'New Project' to add one." />;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title (ES)</th>
            <th>Category</th>
            <th>Stack</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>
                {p.image_url ? (
                  <img src={p.image_url} alt="" className="table-thumb" style={{ width: '64px', height: '64px' }} />
                ) : (
                  <div className="table-thumb-placeholder" style={{ width: '64px', height: '64px' }}><Code size={24} /></div>
                )}
              </td>
              <td className="td-title" style={{ fontSize: '1.1rem' }}>{p.title_es}</td>
              <td><span className="cat-pill" style={{ background: 'rgba(168, 85, 247, 0.2)', padding: '0.4rem 1rem' }}>{p.category || 'Sin categoría'}</span></td>
              <td className="td-stack">
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', maxWidth: '250px' }}>
                  {Array.isArray(p.stack) ? p.stack.map((s: string, i: number) => (
                    <span key={i} className="mini-badge" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>{s}</span>
                  )) : (p.stack as string)?.split(',').map((s, i) => (
                    <span key={i} className="mini-badge" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>{s.trim()}</span>
                  ))}
                </div>
              </td>
              <td className="actions">
                <button title="Editar" onClick={() => onEdit(p)} style={{ background: 'rgba(168, 85, 247, 0.1)', color: 'var(--primary)' }}><Edit size={18} /></button>
                <button title="Eliminar" className="delete" onClick={() => onDelete(p.id!)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
