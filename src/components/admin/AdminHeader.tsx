import React from 'react';
import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  activeTab: string;
  onNewItem: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ activeTab, onNewItem }) => {
  const getLabel = () => {
    switch (activeTab) {
      case 'projects': return 'Projects';
      case 'skills': return 'Skills';
      case 'experience': return 'Experience';
      case 'content': return 'Page Content';
      case 'cvs': return 'CV Files';
      default: return '';
    }
  };

  return (
    <header className="admin-header glass">
      <h1>{getLabel()} Management</h1>
      {activeTab !== 'cvs' && (
        <button className="btn btn-primary" onClick={onNewItem}>
          <Plus size={18} /> New {getLabel().replace(' Management', '')}
        </button>
      )}
    </header>
  );
};

export default AdminHeader;
