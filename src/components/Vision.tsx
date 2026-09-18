import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { DigitalEcosystemIcon, CleanArchitectureIcon } from './icons/FlaticonVectors';

import visionEstoniaImg from '../assets/vision-estonia.jpg';

const Vision: React.FC = () => {
  const { language, t } = useLanguage();

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      vision_kicker: {
        es: '¿Por qué Estonia?',
        en: 'Why Estonia?',
        et: 'Miks Eesti?'
      },
      vision_title: {
        es: 'Un ecosistema donde la innovación digital es el estándar diario.',
        en: 'An ecosystem where digital innovation is the daily standard.',
        et: 'Ökosüsteem, kus digitaalne innovatsioon on igapäevane standard.'
      },
      vision_desc: {
        es: 'Me motiva la cultura tecnológica de Estonia: simple, funcional y enfocada en resolver problemas reales con software de alta calidad y arquitectura mantenible.',
        en: 'I am motivated by Estonia’s tech culture: simple, functional, and focused on solving real problems with high-quality software and maintainable architecture.',
        et: 'Mind motiveerib Eesti tehnikakultuur: lihtne, funktsionaalne ja keskendunud tõeliste probleemide lahendamisele kvaliteetse tarkvara ja hooldatava arhitektuuriga.'
      },
      item1_title: { es: 'Mentalidad de producto', en: 'Product mindset', et: 'Toote mõtteviis' },
      item1_desc: {
        es: 'Entender a fondo el problema y las necesidades del usuario antes de escribir cada línea de código.',
        en: 'Deeply understand the problem and user needs before writing a single line of code.',
        et: 'Mõista põhjalikult probleemi ja kasutaja vajadusi enne koodi kirjutamist.'
      },
      item2_title: { es: 'Arquitectura escalable', en: 'Scalable architecture', et: 'Skaleeritav arhitektuur' },
      item2_desc: {
        es: 'Código limpio, tipado estricto y bases de datos optimizadas para crecer de forma estable.',
        en: 'Clean code, strict typing, and databases optimized to scale reliably.',
        et: 'Puhas kood, range tüüpimine ja optimeeritud andmebaasid kindlaks kasvuks.'
      },
      card_kicker: {
        es: 'Estonia — Mentalidad Digital',
        en: 'Estonia — Digital Mindset',
        et: 'Eesti — Digitaalne mõtteviis'
      },
      card_text: {
        es: 'Innovación técnica, simplicidad y futuro digital.',
        en: 'Technical innovation, simplicity, and digital future.',
        et: 'Tehniline innovatsioon, lihtsus ja digitaalne tulevik.'
      },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  // Usar imagen dinámica desde Supabase o fallback al asset local
  const customVision = t('image_vision_scenic');
  const visionImageUrl = customVision && customVision !== 'image_vision_scenic' ? customVision : visionEstoniaImg;

  return (
    <section id="vision" className="vision-section">
      <div className="container">
        <div className="vision-layout">
          {/* Left Column: Vision Statement and Pillars */}
          <motion.div
            className="vision-content"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-kicker">
              <span>{getT('vision_kicker', getFallback('vision_kicker'))}</span>
              <span className="kicker-dot"></span>
            </div>

            <h2 className="vision-heading">
              {getT('vision_title', getFallback('vision_title'))}
            </h2>

            <p className="vision-lead">
              {getT('vision_desc', getFallback('vision_desc'))}
            </p>

            {/* Feature List */}
            <div className="vision-features">
              <div className="vision-feature-item">
                <div className="feature-icon-circle azure">
                  <DigitalEcosystemIcon size={22} color="#0072ce" />
                </div>
                <div className="feature-text-block">
                  <h3>{getT('item1_title', getFallback('item1_title'))}</h3>
                  <p>{getT('item1_desc', getFallback('item1_desc'))}</p>
                </div>
              </div>

              <div className="vision-feature-item">
                <div className="feature-icon-circle ice">
                  <CleanArchitectureIcon size={22} color="#38bdf8" />
                </div>
                <div className="feature-text-block">
                  <h3>{getT('item2_title', getFallback('item2_title'))}</h3>
                  <p>{getT('item2_desc', getFallback('item2_desc'))}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tallinn / Estonia Scenic Card with Floating Glass Box */}
          <motion.div
            className="vision-media-wrapper"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="scenic-editorial-wrapper">
              <div className="scenic-image-card">
                <img
                  src={visionImageUrl}
                  alt="Tallinn, Estonia"
                  className="scenic-img"
                />
              </div>

              {/* Pie de foto tipográfico directo (sin cajas, sin fondos, sin pastillas) */}
              <div className="scenic-editorial-caption">
                <span className="caption-kicker">
                  {getT('card_kicker', getFallback('card_kicker'))}
                </span>
                <p className="caption-text">
                  {getT('card_text', getFallback('card_text'))}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .vision-section {
          background: var(--bg);
          padding-top: 4.5rem;
          padding-bottom: 5.5rem;
          transition: background-color 0.3s ease;
        }

        .vision-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        .vision-content {
          display: flex;
          flex-direction: column;
        }

        .vision-heading {
          font-size: 2.25rem;
          line-height: 1.2;
          color: var(--text-h);
          margin-bottom: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .vision-lead {
          font-size: 0.98rem;
          line-height: 1.62;
          color: var(--text);
          margin-bottom: 2rem;
        }

        /* Features */
        .vision-features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .vision-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .feature-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .feature-icon-circle.azure {
          background: #e0f2fe;
          color: #0072ce;
        }

        .feature-icon-circle.ice {
          background: #f0f6fc;
          color: #0284c7;
          border: 1px solid var(--border);
        }

        body.dark-mode .feature-icon-circle.azure {
          background: #172033;
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        body.dark-mode .feature-icon-circle.ice {
          background: #111827;
          color: #7dd3fc;
          border: 1px solid var(--border);
        }

        .feature-text-block h3 {
          font-size: 1.15rem;
          color: var(--text-h);
          margin-bottom: 0.35rem;
          font-weight: 700;
        }

        .feature-text-block p {
          font-size: 0.94rem;
          color: var(--text);
          line-height: 1.55;
          margin: 0;
        }
          margin: 0;
        }

        /* Media Card */
        .vision-media-wrapper {
          position: relative;
        }

        .scenic-editorial-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .scenic-image-card {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: 1.75rem;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease, border-color 0.25s ease;
        }

        .scenic-image-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(0, 114, 206, 0.25);
        }

        .scenic-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: contrast(101%) saturate(103%);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scenic-image-card:hover .scenic-img {
          transform: scale(1.02);
        }

        /* Pie de foto tipográfico puro: sin fondos, sin cajas, sin bordes artificiales */
        .scenic-editorial-caption {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 0 0.5rem;
        }

        .caption-kicker {
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--kicker);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .caption-text {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 600;
          color: #050811;
          line-height: 1.5;
          margin: 0;
          letter-spacing: -0.01em;
        }

        body.dark-mode .caption-text {
          color: #ffffff;
        }

        @media (max-width: 960px) {
          .vision-layout {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .scenic-image-card {
            height: 320px;
          }
        }
      `}</style>
    </section>
  );
};

export default Vision;
