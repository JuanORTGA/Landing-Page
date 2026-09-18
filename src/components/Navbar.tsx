import React, { useState, useEffect } from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import joeLogo from '../assets/joe-technology-logo-transparent.png';

const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const handleScroll = () => {
      // Activa el marco al comenzar a bajar la página
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    if (next) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const navLinks = [
    { id: 'about', es: 'Sobre mí', en: 'About me', et: 'Minust' },
    { id: 'experience', es: 'Experiencia', en: 'Experience', et: 'Kogemus' },
    { id: 'projects', es: 'Proyectos', en: 'Projects', et: 'Projektid' },
    { id: 'contact', es: 'Contacto', en: 'Contact', et: 'Kontakt' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
    { code: 'et', label: 'ET' },
  ];

  return (
    <nav className={`navbar-root ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Left: Brand Logo */}
        <a href="#hero" className="nav-logo" title="JoE TECHNOLOGY · Juan Ortega">
          <img 
            src={joeLogo} 
            alt="JoE TECHNOLOGY" 
            className="nav-brand-logo-img" 
          />
          <span className="logo-text">
            JUAN ORTEGA <span className="logo-divider">/</span> {language === 'es' ? 'PORTAFOLIO' : language === 'et' ? 'PORTFOOLIO' : 'PORTFOLIO'}
          </span>
        </a>

        {/* Center: Navigation Links */}
        <ul className="nav-menu desktop-only">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="nav-link">
                {link[language] || link.es}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: Actions */}
        <div className="nav-actions">
          {/* Dark / Light Theme Toggle Button con Animación Cósmica de Rodamiento */}
          <motion.button 
            className={`theme-toggle-btn ${isDarkMode ? 'is-dark' : 'is-light'}`}
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Cambiar a modo claro (Amanecer)' : 'Cambiar a modo oscuro (Anochecer)'}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            {/* Resplandor ambiental de fondo */}
            <div className="celestial-glow-backdrop" />

            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.div
                  key="moon-body"
                  className="celestial-orbit-stage moon-stage"
                  initial={{ x: -28, y: 7, rotate: -260, scale: 0.25, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    y: 0, 
                    rotate: 0, 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 19,
                      mass: 0.75
                    }
                  }}
                  exit={{ 
                    x: 28, 
                    y: 7, 
                    rotate: 260, 
                    scale: 0.25, 
                    opacity: 0,
                    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] }
                  }}
                >
                  <Moon size={18} className="celestial-svg moon-svg" />

                  {/* Micro-estrellas centelleantes que acompañan a la luna */}
                  <motion.span 
                    className="celestial-twinkle star-top"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1], 
                      opacity: [0, 1, 0.85] 
                    }}
                    transition={{ delay: 0.18, duration: 0.35 }}
                  >
                    ✦
                  </motion.span>
                  <motion.span 
                    className="celestial-twinkle star-bottom"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.3, 1], 
                      opacity: [0, 1, 0.7] 
                    }}
                    transition={{ delay: 0.24, duration: 0.35 }}
                  >
                    •
                  </motion.span>
                </motion.div>
              ) : (
                <motion.div
                  key="sun-body"
                  className="celestial-orbit-stage sun-stage"
                  initial={{ x: -28, y: 7, rotate: -260, scale: 0.25, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    y: 0, 
                    rotate: 0, 
                    scale: 1, 
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 19,
                      mass: 0.75
                    }
                  }}
                  exit={{ 
                    x: 28, 
                    y: 7, 
                    rotate: 260, 
                    scale: 0.25, 
                    opacity: 0,
                    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] }
                  }}
                >
                  <Sun size={19} className="celestial-svg sun-svg" />
                  
                  {/* Aura solar radiante con destello al entrar */}
                  <motion.div 
                    className="sun-corona-flare"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ 
                      scale: [0.5, 1.35, 1], 
                      opacity: [0, 0.7, 0] 
                    }}
                    transition={{ duration: 0.45 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Language Selector Pill */}
          <div className="lang-pill-group">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                onClick={() => setLanguage(lang.code)}
                aria-label={`Cambiar a ${lang.label}`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <a href="#contact" className="btn-pill-navy nav-cta-btn desktop-only">
            {language === 'en' ? "Let's talk" : language === 'et' ? 'Räägime' : 'Hablemos'}
          </a>

          {/* Mobile Hamburger (Only on mobile devices < 768px) */}
          <button 
            className="mobile-toggle-btn mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menú móvil"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-drawer mobile-only"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mobile-drawer-content">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="mobile-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link[language] || link.es}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-pill-navy mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {language === 'en' ? "Let's talk" : language === 'et' ? 'Räägime' : 'Hablemos'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* =========================================================
           1. ESTADO INICIAL (Arriba, sobre las fotos del Hero):
              100% Transparente y libre de marco
           ========================================================= */
        .navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.35rem 0;
          background: transparent;
          border: none;
          box-shadow: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* =========================================================
           2. ESTADO AL HACER SCROLL (Pasando las fotos):
              Aparece el marco de cristal esmerilado sticky
           ========================================================= */
        .navbar-root.is-scrolled {
          padding: 0.85rem 0;
          background: rgba(255, 255, 255, 0.96) !important;
          backdrop-filter: blur(16px) !important;
          -webkit-backdrop-filter: blur(16px) !important;
          border-bottom: 1px solid rgba(0, 114, 206, 0.15) !important;
          box-shadow: 0 8px 30px -4px rgba(0, 114, 206, 0.08) !important;
        }

        body.dark-mode .navbar-root.is-scrolled {
          background: rgba(12, 16, 20, 0.95) !important;
          border-bottom: 1px solid rgba(0, 114, 206, 0.25) !important;
          box-shadow: 0 8px 30px -4px rgba(0, 0, 0, 0.75) !important;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.98rem;
          color: #ffffff;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s ease, color 0.3s ease;
        }

        .nav-logo:hover {
          transform: translateY(-1px);
        }

        .nav-brand-logo-img {
          height: 34px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: transform 0.25s ease;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25));
        }

        .nav-logo:hover .nav-brand-logo-img {
          transform: scale(1.05);
        }

        .logo-text {
          font-weight: 800;
        }

        .logo-divider {
          color: rgba(255, 255, 255, 0.6);
          font-weight: 400;
          margin: 0 0.2rem;
          transition: color 0.3s ease;
        }

        /* Menu Links */
        .nav-menu {
          display: flex;
          list-style: none;
          align-items: center;
          gap: 2.25rem;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          font-size: 0.94rem;
          font-weight: 600;
          color: #ffffff;
          opacity: 0.92;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
          transition: all 0.25s ease;
        }

        .nav-link:hover {
          opacity: 1;
          color: #38bdf8;
          transform: translateY(-1px);
        }

        body.dark-mode .nav-link:hover {
          color: #38bdf8;
        }

        /* =========================================================
           3. CAMBIOS DE COLOR AUTOMÁTICOS AL ACTIVARSE EL MARCO:
              Máxima nitidez sobre los fondos blancos/oscuros del sitio
           ========================================================= */
        .navbar-root.is-scrolled .nav-logo {
          color: var(--text-h);
          text-shadow: none;
        }

        .navbar-root.is-scrolled .logo-divider {
          color: var(--text-muted);
        }

        .navbar-root.is-scrolled .nav-link {
          color: var(--text);
          text-shadow: none;
          opacity: 1;
        }

        .navbar-root.is-scrolled .nav-link:hover {
          color: var(--primary-blue);
        }

        body.dark-mode .navbar-root.is-scrolled .nav-link:hover {
          color: var(--kicker);
        }

        /* Right Actions */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        /* =========================================================
           THEME TOGGLE BUTTON - RUEDA CÓSMICA & ANIMACIÓN CELESTIAL
           ========================================================= */
        .theme-toggle-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-h);
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
          padding: 0;
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }

        .theme-toggle-btn.is-light {
          background: rgba(255, 255, 255, 0.96);
          border-color: rgba(245, 158, 11, 0.28);
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.14), 0 0 0 1px rgba(245, 158, 11, 0.08);
        }

        .theme-toggle-btn.is-light:hover {
          border-color: #f59e0b;
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.32), 0 0 14px rgba(245, 158, 11, 0.25);
        }

        .theme-toggle-btn.is-dark {
          background: rgba(15, 23, 42, 0.95);
          border-color: rgba(56, 189, 248, 0.35);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.55), 0 0 12px rgba(56, 189, 248, 0.18);
        }

        .theme-toggle-btn.is-dark:hover {
          border-color: #38bdf8;
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.65), 0 0 18px rgba(56, 189, 248, 0.45);
        }

        .celestial-glow-backdrop {
          position: absolute;
          inset: -30%;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.18;
          transition: opacity 0.3s ease;
        }

        .theme-toggle-btn.is-light .celestial-glow-backdrop {
          background: radial-gradient(circle, rgba(245, 158, 11, 0.5) 0%, transparent 70%);
        }

        .theme-toggle-btn.is-dark .celestial-glow-backdrop {
          background: radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, transparent 70%);
        }

        /* Celestial Orbit Stage */
        .celestial-orbit-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center center;
          user-select: none;
        }

        /* Sun Icon Styling & Hover Reactivity */
        .sun-svg {
          color: #f59e0b;
          filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.65));
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
        }

        .theme-toggle-btn:hover .sun-svg {
          transform: rotate(35deg) scale(1.12);
          filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.9));
        }

        .sun-corona-flare {
          position: absolute;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, transparent 75%);
          pointer-events: none;
        }

        /* Moon Icon Styling & Hover Reactivity */
        .moon-svg {
          color: #38bdf8;
          filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.7));
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
        }

        .theme-toggle-btn:hover .moon-svg {
          transform: rotate(-20deg) scale(1.1);
          filter: drop-shadow(0 0 11px rgba(56, 189, 248, 0.95));
        }

        /* Micro-estrellas centelleantes en modo oscuro */
        .celestial-twinkle {
          position: absolute;
          pointer-events: none;
          line-height: 1;
          user-select: none;
        }

        .star-top {
          top: 6px;
          right: 8px;
          font-size: 8px;
          color: #e0f2fe;
          filter: drop-shadow(0 0 3px rgba(224, 242, 254, 0.9));
          animation: starTwinklePulse 2.2s ease-in-out infinite alternate;
        }

        .star-bottom {
          bottom: 8px;
          left: 8px;
          font-size: 5px;
          color: #38bdf8;
          filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.8));
          animation: starTwinklePulse 2.7s ease-in-out infinite alternate-reverse;
        }

        @keyframes starTwinklePulse {
          0% {
            opacity: 0.45;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.35);
          }
          100% {
            opacity: 0.55;
            transform: scale(0.9);
          }
        }

        /* Language Pill Group */
        .lang-pill-group {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 2rem;
          padding: 0.2rem 0.3rem;
          gap: 0.15rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .lang-btn {
          background: transparent;
          border: none;
          border-radius: 1.5rem;
          padding: 0.25rem 0.65rem;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .lang-btn.active {
          background: #050811;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        }

        body.dark-mode .lang-btn.active {
          background: #0072ce;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
        }

        .nav-cta-btn {
          font-size: 0.88rem;
          padding: 0.55rem 1.4rem;
          background: #050811;
          color: #ffffff !important;
          border: 1px solid rgba(0, 0, 0, 0.12);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.14);
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.22s ease, border-color 0.2s ease;
        }

        .nav-cta-btn:hover {
          background: #005fa8 !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          color: #ffffff !important;
          transform: translateY(-1.5px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2) !important;
        }

        body.dark-mode .nav-cta-btn {
          background: #0072ce;
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        body.dark-mode .nav-cta-btn:hover {
          background: #005fa8 !important;
          border-color: rgba(255, 255, 255, 0.28) !important;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
        }

        /* Responsive rules */
        .mobile-only {
          display: none !important;
        }

        .desktop-only {
          display: flex !important;
        }

        .mobile-toggle-btn {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .navbar-root.is-scrolled .mobile-toggle-btn {
          color: var(--text-h);
          background: var(--bg-card);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0.75rem;
          right: 0.75rem;
          background: rgba(14, 22, 32, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 1.5rem;
          padding: 1.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          margin-top: 0.5rem;
          z-index: 1001;
        }

        .mobile-drawer-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-link {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: color 0.2s ease;
        }

        .mobile-link:hover {
          color: #38bdf8;
        }

        .mobile-cta {
          width: 100%;
          text-align: center;
          margin-top: 0.5rem;
          background: #0072ce;
          color: #ffffff;
          padding: 0.75rem;
          border-radius: 2rem;
          font-weight: 700;
          display: block;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
          .nav-logo {
            font-size: 0.88rem;
          }
          .logo-text .logo-divider,
          .logo-text span:last-child {
            display: none;
          }
          .nav-actions {
            gap: 0.45rem;
          }
          .lang-pill-group {
            padding: 0.15rem;
          }
          .lang-btn {
            padding: 0.25rem 0.45rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
