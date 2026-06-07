import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Linkedin, Github } from 'lucide-react';
import { supabase } from '../services/supabase';

const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      contact_title: { es: 'Contacto', en: 'Contact', et: 'Kontakt' },
      contact_subtitle: { es: '¿Hablamos?', en: 'Let\'s Talk', et: 'Räägime?' },
      contact_description: { es: 'Estoy disponible para nuevos proyectos.', en: 'I am available for new projects.', et: 'Olen saadaval uute projektide jaoks.' },
      contact_desc_detail: { es: 'Siéntete libre de contactarme. Responderé lo antes posible.', en: 'Feel free to contact me. I will reply as soon as possible.', et: 'Võtke minuga julgelt ühendust. Vastan esimesel võimalusel.' },
      contact_form_name: { es: 'Nombre', en: 'Name', et: 'Nimi' },
      contact_form_email: { es: 'Email', en: 'Email', et: 'Email' },
      contact_form_message: { es: 'Mensaje', en: 'Message', et: 'Sõnum' },
      contact_send: { es: 'Enviar Mensaje', en: 'Send Message', et: 'Saada sõnum' },
      sending: { es: 'Enviando...', en: 'Sending...', et: 'Saatmine...' },
      contact_success: { es: '¡Mensaje enviado con éxito!', en: 'Message sent successfully!', et: 'Sõnum edukalt saadetud!' },
      contact_error: { es: 'Hubo un error al enviar el mensaje.', en: 'There was an error sending the message.', et: 'Sõnumi saatmisel tekkis viga.' },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const { error } = await supabase.from('messages').insert([data]);
      if (error) throw error;
      
      setStatus({ type: 'success', message: getT('contact_success', getFallback('contact_success')) });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      console.error('Error sending message:', err);
      setStatus({ type: 'error', message: getT('contact_error', getFallback('contact_error')) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {getT('contact_title', getFallback('contact_title'))}
          </motion.span>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {getT('contact_subtitle', getFallback('contact_subtitle'))}
          </motion.h2>
        </div>
        
        <div className="contact-grid">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            <h3>{getT('contact_description', getFallback('contact_description'))}</h3>
            <p className="contact-desc">
              {getT('contact_desc_detail', getFallback('contact_desc_detail'))}
            </p>
            <div className="contact-methods">
              <div className="method card-hover">
                <div className="icon-wrapper">
                  <Mail className="icon" />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>juanchoortega2020@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="social-links">
               <a href="https://linkedin.com/in/juan-ortega-223804326" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn"><Linkedin size={24} /></a>
               <a href="https://github.com/JuanORTGA" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub"><Github size={24} /></a>
            </div>
          </motion.div>

          <motion.div
             className="contact-form-wrapper"
             initial={{ opacity: 0, x: 40 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
          >
            <form 
              className="contact-form glass"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>{getT('contact_form_name', getFallback('contact_form_name'))}</label>
                <input name="name" type="text" placeholder={getT('contact_form_name', getFallback('contact_form_name'))} required />
              </div>
              <div className="form-group">
                <label>{getT('contact_form_email', getFallback('contact_form_email'))}</label>
                <input name="email" type="email" placeholder={getT('contact_form_email', getFallback('contact_form_email'))} required />
              </div>
              <div className="form-group">
                <label>{getT('contact_form_message', getFallback('contact_form_message'))}</label>
                <textarea name="message" placeholder={getT('contact_form_message', getFallback('contact_form_message'))} rows={5} required></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? (getT('sending', getFallback('sending'))) : (getT('contact_send', getFallback('contact_send')))} 
                {!isSubmitting && <Send size={18} />}
              </button>

              <AnimatePresence>
                {status && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`form-status ${status.type}`}
                  >
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: linear-gradient(180deg, transparent 0%, rgba(168, 85, 247, 0.05) 100%);
          position: relative;
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

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .contact-info {
          padding-right: 2rem;
        }
        .contact-info h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
          background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .contact-desc {
          color: var(--text);
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .method {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: rgba(30, 30, 40, 0.5);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 1.5rem;
        }
        .card-hover {
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .card-hover:hover {
          transform: translateX(10px);
          border-color: rgba(168, 85, 247, 0.4);
        }
        .icon-wrapper {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px -5px rgba(168, 85, 247, 0.5);
        }
        .method .icon {
          color: white;
          width: 24px;
          height: 24px;
        }
        .method h4 {
          margin-bottom: 0.2rem;
          font-family: var(--heading);
          color: white;
        }
        .method p {
          color: var(--primary-hover);
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }
        .social-btn {
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .social-btn:hover {
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          color: white;
          transform: translateY(-5px);
          border-color: transparent;
          box-shadow: 0 10px 20px -5px rgba(236, 72, 153, 0.5);
        }

        .contact-form-wrapper {
          position: relative;
        }
        .contact-form-wrapper::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
          border-radius: 2rem;
          opacity: 0.3;
          filter: blur(10px);
          z-index: -1;
        }
        .contact-form {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-radius: 2rem;
          background: rgba(20, 20, 28, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-family: var(--heading);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-h);
        }
        .form-group input, .form-group textarea {
          padding: 1.2rem;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          color: white;
          font-family: var(--sans);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--primary);
          background: rgba(168, 85, 247, 0.05);
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
        }
        .w-full {
          width: 100%;
          justify-content: center;
          margin-top: 1rem;
          padding: 1rem;
          font-size: 1.1rem;
        }

        .form-status {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-align: center;
          font-size: 0.9rem;
        }
        .form-status.success {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }
        .form-status.error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .contact-info {
            padding-right: 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .method {
            width: 100%;
            max-width: 400px;
            text-align: left;
          }
          .contact-form {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
