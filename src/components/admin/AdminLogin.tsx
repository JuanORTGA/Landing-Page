import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowLeft, 
  RefreshCw, 
  KeyRound, 
  HelpCircle, 
  X, 
  LogIn
} from 'lucide-react';
import { supabase } from '../../services/supabase';
import joeLogo from '../../assets/joe-technology-logo-transparent.png';
import hero1Img from '../../assets/hero-1.jpg';
import { EstonianFlagBadge } from '../icons/FlaticonVectors';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, showToast }) => {
  const [email, setEmail] = useState<string>(() => localStorage.getItem('admin_remembered_email') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(() => Boolean(localStorage.getItem('admin_remembered_email')));
  const [isLoading, setIsLoading] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Protección Anti-Fuerza Bruta (Bloqueo tras 5 intentos fallidos)
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    const saved = sessionStorage.getItem('admin_failed_attempts');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lockoutSeconds, setLockoutSeconds] = useState<number>(() => {
    const until = sessionStorage.getItem('admin_lockout_until');
    if (until) {
      const diff = Math.ceil((parseInt(until, 10) - Date.now()) / 1000);
      return diff > 0 ? diff : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds(prev => {
        if (prev <= 1) {
          sessionStorage.removeItem('admin_lockout_until');
          sessionStorage.removeItem('admin_failed_attempts');
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  // Herramienta de Recuperación de Contraseña
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [resetSentSuccess, setResetSentSuccess] = useState(false);

  // Herramienta de Ayuda de Acceso
  const [showAccessHelp, setShowAccessHelp] = useState(false);

  // Detector de Bloq Mayús (Caps Lock)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState) {
      setIsCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState) {
      setIsCapsLockOn(e.getModifierState('CapsLock'));
    }
  };

  // Validar formato de email
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  // Proceso de Inicio de Sesión con Protección de Seguridad
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (lockoutSeconds > 0) {
      setAuthError(`Acceso bloqueado por seguridad. Espera ${lockoutSeconds} segundos antes de reintentar.`);
      return;
    }

    if (!email.trim() || !password) {
      setAuthError('Por favor ingresa tanto tu correo como tu contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        sessionStorage.setItem('admin_failed_attempts', nextAttempts.toString());

        if (nextAttempts >= 5) {
          const lockoutTime = Date.now() + 60 * 1000;
          sessionStorage.setItem('admin_lockout_until', lockoutTime.toString());
          setLockoutSeconds(60);
          setAuthError('Has alcanzado el límite de 5 intentos. El acceso ha sido bloqueado durante 60 segundos por seguridad.');
          showToast('Bloqueo de seguridad activado por intentos fallidos.', 'error');
        } else {
          const remaining = 5 - nextAttempts;
          if (error.message.includes('Invalid login credentials')) {
            setAuthError(`Credenciales incorrectas. Te quedan ${remaining} intento${remaining === 1 ? '' : 's'}.`);
          } else if (error.message.includes('Email not confirmed')) {
            setAuthError('Tu correo aún no ha sido confirmado en Supabase.');
          } else {
            setAuthError(error.message);
          }
          showToast(error.message, 'error');
        }
      } else {
        setFailedAttempts(0);
        sessionStorage.removeItem('admin_failed_attempts');
        sessionStorage.removeItem('admin_lockout_until');

        if (rememberMe) {
          localStorage.setItem('admin_remembered_email', email.trim());
        } else {
          localStorage.removeItem('admin_remembered_email');
        }
        showToast('¡Bienvenido de vuelta, Juan!', 'success');
        onLoginSuccess();
      }
    } catch (err: any) {
      setAuthError('Error al conectar con el servidor de autenticación.');
      showToast(err.message || 'Error de conexión', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Enviar correo de restablecimiento de contraseña
  const handleSendResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      showToast('Ingresa tu correo para recibir el enlace.', 'error');
      return;
    }

    setIsSendingReset(true);
    try {
      const redirectUrl = window.location.href;
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: redirectUrl,
      });

      if (error) {
        showToast(error.message, 'error');
      } else {
        setResetSentSuccess(true);
        showToast('Instrucciones enviadas a tu correo.', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Error al solicitar restablecimiento', 'error');
    } finally {
      setIsSendingReset(false);
    }
  };

  return (
    <div 
      className="admin-login-universe landing-theme" 
      style={{ backgroundImage: `linear-gradient(180deg, rgba(11, 15, 25, 0.84) 0%, rgba(6, 10, 14, 0.94) 100%), url(${hero1Img})` }}
    >
      {/* Tarjeta con el estilo exacto de la Landing Page (.connect-navy-card) */}
      <motion.div 
        className="login-landing-card" 
        initial={{ opacity: 0, y: 24 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* Cabecera idéntica al Navbar de la Landing */}
        <div className="login-landing-header">
          <a href="/" className="login-nav-logo" title="Volver a la landing">
            <img 
              src={joeLogo} 
              alt="JoE TECHNOLOGY" 
              className="login-nav-logo-img" 
            />
            <span className="login-nav-text">
              JUAN ORTEGA <span className="login-nav-divider">/</span> ADMIN
            </span>
          </a>

          {/* Section Kicker con Bandera de Estonia */}
          <div className="section-kicker on-dark login-kicker">
            <EstonianFlagBadge />
            <span>ACCESO ADMINISTRATIVO</span>
          </div>

          <h2 className="login-card-title">Panel de Control</h2>
          <p className="login-card-text">
            Gestión integral de arquitectura, proyectos, tecnologías y contenidos de la web.
          </p>
        </div>

        {/* Alerta de Error si ocurre */}
        <AnimatePresence>
          {authError && (
            <motion.div 
              className="status-banner error login-status-banner"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AlertTriangle size={15} className="alert-icon" />
              <span>{authError}</span>
              <button 
                type="button" 
                className="btn-close-alert"
                onClick={() => setAuthError(null)}
                aria-label="Cerrar alerta"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulario con estilos de la Landing (.input-group y .btn-pill-navy) */}
        <form onSubmit={handleSubmit} className="login-landing-form">
          {/* Campo: Correo Electrónico */}
          <div className="landing-input-group">
            <div className="input-group-label-row">
              <label htmlFor="login-email">Tu Correo Electrónico</label>
              {email && isEmailValid && (
                <span className="valid-email-badge">
                  <CheckCircle2 size={12} /> Formato válido
                </span>
              )}
            </div>

            <div className="input-field-container">
              <div className="input-field-icon">
                <Mail size={16} />
              </div>
              <input 
                id="login-email"
                type="email" 
                value={email} 
                onChange={e => { setEmail(e.target.value); setAuthError(null); }} 
                required 
                placeholder="admin@juanortega.dev" 
                autoComplete="email"
                disabled={isLoading}
                className="landing-text-input"
              />
              {email && !isLoading && (
                <button 
                  type="button" 
                  className="input-clear-btn"
                  onClick={() => setEmail('')}
                  title="Borrar texto"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Campo: Contraseña con Toggle y Detector CapsLock */}
          <div className="landing-input-group">
            <div className="input-group-label-row">
              <label htmlFor="login-password">Contraseña de Acceso</label>
              <button 
                type="button" 
                className="forgot-link-btn"
                onClick={() => {
                  setForgotEmail(email);
                  setResetSentSuccess(false);
                  setIsForgotModalOpen(true);
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <div className="input-field-container">
              <div className="input-field-icon">
                <Lock size={16} />
              </div>
              <input 
                id="login-password"
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={e => { setPassword(e.target.value); setAuthError(null); }} 
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                required 
                placeholder="••••••••••••••••" 
                autoComplete="current-password"
                disabled={isLoading}
                className="landing-text-input"
              />
              <button 
                type="button" 
                className="input-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Aviso sutil de Bloq Mayús activo */}
            <AnimatePresence>
              {isCapsLockOn && (
                <motion.div 
                  className="caps-lock-tag"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  <AlertTriangle size={12} />
                  <span>Bloq Mayús (Caps Lock) está activado</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fila de Herramientas: Recordar Sesión & Ayuda Rápida */}
          <div className="login-actions-row">
            <label className="remember-checkbox-label">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={e => setRememberMe(e.target.checked)} 
                disabled={isLoading}
              />
              <span>Recordar mi correo</span>
            </label>

            <button 
              type="button" 
              className="quick-help-pill"
              onClick={() => setShowAccessHelp(!showAccessHelp)}
              title="Información de acceso y ayuda técnica"
            >
              <HelpCircle size={13} />
              <span>Ayuda de acceso</span>
            </button>
          </div>

          {/* Panel Desplegable de Ayuda de Acceso */}
          <AnimatePresence>
            {showAccessHelp && (
              <motion.div 
                className="landing-help-drawer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="help-drawer-content">
                  <div className="help-drawer-title">
                    <KeyRound size={14} color="#93c5fd" />
                    <strong>Acceso Seguro con Supabase Auth</strong>
                  </div>
                  <p>
                    El panel administrativo está protegido con encriptación AES-256 y tokens JWT de Supabase.
                  </p>
                  <div className="help-points">
                    <span>• Puedes solicitar un enlace de restablecimiento si olvidaste tu clave.</span>
                    <span>• Los usuarios autorizados se administran en tu proyecto en <code>supabase.com</code>.</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón Principal (.btn-pill-navy de la Landing Page) */}
          <button 
            type="submit" 
            className="btn-pill-navy login-landing-btn"
            disabled={isLoading || lockoutSeconds > 0}
          >
            {lockoutSeconds > 0 ? (
              <>
                <ShieldCheck size={16} />
                <span>Bloqueo de Seguridad ({lockoutSeconds}s)</span>
              </>
            ) : isLoading ? (
              <>
                <RefreshCw size={16} className="btn-spinner" />
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <LogIn size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer: Conexión SSL y Enlace para Volver */}
        <div className="login-landing-footer">
          <div className="ssl-status-line">
            <ShieldCheck size={14} color="#34d399" />
            <span>Supabase Auth · Conexión Segura SSL</span>
          </div>

          <a href="/" className="landing-back-link">
            <ArrowLeft size={15} />
            <span>Volver a la Landing Page</span>
          </a>
        </div>
      </motion.div>

      {/* Modal para Restablecer Contraseña */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <div className="contact-modal-overlay" onClick={() => setIsForgotModalOpen(false)}>
            <motion.div 
              className="contact-modal-box login-reset-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
            >
              <div className="modal-top">
                <div className="dialog-title-wrap">
                  <KeyRound size={20} color="#0072ce" />
                  <h3>Restablecer Contraseña</h3>
                </div>
                <button 
                  type="button" 
                  className="modal-close"
                  onClick={() => setIsForgotModalOpen(false)}
                  aria-label="Cerrar modal"
                >
                  <X size={18} />
                </button>
              </div>

              {resetSentSuccess ? (
                <div className="status-banner success" style={{ textAlign: 'left', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <CheckCircle2 size={20} color="#10b981" />
                    <strong style={{ color: '#10b981' }}>¡Enlace de recuperación enviado!</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    Hemos enviado las instrucciones para restablecer tu clave a <strong>{forgotEmail}</strong>. 
                    Revisa tu bandeja de entrada o carpeta de spam.
                  </p>
                  <button 
                    type="button" 
                    className="btn-pill-navy"
                    style={{ marginTop: '1rem', width: '100%' }}
                    onClick={() => setIsForgotModalOpen(false)}
                  >
                    Volver al login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendResetPassword} className="modal-form">
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: '0 0 0.5rem' }}>
                    Ingresa el correo electrónico asociado al administrador para recibir un enlace seguro de recuperación:
                  </p>

                  <div className="input-group">
                    <label htmlFor="reset-email">Correo del Administrador</label>
                    <input 
                      id="reset-email"
                      type="email" 
                      value={forgotEmail} 
                      onChange={e => setForgotEmail(e.target.value)} 
                      required 
                      placeholder="admin@juanortega.dev"
                      disabled={isSendingReset}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                    <button 
                      type="button" 
                      className="btn-circle-outline"
                      style={{ flex: 1, padding: '0.75rem', borderRadius: '2rem', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'transparent', color: '#cbd5e1', cursor: 'pointer', fontWeight: 600 }}
                      onClick={() => setIsForgotModalOpen(false)}
                      disabled={isSendingReset}
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      className="btn-pill-navy"
                      style={{ flex: 1.5, justifyContent: 'center' }}
                      disabled={isSendingReset}
                    >
                      {isSendingReset ? 'Enviando...' : 'Enviar Enlace'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLogin;
