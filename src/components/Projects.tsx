import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../services/supabase';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setDbProjects(data);
      } else if (error || !data || data.length === 0) {
        // En caso de sesión previa caducada en localStorage del navegador, reintento limpio
        const anonClient = createClient(
          import.meta.env.VITE_SUPABASE_URL || 'https://rdkqxpgsvwqljqyffrjw.supabase.co',
          import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJka3F4cGdzdndxbGpxeWZmcmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2Njc4NzQsImV4cCI6MjA4NDI0Mzg3NH0.pQpMTui1u1c9QgUiuS503egWnT_wiQTNZTOS8zOw-lg',
          { auth: { persistSession: false, autoRefreshToken: false } }
        );
        const { data: retryData } = await anonClient
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (retryData && retryData.length > 0) {
          setDbProjects(retryData);
        } else if (data) {
          setDbProjects(data);
        }
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    fetchProjects();

    // Auto-sincronización instantánea al cambiar de pestaña desde el panel a la landing
    const handleFocus = () => {
      fetchProjects();
    };
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') fetchProjects();
    });

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      projects_kicker: { 
        es: 'Proyectos', 
        en: 'Projects', 
        et: 'Projektid' 
      },
      projects_title: { 
        es: 'Aplicaciones desarrolladas de extremo a extremo.', 
        en: 'End-to-end built applications.', 
        et: 'Lõpuni välja arendatud rakendused.' 
      },
      projects_subtitle: { 
        es: 'Una selección de soluciones web completas: arquitectura, bases de datos e interfaces interactivas y fluidas.', 
        en: 'A selection of full-stack web solutions: architecture, databases, and interactive, fluid interfaces.', 
        et: 'Valik täislahendusi: arhitektuur, andmebaasid ning interaktiivsed ja sujuvad liidesed.' 
      },
      demo_btn: { es: 'Demo en Vivo', en: 'Live Demo', et: 'Otseülekanne' },
      code_btn: { es: 'Código', en: 'Code', et: 'Kood' },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const parseStack = (rawStack: any): string[] => {
    if (Array.isArray(rawStack)) return rawStack;
    if (typeof rawStack === 'string') {
      try {
        if (rawStack.trim().startsWith('[')) {
          return JSON.parse(rawStack);
        }
        return rawStack.split(',').map(s => s.trim()).filter(Boolean);
      } catch {
        return [rawStack];
      }
    }
    return ['React', 'TypeScript', 'Node.js'];
  };

  // Solo muestra proyectos reales de la base de datos
  const projectsToRender = hasLoaded
    ? dbProjects.map((p, idx) => ({
        id: p.id,
        category_num: `0${idx + 1} — ${(p.category || 'FULL STACK').toUpperCase()}`,
        title: language === 'en' ? (p.title_en || p.title_es) : language === 'et' ? (p.title_et || p.title_es) : p.title_es,
        desc_es: p.description_short_es || p.title_es,
        desc_en: p.description_short_en || p.title_en || p.title_es,
        desc_et: p.description_short_et || p.title_et || p.title_es,
        stack: parseStack(p.stack),
        image_url: p.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        github_url: p.github_url || '',
        live_url: p.live_url || '',
      }))
    : [];

  return (
    <section id="projects" className="projects-root">
      <div className="container">
        {/* Section Header */}
        <div className="projects-header-grid">
          <div>
            <div className="section-kicker">
              <span>{getT('projects_kicker', getFallback('projects_kicker'))}</span>
              <span className="kicker-dot"></span>
            </div>
            <h2 className="projects-main-title">
              {getT('projects_title', getFallback('projects_title'))}
            </h2>
          </div>
          <div className="projects-subtitle-block">
            <p>{getT('projects_subtitle', getFallback('projects_subtitle'))}</p>
          </div>
        </div>

        {/* Proyectos reales o mensaje de preparación si está vacío */}
        {hasLoaded && projectsToRender.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1', maxWidth: '640px', margin: '2rem auto 0 auto' }}>
            <Code2 size={40} style={{ color: '#0072ce', margin: '0 auto 1rem auto', display: 'block' }} />
            <p style={{ color: '#64748b', fontSize: '1.05rem', fontWeight: 500, margin: 0 }}>
              {language === 'en' ? 'New projects coming soon. Portfolio currently being updated.' : language === 'et' ? 'Uued projektid lisanduvad peagi.' : 'Nuevos proyectos en preparación. Portafolio en actualización.'}
            </p>
          </div>
        ) : (
          <div className="projects-cards-grid">
            {projectsToRender.map((project, idx) => (
              <div key={project.id} className="project-card-3d-stage">
                <motion.div
                  className="project-card project-card-3d"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                >
                  {/* Card Image Cover con soporte dinámico */}
                  <div className="project-image-box">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="project-cover-img"
                        loading="lazy"
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.style.display = 'none';
                          const parent = img.parentElement;
                          const placeholder = parent?.querySelector('.project-cover-placeholder') as HTMLElement;
                          if (placeholder) placeholder.style.display = 'flex';
                        }}
                      />
                    ) : null}

                    {/* Placeholder de respaldo (solo visible si no hay imagen o si falla) */}
                    <div 
                      className="project-cover-placeholder"
                      style={{ display: project.image_url ? 'none' : 'flex' }}
                    >
                      <Code2 size={40} className="placeholder-svg" />
                      <span>{project.title}</span>
                    </div>

                    {/* Badge 3D flotante sobre la imagen */}
                    <div className="project-floating-category-badge">
                      <span>{project.category_num}</span>
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="project-body">
                    <h3 className="project-name">{project.title}</h3>
                    <p className="project-summary">
                      {language === 'en' ? project.desc_en : language === 'et' ? project.desc_et : project.desc_es}
                    </p>

                    {/* Tech Pills */}
                    <div className="project-tech-pills">
                      {project.stack.map((tech: string, tIdx: number) => (
                        <span key={tIdx} className="pill-badge">{tech}</span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="project-footer-actions">
                      {project.live_url && project.live_url !== '#' && (
                        <a 
                          href={project.live_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-primary-btn"
                        >
                          <span>{getT('demo_btn', getFallback('demo_btn'))}</span>
                          <ExternalLink size={14} />
                        </a>
                      )}

                      {project.github_url && (
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="project-secondary-btn"
                          title="Ver Código en GitHub"
                        >
                          <Github size={15} />
                          <span>{getT('code_btn', getFallback('code_btn'))}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Sombra de Sobre Piso 3D Realista */}
                <div className="project-floor-shadow" aria-hidden="true" />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .projects-root {
          background: var(--bg);
          padding-top: 5rem;
          padding-bottom: 6.5rem;
          position: relative;
          transition: background-color 0.3s ease;
        }

        .projects-header-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 3rem;
          align-items: flex-end;
          margin-bottom: 3.5rem;
        }

        .projects-main-title {
          font-size: 2.35rem;
          line-height: 1.2;
          color: var(--text-h);
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .projects-subtitle-block p {
          font-size: 0.98rem;
          line-height: 1.65;
          color: var(--text);
          margin: 0;
        }

        /* 3-Cols Grid con perspectiva para 3D */
        .projects-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem 2rem;
          perspective: 1400px;
        }

        @media (max-width: 1024px) {
          .projects-cards-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .projects-header-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* 3D Stage / Escenario del piso */
        .project-card-3d-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 1.75rem;
        }

        /* Tarjeta 3D Flotante */
        .project-card-3d {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(255, 255, 255, 0.6) inset;
          transform-style: preserve-3d;
          transform: translateY(0px) rotateX(1deg);
          animation: floatLevitate 5s ease-in-out infinite alternate;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        }

        /* Efecto Hover 3D con mayor elevación e inclinación */
        .project-card-3d-stage:hover .project-card-3d {
          animation-play-state: paused;
          transform: translateY(-16px) rotateX(4deg) scale(1.025);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.16),
            0 0 0 1px rgba(0, 114, 206, 0.35),
            0 12px 28px -6px rgba(0, 114, 206, 0.18);
          border-color: rgba(0, 114, 206, 0.4);
        }

        /* Sombra de Sobre Piso (Floor Contact Shadow) */
        .project-floor-shadow {
          position: absolute;
          bottom: 0.5rem;
          left: 50%;
          transform: translateX(-50%) scale(1);
          width: 82%;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(15, 23, 42, 0.35) 0%, rgba(15, 23, 42, 0.12) 50%, transparent 75%);
          filter: blur(6px);
          pointer-events: none;
          z-index: 1;
          animation: shadowPulse 5s ease-in-out infinite alternate;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Modo Oscuro: Sombra de piso con sutil aura azul */
        body.dark-mode .project-floor-shadow {
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, rgba(0, 114, 206, 0.25) 45%, transparent 75%);
          filter: blur(8px);
        }

        /* Al hacer hover la tarjeta sube, la sombra se suaviza y encoge por física de luz */
        .project-card-3d-stage:hover .project-floor-shadow {
          animation-play-state: paused;
          transform: translateX(-50%) scale(0.78);
          opacity: 0.5;
          filter: blur(9px);
        }

        /* Animaciones continuas de levitación física */
        @keyframes floatLevitate {
          0% {
            transform: translateY(0px) rotateX(1deg);
          }
          50% {
            transform: translateY(-9px) rotateX(2.5deg);
          }
          100% {
            transform: translateY(0px) rotateX(1deg);
          }
        }

        @keyframes shadowPulse {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 0.85;
            filter: blur(6px);
          }
          50% {
            transform: translateX(-50%) scale(0.85);
            opacity: 0.55;
            filter: blur(8px);
          }
          100% {
            transform: translateX(-50%) scale(1);
            opacity: 0.85;
            filter: blur(6px);
          }
        }

        /* Image Box */
        .project-image-box {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: #0f172a;
        }

        .project-cover-img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card-3d-stage:hover .project-cover-img {
          transform: scale(1.05);
        }

        .project-cover-placeholder {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.85rem;
        }

        body.dark-mode .project-cover-placeholder {
          background: linear-gradient(135deg, #0f1a26 0%, #090f17 100%);
        }

        .placeholder-svg {
          opacity: 0.35;
          color: #0072ce;
        }

        .project-floating-category-badge {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          z-index: 2;
          background: rgba(15, 23, 42, 0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          pointer-events: none;
        }

        /* Card Body */
        .project-body {
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-h);
          margin-bottom: 0.6rem;
          letter-spacing: -0.015em;
        }

        .project-summary {
          font-size: 0.9rem;
          line-height: 1.55;
          color: var(--text);
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        /* Pills */
        .project-tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.4rem;
        }

        .pill-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #0072ce;
          background: #e0f2fe;
          border: 1px solid rgba(0, 114, 206, 0.2);
          padding: 0.2rem 0.55rem;
          border-radius: 0.4rem;
        }

        body.dark-mode .pill-badge {
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.15);
          border-color: rgba(0, 114, 206, 0.3);
        }

        /* Footer Action Buttons */
        .project-footer-actions {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border);
        }

        .project-primary-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: #0072ce;
          color: #ffffff !important;
          padding: 0.55rem 1rem;
          border-radius: 0.75rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.22s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .project-primary-btn:hover {
          background: #005fa8;
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
        }

        .project-secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--bg-card-subtle);
          color: var(--text-h) !important;
          border: 1px solid var(--border);
          padding: 0.55rem 0.85rem;
          border-radius: 0.75rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease;
        }

        .project-secondary-btn:hover {
          background: rgba(0, 114, 206, 0.06);
          border-color: rgba(0, 114, 206, 0.25);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
};

export default Projects;
