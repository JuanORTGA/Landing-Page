import React from 'react';
import { Globe } from 'lucide-react';

interface LangTabsProps {
  currentLang: 'es' | 'en' | 'et';
  setLang: (lang: 'es' | 'en' | 'et') => void;
}

const LangTabs: React.FC<LangTabsProps> = ({ currentLang, setLang }) => (
  <div className="lang-tabs">
    {(['es', 'en', 'et'] as const).map(l => (
      <button
        key={l}
        type="button"
        className={`lang-tab ${currentLang === l ? 'active' : ''}`}
        onClick={() => setLang(l)}
      >
        <Globe size={14} /> {l.toUpperCase()}
      </button>
    ))}
  </div>
);

export default LangTabs;
