import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Target, Globe, Plane, CheckCircle2, Sparkles } from 'lucide-react';
import tallinnImage from '../assets/ImageEstonia.jpeg';

const About: React.FC = () => {
  const { language, t } = useLanguage();

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      about_subtitle: { es: 'Conoce un poco más', en: 'Get to know more', et: 'Saa rohkem teada' },
      about_title: { es: 'Sobre Mí', en: 'About Me', et: 'Minust' },
      about_badge_1: { es: 'Inglés: B1/B2 – Competencia profesional', en: 'English: B1/B2 – Professional proficiency', et: 'Inglise keel: B1/B2 – Professionaalne pädevus' },
      about_badge_2: { es: 'Estatus: Remoto / Abierto a reubicación Estonia', en: 'Status: Remote / Open to Estonia relocation', et: 'Staatus: Kaugtöö / Avatud Eesti ümberasumisele' },
      about_badge_3: { es: 'Meta: Trabajar en Estonia, alto rendimiento', en: 'Goal: To work in Estonia, high performance', et: 'Eesmärk: Töötada Eestis, kõrge jõudlus' },
      about_text_1: { 
        es: 'Ingeniero en Informática (próximo a graduarse) con experiencia comprobada en desarrollo Full-Stack.', 
        en: 'Computer Engineer (soon to graduate) with proven experience in Full-Stack development.', 
        et: 'Informaatikainsener (peagi lõpetamas), kellel on tõestatud kogemus Full-Stack arenduses.' 
      },
      about_text_2: { 
        es: 'Optimización de consultas SQL y reducción de tiempos de carga en un 20%.', 
        en: 'SQL query optimization and 20% reduction in load times.', 
        et: 'SQL päringute optimeerimine ja laadimisaegade vähendamine 20%.' 
      },
      about_text_3: { 
        es: 'Apasionado por la seguridad, cifrado de datos y código limpio.', 
        en: 'Passionate about security, data encryption, and clean code.', 
        et: 'Kirglik turvalisuse, andmete krüpteerimise ja puhta koodi vastu.' 
      },
      about_text_4: { 
        es: 'Uso de asistentes de IA para acelerar el desarrollo manteniendo la calidad.', 
        en: 'Use of AI assistants to accelerate development while maintaining quality.', 
        et: 'AI assistentide kasutamine arenduse kiirendamiseks, säilitades kvaliteedi.' 
      },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const badges = [
    { icon: Globe, label: getT('about_badge_1', getFallback('about_badge_1')) },
    { icon: Plane, label: getT('about_badge_2', getFallback('about_badge_2')) },
    { icon: Target, label: getT('about_badge_3', getFallback('about_badge_3')) }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {getT('about_subtitle', getFallback('about_subtitle'))}
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
          >
            {getT('about_title', getFallback('about_title'))}
          </motion.h2>
        </div>

        <div className="about-grid">
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="about-visual glass" style={{ backgroundImage: `url(${tallinnImage})` }}>
              <div className="visual-overlay"></div>
              <div className="visual-circle circle-1"></div>
              <div className="visual-circle circle-2"></div>
              <div className="visual-content">
                <Target size={48} className="visual-icon" />
                <h3>{badges[2].label}</h3>
                <div className="estonia-info">
                   <Sparkles size={16} />
                   <span>Capital Digital de Europa</span>
                </div>
                <div className="estonia-tags">
                  e-Residency · Talento Global
                </div>
              </div>
            </div>
          </motion.div>

          <div className="about-content">
            <motion.div 
              className="about-text glass"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ul className="text-list">
                <li><CheckCircle2 size={20} className="check-icon" /> {getT('about_text_1', getFallback('about_text_1'))}</li>
                <li><CheckCircle2 size={20} className="check-icon" /> {getT('about_text_2', getFallback('about_text_2'))}</li>
                <li><CheckCircle2 size={20} className="check-icon" /> {getT('about_text_3', getFallback('about_text_3'))}</li>
                <li><CheckCircle2 size={20} className="check-icon" /> {getT('about_text_4', getFallback('about_text_4'))}</li>
              </ul>
            </motion.div>

            <div className="about-badges">
              {badges.slice(0, 2).map((badge, index) => (
                <motion.div 
                  key={index}
                  className="badge-card glass"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="badge-icon">
                    <badge.icon size={24} />
                  </div>
                  <span>{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-subtitle {
          display: inline-block;
          color: var(--primary);
          font-family: var(--heading);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
          background: rgba(168, 85, 247, 0.1);
          padding: 0.4rem 1rem;
          border-radius: 2rem;
        }
        .section-title {
          font-size: 3rem;
          position: relative;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 4rem;
          align-items: center;
        }
        .about-image-wrapper {
          position: relative;
          height: 100%;
          min-height: 450px;
        }
        .about-visual {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          border: 1px solid var(--border);
          border-radius: 2rem;
          box-shadow: var(--shadow);
        }
        .visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%);
          z-index: 1;
        }
        .about-visual::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10px;
          background: linear-gradient(90deg, #0072CE 33%, #000000 33%, #000000 66%, #FFFFFF 66%);
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
          z-index: 3;
        }
        .visual-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 2;
          opacity: 0.3;
        }
        .circle-1 {
          width: 300px;
          height: 300px;
          background: var(--primary);
          top: -15%;
          left: -15%;
        }
        .circle-2 {
          width: 350px;
          height: 350px;
          background: #0072CE;
          bottom: -20%;
          right: -10%;
        }
        .visual-content {
          position: relative;
          z-index: 3;
          text-align: center;
          padding: 2rem 1.2rem;
          background: var(--bg-card);
          backdrop-filter: blur(6px);
          border: 1px solid var(--border);
          border-radius: 1.5rem;
          max-width: 90%;
          box-shadow: var(--shadow);
        }
        .visual-icon {
          color: var(--primary);
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 10px var(--primary));
        }
        .visual-content h3 {
          font-size: 1.4rem;
          line-height: 1.4;
          margin-bottom: 1rem;
          color: var(--text-h);
          font-family: var(--heading);
        }
        .estonia-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #0072CE;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        .estonia-tags {
          font-size: 0.85rem;
          color: var(--text);
          opacity: 0.7;
          font-family: var(--mono);
          letter-spacing: 0.5px;
        }
        
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .about-text {
          padding: 2.5rem;
          border-left: 4px solid var(--primary);
        }
        .text-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .text-list li {
          display: flex;
          gap: 1rem;
          font-size: 1.1rem;
          line-height: 1.6;
          color: var(--text);
        }
        .check-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .about-badges {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .badge-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.03);
        }
        .badge-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
          background: rgba(168, 85, 247, 0.05);
        }
        .badge-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .badge-card span {
          font-family: var(--heading);
          font-weight: 600;
          font-size: 1.1rem;
          line-height: 1.4;
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .about-image-wrapper {
            min-height: 350px;
          }
        }
        @media (max-width: 768px) {
          .about-badges {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
