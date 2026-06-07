import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      footer_title: { 
        es: 'T.S.U EN INFORMÁTICA | INGENIERÍA EN INFORMÁTICA (2026)', 
        en: 'COMPUTER SCIENCE TECHNICIAN | COMPUTER ENGINEERING (2026)', 
        et: 'INFORMAATIKA TEHNIK | INFORMAATIKAINSENER (2026)' 
      },
      footer_location: { es: 'Caracas, Venezuela', en: 'Caracas, Venezuela', et: 'Caracas, Venezuela' },
      footer_email: { es: 'juanchoortega2020@gmail.com', en: 'juanchoortega2020@gmail.com', et: 'juanchoortega2020@gmail.com' },
      footer_phone: { es: '+58 424-246-18-43', en: '+58 424-246-18-43', et: '+58 424-246-18-43' },
      footer_visa: { 
        es: 'Disponible para reubicación en Estonia (requiere patrocinio de visa de trabajo)', 
        en: 'Available for relocation to Estonia (requires work visa sponsorship)', 
        et: 'Saadaval ümberasumiseks Eestisse (vajab tööviisa sponsorlust)' 
      },
      footer_text: {
          es: '© {year} Juan Ortega. Todos los derechos reservados.',
          en: '© {year} Juan Ortega. All rights reserved.',
          et: '© {year} Juan Ortega. Kõik õigused kaitstud.'
      }
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  return (
    <footer className="footer">
      <div className="container">
        <h3 className="footer-professional-title">{getT('footer_title', getFallback('footer_title'))}</h3>
        
        <div className="footer-info">
          <p>
            {getT('footer_location', getFallback('footer_location'))} | {getT('footer_phone', getFallback('footer_phone'))} | {getT('footer_email', getFallback('footer_email'))}
          </p>
          <p className="footer-visa">{getT('footer_visa', getFallback('footer_visa'))}</p>
        </div>

        <p className="footer-copyright">
          {getT('footer_text', getFallback('footer_text')).replace('{year}', currentYear.toString())}
        </p>
      </div>
      <style>{`
        .footer {
          padding: 4rem 0;
          text-align: center;
          border-top: 1px solid var(--border-color);
          margin-top: 5rem;
          color: var(--text-muted);
          background: rgba(0, 0, 0, 0.2);
        }
        .footer-professional-title {
          font-family: var(--heading);
          font-size: 1.1rem;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
          color: var(--text-h);
          opacity: 0.9;
        }
        .footer-info {
          margin-bottom: 2rem;
          font-size: 0.95rem;
          line-height: 1.8;
        }
        .footer-visa {
          font-weight: 500;
          color: var(--primary-hover);
          opacity: 0.8;
        }
        .footer-copyright {
          font-size: 0.85rem;
          opacity: 0.5;
          margin-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 2rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
