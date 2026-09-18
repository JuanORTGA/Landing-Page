import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Download, Send, X, Mail } from 'lucide-react';
import { supabase } from '../services/supabase';
import { EstonianFlagBadge, ArchitectureLayerIcon, ProductionShieldIcon } from './icons/FlaticonVectors';

import contactCodeImg from '../assets/contact-code.jpg';
import contactTechImg from '../assets/contact-tech.jpg';

const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Imágenes dinámicas desde Supabase o fallback a assets locales
  const customCode = t('image_contact_code');
  const codeImgUrl = customCode && customCode !== 'image_contact_code' ? customCode : contactCodeImg;

  const customTech = t('image_contact_tech');
  const techImgUrl = customTech && customTech !== 'image_contact_tech' ? customTech : contactTechImg;

  const getT = (key: string, fallback: string) => {
    const val = t(key);
    return val === key ? fallback : val;
  };

  const getFallback = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      cta_kicker: { 
        es: 'Contacto', 
        en: 'Contact', 
        et: 'Kontakt' 
      },
      cta_title: { 
        es: '¿Tienes un proyecto o una oportunidad en tu equipo? Hablemos.', 
        en: 'Have a project or an opening on your team? Let’s talk.', 
        et: 'Kas teil on projekt või võimalus oma meeskonnas? Räägime.' 
      },
      cta_text: { 
        es: 'Estoy disponible para conversar sobre nuevas oportunidades de desarrollo, colaboración técnica o proyectos freelance.', 
        en: 'I am available to discuss new software opportunities, technical collaboration, or freelance projects.', 
        et: 'Olen saadaval, et arutada uusi arendusvõimalusi, tehnilist koostööd või vabakutselisi projekte.' 
      },
      contact_form_name: { es: 'Tu Nombre', en: 'Your Name', et: 'Sinu nimi' },
      contact_form_email: { es: 'Tu Correo', en: 'Your Email', et: 'Sinu e-post' },
      contact_form_msg: { es: 'Mensaje', en: 'Message', et: 'Sõnum' },
      contact_send_btn: { es: 'Enviar Mensaje', en: 'Send Message', et: 'Saada sõnum' },
      sending_btn: { es: 'Enviando...', en: 'Sending...', et: 'Saatmine...' },
      msg_success: { es: '¡Mensaje enviado con éxito!', en: 'Message sent successfully!', et: 'Sõnum edukalt saadetud!' },
      msg_error: { es: 'Hubo un error al enviar.', en: 'There was an error sending.', et: 'Saatmisel tekkis viga.' },
    };
    return fallbacks[key]?.[language as string] || fallbacks[key]?.['es'] || key;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    // 1. Trampa Anti-Bot Honeypot: si el campo señuelo invisible fue rellenado, es un bot
    const honeypot = formData.get('hp_security_check') as string;
    if (honeypot && honeypot.trim().length > 0) {
      // Simular éxito transparente sin almacenar spam en la base de datos
      setStatus({ type: 'success', message: getT('msg_success', getFallback('msg_success')) });
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsFormOpen(false), 1500);
      setIsSubmitting(false);
      return;
    }

    // 2. Control de Frecuencia Anti-Spam (Rate Limiting de 45 segundos)
    const lastSent = sessionStorage.getItem('last_msg_sent_at');
    if (lastSent) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
      if (elapsed < 45) {
        setStatus({ 
          type: 'error', 
          message: language === 'en' 
            ? `Please wait ${45 - elapsed}s before sending another message.` 
            : language === 'et' 
            ? `Palun oodake ${45 - elapsed}s enne uue sõnumi saatmist.` 
            : `Por favor espera ${45 - elapsed}s antes de enviar otro mensaje.` 
        });
        setIsSubmitting(false);
        return;
      }
    }

    // 3. Sanitización e Higiene de Entradas (Límite de caracteres y eliminación de etiquetas HTML)
    const rawName = ((formData.get('name') as string) || '').trim().replace(/<[^>]*>/g, '').slice(0, 100);
    const rawEmail = ((formData.get('email') as string) || '').trim().slice(0, 150);
    const rawMessage = ((formData.get('message') as string) || '').trim().replace(/<[^>]*>/g, '').slice(0, 2500);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawName || !rawEmail || !rawMessage) {
      setStatus({ type: 'error', message: 'Por favor completa todos los campos requeridos.' });
      setIsSubmitting(false);
      return;
    }

    if (!emailRegex.test(rawEmail)) {
      setStatus({ type: 'error', message: 'Por favor introduce un correo electrónico válido.' });
      setIsSubmitting(false);
      return;
    }

    const data = {
      name: rawName,
      email: rawEmail,
      message: rawMessage,
    };

    try {
      const { error } = await supabase.from('messages').insert([data]);
      if (error) throw error;
      sessionStorage.setItem('last_msg_sent_at', Date.now().toString());
      setStatus({ type: 'success', message: getT('msg_success', getFallback('msg_success')) });
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsFormOpen(false), 2000);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setStatus({ type: 'error', message: getT('msg_error', getFallback('msg_error')) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="connect-section">
      <div className="container">
        {/* Banner Principal con Diseño Split & Collage Tecnológico */}
        <motion.div 
          className="connect-navy-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Lado Izquierdo: Copywriting y Acciones */}
          <div className="connect-card-content">
            <div className="section-kicker on-dark">
              <span>{getT('cta_kicker', getFallback('cta_kicker'))}</span>
            </div>

            <h2 className="connect-card-title">
              {getT('cta_title', getFallback('cta_title'))}
            </h2>

            <p className="connect-card-text">
              {getT('cta_text', getFallback('cta_text'))}
            </p>

            {/* Circular Action Buttons Row */}
            <div className="connect-actions-row">
              {/* Mint Circle LinkedIn */}
              <a 
                href="https://linkedin.com/in/juan-ortega-223804326" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="connect-circle-btn mint"
                aria-label="Perfil de LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              {/* Slate Outline GitHub */}
              <a 
                href="https://github.com/JuanORTGA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="connect-circle-btn outline"
                aria-label="Repositorio de GitHub"
                title="GitHub"
              >
                <Github size={20} />
              </a>

              {/* Message / Contact Trigger */}
              <button 
                onClick={() => setIsFormOpen(true)}
                className="connect-circle-btn outline"
                aria-label="Enviar Mensaje Directo"
                title="Escribir mensaje directo"
              >
                <Mail size={20} />
              </button>

              {/* Download CV Trigger */}
              <a 
                href="#hero" 
                className="connect-circle-btn outline"
                aria-label="Ir a Descarga de CV"
                title="Descargar CV"
              >
                <Download size={20} />
              </a>
            </div>
          </div>

          {/* Lado Derecho: Mosaico / Collage Tecnológico Entrelazado */}
          <div className="connect-collage-column">
            <div className="collage-wrapper">
              
              {/* Tarjeta 1: Pantalla de Código / Engineering Focus */}
              <motion.div 
                className="collage-card card-code"
                whileHover={{ y: -5, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-img-box">
                  <img src={codeImgUrl} alt="Programming Code Screen" className="collage-photo" />
                </div>
              </motion.div>

              {/* Tarjeta 2: Espacio de Trabajo / Workstation */}
              <motion.div 
                className="collage-card card-tech"
                whileHover={{ y: -5, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={techImgUrl} alt="Developer Tech Workspace" className="collage-photo" />
              </motion.div>

              {/* Tarjeta 3 (Widget): Insignia Flotante de Cristal Nórdico */}
              <motion.div 
                className="collage-card card-floating-badge"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="badge-header">
                  <EstonianFlagBadge />
                  <span className="badge-title">Estonia Mindset</span>
                </div>
                <div className="badge-stats">
                  <div className="stat-line">
                    <ArchitectureLayerIcon size={14} color="#0072ce" className="stat-icon" />
                    <span>Clean Architecture</span>
                  </div>
                  <div className="stat-line">
                    <ProductionShieldIcon size={14} color="#38bdf8" className="stat-icon" />
                    <span>100% Production Ready</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </motion.div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="contact-modal-overlay" onClick={() => setIsFormOpen(false)}>
            <motion.div 
              className="contact-modal-box"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-top">
                <h3>{getT('cta_kicker', getFallback('cta_kicker'))}</h3>
                <button className="modal-close" onClick={() => setIsFormOpen(false)} aria-label="Cerrar modal">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                {/* Trampa Señuelo Anti-Bot Honeypot (Invisible para usuarios reales) */}
                <input 
                  type="text" 
                  name="hp_security_check" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  aria-hidden="true" 
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }} 
                />

                <div className="input-group">
                  <label>{getT('contact_form_name', getFallback('contact_form_name'))}</label>
                  <input name="name" type="text" required maxLength={100} placeholder="Juan Pérez" />
                </div>

                <div className="input-group">
                  <label>{getT('contact_form_email', getFallback('contact_form_email'))}</label>
                  <input name="email" type="email" required placeholder="tu@correo.com" />
                </div>

                <div className="input-group">
                  <label>{getT('contact_form_msg', getFallback('contact_form_msg'))}</label>
                  <textarea name="message" rows={4} required placeholder="¿En qué puedo ayudarte?"></textarea>
                </div>

                <button type="submit" className="btn-pill-navy form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? getT('sending_btn', getFallback('sending_btn')) : getT('contact_send_btn', getFallback('contact_send_btn'))}
                  {!isSubmitting && <Send size={16} />}
                </button>

                {status && (
                  <div className={`status-banner ${status.type}`}>
                    {status.message}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .connect-section {
          background: var(--bg);
          padding-top: 4.5rem;
          padding-bottom: 6rem;
          transition: background-color 0.3s ease;
        }

        body.dark-mode .connect-section {
          background: #0c1014;
        }

        /* Tarjeta Ejecutiva de Contacto con Identidad Estonia */
        .connect-navy-card {
          background: linear-gradient(135deg, #071324 0%, #0072ce 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 2rem;
          padding: 3.25rem 3.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 48px -12px rgba(0, 114, 206, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3rem;
          align-items: center;
          transition: all 0.3s ease;
        }

        body.dark-mode .connect-navy-card {
          background: linear-gradient(135deg, #121820 0%, #0c1014 100%);
          border: 1px solid rgba(0, 114, 206, 0.35);
          box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 114, 206, 0.15);
        }

        .section-kicker.on-dark {
          color: #38bdf8 !important;
        }

        @media (max-width: 960px) {
          .connect-navy-card {
            grid-template-columns: 1fr;
            padding: 2.5rem 1.75rem;
            gap: 2.5rem;
          }
        }

        .connect-card-content {
          position: relative;
          z-index: 2;
        }

        .connect-card-title {
          font-size: 2.15rem;
          line-height: 1.22;
          color: #ffffff;
          margin-bottom: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.025em;
        }

        .connect-card-text {
          font-size: 0.98rem;
          line-height: 1.62;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 2rem;
          max-width: 520px;
        }

        .connect-actions-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .connect-circle-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .connect-circle-btn.mint {
          background: #ffffff;
          color: #0072ce;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, box-shadow 0.22s ease, color 0.2s ease;
        }

        body.dark-mode .connect-circle-btn.mint {
          background: #0072ce;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .connect-circle-btn.mint:hover {
          background: #005fa8;
          color: #ffffff;
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .connect-circle-btn.outline {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.22s ease;
        }

        .connect-circle-btn.outline:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-1.5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* =========================================================
           COLLAGE TECNOLÓGICO DE 3 TARJETAS ENTRELAZADAS
           ========================================================= */
        .connect-collage-column {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .collage-wrapper {
          position: relative;
          width: 100%;
          max-width: 380px;
          height: 280px;
        }

        .collage-card {
          position: absolute;
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .collage-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Tarjeta 1: Pantalla de Código (Arriba / Inclinada con acabado sobrio) */
        .card-code {
          top: 0;
          left: 0;
          width: 250px;
          height: 165px;
          z-index: 2;
          transform: rotate(-2.5deg);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
          background: #0d1520;
        }

        .card-img-box {
          position: relative;
          width: 100%;
          height: 100%;
        }

        /* Tarjeta 2: Tech Workspace (Abajo / Desplazada con marco nórdico) */
        .card-tech {
          bottom: 0;
          right: 0;
          width: 235px;
          height: 160px;
          z-index: 1;
          transform: rotate(3deg);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }

        /* Tarjeta 3: Insignia Flotante (Widget de Cristal Nórdico de Alta Gama) */
        .card-floating-badge {
          bottom: 1.25rem;
          left: 2.5rem;
          z-index: 3;
          background: rgba(8, 14, 22, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 0.9rem 1.15rem;
          border-radius: 0.9rem;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
          width: 215px;
        }

        .badge-header {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin-bottom: 0.6rem;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .badge-title {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.02em;
        }

        .badge-stats {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .stat-line {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #cbd5e1;
          letter-spacing: 0.01em;
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Modal Styles */
        .contact-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1.5rem;
        }

        .contact-modal-box {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 2rem;
          padding: 2.25rem;
          width: 100%;
          max-width: 480px;
          box-shadow: var(--shadow-lg);
        }

        .modal-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-top h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-h);
        }

        .modal-close {
          background: var(--bg-card-subtle);
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close:hover {
          color: var(--text-h);
          border-color: var(--primary-blue);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .input-group input,
        .input-group textarea {
          background: var(--bg-card-subtle);
          border: 1px solid var(--border);
          border-radius: 0.85rem;
          padding: 0.85rem 1rem;
          color: var(--text-h);
          font-family: inherit;
          font-size: 0.92rem;
          transition: border-color 0.2s;
        }

        .input-group input:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #0072ce;
        }

        .form-submit-btn {
          width: 100%;
          padding: 0.85rem;
          margin-top: 0.5rem;
        }

        .status-banner {
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-size: 0.85rem;
          text-align: center;
          font-weight: 600;
        }

        .status-banner.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-banner.error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        @media (max-width: 640px) {
          .connect-navy-card {
            padding: 2rem 1.25rem;
            border-radius: 1.5rem;
          }
          .connect-card-title {
            font-size: clamp(1.6rem, 5.5vw, 2rem);
          }
          .connect-card-text {
            font-size: 0.9rem;
          }
          .connect-collage-column {
            min-height: 240px;
          }
          .collage-wrapper {
            transform: scale(0.82);
            transform-origin: center center;
          }
          .contact-modal-box {
            padding: 1.5rem 1.25rem;
            max-height: 88vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
