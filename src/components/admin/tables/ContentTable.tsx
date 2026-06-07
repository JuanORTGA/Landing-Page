import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { PageContent } from '../../../types/database';
import { EmptyState } from '../AdminShared';

interface ContentTableProps {
  contents: PageContent[];
  onEdit: (content: PageContent) => void;
  onDelete: (id: string) => void;
}

const ContentTable: React.FC<ContentTableProps> = ({ contents, onEdit, onDelete }) => {
  if (contents.length === 0) {
    return <EmptyState text="No content entries yet. Click 'New Content' to add one." />;
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Key</th>
            <th>Content (ES) Preview</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((c) => (
            <tr key={c.id}>
              <td className="td-title"><code className="key-code">{c.key}</code></td>
              <td className="td-preview">{c.content_es?.slice(0, 80)}{c.content_es?.length > 80 ? '…' : ''}</td>
              <td className="actions">
                <button title="Edit" onClick={() => onEdit(c)}><Edit size={16} /></button>
                <button title="Delete" className="delete" onClick={() => onDelete(c.id!)}><Trash2 size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
