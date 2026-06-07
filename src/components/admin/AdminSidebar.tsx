import React from 'react';
import { 
  Code, 
  List, 
  Briefcase, 
  Type, 
  FileText, 
  LogOut 
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab, handleLogout }) => {
  const tabs = [
    { key: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { key: 'skills', label: 'Skills', icon: <List size={20} /> },
    { key: 'experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { key: 'content', label: 'Page Content', icon: <Type size={20} /> },
    { key: 'cvs', label: 'CV Files', icon: <FileText size={20} /> },
  ];

  return (
    <aside className="admin-sidebar glass">
      <div className="admin-logo"><Code size={24} /> Admin JD</div>
      <nav>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={activeTab === t.key ? 'active' : ''}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </nav>
      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={20} /> Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
