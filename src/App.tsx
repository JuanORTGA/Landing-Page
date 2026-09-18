import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

// Carga diferida (Code Splitting): El código del panel de administración
// NUNCA se descarga en el navegador de los visitantes normales de la landing page.
const AdminPage = lazy(() => import('./pages/AdminPage'));

// Ruta secreta del panel administrativo (configurable mediante .env)
const SECRET_ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || '/studio-jo-2026';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080d12', color: '#38bdf8', fontFamily: 'sans-serif' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid rgba(56,189,248,0.2)', borderTopColor: '#38bdf8', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
              <p style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}>Cargando entorno seguro...</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        }>
          <Routes>
            {/* Landing Page Pública */}
            <Route path="/" element={<LandingPage />} />

            {/* Ruta Secreta del Panel de Control (Aislada y protegida) */}
            <Route path={SECRET_ADMIN_PATH} element={<AdminPage />} />

            {/* Trampas Anti-Escaneo / Honeypot: Si un bot intenta /admin o rutas comunes, se redirige a Home */}
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="/wp-admin" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />

            {/* Cualquier otra ruta no existente redirige a la Landing Page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
