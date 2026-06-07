import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Skill } from '../../../types/database';
import { EmptyState } from '../AdminShared';

interface SkillsTableProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

const SkillsTable: React.FC<SkillsTableProps> = ({ skills, onEdit, onDelete }) => {
  if (skills.length === 0) {
    return <EmptyState text="No skills yet. Click 'New Skill' to add one." />;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Level</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s) => (
            <tr key={s.id}>
              <td className="td-title">{s.name}</td>
              <td><span className="cat-pill">{s.category || '—'}</span></td>
              <td>
                <div className="level-bar-wrapper">
                  <div className="level-bar-fill" style={{ width: `${s.level}%` }} />
                  <span className="level-label">{s.level}%</span>
                </div>
              </td>
              <td>{s.order}</td>
              <td className="actions">
                <button title="Edit" onClick={() => onEdit(s)}><Edit size={16} /></button>
                <button title="Delete" className="delete" onClick={() => onDelete(s.id!)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsTable;
