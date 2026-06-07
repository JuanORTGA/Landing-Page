import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { motion } from 'framer-motion';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

const Skills: React.FC = () => {
  const { language, t } = useLanguage();
  const { data: dbSkills, loading } = useSupabaseData<Skill>('skills');

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      skills_subtitle: { es: 'Tecnologías y herramientas', en: 'Technologies and tools', et: 'Tehnoloogiad ja tööriistad' },
      skills_title: { es: 'Habilidades Técnicas', en: 'Technical Skills', et: 'Tehnilised oskused' },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const skillsToDisplay = dbSkills.length > 0 ? dbSkills : [
    { id: '1', name: 'Python', level: 95, category: 'Languages' },
    { id: '2', name: 'JavaScript (JS)', level: 90, category: 'Languages' },
    { id: '3', name: 'TypeScript (TS)', level: 85, category: 'Languages' },
    { id: '4', name: 'Django', level: 95, category: 'Frameworks' },
    { id: '5', name: 'React', level: 90, category: 'Frameworks' },
    { id: '6', name: 'MySQL', level: 90, category: 'Databases' },
    { id: '7', name: 'SQLite', level: 85, category: 'Databases' },
    { id: '8', name: 'Supabase', level: 75, category: 'Databases' },
    { id: '9', name: 'Git/GitHub', level: 90, category: 'Tools' },
    { id: '10', name: 'DeepSeek/Claude/Gemini', level: 95, category: 'AI Tools' },
  ] as Skill[];

  const categories = Array.from(new Set(skillsToDisplay.map(s => s.category)));

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('skills_subtitle') || getFallback('skills_subtitle')}
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('skills_title') || getFallback('skills_title')}
          </motion.h2>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="skills-grid">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat}
                className="skill-category glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="cat-header">
                  <h3>{cat}</h3>
                  <span className="cat-badge">{skillsToDisplay.filter(s => s.category === cat).length}</span>
                </div>
                <div className="skill-list">
                  {skillsToDisplay.filter(s => s.category === cat).map((skill) => (
                    <div key={skill.id} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-percent">{skill.level}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                        >
                          <div className="progress-glow"></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .skills-section {
          background: linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.03) 100%);
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
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }
        .skill-category {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-category:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(168, 85, 247, 0.2);
          border-color: rgba(168, 85, 247, 0.4);
        }
        .cat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }
        .skill-category h3 {
          margin: 0;
          font-size: 1.5rem;
          background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cat-badge {
          background: rgba(168, 85, 247, 0.2);
          color: var(--primary-hover);
          padding: 0.2rem 0.8rem;
          border-radius: 1rem;
          font-weight: 700;
          font-size: 0.9rem;
        }
        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .skill-item {
          width: 100%;
        }
        .skill-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.8rem;
        }
        .skill-name {
          font-family: var(--heading);
          font-weight: 500;
          color: var(--text-h);
          font-size: 1.05rem;
        }
        .skill-percent {
          font-family: var(--mono);
          color: var(--primary);
          font-weight: 600;
        }
        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
          border-radius: 4px;
          position: relative;
        }
        .progress-glow {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
          background: rgba(255,255,255,0.4);
          filter: blur(5px);
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

export default Skills;
