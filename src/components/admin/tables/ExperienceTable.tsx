import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { ExperienceItem } from '../../../types/database';
import { EmptyState } from '../AdminShared';

interface ExperienceTableProps {
  experiences: ExperienceItem[];
  onEdit: (exp: ExperienceItem) => void;
  onDelete: (id: string) => void;
}

const ExperienceTable: React.FC<ExperienceTableProps> = ({ experiences, onEdit, onDelete }) => {
  if (experiences.length === 0) {
    return <EmptyState text="No experience entries yet. Click 'New Experience' to add one." />;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role (ES)</th>
            <th>Period</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp.id}>
              <td className="td-title">{exp.company}</td>
              <td>{exp.role_es}</td>
              <td>
                <span className="period-badge">
                  {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date || '—'}
                </span>
              </td>
              <td>{exp.location || '—'}</td>
              <td className="actions">
                <button title="Edit" onClick={() => onEdit(exp)}><Edit size={16} /></button>
                <button title="Delete" className="delete" onClick={() => onDelete(exp.id!)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExperienceTable;
