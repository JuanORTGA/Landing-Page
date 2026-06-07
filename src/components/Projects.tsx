import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code, Filter } from 'lucide-react';
import type { Project } from '../types/database';

const Projects: React.FC = () => {
  const { language, t } = useLanguage();
  const { data: dbProjects, loading } = useSupabaseData<Project>('projects');
  const [filter, setFilter] = useState('All');
  
  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      projects_subtitle: { es: 'Mi portafolio', en: 'My portfolio', et: 'Minu portfell' },
      projects_title: { es: 'Proyectos Destacados', en: 'Featured Projects', et: 'Esiletõstetud projektid' },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const projectsToDisplay = dbProjects.length > 0 ? dbProjects : [
    {
      id: 'bodega-app',
      title_es: 'bodega-app',
      title_en: 'bodega-app',
      title_et: 'bodega-app',
      description_short_es: 'Sistema de gestión de inventario construido con React. Optimiza el control de stock y los procesos logísticos.',
      description_short_en: 'Inventory management system built with React. Optimizes stock control and logistics processes.',
      description_short_et: 'Reactiga ehitatud laohaldussüsteem. Optimeerib varude kontrolli ja logistikaprotsesse.',
      stack: ['React', 'CSS3', 'Logic'],
      github_url: 'https://github.com/JuanORTGA/bodega-app',
      live_url: '#',
      image_url: '',
      category: 'Web'
    },
    {
      id: 'NetRevolution',
      title_es: 'NetRevolution',
      title_en: 'NetRevolution',
      title_et: 'NetRevolution',
      description_short_es: 'Frontend de e-commerce para suscripciones de streaming con React, Vite y Supabase. Gestión de pagos en moneda local.',
      description_short_en: 'E-commerce frontend for streaming subscriptions with React, Vite, and Supabase. Local currency payment management.',
      description_short_et: 'E-kaubanduse frontend voogedastuse tellimustele Reacti, Vite ja Supabase\'iga. Kohaliku valuuta maksehaldus.',
      stack: ['React', 'Vite', 'Supabase', 'Auth'],
      github_url: 'https://github.com/JuanORTGA/NetRevolution',
      live_url: '#',
      image_url: '',
      category: 'Web'
    }
  ] as Project[];

  const categories = ['All', ...Array.from(new Set(projectsToDisplay.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? projectsToDisplay 
    : projectsToDisplay.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('projects_subtitle') || 'Mi portafolio'}
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('projects_title') || 'Proyectos Destacados'}
          </motion.h2>
        </div>

        {/* Filter Buttons */}
        <div className="filter-container">
          <Filter size={18} className="filter-icon" />
          <div className="filter-btns">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="projects-grid">
            <AnimatePresence mode='wait'>
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  className="project-card glass"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  layout
                >
                  <div className="project-image-container">
                    <div className="project-overlay">
                      <a href={project.github_url} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
                      <a href={project.live_url} className="icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><ExternalLink size={20} /></a>
                    </div>
                    {project.image_url ? (
                      <img src={project.image_url} alt={project[`title_${language}` as keyof Project] as string} className="project-img" loading="lazy" />
                    ) : (
                      <div className="placeholder-img">
                         <Code size={64} />
                      </div>
                    )}
                  </div>
                  <div className="project-content">
                    <h3>{project[`title_${language}` as keyof Project]}</h3>
                    <p>{project[`description_short_${language}` as keyof Project]}</p>
                    <div className="project-stack">
                      {Array.isArray(project.stack) ? project.stack.map((tech, tIdx) => (
                        <span key={tIdx} className="tech-badge">{tech}</span>
                      )) : (project.stack as string)?.split(',').map((tech, tIdx) => (
                        <span key={tIdx} className="tech-badge">{tech.trim()}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <style>{`
        .projects-section {
          background: var(--bg);
          padding-bottom: 8rem;
        }
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
        }

        .filter-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .filter-icon {
          color: var(--primary);
          opacity: 0.7;
        }
        .filter-btns {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .filter-btn {
          background: rgba(255,255,255,0.05);
          color: var(--text);
          padding: 0.5rem 1.2rem;
          border-radius: 2rem;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .filter-btn:hover {
          background: rgba(168, 85, 247, 0.1);
          border-color: var(--primary);
        }
        .filter-btn.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
        }
        .project-card {
          border-radius: 1.5rem;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          background: rgba(30, 30, 40, 0.4);
          border: 1px solid rgba(255,255,255,0.05);
        }
        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.5);
        }

        .project-image-container {
          position: relative;
          height: 240px;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .project-card:hover .project-img {
          transform: scale(1.05);
        }
        .placeholder-img {
          color: var(--primary);
          opacity: 0.3;
          transition: opacity 0.3s, transform 0.5s;
        }
        .project-card:hover .placeholder-img {
          opacity: 0.6;
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: rgba(11, 12, 16, 0.7);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 2;
        }
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        .icon-btn {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
          transform: translateY(20px);
        }
        .project-card:hover .icon-btn {
          transform: translateY(0);
        }
        .icon-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.8);
        }
        .icon-btn:nth-child(2) {
          transition-delay: 0.1s;
        }

        .project-content {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .project-content h3 {
          font-size: 1.6rem;
          margin-bottom: 1rem;
          color: white;
          font-family: var(--heading);
        }
        .project-content p {
          color: var(--text);
          font-size: 1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
          flex-grow: 1;
        }
        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: auto;
        }
        .tech-badge {
          background: rgba(168, 85, 247, 0.1);
          color: var(--primary-hover);
          padding: 0.3rem 0.8rem;
          border-radius: 1rem;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(168, 85, 247, 0.3);
          font-family: var(--mono);
        }

        .loading-state {
          display: flex;
          justify-content: center;
          padding: 4rem;
        }
        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(168, 85, 247, 0.3);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Projects;
