import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

interface ExperienceItem {
  id: string;
  company: string;
  role_es: string;
  role_en: string;
  role_et: string;
  description_es: string;
  description_en: string;
  description_et: string;
  start_date: string;
  end_date: string | null;
  location: string;
}

const Experience: React.FC = () => {
  const { language, t } = useLanguage();
  const { data: dbExperience, loading } = useSupabaseData<ExperienceItem>('experience');

  const experiencesToDisplay = dbExperience.length > 0 ? dbExperience : [
    {
      id: '1',
      company: 'Instituto Nacional de Tierras (INTI)',
      role_es: 'Desarrollador Web Full-Stack',
      role_en: 'Full-Stack Web Developer',
      role_et: 'Full-Stack veebiarendaja',
      start_date: '2025',
      end_date: 'Present',
      location: 'Caracas, Venezuela',
      description_es: 'Construí y mantuve aplicaciones web internas utilizando Django (backend) y React (frontend). Participé en todo el ciclo de vida del desarrollo: análisis, desarrollo, pruebas y despliegue. Reduje los tiempos de carga en un 20% mediante optimización SQL.',
      description_en: 'Built and maintained internal web applications using Django (backend) and React (frontend). Participated in the entire software development lifecycle: requirements analysis, development, testing, and deployment. Reduced page load times by 20% through SQL optimization.',
      description_et: 'Ehitasin ja hooldasin sisemisi veebirakendusi kasutades Djangot (backend) ja Reacti (frontend). Osalesin kogu tarkvara arenduse elutsüklis: nõuete analüüs, arendus, testimine ja juurutamine. Vähendasin lehekülgede laadimisaegu 20% SQL optimeerimise kaudu.',
    },
    {
      id: '2',
      company: 'Ministerio de Salud (Venezuela)',
      role_es: 'Desarrollador Backend (Proyecto Universitario)',
      role_en: 'Backend Developer (University Project)',
      role_et: 'Backend-arendaja (Ülikooliprojekt)',
      start_date: '2024',
      end_date: '2024',
      location: 'Caracas, Venezuela',
      description_es: 'Diseñé e implementé un prototipo de sistema seguro de mensajería interna para departamentos administrativos utilizando Python, Django y MySQL, garantizando el cifrado y la confidencialidad de los datos.',
      description_en: 'Designed and implemented a secure internal messaging system prototype for administrative departments using Python, Django, and MySQL, ensuring data encryption and confidentiality.',
      description_et: 'Projekteerisin ja rakendasin turvalise sisemise sõnumisüsteemi prototüübi haldusosakondadele, kasutades Pythonit, Djangot ja MySQLi, tagades andmete krüpteerimise ja konfidentsiaalsuse.',
    }
  ] as ExperienceItem[];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('experience_subtitle') || 'Mi trayectoria'}
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('experience_title') || 'Experiencia Laboral'}
          </motion.h2>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="timeline">
            {experiencesToDisplay.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                className="timeline-item"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="timeline-dot">
                  <Briefcase size={16} />
                </div>
                <div className="timeline-content glass card-hover">
                  <div className="timeline-header">
                    <h3>{exp[`role_${language}` as keyof ExperienceItem]}</h3>
                    <span className="period"><Calendar size={14} /> {exp.start_date} - {exp.end_date || 'Present'}</span>
                  </div>
                  <div className="timeline-subheader">
                    <span className="company">{exp.company}</span>
                    <span className="location"><MapPin size={14} /> {exp.location}</span>
                  </div>
                  <div className="experience-description">
                     <p>{exp[`description_${language}` as keyof ExperienceItem]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .experience-section {
          background: linear-gradient(0deg, transparent 0%, rgba(236, 72, 153, 0.03) 100%);
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

        .timeline {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent 0%, var(--primary) 20%, var(--accent) 80%, transparent 100%);
          opacity: 0.5;
        }
        .timeline-item {
          margin-bottom: 4rem;
          position: relative;
          width: 50%;
          padding-right: 3rem;
        }
        .timeline-item:nth-child(even) {
          margin-left: 50%;
          padding-right: 0;
          padding-left: 3rem;
        }
        .timeline-dot {
          position: absolute;
          right: -20px;
          top: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 0 0 6px var(--bg);
        }
        .timeline-item:nth-child(even) .timeline-dot {
          right: auto;
          left: -20px;
        }
        .timeline-content {
          padding: 2rem;
          position: relative;
        }
        .timeline-content::after {
          content: '';
          position: absolute;
          top: 15px;
          right: -10px;
          width: 20px;
          height: 20px;
          background: var(--bg-card);
          transform: rotate(45deg);
          border-top: 1px solid var(--border);
          border-right: 1px solid var(--border);
        }
        .timeline-item:nth-child(even) .timeline-content::after {
          right: auto;
          left: -10px;
          border-top: none;
          border-right: none;
          border-bottom: 1px solid var(--border);
          border-left: 1px solid var(--border);
        }
        
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(236, 72, 153, 0.2);
          border-color: rgba(236, 72, 153, 0.4);
        }

        .timeline-header {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }
        .timeline-header h3 {
          font-size: 1.4rem;
          color: white;
          margin: 0;
          line-height: 1.3;
        }
        .period {
          font-size: 0.85rem;
          color: white;
          font-family: var(--mono);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.8) 100%);
          padding: 0.3rem 0.8rem;
          border-radius: 2rem;
          align-self: flex-start;
        }
        .timeline-subheader {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          color: var(--text);
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .company {
          font-weight: 600;
          color: var(--text-h);
        }
        .location {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: var(--primary-hover);
        }
        .experience-description {
          color: var(--text);
          font-size: 1rem;
          line-height: 1.6;
        }
        
        .loading-state {
          display: flex;
          justify-content: center;
          padding: 4rem;
        }
        .loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(236, 72, 153, 0.3);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .timeline::before {
            left: 20px;
          }
          .timeline-item {
            width: 100%;
            padding-left: 3.5rem;
            padding-right: 0;
            margin-left: 0 !important;
          }
          .timeline-dot {
            left: 0px !important;
            right: auto;
          }
          .timeline-content::after {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
