import React from 'react';

interface LangTabsProps {
  currentLang: 'es' | 'en' | 'et';
  setLang: (lang: 'es' | 'en' | 'et') => void;
  statusMap?: Record<'es' | 'en' | 'et', boolean>;
}

const LangTabs: React.FC<LangTabsProps> = ({ currentLang, setLang, statusMap }) => {
  const languages: { code: 'es' | 'en' | 'et'; label: string; full: string }[] = [
    { code: 'es', label: 'ES', full: 'Español' },
    { code: 'en', label: 'EN', full: 'English' },
    { code: 'et', label: 'ET', full: 'Eesti' },
  ];

  return (
    <div className="admin-lang-pills-row">
      {languages.map(l => {
        const isActive = currentLang === l.code;
        const isFilled = statusMap ? statusMap[l.code] : true;

        return (
          <button
            key={l.code}
            type="button"
            className={`admin-lang-pill-btn ${isActive ? 'is-active' : ''}`}
            onClick={() => setLang(l.code)}
          >
            <span className="lang-code-tag">{l.label}</span>
            <span className="lang-full-name">{l.full}</span>
            {statusMap && (
              <span className={`lang-check-tag ${isFilled ? 'filled' : 'pending'}`}>
                {isFilled ? '✓' : '—'}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default LangTabs;
