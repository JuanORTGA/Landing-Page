import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { supabase } from '../services/supabase';

export type Language = 'es' | 'en' | 'et';

interface PageContent {
  key: string;
  content_es: string;
  content_en: string;
  content_et: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app-language');
      if (saved === 'es' || saved === 'en' || saved === 'et') return saved;
      return 'es';
    } catch {
      return 'es';
    }
  });

  const [content, setContent] = useState<Record<string, PageContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.from('page_content').select('*');
        if (!error && data) {
          const contentMap: Record<string, PageContent> = {};
          data.forEach((item: PageContent) => {
            contentMap[item.key] = item;
          });
          setContent(contentMap);
        }
      } catch (err) {
        console.error('Error fetching translations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('app-language', language);
    } catch {}
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    const item = content[key];
    if (!item) return key;
    
    const translation = item[`content_${language}` as keyof PageContent];
    return translation || item.content_es || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
