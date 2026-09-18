import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { GlobalFluencyIcon } from './icons/FlaticonVectors';
import { SpanishFlag, UkFlag, EstonianFlag } from './icons/LanguageFlags';

import juanImg from '../assets/juan.jpg';

const About: React.FC = () => {
  const { language, t } = useLanguage();

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      about_kicker: {
        es: 'Sobre mí',
        en: 'About me',
        et: 'Minust'
      },
      about_title: {
        es: 'Construyo herramientas digitales que resuelven problemas reales.',
        en: 'I build digital tools that solve real problems.',
        et: 'Ehitan digitaalseid tööriistu, mis lahendavad tõelisi probleeme.'
      },
      about_p1: {
        es: 'Mi enfoque combina desarrollo frontend y backend con altos estándares: interfaces rápidas, APIs estructuradas y bases de datos eficientes y seguras.',
        en: 'My approach combines frontend and backend development with high standards: fast interfaces, structured APIs, and efficient, secure databases.',
        et: 'Minu lähenemine ühendab frontend- ja backend-arenduse kõrgete standarditega: kiired liidesed, struktureeritud API-d ning tõhusad ja turvalised andmebaasid.'
      },
      about_p2: {
        es: 'Valoro el trabajo en equipo, la comunicación clara y el aprendizaje continuo en cada producto y reto técnico que emprendo.',
        en: 'I value teamwork, clear communication, and continuous learning across every product and technical challenge I undertake.',
        et: 'Väärtustan meeskonnatööd, selget suhtlust ja pidevat õppimist igas tootes ja tehnilises väljakutses.'
      },
      stat1_num: { es: '+3', en: '+3', et: '+3' },
      stat1_lbl: { es: 'AÑOS DE EXPERIENCIA', en: 'YEARS EXPERIENCE', et: 'AASTAT KOGEMUST' },
      stat2_num: { es: '10+', en: '10+', et: '10+' },
      stat2_lbl: { es: 'PROYECTOS COMPLETADOS', en: 'COMPLETED PROJECTS', et: 'VALMINUD PROJEKTI' },
      stat3_num: { es: '100%', en: '100%', et: '100%' },
      stat3_lbl: { es: 'COMPROMISO TÉCNICO', en: 'TECH COMMITMENT', et: 'TEHNILINE PÜHENDUMUS' },
      lang_section_title: {
        es: 'IDIOMAS & COMUNICACIÓN PROFESIONAL',
        en: 'LANGUAGE PROFICIENCY & COMMUNICATION',
        et: 'KEELEOSKUS JA SUHTLUS'
      },
      lang_es_name: { es: 'Español', en: 'Spanish', et: 'Hispaania keel' },
      lang_es_level: { es: 'Nativo', en: 'Native', et: 'Emakeel' },
      lang_es_desc: {
        es: 'Lengua materna. Comunicación fluida, clara y estructurada en entornos de ingeniería.',
        en: 'Native fluency for clear communication, technical documentation, and collaborative team environments.',
        et: 'Emakeel sujuvaks suhtluseks, tehniliseks dokumentatsiooniks ja koostööks.'
      },
      lang_en_name: { es: 'Inglés', en: 'English', et: 'Inglise keel' },
      lang_en_level: { es: 'B1 / B2 · Profesional', en: 'B1 / B2 · Professional', et: 'B1 / B2 · Professionaalne' },
      lang_en_desc: {
        es: 'Competencia profesional en lectura de documentación técnica, desarrollo de software y participación en reuniones de equipo.',
        en: 'Professional competence for reading architectural documentation, writing clean code, and participating in daily syncs.',
        et: 'Ametialane pädevus tehnilise dokumentatsiooni lugemiseks, koodi kirjutamiseks ja igapäevaseks tiimitööks.'
      },
      lang_et_name: { es: 'Estonio', en: 'Estonian', et: 'Eesti keel' },
      lang_et_level: { es: 'A1 / A2 · En progreso activo', en: 'A1 / A2 · Active Learning', et: 'A1 / A2 · Aktiivne õpe' },
      lang_et_desc: {
        es: 'Estudio y práctica activa enfocada en la integración cultural y vida profesional en el ecosistema estonio.',
        en: 'Ongoing study of vocabulary, grammar, and daily communication focused on living and working in Estonia.',
        et: 'Pidev keeleõpe ja praktika suunatud elamiseks ja töötamiseks Eesti digitaalses ökosüsteemis.'
      },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const stats = [
    { num: getT('stat1_num', getFallback('stat1_num')), label: getT('stat1_lbl', getFallback('stat1_lbl')) },
    { num: getT('stat2_num', getFallback('stat2_num')), label: getT('stat2_lbl', getFallback('stat2_lbl')) },
    { num: getT('stat3_num', getFallback('stat3_num')), label: getT('stat3_lbl', getFallback('stat3_lbl')) },
  ];

  // Foto de perfil del desarrollador (dinámica desde Supabase o asset local)
  const customProfile = t('image_about_profile');
  const profileImageUrl = customProfile && customProfile !== 'image_about_profile' ? customProfile : juanImg;

  return (
    <section id="about" className="about-root">
      <div className="container">
        <div className="about-layout">
          {/* Left Column: Developer Photo Card with 01- Corner Badge */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-photo-card">
              <img
                src={profileImageUrl}
                alt="Juan Ortega - Desarrollador de Software"
                className="about-dev-img"
              />

              {/* Corner Badge 01— on the bottom right */}
              <div className="about-corner-badge">
                <span>01—</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Narrative, Languages & 3 Stat Cards */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="section-kicker">
              <span>{getT('about_kicker', getFallback('about_kicker'))}</span>
              <span className="kicker-dot"></span>
            </div>

            <h2 className="about-heading">
              {getT('about_title', getFallback('about_title'))}
            </h2>

            <p className="about-paragraph">
              {getT('about_p1', getFallback('about_p1'))}
            </p>

            <p className="about-paragraph secondary">
              {getT('about_p2', getFallback('about_p2'))}
            </p>

            {/* Competencia Lingüística & Comunicación Profesional */}
            <div className="about-languages-block">
              <h4 className="languages-block-title">
                <GlobalFluencyIcon size={17} color="#0072ce" className="lang-globe-icon" />
                {getT('lang_section_title', getFallback('lang_section_title'))}
              </h4>

              <div className="languages-linear-list">
                <div className="lang-linear-item">
                  <span className="lang-flag-bullet" title="Español (ES)">
                    <SpanishFlag width={26} height={18} />
                  </span>
                  <div className="lang-info-col">
                    <div className="lang-heading-row">
                      <span className="lang-name-label">{getT('lang_es_name', getFallback('lang_es_name'))}</span>
                      <span className="lang-level-badge">{getT('lang_es_level', getFallback('lang_es_level'))}</span>
                    </div>
                    <p className="lang-detail-text">
                      {getT('lang_es_desc', getFallback('lang_es_desc'))}
                    </p>
                  </div>
                </div>

                <div className="lang-linear-item">
                  <span className="lang-flag-bullet" title="English (GB / UK)">
                    <UkFlag width={26} height={18} />
                  </span>
                  <div className="lang-info-col">
                    <div className="lang-heading-row">
                      <span className="lang-name-label">{getT('lang_en_name', getFallback('lang_en_name'))}</span>
                      <span className="lang-level-badge">{getT('lang_en_level', getFallback('lang_en_level'))}</span>
                    </div>
                    <p className="lang-detail-text">
                      {getT('lang_en_desc', getFallback('lang_en_desc'))}
                    </p>
                  </div>
                </div>

                <div className="lang-linear-item">
                  <span className="lang-flag-bullet" title="Eesti keel (EE)">
                    <EstonianFlag width={26} height={18} />
                  </span>
                  <div className="lang-info-col">
                    <div className="lang-heading-row">
                      <span className="lang-name-label">{getT('lang_et_name', getFallback('lang_et_name'))}</span>
                      <span className="lang-level-badge">{getT('lang_et_level', getFallback('lang_et_level'))}</span>
                    </div>
                    <p className="lang-detail-text">
                      {getT('lang_et_desc', getFallback('lang_et_desc'))}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Metric Cards */}
            <div className="about-stats-grid">
              {stats.map((stat, idx) => (
                <div key={idx} className="about-stat-card">
                  <span className="stat-number">{stat.num}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-root {
          background: var(--bg);
          padding-top: 5rem;
          padding-bottom: 6.5rem;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          position: relative;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }

        body.dark-mode .about-root {
          background: #0c1014;
          border-top: 1px solid rgba(0, 114, 206, 0.18);
          border-bottom: 1px solid rgba(0, 114, 206, 0.18);
        }

        .about-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* Photo Card */
        .about-photo-card {
          width: 100%;
          height: 440px;
          border-radius: 2rem;
          overflow: hidden;
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transition: all 0.3s ease;
        }

        body.dark-mode .about-photo-card {
          background: #121820;
          border: 1px solid rgba(0, 114, 206, 0.25);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.65);
        }

        .about-dev-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          filter: contrast(102%) saturate(105%);
          transition: transform 0.4s ease;
        }

        .about-photo-card:hover .about-dev-img {
          transform: scale(1.03);
        }

        .about-corner-badge {
          position: absolute;
          bottom: 1.15rem;
          right: 1.15rem;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 0.3rem 0.7rem;
          border-radius: 999px;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }

        .about-corner-badge span {
          color: #0f172a;
        }

        body.dark-mode .about-corner-badge {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
        }

        body.dark-mode .about-corner-badge span {
          color: #f8fafc;
        }

        /* Right Content */
        .about-heading {
          font-family: var(--font-heading);
          font-size: 2.15rem;
          line-height: 1.22;
          color: var(--text-h);
          margin-bottom: 1.25rem;
          letter-spacing: -0.025em;
          font-weight: 800;
        }

        .about-paragraph {
          font-size: 0.98rem;
          line-height: 1.68;
          color: var(--text);
          margin-bottom: 1.15rem;
        }

        .about-paragraph.secondary {
          margin-bottom: 1.5rem;
          color: var(--text-muted);
        }

        /* Sellos de Calidad Técnica */
        .about-pillars-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 2.25rem;
        }

        .pillar-seal {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #0072ce;
          background: rgba(0, 114, 206, 0.08);
          border: 1px solid rgba(0, 114, 206, 0.25);
          padding: 0.3rem 0.75rem;
          border-radius: 2rem;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        body.dark-mode .pillar-seal {
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.12);
          border-color: rgba(0, 114, 206, 0.3);
        }

        .pillar-seal:hover {
          background: rgba(0, 114, 206, 0.14);
          border-color: rgba(0, 114, 206, 0.35);
          color: #0072ce;
          transform: translateY(-1px);
        }

        body.dark-mode .pillar-seal:hover {
          background: rgba(0, 114, 206, 0.22);
          border-color: rgba(56, 189, 248, 0.45);
          color: #38bdf8;
        }

        /* Stats Grid */
        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.15rem;
        }

        .about-stat-card {
          background: #ffffff;
          border: 1px solid rgba(0, 114, 206, 0.14);
          border-radius: 1.25rem;
          padding: 1.35rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease, border-color 0.25s ease, background-color 0.25s ease;
        }

        body.dark-mode .about-stat-card {
          background: #121820;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
        }

        .about-stat-card:hover {
          border-color: rgba(0, 114, 206, 0.28);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.07);
        }

        body.dark-mode .about-stat-card:hover {
          background: #16202c;
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.95rem;
          font-weight: 800;
          color: #0072ce;
          line-height: 1;
        }

        body.dark-mode .stat-number {
          color: #ffffff;
        }

        .stat-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        /* Competencia Lingüística & Comunicación Profesional */
        .about-languages-block {
          margin-bottom: 2.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .languages-block-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 700;
          color: #0072ce;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        body.dark-mode .languages-block-title {
          color: #38bdf8;
        }

        .lang-globe-icon {
          color: #0072ce;
        }

        body.dark-mode .lang-globe-icon {
          color: #38bdf8;
        }

        .languages-linear-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .lang-linear-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .lang-linear-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .lang-flag-bullet {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.15rem;
          flex-shrink: 0;
          border-radius: 4px;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
        }

        .lang-linear-item:hover .lang-flag-bullet {
          transform: translateY(-1px) scale(1.06);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 114, 206, 0.2);
        }

        body.dark-mode .lang-flag-bullet {
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15);
        }

        body.dark-mode .lang-linear-item:hover .lang-flag-bullet {
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(56, 189, 248, 0.4);
        }

        .lang-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .lang-heading-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .lang-name-label {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-h);
        }

        .lang-level-badge {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-muted);
          display: flex;
          align-items: center;
        }
        
        .lang-level-badge::before {
          content: '—';
          margin-right: 0.4rem;
          color: var(--text-muted);
        }

        .lang-detail-text {
          font-size: 0.86rem;
          line-height: 1.5;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 960px) {
          .about-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .about-photo-card {
            max-width: 340px;
            height: 320px;
            margin: 0 auto;
            border-radius: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .about-heading {
            font-size: clamp(1.65rem, 5.5vw, 2.15rem);
            margin-bottom: 0.95rem;
          }
          .about-paragraph {
            font-size: 0.92rem;
            line-height: 1.6;
          }
          .lang-linear-item {
            gap: 0.65rem;
          }
          .lang-detail-text {
            font-size: 0.82rem;
          }
          .about-stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
          .about-stat-card {
            padding: 0.9rem 0.4rem;
            border-radius: 0.95rem;
            text-align: center;
            align-items: center;
          }
          .stat-number {
            font-size: 1.5rem;
          }
          .stat-label {
            font-size: 0.58rem;
            letter-spacing: 0.04em;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
