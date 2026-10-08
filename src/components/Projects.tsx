import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setDbProjects(data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchProjects();
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

  const defaultProjects = [
    {
      id: 'nordic-metrics',
      category_num: '01 — WEB APP',
      title: 'Nordic Metrics',
      desc_es: 'Dashboard web para visualizar datos operativos y facilitar decisiones rápidas en equipos digitales.',
      desc_en: 'Web dashboard to visualize operational data and streamline fast decisions in digital teams.',
      desc_et: 'Veebipõhine juhtpaneel operatiivandmete visualiseerimiseks ja kiirete otsuste toetamiseks.',
      stack: ['React 18', 'TypeScript', 'Tailwind', 'Chart.js'],
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/JuanORTGA',
      live_url: 'https://github.com/JuanORTGA',
    },
    {
      id: 'keeleleek',
      category_num: '02 — EDTECH APP',
      title: 'KeeleLeek',
      desc_es: 'Plataforma interactiva para aprender estonio con ejercicios de audio, vocabulario y gamificación.',
      desc_en: 'Interactive platform to learn Estonian with audio drills, vocabulary, and gamification.',
      desc_et: 'Interaktiivne platvorm eesti keele õppimiseks audioharjutuste, sõnavara ja mängulisusega.',
      stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
      image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/JuanORTGA',
      live_url: 'https://github.com/JuanORTGA',
    },
    {
      id: 'task-flow',
      category_num: '03 — SAAS TOOL',
      title: 'TaskFlow Architecture',
      desc_es: 'Sistema de gestión de tareas en tiempo real con sincronización de estado, autenticación y base de datos relacional.',
      desc_en: 'Real-time task management system with state sync, auth, and relational database.',
      desc_et: 'Reaalajas ülesannete haldussüsteem oleku sünkroonimise, autentimise ja relatsioonilise andmebaasiga.',
      stack: ['TypeScript', 'Supabase', 'REST API', 'Framer'],
      image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      github_url: 'https://github.com/JuanORTGA',
      live_url: 'https://github.com/JuanORTGA',
    }
  ];

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
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* Card Image Cover Limpia */}
              <div className="project-image-box">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="project-cover-img"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="project-cover-placeholder">
                  <Code2 size={36} className="placeholder-svg" />
                  <span>{project.title}</span>
                </div>
              </div>

              {/* Card Info Body */}
              <div className="project-body">
                <span className="project-category-num">{project.category_num}</span>
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

        /* 3-Cols Grid */
        .projects-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        @media (max-width: 1024px) {
          .projects-cards-grid {
            grid-template-columns: 1fr;
            gap: 2.25rem;
          }
          .projects-header-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* Project Card Limpia */
        .project-card {
          display: flex;
          flex-direction: column;
          border-radius: 1.5rem;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease, border-color 0.25s ease;
        }

        .project-card:hover {
          transform: translateY(-2.5px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(0, 114, 206, 0.25);
        }

        /* Image Box */
        .project-image-box {
          position: relative;
          width: 100%;
          height: 210px;
          overflow: hidden;
          background: #e2e8f0;
        }

        body.dark-mode .project-image-box {
          background: #0f172a;
        }

        .project-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .project-cover-img {
          transform: scale(1.025);
        }

        .project-cover-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          z-index: 0;
        }

        body.dark-mode .project-cover-placeholder {
          background: linear-gradient(135deg, #0f1a26 0%, #090f17 100%);
        }

        .placeholder-svg {
          opacity: 0.35;
          color: #0072ce;
        }

        /* Card Body */
        .project-body {
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .project-category-num {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--kicker);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
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
