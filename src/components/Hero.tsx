import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowDownRight, X, FileText } from 'lucide-react';
import { SpanishFlag, UkFlag, EstonianFlag } from './icons/LanguageFlags';

// Carga automática de todas las imágenes hero-*.jpg de src/assets/
const heroImageModules = import.meta.glob<{ default: string }>('../assets/hero-*.{jpg,jpeg,png,webp}', { eager: true });

const dynamicHeroBackgrounds = Object.entries(heroImageModules).map(([, mod], idx) => ({
  id: idx + 1,
  url: typeof mod === 'string' ? mod : mod.default,
  title: `Foto ${idx + 1}`,
}));

const fallbackBackgrounds = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=2000&q=85',
    title: 'Tallinn Modern District',
  }
];

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [allCvs, setAllCvs] = useState<Record<string, string>>({});
  
  // Fondos personalizados desde Supabase o fallback a assets locales
  const customBgsRaw = t('image_hero_backgrounds');
  let customBgs: { id: number; url: string; title: string }[] = [];
  try {
    if (customBgsRaw && customBgsRaw !== 'image_hero_backgrounds') {
      const parsed = JSON.parse(customBgsRaw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        customBgs = parsed.map((url: string, idx: number) => ({ id: idx + 1, url, title: `Foto ${idx + 1}` }));
      }
    }
  } catch (_e) {
    // Ignorar error de parseo y usar fondos locales
  }

  const heroBackgrounds = customBgs.length > 0 
    ? customBgs 
    : (dynamicHeroBackgrounds.length > 0 ? dynamicHeroBackgrounds : fallbackBackgrounds);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Rotación continua cada 6 segundos
  useEffect(() => {
    if (heroBackgrounds.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      hero_kicker: { 
        es: 'Full-Stack Developer', 
        en: 'Full-Stack Developer', 
        et: 'Full-Stack Tarkvaraarendaja' 
      },
      hero_title: { 
        es: 'Desarrollo web con foco en arquitectura, rendimiento y código limpio.', 
        en: 'Web development focused on architecture, performance, and clean code.', 
        et: 'Veebiarendus, mis keskendub arhitektuurile, jõudlusele ja puhtale koodile.' 
      },
      hero_tagline: { 
        es: 'Hola, soy Juan Ortega. Especializado en crear aplicaciones web modernas, bases de datos eficientes e interfaces intuitivas.', 
        en: 'Hi, I’m Juan Ortega. Specialized in building modern web apps, efficient databases, and intuitive user interfaces.', 
        et: 'Tere, olen Juan Ortega. Spetsialiseerunud kaasaegsete veebirakenduste, tõhusate andmebaaside ja intuitiivsete kasutajaliideste loomisele.' 
      },
      specialty_label: { es: 'ESPECIALIDAD', en: 'SPECIALTY', et: 'SPETSIALISEERUMINE' },
      specialty_val: { es: 'Software & Web Development', en: 'Software & Web Development', et: 'Tarkvara ja veebiarendus' },
      objective_label: { es: 'OBJETIVO', en: 'OBJECTIVE', et: 'EESMÄRK' },
      objective_val: { es: 'Crecer en el ecosistema estonio', en: 'Grow within the Estonian ecosystem', et: 'Kasvada Eesti digiökosüsteemis' },
      status_label: { es: 'DISPONIBILIDAD', en: 'AVAILABILITY', et: 'SAADAVUS' },
      status_val: { es: 'Inmediata / Proyectos', en: 'Immediate / Projects', et: 'Koheselt saadaval' },
      download_cv: { es: 'Descargar CV', en: 'Download CV', et: 'Laadi alla CV' },
      cv_modal_hint: { 
        es: 'Selecciona la versión de idioma para ver o descargar el Curriculum Vitae:', 
        en: 'Select the language version to view or download the Curriculum Vitae:', 
        et: 'Vali keeleversioon elulookirjelduse (CV) vaatamiseks või allalaadimiseks:' 
      },
      cv_status_ready: {
        es: 'Disponible para descarga',
        en: 'Available for download',
        et: 'Saadaval allalaadimiseks'
      },
      cv_status_base: {
        es: 'Archivo base listo',
        en: 'Base file ready',
        et: 'Põhifail valmis'
      },
      cv_not_available: { 
        es: 'El CV en este idioma no está disponible actualmente.', 
        en: 'The CV in this language is not currently available.', 
        et: 'Selles keeles CV ei ole hetkel saadaval.' 
      },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const { data, error } = await supabase
          .from('cv_files')
          .select('lang, file_url');
        
        if (!error && data) {
          const cvMap = data.reduce((acc: any, curr: any) => {
            acc[curr.lang] = curr.file_url;
            return acc;
          }, {});
          setAllCvs(cvMap);
        }
      } catch (err) {
        console.error('Error fetching CV files:', err);
      }
    };
    fetchCVs();
  }, [language]);

  const handleDownloadVersion = (lang: string) => {
    const url = allCvs[lang];
    if (url) {
      window.open(url, '_blank');
      setIsCvModalOpen(false);
    } else {
      alert(getT('cv_not_available', getFallback('cv_not_available')));
    }
  };

  return (
    <section id="hero" className="hero-root">
      {/* 100% Full-Screen Panoramic Rotating Background (Cinema Mode) */}
      <div className="hero-full-bg-layer" aria-hidden="true">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            className="hero-full-bg-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${heroBackgrounds[currentSlide]?.url})`
            }}
          />
        </AnimatePresence>

        {/* Tinte Fílmico Luminoso que resalta las fotos de fondo */}
        <div className="hero-cinema-overlay"></div>
      </div>

      <div className="container hero-container">
        <motion.div 
          className="hero-cinema-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Kicker Superior Limpio y Elegante */}
          <div className="hero-estonia-kicker-clean">
            {(() => {
              const rawText = getT('hero_kicker', getFallback('hero_kicker'));
              
              if (typeof rawText === 'string') {
                // Elimina viñetas y cualquier remanente de "ESTONIA · GLOBAL" o similar
                const cleaned = rawText
                  .replace(/^[•·\-\s]+/, '')
                  .replace(/\s*(?:[·/|]\s*)?(?:ESTONIA\s*[·/]\s*GLOBAL|EESTI\s*[·/]\s*GLOBAALNE)\s*/gi, '')
                  .trim();

                return <span className="hero-kicker-role">{cleaned || rawText}</span>;
              }
              return <span className="hero-kicker-role">{rawText}</span>;
            })()}
          </div>

          {/* Main Title Nítido y de Alto Impacto */}
          <h1 className="hero-headline hero-headline-cinema">
            {getT('hero_title', getFallback('hero_title'))}
          </h1>

          {/* Body Bio */}
          <p className="hero-body-text hero-body-cinema">
            {getT('hero_tagline', getFallback('hero_tagline'))}
          </p>

          {/* Botones de Acción de Alto Nivel con Cristal Nórdico y Animación Sutil */}
          <div className="hero-action-buttons">
            <button 
              className="hero-cv-pill-btn" 
              onClick={() => setIsCvModalOpen(true)}
              aria-label="Descargar Curriculum Vitae"
            >
              <Download size={17} className="btn-download-icon" />
              <span>{getT('download_cv', getFallback('download_cv'))}</span>
            </button>

            <a 
              href="#vision" 
              className="hero-arrow-circle-btn"
              aria-label="Explorar perfil y proyectos"
              title="Explorar perfil"
            >
              <ArrowDownRight size={19} className="btn-arrow-icon" />
            </a>
          </div>

          {/* Sub-Footer Metric Row con 3 Columnas Perfectamente Equilibradas */}
          <div className="hero-subfooter-cinema">
            <div className="subfooter-col">
              <span className="subfooter-label-estonia">{getT('specialty_label', getFallback('specialty_label'))}</span>
              <span className="subfooter-value-cinema">{getT('specialty_val', getFallback('specialty_val'))}</span>
            </div>

            <div className="subfooter-col">
              <span className="subfooter-label-estonia">{getT('objective_label', getFallback('objective_label'))}</span>
              <span className="subfooter-value-cinema">{getT('objective_val', getFallback('objective_val'))}</span>
            </div>

            <div className="subfooter-col">
              <span className="subfooter-label-estonia">{getT('status_label', getFallback('status_label'))}</span>
              <span className="subfooter-value-cinema">
                {getT('status_val', getFallback('status_val'))}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CV Modal */}
      <AnimatePresence>
        {isCvModalOpen && (
          <div className="cv-modal-backdrop" onClick={() => setIsCvModalOpen(false)}>
            <motion.div 
              className="cv-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="cv-modal-header">
                <div className="cv-modal-title-group">
                  <FileText className="cv-icon-title" size={20} />
                  <h3>{getT('download_cv', getFallback('download_cv'))}</h3>
                </div>
                <button className="cv-close-btn" onClick={() => setIsCvModalOpen(false)} aria-label="Cerrar modal">
                  <X size={16} />
                </button>
              </div>
              <p className="cv-modal-hint">{getT('cv_modal_hint', getFallback('cv_modal_hint'))}</p>

              <div className="cv-options-list">
                <button className="cv-item-btn" onClick={() => handleDownloadVersion('es')}>
                  <span className="cv-flag"><SpanishFlag width={22} height={16} /></span>
                  <div className="cv-item-info">
                    <span className="cv-item-name">Español (Spanish)</span>
                    <span className="cv-item-status">{allCvs['es'] ? getT('cv_status_ready', getFallback('cv_status_ready')) : getT('cv_status_base', getFallback('cv_status_base'))}</span>
                  </div>
                  <Download size={16} />
                </button>

                <button className="cv-item-btn" onClick={() => handleDownloadVersion('en')}>
                  <span className="cv-flag"><UkFlag width={22} height={16} /></span>
                  <div className="cv-item-info">
                    <span className="cv-item-name">English</span>
                    <span className="cv-item-status">{allCvs['en'] ? getT('cv_status_ready', getFallback('cv_status_ready')) : getT('cv_status_base', getFallback('cv_status_base'))}</span>
                  </div>
                  <Download size={16} />
                </button>

                <button className="cv-item-btn" onClick={() => handleDownloadVersion('et')}>
                  <span className="cv-flag"><EstonianFlag width={22} height={16} /></span>
                  <div className="cv-item-info">
                    <span className="cv-item-name">Eesti keel (Estonian)</span>
                    <span className="cv-item-status">{allCvs['et'] ? getT('cv_status_ready', getFallback('cv_status_ready')) : getT('cv_status_base', getFallback('cv_status_base'))}</span>
                  </div>
                  <Download size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .hero-root {
          padding-top: 7rem;
          padding-bottom: 3.5rem;
          position: relative;
          overflow: hidden;
          background: #080d12;
          min-height: 82vh;
          display: flex;
          align-items: center;
        }

        /* 100% Full-Screen Panoramic Rotating Background */
        .hero-full-bg-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .hero-full-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 118%;
          top: -2%;
          background-size: cover;
          background-position: center 68%;
          filter: saturate(115%) brightness(106%) contrast(104%);
        }

        /* Tinte Fílmico Luminoso */
        .hero-cinema-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg, 
            rgba(8, 13, 18, 0.72) 0%, 
            rgba(8, 13, 18, 0.44) 45%, 
            rgba(8, 13, 18, 0.10) 80%, 
            transparent 100%
          ),
          linear-gradient(
            180deg, 
            rgba(8, 13, 18, 0.22) 0%, 
            transparent 45%, 
            rgba(8, 13, 18, 0.42) 100%
          );
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        .hero-cinema-content {
          max-width: 680px;
        }

        /* Kicker Superior del Hero */
        .hero-estonia-kicker-clean {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 1.4rem;
        }

        .hero-kicker-role {
          color: #ffffff;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .hero-kicker-sep {
          width: 1px;
          height: 14px;
          background: rgba(147, 197, 253, 0.45);
          display: inline-block;
          flex-shrink: 0;
          margin: 0 0.2rem;
        }

        .hero-kicker-focus {
          color: #38bdf8;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .kicker-blue-dot {
          display: none;
        }

        /* Titular Cinema */
        .hero-headline-cinema {
          font-family: var(--font-heading);
          font-size: 2.35rem;
          line-height: 1.18;
          color: #ffffff !important;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 1.1rem;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.85), 0 4px 30px rgba(0, 0, 0, 0.7);
        }

        @media (max-width: 768px) {
          .hero-headline-cinema {
            font-size: 1.95rem;
            line-height: 1.2;
          }
        }

        /* Bio Text Cinema */
        .hero-body-cinema {
          font-size: 0.98rem;
          line-height: 1.62;
          color: #ffffff !important;
          max-width: 520px;
          margin-bottom: 1.85rem;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.8), 0 2px 20px rgba(0, 0, 0, 0.6);
        }

        /* Action Buttons en Cristal Nórdico con Animación Física Realista */
        .hero-action-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.25rem;
        }

        /* Botón Principal Píldora de Cristal */
        .hero-cv-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(13, 20, 30, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          color: #ffffff !important;
          padding: 0.78rem 1.6rem;
          border-radius: 2.5rem;
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .hero-cv-pill-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 114, 206, 0.85) 0%, rgba(2, 132, 199, 0.9) 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 0;
        }

        .hero-cv-pill-btn > * {
          position: relative;
          z-index: 1;
        }

        .hero-cv-pill-btn .btn-download-icon {
          transition: transform 0.25s ease;
        }

        .hero-cv-pill-btn:hover {
          transform: translateY(-1.5px);
          border-color: rgba(255, 255, 255, 0.28);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        .hero-cv-pill-btn:hover::before {
          opacity: 1;
        }

        .hero-cv-pill-btn:hover .btn-download-icon {
          transform: translateY(1px);
        }

        .hero-cv-pill-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        /* Botón Secundario Circular de Cristal */
        .hero-arrow-circle-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(13, 20, 30, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          color: #ffffff !important;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
          cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.22s ease, border-color 0.2s ease;
          text-decoration: none;
        }

        .hero-arrow-circle-btn .btn-arrow-icon {
          transition: transform 0.2s ease;
        }

        .hero-arrow-circle-btn:hover {
          transform: translateY(-1.5px);
          background: rgba(0, 114, 206, 0.85);
          border-color: rgba(255, 255, 255, 0.28);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        .hero-arrow-circle-btn:hover .btn-arrow-icon {
          transform: translate(1px, 1px);
        }

        .hero-arrow-circle-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        }

        /* Subfooter Row Cinema con 3 Columnas */
        .hero-subfooter-cinema {
          display: flex;
          gap: 2.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          flex-wrap: wrap;
        }

        .subfooter-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .subfooter-label-estonia {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #0072ce !important; /* Azul Bandera de Estonia */
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .subfooter-value-cinema {
          font-family: var(--font-heading);
          font-size: 0.94rem;
          font-weight: 700;
          color: #ffffff !important;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
        }

        .status-val-with-dot {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .status-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
        }

        @media (max-width: 640px) {
          .hero-cinema-content {
            padding-top: 2rem;
          }
          .hero-headline-cinema {
            font-size: clamp(1.75rem, 6.5vw, 2.1rem);
            line-height: 1.2;
            margin-bottom: 0.85rem;
          }
          .hero-body-cinema {
            font-size: 0.92rem;
            line-height: 1.55;
            margin-bottom: 1.5rem;
          }
          .hero-action-buttons {
            gap: 0.75rem;
            margin-bottom: 1.85rem;
          }
          .hero-cv-pill-btn {
            padding: 0.7rem 1.35rem;
            font-size: 0.88rem;
          }
          .hero-subfooter-cinema {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.1rem 1rem;
            padding-top: 1.25rem;
          }
          .hero-subfooter-cinema .subfooter-col:last-child {
            grid-column: span 2;
          }
        }

        /* CV Modal Styles */
        .cv-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 13, 18, 0.65);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1.5rem;
        }

        .cv-modal-card {
          width: 100%;
          max-width: 440px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: var(--shadow-lg);
        }

        .cv-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .cv-modal-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cv-icon-title {
          color: #0072ce;
        }

        .cv-modal-header h3 {
          font-size: 1.25rem;
          margin: 0;
          color: var(--text-h);
        }

        .cv-close-btn {
          background: var(--bg-card-subtle);
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .cv-close-btn:hover {
          color: var(--text-h);
          border-color: #0072ce;
        }

        .cv-modal-hint {
          font-size: 0.85rem;
          color: var(--text);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .cv-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .cv-item-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1.1rem;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border);
          border-radius: 1rem;
          color: var(--text-h);
          text-align: left;
          transition: all 0.25s ease;
          width: 100%;
        }

        .cv-item-btn:hover {
          background: var(--bg-card);
          border-color: #0072ce;
          transform: translateY(-2px);
          box-shadow: var(--shadow-subtle);
        }

        .cv-flag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
          border-radius: 3.5px;
        }

        .cv-item-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .cv-item-name {
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-h);
        }

        .cv-item-status {
          font-size: 0.74rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
};

export default Hero;
