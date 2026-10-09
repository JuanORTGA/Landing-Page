import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../services/supabase';
import { motion } from 'framer-motion';
import { ExternalLink, Gem } from 'lucide-react';
import { AcademicDegreeIcon } from './icons/FlaticonVectors';
import type { EducationItem } from '../types/database';

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

const Education: React.FC = () => {
  const { language, t } = useLanguage();
  const [dbEducation, setDbEducation] = useState<EducationItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data, error } = await supabase
          .from('education')
          .select('*')
          .order('start_date', { ascending: false });

        if (!error && data) {
          setDbEducation(data as EducationItem[]);
        } else if (!error) {
          setDbEducation([]);
        }
      } catch (err) {
        console.error('Error fetching education:', err);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchEducation();
  }, []);

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      edu_kicker: {
        es: 'Educación & Certificaciones',
        en: 'Education & Certifications',
        et: 'Haridus ja sertifikaadid'
      },
      edu_title: {
        es: 'Aprendizaje continuo y certificaciones prácticas en tecnologías modernas.',
        en: 'Continuous learning and practical certifications in modern technologies.',
        et: 'Pidev õppimine ja praktilised sertifikaadid kaasaegsetes tehnoloogiates.'
      },
      present_word: {
        es: 'actualidad',
        en: 'Present',
        et: 'praegu'
      },
      view_credential: {
        es: 'Mostrar credencial',
        en: 'Show credential',
        et: 'Näita sertifikaati'
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
    <section id="education" className="education-root">
      <div className="container">
        {/* Tarjeta Contenedora Principal Estilo LinkedIn */}
        <div className="experience-clean-layout">

          <motion.div
            className="experience-header-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-kicker">
              <span>{getT('edu_kicker', getFallback('edu_kicker'))}</span>
              <span className="kicker-dot"></span>
            </div>

            <h2 className="experience-heading">
              {getT('edu_title', getFallback('edu_title'))}
            </h2>

          </motion.div>

          {hasLoaded && dbEducation.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1', maxWidth: '640px', margin: '2rem auto 0 auto' }}>
              <AcademicDegreeIcon size={40} color="#0072ce" />
              <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500, margin: '1rem 0 0 0' }}>
                {language === 'en' ? 'Education and certifications currently being configured from the admin panel.' : language === 'et' ? 'Haridus ja sertifikaadid seadistamisel administraatori paneelist.' : 'Educación y certificaciones en configuración desde el panel de administrador.'}
              </p>
            </div>
          ) : (
            <div className="linkedin-experience-list">
              {dbEducation.map((edu, idx) => {
              const degree = (language === 'en' ? edu.degree_en : language === 'et' ? edu.degree_et : edu.degree_es) || edu.degree_es;
              const desc = (language === 'en' ? edu.description_en : language === 'et' ? edu.description_et : edu.description_es) || edu.description_es || '';
              const isCurrent = edu.is_current || !edu.end_date || edu.end_date.toLowerCase() === 'present' || edu.end_date.toLowerCase() === 'presente';

              const endDateStr = isCurrent ? getFallback('present_word') : edu.end_date;
              const dateLine = `${edu.start_date} - ${endDateStr}`;

              const techStack = parseStack(edu.stack);
              const isSkillsOpen = Boolean(expandedSkills[edu.id || String(idx)]);

              const descLines = desc
                ? desc.split('\n').map(l => l.trim()).filter(Boolean)
                : [];

              return (
                <motion.div
                  key={edu.id || idx}
                  className="linkedin-exp-item"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  {/* Logo de la Institución / Universidad */}
                  <div className="linkedin-logo-box">
                    {edu.institution_logo ? (
                      <img
                        src={edu.institution_logo}
                        alt={edu.institution}
                        className="linkedin-logo-img"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                          const parent = (e.target as HTMLElement).parentElement;
                          if (parent) parent.classList.add('show-fallback');
                        }}
                      />
                    ) : null}
                    <AcademicDegreeIcon size={26} color="#0072ce" className="linkedin-logo-fallback" />
                  </div>

                  {/* Columna Derecha con Información */}
                  <div className="linkedin-details-col">
                    {/* Línea 1: Título o Grado Obtenido en Negrita */}
                    <h3 className="linkedin-role-title">{degree}</h3>

                    {/* Línea 2: Nombre de la Institución · Disciplina */}
                    <div className="linkedin-company-line">
                      <span className="company-name">{edu.institution}</span>
                      {edu.field_of_study && (
                        <>
                          <span className="dot-divider">·</span>
                          <span className="employment-type">{edu.field_of_study}</span>
                        </>
                      )}
                    </div>

                    {/* Línea 3: Fechas */}
                    <div className="linkedin-date-line">
                      <span>{dateLine}</span>
                    </div>

                    {/* Línea 4: Credencial / Certificado con Enlace */}
                    {(edu.credential_id || edu.credential_url) && (
                      <div className="linkedin-credential-line">
                        {edu.credential_id && (
                          <span className="credential-id-tag">ID: {edu.credential_id}</span>
                        )}
                        {edu.credential_url && (
                          <a
                            href={edu.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="credential-link-btn"
                          >
                            <span>{getFallback('view_credential')}</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Línea 5: Descripción / Logros Académicos */}
                    {descLines.length > 0 && (
                      <div className="linkedin-description-block">
                        {descLines.map((line, lIdx) => (
                          <p key={lIdx} className="linkedin-desc-bullet">
                            {line.startsWith('-') ? line : `- ${line}`}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Línea 6: Aptitudes / Competencias con Diamante */}
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
                              onClick={() => toggleSkills(edu.id || String(idx))}
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
        .education-root {
          background: var(--bg);
          padding-top: 1.5rem;
          padding-bottom: 5rem;
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

        .linkedin-logo-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #e0f2fe;
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
          color: #0072ce;
          display: none;
        }

        body.dark-mode .linkedin-logo-fallback {
          color: #38bdf8;
        }

        .linkedin-logo-box.show-fallback .linkedin-logo-fallback,
        .linkedin-logo-box:not(:has(.linkedin-logo-img)) .linkedin-logo-fallback {
          display: block;
        }

        .linkedin-details-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          min-width: 0;
        }

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

        .linkedin-credential-line {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: 0.25rem;
          flex-wrap: wrap;
        }

        .credential-id-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text);
          background: rgba(15, 23, 42, 0.04);
          padding: 0.15rem 0.5rem;
          border-radius: 0.35rem;
          border: 1px solid var(--border);
        }

        body.dark-mode .credential-id-tag {
          background: rgba(255, 255, 255, 0.04);
        }

        .credential-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--primary-blue);
          background: rgba(0, 114, 206, 0.08);
          border: 1px solid rgba(0, 114, 206, 0.2);
          padding: 0.2rem 0.65rem;
          border-radius: 2rem;
          text-decoration: none;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease;
        }

        .credential-link-btn:hover {
          background: rgba(0, 114, 206, 0.14);
          border-color: rgba(0, 114, 206, 0.35);
          transform: translateY(-1px);
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

export default Education;
