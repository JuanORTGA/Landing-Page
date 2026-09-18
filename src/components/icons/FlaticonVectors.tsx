import React from 'react';

// 1. Ecosistema Digital & Innovación (Estilo Flaticon Premium / Tech Stack Ecosystem)
export const DigitalEcosystemIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 24, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2L3 7L12 12L21 7L12 2Z" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M3 12L12 17L21 12" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.85"
    />
    <path 
      d="M3 17L12 22L21 17" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.5"
    />
    <circle cx="12" cy="7" r="1.5" fill="#38bdf8" />
  </svg>
);

// 2. Arquitectura de Software & Código Limpio (Estilo Flaticon / Modular System)
export const CleanArchitectureIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 24, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect 
      x="3" 
      y="3" 
      width="7.5" 
      height="7.5" 
      rx="2" 
      stroke={color} 
      strokeWidth="1.75" 
    />
    <rect 
      x="13.5" 
      y="3" 
      width="7.5" 
      height="7.5" 
      rx="2" 
      stroke={color} 
      strokeWidth="1.75" 
    />
    <rect 
      x="13.5" 
      y="13.5" 
      width="7.5" 
      height="7.5" 
      rx="2" 
      stroke={color} 
      strokeWidth="1.75" 
    />
    <rect 
      x="3" 
      y="13.5" 
      width="7.5" 
      height="7.5" 
      rx="2" 
      stroke="#38bdf8" 
      strokeWidth="1.75" 
      strokeDasharray="2.5 2"
    />
    <path 
      d="M10.5 6.75H13.5M17.25 10.5V13.5M6.75 10.5V13.5" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      opacity="0.75"
    />
    <circle cx="6.75" cy="6.75" r="1" fill="#38bdf8" />
    <circle cx="17.25" cy="6.75" r="1" fill="#0072ce" />
    <circle cx="17.25" cy="17.25" r="1" fill="#38bdf8" />
  </svg>
);

// 3. Fluidez Global & Comunicación Multilingüe (Estilo Flaticon / Global Dialect)
export const GlobalFluencyIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 20, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="9.25" stroke={color} strokeWidth="1.75" />
    <ellipse cx="12" cy="12" rx="4.25" ry="9.25" stroke={color} strokeWidth="1.75" />
    <path 
      d="M3 12H21M4 7.5H20M4 16.5H20" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      opacity="0.65"
    />
    <circle cx="12" cy="12" r="1.5" fill="#38bdf8" />
  </svg>
);

// 4. Empresa & Carrera Profesional (Estilo Flaticon / Enterprise Architecture)
export const EnterpriseWorkIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 22, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M3 21H21" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
    />
    <path 
      d="M5 21V5C5 4.44772 5.44772 4 6 4H13C13.5523 4 14 4.44772 14 5V21" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M14 10H18C18.5523 10 19 10.4477 19 11V21" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.85"
    />
    <path 
      d="M8 8H10M8 12H10M8 16H10" 
      stroke="#38bdf8" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M16 14H17M16 17H17" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
  </svg>
);

// 5. Título Académico & Certificación Oficial (Estilo Flaticon / Degree Graduate)
export const AcademicDegreeIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 22, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 3L2 8.2L12 13.4L22 8.2L12 3Z" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M5.5 10.5V16C5.5 17.5 8.4 20 12 20C15.6 20 18.5 17.5 18.5 16V10.5" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M22 8.2V15.5" 
      stroke="#38bdf8" 
      strokeWidth="1.75" 
      strokeLinecap="round" 
    />
    <circle cx="22" cy="16.5" r="1.5" fill="#38bdf8" />
  </svg>
);

// 6. Horarios Globales (Estilo Flaticon / Precision World Clock)
export const PreciseWorldClockIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="9.25" stroke={color} strokeWidth="1.75" />
    <path 
      d="M12 6.5V12L15.75 14" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="12" cy="12" r="1.5" fill="#38bdf8" />
    <path d="M12 2.5V4M12 20V21.5M2.5 12H4M20 12H21.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 7. Redes & Conectividad de Ingeniería (Estilo Flaticon / Network Nodes Hub)
export const NetworkConnectIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.75" fill="rgba(0, 114, 206, 0.15)" />
    <circle cx="5" cy="6" r="2.25" stroke="#38bdf8" strokeWidth="1.5" />
    <circle cx="19" cy="6" r="2.25" stroke="#38bdf8" strokeWidth="1.5" />
    <circle cx="5" cy="18" r="2.25" stroke={color} strokeWidth="1.5" />
    <circle cx="19" cy="18" r="2.25" stroke={color} strokeWidth="1.5" />
    <path 
      d="M7 7.5L9.75 10M17 7.5L14.25 10M7 16.5L9.75 14M17 16.5L14.25 14" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      opacity="0.8" 
    />
  </svg>
);

// 8. Insignia Vectorial Bandera de Estonia (Reemplaza el emoji genérico 🇪🇪 con precisión heráldica)
export const EstonianFlagBadge: React.FC<{ className?: string }> = ({ 
  className = '' 
}) => (
  <svg 
    width="22" 
    height="16" 
    viewBox="0 0 22 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ borderRadius: '3px', overflow: 'hidden', display: 'inline-block', verticalAlign: 'middle', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
  >
    <rect width="22" height="16" rx="2.5" fill="#ffffff" />
    {/* Franja Azul Nórdico de Estonia */}
    <rect x="0" y="0" width="22" height="5.33" fill="#0072CE" />
    {/* Franja Negra de Estonia */}
    <rect x="0" y="5.33" width="22" height="5.33" fill="#18181B" />
    {/* Franja Blanca de Estonia */}
    <rect x="0" y="10.66" width="22" height="5.34" fill="#FFFFFF" />
    {/* Borde sutil exterior */}
    <rect x="0.5" y="0.5" width="21" height="15" rx="2" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
  </svg>
);

// 9. Hora Universal UTC / Meridiano de Greenwich (Estilo Flaticon / UTC Meridian Globe)
export const UniversalTimeIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.75" />
    {/* Meridiano cero destacado */}
    <line x1="12" y1="3" x2="12" y2="21" stroke="#38bdf8" strokeWidth="1.75" strokeLinecap="round" />
    {/* Paralelos */}
    <path d="M4 8.5C6.5 9.5 17.5 9.5 20 8.5" stroke={color} strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
    <path d="M4 15.5C6.5 14.5 17.5 14.5 20 15.5" stroke={color} strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
  </svg>
);

// 10. Ubicación Local / Pin Arquitectónico (Reemplaza el emoji genérico 📍 con vector Flaticon)
export const LocationPinIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = '#38bdf8' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 21C15.5 17 19 13.5 19 9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5C5 13.5 8.5 17 12 21Z" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="12" cy="9.5" r="2.75" stroke={color} strokeWidth="1.5" fill="rgba(56, 189, 248, 0.25)" />
  </svg>
);

// 11. Arquitectura en Capas / Clean Architecture (Estilo Flaticon Engineering Layers)
export const ArchitectureLayerIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 15, 
  className = '', 
  color = '#38bdf8' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 2L2 7L12 12L22 7L12 2Z" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M2 12L12 17L22 12" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.8"
    />
    <path 
      d="M2 17L12 22L22 17" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.5"
    />
  </svg>
);

// 12. Escudo de Producción Verificado / Production Ready (Estilo Flaticon Enterprise Shield)
export const ProductionShieldIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 15, 
  className = '', 
  color = '#0072ce' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
      stroke={color} 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M9 12L11 14L15 10" 
      stroke="#38bdf8" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);
