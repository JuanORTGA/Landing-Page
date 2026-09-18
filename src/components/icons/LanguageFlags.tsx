import React from 'react';

interface FlagProps {
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Bandera Oficial de España (🇪🇸)
 * Proporción heráldica con bandas rojo / amarillo / rojo y detalle sutil del escudo.
 */
export const SpanishFlag: React.FC<FlagProps> = ({ 
  width = 26, 
  height = 18, 
  className = '' 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 60 42" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`flag-svg ${className}`}
    style={{ 
      display: 'inline-block', 
      verticalAlign: 'middle', 
      borderRadius: '3.5px',
      overflow: 'hidden',
      flexShrink: 0
    }}
  >
    {/* Franja Superior Roja */}
    <rect width="60" height="10.5" fill="#AA151B" />
    
    {/* Franja Central Amarilla (Gualda) */}
    <rect y="10.5" width="60" height="21" fill="#F1BF00" />
    
    {/* Franja Inferior Roja */}
    <rect y="31.5" width="60" height="10.5" fill="#AA151B" />
    
    {/* Detalle heráldico estilizado del Escudo de España */}
    <g transform="translate(14, 15)">
      {/* Corona Real */}
      <path d="M2 1.5 Q6 0.2 10 1.5 L9 3 L3 3 Z" fill="#D43939" stroke="#AA151B" strokeWidth="0.4" />
      <circle cx="6" cy="0.4" r="0.7" fill="#F1BF00" />
      {/* Escudo cuartelado */}
      <rect x="2.5" y="3.5" width="7" height="6.5" rx="1.2" fill="#AA151B" stroke="#800D12" strokeWidth="0.5" />
      <rect x="3" y="4" width="2.8" height="2.8" fill="#F1BF00" />
      <rect x="6.2" y="4" width="2.8" height="2.8" fill="#AA151B" />
      <rect x="3" y="7" width="2.8" height="2.6" fill="#F1BF00" />
      <rect x="6.2" y="7" width="2.8" height="2.6" fill="#AA151B" />
      {/* Columnas de Hércules */}
      <line x1="0.8" y1="2" x2="0.8" y2="10.5" stroke="#71717A" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="11.2" y1="2" x2="11.2" y2="10.5" stroke="#71717A" strokeWidth="0.9" strokeLinecap="round" />
    </g>
    
    {/* Borde sutil perimetral */}
    <rect x="0.5" y="0.5" width="59" height="41" rx="3" stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none" />
  </svg>
);

/**
 * Bandera Oficial del Reino Unido / Union Jack (🇬🇧)
 * Vector geométrico de precisión: San Jorge, San Andrés y San Patricio.
 */
export const UkFlag: React.FC<FlagProps> = ({ 
  width = 26, 
  height = 18, 
  className = '' 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 60 42" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`flag-svg ${className}`}
    style={{ 
      display: 'inline-block', 
      verticalAlign: 'middle', 
      borderRadius: '3.5px',
      overflow: 'hidden',
      flexShrink: 0
    }}
  >
    {/* Campo azul marino profundo */}
    <rect width="60" height="42" fill="#012169" />
    
    {/* Aspas blancas de San Andrés */}
    <path d="M0 0 L60 42 M60 0 L0 42" stroke="#FFFFFF" strokeWidth="8.5" />
    
    {/* Aspas rojas contracambiadas de San Patricio */}
    <path d="M0 0 L27 19" stroke="#C8102E" strokeWidth="2.8" />
    <path d="M60 0 L33 19" stroke="#C8102E" strokeWidth="2.8" />
    <path d="M60 42 L33 23" stroke="#C8102E" strokeWidth="2.8" />
    <path d="M0 42 L27 23" stroke="#C8102E" strokeWidth="2.8" />
    
    {/* Cruz blanca de San Jorge (borde protector) */}
    <path d="M30 0 V42 M0 21 H60" stroke="#FFFFFF" strokeWidth="13.5" />
    
    {/* Cruz roja central de San Jorge */}
    <path d="M30 0 V42 M0 21 H60" stroke="#C8102E" strokeWidth="8" />
    
    {/* Borde sutil perimetral */}
    <rect x="0.5" y="0.5" width="59" height="41" rx="3" stroke="rgba(0,0,0,0.12)" strokeWidth="1" fill="none" />
  </svg>
);

/**
 * Bandera Oficial de la República de Estonia (🇪🇪)
 * Azul Nórdico oficial Pantone 285 C (#0072CE), Negro y Blanco.
 */
export const EstonianFlag: React.FC<FlagProps> = ({ 
  width = 26, 
  height = 18, 
  className = '' 
}) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 60 42" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`flag-svg ${className}`}
    style={{ 
      display: 'inline-block', 
      verticalAlign: 'middle', 
      borderRadius: '3.5px',
      overflow: 'hidden',
      flexShrink: 0
    }}
  >
    {/* Franja Azul de Estonia (Pantone 285 C) */}
    <rect width="60" height="14" fill="#0072CE" />
    
    {/* Franja Negra */}
    <rect y="14" width="60" height="14" fill="#121214" />
    
    {/* Franja Blanca */}
    <rect y="28" width="60" height="14" fill="#FFFFFF" />
    
    {/* Borde sutil perimetral */}
    <rect x="0.5" y="0.5" width="59" height="41" rx="3" stroke="rgba(0,0,0,0.14)" strokeWidth="1" fill="none" />
  </svg>
);

/**
 * Componente unificador para resolver la bandera por código ISO o de idioma ('es', 'en', 'et', 'gb', 'ee')
 */
export const LanguageFlagBadge: React.FC<{ 
  code: string; 
  width?: number; 
  height?: number; 
  className?: string 
}> = ({ code, width = 26, height = 18, className = '' }) => {
  const normalized = code.toLowerCase().trim();
  
  if (normalized === 'es' || normalized === 'spa') {
    return <SpanishFlag width={width} height={height} className={className} />;
  }
  if (normalized === 'en' || normalized === 'gb' || normalized === 'uk' || normalized === 'eng') {
    return <UkFlag width={width} height={height} className={className} />;
  }
  if (normalized === 'et' || normalized === 'ee' || normalized === 'est') {
    return <EstonianFlag width={width} height={height} className={className} />;
  }
  
  return null;
};
