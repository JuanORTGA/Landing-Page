import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import type { Skill } from '../types/database';
import { getTechLogoUrl, techPresetsList, translateSkillCategory, translateSkillTier } from '../services/techLogos';

const Skills: React.FC = () => {
  const { language, t } = useLanguage();
  const [dbSkills, setDbSkills] = useState<Skill[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const currentLang = (language as 'es' | 'en' | 'et') || 'es';

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('order', { ascending: true });
        
        if (!error && data) {
          setDbSkills(data as Skill[]);
        }
      } catch (err) {
        console.error('Error loading skills from database:', err);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchSkills();
  }, []);

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      skills_kicker: { 
        es: 'Tecnologías', 
        en: 'Tech Stack', 
        et: 'Tehnoloogiad' 
      },
      skills_title: { 
        es: 'Herramientas con las que construyo en producción.', 
        en: 'Tools I use to build in production.', 
        et: 'Tööriistad, millega ehitan tootmises.' 
      },
      skills_desc: { 
        es: 'Herramientas principales utilizadas en arquitectura, desarrollo backend, frontend y despliegue.', 
        en: 'Core tools utilized across architecture, backend engineering, frontend interfaces, and deployments.', 
        et: 'Peamised tööriistad arhitektuuris, tagarakenduses, kasutajaliidestes ja juurutuses.' 
      },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  // Fallbacks inteligentes de descripción y tags para cada tecnología
  const techDescriptions: Record<string, { focus: string; tags: string[] }> = {
    python: {
      focus: 'Estructuras de datos, algoritmos, scripts de automatización y desarrollo backend robusto.',
      tags: ['Python 3', 'OOP', 'Data Structures']
    },
    django: {
      focus: 'Modelos ORM relacionales, autenticación JWT, APIs REST y arquitectura escalable.',
      tags: ['Django', 'REST APIs', 'ORM']
    },
    react: {
      focus: 'Componentes modernos, Single Page Applications, state management y renderizado fluido.',
      tags: ['React 18', 'Hooks', 'Vite']
    },
    typescript: {
      focus: 'Tipado estático seguro, interfaces robustas y prevención de bugs en compilación.',
      tags: ['TypeScript', 'Strict Types', 'ES6+']
    },
    postgresql: {
      focus: 'Diseño relacional, consultas SQL complejas, índices y transacciones seguras ACID.',
      tags: ['PostgreSQL', 'SQL', 'Supabase']
    },
    node: {
      focus: 'Servidores asíncronos en tiempo real, APIs REST y microservicios de alto rendimiento.',
      tags: ['Node.js', 'Express', 'APIs']
    },
    docker: {
      focus: 'Contenedores estandarizados, Dockerfile multi-stage y ambientes de despliegue aislados.',
      tags: ['Docker', 'Containers', 'Cloud']
    },
    yolo: {
      focus: 'Modelos de visión artificial para detección y seguimiento de objetos en tiempo real.',
      tags: ['YOLOv8', 'Computer Vision', 'PyTorch']
    },
    roboflow: {
      focus: 'Anotación y preparación de datasets para entrenamiento de modelos de visión.',
      tags: ['Datasets', 'Inference', 'Vision AI']
    },
    vscode: {
      focus: 'Depuración avanzada, linters, extensiones de productividad y workflows ágiles.',
      tags: ['VS Code', 'Productivity', 'Tooling']
    },
  };

  // Merge database skills with curated styling & official vector icons (100% gobernado por Supabase y traducido dinámicamente)
  const displaySkills = dbSkills.map((s, idx) => {
    const presetMatch = techPresetsList.find(d => 
      d.id === (s.icon || '').toLowerCase() || 
      d.name.toLowerCase().includes(s.name.toLowerCase()) || 
      s.name.toLowerCase().includes(d.name.toLowerCase())
    );
    const resolvedLogoUrl = getTechLogoUrl(s.icon || s.name);

    const rawCategory = s.category || presetMatch?.category || 'Tecnología';
    const rawTier = (s as any).tier || presetMatch?.tier || 'Stack Principal';

    // Asegura una URL de logo válida y robusta
    const customIconUrl = (s as any).icon_url;
    const validCustomUrl = customIconUrl && (customIconUrl.startsWith('http://') || customIconUrl.startsWith('https://') || customIconUrl.startsWith('data:')) 
      ? customIconUrl 
      : null;

    const sKey = (s.icon || s.name || '').toLowerCase();
    const matchedKey = Object.keys(techDescriptions).find(k => sKey.includes(k));
    const fallbackData = matchedKey ? techDescriptions[matchedKey] : null;

    const focus = (s as any).description || (s as any).focus || fallbackData?.focus || 'Tecnología fundamental orientada a ingeniería y arquitectura de software.';
    const tags = (s as any).tags || fallbackData?.tags || [rawTier];

    return {
      id: s.id || `skill-${idx}`,
      name: s.name,
      category: translateSkillCategory(rawCategory, currentLang),
      tier: translateSkillTier(rawTier, currentLang),
      focus,
      tags,
      iconUrl: validCustomUrl || resolvedLogoUrl,
      color: '#0072ce', // Azul Bandera de Estonia consistente
    };
  });

  return (
    <section id="skills" className="skills-root">
      <div className="container">
        {/* Section Header */}
        <div className="skills-header-block">
          <div className="section-kicker">
            <span>{getT('skills_kicker', getFallback('skills_kicker'))}</span>
            <span className="kicker-dot"></span>
          </div>

          <h2 className="skills-main-title">
            {getT('skills_title', getFallback('skills_title'))}
          </h2>

          <p className="skills-subtitle-text">
            {getT('skills_desc', getFallback('skills_desc'))}
          </p>
        </div>

        {/* Tarjetas de Alto Nivel Técnico (Diseño Blanco con Negro idéntico a Proyectos) */}
        {hasLoaded && displaySkills.length === 0 ? (
          <div className="skills-empty-landing">
            <p>Configurando nuevas tecnologías desde el panel de administración...</p>
          </div>
        ) : (
          <div className="skills-grid-wrapper">
            {displaySkills.map((tech, idx) => (
              <motion.div
                key={tech.id}
                className="skill-tech-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                {/* Header: Kicker numérico a la izquierda y Logo Oficial a la derecha */}
                <div className="tech-card-header">
                  <span className="tech-category-num">
                    {String(idx + 1).padStart(2, '0')} — {tech.category.toUpperCase()}
                  </span>
                  <div className="tech-logo-wrapper">
                    <img 
                      src={tech.iconUrl} 
                      alt={tech.name} 
                      className="tech-logo-img" 
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = getTechLogoUrl(tech.name);
                      }}
                    />
                  </div>
                </div>

                {/* Body: Nombre de la Tecnología */}
                <h3 className="tech-name">{tech.name}</h3>

                {/* Descripción / Enfoque Técnico */}
                <p className="tech-summary">
                  {tech.focus}
                </p>

                {/* Tech Pills (Idénticas a las tarjetas de proyectos del screenshot) */}
                <div className="tech-pills">
                  {tech.tier && (
                    <span className="pill-badge">{tech.tier}</span>
                  )}
                  {tech.tags && tech.tags.filter((t: string) => t !== tech.tier).map((tag: string, tIdx: number) => (
                    <span key={tIdx} className="pill-badge">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .skills-root {
          background: var(--bg);
          padding-top: 5rem;
          padding-bottom: 6.5rem;
          position: relative;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          transition: background-color 0.3s ease;
        }

        .skills-header-block {
          max-width: 680px;
          margin-bottom: 2.75rem;
        }

        .skills-main-title {
          font-size: 2.35rem;
          line-height: 1.2;
          color: var(--text-h);
          margin-bottom: 0.85rem;
          letter-spacing: -0.025em;
          font-weight: 800;
        }

        .skills-subtitle-text {
          font-size: 0.98rem;
          line-height: 1.62;
          color: var(--text);
          margin: 0;
        }

        .skills-empty-landing {
          text-align: center;
          padding: 3rem 1.5rem;
          color: var(--text-muted);
          font-style: italic;
          background: var(--bg-card-subtle);
          border: 1px dashed var(--border);
          border-radius: 1.25rem;
        }

        /* 3-Cols Grid */
        .skills-grid-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }

        @media (max-width: 1024px) {
          .skills-grid-wrapper {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .skills-grid-wrapper {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        /* Tech Card: Mismo diseño Blanco con Negro que las tarjetas de proyectos */
        .skill-tech-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-card);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease, border-color 0.25s ease;
          position: relative;
        }

        .skill-tech-card:hover {
          transform: translateY(-2.5px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(0, 114, 206, 0.25);
        }

        /* Header: Kicker numérico a la izquierda y Logo Oficial a la derecha */
        .tech-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          gap: 0.5rem;
        }

        .tech-category-num {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #0072ce; /* Azul Bandera de Estonia */
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .tech-logo-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 0.65rem;
          background: var(--bg-card-subtle);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.45rem;
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
        }

        .skill-tech-card:hover .tech-logo-wrapper {
          transform: scale(1.03);
          border-color: rgba(0, 114, 206, 0.25);
        }

        .tech-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Title: Tipografía negra de alto impacto */
        .tech-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-h);
          margin: 0 0 0.6rem 0;
          letter-spacing: -0.015em;
        }

        /* Summary / Focus */
        .tech-summary {
          font-size: 0.9rem;
          line-height: 1.55;
          color: var(--text);
          margin: 0 0 1.25rem 0;
          flex-grow: 1;
        }

        /* Pills (Idénticas a las del screenshot) */
        .tech-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .pill-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: #0072ce;
          background: #e0f2fe;
          border: 1px solid rgba(0, 114, 206, 0.2);
          padding: 0.2rem 0.55rem;
          border-radius: 0.4rem;
          font-weight: 500;
        }

        body.dark-mode .pill-badge {
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.15);
          border-color: rgba(0, 114, 206, 0.3);
        }
      `}</style>
    </section>
  );
};

export default Skills;
