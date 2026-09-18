import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight, ArrowUp } from 'lucide-react';
import joeLogo from '../assets/joe-technology-logo-transparent.png';
import { 
  PreciseWorldClockIcon, 
  EstonianFlagBadge, 
  UniversalTimeIcon, 
  LocationPinIcon, 
  NetworkConnectIcon 
} from './icons/FlaticonVectors';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState<Date>(new Date());

  // Actualización en tiempo real del reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Formateadores de zonas horarias
  const tallinnTime = time.toLocaleTimeString('es-ES', {
    timeZone: 'Europe/Tallinn',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const utcTime = time.toLocaleTimeString('es-ES', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const localTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ');

  return (
    <footer className="footer-dark-root">
      <div className="container footer-main-container">
        
        {/* Top Grid: 4 Columnas de Información Global y Profesional */}
        <div className="footer-top-grid">
          
          {/* Columna 1: Marca & Misión */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo">
              <img src={joeLogo} alt="JoE TECHNOLOGY" className="footer-brand-logo-img" />
              <div className="footer-brand-text">
                <span className="logo-name">JUAN ORTEGA</span>
                <span className="logo-subbrand">JoE TECHNOLOGY</span>
              </div>
            </div>
            <p className="footer-bio-text">
              {language === 'en' 
                ? 'Software developer focused on transforming complex ideas into scalable, solid and human digital products.'
                : language === 'et'
                ? 'Tarkvaraarendaja, kes on pühendunud keeruliste ideede muutmisele skaleeritavateks ja inimlikeks digilahendusteks.'
                : 'Desarrollador de software enfocado en transformar ideas complejas en experiencias tecnológicas útiles, escalables y humanas.'}
            </p>
            <div className="footer-built-meta">
              <span className="footer-built-techs">React 18 · TypeScript · Supabase · Framer</span>
            </div>
          </div>

          {/* Columna 2: Horarios Globales en Vivo (Multi-Timezone) */}
          <div className="footer-col footer-col-clocks">
            <div className="footer-col-header">
              <PreciseWorldClockIcon size={18} color="#0072ce" className="col-icon" />
              <h4>{language === 'en' ? 'Global Timezones' : language === 'et' ? 'Globaalne Aeg' : 'Horarios Globales'}</h4>
            </div>

            <div className="time-clocks-list">
              {/* Tallinn, Estonia */}
              <div className="clock-item">
                <div className="clock-label-group">
                  <div className="clock-icon-wrapper">
                    <EstonianFlagBadge className="clock-flag-badge" />
                  </div>
                  <div className="clock-info">
                    <span className="clock-city">Tallinn, Estonia</span>
                    <span className="clock-zone">EEST (UTC+3)</span>
                  </div>
                </div>
                <div className="clock-digit-box">
                  <span className="clock-digit">{tallinnTime}</span>
                </div>
              </div>

              {/* UTC / Universal Time */}
              <div className="clock-item">
                <div className="clock-label-group">
                  <div className="clock-icon-wrapper">
                    <UniversalTimeIcon size={18} color="#0072ce" className="clock-globe-icon" />
                  </div>
                  <div className="clock-info">
                    <span className="clock-city">Universal Time</span>
                    <span className="clock-zone">UTC / GMT</span>
                  </div>
                </div>
                <div className="clock-digit-box">
                  <span className="clock-digit">{utcTime}</span>
                </div>
              </div>

              {/* Tu Hora Local */}
              <div className="clock-item">
                <div className="clock-label-group">
                  <div className="clock-icon-wrapper">
                    <LocationPinIcon size={18} color="#38bdf8" className="clock-pin-icon" />
                  </div>
                  <div className="clock-info">
                    <span className="clock-city">{language === 'en' ? 'Your Local Time' : language === 'et' ? 'Sinu Kohalik Aeg' : 'Tu Hora Local'}</span>
                    <span className="clock-zone">{localTimeZoneName}</span>
                  </div>
                </div>
                <div className="clock-digit-box">
                  <span className="clock-digit">{localTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 3: Enlaces y Redes de Ingeniería Directas */}
          <div className="footer-col footer-col-links">
            <div className="footer-col-header">
              <NetworkConnectIcon size={18} color="#0072ce" className="col-icon" />
              <h4>{language === 'en' ? 'Engineering & Connect' : language === 'et' ? 'Ühendus ja Võrgustik' : 'Redes & Ingeniería'}</h4>
            </div>

            <div className="social-links-grid">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-footer-btn"
                title="GitHub Repositories"
              >
                <div className="social-btn-left">
                  <Github size={18} />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight size={15} className="social-arrow" />
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-footer-btn"
                title="LinkedIn Profile"
              >
                <div className="social-btn-left">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight size={15} className="social-arrow" />
              </a>

              <a 
                href="mailto:tuemail@dominio.com" 
                className="social-footer-btn"
                title="Email Directo"
              >
                <div className="social-btn-left">
                  <Mail size={18} />
                  <span>Email</span>
                </div>
                <ArrowUpRight size={15} className="social-arrow" />
              </a>

              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-footer-btn"
                title="Telegram / WhatsApp Directo"
              >
                <div className="social-btn-left">
                  <MessageCircle size={18} />
                  <span>Telegram</span>
                </div>
                <ArrowUpRight size={15} className="social-arrow" />
              </a>
            </div>
          </div>

          {/* Columna 4: Navegación Rápida & Acceso Admin */}
          <div className="footer-col footer-col-nav">
            <div className="footer-col-header">
              <h4>{language === 'en' ? 'Navigation' : language === 'et' ? 'Navigatsioon' : 'Navegación'}</h4>
            </div>

            <ul className="footer-nav-list">
              <li><a href="#hero" className="footer-nav-link">{language === 'en' ? 'Home' : language === 'et' ? 'Avaleht' : 'Inicio'}</a></li>
              <li><a href="#about" className="footer-nav-link">{language === 'en' ? 'About me' : language === 'et' ? 'Minust' : 'Sobre mí'}</a></li>
              <li><a href="#projects" className="footer-nav-link">{language === 'en' ? 'Projects' : language === 'et' ? 'Projektid' : 'Proyectos'}</a></li>
              <li><a href="#skills" className="footer-nav-link">{language === 'en' ? 'Tech Stack' : language === 'et' ? 'Tehnoloogiad' : 'Tecnologías'}</a></li>
              <li><a href="#contact" className="footer-nav-link">{language === 'en' ? 'Contact' : language === 'et' ? 'Kontakt' : 'Contacto'}</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Row: Copyright, Slogan & Language Pill */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <p className="copyright-text">
              © {currentYear} Juan Ortega · {language === 'en' ? 'Software Developer' : language === 'et' ? 'Tarkvaraarendaja' : 'Desarrollador de Software'}
            </p>
            <span className="bottom-divider">·</span>
            <p className="slogan-text">
              Estonia-Minded · Clean Code · Human Centric
            </p>
          </div>

          <div className="bottom-right">
            {/* Botón de flecha para subir al inicio de la página */}
            <button
              onClick={scrollToTop}
              className="footer-scroll-top-btn"
              aria-label={language === 'en' ? 'Back to top' : language === 'et' ? 'Tagasi üles' : 'Volver arriba'}
              title={language === 'en' ? 'Back to top' : language === 'et' ? 'Tagasi üles' : 'Volver arriba'}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        /* =========================================================
           ☀️ MODO CLARO (Default): FOOTER NEGRO PARA CONTRASTE CON FONDO BLANCO
           ========================================================= */
        .footer-dark-root {
          background: #0c1014;
          padding: 5rem 0 2rem 0;
          color: #f1f5f9;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0;
          position: relative;
          width: 100%;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .footer-main-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 3.5rem;
          box-sizing: border-box;
          background: transparent;
          border-radius: 0;
          box-shadow: none;
          border: none;
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        @media (max-width: 960px) {
          .footer-main-container {
            padding: 0 2rem;
          }
        }

        /* Top Grid de 4 Columnas */
        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.25fr 1.2fr 1.05fr 0.75fr;
          gap: 3.5rem;
        }

        @media (max-width: 1024px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 2.25rem;
          }
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .footer-col-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .col-icon {
          color: #0072ce;
        }

        .footer-col-header h4 {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        /* Columna 1: Brand */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-brand-logo-img {
          height: 42px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .footer-brand-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .logo-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.05rem;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .logo-subbrand {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #38bdf8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .footer-bio-text {
          font-size: 0.88rem;
          line-height: 1.62;
          color: #94a3b8;
          max-width: 320px;
        }

        .footer-built-meta {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          padding: 0;
          margin-top: 0.2rem;
        }

        .footer-built-techs {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: #94a3b8;
          letter-spacing: 0.03em;
          opacity: 0.85;
          transition: opacity 0.2s ease, color 0.2s ease;
        }

        .footer-built-techs:hover {
          opacity: 1;
          color: #ffffff;
        }

        /* Columna 2: Clocks Multi-Timezone */
        .time-clocks-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .clock-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.9rem;
          padding: 0.65rem 0.85rem;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease;
        }

        .clock-item:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.16);
          transform: translateX(2px);
        }

        .clock-label-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .clock-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .clock-globe-icon {
          color: #0072ce;
        }

        .clock-pin-icon {
          color: #38bdf8;
        }

        .clock-info {
          display: flex;
          flex-direction: column;
        }

        .clock-city {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
        }

        .clock-zone {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #64748b;
        }

        .clock-digit-box {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.45);
          padding: 0.35rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .clock-digit {
          font-family: var(--font-mono);
          font-size: 0.84rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.06em;
        }

        /* Columna 3: Social & Engineering Links */
        .social-links-grid {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .social-footer-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.85rem;
          padding: 0.65rem 0.9rem;
          color: #f8fafc;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .social-btn-left {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .social-arrow {
          color: #64748b;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .social-footer-btn:hover {
          background: #0072ce;
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .social-footer-btn:hover .social-arrow {
          color: #ffffff;
          transform: translate(1px, -1px);
        }

        /* Columna 4: Navigation */
        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin: 0;
          padding: 0;
        }

        .footer-nav-link {
          font-size: 0.85rem;
          color: #94a3b8;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }

        .footer-nav-link:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        .admin-pill-link {
          color: #cbd5e1;
          font-weight: 600;
          font-size: 0.78rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.6rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-top: 0.25rem;
          transition: all 0.2s ease;
        }

        .admin-pill-link:hover {
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          background: #0072ce;
        }

        /* Bottom Row */
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          padding-bottom: 0.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .bottom-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .copyright-text {
          font-size: 0.82rem;
          color: #94a3b8;
          margin: 0;
        }

        .bottom-divider {
          color: #475569;
        }

        .slogan-text {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: #0072ce;
          margin: 0;
          letter-spacing: 0.04em;
          font-weight: 600;
        }

        /* Botón Scroll hacia arriba */
        .footer-scroll-top-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .footer-scroll-top-btn:hover {
          background: #0072ce;
          border-color: #0072ce;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0, 114, 206, 0.4);
        }

        /* =========================================================
           🌙 MODO OSCURO (body.dark-mode): FOOTER BLANCO PARA CONTRASTE CON FONDO NEGRO
           ========================================================= */
        body.dark-mode .footer-dark-root {
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          color: #1e293b;
        }

        body.dark-mode .footer-col-header h4 {
          color: #030712;
        }

        body.dark-mode .logo-name {
          color: #030712;
        }

        body.dark-mode .logo-subbrand {
          color: #0072ce;
        }

        body.dark-mode .footer-bio-text {
          color: #475569;
        }

        body.dark-mode .footer-built-techs {
          color: #64748b;
        }

        body.dark-mode .footer-built-techs:hover {
          color: #030712;
        }

        body.dark-mode .clock-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        body.dark-mode .clock-item:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        body.dark-mode .clock-icon-wrapper {
          background: #ffffff;
          border: 1px solid #e2e8f0;
        }

        body.dark-mode .clock-pin-icon {
          color: #0072ce;
        }

        body.dark-mode .clock-city {
          color: #0f172a;
        }

        body.dark-mode .clock-zone {
          color: #64748b;
        }

        body.dark-mode .clock-digit-box {
          background: #0f172a;
          border: 1px solid #1e293b;
        }

        body.dark-mode .clock-digit {
          color: #ffffff;
        }

        body.dark-mode .social-footer-btn {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
        }

        body.dark-mode .social-footer-btn:hover {
          background: #0072ce;
          border-color: #0072ce;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 114, 206, 0.2);
        }

        body.dark-mode .social-arrow {
          color: #64748b;
        }

        body.dark-mode .social-footer-btn:hover .social-arrow {
          color: #ffffff;
        }

        body.dark-mode .footer-nav-link {
          color: #475569;
        }

        body.dark-mode .footer-nav-link:hover {
          color: #0072ce;
        }

        body.dark-mode .admin-pill-link {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #0f172a;
        }

        body.dark-mode .admin-pill-link:hover {
          background: #0072ce;
          border-color: #0072ce;
          color: #ffffff;
        }

        body.dark-mode .footer-bottom-bar {
          border-top: 1px solid #e2e8f0;
        }

        body.dark-mode .copyright-text {
          color: #64748b;
        }

        body.dark-mode .bottom-divider {
          color: #cbd5e1;
        }

        body.dark-mode .slogan-text {
          color: #0072ce;
        }

        body.dark-mode .footer-scroll-top-btn {
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          color: #0f172a;
        }

        body.dark-mode .footer-scroll-top-btn:hover {
          background: #0072ce;
          border-color: #0072ce;
          color: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0, 114, 206, 0.3);
        }

        @media (max-width: 640px) {
          .footer-dark-root {
            padding: 3.5rem 0 1.5rem 0;
          }
          .footer-main-container {
            padding: 0 1.25rem;
            border-radius: 0;
            gap: 2.25rem;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .bottom-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.35rem;
          }
          .bottom-divider {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
