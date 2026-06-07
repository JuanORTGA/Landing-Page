import React, { useState, useEffect } from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme !== 'light';
  });

  useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  const navLinks = [
    { id: 'about', es: 'Sobre Mí', en: 'About', et: 'Minust' },
    { id: 'skills', es: 'Habilidades', en: 'Skills', et: 'Oskused' },
    { id: 'experience', es: 'Experiencia', en: 'Experience', et: 'Kogemus' },
    { id: 'projects', es: 'Proyectos', en: 'Projects', et: 'Projektid' },
    { id: 'contact', es: 'Contacto', en: 'Contact', et: 'Kontakt' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'ES', flag: 'ES' },
    { code: 'en', label: 'EN', flag: 'EN' },
    { code: 'et', label: 'ET', flag: 'ET' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-content">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo"
        >
          <span>JD</span>Ortega.
        </motion.div>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link[language]}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="lang-selector">
            <Globe size={18} className="lang-icon" />
            <div className="lang-btns-wrapper">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-btn ${language === lang.code ? 'active' : ''}`}
                  onClick={() => setLanguage(lang.code)}
                  title={lang.label}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
          </div>

          <button 
            className="mobile-menu-toggle mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu glass mobile-only"
          >
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link[language]}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          padding: 1rem 0;
          background: rgba(11, 12, 16, 0.8);
          border-bottom: 1px solid var(--border);
          border-radius: 0;
        }
        body.light-mode .navbar.scrolled {
          background: rgba(255, 255, 255, 0.85);
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-family: var(--heading);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-h);
          letter-spacing: -0.05em;
        }
        .logo span {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          font-family: var(--heading);
          font-weight: 600;
          font-size: 1rem;
          color: var(--text);
          position: relative;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .nav-links a:hover {
          color: var(--text-h);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        /* Theme Toggle Button */
        .theme-toggle {
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--primary);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          transform: scale(1.1);
          background: var(--accent-bg);
          color: var(--primary-hover);
        }

        /* Language Selector Enhancement */
        .lang-icon {
          color: var(--primary);
        }
        .lang-selector {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--bg-card);
          padding: 0.3rem 0.5rem 0.3rem 0.8rem;
          border-radius: 3rem;
          border: 1px solid var(--border);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        .lang-btns-wrapper {
          display: flex;
          gap: 0.3rem;
        }
        .lang-btn {
          background: transparent;
          font-family: var(--heading);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text);
          padding: 0.3rem 0.6rem;
          border: none;
          cursor: pointer;
          border-radius: 2rem;
          transition: all 0.3s ease;
        }
        .lang-btn:hover {
          color: var(--text-h);
          background: rgba(255,255,255,0.05);
        }
        body.light-mode .lang-btn:hover {
          background: rgba(0,0,0,0.05);
        }
        .lang-btn.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          box-shadow: 0 4px 10px rgba(168, 85, 247, 0.3);
        }

        .mobile-only {
          display: none;
        }
        .mobile-menu-toggle {
          background: transparent;
          border: none;
          color: var(--text-h);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu {
          position: absolute;
          top: 100%;
          left: 1rem;
          right: 1rem;
          padding: 1.5rem;
          border-radius: 1rem;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        .mobile-menu ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding: 0;
          margin: 0;
        }
        .mobile-menu a {
          display: block;
          font-size: 1.2rem;
          font-family: var(--heading);
          font-weight: 600;
          color: var(--text-h);
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          .mobile-only {
            display: block;
          }
          .lang-selector {
            padding: 0.3rem;
          }
          .lang-icon {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
