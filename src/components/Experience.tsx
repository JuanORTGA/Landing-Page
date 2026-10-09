import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import { EnterpriseWorkIcon } from './icons/FlaticonVectors';
import type { ExperienceItem } from '../types/database';

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
  return [];
};

const Experience: React.FC = () => {
  const { language, t } = useLanguage();
  const [dbExperiences, setDbExperiences] = useState<ExperienceItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('start_date', { ascending: false });

        if (!error && data) {
          setDbExperiences(data as ExperienceItem[]);
        } else if (!error) {
          setDbExperiences([]);
        }
      } catch (err) {
        console.error('Error fetching experience:', err);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchExperience();
  }, []);

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      exp_kicker: {
        es: 'Experiencia profesional',
        en: 'Professional experience',
        et: 'Töökogemus'
      },
      exp_title: {
        es: 'Una trayectoria enfocada en crear aplicaciones web escalables y de alto rendimiento.',
        en: 'A trajectory focused on creating scalable, high-performance web applications.',
        et: 'Trajektoor, mis keskendub skaleeritavate ja suure jõudlusega veebirakenduste loomisele.'
      },
      present_word: {
        es: 'actualidad',
        en: 'Present',
        et: 'praegu'
      },
      full_time_label: {
        es: 'Jornada completa',
        en: 'Full-time',
        et: 'Täistööaeg'
      },
      remote_label: {
        es: 'En remoto',
        en: 'Remote',
        et: 'Kaugtöö'
      },
      onsite_label: {
        es: 'Presencial',
        en: 'On-site',
        et: 'Kohapeal'
      },
      hybrid_label: {
        es: 'Híbrido',
        en: 'Hybrid',
        et: 'Hübriid'
      },
      more_skills_text: {
        es: 'aptitudes más',
        en: 'more skills',
        et: 'oskust veel'
      }
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const toggleSkills = (id: string) => {
    setExpandedSkills(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="experience" className="experience-root">
      <div className="container">
        <div className="experience-clean-layout">

          <motion.div
            className="experience-header-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-kicker">
              <span>{getT('exp_kicker', getFallback('exp_kicker'))}</span>
              <span className="kicker-dot"></span>
            </div>

            <h2 className="experience-heading">
              {getT('exp_title', getFallback('exp_title'))}
            </h2>

          </motion.div>

          {hasLoaded && dbExperiences.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1', maxWidth: '640px', margin: '2rem auto 0 auto' }}>
              <EnterpriseWorkIcon size={40} color="#0072ce" />
              <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500, margin: '1rem 0 0 0' }}>
                {language === 'en' ? 'Professional trajectory currently being configured from the admin panel.' : language === 'et' ? 'Töökogemus seadistamisel administraatori paneelist.' : 'Trayectoria laboral en configuración desde el panel de administrador.'}
              </p>
            </div>
          ) : (
            <div className="linkedin-experience-list">
              {dbExperiences.map((exp, idx) => {
              const role = (language === 'en' ? exp.role_en : language === 'et' ? exp.role_et : exp.role_es) || exp.role_es;
              const desc = (language === 'en' ? exp.description_en : language === 'et' ? exp.description_et : exp.description_es) || exp.description_es;
              const isCurrent = exp.is_current || !exp.end_date || exp.end_date.toLowerCase() === 'present' || exp.end_date.toLowerCase() === 'presente';

              const endDateStr = isCurrent ? getFallback('present_word') : exp.end_date;
              const dateLine = `${exp.start_date} - ${endDateStr}`;

              // Formato de Modalidad y Tipo de Empleo
              const empType = exp.employment_type || getFallback('full_time_label');
              const workMode = exp.work_mode || getFallback('onsite_label');

              // Stack de habilidades
              const techStack = parseStack(exp.stack);
              const isSkillsOpen = Boolean(expandedSkills[exp.id || String(idx)]);

              // Párrafos / Viñetas de descripción
              const descLines = desc
                ? desc.split('\n').map(l => l.trim()).filter(Boolean)
                : [];

              return (
                <motion.div
                  key={exp.id || idx}
                  className="linkedin-exp-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  {/* Logo de la Empresa */}
                  <div className="linkedin-logo-box">
                    {exp.company_logo ? (
                      <img
                        src={exp.company_logo}
                        alt={exp.company}
                        className="linkedin-logo-img"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                          const parent = (e.target as HTMLElement).parentElement;
                          if (parent) parent.classList.add('show-fallback');
                        }}
                      />
                    ) : null}
                    <EnterpriseWorkIcon size={26} color="#0072ce" className="linkedin-logo-fallback" />
                  </div>

                  <div className="linkedin-details-col">
                    <h3 className="linkedin-role-title">{role}</h3>
                    <div className="linkedin-company-line">
                      <span className="company-name">{exp.company}</span>
                      {empType && (
                        <>
                          <span className="dot-divider">·</span>
                          <span className="employment-type">{empType}</span>
                        </>
                      )}
                    </div>
                    <div className="linkedin-date-line">
                      <span>{dateLine}</span>
                    </div>
                    {(exp.location || workMode) && (
                      <div className="linkedin-location-line">
                        {exp.location && <span>{exp.location}</span>}
                        {exp.location && workMode && <span className="dot-divider">·</span>}
                        {workMode && <span>{workMode}</span>}
                      </div>
                    )}
                    {descLines.length > 0 && (
                      <div className="linkedin-description-block">
                        {descLines.map((line, lIdx) => (
                          <p key={lIdx} className="linkedin-desc-bullet">
                            {line.startsWith('-') ? line : `- ${line}`}
                          </p>
                        ))}
                      </div>
                    )}
                    {techStack.length > 0 && (
                      <div className="linkedin-skills-row">
                        <Gem size={15} className="linkedin-diamond-icon" />
                        <div className="linkedin-skills-text-wrap">
                          <span className="linkedin-skills-lead">
                            {techStack.slice(0, 3).join(', ')}
                          </span>
                          {techStack.length > 3 && (
                            <button
                              type="button"
                              className="linkedin-more-skills-btn"
                              onClick={() => toggleSkills(exp.id || String(idx))}
                            >
                              {isSkillsOpen
                                ? ` (${techStack.slice(3).join(', ')})`
                                : ` y ${techStack.length - 3} ${getFallback('more_skills_text')}`}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        </div>
      </div>

      <style>{`
        .experience-root {
          background: var(--bg);
          padding-top: 4.5rem;
          padding-bottom: 5.5rem;
          position: relative;
          transition: background-color 0.3s ease;
        }

        .experience-clean-layout {
          max-width: 900px;
          margin-left: 0;
          margin-right: auto;
        }

        .experience-header-section {
          margin-bottom: 3rem;
        }

        .experience-heading {
          font-size: 2.25rem;
          line-height: 1.2;
          color: var(--text-h);
          margin-bottom: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .experience-lead {
          font-size: 0.98rem;
          line-height: 1.62;
          color: var(--text);
          margin: 0;
        }

        .linkedin-experience-list {
          display: flex;
          flex-direction: column;
        }

        /* Cada Puesto de Experiencia */
        .linkedin-exp-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding-bottom: 2rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border);
          position: relative;
        }

        .linkedin-exp-item:last-child {
          padding-bottom: 0;
          margin-bottom: 0;
          border-bottom: none;
        }

        /* Logo de la Empresa (Círculo 48x48) */
        .linkedin-logo-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #e0f2fe; /* Azul claro estilo azure de Vision */
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        body.dark-mode .linkedin-logo-box {
          background: #172033;
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .linkedin-logo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .linkedin-logo-fallback {
          color: #0072ce; /* Azul oscuro del ícono azure */
          display: none;
        }

        body.dark-mode .linkedin-logo-fallback {
          color: #38bdf8;
        }

        .linkedin-logo-box.show-fallback .linkedin-logo-fallback,
        .linkedin-logo-box:not(:has(.linkedin-logo-img)) .linkedin-logo-fallback {
          display: block;
        }

        /* Columna de Detalles */
        .linkedin-details-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          min-width: 0;
        }

        /* Línea 1: Cargo */
        .linkedin-role-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-h);
          line-height: 1.3;
          margin-bottom: 0.35rem;
          letter-spacing: -0.01em;
        }

        .linkedin-company-line {
          font-size: 0.94rem;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .company-name {
          color: var(--text-h);
          font-weight: 600;
        }

        .dot-divider {
          color: var(--text);
          font-weight: 700;
        }

        .employment-type {
          color: var(--text);
        }

        .linkedin-date-line {
          font-size: 0.94rem;
          color: var(--text);
          margin-top: 0.1rem;
        }

        .linkedin-location-line {
          font-size: 0.94rem;
          color: var(--text);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-wrap: wrap;
        }

        .linkedin-description-block {
          margin-top: 0.75rem;
          margin-bottom: 0.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .linkedin-desc-bullet {
          font-size: 0.94rem;
          line-height: 1.55;
          color: var(--text);
          margin: 0;
        }

        .linkedin-skills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.85rem;
          font-size: 0.92rem;
          color: var(--text);
          flex-wrap: wrap;
        }

        .linkedin-diamond-icon {
          color: var(--kicker);
          flex-shrink: 0;
        }

        .linkedin-skills-text-wrap {
          display: inline;
        }

        .linkedin-skills-lead {
          font-weight: 600;
          color: var(--text-h);
        }

        .linkedin-more-skills-btn {
          background: none;
          border: none;
          color: var(--kicker);
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-left: 0.25rem;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }

        .linkedin-more-skills-btn:hover {
          color: var(--primary-blue-hover);
        }

        @media (max-width: 640px) {
          .experience-clean-layout {
            padding: 0;
          }
          .linkedin-exp-item {
            gap: 1rem;
          }
          .linkedin-logo-box {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;

