import React from 'react';

// 1. Proyectos: Carpeta Modular de Ingeniería (Estilo Flaticon / Project Folder)
export const AdminFolderProjectsIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor' 
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
      d="M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V9C21 7.89543 20.1046 7 19 7H12L10 4H5C3.89543 4 3 4.89543 3 6V7Z" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M9.5 13L8 14.5L9.5 16M14.5 13L16 14.5L14.5 16" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.8"
    />
  </svg>
);

// 2. Stack & Skills: Microchip de Precisión (Estilo Flaticon / Hardware Microchip)
export const AdminChipSkillsIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor' 
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
      x="5" 
      y="5" 
      width="14" 
      height="14" 
      rx="3" 
      stroke={color} 
      strokeWidth="1.75" 
    />
    <circle cx="12" cy="12" r="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M9 1V5M15 1V5M9 19V23M15 19V23M1 9H5M1 15H5M19 9H23M19 15H23" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

// 3. Experiencia: Arquitectura Corporativa / Carrera (Estilo Flaticon / Career Milestone)
export const AdminBriefcaseExpIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor' 
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
      y="7" 
      width="18" 
      height="14" 
      rx="3" 
      stroke={color} 
      strokeWidth="1.75" 
    />
    <path 
      d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
    />
    <path 
      d="M3 12H21M10 12V14M14 12V14" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      opacity="0.85"
    />
  </svg>
);

// 4. Educación: Grado Académico & Certificación (Estilo Flaticon / Academic Mortarboard)
export const AdminGraduationEduIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor' 
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
      d="M12 3L2 8L12 13L22 8L12 3Z" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M6 10.5V16C6 17.5 8.7 19.5 12 19.5C15.3 19.5 18 17.5 18 16V10.5" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M22 8V15" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

// 5. Textos & Copys: Documento Editorial & Tipografía (Estilo Flaticon / Content Document)
export const AdminDocumentCopyIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor' 
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
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M14 2V8H20" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 13H16M8 17H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// 6. Archivos CV: Expediente Curricular Oficial (Estilo Flaticon / Curriculum Dossier)
export const AdminPdfCvIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor' 
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
      x="4" 
      y="3" 
      width="16" 
      height="18" 
      rx="2.5" 
      stroke={color} 
      strokeWidth="1.75" 
    />
    <circle cx="9" cy="8.5" r="2" stroke={color} strokeWidth="1.5" />
    <path d="M14 8H17M14 11H17" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M7 16H17M7 19H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
  </svg>
);

// 7. Imágenes & Media: Lente de Galería Multimedia (Estilo Flaticon / Media Studio)
export const AdminMediaGalleryIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 18, 
  className = '', 
  color = 'currentColor' 
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
      width="18" 
      height="18" 
      rx="3" 
      stroke={color} 
      strokeWidth="1.75" 
    />
    <circle cx="8.5" cy="8.5" r="2" stroke={color} strokeWidth="1.5" />
    <path 
      d="M21 15L16 10L6 20M14 18L18 14L21 17" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      opacity="0.85"
    />
  </svg>
);

// 8. Sincronización de Datos Limpia (Reemplaza el icono genérico Sparkles / IA)
export const AdminSyncIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({ 
  size = 16, 
  className = '', 
  color = 'currentColor' 
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
      d="M21.5 2V8H15.5" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M2.5 22V16H8.5" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M20.5 13C20.1 17.1 16.6 20.5 12 20.5C8.8 20.5 6 18.7 4.5 16M3.5 11C3.9 6.9 7.4 3.5 12 3.5C15.2 3.5 18 5.3 19.5 8" 
      stroke={color} 
      strokeWidth="1.75" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);
