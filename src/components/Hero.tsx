import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, Code, Database, Layout, Sparkles, X } from 'lucide-react';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [allCvs, setAllCvs] = useState<Record<string, string>>({});

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      hero_badge: { es: 'Full-Stack Developer', en: 'Full-Stack Developer', et: 'Full-Stack Arendaja' },
      hero_specialist: { es: 'Especialista en:', en: 'Specialist in:', et: 'Spetsialist:' },
      role_1: { es: 'T.S.U en Informática', en: 'Computer Science Technician', et: 'Informaatika tehnik' },
      role_2: { es: 'Ingeniería en Informática (2026)', en: 'Computer Engineering (2026)', et: 'Informaatikainsener (2026)' },
      role_3: { es: 'Full-Stack Developer (Python, Django, React)', en: 'Full-Stack Developer (Python, Django, React)', et: 'Full-Stack Arendaja (Python, Django, React)' },
      hero_tagline: { 
        es: 'Disponible para reubicación en Estonia (requiere patrocinio de visa de trabajo)', 
        en: 'Available for relocation to Estonia (requires work visa sponsorship)', 
        et: 'Saadaval ümberasumiseks Eestisse (vajab tööviisa sponsorlust)' 
      },
      floating_1: { es: 'Desarrollo Web', en: 'Web Development', et: 'Veebiarendus' },
      floating_2: { es: 'Optimización SQL', en: 'SQL Optimization', et: 'SQL optimeerimine' },
      floating_3: { es: 'Arquitectura Segura', en: 'Secure Architecture', et: 'Turvaline arhitektuur' },
      view_projects: { es: 'Ver proyectos', en: 'View projects', et: 'Vaata projekte' },
      download_cv: { es: 'Descargar CV', en: 'Download CV', et: 'Laadi alla CV' },
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
    };
    fetchCVs();
  }, [language]);

  const handleDownloadClick = () => {
    setIsCvModalOpen(true);
  };

  const handleDownloadVersion = async (lang: string) => {
    const url = allCvs[lang];
    if (url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        
        // Custom filename based on language
        let fileName = `CV_Juan_Ortega_${lang}.pdf`;
        if (lang === 'es') fileName = 'CV Juan Ortega Version Espanish.pdf';
        else if (lang === 'en') fileName = 'CV Juan Ortega Version English.pdf';
        else if (lang === 'et') fileName = 'CV Juan Ortega Version Estonian.pdf';
        
        link.download = fileName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Download failed:', error);
        window.open(url, '_blank');
      }
      setIsCvModalOpen(false);
    } else {
      alert(getT('cv_not_available', getFallback('cv_not_available')));
    }
  };

  const roles = [
    getT('role_1', getFallback('role_1')),
    getT('role_2', getFallback('role_2')),
    getT('role_3', getFallback('role_3'))
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 100 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <section id="hero" className="hero-section">
      <Sparkles className="bg-sparkle s-1" size={32} />
      <Sparkles className="bg-sparkle s-2" size={24} />
      <Sparkles className="bg-sparkle s-3" size={40} />

      <div className="container hero-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <motion.div 
            className="hero-badge glass"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="badge-dot"></span>
            {getT('hero_badge', getFallback('hero_badge'))}
          </motion.div>
          
          <h1 className="hero-title">
            {getT('hero_name', 'Juan Ortega: Full-Stack Developer')}
          </h1>
          
          <div className="typewriter-wrapper">
            <span className="type-prefix">{getT('hero_specialist', getFallback('hero_specialist'))} </span>
            <span className="typewriter">{text}</span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-tagline">
            {getT('hero_tagline', getFallback('hero_tagline'))}
          </p>

          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              {getT('view_projects', getFallback('view_projects'))} <ChevronRight size={18} />
            </a>
            <button className="btn btn-secondary" onClick={handleDownloadClick}>
              {getT('download_cv', getFallback('download_cv'))} <Download size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hero-image-container"
        >
          <div className="hero-blob-bg"></div>
          
          <div className="floating-cards">
            <div className="code-window-wrapper">
              <motion.div 
                className="code-window"
                animate={{ y: [0, -15, 0], rotate: [-2, -2, -2] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div className="code-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="code-body">
                  <pre>
                    <code>
                      <span className="keyword">const</span> <span className="variable">developer</span> = {'{'}<br/>
                      &nbsp;&nbsp;<span className="property">name</span>: <span className="string">"Juan Ortega"</span>,<br/>
                      &nbsp;&nbsp;<span className="property">role</span>: <span className="string">"Full-Stack"</span>,<br/>
                      &nbsp;&nbsp;<span className="property">skills</span>: [<span className="string">"Python"</span>, <span className="string">"React"</span>],<br/>
                      &nbsp;&nbsp;<span className="property">status</span>: <span className="string">"OpenToWork"</span><br/>
                      {'}'};
                    </code>
                  </pre>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="float-card card-1 glass"
              animate={{ y: [0, -20, 0], rotate: [-10, -8, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="card-icon-wrapper">
                <Layout size={20} />
              </div>
              <span className="card-label">{getT('floating_1', getFallback('floating_1'))}</span>
            </motion.div>

            <motion.div 
              className="float-card card-2 glass"
              animate={{ y: [0, 25, 0], rotate: [5, 7, 5] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            >
              <div className="card-icon-wrapper">
                <Database size={20} />
              </div>
              <span className="card-label">{getT('floating_2', getFallback('floating_2'))}</span>
            </motion.div>

            <motion.div 
              className="float-card card-3 glass"
              animate={{ y: [0, -25, 0], rotate: [15, 13, 15] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
            >
              <div className="card-icon-wrapper">
                <Code size={20} />
              </div>
              <span className="card-label">{getT('floating_3', getFallback('floating_3'))}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CV Selection Modal */}
      <AnimatePresence>
        {isCvModalOpen && (
          <div className="cv-modal-overlay" onClick={() => setIsCvModalOpen(false)}>
            <motion.div 
              className="cv-modal glass"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="cv-modal-header">
                <h3>{getT('download_cv', getFallback('download_cv'))}</h3>
                <button className="close-btn" onClick={() => setIsCvModalOpen(false)}><X size={20} /></button>
              </div>
              <p className="cv-modal-desc">Select the Curriculum version you would like to download:</p>
              <div className="cv-options">
                <button className="cv-opt-btn" onClick={() => handleDownloadVersion('es')}>
                  <span className="lang-flag">🇪🇸</span>
                  <div className="opt-text">
                    <span className="lang-name">Spanish</span>
                    <span className="lang-status">{allCvs['es'] ? 'Available' : 'Not available'}</span>
                  </div>
                  <Download size={18} />
                </button>
                <button className="cv-opt-btn" onClick={() => handleDownloadVersion('en')}>
                  <span className="lang-flag">🇬🇧</span>
                  <div className="opt-text">
                    <span className="lang-name">English</span>
                    <span className="lang-status">{allCvs['en'] ? 'Available' : 'Not available'}</span>
                  </div>
                  <Download size={18} />
                </button>
                <button className="cv-opt-btn" onClick={() => handleDownloadVersion('et')}>
                  <span className="lang-flag">🇪🇪</span>
                  <div className="opt-text">
                    <span className="lang-name">Estonian</span>
                    <span className="lang-status">{allCvs['et'] ? 'Available' : 'Not available'}</span>
                  </div>
                  <Download size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 8rem;
          overflow: hidden;
        }
        .bg-sparkle {
          position: absolute;
          color: var(--text-h);
          opacity: 0.15;
          animation: pulse 4s infinite alternate;
        }
        .s-1 { top: 20%; left: 10%; }
        .s-2 { top: 40%; right: 45%; }
        .s-3 { bottom: 20%; left: 40%; color: var(--primary); }

        @keyframes pulse {
          0% { transform: scale(0.8) rotate(0deg); opacity: 0.2; }
          100% { transform: scale(1.2) rotate(45deg); opacity: 0.6; }
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 2rem;
          z-index: 2;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          font-family: var(--heading);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--primary);
          margin-bottom: 1.5rem;
          background: rgba(168, 85, 247, 0.1);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }
        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary);
        }
        .hero-title {
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .typewriter-wrapper {
          font-size: 2rem;
          font-family: var(--heading);
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .type-prefix {
          color: var(--text);
          margin-right: 0.8rem;
        }
        .typewriter {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cursor {
          color: var(--primary);
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-tagline {
          font-size: 1.2rem;
          color: var(--text);
          margin-bottom: 3rem;
          max-width: 500px;
          line-height: 1.6;
        }
        .hero-btns {
          display: flex;
          gap: 1.5rem;
        }
        
        .hero-image-container {
          position: relative;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-blob-bg {
          position: absolute;
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(60px);
          opacity: 0.5;
          animation: blobShape 15s infinite alternate ease-in-out;
        }
        @keyframes blobShape {
          0% { transform: scale(1) rotate(0deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          100% { transform: scale(1.1) rotate(20deg); border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%; }
        }
        .floating-cards {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }
        .code-window-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        .code-window {
          width: 380px;
          background: var(--code-bg);
          border-radius: 1rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .code-header {
          background: rgba(0,0,0,0.05);
          padding: 0.8rem 1rem;
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border);
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }
        .code-body {
          padding: 1.5rem;
          font-family: var(--mono);
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text);
          text-align: left;
        }
        .code-body pre { margin: 0; }
        .code-body .keyword { color: #c678dd; }
        .code-body .variable { color: #61afef; }
        .code-body .property { color: #e06c75; }
        .code-body .string { color: #98c379; }

        .float-card {
          position: absolute;
          padding: 0.8rem 1.2rem;
          border-radius: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          box-shadow: var(--shadow);
          z-index: 2;
          background: var(--bg-card);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          width: auto;
          min-width: 150px;
        }
        .card-icon-wrapper {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(168, 85, 247, 0.4);
        }
        .card-label {
          font-family: var(--heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-h);
          white-space: nowrap;
        }
        .card-1 { top: 5%; left: 0%; }
        .card-2 { bottom: 10%; left: 10%; }
        .card-3 { top: 25%; right: -5%; }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 4rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-title { font-size: 3.5rem; }
          .typewriter-wrapper { justify-content: center; }
          .hero-tagline { margin: 0 auto 2.5rem; }
          .hero-image-container { height: 400px; }
          .hero-blob-bg { width: 300px; height: 300px; }
        }
        @media (max-width: 480px) {
          .hero-btns { flex-direction: column; width: 100%; }
          .btn { width: 100%; justify-content: center; }
          .float-card { min-width: 130px; padding: 0.6rem 1rem; }
        }

        /* CV Modal Styles */
        .cv-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }
        .cv-modal {
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          border-radius: 2rem;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          position: relative;
          background: var(--bg);
        }
        .cv-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .cv-modal-header h3 {
          font-size: 1.8rem;
          color: var(--text-h);
          margin: 0;
        }
        .close-btn {
          background: var(--bg-card);
          color: var(--text-h);
          border: 1px solid var(--border);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .close-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border-color: #ef4444;
        }
        .cv-modal-desc {
          color: var(--text);
          margin-bottom: 2rem;
          font-size: 1rem;
          opacity: 0.8;
        }
        .cv-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .cv-opt-btn {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.2rem 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1.2rem;
          color: var(--text-h);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          width: 100%;
        }
        .cv-opt-btn:hover {
          background: var(--bg-card-hover);
          border-color: var(--primary);
          transform: translateX(10px);
        }
        .lang-flag {
          font-size: 2rem;
        }
        .opt-text {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .lang-name {
          font-weight: 700;
          font-size: 1.1rem;
          font-family: var(--heading);
        }
        .lang-status {
          font-size: 0.8rem;
          opacity: 0.6;
        }
        .cv-opt-btn svg {
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .cv-opt-btn:hover svg {
          opacity: 1;
          color: var(--primary);
        }
      `}</style>
    </section>
  );
};

export default Hero;
