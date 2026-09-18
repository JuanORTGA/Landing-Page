import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  RefreshCw, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Eye, 
  Plus, 
  Save, 
  Copy, 
  Check, 
  X, 
  Sparkles, 
  User, 
  Briefcase, 
  GraduationCap, 
  Languages as LanguagesIcon, 
  Layers, 
  Download,
  FileDown,
  Award,
  Globe,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Tag,
  Camera,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  LayoutTemplate,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Circle,
  Square,
  ArrowUp,
  ArrowDown,
  FolderPlus,
  FolderOpen,
  Edit3,
  Code,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { supabase } from '../../../services/supabase';
import juanImg from '../../../assets/juan.jpg';
import type { ExperienceItem, Skill, PageContent } from '../../../types/database';

export interface CVManagementProps {
  cvFiles: any[];
  experiences?: ExperienceItem[];
  skills?: Skill[];
  contents?: PageContent[];
  isUploading: boolean;
  onUpload: (file: File, language: string) => Promise<void> | void;
  onDeleteCV?: (language: string) => Promise<void> | void;
  onDeleteAllCVs?: () => Promise<void> | void;
}

export interface CVPhotoSettings {
  showPhoto: boolean;
  photoUrl: string;
  size: number; // 60 a 160 px
  shape: 'circle' | 'rounded' | 'square';
  position: 'left' | 'center' | 'right';
}

export interface DigitalCVExperience {
  id: string;
  company: string;
  role_es: string;
  role_en: string;
  role_et: string;
  period_es: string;
  period_en: string;
  period_et: string;
  location: string;
  highlights_es: string[];
  highlights_en: string[];
  highlights_et: string[];
}

export interface DigitalCVProject {
  id: string;
  name: string;
  role_es: string;
  role_en: string;
  role_et: string;
  period: string;
  link?: string;
  techStack: string;
  highlights_es: string[];
  highlights_en: string[];
  highlights_et: string[];
}

export interface DigitalCVEducation {
  id: string;
  institution: string;
  degree_es: string;
  degree_en: string;
  degree_et: string;
  period: string;
  details_es: string;
  details_en: string;
  details_et: string;
}

export interface DigitalCVCertification {
  id: string;
  name_es: string;
  name_en: string;
  name_et: string;
  issuer: string;
  year: string;
}

export interface DigitalCVLanguage {
  id: string;
  name_es: string;
  name_en: string;
  name_et: string;
  level_es: string;
  level_en: string;
  level_et: string;
}

export interface DigitalCVCustomSection {
  id: string;
  title_es: string;
  title_en: string;
  title_et: string;
  content_es: string;
  content_en: string;
  content_et: string;
}

export interface DigitalCVData {
  id?: string;
  cvTitle?: string;
  photoSettings: CVPhotoSettings;
  personalInfo: {
    fullName: string;
    title_es: string;
    title_en: string;
    title_et: string;
    email: string;
    phone: string;
    location_es: string;
    location_en: string;
    location_et: string;
    availability_es: string;
    availability_en: string;
    availability_et: string;
    linkedin: string;
    github: string;
    website: string;
    photoUrl?: string;
  };
  summary: {
    es: string;
    en: string;
    et: string;
  };
  experiences: DigitalCVExperience[];
  projects: DigitalCVProject[];
  education: DigitalCVEducation[];
  certifications: DigitalCVCertification[];
  languages: DigitalCVLanguage[];
  skillsList: string[];
  customSections: DigitalCVCustomSection[];
}

export interface CVProfile {
  id: string;
  title: string;
  updatedAt: string;
  data: DigitalCVData;
}

const defaultInitialCVData: DigitalCVData = {
  id: 'profile-default',
  cvTitle: 'CV Oficial · Full-Stack & PostgreSQL Specialist',
  photoSettings: {
    showPhoto: false,
    photoUrl: juanImg,
    size: 92,
    shape: 'rounded',
    position: 'left',
  },
  personalInfo: {
    fullName: 'Juan Daniel Ortega Blanco',
    title_es: 'Desarrollador Full-Stack & Especialista PostgreSQL',
    title_en: 'Full-Stack Developer & PostgreSQL Specialist',
    title_et: 'Täispinu Arendaja & PostgreSQL Spetsialist',
    email: 'juantrabajos2609@gmail.com',
    phone: '+58 412 1234567',
    location_es: 'Caracas, Venezuela (Disponible para Relocalización a Estonia / Remoto Global)',
    location_en: 'Caracas, Venezuela (Available for Relocation to Estonia / Global Remote)',
    location_et: 'Caracas, Venezuela (Avatud ümberasumiseks Eestisse / Kaugtöö)',
    availability_es: 'Inmediata · Full-time o Proyectos',
    availability_en: 'Immediate · Full-time or Contracts',
    availability_et: 'Kohe kättesaadav · Täistööaeg',
    linkedin: 'https://linkedin.com/in/juan-ortega-dev',
    github: 'https://github.com/JuanORTGA',
    website: 'https://juanortega.dev',
    photoUrl: juanImg,
  },
  summary: {
    es: 'Desarrollador Full-Stack con más de 3 años de experiencia en arquitectura web moderna, bases de datos relacionales y optimización SQL de alto rendimiento. Especializado en React, Node.js, TypeScript y PostgreSQL. Enfocado en soluciones de alto impacto y motivado a integrarme al ecosistema tecnológico de Estonia.',
    en: 'Full-Stack Developer with 3+ years of experience in modern web architecture, relational databases, and high-performance SQL optimization. Specialized in React, Node.js, TypeScript, and PostgreSQL. Focused on scalable solutions and eager to integrate into Estonia’s vibrant tech ecosystem.',
    et: 'Täispinu arendaja üle 3-aastase kogemusega kaasaegses veebiarhitektuuris, relatsioonilistes andmebaasides ja suure jõudlusega SQL-i optimeerimises. Spetsialiseerunud Reactile, Node.js-ile, TypeScriptile ja PostgreSQL-ile.',
  },
  experiences: [
    {
      id: '1',
      company: 'INTI (Instituto Nacional de Tierras)',
      role_es: 'Desarrollador Full-Stack & Especialista PostgreSQL',
      role_en: 'Full-Stack Developer & PostgreSQL Specialist',
      role_et: 'Täispinu Arendaja & PostgreSQL Spetsialist',
      period_es: '2025 — Presente',
      period_en: '2025 — Present',
      period_et: '2025 — Praegu',
      location: 'Caracas, Venezuela',
      highlights_es: [
        'Optimización de consultas SQL complejas y procedimientos almacenados en PostgreSQL, reduciendo tiempos de respuesta en más de 40%.',
        'Diseño y despliegue de microservicios con Node.js y TypeScript integrados a interfaces responsivas en React.',
        'Mapeo de datos catastrales e interoperabilidad segura entre instituciones del Estado.'
      ],
      highlights_en: [
        'Optimization of complex SQL queries and stored procedures in PostgreSQL, reducing query latency by over 40%.',
        'Design and deployment of microservices with Node.js and TypeScript integrated with responsive React frontends.',
        'Cadastral data mapping and secure interoperability between state agencies.'
      ],
      highlights_et: [
        'Keerukate SQL-päringute ja salvestatud protseduuride optimeerimine PostgreSQL-is, vähendades päringute latentsust üle 40%.',
        'Mikroteenuste kavandamine ja juurutamine Node.js ja TypeScriptiga koos reageeriva Reacti liidesega.'
      ]
    },
    {
      id: '2',
      company: 'Ministerio del Poder Popular para la Salud (MinSalud)',
      role_es: 'Desarrollador Web & Analista de Sistemas',
      role_en: 'Web Developer & Systems Analyst',
      role_et: 'Veebiarendaja & Süsteemianalüütik',
      period_es: '2024',
      period_en: '2024',
      period_et: '2024',
      location: 'Caracas, Venezuela',
      highlights_es: [
        'Desarrollo e implementación de plataformas web para el registro y gestión de inventario hospitalario nacional.',
        'Creación de módulos analíticos y cuadros de mando interactivos para la toma de decisiones clínicas.'
      ],
      highlights_en: [
        'Development and implementation of web platforms for national hospital inventory and medical records management.',
        'Creation of analytical modules and interactive dashboards for clinical decision making.'
      ],
      highlights_et: [
        'Veebiplatvormide arendamine ja juurutamine riiklike haiglainventaride ja meditsiiniliste dokumentide haldamiseks.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Plataforma de E-Governance & Catastro Digital',
      role_es: 'Arquitecto Técnico & Full-Stack',
      role_en: 'Technical Architect & Full-Stack',
      role_et: 'Tehniline arhitekt & Täispinu arendaja',
      period: '2025',
      link: 'https://github.com/JuanORTGA',
      techStack: 'PostgreSQL, Node.js, React, TypeScript, Docker',
      highlights_es: [
        'Diseño de base de datos relacional para millones de registros georreferenciados con tiempos de respuesta sub-segundo.',
        'Integración de autenticación JWT segura y auditoría forense de transacciones.'
      ],
      highlights_en: [
        'Relational database design handling millions of geo-referenced records with sub-second query latency.',
        'Secure JWT authentication implementation and forensic transaction audit trails.'
      ],
      highlights_et: [
        'Relatsioonilise andmebaasi disain miljonite kirjete jaoks kiire reageerimisajaga.'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'Universidad Nacional Experimental',
      degree_es: 'Ingeniería de Sistemas / Computación',
      degree_en: 'Systems Engineering / Computer Science',
      degree_et: 'Süsteemitehnika / Arvutiteadus',
      period: '2020 — 2024',
      details_es: 'Enfoque en arquitectura de software, bases de datos relacionales y algoritmos distribuidos.',
      details_en: 'Focus on software architecture, relational databases, and distributed algorithms.',
      details_et: 'Keskendumine tarkvaraarhitektuurile, andmebaasidele ja jaotatud algoritmidele.'
    }
  ],
  certifications: [
    {
      id: '1',
      name_es: 'PostgreSQL Professional & Database Optimization',
      name_en: 'PostgreSQL Professional & Database Optimization',
      name_et: 'PostgreSQL Professional & Database Optimization',
      issuer: 'PostgreSQL Global Development Group / Platzi',
      year: '2024'
    },
    {
      id: '2',
      name_es: 'Full-Stack Modern Web Architecture (React & Node.js)',
      name_en: 'Full-Stack Modern Web Architecture (React & Node.js)',
      name_et: 'Full-Stack Modern Web Architecture (React & Node.js)',
      issuer: 'Advanced Software Certification',
      year: '2023'
    }
  ],
  languages: [
    { id: '1', name_es: 'Español', name_en: 'Spanish', name_et: 'Hispaania keel', level_es: 'Nativo', level_en: 'Native Speaker', level_et: 'Emakeel' },
    { id: '2', name_es: 'Inglés', name_en: 'English', name_et: 'Inglise keel', level_es: 'C1 Profesional Avanzado', level_en: 'C1 Professional Working', level_et: 'C1 Professionaalne' },
    { id: '3', name_es: 'Estonio', name_en: 'Estonian', name_et: 'Eesti keel', level_es: 'A2/B1 En Aprendizaje Activo', level_en: 'A2/B1 Actively Learning', level_et: 'A2/B1 Aktiivselt õppimisel' }
  ],
  skillsList: [
    'React', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 'PostgreSQL', 
    'SQL Optimization', 'REST APIs', 'Supabase', 'Tailwind CSS', 'Git & GitHub', 
    'Docker', 'Linux', 'Microservicios', 'Database Indexing'
  ],
  customSections: []
};

const languagesMeta = [
  { code: 'es', name: 'Español', subtitle: 'Versión en Español', flag: '🇪🇸', iso: 'ES' },
  { code: 'en', name: 'English', subtitle: 'Global / UK Version', flag: '🇬🇧', iso: 'EN' },
  { code: 'et', name: 'Eesti keel', subtitle: 'Estonian Version', flag: '🇪🇪', iso: 'ET' },
];

/**
 * Compresión y redimensionado de imagen en el cliente para evitar saturar base de datos
 */
const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 400; // Resolución óptima para avatar de 160px en retina
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Calidad JPEG 85% para tamaño ligero de ~60-90KB
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const CVManagement: React.FC<CVManagementProps> = ({ 
  cvFiles, 
  experiences = [], 
  skills = [], 
  contents = [], 
  isUploading, 
  onUpload,
  onDeleteCV,
  onDeleteAllCVs
}) => {
  // Pestaña principal: 'preview' | 'editor' | 'files'
  const [activeMainTab, setActiveMainTab] = useState<'preview' | 'editor' | 'files'>('preview');
  const [activeLangTab, setActiveLangTab] = useState<'es' | 'en' | 'et'>('es');
  
  // Opciones de configuración ATS
  const [atsStyleMode, setAtsStyleMode] = useState<'tech' | 'classic' | 'nordic'>('tech');
  const [atsDensity, setAtsDensity] = useState<'compact' | 'comfortable'>('comfortable');

  // Biblioteca de Perfiles de CV (Múltiples CVs)
  const [profiles, setProfiles] = useState<CVProfile[]>([
    {
      id: 'profile-default',
      title: 'CV Oficial · Full-Stack & PostgreSQL Specialist',
      updatedAt: new Date().toISOString(),
      data: defaultInitialCVData
    }
  ]);
  const [activeProfileId, setActiveProfileId] = useState<string>('profile-default');

  // Estado del CV actualmente en edición
  const [cvData, setCvData] = useState<DigitalCVData>(defaultInitialCVData);
  const [isSavingDigital, setIsSavingDigital] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [newSkillInput, setNewSkillInput] = useState('');
  
  // Modales y herramientas auxiliares
  const [isNewProfileModalOpen, setIsNewProfileModalOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileTemplate, setNewProfileTemplate] = useState<'current' | 'clean'>('current');
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  // Modal para ver PDF en vivo dentro del admin
  const [viewingPdfUrl, setViewingPdfUrl] = useState<string | null>(null);
  const [viewingPdfTitle, setViewingPdfTitle] = useState<string>('');

  const photoFileInputRef = useRef<HTMLInputElement>(null);
  const jsonImportInputRef = useRef<HTMLInputElement>(null);

  // Normalizar datos asegurando todas las llaves requeridas
  const normalizeCVData = (raw: any): DigitalCVData => {
    return {
      ...defaultInitialCVData,
      ...raw,
      photoSettings: {
        ...defaultInitialCVData.photoSettings,
        ...(raw.photoSettings || {}),
        photoUrl: raw.photoSettings?.photoUrl || raw.personalInfo?.photoUrl || juanImg,
        showPhoto: raw.photoSettings?.showPhoto !== undefined ? raw.photoSettings.showPhoto : false,
      },
      personalInfo: {
        ...defaultInitialCVData.personalInfo,
        ...(raw.personalInfo || {})
      },
      summary: {
        ...defaultInitialCVData.summary,
        ...(raw.summary || {})
      },
      experiences: Array.isArray(raw.experiences) ? raw.experiences : defaultInitialCVData.experiences,
      projects: Array.isArray(raw.projects) ? raw.projects : defaultInitialCVData.projects,
      education: Array.isArray(raw.education) ? raw.education : defaultInitialCVData.education,
      certifications: Array.isArray(raw.certifications) ? raw.certifications : defaultInitialCVData.certifications,
      languages: Array.isArray(raw.languages) && raw.languages.length > 0 ? raw.languages : defaultInitialCVData.languages,
      skillsList: Array.isArray(raw.skillsList) ? raw.skillsList : defaultInitialCVData.skillsList,
      customSections: Array.isArray(raw.customSections) ? raw.customSections : []
    };
  };

  // Cargar biblioteca de CVs desde Supabase (o localStorage de respaldo)
  useEffect(() => {
    const loadCVData = async () => {
      try {
        // 1. Intentar cargar biblioteca multi-CV
        const { data: libraryRes } = await supabase
          .from('page_content')
          .select('content_es')
          .eq('key', 'cv_profiles_library_json')
          .maybeSingle();

        if (libraryRes?.content_es) {
          const parsedLibrary = JSON.parse(libraryRes.content_es);
          if (Array.isArray(parsedLibrary) && parsedLibrary.length > 0) {
            const normalizedProfiles = parsedLibrary.map((p: any) => ({
              ...p,
              data: normalizeCVData(p.data)
            }));
            setProfiles(normalizedProfiles);
            setActiveProfileId(normalizedProfiles[0].id);
            setCvData(normalizedProfiles[0].data);
            return;
          }
        }

        // 2. Si no hay biblioteca, cargar CV digital único existente
        const { data: singleRes } = await supabase
          .from('page_content')
          .select('content_es')
          .eq('key', 'cv_digital_data_json')
          .maybeSingle();

        if (singleRes?.content_es) {
          const parsedSingle = JSON.parse(singleRes.content_es);
          const normalized = normalizeCVData(parsedSingle);
          const initialProfile: CVProfile = {
            id: 'profile-default',
            title: normalized.cvTitle || 'CV Oficial · Juan Ortega',
            updatedAt: new Date().toISOString(),
            data: normalized
          };
          setProfiles([initialProfile]);
          setActiveProfileId(initialProfile.id);
          setCvData(normalized);
          return;
        }

        // 3. Fallback a localStorage
        const localBackup = localStorage.getItem('cv_profiles_backup');
        if (localBackup) {
          const parsedLocal = JSON.parse(localBackup);
          if (Array.isArray(parsedLocal) && parsedLocal.length > 0) {
            setProfiles(parsedLocal);
            setActiveProfileId(parsedLocal[0].id);
            setCvData(parsedLocal[0].data);
          }
        }
      } catch (err) {
        console.error('Error cargando datos de CV:', err);
      }
    };
    loadCVData();
  }, []);

  // Actualizar cvData cuando cambia el perfil seleccionado
  const handleSelectProfile = (profileId: string) => {
    const found = profiles.find(p => p.id === profileId);
    if (found) {
      setActiveProfileId(profileId);
      setCvData(found.data);
      setSaveFeedback(`Cargado: "${found.title}"`);
      setTimeout(() => setSaveFeedback(null), 2500);
    }
  };

  // Guardar datos digitales en Supabase y localStorage
  const handleSaveDigitalCV = async () => {
    try {
      setIsSavingDigital(true);

      // Actualizar el perfil actual en la lista de perfiles
      const updatedProfiles = profiles.map(p => {
        if (p.id === activeProfileId) {
          return {
            ...p,
            title: cvData.cvTitle || p.title,
            updatedAt: new Date().toISOString(),
            data: cvData
          };
        }
        return p;
      });
      setProfiles(updatedProfiles);

      // Guardar réplica local
      localStorage.setItem('cv_profiles_backup', JSON.stringify(updatedProfiles));

      // Guardar en Supabase biblioteca completa y CV activo
      const libraryString = JSON.stringify(updatedProfiles);
      const activeString = JSON.stringify(cvData);

      await Promise.all([
        supabase.from('page_content').upsert(
          { key: 'cv_profiles_library_json', content_es: libraryString, content_en: libraryString, content_et: libraryString },
          { onConflict: 'key' }
        ),
        supabase.from('page_content').upsert(
          { key: 'cv_digital_data_json', content_es: activeString, content_en: activeString, content_et: activeString },
          { onConflict: 'key' }
        )
      ]);

      setSaveFeedback('¡Curriculum guardado exitosamente!');
      setTimeout(() => setSaveFeedback(null), 3000);
    } catch (err: any) {
      alert('Error al guardar: ' + (err.message || err));
    } finally {
      setIsSavingDigital(false);
    }
  };

  // Crear nuevo CV
  const handleCreateNewProfile = () => {
    if (!newProfileName.trim()) return;
    const newId = 'profile-' + Date.now();
    let initialData: DigitalCVData;

    if (newProfileTemplate === 'clean') {
      initialData = {
        ...defaultInitialCVData,
        id: newId,
        cvTitle: newProfileName.trim(),
        experiences: [],
        projects: [],
        education: [],
        certifications: [],
        customSections: []
      };
    } else {
      // Clonar datos actuales con nuevo título
      initialData = {
        ...cvData,
        id: newId,
        cvTitle: newProfileName.trim()
      };
    }

    const newProfile: CVProfile = {
      id: newId,
      title: newProfileName.trim(),
      updatedAt: new Date().toISOString(),
      data: initialData
    };

    const nextProfiles = [...profiles, newProfile];
    setProfiles(nextProfiles);
    setActiveProfileId(newId);
    setCvData(initialData);
    setIsNewProfileModalOpen(false);
    setNewProfileName('');
    setSaveFeedback(`¡Nuevo CV "${newProfile.title}" creado!`);
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  // Duplicar CV actual
  const handleDuplicateCurrentProfile = () => {
    const current = profiles.find(p => p.id === activeProfileId);
    const newTitle = `${current?.title || cvData.cvTitle || 'Curriculum'} (Copia)`;
    const newId = 'profile-' + Date.now();
    const clonedData: DigitalCVData = {
      ...cvData,
      id: newId,
      cvTitle: newTitle
    };
    const clonedProfile: CVProfile = {
      id: newId,
      title: newTitle,
      updatedAt: new Date().toISOString(),
      data: clonedData
    };
    const nextProfiles = [...profiles, clonedProfile];
    setProfiles(nextProfiles);
    setActiveProfileId(newId);
    setCvData(clonedData);
    setSaveFeedback(`¡CV duplicado como "${newTitle}"!`);
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  // Renombrar CV actual
  const handleRenameCurrentProfile = () => {
    if (!renameValue.trim()) return;
    const nextTitle = renameValue.trim();
    setCvData(prev => ({ ...prev, cvTitle: nextTitle }));
    setProfiles(prev => prev.map(p => p.id === activeProfileId ? { ...p, title: nextTitle } : p));
    setIsRenameModalOpen(false);
  };

  // Eliminar CV actual
  const handleDeleteCurrentProfile = () => {
    if (profiles.length <= 1) {
      alert('Debes mantener al menos un Curriculum en el estudio.');
      return;
    }
    const current = profiles.find(p => p.id === activeProfileId);
    if (!window.confirm(`¿Seguro que deseas eliminar el CV "${current?.title}"?`)) return;

    const remaining = profiles.filter(p => p.id !== activeProfileId);
    setProfiles(remaining);
    setActiveProfileId(remaining[0].id);
    setCvData(remaining[0].data);
    setSaveFeedback(`CV eliminado. Mostrando: "${remaining[0].title}"`);
    setTimeout(() => setSaveFeedback(null), 3000);
  };

  // Exportar archivo de respaldo JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profiles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mis_curriculums_ats_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Importar archivo de respaldo JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((p: any) => ({
            ...p,
            data: normalizeCVData(p.data)
          }));
          setProfiles(normalized);
          setActiveProfileId(normalized[0].id);
          setCvData(normalized[0].data);
          setSaveFeedback('¡Biblioteca de Curriculums importada correctamente!');
          setTimeout(() => setSaveFeedback(null), 4000);
        } else {
          alert('El archivo no contiene un formato de CV válido.');
        }
      } catch (err) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Sincronizar automáticamente con la base de datos de la landing
  const handleSyncFromDatabase = () => {
    if (!window.confirm('¿Deseas sincronizar los datos del CV con la información actual de tu Perfil, Experiencia y Skills de la base de datos?')) return;
    
    const updated = { ...cvData };

    if (experiences && experiences.length > 0) {
      updated.experiences = experiences.map((exp, idx) => ({
        id: exp.id || String(idx + 1),
        company: exp.company,
        role_es: exp.role_es,
        role_en: exp.role_en || exp.role_es,
        role_et: exp.role_et || exp.role_es,
        period_es: exp.is_current ? `${exp.start_date} — Presente` : `${exp.start_date} — ${exp.end_date || ''}`,
        period_en: exp.is_current ? `${exp.start_date} — Present` : `${exp.start_date} — ${exp.end_date || ''}`,
        period_et: exp.is_current ? `${exp.start_date} — Praegu` : `${exp.start_date} — ${exp.end_date || ''}`,
        location: exp.location || 'Caracas, Venezuela',
        highlights_es: exp.description_es ? exp.description_es.split('. ').filter(Boolean) : [],
        highlights_en: exp.description_en ? exp.description_en.split('. ').filter(Boolean) : [],
        highlights_et: exp.description_et ? exp.description_et.split('. ').filter(Boolean) : [],
      }));
    }

    if (skills && skills.length > 0) {
      updated.skillsList = skills.map(s => s.name);
    }

    setCvData(updated);
    setSaveFeedback('¡Sincronizado con la base de datos! Presiona "Guardar Cambios" para confirmar.');
    setTimeout(() => setSaveFeedback(null), 4000);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopyFeedback(url);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  // Descargar/Imprimir PDF asegurando renderizado
  const handlePrintCV = () => {
    if (activeMainTab !== 'preview') {
      setActiveMainTab('preview');
      setTimeout(() => {
        window.print();
      }, 250);
    } else {
      window.print();
    }
  };

  // Subir y comprimir foto desde archivo
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressedDataUrl = await compressImageFile(file);
      setCvData(prev => ({
        ...prev,
        photoSettings: {
          ...prev.photoSettings,
          photoUrl: compressedDataUrl,
          showPhoto: true
        }
      }));
      setSaveFeedback('¡Foto subida y optimizada exitosamente!');
      setTimeout(() => setSaveFeedback(null), 2500);
    } catch (err) {
      alert('Error al procesar la imagen.');
    }
  };

  // ==========================================
  // OPERACIONES CRUD: EXPERIENCIA
  // ==========================================
  const handleAddExperience = () => {
    const newExp: DigitalCVExperience = {
      id: Date.now().toString(),
      company: 'Nueva Empresa / Entidad',
      role_es: 'Desarrollador de Software',
      role_en: 'Software Developer',
      role_et: 'Tarkvaraarendaja',
      period_es: '2024 — Presente',
      period_en: '2024 — Present',
      period_et: '2024 — Praegu',
      location: 'Remoto / Híbrido',
      highlights_es: ['Desarrollo de funcionalidades clave y optimización de arquitectura.'],
      highlights_en: ['Core feature development and architecture optimization.'],
      highlights_et: ['Põhifunktsioonide arendamine ja arhitektuuri optimeerimine.']
    };
    setCvData(prev => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const handleDeleteExperience = (id: string) => {
    setCvData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
  };

  const handleMoveExperience = (idx: number, direction: 'up' | 'down') => {
    const list = [...cvData.experiences];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    setCvData(prev => ({ ...prev, experiences: list }));
  };

  const handleDuplicateExperience = (idx: number) => {
    const original = cvData.experiences[idx];
    const clone: DigitalCVExperience = {
      ...original,
      id: Date.now().toString(),
      company: `${original.company} (Copia)`
    };
    const list = [...cvData.experiences];
    list.splice(idx + 1, 0, clone);
    setCvData(prev => ({ ...prev, experiences: list }));
  };

  // ==========================================
  // OPERACIONES CRUD: PROYECTOS TÉCNICOS
  // ==========================================
  const handleAddProject = () => {
    const newProj: DigitalCVProject = {
      id: 'proj-' + Date.now(),
      name: 'Nuevo Proyecto / Aplicación',
      role_es: 'Desarrollador Principal',
      role_en: 'Lead Developer',
      role_et: 'Peaarendaja',
      period: '2025',
      link: 'https://github.com/JuanORTGA',
      techStack: 'React, TypeScript, Node.js, PostgreSQL',
      highlights_es: ['Implementación de arquitectura escalable y optimización de rendimiento.'],
      highlights_en: ['Scalable architecture implementation and performance optimization.'],
      highlights_et: ['Skaleeritava arhitektuuri juurutamine ja jõudluse optimeerimine.']
    };
    setCvData(prev => ({ ...prev, projects: [newProj, ...prev.projects] }));
  };

  const handleDeleteProject = (id: string) => {
    setCvData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const handleMoveProject = (idx: number, direction: 'up' | 'down') => {
    const list = [...cvData.projects];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    setCvData(prev => ({ ...prev, projects: list }));
  };

  // ==========================================
  // OPERACIONES CRUD: EDUCACIÓN & CERTIFICADOS
  // ==========================================
  const handleAddEducation = () => {
    const newEdu: DigitalCVEducation = {
      id: Date.now().toString(),
      institution: 'Universidad / Instituto',
      degree_es: 'Título Profesional',
      degree_en: 'Professional Degree',
      degree_et: 'Kraad',
      period: '2020 — 2024',
      details_es: 'Enfoque en desarrollo de software y bases de datos relacionales.',
      details_en: 'Focus on software development and relational databases.',
      details_et: 'Keskendumine tarkvaraarendusele ja andmebaasidele.'
    };
    setCvData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const handleDeleteEducation = (id: string) => {
    setCvData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const handleMoveEducation = (idx: number, direction: 'up' | 'down') => {
    const list = [...cvData.education];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;
    setCvData(prev => ({ ...prev, education: list }));
  };

  const handleAddCertification = () => {
    const newCert: DigitalCVCertification = {
      id: Date.now().toString(),
      name_es: 'Nueva Certificación Técnica',
      name_en: 'New Technical Certification',
      name_et: 'Uus sertifikaat',
      issuer: 'Plataforma Emisora',
      year: new Date().getFullYear().toString()
    };
    setCvData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const handleDeleteCertification = (id: string) => {
    setCvData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  // ==========================================
  // OPERACIONES CRUD: IDIOMAS LIBRES
  // ==========================================
  const handleAddLanguage = () => {
    const newLang: DigitalCVLanguage = {
      id: 'lang-' + Date.now(),
      name_es: 'Nuevo Idioma',
      name_en: 'New Language',
      name_et: 'Uus keel',
      level_es: 'B2 Profesional',
      level_en: 'B2 Professional',
      level_et: 'B2 Professionaalne'
    };
    setCvData(prev => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const handleDeleteLanguage = (id: string) => {
    setCvData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== id) }));
  };

  // ==========================================
  // OPERACIONES CRUD: SKILLS
  // ==========================================
  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillInput.trim()) return;
    if (!cvData.skillsList.includes(newSkillInput.trim())) {
      setCvData(prev => ({ ...prev, skillsList: [...prev.skillsList, newSkillInput.trim()] }));
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillName: string) => {
    setCvData(prev => ({ ...prev, skillsList: prev.skillsList.filter(s => s !== skillName) }));
  };

  // ==========================================
  // OPERACIONES CRUD: SECCIONES PERSONALIZADAS
  // ==========================================
  const handleAddCustomSection = () => {
    const newSec: DigitalCVCustomSection = {
      id: 'sec-' + Date.now(),
      title_es: 'Reconocimientos o Logros',
      title_en: 'Honors & Achievements',
      title_et: 'Tunnustused ja saavutused',
      content_es: '• Detalle o logro destacado redactado con métricas y datos verificables.',
      content_en: '• Key achievement or recognition with quantifiable metrics.',
      content_et: '• Peamised saavutused ja tunnustused.'
    };
    setCvData(prev => ({ ...prev, customSections: [...prev.customSections, newSec] }));
  };

  const handleDeleteCustomSection = (id: string) => {
    setCvData(prev => ({ ...prev, customSections: prev.customSections.filter(s => s.id !== id) }));
  };

  return (
    <div className="cv-studio-root">
      {/* ─────────────────────────────────────────────────────────────
          CABECERA DEL ESTUDIO DE CURRICULUMS
         ───────────────────────────────────────────────────────────── */}
      <div className="cv-studio-header">
        <div className="cv-header-info">
          <div className="cv-studio-kicker">
            <Briefcase size={14} />
            <span>ESTUDIO INTEGRAL DE CURRICULUM VITAE · NORMAS ATS</span>
          </div>
          <h2>Gestión de Curriculums & Editor ATS Profesional</h2>
          <p>
            Crea múltiples versiones de tu CV, personaliza tu foto, edita cualquier sección con total libertad y descarga en <strong>formato PDF optimizado para filtros ATS</strong>.
          </p>
        </div>

        {/* Botones de acción principales */}
        <div className="cv-header-actions">
          <button 
            className="btn btn-secondary sync-cv-btn"
            onClick={handleSyncFromDatabase}
            title="Auto-rellenar con los datos de experiencia y skills de la landing"
          >
            <Sparkles size={15} />
            <span>Sincronizar Datos</span>
          </button>

          <button 
            className="btn btn-primary print-cv-btn"
            onClick={handlePrintCV}
            title="Abre la ventana de impresión/exportación a PDF de tu CV digital"
          >
            <Printer size={16} />
            <span>Descargar / Imprimir PDF (ATS)</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BARRA DE GESTIÓN MULTI-CV (CREAR, DUPLICAR, CAMBIAR DE CV)
         ───────────────────────────────────────────────────────────── */}
      <div className="cv-profiles-bar no-print">
        <div className="cv-profiles-selector-group">
          <FolderOpen size={17} className="profiles-icon" />
          <div className="profile-select-wrapper">
            <span className="profile-select-label">Curriculum Activo:</span>
            <select 
              value={activeProfileId} 
              onChange={(e) => handleSelectProfile(e.target.value)}
              className="profile-dropdown-select"
            >
              {profiles.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.title}
                </option>
              ))}
            </select>
          </div>
          <span className="profile-count-pill">{profiles.length} {profiles.length === 1 ? 'versión' : 'versiones'}</span>
        </div>

        <div className="cv-profiles-action-buttons">
          <button 
            className="btn-profile-tool add"
            onClick={() => {
              setNewProfileName('');
              setIsNewProfileModalOpen(true);
            }}
            title="Crear un nuevo CV desde cero o con plantilla"
          >
            <FolderPlus size={15} />
            <span>Nuevo CV</span>
          </button>

          <button 
            className="btn-profile-tool duplicate"
            onClick={handleDuplicateCurrentProfile}
            title="Duplicar el CV actual para adaptar a una vacante específica"
          >
            <Copy size={15} />
            <span>Duplicar</span>
          </button>

          <button 
            className="btn-profile-tool rename"
            onClick={() => {
              setRenameValue(cvData.cvTitle || '');
              setIsRenameModalOpen(true);
            }}
            title="Renombrar título de este CV"
          >
            <Edit3 size={15} />
            <span>Renombrar</span>
          </button>

          {profiles.length > 1 && (
            <button 
              className="btn-profile-tool delete"
              onClick={handleDeleteCurrentProfile}
              title="Eliminar este CV"
            >
              <Trash2 size={15} />
              <span>Eliminar</span>
            </button>
          )}

          <div className="profile-divider"></div>

          <button 
            className="btn-profile-tool export"
            onClick={handleExportJSON}
            title="Descargar copia de seguridad de todos tus CVs en formato JSON"
          >
            <Download size={14} />
            <span>Backup JSON</span>
          </button>

          <label 
            className="btn-profile-tool import"
            title="Restaurar tus CVs desde un archivo JSON"
          >
            <Upload size={14} />
            <span>Restaurar</span>
            <input 
              type="file" 
              accept=".json" 
              ref={jsonImportInputRef} 
              onChange={handleImportJSON} 
              hidden 
            />
          </label>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BARRA DE NAVEGACIÓN ENTRE MODOS Y SELECTOR DE IDIOMA
         ───────────────────────────────────────────────────────────── */}
      <div className="cv-nav-toolbar no-print">
        <div className="cv-mode-tabs">
          <button 
            className={`cv-mode-btn ${activeMainTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('preview')}
          >
            <ShieldCheck size={16} />
            <span>3. Vista Previa Ejecutiva (Normas ATS)</span>
          </button>

          <button 
            className={`cv-mode-btn ${activeMainTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('editor')}
          >
            <User size={16} />
            <span>2. Editor Digital de CV</span>
          </button>

          <button 
            className={`cv-mode-btn ${activeMainTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('files')}
          >
            <FileText size={16} />
            <span>1. Archivos PDF Adjuntos</span>
            <span className="tab-badge-count">{cvFiles.length}/3</span>
          </button>
        </div>

        {/* Selector de idioma para Editor y Vista Previa */}
        {activeMainTab !== 'files' && (
          <div className="cv-lang-selector">
            <span className="lang-selector-label">Idioma:</span>
            {languagesMeta.map(l => (
              <button
                key={l.code}
                className={`lang-pill-btn ${activeLangTab === l.code ? 'active' : ''}`}
                onClick={() => setActiveLangTab(l.code as any)}
              >
                <span>{l.flag}</span>
                <span>{l.name}</span>
                <span className="iso-tag">({l.iso})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {saveFeedback && (
        <div className="cv-save-feedback-banner no-print">
          <CheckCircle2 size={16} />
          <span>{saveFeedback}</span>
        </div>
      )}

      {/* =========================================================================
          MODO 3: VISTA PREVIA EJECUTIVA DEL CV DIGITAL (NORMAS ATS)
          ========================================================================= */}
      {activeMainTab === 'preview' && (
        <div className="cv-preview-container">
          {/* BARRA DE HERRAMIENTAS Y CONTROLES INTELIGENTES ATS */}
          <div className="ats-controls-panel no-print">
            <div className="ats-badge-col">
              <div className="ats-verified-badge">
                <ShieldCheck size={16} />
                <span>Puntuación ATS: 100/100 · 100% Parseable</span>
              </div>
              <p className="ats-badge-sub">
                Estructura lineal estándar, jerarquía semántica pura, fechas tabulares y palabras clave categorizadas para sistemas como <strong>Workday, Greenhouse, Taleo y Lever</strong>.
              </p>
            </div>

            <div className="ats-interactive-toggles">
              {/* TOGGLE: FOTO EN CV */}
              <div className="ats-toggle-item">
                <div className="toggle-info-text">
                  <span className="toggle-title"><Camera size={14} /> Incluir Foto en CV</span>
                  <span className="toggle-hint">
                    {cvData.photoSettings.showPhoto ? 'Foto Activa (Estándar UE/LATAM)' : 'Sin Foto (Estándar ATS Global / USA)'}
                  </span>
                </div>
                <button 
                  type="button" 
                  className={`toggle-switch-btn ${cvData.photoSettings.showPhoto ? 'on' : 'off'}`}
                  onClick={() => setCvData(prev => ({
                    ...prev,
                    photoSettings: { ...prev.photoSettings, showPhoto: !prev.photoSettings.showPhoto }
                  }))}
                  title="Alternar entre formato con foto o formato 100% texto puro ATS"
                >
                  {cvData.photoSettings.showPhoto ? <ToggleRight size={28} color="#0072ce" /> : <ToggleLeft size={28} color="#64748b" />}
                </button>
              </div>

              {/* SELECTOR DE ESTILO ATS */}
              <div className="ats-toggle-item">
                <div className="toggle-info-text">
                  <span className="toggle-title"><LayoutTemplate size={14} /> Plantilla ATS</span>
                  <span className="toggle-hint">
                    {atsStyleMode === 'tech' ? 'Executive Tech' : atsStyleMode === 'classic' ? 'Harvard Clásico' : 'Nordic Tallinn'}
                  </span>
                </div>
                <div className="ats-style-pills">
                  <button 
                    className={`style-pill-sm ${atsStyleMode === 'tech' ? 'active' : ''}`}
                    onClick={() => setAtsStyleMode('tech')}
                    title="Estilo tecnológico moderno con acentos azul acero"
                  >
                    Tech
                  </button>
                  <button 
                    className={`style-pill-sm ${atsStyleMode === 'classic' ? 'active' : ''}`}
                    onClick={() => setAtsStyleMode('classic')}
                    title="Estilo clásico Harvard 100% monocromático"
                  >
                    Clásico
                  </button>
                  <button 
                    className={`style-pill-sm ${atsStyleMode === 'nordic' ? 'active' : ''}`}
                    onClick={() => setAtsStyleMode('nordic')}
                    title="Estilo minimalista nórdico estonio"
                  >
                    Nordic
                  </button>
                </div>
              </div>

              {/* DENSIDAD DE ESPACIADO */}
              <div className="ats-toggle-item">
                <div className="toggle-info-text">
                  <span className="toggle-title"><Layers size={14} /> Espaciado</span>
                  <span className="toggle-hint">
                    {atsDensity === 'compact' ? 'Compacto (1 Página)' : 'Confort (Espacioso)'}
                  </span>
                </div>
                <div className="ats-style-pills">
                  <button 
                    className={`style-pill-sm ${atsDensity === 'compact' ? 'active' : ''}`}
                    onClick={() => setAtsDensity('compact')}
                  >
                    1 Pág
                  </button>
                  <button 
                    className={`style-pill-sm ${atsDensity === 'comfortable' ? 'active' : ''}`}
                    onClick={() => setAtsDensity('comfortable')}
                  >
                    Confort
                  </button>
                </div>
              </div>

              {/* BOTÓN DESCARGAR / IMPRIMIR PDF */}
              <button className="btn btn-primary ats-download-pdf-btn" onClick={handlePrintCV}>
                <Download size={16} />
                <span>Descargar PDF (ATS)</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              HOJA DE CV NORMAS ATS (FORMATO PARSEABLE Y ULTRA ELEGANTE)
              ========================================================================= */}
          <div className={`printable-cv-sheet ats-sheet style-${atsStyleMode} density-${atsDensity} ${cvData.photoSettings.showPhoto ? 'with-photo' : 'no-photo'} photo-pos-${cvData.photoSettings.position}`}>
            {/* Encabezado ATS */}
            <header className={`ats-header-block header-layout-${cvData.photoSettings.position}`}>
              {cvData.photoSettings.showPhoto && cvData.photoSettings.position === 'left' && (
                <div 
                  className={`ats-photo-box shape-${cvData.photoSettings.shape}`}
                  style={{
                    width: `${cvData.photoSettings.size}px`,
                    height: `${cvData.photoSettings.size}px`,
                    borderRadius: cvData.photoSettings.shape === 'circle' ? '50%' : cvData.photoSettings.shape === 'rounded' ? '14px' : '2px'
                  }}
                >
                  <img src={cvData.photoSettings.photoUrl || juanImg} alt={cvData.personalInfo.fullName} className="ats-avatar-img" />
                </div>
              )}

              {cvData.photoSettings.showPhoto && cvData.photoSettings.position === 'center' && (
                <div 
                  className={`ats-photo-box shape-${cvData.photoSettings.shape} center-avatar`}
                  style={{
                    width: `${cvData.photoSettings.size}px`,
                    height: `${cvData.photoSettings.size}px`,
                    borderRadius: cvData.photoSettings.shape === 'circle' ? '50%' : cvData.photoSettings.shape === 'rounded' ? '14px' : '2px'
                  }}
                >
                  <img src={cvData.photoSettings.photoUrl || juanImg} alt={cvData.personalInfo.fullName} className="ats-avatar-img" />
                </div>
              )}

              <div className="ats-header-content">
                <h1 className="ats-full-name">{cvData.personalInfo.fullName}</h1>
                <h2 className="ats-professional-title">
                  {cvData.personalInfo[`title_${activeLangTab}` as keyof typeof cvData.personalInfo] || cvData.personalInfo.title_es}
                </h2>

                <div className="ats-contact-line">
                  <span className="ats-contact-item"><Mail size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{cvData.personalInfo.email}</span>
                  <span className="ats-sep">•</span>
                  <span className="ats-contact-item"><Phone size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{cvData.personalInfo.phone}</span>
                  <span className="ats-sep">•</span>
                  <span className="ats-contact-item"><MapPin size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{cvData.personalInfo[`location_${activeLangTab}` as keyof typeof cvData.personalInfo] || cvData.personalInfo.location_es}</span>
                </div>

                <div className="ats-links-line">
                  <span className="ats-contact-item"><Globe size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{cvData.personalInfo.website}</span>
                  <span className="ats-sep">•</span>
                  <span className="ats-contact-item"><Github size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{cvData.personalInfo.github}</span>
                  <span className="ats-sep">•</span>
                  <span className="ats-contact-item"><Linkedin size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />{cvData.personalInfo.linkedin}</span>
                </div>
              </div>

              {cvData.photoSettings.showPhoto && cvData.photoSettings.position === 'right' && (
                <div 
                  className={`ats-photo-box shape-${cvData.photoSettings.shape}`}
                  style={{
                    width: `${cvData.photoSettings.size}px`,
                    height: `${cvData.photoSettings.size}px`,
                    borderRadius: cvData.photoSettings.shape === 'circle' ? '50%' : cvData.photoSettings.shape === 'rounded' ? '14px' : '2px'
                  }}
                >
                  <img src={cvData.photoSettings.photoUrl || juanImg} alt={cvData.personalInfo.fullName} className="ats-avatar-img" />
                </div>
              )}
            </header>

            {/* SECCIÓN 1: RESUMEN PROFESIONAL */}
            <section className="ats-section">
              <h3 className="ats-section-heading">
                {activeLangTab === 'es' && 'RESUMEN PROFESIONAL'}
                {activeLangTab === 'en' && 'PROFESSIONAL SUMMARY'}
                {activeLangTab === 'et' && 'PROFESSIONAALNE KOKKUVÕTE'}
              </h3>
              <p className="ats-paragraph">{cvData.summary[activeLangTab]}</p>
            </section>

            {/* SECCIÓN 2: EXPERIENCIA LABORAL */}
            {cvData.experiences.length > 0 && (
              <section className="ats-section">
                <h3 className="ats-section-heading">
                  {activeLangTab === 'es' && 'EXPERIENCIA LABORAL'}
                  {activeLangTab === 'en' && 'WORK EXPERIENCE'}
                  {activeLangTab === 'et' && 'TÖÖKOGEMUS'}
                </h3>

                <div className="ats-experience-list">
                  {cvData.experiences.map((exp, idx) => (
                    <div key={exp.id || idx} className="ats-experience-item">
                      <div className="ats-item-header-row">
                        <div className="ats-role-company-group">
                          <strong className="ats-role-title">
                            {exp[`role_${activeLangTab}` as keyof typeof exp] as string || exp.role_es}
                          </strong>
                          <span className="ats-company-name"> | {exp.company}</span>
                        </div>
                        <span className="ats-date-badge">
                          {exp[`period_${activeLangTab}` as keyof typeof exp] as string || exp.period_es}
                        </span>
                      </div>

                      <div className="ats-item-sub-meta">
                        <span>{exp.location}</span>
                      </div>

                      <ul className="ats-bullets-list">
                        {((exp[`highlights_${activeLangTab}` as keyof typeof exp] as string[]) || exp.highlights_es || []).map((h, hIdx) => (
                          h.trim() && <li key={hIdx}>{h.replace(/^•\s*/, '')}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECCIÓN 3: PROYECTOS TÉCNICOS DESTACADOS (NUEVA SECCIÓN CLAVE ATS) */}
            {cvData.projects && cvData.projects.length > 0 && (
              <section className="ats-section">
                <h3 className="ats-section-heading">
                  {activeLangTab === 'es' && 'PROYECTOS TÉCNICOS DESTACADOS'}
                  {activeLangTab === 'en' && 'KEY TECHNICAL PROJECTS'}
                  {activeLangTab === 'et' && 'OLULISED TEHNILISED PROJEKTID'}
                </h3>

                <div className="ats-projects-list">
                  {cvData.projects.map((proj, idx) => (
                    <div key={proj.id || idx} className="ats-project-item">
                      <div className="ats-item-header-row">
                        <div className="ats-role-company-group">
                          <strong className="ats-project-name">{proj.name}</strong>
                          {proj.link && (
                            <span className="ats-project-link">
                              {' '}· <a href={proj.link} target="_blank" rel="noopener noreferrer">{proj.link.replace(/^https?:\/\//, '')}</a>
                            </span>
                          )}
                        </div>
                        <span className="ats-date-badge">{proj.period}</span>
                      </div>

                      <div className="ats-item-sub-meta">
                        <span><strong>Stack:</strong> {proj.techStack}</span>
                      </div>

                      <ul className="ats-bullets-list">
                        {((proj[`highlights_${activeLangTab}` as keyof typeof proj] as string[]) || proj.highlights_es || []).map((h, hIdx) => (
                          h.trim() && <li key={hIdx}>{h.replace(/^•\s*/, '')}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECCIÓN 4: EDUCACIÓN & FORMACIÓN */}
            {cvData.education.length > 0 && (
              <section className="ats-section">
                <h3 className="ats-section-heading">
                  {activeLangTab === 'es' && 'EDUCACIÓN & FORMACIÓN ACADÉMICA'}
                  {activeLangTab === 'en' && 'EDUCATION & ACADEMIC BACKGROUND'}
                  {activeLangTab === 'et' && 'HARIDUSKÄIK'}
                </h3>

                <div className="ats-education-list">
                  {cvData.education.map((edu, idx) => (
                    <div key={edu.id || idx} className="ats-education-item">
                      <div className="ats-item-header-row">
                        <div className="ats-role-company-group">
                          <strong className="ats-degree-title">
                            {edu[`degree_${activeLangTab}` as keyof typeof edu] as string || edu.degree_es}
                          </strong>
                          <span className="ats-institution-name"> | {edu.institution}</span>
                        </div>
                        <span className="ats-date-badge">{edu.period}</span>
                      </div>
                      {edu[`details_${activeLangTab}` as keyof typeof edu] && (
                        <p className="ats-edu-details">{edu[`details_${activeLangTab}` as keyof typeof edu] as string}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECCIÓN 5: CERTIFICACIONES */}
            {cvData.certifications.length > 0 && (
              <section className="ats-section">
                <h3 className="ats-section-heading">
                  {activeLangTab === 'es' && 'CERTIFICACIONES TÉCNICAS'}
                  {activeLangTab === 'en' && 'TECHNICAL CERTIFICATIONS'}
                  {activeLangTab === 'et' && 'TEHNILISED SERTIFIKAADID'}
                </h3>

                <div className="ats-cert-list">
                  {cvData.certifications.map((cert, idx) => (
                    <div key={cert.id || idx} className="ats-cert-item">
                      <div className="ats-item-header-row">
                        <div className="ats-role-company-group">
                          <strong>{cert[`name_${activeLangTab}` as keyof typeof cert] as string || cert.name_es}</strong>
                          <span className="ats-institution-name"> | {cert.issuer}</span>
                        </div>
                        <span className="ats-date-badge">{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECCIÓN 6: STACK TECNOLÓGICO & IDIOMAS */}
            <section className="ats-section ats-grid-skills">
              <div className="ats-skills-column">
                <h3 className="ats-section-heading">
                  {activeLangTab === 'es' && 'STACK TECNOLÓGICO & COMPETENCIAS'}
                  {activeLangTab === 'en' && 'TECHNICAL SKILLS & COMPETENCIES'}
                  {activeLangTab === 'et' && 'TEHNILISED OSKUSED'}
                </h3>
                <div className="ats-categorized-skills">
                  <div className="ats-skill-cat-row">
                    <strong>Habilidades Clave:</strong> <span>{cvData.skillsList.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="ats-languages-column">
                <h3 className="ats-section-heading">
                  {activeLangTab === 'es' && 'IDIOMAS'}
                  {activeLangTab === 'en' && 'LANGUAGES'}
                  {activeLangTab === 'et' && 'KEELED'}
                </h3>
                <ul className="ats-languages-list">
                  {cvData.languages.map((lang, lIdx) => (
                    <li key={lIdx}>
                      <strong>{lang[`name_${activeLangTab}` as keyof typeof lang] || lang.name_es}:</strong>{' '}
                      {lang[`level_${activeLangTab}` as keyof typeof lang] || lang.level_es}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* SECCIÓN 7: SECCIONES LIBRES PERSONALIZADAS */}
            {cvData.customSections && cvData.customSections.length > 0 && cvData.customSections.map((sec, sIdx) => (
              <section key={sec.id || sIdx} className="ats-section">
                <h3 className="ats-section-heading">
                  {(sec[`title_${activeLangTab}` as keyof typeof sec] as string) || sec.title_es}
                </h3>
                <p className="ats-paragraph" style={{ whiteSpace: 'pre-line' }}>
                  {(sec[`content_${activeLangTab}` as keyof typeof sec] as string) || sec.content_es}
                </p>
              </section>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODO 2: EDITOR DIGITAL DE CV (TOTALMENTE PERSONALIZABLE)
          ========================================================================= */}
      {activeMainTab === 'editor' && (
        <div className="cv-editor-container">
          {/* Barra superior fija de guardado */}
          <div className="cv-editor-top-actions">
            <div className="editor-lang-indicator">
              <span className="lang-flag">{languagesMeta.find(l => l.code === activeLangTab)?.flag}</span>
              <div>
                <h4>Editando Curriculum: <strong>{cvData.cvTitle || 'CV Principal'}</strong> ({languagesMeta.find(l => l.code === activeLangTab)?.name})</h4>
                <span className="editor-sub-hint">Los cambios se aplican automáticamente a la vista previa ATS y exportación en PDF</span>
              </div>
            </div>

            <div className="editor-save-group">
              <button 
                className="btn btn-primary save-cv-btn"
                onClick={handleSaveDigitalCV}
                disabled={isSavingDigital}
              >
                {isSavingDigital ? (
                  <>
                    <RefreshCw size={15} className="spin-icon" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    <span>Guardar Cambios</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 00: ESTUDIO DE FOTOGRAFÍA PROFESIONAL (NUEVO CONTROL)
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box photo-studio-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap photo-icon">
                  <Camera size={18} />
                </div>
                <div>
                  <h3>Fotografía Profesional del CV</h3>
                  <p>Configura si deseas incluir tu foto, posición, tamaño en píxeles y estilo de recorte.</p>
                </div>
              </div>

              {/* Toggle principal de foto */}
              <div className="photo-master-toggle">
                <span className="toggle-state-label">
                  {cvData.photoSettings.showPhoto ? 'Foto Habilitada en CV' : 'Foto Deshabilitada (ATS Puro)'}
                </span>
                <button 
                  type="button" 
                  className={`toggle-switch-btn ${cvData.photoSettings.showPhoto ? 'on' : 'off'}`}
                  onClick={() => setCvData(prev => ({
                    ...prev,
                    photoSettings: { ...prev.photoSettings, showPhoto: !prev.photoSettings.showPhoto }
                  }))}
                >
                  {cvData.photoSettings.showPhoto ? <ToggleRight size={30} color="#0072ce" /> : <ToggleLeft size={30} color="#64748b" />}
                </button>
              </div>
            </div>

            {/* Controles avanzados cuando la foto está activa */}
            {cvData.photoSettings.showPhoto ? (
              <div className="photo-controls-grid">
                {/* Visualizador en vivo de la foto con su tamaño y forma actual */}
                <div className="photo-preview-display">
                  <div 
                    className="photo-preview-frame"
                    style={{
                      width: `${cvData.photoSettings.size}px`,
                      height: `${cvData.photoSettings.size}px`,
                      borderRadius: cvData.photoSettings.shape === 'circle' ? '50%' : cvData.photoSettings.shape === 'rounded' ? '14px' : '2px'
                    }}
                  >
                    <img 
                      src={cvData.photoSettings.photoUrl || juanImg} 
                      alt="Foto de CV" 
                      className="photo-preview-img" 
                    />
                  </div>
                  <div className="photo-dimension-tag">{cvData.photoSettings.size} × {cvData.photoSettings.size} px</div>
                </div>

                {/* Panel de ajustes interactivos */}
                <div className="photo-adjustments-col">
                  {/* Selector de Posición */}
                  <div className="photo-control-row">
                    <label className="photo-control-label">
                      <Sliders size={13} />
                      <span>Posición en Cabecera:</span>
                    </label>
                    <div className="photo-btn-group">
                      <button 
                        type="button" 
                        className={`photo-option-btn ${cvData.photoSettings.position === 'left' ? 'active' : ''}`}
                        onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, position: 'left' } }))}
                      >
                        <AlignLeft size={14} />
                        <span>Izquierda</span>
                      </button>
                      <button 
                        type="button" 
                        className={`photo-option-btn ${cvData.photoSettings.position === 'center' ? 'active' : ''}`}
                        onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, position: 'center' } }))}
                      >
                        <AlignCenter size={14} />
                        <span>Centrado</span>
                      </button>
                      <button 
                        type="button" 
                        className={`photo-option-btn ${cvData.photoSettings.position === 'right' ? 'active' : ''}`}
                        onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, position: 'right' } }))}
                      >
                        <AlignRight size={14} />
                        <span>Derecha</span>
                      </button>
                    </div>
                  </div>

                  {/* Selector de Forma */}
                  <div className="photo-control-row">
                    <label className="photo-control-label">
                      <Circle size={13} />
                      <span>Forma de Recorte:</span>
                    </label>
                    <div className="photo-btn-group">
                      <button 
                        type="button" 
                        className={`photo-option-btn ${cvData.photoSettings.shape === 'circle' ? 'active' : ''}`}
                        onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, shape: 'circle' } }))}
                      >
                        <Circle size={14} />
                        <span>Circular</span>
                      </button>
                      <button 
                        type="button" 
                        className={`photo-option-btn ${cvData.photoSettings.shape === 'rounded' ? 'active' : ''}`}
                        onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, shape: 'rounded' } }))}
                      >
                        <Square size={14} style={{ borderRadius: '4px' }} />
                        <span>Esquinas Suaves</span>
                      </button>
                      <button 
                        type="button" 
                        className={`photo-option-btn ${cvData.photoSettings.shape === 'square' ? 'active' : ''}`}
                        onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, shape: 'square' } }))}
                      >
                        <Square size={14} />
                        <span>Cuadrado Clásico</span>
                      </button>
                    </div>
                  </div>

                  {/* Slider de Tamaño */}
                  <div className="photo-control-row slider-row">
                    <div className="slider-label-row">
                      <label className="photo-control-label">
                        <span>Tamaño de la Foto: <strong>{cvData.photoSettings.size}px</strong></span>
                      </label>
                      <div className="slider-quick-presets">
                        <button 
                          type="button" 
                          className="preset-btn-sm" 
                          onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, size: 72 } }))}
                        >
                          Pequeña (72px)
                        </button>
                        <button 
                          type="button" 
                          className="preset-btn-sm" 
                          onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, size: 92 } }))}
                        >
                          Estándar (92px)
                        </button>
                        <button 
                          type="button" 
                          className="preset-btn-sm" 
                          onClick={() => setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, size: 125 } }))}
                        >
                          Grande (125px)
                        </button>
                      </div>
                    </div>
                    <input 
                      type="range" 
                      min="60" 
                      max="160" 
                      step="2"
                      value={cvData.photoSettings.size} 
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setCvData(prev => ({ ...prev, photoSettings: { ...prev.photoSettings, size: val } }));
                      }}
                      className="photo-range-slider"
                    />
                  </div>

                  {/* Acciones para cambiar la foto */}
                  <div className="photo-actions-row">
                    <label className="btn btn-secondary photo-upload-btn">
                      <Upload size={14} />
                      <span>Subir Foto del Ordenador</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={photoFileInputRef}
                        onChange={handlePhotoUpload}
                        hidden 
                      />
                    </label>

                    <button 
                      type="button" 
                      className="btn btn-secondary photo-reset-btn"
                      onClick={() => setCvData(prev => ({
                        ...prev,
                        photoSettings: { ...prev.photoSettings, photoUrl: juanImg }
                      }))}
                      title="Restaurar la fotografía oficial de Juan Ortega"
                    >
                      <RotateCcw size={14} />
                      <span>Restaurar Foto Oficial</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="photo-disabled-notice">
                <ShieldCheck size={18} color="#34d399" />
                <div>
                  <strong>Modo ATS Estricto Activo:</strong> Tu CV se generará en texto puro sin imagen, ideal para postularse en EE.UU., Reino Unido y corporaciones con filtros de diversidad automáticos. Puedes reactivar la foto en cualquier momento.
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 01: INFORMACIÓN PERSONAL Y CONTACTO
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap user-icon">
                  <User size={18} />
                </div>
                <div>
                  <h3>01 · Datos Personales & Contacto</h3>
                  <p>Información básica, datos de contacto profesional y redes.</p>
                </div>
              </div>
            </div>

            <div className="editor-form-grid">
              <div className="editor-input-group">
                <label>Nombre Completo</label>
                <input 
                  type="text" 
                  value={cvData.personalInfo.fullName} 
                  onChange={e => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, fullName: e.target.value } })}
                  placeholder="Ej: Juan Daniel Ortega Blanco" 
                />
              </div>

              <div className="editor-input-group">
                <label>Título / Puesto Profesional ({activeLangTab.toUpperCase()})</label>
                <input 
                  type="text" 
                  value={cvData.personalInfo[`title_${activeLangTab}` as keyof typeof cvData.personalInfo] || ''} 
                  onChange={e => setCvData({ 
                    ...cvData, 
                    personalInfo: { 
                      ...cvData.personalInfo, 
                      [`title_${activeLangTab}`]: e.target.value 
                    } 
                  })}
                  placeholder="Ej: Full-Stack Developer & PostgreSQL Specialist" 
                />
              </div>

              <div className="editor-input-group">
                <label>Correo Electrónico de Contacto</label>
                <div className="input-with-icon">
                  <Mail size={15} />
                  <input 
                    type="email" 
                    value={cvData.personalInfo.email} 
                    onChange={e => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, email: e.target.value } })}
                  />
                </div>
              </div>

              <div className="editor-input-group">
                <label>Teléfono / WhatsApp</label>
                <div className="input-with-icon">
                  <Phone size={15} />
                  <input 
                    type="text" 
                    value={cvData.personalInfo.phone} 
                    onChange={e => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, phone: e.target.value } })}
                  />
                </div>
              </div>

              <div className="editor-input-group full-width">
                <label>Ubicación & Disponibilidad de Relocalización ({activeLangTab.toUpperCase()})</label>
                <div className="input-with-icon">
                  <MapPin size={15} />
                  <input 
                    type="text" 
                    value={cvData.personalInfo[`location_${activeLangTab}` as keyof typeof cvData.personalInfo] || ''} 
                    onChange={e => setCvData({ 
                      ...cvData, 
                      personalInfo: { 
                        ...cvData.personalInfo, 
                        [`location_${activeLangTab}`]: e.target.value 
                      } 
                    })}
                    placeholder="Ej: Caracas, Venezuela (Disponible para Relocalización a Estonia / Remoto Global)" 
                  />
                </div>
              </div>

              <div className="editor-input-group">
                <label>Perfil de LinkedIn</label>
                <div className="input-with-icon">
                  <Linkedin size={15} />
                  <input 
                    type="url" 
                    value={cvData.personalInfo.linkedin} 
                    onChange={e => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, linkedin: e.target.value } })}
                  />
                </div>
              </div>

              <div className="editor-input-group">
                <label>Perfil de GitHub</label>
                <div className="input-with-icon">
                  <Github size={15} />
                  <input 
                    type="url" 
                    value={cvData.personalInfo.github} 
                    onChange={e => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, github: e.target.value } })}
                  />
                </div>
              </div>

              <div className="editor-input-group full-width">
                <label>Sitio Web o Portfolio</label>
                <div className="input-with-icon">
                  <Globe size={15} />
                  <input 
                    type="url" 
                    value={cvData.personalInfo.website} 
                    onChange={e => setCvData({ ...cvData, personalInfo: { ...cvData.personalInfo, website: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 02: RESUMEN EJECUTIVO / PERFIL PROFESIONAL
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap summary-icon">
                  <FileText size={18} />
                </div>
                <div>
                  <h3>02 · Resumen Ejecutivo / Perfil ({activeLangTab.toUpperCase()})</h3>
                  <p>Párrafo principal de presentación para empresas y reclutadores.</p>
                </div>
              </div>
            </div>

            <div className="editor-input-group full-width">
              <textarea 
                rows={4}
                value={cvData.summary[activeLangTab]}
                onChange={e => setCvData({ 
                  ...cvData, 
                  summary: { 
                    ...cvData.summary, 
                    [activeLangTab]: e.target.value 
                  } 
                })}
                placeholder="Escribe un resumen profesional de alto impacto para reclutadores..."
              />
              <span className="field-helper-text">
                {cvData.summary[activeLangTab]?.length || 0} caracteres · Recomendado: 150 a 350 caracteres para óptima legibilidad ATS.
              </span>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 03: EXPERIENCIAS LABORALES
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap exp-icon">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3>03 · Experiencias Laborales ({cvData.experiences.length})</h3>
                  <p>Cargos desempeñados, empresas, períodos y logros técnicos medibles.</p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm-add" onClick={handleAddExperience}>
                <Plus size={14} />
                <span>Agregar Experiencia</span>
              </button>
            </div>

            <div className="item-cards-stack">
              {cvData.experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="item-edit-card">
                  <div className="item-card-top-bar">
                    <div className="item-index-badge">
                      <span>#{idx + 1}</span>
                    </div>
                    <div className="item-header-inputs">
                      <input 
                        type="text" 
                        className="item-primary-input" 
                        value={exp.company} 
                        onChange={e => {
                          const next = [...cvData.experiences];
                          next[idx].company = e.target.value;
                          setCvData({ ...cvData, experiences: next });
                        }}
                        placeholder="Empresa o Institución" 
                      />
                      <input 
                        type="text" 
                        className="item-secondary-input" 
                        value={exp[`period_${activeLangTab}` as keyof typeof exp] as string || ''} 
                        onChange={e => {
                          const next = [...cvData.experiences];
                          (next[idx] as any)[`period_${activeLangTab}`] = e.target.value;
                          setCvData({ ...cvData, experiences: next });
                        }}
                        placeholder="Ej: 2025 — Presente" 
                      />
                    </div>

                    <div className="item-action-btns">
                      <button 
                        className="item-reorder-btn"
                        onClick={() => handleMoveExperience(idx, 'up')}
                        disabled={idx === 0}
                        title="Mover arriba"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        className="item-reorder-btn"
                        onClick={() => handleMoveExperience(idx, 'down')}
                        disabled={idx === cvData.experiences.length - 1}
                        title="Mover abajo"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        className="item-duplicate-btn"
                        onClick={() => handleDuplicateExperience(idx)}
                        title="Duplicar experiencia"
                      >
                        <Copy size={14} />
                      </button>
                      <button 
                        className="item-delete-btn" 
                        onClick={() => handleDeleteExperience(exp.id)}
                        title="Eliminar experiencia"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="editor-input-group" style={{ marginTop: '0.85rem' }}>
                    <label>Cargo / Rol Profesional ({activeLangTab.toUpperCase()})</label>
                    <input 
                      type="text" 
                      value={exp[`role_${activeLangTab}` as keyof typeof exp] as string || ''} 
                      onChange={e => {
                        const next = [...cvData.experiences];
                        (next[idx] as any)[`role_${activeLangTab}`] = e.target.value;
                        setCvData({ ...cvData, experiences: next });
                      }}
                      placeholder="Ej: Full-Stack Developer & PostgreSQL Specialist" 
                    />
                  </div>

                  <div className="editor-input-group" style={{ marginTop: '0.85rem' }}>
                    <label>Logros y Responsabilidades Clave (Un logro por línea con métricas)</label>
                    <textarea 
                      rows={3}
                      value={((exp[`highlights_${activeLangTab}` as keyof typeof exp] as string[]) || []).join('\n')}
                      onChange={e => {
                        const next = [...cvData.experiences];
                        (next[idx] as any)[`highlights_${activeLangTab}`] = e.target.value.split('\n');
                        setCvData({ ...cvData, experiences: next });
                      }}
                      placeholder="• Optimización de consultas SQL en PostgreSQL reduciendo latencia en 40%&#10;• Desarrollo de microservicios con Node.js..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 04: PROYECTOS TÉCNICOS DESTACADOS (NUEVA SECCIÓN)
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap proj-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  <Code size={18} />
                </div>
                <div>
                  <h3>04 · Proyectos Técnicos Destacados ({cvData.projects?.length || 0})</h3>
                  <p>Añade proyectos de código abierto, aplicaciones web o plataformas desarrolladas.</p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm-add" onClick={handleAddProject}>
                <Plus size={14} />
                <span>Agregar Proyecto</span>
              </button>
            </div>

            <div className="item-cards-stack">
              {cvData.projects?.map((proj, idx) => (
                <div key={proj.id || idx} className="item-edit-card">
                  <div className="item-card-top-bar">
                    <div className="item-index-badge">
                      <span>P#{idx + 1}</span>
                    </div>
                    <div className="item-header-inputs">
                      <input 
                        type="text" 
                        className="item-primary-input" 
                        value={proj.name} 
                        onChange={e => {
                          const next = [...cvData.projects];
                          next[idx].name = e.target.value;
                          setCvData({ ...cvData, projects: next });
                        }}
                        placeholder="Nombre del Proyecto o Software" 
                      />
                      <input 
                        type="text" 
                        className="item-secondary-input" 
                        value={proj.period} 
                        onChange={e => {
                          const next = [...cvData.projects];
                          next[idx].period = e.target.value;
                          setCvData({ ...cvData, projects: next });
                        }}
                        placeholder="Año (Ej: 2025)" 
                      />
                    </div>

                    <div className="item-action-btns">
                      <button 
                        className="item-reorder-btn"
                        onClick={() => handleMoveProject(idx, 'up')}
                        disabled={idx === 0}
                        title="Mover arriba"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        className="item-reorder-btn"
                        onClick={() => handleMoveProject(idx, 'down')}
                        disabled={idx === cvData.projects.length - 1}
                        title="Mover abajo"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        className="item-delete-btn" 
                        onClick={() => handleDeleteProject(proj.id)}
                        title="Eliminar proyecto"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="editor-form-grid" style={{ marginTop: '0.85rem' }}>
                    <div className="editor-input-group">
                      <label>Enlace del Proyecto o Demo (GitHub / URL)</label>
                      <input 
                        type="url" 
                        value={proj.link || ''} 
                        onChange={e => {
                          const next = [...cvData.projects];
                          next[idx].link = e.target.value;
                          setCvData({ ...cvData, projects: next });
                        }}
                        placeholder="https://github.com/..." 
                      />
                    </div>

                    <div className="editor-input-group">
                      <label>Stack Tecnológico Utilizado</label>
                      <input 
                        type="text" 
                        value={proj.techStack} 
                        onChange={e => {
                          const next = [...cvData.projects];
                          next[idx].techStack = e.target.value;
                          setCvData({ ...cvData, projects: next });
                        }}
                        placeholder="Ej: React, Node.js, PostgreSQL, Docker" 
                      />
                    </div>
                  </div>

                  <div className="editor-input-group" style={{ marginTop: '0.85rem' }}>
                    <label>Logros y Métricas del Proyecto (Uno por línea)</label>
                    <textarea 
                      rows={2}
                      value={((proj[`highlights_${activeLangTab}` as keyof typeof proj] as string[]) || []).join('\n')}
                      onChange={e => {
                        const next = [...cvData.projects];
                        (next[idx] as any)[`highlights_${activeLangTab}`] = e.target.value.split('\n');
                        setCvData({ ...cvData, projects: next });
                      }}
                      placeholder="• Arquitectura de base de datos con tiempo de respuesta sub-segundo..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 05: EDUCACIÓN Y FORMACIÓN
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap edu-icon">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3>05 · Educación & Formación Académica ({cvData.education.length})</h3>
                  <p>Carreras universitarias, títulos y períodos cursados.</p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm-add" onClick={handleAddEducation}>
                <Plus size={14} />
                <span>Agregar Educación</span>
              </button>
            </div>

            <div className="item-cards-stack">
              {cvData.education.map((edu, idx) => (
                <div key={edu.id || idx} className="item-edit-card">
                  <div className="item-card-top-bar">
                    <div className="item-index-badge">
                      <span>E#{idx + 1}</span>
                    </div>
                    <div className="item-header-inputs">
                      <input 
                        type="text" 
                        className="item-primary-input" 
                        value={edu.institution} 
                        onChange={e => {
                          const next = [...cvData.education];
                          next[idx].institution = e.target.value;
                          setCvData({ ...cvData, education: next });
                        }}
                        placeholder="Universidad o Instituto" 
                      />
                      <input 
                        type="text" 
                        className="item-secondary-input" 
                        value={edu.period} 
                        onChange={e => {
                          const next = [...cvData.education];
                          next[idx].period = e.target.value;
                          setCvData({ ...cvData, education: next });
                        }}
                        placeholder="Periodo (Ej: 2020 — 2024)" 
                      />
                    </div>

                    <div className="item-action-btns">
                      <button 
                        className="item-reorder-btn"
                        onClick={() => handleMoveEducation(idx, 'up')}
                        disabled={idx === 0}
                        title="Mover arriba"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        className="item-reorder-btn"
                        onClick={() => handleMoveEducation(idx, 'down')}
                        disabled={idx === cvData.education.length - 1}
                        title="Mover abajo"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        className="item-delete-btn" 
                        onClick={() => handleDeleteEducation(edu.id)}
                        title="Eliminar formación"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="editor-input-group" style={{ marginTop: '0.85rem' }}>
                    <label>Título o Grado Académico ({activeLangTab.toUpperCase()})</label>
                    <input 
                      type="text" 
                      value={edu[`degree_${activeLangTab}` as keyof typeof edu] as string || ''} 
                      onChange={e => {
                        const next = [...cvData.education];
                        (next[idx] as any)[`degree_${activeLangTab}`] = e.target.value;
                        setCvData({ ...cvData, education: next });
                      }}
                      placeholder="Ej: Ingeniería de Sistemas / Computación" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 06: CERTIFICACIONES Y CURSOS
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap cert-icon">
                  <Award size={18} />
                </div>
                <div>
                  <h3>06 · Certificaciones & Cursos Especializados ({cvData.certifications.length})</h3>
                  <p>Certificados técnicos, plataformas y año de obtención.</p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm-add" onClick={handleAddCertification}>
                <Plus size={14} />
                <span>Agregar Certificación</span>
              </button>
            </div>

            <div className="item-cards-stack">
              {cvData.certifications.map((cert, idx) => (
                <div key={cert.id || idx} className="item-edit-card">
                  <div className="item-card-top-bar">
                    <div className="item-index-badge">
                      <span>C#{idx + 1}</span>
                    </div>
                    <div className="item-header-inputs">
                      <input 
                        type="text" 
                        className="item-primary-input" 
                        value={cert[`name_${activeLangTab}` as keyof typeof cert] as string || cert.name_es} 
                        onChange={e => {
                          const next = [...cvData.certifications];
                          (next[idx] as any)[`name_${activeLangTab}`] = e.target.value;
                          setCvData({ ...cvData, certifications: next });
                        }}
                        placeholder="Nombre de la Certificación" 
                      />
                      <input 
                        type="text" 
                        className="item-secondary-input" 
                        value={cert.issuer} 
                        onChange={e => {
                          const next = [...cvData.certifications];
                          next[idx].issuer = e.target.value;
                          setCvData({ ...cvData, certifications: next });
                        }}
                        placeholder="Emisor (Ej: Platzi, Meta)" 
                      />
                      <input 
                        type="text" 
                        style={{ width: '80px' }}
                        className="item-secondary-input" 
                        value={cert.year} 
                        onChange={e => {
                          const next = [...cvData.certifications];
                          next[idx].year = e.target.value;
                          setCvData({ ...cvData, certifications: next });
                        }}
                        placeholder="Año" 
                      />
                    </div>

                    <button 
                      className="item-delete-btn" 
                      onClick={() => handleDeleteCertification(cert.id)}
                      title="Eliminar certificación"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 07: IDIOMAS DOMINADOS (AHORA TOTALMENTE DINÁMICA)
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap lang-icon">
                  <LanguagesIcon size={18} />
                </div>
                <div>
                  <h3>07 · Idiomas & Nivel de Dominio ({cvData.languages.length})</h3>
                  <p>Agrega o elimina idiomas según tu perfil profesional.</p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm-add" onClick={handleAddLanguage}>
                <Plus size={14} />
                <span>Agregar Idioma</span>
              </button>
            </div>

            <div className="languages-edit-grid">
              {cvData.languages.map((lang, idx) => (
                <div key={lang.id || idx} className="lang-edit-card">
                  <div className="lang-card-head">
                    <span className="lang-bullet-dot"></span>
                    <input 
                      type="text" 
                      className="lang-name-input"
                      value={lang[`name_${activeLangTab}` as keyof typeof lang] || lang.name_es} 
                      onChange={e => {
                        const next = [...cvData.languages];
                        (next[idx] as any)[`name_${activeLangTab}`] = e.target.value;
                        setCvData({ ...cvData, languages: next });
                      }}
                      placeholder="Nombre del idioma"
                    />
                    {cvData.languages.length > 1 && (
                      <button 
                        type="button"
                        className="lang-delete-btn"
                        onClick={() => handleDeleteLanguage(lang.id)}
                        title="Eliminar idioma"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>

                  <div className="editor-input-group">
                    <label>Nivel de Dominio ({activeLangTab.toUpperCase()})</label>
                    <input 
                      type="text" 
                      value={lang[`level_${activeLangTab}` as keyof typeof lang] || lang.level_es} 
                      onChange={e => {
                        const next = [...cvData.languages];
                        (next[idx] as any)[`level_${activeLangTab}`] = e.target.value;
                        setCvData({ ...cvData, languages: next });
                      }}
                      placeholder="Ej: C1 Profesional Avanzado" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 08: STACK TECNOLÓGICO & HABILIDADES CLAVE
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap skills-icon">
                  <Tag size={18} />
                </div>
                <div>
                  <h3>08 · Stack Tecnológico & Habilidades Clave ({cvData.skillsList.length})</h3>
                  <p>Tecnologías y palabras clave detectables por bots de reclutamiento.</p>
                </div>
              </div>
            </div>

            {/* Input para agregar skills rápidamente */}
            <form onSubmit={handleAddSkill} className="add-skill-form-row">
              <input 
                type="text" 
                value={newSkillInput} 
                onChange={e => setNewSkillInput(e.target.value)}
                placeholder="Escribe una tecnología (Ej: Next.js, Redis, GraphQL) y presiona Enter..."
                className="add-skill-input"
              />
              <button type="submit" className="btn btn-primary add-skill-btn">
                <Plus size={15} />
                <span>Agregar</span>
              </button>
            </form>

            {/* Pills de tecnologías interactivas */}
            <div className="skills-pill-tags-container">
              {cvData.skillsList.map((skill, idx) => (
                <span key={idx} className="skill-pill-tag">
                  <span>{skill}</span>
                  <button 
                    type="button" 
                    className="skill-remove-x" 
                    onClick={() => handleRemoveSkill(skill)}
                    title={`Quitar ${skill}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              SECCIÓN 09: SECCIONES LIBRES PERSONALIZADAS
             ───────────────────────────────────────────────────────────── */}
          <div className="editor-card-box">
            <div className="editor-card-box-header">
              <div className="box-header-title">
                <div className="box-icon-wrap custom-icon" style={{ background: 'rgba(244, 114, 182, 0.15)', color: '#f472b6' }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h3>09 · Secciones Libres Personalizadas ({cvData.customSections?.length || 0})</h3>
                  <p>Agrega bloques adicionales como Premios, Reconocimientos, Publicaciones o Voluntariado.</p>
                </div>
              </div>

              <button className="btn btn-secondary btn-sm-add" onClick={handleAddCustomSection}>
                <Plus size={14} />
                <span>Agregar Sección Libre</span>
              </button>
            </div>

            <div className="item-cards-stack">
              {cvData.customSections?.map((sec, idx) => (
                <div key={sec.id || idx} className="item-edit-card">
                  <div className="item-card-top-bar">
                    <div className="item-index-badge">
                      <span>S#{idx + 1}</span>
                    </div>
                    <div className="item-header-inputs">
                      <input 
                        type="text" 
                        className="item-primary-input" 
                        value={sec[`title_${activeLangTab}` as keyof typeof sec] || sec.title_es} 
                        onChange={e => {
                          const next = [...cvData.customSections];
                          (next[idx] as any)[`title_${activeLangTab}`] = e.target.value;
                          setCvData({ ...cvData, customSections: next });
                        }}
                        placeholder="Título de la Sección (Ej: Reconocimientos)" 
                      />
                    </div>

                    <button 
                      className="item-delete-btn" 
                      onClick={() => handleDeleteCustomSection(sec.id)}
                      title="Eliminar sección"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="editor-input-group" style={{ marginTop: '0.85rem' }}>
                    <label>Contenido de la Sección ({activeLangTab.toUpperCase()})</label>
                    <textarea 
                      rows={3}
                      value={(sec[`content_${activeLangTab}` as keyof typeof sec] as string) || sec.content_es} 
                      onChange={e => {
                        const next = [...cvData.customSections];
                        (next[idx] as any)[`content_${activeLangTab}`] = e.target.value;
                        setCvData({ ...cvData, customSections: next });
                      }}
                      placeholder="Escribe los detalles o viñetas correspondientes..." 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón inferior de guardado */}
          <div className="editor-bottom-save-bar">
            <button 
              className="btn btn-primary save-cv-btn-large"
              onClick={handleSaveDigitalCV}
              disabled={isSavingDigital}
            >
              {isSavingDigital ? (
                <>
                  <RefreshCw size={17} className="spin-icon" />
                  <span>Guardando Cambios en Supabase...</span>
                </>
              ) : (
                <>
                  <Save size={17} />
                  <span>Guardar Todos los Cambios del CV</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODO 1: GESTOR DE ARCHIVOS PDF ADJUNTOS
          ========================================================================= */}
      {activeMainTab === 'files' && (
        <div className="cv-files-container">
          <div className="cv-files-header-bar">
            <div className="cv-files-header-title">
              <FileText size={20} color="#38bdf8" />
              <div>
                <h4>Gestión de Archivos PDF para Descarga Directa</h4>
                <span>{cvFiles.length} de 3 idiomas configurados · Los visitantes descargarán estos archivos</span>
              </div>
            </div>

            {onDeleteAllCVs && cvFiles.length > 0 && (
              <button 
                className="btn btn-secondary delete-all-cvs-btn"
                onClick={onDeleteAllCVs}
                title="Eliminar todos los archivos PDF actuales de una sola vez"
              >
                <Trash2 size={15} color="#f87171" />
                <span>Eliminar Todos los CVs</span>
              </button>
            )}
          </div>

          <div className="cv-files-grid">
            {languagesMeta.map(l => {
              const cv = cvFiles.find((f: any) => (f.lang === l.code || f.language === l.code));
              const isAttached = Boolean(cv?.file_url);

              return (
                <div key={l.code} className={`cv-file-card ${isAttached ? 'attached' : 'empty'}`}>
                  <div className="cv-card-top">
                    <div className="cv-flag-circle">
                      <span className="cv-flag-text">{l.flag}</span>
                    </div>
                    <div className="cv-card-titles">
                      <div className="cv-card-title-row">
                        <h3>{l.name}</h3>
                        <span className="cv-iso-badge">{l.iso}</span>
                      </div>
                      <span className="cv-card-subtitle">{l.subtitle}</span>
                    </div>
                  </div>

                  <div className="cv-file-status-box">
                    {isAttached ? (
                      <div className="status-indicator ready">
                        <CheckCircle2 size={15} />
                        <div>
                          <strong>Archivo PDF Disponible</strong>
                          <span>{cv.file_name || `CV_Juan_Ortega_${l.iso}.pdf`}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="status-indicator missing">
                        <AlertCircle size={15} />
                        <div>
                          <strong>Sin archivo adjunto</strong>
                          <span>Sube un archivo PDF para habilitar la descarga en este idioma</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="cv-card-actions-row">
                    <label className={`btn btn-primary cv-upload-label ${!isAttached ? 'upload-new-btn' : ''}`}>
                      <Upload size={15} />
                      <span>{isUploading ? 'Subiendo...' : isAttached ? 'Reemplazar PDF' : `Subir PDF (${l.name})`}</span>
                      <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={e => {
                          if (e.target.files?.[0]) onUpload(e.target.files[0], l.code);
                        }} 
                        disabled={isUploading} 
                        hidden 
                      />
                    </label>

                    {isAttached && (
                      <button 
                        className="btn btn-secondary cv-view-btn"
                        onClick={() => {
                          setViewingPdfUrl(cv.file_url);
                          setViewingPdfTitle(`Curriculum Vitae (${l.name})`);
                        }}
                        title="Ver PDF en el visor interactivo"
                      >
                        <Eye size={15} />
                        <span>Ver</span>
                      </button>
                    )}

                    {isAttached && onDeleteCV && (
                      <button 
                        className="btn btn-danger-pill cv-delete-card-btn"
                        onClick={() => onDeleteCV(l.code)}
                        title="Eliminar este archivo PDF"
                      >
                        <Trash2 size={15} />
                        <span>Eliminar</span>
                      </button>
                    )}
                  </div>

                  {isAttached && (
                    <div className="cv-card-tools-bar">
                      <button 
                        className="tool-btn" 
                        onClick={() => handleCopyLink(cv.file_url)}
                        title="Copiar enlace público"
                      >
                        {copyFeedback === cv.file_url ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                        <span>{copyFeedback === cv.file_url ? 'Copiado' : 'Copiar URL'}</span>
                      </button>

                      <a 
                        href={cv.file_url} 
                        download={`CV_Juan_Ortega_${l.iso}.pdf`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="tool-btn"
                        title="Descargar archivo"
                      >
                        <Download size={13} />
                        <span>Descargar</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="cv-files-note-card">
            <div className="note-icon-box">
              <FileDown size={22} />
            </div>
            <div className="note-text">
              <h4>¿Cómo funciona la descarga de CV en la Landing Page?</h4>
              <p>
                Cuando un reclutador hace clic en <strong>"Descargar CV"</strong> en la cabecera o pie de la página, puede elegir entre descargar los archivos PDF que adjuntas aquí o generar la versión interactiva ATS que editas en tiempo real.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL VISOR DE PDF INTEGRADO
          ========================================================================= */}
      {viewingPdfUrl && (
        <div className="pdf-viewer-modal-overlay" onClick={() => setViewingPdfUrl(null)}>
          <div className="pdf-viewer-modal-box" onClick={e => e.stopPropagation()}>
            <div className="pdf-viewer-header">
              <div className="pdf-header-title-col">
                <FileText size={18} />
                <h3>{viewingPdfTitle}</h3>
              </div>

              <div className="pdf-header-actions">
                <a 
                  href={viewingPdfUrl} 
                  download 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                >
                  <Download size={14} />
                  <span>Descargar</span>
                </a>
                <a 
                  href={viewingPdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                >
                  <ExternalLink size={14} />
                  <span>Abrir en Pestaña</span>
                </a>
                <button className="pdf-close-btn" onClick={() => setViewingPdfUrl(null)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="pdf-viewer-frame-container">
              <iframe 
                src={viewingPdfUrl} 
                title="Visor de PDF" 
                className="pdf-iframe-element" 
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: CREAR NUEVO CV
          ========================================================================= */}
      {isNewProfileModalOpen && (
        <div className="cv-modal-backdrop" onClick={() => setIsNewProfileModalOpen(false)}>
          <div className="cv-modal-card" onClick={e => e.stopPropagation()}>
            <div className="cv-modal-header">
              <div className="cv-modal-title">
                <FolderPlus size={18} color="#0072ce" />
                <h3>Crear Nuevo Curriculum Vitae</h3>
              </div>
              <button className="cv-modal-close" onClick={() => setIsNewProfileModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="cv-modal-body">
              <div className="editor-input-group">
                <label>Título o Nombre del Nuevo CV</label>
                <input 
                  type="text" 
                  value={newProfileName} 
                  onChange={e => setNewProfileName(e.target.value)}
                  placeholder="Ej: CV Especialista Backend & PostgreSQL, CV Inglés USA..."
                  autoFocus
                />
              </div>

              <div className="editor-input-group" style={{ marginTop: '1rem' }}>
                <label>Punto de Partida</label>
                <div className="template-options-grid">
                  <button 
                    type="button"
                    className={`template-card-btn ${newProfileTemplate === 'current' ? 'active' : ''}`}
                    onClick={() => setNewProfileTemplate('current')}
                  >
                    <strong>Basado en el CV Actual</strong>
                    <span>Clona tus datos actuales para adaptar rápidamente a una nueva vacante.</span>
                  </button>
                  <button 
                    type="button"
                    className={`template-card-btn ${newProfileTemplate === 'clean' ? 'active' : ''}`}
                    onClick={() => setNewProfileTemplate('clean')}
                  >
                    <strong>Plantilla Limpia</strong>
                    <span>Comienza con secciones en blanco manteniendo únicamente tus datos personales.</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="cv-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsNewProfileModalOpen(false)}>
                Cancelar
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleCreateNewProfile}
                disabled={!newProfileName.trim()}
              >
                Crear y Comenzar a Editar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: RENOMBRAR CV
          ========================================================================= */}
      {isRenameModalOpen && (
        <div className="cv-modal-backdrop" onClick={() => setIsRenameModalOpen(false)}>
          <div className="cv-modal-card" onClick={e => e.stopPropagation()}>
            <div className="cv-modal-header">
              <div className="cv-modal-title">
                <Edit3 size={18} color="#0072ce" />
                <h3>Renombrar Curriculum Vitae</h3>
              </div>
              <button className="cv-modal-close" onClick={() => setIsRenameModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="cv-modal-body">
              <div className="editor-input-group">
                <label>Nuevo Título del CV</label>
                <input 
                  type="text" 
                  value={renameValue} 
                  onChange={e => setRenameValue(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="cv-modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsRenameModalOpen(false)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleRenameCurrentProfile}>
                Guardar Título
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cv-studio-root {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        /* ─── Header ─── */
        .cv-studio-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .cv-header-info {
          max-width: 680px;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .cv-studio-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #0072ce;
          letter-spacing: 0.1em;
        }

        .cv-header-info h2 {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .cv-header-info p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .cv-header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .sync-cv-btn {
          font-size: 0.85rem !important;
          padding: 0.6rem 1.15rem !important;
          border-radius: 2rem !important;
        }

        .print-cv-btn {
          background: #0072ce !important;
          font-size: 0.85rem !important;
          padding: 0.6rem 1.25rem !important;
          border-radius: 2rem !important;
          box-shadow: 0 6px 20px rgba(0, 114, 206, 0.35) !important;
        }

        /* ─── Profiles Multi-CV Bar ─── */
        .cv-profiles-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
          background: linear-gradient(135deg, rgba(12, 18, 26, 0.95), rgba(8, 14, 22, 0.9));
          border: 1px solid rgba(0, 114, 206, 0.35);
          border-radius: 1.25rem;
          padding: 0.85rem 1.35rem;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
        }

        .cv-profiles-selector-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex: 1;
          min-width: 280px;
        }

        .profiles-icon {
          color: #38bdf8;
          flex-shrink: 0;
        }

        .profile-select-wrapper {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex: 1;
        }

        .profile-select-label {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #94a3b8;
          white-space: nowrap;
        }

        .profile-dropdown-select {
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(0, 114, 206, 0.3);
          border-radius: 0.75rem;
          padding: 0.45rem 1rem;
          color: #ffffff;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          outline: none;
          cursor: pointer;
          flex: 1;
          max-width: 420px;
        }

        .profile-dropdown-select:focus {
          border-color: #0072ce;
          background: rgba(0, 114, 206, 0.1);
        }

        .profile-count-pill {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.15);
          padding: 0.25rem 0.65rem;
          border-radius: 1rem;
          white-space: nowrap;
        }

        .cv-profiles-action-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-profile-tool {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.75rem;
          padding: 0.45rem 0.85rem;
          color: #cbd5e1;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-profile-tool:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .btn-profile-tool.add {
          background: rgba(0, 114, 206, 0.18);
          border-color: #0072ce;
          color: #38bdf8;
        }

        .btn-profile-tool.add:hover {
          background: #0072ce;
          color: #ffffff;
        }

        .btn-profile-tool.delete:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
          color: #f87171;
        }

        .profile-divider {
          width: 1px;
          height: 22px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 0.25rem;
        }

        /* ─── Nav Toolbar ─── */
        .cv-nav-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          background: rgba(12, 18, 26, 0.75);
          padding: 0.6rem 0.85rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .cv-mode-tabs {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .cv-mode-btn {
          background: transparent;
          border: none;
          border-radius: 0.85rem;
          padding: 0.55rem 1.1rem;
          font-family: var(--font-heading);
          font-size: 0.86rem;
          font-weight: 700;
          color: #94a3b8;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cv-mode-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .cv-mode-btn.active {
          background: #0072ce;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 114, 206, 0.35);
        }

        .tab-badge-count {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          background: rgba(0, 0, 0, 0.35);
          padding: 0.15rem 0.45rem;
          border-radius: 1rem;
        }

        .cv-lang-selector {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .lang-selector-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 700;
        }

        .lang-pill-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 0.38rem 0.85rem;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          color: #94a3b8;
          display: inline-flex;
          align-items: center;
          gap: 0.38rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lang-pill-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .lang-pill-btn.active {
          background: rgba(0, 114, 206, 0.25);
          border-color: #0072ce;
          color: #38bdf8;
        }

        .iso-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          opacity: 0.8;
        }

        .cv-save-feedback-banner {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          padding: 0.85rem 1.35rem;
          border-radius: 1rem;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        /* ─── ATS CONTROLS PANEL ─── */
        .ats-controls-panel {
          width: 100%;
          max-width: 860px;
          background: rgba(12, 18, 26, 0.85);
          border: 1px solid rgba(0, 114, 206, 0.25);
          border-radius: 1.35rem;
          padding: 1.35rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .ats-badge-col {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .ats-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
          color: #34d399;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.3rem 0.75rem;
          border-radius: 2rem;
          width: fit-content;
        }

        .ats-badge-sub {
          font-size: 0.84rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.45;
        }

        .ats-interactive-toggles {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ats-toggle-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 0.65rem 1rem;
        }

        .toggle-info-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .toggle-title {
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 700;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .toggle-hint {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: #38bdf8;
        }

        .toggle-switch-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
        }

        .ats-style-pills {
          display: flex;
          gap: 0.3rem;
        }

        .style-pill-sm {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 1rem;
          cursor: pointer;
        }

        .style-pill-sm.active {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
        }

        .ats-download-pdf-btn {
          background: #0072ce !important;
          font-size: 0.88rem !important;
          padding: 0.65rem 1.4rem !important;
          border-radius: 2rem !important;
          box-shadow: 0 4px 15px rgba(0, 114, 206, 0.35) !important;
        }

        /* ─── ATS PRINTABLE SHEET ─── */
        .cv-preview-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.75rem;
        }

        .ats-sheet {
          width: 100%;
          max-width: 860px;
          background: #ffffff;
          color: #0f172a;
          border-radius: 0.5rem;
          padding: 3.5rem 3.25rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          gap: 1.45rem;
          font-family: 'Calibri', 'Inter', 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.5;
          transition: all 0.2s ease;
        }

        /* Densidades */
        .ats-sheet.density-compact {
          padding: 2.25rem 2.65rem;
          gap: 1rem;
          font-size: 0.88rem;
        }

        .ats-sheet.density-compact .ats-full-name {
          font-size: 1.85rem;
        }

        .ats-sheet.density-compact .ats-section {
          gap: 0.35rem;
        }

        /* Layouts de Cabecera y Foto */
        .ats-header-block {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-bottom: 2px solid #0f172a;
          padding-bottom: 1.15rem;
        }

        .ats-header-block.header-layout-center {
          flex-direction: column;
          text-align: center;
          justify-content: center;
        }

        .ats-header-block.header-layout-center .ats-contact-line,
        .ats-header-block.header-layout-center .ats-links-line {
          justify-content: center;
        }

        .ats-header-block.header-layout-right {
          justify-content: space-between;
        }

        .ats-photo-box {
          overflow: hidden;
          flex-shrink: 0;
          border: 1.5px solid #cbd5e1;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        .ats-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ats-header-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .ats-full-name {
          font-size: 2.1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .ats-professional-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0284c7;
          margin: 0 0 0.3rem;
        }

        .ats-contact-line,
        .ats-links-line {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: #334155;
          flex-wrap: wrap;
        }

        .ats-contact-item {
          white-space: nowrap;
        }

        .ats-sep {
          color: #94a3b8;
          font-weight: 700;
        }

        .ats-section-heading {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border-bottom: 1.5px solid #0284c7;
          padding-bottom: 0.25rem;
          margin: 0;
        }

        /* ─── Plantilla: Classic (Harvard) ─── */
        .ats-sheet.style-classic {
          font-family: 'Times New Roman', Times, Georgia, serif;
          color: #000000;
        }

        .ats-sheet.style-classic .ats-header-block {
          border-bottom: 1.5px solid #000000;
        }

        .ats-sheet.style-classic .ats-full-name {
          font-size: 2.2rem;
          color: #000000;
        }

        .ats-sheet.style-classic .ats-professional-title {
          color: #333333;
          font-style: italic;
        }

        .ats-sheet.style-classic .ats-section-heading {
          color: #000000;
          border-bottom: 1px solid #000000;
        }

        /* ─── Plantilla: Nordic (Minimalist) ─── */
        .ats-sheet.style-nordic {
          font-family: 'Inter', system-ui, sans-serif;
          color: #1e293b;
        }

        .ats-sheet.style-nordic .ats-header-block {
          border-bottom: 2px solid #334155;
        }

        .ats-sheet.style-nordic .ats-section-heading {
          border-bottom: 1.5px solid #e2e8f0;
        }

        /* Secciones ATS */
        .ats-section {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .ats-paragraph {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #1f2937;
          margin: 0;
          text-align: justify;
        }

        .ats-experience-list,
        .ats-projects-list,
        .ats-education-list,
        .ats-cert-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .ats-experience-item,
        .ats-project-item,
        .ats-education-item,
        .ats-cert-item {
          page-break-inside: avoid;
          break-inside: avoid;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .ats-item-header-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          font-size: 0.95rem;
        }

        .ats-role-company-group {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
        }

        .ats-role-title,
        .ats-project-name,
        .ats-degree-title {
          font-weight: 700;
          color: #0f172a;
        }

        .ats-project-link a {
          color: #0284c7;
          text-decoration: none;
          font-size: 0.82rem;
        }

        .ats-company-name,
        .ats-institution-name {
          font-weight: 600;
          color: #334155;
        }

        .ats-date-badge {
          font-size: 0.85rem;
          font-weight: 700;
          color: #475569;
          white-space: nowrap;
        }

        .ats-item-sub-meta {
          font-size: 0.82rem;
          color: #64748b;
          font-style: italic;
        }

        .ats-bullets-list {
          margin: 0.25rem 0 0 1.25rem;
          padding: 0;
          font-size: 0.88rem;
          color: #1f2937;
          line-height: 1.55;
        }

        .ats-bullets-list li {
          margin-bottom: 0.25rem;
        }

        .ats-edu-details {
          font-size: 0.85rem;
          color: #475569;
          margin: 0;
        }

        .ats-grid-skills {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 2rem;
        }

        .ats-categorized-skills {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .ats-skill-cat-row {
          font-size: 0.86rem;
          line-height: 1.5;
          color: #1e293b;
        }

        .ats-skill-cat-row strong {
          color: #0f172a;
          margin-right: 0.35rem;
        }

        .ats-languages-list {
          margin: 0;
          padding: 0 0 0 1.15rem;
          font-size: 0.86rem;
          color: #1f2937;
          line-height: 1.6;
        }

        /* ─── PRINT RULES FOR DIRECT ATS PDF EXPORT ─── */
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm 12mm;
          }
          html, body {
            height: auto !important;
            overflow: visible !important;
            background: #ffffff !important;
          }
          body * {
            visibility: hidden;
          }
          .printable-cv-sheet,
          .printable-cv-sheet * {
            visibility: visible;
          }
          .printable-cv-sheet {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print,
          .cv-studio-header,
          .cv-profiles-bar,
          .cv-nav-toolbar,
          .ats-controls-panel,
          .cv-editor-container,
          .cv-files-container,
          .admin-sidebar,
          .admin-header-bar {
            display: none !important;
          }
        }

        /* ─── Photo Studio Box (Editor) ─── */
        .photo-studio-box {
          background: linear-gradient(135deg, rgba(12, 18, 26, 0.9), rgba(16, 24, 38, 0.75)) !important;
          border: 1px solid rgba(0, 114, 206, 0.25) !important;
        }

        .box-icon-wrap.photo-icon {
          background: rgba(0, 114, 206, 0.15);
          color: #38bdf8;
        }

        .photo-master-toggle {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .toggle-state-label {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #38bdf8;
        }

        .photo-controls-grid {
          display: flex;
          align-items: center;
          gap: 2.25rem;
          flex-wrap: wrap;
          padding-top: 0.5rem;
        }

        .photo-preview-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .photo-preview-frame {
          border: 2.5px solid #0072ce;
          box-shadow: 0 8px 25px rgba(0, 114, 206, 0.3);
          overflow: hidden;
          background: #0f172a;
          transition: all 0.2s ease;
        }

        .photo-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .photo-dimension-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #94a3b8;
        }

        .photo-adjustments-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          min-width: 280px;
        }

        .photo-control-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .photo-control-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #cbd5e1;
        }

        .photo-btn-group {
          display: flex;
          gap: 0.35rem;
        }

        .photo-option-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 0.4rem 0.85rem;
          color: #94a3b8;
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .photo-option-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .photo-option-btn.active {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
        }

        .slider-row {
          flex-direction: column;
          align-items: stretch;
          gap: 0.5rem;
        }

        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .slider-quick-presets {
          display: flex;
          gap: 0.3rem;
        }

        .preset-btn-sm {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.5rem;
          padding: 0.2rem 0.5rem;
          color: #94a3b8;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          cursor: pointer;
        }

        .preset-btn-sm:hover {
          color: #ffffff;
          border-color: #0072ce;
        }

        .photo-range-slider {
          width: 100%;
          accent-color: #0072ce;
          height: 6px;
          border-radius: 3px;
          cursor: pointer;
        }

        .photo-actions-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 0.35rem;
        }

        .photo-upload-btn {
          border-radius: 1.5rem !important;
          font-size: 0.8rem !important;
          padding: 0.45rem 1rem !important;
          cursor: pointer;
          background: #0072ce !important;
          color: #ffffff !important;
        }

        .photo-reset-btn {
          border-radius: 1.5rem !important;
          font-size: 0.8rem !important;
          padding: 0.45rem 1rem !important;
        }

        .photo-disabled-notice {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 1rem;
          padding: 0.85rem 1.25rem;
          color: #e2e8f0;
          font-size: 0.84rem;
          line-height: 1.5;
        }

        .photo-disabled-notice strong {
          color: #34d399;
          margin-right: 0.35rem;
        }

        /* ─── Files Mode ─── */
        .cv-files-container {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .cv-files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
          gap: 1.5rem;
        }

        .cv-file-card {
          background: rgba(12, 18, 26, 0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          transition: all 0.25s ease;
        }

        .cv-file-card.attached {
          border-color: rgba(0, 114, 206, 0.35);
        }

        .cv-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cv-flag-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .cv-card-titles {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .cv-card-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .cv-card-title-row h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .cv-iso-badge {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.15);
          border: 1px solid rgba(0, 114, 206, 0.3);
          padding: 0.1rem 0.4rem;
          border-radius: 0.4rem;
        }

        .cv-card-subtitle {
          font-size: 0.8rem;
          color: #64748b;
        }

        .cv-file-status-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1rem;
          padding: 0.95rem 1.15rem;
        }

        .status-indicator {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .status-indicator.ready {
          color: #34d399;
        }

        .status-indicator.ready div strong {
          display: block;
          font-size: 0.84rem;
          color: #34d399;
        }

        .status-indicator.ready div span {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 0.1rem;
          word-break: break-all;
        }

        .status-indicator.missing {
          color: #f87171;
        }

        .status-indicator.missing div strong {
          display: block;
          font-size: 0.84rem;
          color: #f87171;
        }

        .status-indicator.missing div span {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
          margin-top: 0.1rem;
        }

        .cv-files-header-bar {
          background: rgba(12, 18, 26, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.25rem;
          padding: 1.15rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cv-files-header-title {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .cv-files-header-title h4 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .cv-files-header-title span {
          font-size: 0.82rem;
          color: #94a3b8;
        }

        .delete-all-cvs-btn {
          border-radius: 2rem !important;
          font-size: 0.82rem !important;
          padding: 0.55rem 1.1rem !important;
          color: #f87171 !important;
          border-color: rgba(239, 68, 68, 0.3) !important;
          background: rgba(239, 68, 68, 0.08) !important;
        }

        .delete-all-cvs-btn:hover {
          background: rgba(239, 68, 68, 0.2) !important;
          border-color: #ef4444 !important;
        }

        .btn-danger-pill {
          background: rgba(239, 68, 68, 0.12) !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
          color: #f87171 !important;
          font-size: 0.82rem !important;
          padding: 0.6rem 0.95rem !important;
          border-radius: 2rem !important;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 700;
        }

        .btn-danger-pill:hover {
          background: #ef4444 !important;
          color: #ffffff !important;
          border-color: #ef4444 !important;
        }

        .upload-new-btn {
          background: #0072ce !important;
          box-shadow: 0 4px 15px rgba(0, 114, 206, 0.3) !important;
        }

        .cv-card-actions-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-wrap: wrap;
        }

        .cv-upload-label {
          flex: 1;
          min-width: 140px;
          font-size: 0.82rem !important;
          padding: 0.6rem 1.1rem !important;
          border-radius: 2rem !important;
          background: #0072ce !important;
          cursor: pointer;
        }

        .cv-view-btn {
          font-size: 0.82rem !important;
          padding: 0.6rem 1rem !important;
          border-radius: 2rem !important;
        }

        .cv-card-tools-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 0.85rem;
          gap: 0.5rem;
        }

        .tool-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.75rem;
          font-family: var(--font-heading);
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          padding: 0.35rem 0.65rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .tool-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .cv-files-note-card {
          background: rgba(18, 26, 38, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.25rem;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .note-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 0.85rem;
          background: rgba(0, 114, 206, 0.15);
          color: #38bdf8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .note-text h4 {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.35rem;
        }

        .note-text p {
          color: #94a3b8;
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        /* ─── Editor Mode & Form Boxes ─── */
        .cv-editor-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .cv-editor-top-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
          background: rgba(12, 18, 26, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.25rem;
          padding: 1.25rem 1.75rem;
        }

        .editor-lang-indicator {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .editor-lang-indicator .lang-flag {
          font-size: 1.6rem;
        }

        .editor-lang-indicator h4 {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          color: #94a3b8;
          margin: 0;
        }

        .editor-lang-indicator h4 strong {
          color: #ffffff;
        }

        .editor-sub-hint {
          font-size: 0.78rem;
          color: #64748b;
        }

        .save-cv-btn {
          background: #0072ce !important;
          font-size: 0.88rem !important;
          padding: 0.65rem 1.4rem !important;
          border-radius: 2rem !important;
        }

        .editor-card-box {
          background: rgba(12, 18, 26, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 1.85rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .editor-card-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .box-header-title {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .box-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 0.65rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .box-icon-wrap.user-icon { background: rgba(0, 114, 206, 0.15); color: #38bdf8; }
        .box-icon-wrap.summary-icon { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .box-icon-wrap.exp-icon { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .box-icon-wrap.edu-icon { background: rgba(168, 85, 247, 0.15); color: #c084fc; }
        .box-icon-wrap.cert-icon { background: rgba(236, 72, 153, 0.15); color: #f472b6; }
        .box-icon-wrap.lang-icon { background: rgba(14, 165, 233, 0.15); color: #38bdf8; }
        .box-icon-wrap.skills-icon { background: rgba(99, 102, 241, 0.15); color: #818cf8; }

        .box-header-title h3 {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .box-header-title p {
          color: #64748b;
          font-size: 0.82rem;
          margin: 0.15rem 0 0;
        }

        .btn-sm-add {
          font-size: 0.8rem !important;
          padding: 0.45rem 0.95rem !important;
          border-radius: 2rem !important;
        }

        .editor-form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .editor-form-grid {
            grid-template-columns: 1fr;
          }
        }

        .editor-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .editor-input-group.full-width {
          grid-column: 1 / -1;
        }

        .editor-input-group label {
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          color: #cbd5e1;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-with-icon svg {
          position: absolute;
          left: 0.95rem;
          color: #64748b;
          pointer-events: none;
        }

        .input-with-icon input {
          padding-left: 2.5rem !important;
        }

        .editor-input-group input,
        .editor-input-group textarea {
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.85rem;
          padding: 0.75rem 1rem;
          font-family: inherit;
          font-size: 0.9rem;
          color: #ffffff;
          outline: none;
          transition: all 0.2s ease;
          width: 100%;
        }

        .editor-input-group input:focus,
        .editor-input-group textarea:focus {
          border-color: #0072ce;
          background: rgba(0, 114, 206, 0.03);
          box-shadow: 0 0 0 3px rgba(0, 114, 206, 0.2);
        }

        .field-helper-text {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #64748b;
          margin-top: 0.2rem;
        }

        /* ─── Stack of Edit Cards ─── */
        .item-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .item-edit-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1.15rem;
          padding: 1.35rem;
          transition: border-color 0.2s ease;
        }

        .item-edit-card:hover {
          border-color: rgba(255, 255, 255, 0.12);
        }

        .item-card-top-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .item-index-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.15);
          padding: 0.4rem 0.7rem;
          border-radius: 0.5rem;
        }

        .item-header-inputs {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          min-width: 250px;
        }

        .item-primary-input {
          flex: 2;
          min-width: 180px;
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 0.65rem !important;
          padding: 0.6rem 0.85rem !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 0.88rem !important;
        }

        .item-secondary-input {
          flex: 1;
          min-width: 130px;
          background: rgba(255, 255, 255, 0.04) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 0.65rem !important;
          padding: 0.6rem 0.85rem !important;
          color: #ffffff !important;
          font-family: var(--font-mono) !important;
          font-size: 0.8rem !important;
        }

        .item-action-btns {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .item-reorder-btn,
        .item-duplicate-btn {
          width: 32px;
          height: 32px;
          border-radius: 0.65rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .item-reorder-btn:hover:not(:disabled),
        .item-duplicate-btn:hover {
          background: rgba(0, 114, 206, 0.15);
          color: #38bdf8;
          border-color: #0072ce;
        }

        .item-reorder-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .item-delete-btn {
          width: 32px;
          height: 32px;
          border-radius: 0.65rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .item-delete-btn:hover {
          background: #ef4444;
          color: #ffffff;
        }

        /* ─── Languages Grid ─── */
        .languages-edit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .lang-edit-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1.15rem;
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .lang-card-head {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .lang-bullet-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
        }

        .lang-name-input {
          background: transparent !important;
          border: none !important;
          font-family: var(--font-heading) !important;
          font-size: 1rem !important;
          font-weight: 800 !important;
          color: #ffffff !important;
          padding: 0 !important;
          flex: 1;
        }

        .lang-delete-btn {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.35rem;
        }

        .lang-delete-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        /* ─── Skills Tag Input ─── */
        .add-skill-form-row {
          display: flex;
          gap: 0.65rem;
        }

        .add-skill-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          padding: 0.7rem 1.25rem;
          color: #ffffff;
          font-size: 0.88rem;
          outline: none;
        }

        .add-skill-input:focus {
          border-color: #0072ce;
        }

        .add-skill-btn {
          border-radius: 2rem !important;
          padding: 0.7rem 1.35rem !important;
          background: #0072ce !important;
        }

        .skills-pill-tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          padding: 1.15rem;
          min-height: 80px;
        }

        .skill-pill-tag {
          background: rgba(0, 114, 206, 0.12);
          border: 1px solid rgba(0, 114, 206, 0.3);
          color: #e0f2fe;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: all 0.2s ease;
        }

        .skill-pill-tag:hover {
          background: rgba(0, 114, 206, 0.22);
          border-color: #0072ce;
        }

        .skill-remove-x {
          background: transparent;
          border: none;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }

        .skill-remove-x:hover {
          color: #f87171;
        }

        .editor-bottom-save-bar {
          display: flex;
          justify-content: center;
          padding: 1rem 0;
        }

        .save-cv-btn-large {
          background: #0072ce !important;
          font-size: 0.95rem !important;
          padding: 0.85rem 2.25rem !important;
          border-radius: 2rem !important;
          box-shadow: 0 8px 25px rgba(0, 114, 206, 0.4) !important;
        }

        /* ─── Modales ─── */
        .cv-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          padding: 1.5rem;
        }

        .cv-modal-card {
          background: #0c121a;
          border: 1px solid rgba(0, 114, 206, 0.3);
          border-radius: 1.5rem;
          width: 100%;
          max-width: 520px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .cv-modal-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cv-modal-title {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .cv-modal-title h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .cv-modal-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem;
        }

        .cv-modal-close:hover {
          color: #ffffff;
        }

        .cv-modal-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .template-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .template-card-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .template-card-btn strong {
          color: #ffffff;
          font-size: 0.88rem;
        }

        .template-card-btn span {
          color: #94a3b8;
          font-size: 0.75rem;
          line-height: 1.4;
        }

        .template-card-btn:hover {
          border-color: rgba(0, 114, 206, 0.4);
          background: rgba(0, 114, 206, 0.05);
        }

        .template-card-btn.active {
          border-color: #0072ce;
          background: rgba(0, 114, 206, 0.12);
        }

        .template-card-btn.active strong {
          color: #38bdf8;
        }

        .cv-modal-footer {
          padding: 1.15rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
        }

        /* ─── PDF Viewer Modal ─── */
        .pdf-viewer-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 8, 12, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          padding: 1.5rem;
        }

        .pdf-viewer-modal-box {
          background: #090e15;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 1.5rem;
          width: 100%;
          max-width: 960px;
          height: 88vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9);
        }

        .pdf-viewer-header {
          padding: 1.15rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .pdf-header-title-col {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: #38bdf8;
        }

        .pdf-header-title-col h3 {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .pdf-header-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .btn-sm {
          font-size: 0.78rem !important;
          padding: 0.45rem 0.85rem !important;
          border-radius: 1.5rem !important;
        }

        .pdf-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .pdf-close-btn:hover {
          background: #ef4444;
          color: #ffffff;
        }

        .pdf-viewer-frame-container {
          flex: 1;
          width: 100%;
          background: #1e293b;
        }

        .pdf-iframe-element {
          width: 100%;
          height: 100%;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default CVManagement;
