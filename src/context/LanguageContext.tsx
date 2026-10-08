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
  t: (key: string) => any;
  loading: boolean;
  updateTranslation: (key: string, updates: Partial<PageContent>) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import EditableText from '../components/admin/EditableText';

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

    const handleFocus = () => {
      fetchContent();
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchContent();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('app-language', language);
    } catch {
      // Ignorar si el almacenamiento local está restringido
    }
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'UPDATE_TRANSLATION') {
        setContent(prev => ({
          ...prev,
          [event.data.key]: {
            ...(prev[event.data.key] || { key: event.data.key, content_es: '', content_en: '', content_et: '' }),
            ...event.data.updates
          }
        }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const t = (key: string) => {
    const item = content[key];
    if (!item && key.startsWith('image_')) return key;
    
    const raw = item ? item[`content_${language}` as keyof PageContent] : undefined;
    let translation = raw || (item ? item.content_es : key) || key;

    // Sanitize kicker fields: remove leading bullet symbols (•, ▸, ▪, etc.) from DB values
    if (key.endsWith('_kicker') || key === 'card_kicker') {
      translation = translation.replace(/^[\u2022\u25b8\u25aa\u2013\u2014-]\s*/u, '').trim();
    }

    if (window.self !== window.top && !key.startsWith('image_') && !key.startsWith('cv_') && typeof window !== 'undefined') {
      return <EditableText key={key} tKey={key} initialText={translation} />;
    }

    return translation;
  };

  const updateTranslation = (key: string, updates: Partial<PageContent>) => {
    setContent(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || { key, content_es: '', content_en: '', content_et: '' }),
        ...updates
      }
    }));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loading, updateTranslation }}>
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
