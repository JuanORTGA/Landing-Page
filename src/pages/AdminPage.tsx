import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Save, 
  X,
  ArrowLeft,
  ChevronDown,
  Check,
  FolderCode,
  Globe,
  Github,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  Plus,
  Link2,
  Sparkles,
  Building2,
  GraduationCap
} from 'lucide-react';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import AdminLogin from '../components/admin/AdminLogin';
import { Toast } from '../components/admin/AdminShared';
import ProjectsTable from '../components/admin/tables/ProjectsTable';
import SkillsTable from '../components/admin/tables/SkillsTable';
import ExperienceTable from '../components/admin/tables/ExperienceTable';
import EducationTable from '../components/admin/tables/EducationTable';
import ContentTable, { keyMetadata } from '../components/admin/tables/ContentTable';
import LiveContentStudio from '../components/admin/LiveContentStudio';
import CVManagement from '../components/admin/tables/CVManagement';
import MediaManagement, { defaultHeroList } from '../components/admin/tables/MediaManagement';
import LangTabs from '../components/admin/modals/LangTabs';
import { techPresetsList, getTechLogoUrl, techGroups, skillCategoriesList } from '../services/techLogos';

import type { Project, Skill, ExperienceItem, EducationItem, PageContent } from '../types/database';
import { syncAllLandingDataToSupabase } from '../services/seedLandingData';
import joeLogo from '../assets/joe-technology-logo-transparent.png';
import { 
  AdminFolderProjectsIcon, 
  AdminChipSkillsIcon, 
  AdminBriefcaseExpIcon, 
  AdminGraduationEduIcon,
  AdminDocumentCopyIcon 
} from '../components/admin/icons/AdminIcons';
import '../styles/admin.css';

export const projectCategoryPresets = [
  { label: 'Full-Stack Web App', value: 'Full-Stack Web App' },
  { label: 'Computer Vision & AI', value: 'Computer Vision & AI' },
  { label: 'Data & Analytics', value: 'Data & Analytics' },
  { label: 'EdTech Platform', value: 'EdTech Platform' },
  { label: 'SaaS & Cloud Tool', value: 'SaaS & Cloud Tool' },
  { label: 'REST API & Microservices', value: 'REST API & Microservices' },
  { label: 'Mobile App', value: 'Mobile App' },
];

export const popularStackPills = [
  'Python', 'Django', 'YOLO', 'Roboflow', 'React 18', 'TypeScript', 
  'PostgreSQL', 'Docker', 'FastAPI', 'Node.js', 'Tailwind CSS', 
  'OpenAI', 'Supabase', 'Redis', 'Next.js', 'OpenCV'
];

// ─────────────────────────── Helpers ───────────────────────────
const emptyProject: Project = {
  title_es: '', title_en: '', title_et: '',
  description_short_es: '', description_short_en: '', description_short_et: '',
  description_long_es: '', description_long_en: '', description_long_et: '',
  image_url: '', github_url: '', live_url: '', stack: [], category: 'Full-Stack Web App'
};

const emptySkill: Skill = { name: '', icon: '', category: '', level: 50, order: 0 };

const emptyExperience: ExperienceItem = {
  company: '', company_logo: '', role_es: '', role_en: '', role_et: '',
  description_es: '', description_en: '', description_et: '',
  start_date: '', end_date: '', is_current: false, location: '',
  employment_type: 'Jornada completa', work_mode: 'Presencial', stack: []
};

const emptyEducation: EducationItem = {
  institution: '', institution_logo: '', degree_es: '', degree_en: '', degree_et: '',
  field_of_study: '', start_date: '', end_date: '', is_current: false,
  credential_id: '', credential_url: '', description_es: '', description_en: '', description_et: '',
  stack: []
};

const emptyContent: PageContent = { key: '', content_es: '', content_en: '', content_et: '' };

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // ─── Data States ───
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [contents, setContents] = useState<PageContent[]>([]);
  const [cvFiles, setCvFiles] = useState<any[]>([]);
  const [mediaMap, setMediaMap] = useState<Record<string, string>>({});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // ─── Modal States ───
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({ ...emptyProject });
  const [customStackInput, setCustomStackInput] = useState('');
  const [isProjectCategoryDropdownOpen, setIsProjectCategoryDropdownOpen] = useState(false);

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill>({ ...emptySkill });
  const [logoSearchQuery, setLogoSearchQuery] = useState('');
  const [selectedLogoGroup, setSelectedLogoGroup] = useState('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState<ExperienceItem>({ ...emptyExperience });
  const [expCustomStackInput, setExpCustomStackInput] = useState('');

  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [currentEdu, setCurrentEdu] = useState<EducationItem>({ ...emptyEducation });
  const [eduCustomStackInput, setEduCustomStackInput] = useState('');

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<PageContent>({ ...emptyContent });

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const [langTab, setLangTab] = useState<'es' | 'en' | 'et'>('es');

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  }, []);

  // ─────────────────────────── Fetch ───────────────────────────
  const fetchData = useCallback(async () => {
    switch (activeTab) {
      case 'projects': {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        setProjects((data as Project[]) || []);
        break;
      }
      case 'skills': {
        const { data } = await supabase.from('skills').select('*').order('order', { ascending: true });
        setSkills((data as Skill[]) || []);
        break;
      }
      case 'experience': {
        const { data } = await supabase.from('experience').select('*').order('start_date', { ascending: false });
        setExperiences((data as ExperienceItem[]) || []);
        break;
      }
      case 'education': {
        const { data } = await supabase.from('education').select('*').order('start_date', { ascending: false });
        setEducationList((data as EducationItem[]) || []);
        break;
      }
      case 'content': {
        const { data } = await supabase.from('page_content').select('*').order('key', { ascending: true });
        setContents((data as PageContent[]) || []);
        break;
      }
      case 'cvs': {
        const { data } = await supabase.from('cv_files').select('*');
        setCvFiles(data || []);
        break;
      }
      case 'media': {
        const { data } = await supabase.from('page_content').select('*');
        const map: Record<string, string> = {};
        (data || []).forEach(item => {
          if (item.key.startsWith('image_')) {
            map[item.key] = item.content_es;
          }
        });
        setMediaMap(map);
        break;
      }
    }
  }, [activeTab]);

  // ─────────────────────────── Seguridad de Sesión Estricta ───────────────────────────
  // Cada vez que se recarga la página (F5 o navegación), se invalida cualquier sesión previa
  // para exigir autenticación de nuevo y regresar siempre al formulario de login por seguridad.
  useEffect(() => {
    supabase.auth.signOut().catch(() => {});
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn, fetchData]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);


  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  // ─────────────────────────── Upload ───────────────────────────
  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      showToast(error.message || 'Upload failed', 'error');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const url = await uploadFile(e.target.files[0], 'projects');
    if (url) {
      setCurrentProject(prev => ({ ...prev, image_url: url }));
    }
  };

  const handleCompanyLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const url = await uploadFile(e.target.files[0], 'projects');
    if (url) {
      setCurrentExp(prev => ({ ...prev, company_logo: url }));
      showToast('¡Logo de empresa subido con éxito!');
    }
  };

  const handleEduLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const url = await uploadFile(e.target.files[0], 'projects');
    if (url) {
      setCurrentEdu(prev => ({ ...prev, institution_logo: url }));
      showToast('¡Logo de institución académica subido con éxito!');
    }
  };

  const handleCVUpload = async (file: File, language: string) => {
    if (!file) return;
    const url = await uploadFile(file, 'cvs');
    if (url) {
      // Intentar primero con la columna 'lang' (esquema oficial)
      const { error } = await supabase.from('cv_files').upsert(
        { lang: language, file_url: url, updated_at: new Date().toISOString() },
        { onConflict: 'lang' }
      );
      
      if (error) {
        // Fallback en caso de que la tabla use 'language'
        const { error: err2 } = await supabase.from('cv_files').upsert(
          { language: language, file_url: url, updated_at: new Date().toISOString() },
          { onConflict: 'language' }
        );
        if (err2) {
          showToast(`Error al registrar CV: ${error.message || err2.message}`, 'error');
        } else {
          showToast('¡Curriculum PDF subido con éxito!');
          fetchData();
        }
      } else {
        showToast('¡Curriculum PDF subido con éxito!');
        fetchData();
      }
    }
  };

  const handleDeleteCV = async (language: string) => {
    if (!window.confirm(`¿Seguro que deseas eliminar el archivo PDF de ${language.toUpperCase()}?`)) return;
    const { error } = await supabase
      .from('cv_files')
      .delete()
      .eq('lang', language);

    if (error) {
      const { error: err2 } = await supabase
        .from('cv_files')
        .delete()
        .eq('language', language);
      if (err2) showToast(err2.message, 'error');
      else {
        showToast('Archivo PDF eliminado correctamente');
        fetchData();
      }
    } else {
      showToast('Archivo PDF eliminado correctamente');
      fetchData();
    }
  };

  const handleDeleteAllCVs = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar TODOS los archivos PDF de curriculums actuales?')) return;
    const { error } = await supabase.from('cv_files').delete().in('lang', ['es', 'en', 'et']);
    if (error) {
      const { error: err2 } = await supabase.from('cv_files').delete().in('language', ['es', 'en', 'et']);
      if (err2) showToast(err2.message, 'error');
      else {
        showToast('Todos los archivos PDF han sido eliminados');
        fetchData();
      }
    } else {
      showToast('Todos los archivos PDF han sido eliminados');
      fetchData();
    }
  };

  // ─────────────────────────── Media Handlers ───────────────────────────
  const handleUploadMediaImage = async (file: File, key: string) => {
    if (!file) return;
    const url = await uploadFile(file, 'projects');
    if (url) {
      const { error } = await supabase.from('page_content').upsert(
        { key, content_es: url, content_en: url, content_et: url },
        { onConflict: 'key' }
      );
      if (error) showToast(error.message, 'error');
      else {
        showToast('¡Imagen actualizada y publicada con éxito!');
        setMediaMap(prev => ({ ...prev, [key]: url }));
        fetchData();
      }
    }
  };

  const handleResetMediaImage = async (key: string) => {
    if (!window.confirm('¿Restablecer esta imagen a la original por defecto?')) return;
    const { error } = await supabase.from('page_content').delete().eq('key', key);
    if (error) showToast(error.message, 'error');
    else {
      showToast('Imagen restablecida a la original');
      setMediaMap(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      fetchData();
    }
  };

  const handleAddHeroBackground = async (file: File) => {
    if (!file) return;
    const url = await uploadFile(file, 'projects');
    if (url) {
      let currentList: string[];
      try {
        if (mediaMap['image_hero_backgrounds']) {
          currentList = JSON.parse(mediaMap['image_hero_backgrounds']);
        } else {
          currentList = defaultHeroList.map(item => item.url);
        }
      } catch {
        currentList = defaultHeroList.map(item => item.url);
      }
      const updatedList = [...currentList, url];
      const jsonStr = JSON.stringify(updatedList);
      const { error } = await supabase.from('page_content').upsert(
        { key: 'image_hero_backgrounds', content_es: jsonStr, content_en: jsonStr, content_et: jsonStr },
        { onConflict: 'key' }
      );
      if (error) showToast(error.message, 'error');
      else {
        showToast('¡Nueva foto agregada a la portada con éxito!');
        setMediaMap(prev => ({ ...prev, image_hero_backgrounds: jsonStr }));
        fetchData();
      }
    }
  };

  const handleDeleteHeroBackground = async (index: number) => {
    if (!window.confirm('¿Eliminar esta foto de la rotación de portada?')) return;
    let currentList: string[];
    try {
      if (mediaMap['image_hero_backgrounds']) {
        currentList = JSON.parse(mediaMap['image_hero_backgrounds']);
      } else {
        currentList = defaultHeroList.map(item => item.url);
      }
    } catch {
      currentList = defaultHeroList.map(item => item.url);
    }
    const updatedList = currentList.filter((_, idx) => idx !== index);
    const jsonStr = JSON.stringify(updatedList);
    
    const { error } = await supabase.from('page_content').upsert(
      { key: 'image_hero_backgrounds', content_es: jsonStr, content_en: jsonStr, content_et: jsonStr },
      { onConflict: 'key' }
    );

    if (error) showToast(error.message, 'error');
    else {
      showToast('Foto eliminada de la portada');
      setMediaMap(prev => ({ ...prev, image_hero_backgrounds: jsonStr }));
      fetchData();
    }
  };

  // ─────────────────────────── CRUD ───────────────────────────
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = { ...currentProject };
    if (typeof projectData.stack === 'string') {
      projectData.stack = projectData.stack.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    let error;
    if (projectData.id) {
      const { error: err } = await supabase.from('projects').update(projectData).eq('id', projectData.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('projects').insert([projectData]);
      error = err;
    }

    if (error) showToast(error.message, 'error');
    else { showToast('Project saved!'); setIsProjectModalOpen(false); fetchData(); }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) showToast(error.message, 'error');
    else { showToast('Project deleted'); fetchData(); }
  };

  const saveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...currentSkill };
    let error;
    if (data.id) {
      const { error: err } = await supabase.from('skills').update(data).eq('id', data.id);
      error = err;
    } else {
      const saveData = { ...data };
      delete saveData.id;
      const { error: err } = await supabase.from('skills').insert([saveData]);
      error = err;
    }
    if (error) showToast(error.message, 'error');
    else { showToast('Skill saved!'); setIsSkillModalOpen(false); fetchData(); }
  };

  const deleteSkill = async (id: string) => {
    if (!window.confirm('¿Eliminar esta skill?')) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) showToast(error.message, 'error');
    else { showToast('Skill deleted'); fetchData(); }
  };

  const saveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = { ...currentExp };
    if (data.is_current) data.end_date = null;
    
    if (typeof data.stack === 'string') {
      data.stack = data.stack.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    let error;
    if (data.id) {
      const { error: err } = await supabase.from('experience').update(data).eq('id', data.id);
      error = err;
    } else {
      const saveData = { ...data };
      delete saveData.id;
      const { error: err } = await supabase.from('experience').insert([saveData]);
      error = err;
    }

    if (error) {
      // Fallback seguro en caso de que alguna columna nueva no exista aún en Supabase
      const safeData: any = {
        company: data.company,
        role_es: data.role_es,
        role_en: data.role_en,
        role_et: data.role_et,
        description_es: data.description_es,
        description_en: data.description_en,
        description_et: data.description_et,
        start_date: data.start_date,
        end_date: data.end_date,
        is_current: data.is_current,
        location: data.location,
      };
      if (data.id) {
        const { error: errFallback } = await supabase.from('experience').update(safeData).eq('id', data.id);
        if (errFallback) showToast(errFallback.message, 'error');
        else { showToast('¡Experiencia guardada!'); setIsExpModalOpen(false); fetchData(); }
      } else {
        const { error: errFallback } = await supabase.from('experience').insert([safeData]);
        if (errFallback) showToast(errFallback.message, 'error');
        else { showToast('¡Experiencia guardada!'); setIsExpModalOpen(false); fetchData(); }
      }
    } else {
      showToast('¡Experiencia laboral guardada con éxito!');
      setIsExpModalOpen(false);
      fetchData();
    }
  };

  const deleteExperience = async (id: string) => {
    if (!window.confirm('¿Eliminar esta experiencia?')) return;
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) showToast(error.message, 'error');
    else { showToast('Experience deleted'); fetchData(); }
  };

  const saveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = { ...currentEdu };
    if (data.is_current) data.end_date = null;
    
    if (typeof data.stack === 'string') {
      data.stack = data.stack.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    let error;
    if (data.id) {
      const { error: err } = await supabase.from('education').update(data).eq('id', data.id);
      error = err;
    } else {
      const saveData = { ...data };
      delete saveData.id;
      const { error: err } = await supabase.from('education').insert([saveData]);
      error = err;
    }

    if (error) {
      const safeData: any = {
        institution: data.institution,
        degree_es: data.degree_es,
        degree_en: data.degree_en,
        degree_et: data.degree_et,
        field_of_study: data.field_of_study,
        start_date: data.start_date,
        end_date: data.end_date,
        is_current: data.is_current,
        credential_id: data.credential_id,
        credential_url: data.credential_url,
        description_es: data.description_es,
        description_en: data.description_en,
        description_et: data.description_et
      };
      if (data.id) {
        const { error: errFallback } = await supabase.from('education').update(safeData).eq('id', data.id);
        if (errFallback) showToast(errFallback.message, 'error');
        else { showToast('¡Estudio guardado!'); setIsEduModalOpen(false); fetchData(); }
      } else {
        const { error: errFallback } = await supabase.from('education').insert([safeData]);
        if (errFallback) showToast(errFallback.message, 'error');
        else { showToast('¡Estudio guardado!'); setIsEduModalOpen(false); fetchData(); }
      }
    } else {
      showToast('¡Estudio o certificado guardado con éxito!');
      setIsEduModalOpen(false);
      fetchData();
    }
  };

  const deleteEducation = async (id: string) => {
    if (!window.confirm('¿Eliminar este registro de estudio o certificación?')) return;
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (error) showToast(error.message, 'error');
    else { showToast('Estudio eliminado'); fetchData(); }
  };

  const saveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...currentContent };
    const { error } = await supabase.from('page_content').upsert(
      {
        key: data.key,
        content_es: data.content_es || '',
        content_en: data.content_en || '',
        content_et: data.content_et || ''
      },
      { onConflict: 'key' }
    );
    if (error) showToast(error.message, 'error');
    else { 
      showToast('¡Texto guardado correctamente!'); 
      setIsContentModalOpen(false); 
      fetchData(); 
    }
  };

  const deleteContent = async (id: string) => {
    if (!window.confirm('¿Eliminar este contenido?')) return;
    const { error } = await supabase.from('page_content').delete().eq('key', id);
    if (error) showToast(error.message, 'error');
    else { showToast('Content deleted'); fetchData(); }
  };

  if (!isLoggedIn) {
    return (
      <>
        <AdminLogin 
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            fetchData();
          }}
          showToast={showToast}
        />
        {toast && <Toast message={toast.message} type={toast.type} />}
      </>
    );
  }

  // ─────────────────────────── 1-Click Sync ───────────────────────────
  const handleSyncAllData = async () => {
    if (!window.confirm('¿Cargar y sincronizar toda la información actual de tu landing page (proyectos, tecnologías, experiencia laboral y textos) en tu base de datos?')) {
      return;
    }

    setIsSyncing(true);
    try {
      const res = await syncAllLandingDataToSupabase();
      if (res.errors.length > 0) {
        showToast(`Sincronización completada. Se cargaron ${res.content} textos, ${res.projects} proyectos, ${res.skills} tecnologías y ${res.experience} empleos.`, 'success');
      } else {
        showToast('¡Información actual de la landing sincronizada con éxito!', 'success');
      }
      await fetchData();
    } catch (err: any) {
      showToast(err.message || 'Error al sincronizar datos', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className={`admin-layout ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <main className={`admin-main ${activeTab === 'content' ? 'studio-mode' : ''}`}>
        {activeTab !== 'content' && (
          <AdminHeader 
            activeTab={activeTab} 
            onSyncData={handleSyncAllData}
            isSyncing={isSyncing}
            onNewItem={() => {
              if (activeTab === 'projects') { setCurrentProject({ ...emptyProject }); setIsProjectModalOpen(true); }
              if (activeTab === 'skills') { setCurrentSkill({ ...emptySkill }); setIsSkillModalOpen(true); }
              if (activeTab === 'experience') { setCurrentExp({ ...emptyExperience }); setIsExpModalOpen(true); }
              if (activeTab === 'education') { setCurrentEdu({ ...emptyEducation }); setIsEduModalOpen(true); }
              if (activeTab === 'media') { setIsMediaModalOpen(true); }
              setLangTab('es');
            }} 
          />
        )}

        {activeTab === 'content' ? (
          <LiveContentStudio contents={contents} onUpdate={(c) => { setContents(prev => prev.map(item => item.key === c.key ? c : item)); }} />
        ) : (
          <div className="admin-module-canvas">
            {activeTab === 'projects' && <ProjectsTable projects={projects} onEdit={(p) => { setCurrentProject(p); setIsProjectModalOpen(true); }} onDelete={deleteProject} />}
            {activeTab === 'skills' && <SkillsTable skills={skills} onEdit={(s) => { setCurrentSkill(s); setIsSkillModalOpen(true); }} onDelete={deleteSkill} />}
            {activeTab === 'experience' && <ExperienceTable experiences={experiences} onEdit={(e) => { setCurrentExp(e); setIsExpModalOpen(true); }} onDelete={deleteExperience} />}
            {activeTab === 'education' && <EducationTable educationList={educationList} onEdit={(edu) => { setCurrentEdu(edu); setIsEduModalOpen(true); }} onDelete={deleteEducation} onAddNew={() => { setCurrentEdu({ ...emptyEducation }); setIsEduModalOpen(true); }} />}
            {activeTab === 'cvs' && (
              <CVManagement 
                cvFiles={cvFiles} 
                experiences={experiences}
                skills={skills}
                contents={contents}
                isUploading={isUploading} 
                onUpload={handleCVUpload}
                onDeleteCV={handleDeleteCV}
                onDeleteAllCVs={handleDeleteAllCVs}
              />
            )}
            {activeTab === 'media' && (
              <MediaManagement 
                mediaContent={mediaMap}
                projects={projects}
                isUploading={isUploading}
                onUploadImage={handleUploadMediaImage}
                onResetImage={handleResetMediaImage}
                onAddHeroBackground={handleAddHeroBackground}
                onDeleteHeroBackground={handleDeleteHeroBackground}
                isUploadModalOpen={isMediaModalOpen}
                setIsUploadModalOpen={setIsMediaModalOpen}
              />
            )}
          </div>
        )}
      </main>

      {/* Project Studio Modal */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
            <motion.div 
              className="modal-content glass project-studio-modal" 
              onClick={e => e.stopPropagation()} 
              initial={{ opacity: 0, scale: 0.92 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.92 }}
            >
              {(() => {
                const stackList = (() => {
                  if (Array.isArray(currentProject.stack)) return currentProject.stack;
                  if (typeof currentProject.stack === 'string') {
                    try {
                      if (currentProject.stack.trim().startsWith('[')) return JSON.parse(currentProject.stack);
                      return currentProject.stack.split(',').map((s: string) => s.trim()).filter(Boolean);
                    } catch {
                      return [currentProject.stack];
                    }
                  }
                  return [];
                })();

                const toggleStackTag = (tag: string) => {
                  const exists = stackList.some((t: string) => t.toLowerCase() === tag.toLowerCase());
                  const updated = exists 
                    ? stackList.filter((t: string) => t.toLowerCase() !== tag.toLowerCase())
                    : [...stackList, tag];
                  setCurrentProject(prev => ({ ...prev, stack: updated }));
                };

                const handleAddCustomTag = () => {
                  if (!customStackInput.trim()) return;
                  const tag = customStackInput.trim();
                  if (!stackList.some((t: string) => t.toLowerCase() === tag.toLowerCase())) {
                    setCurrentProject(prev => ({ ...prev, stack: [...stackList, tag] }));
                  }
                  setCustomStackInput('');
                };

                const handleCopyProjectDraft = () => {
                  if (!currentProject.title_es && !currentProject.description_short_es) return;
                  setCurrentProject(prev => ({
                    ...prev,
                    title_en: prev.title_en || prev.title_es,
                    title_et: prev.title_et || prev.title_es,
                    description_short_en: prev.description_short_en || prev.description_short_es,
                    description_short_et: prev.description_short_et || prev.description_short_es,
                  }));
                  showToast('¡Borrador de español copiado a inglés y estonio!');
                };

                const curatedCovers = [
                  { label: 'Full-Stack App', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
                  { label: 'AI & Visión', url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80' },
                  { label: 'Dashboard & Datos', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80' },
                  { label: 'EdTech Platform', url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80' },
                  { label: 'Backend & API', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
                ];

                const categorizedTags = [
                  { group: 'AI & Visión', tags: ['YOLO', 'Roboflow', 'OpenCV', 'PyTorch', 'OpenAI'] },
                  { group: 'Backend & APIs', tags: ['Python', 'Django', 'DRF', 'FastAPI', 'Node.js'] },
                  { group: 'Frontend & UI', tags: ['React 18', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
                  { group: 'Bases de Datos', tags: ['PostgreSQL', 'Supabase', 'Redis', 'SQLite'] },
                  { group: 'DevOps & Cloud', tags: ['Docker', 'Git', 'AWS', 'Linux'] }
                ];

                const isEnFilled = Boolean(currentProject.title_en && currentProject.description_short_en);
                const isEtFilled = Boolean(currentProject.title_et && currentProject.description_short_et);

                return (
                  <>
                    <div className="modal-header">
                      <div className="content-modal-header-title">
                        <div>
                          <span className="module-section-kicker" style={{ display: 'block', marginBottom: '0.2rem' }}>
                            // ESTUDIO DE PROYECTO
                          </span>
                          <h2>{currentProject.id ? `Editar Proyecto: ${currentProject.title_es || 'Sin título'}` : 'Nuevo Proyecto Destacado'}</h2>
                          <span className="modal-subtitle">
                            Configura portadas, enlaces, stack interactivo y descripciones trilingües
                          </span>
                        </div>
                      </div>
                      <button className="btn-close-modal" onClick={() => setIsProjectModalOpen(false)} title="Cerrar modal" aria-label="Cerrar modal">
                        <X size={18} />
                      </button>
                    </div>

                    <form onSubmit={saveProject} className="admin-form">
                      {/* PESTAÑAS DE IDIOMA Y BOTÓN DE BORRADOR */}
                      <div className="lang-tabs-wrapper-row">
                        <div className="custom-lang-pills-container">
                          <button
                            type="button"
                            className={`custom-lang-pill ${langTab === 'es' ? 'active' : ''}`}
                            onClick={() => setLangTab('es')}
                          >
                            <span className="lang-pill-tag">ES</span>
                            <span>Español</span>
                            <span className="lang-status-tag done">✓</span>
                          </button>

                          <button
                            type="button"
                            className={`custom-lang-pill ${langTab === 'en' ? 'active' : ''}`}
                            onClick={() => setLangTab('en')}
                          >
                            <span className="lang-pill-tag">EN</span>
                            <span>English</span>
                            <span className={`lang-status-tag ${isEnFilled ? 'done' : 'pending'}`}>
                              {isEnFilled ? '✓' : '—'}
                            </span>
                          </button>

                          <button
                            type="button"
                            className={`custom-lang-pill ${langTab === 'et' ? 'active' : ''}`}
                            onClick={() => setLangTab('et')}
                          >
                            <span className="lang-pill-tag">ET</span>
                            <span>Eesti</span>
                            <span className={`lang-status-tag ${isEtFilled ? 'done' : 'pending'}`}>
                              {isEtFilled ? '✓' : '—'}
                            </span>
                          </button>
                        </div>

                        <button 
                          type="button" 
                          className="btn-copy-draft"
                          onClick={handleCopyProjectDraft}
                          title="Copiar textos en español a los campos de inglés y estonio"
                        >
                          <Link2 size={14} />
                          <span>Copiar borrador de ES a EN y ET</span>
                        </button>
                      </div>

                      {/* TEXTOS PRINCIPALES POR IDIOMA */}
                      <div className="form-section">
                        <div className="form-group">
                          <label>Título del Proyecto ({langTab.toUpperCase()}) *</label>
                          <input 
                            type="text" 
                            value={(currentProject as any)[`title_${langTab}`] || ''} 
                            onChange={e => setCurrentProject(prev => ({ ...prev, [`title_${langTab}`]: e.target.value }))} 
                            required={langTab === 'es'} 
                            placeholder={langTab === 'es' ? 'Ej: Nordic Metrics, KeeleLeek...' : 'Project Title...'} 
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Descripción Corta ({langTab.toUpperCase()}) *</label>
                          <textarea 
                            rows={3} 
                            value={(currentProject as any)[`description_short_${langTab}`] || ''} 
                            onChange={e => setCurrentProject(prev => ({ ...prev, [`description_short_${langTab}`]: e.target.value }))} 
                            placeholder={langTab === 'es' ? 'Breve resumen técnico del problema que resuelve la aplicación...' : 'Brief technical summary...'} 
                          />
                        </div>
                      </div>

                      {/* CATEGORÍA DEL PROYECTO */}
                      <div className="form-section project-category-section">
                        <label>Categoría del Proyecto *</label>
                        <div className="project-category-pills">
                          {projectCategoryPresets.map(preset => {
                            const isSelected = currentProject.category === preset.value;
                            return (
                              <button
                                key={preset.value}
                                type="button"
                                className={`cat-choice-pill ${isSelected ? 'active' : ''}`}
                                onClick={() => setCurrentProject(prev => ({ ...prev, category: preset.value }))}
                              >
                                <span>{preset.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="custom-category-input-row" style={{ marginTop: '0.65rem' }}>
                          <input 
                            type="text" 
                            value={currentProject.category || ''} 
                            onChange={e => setCurrentProject(prev => ({ ...prev, category: e.target.value }))} 
                            placeholder="O escribe una categoría personalizada (ej: Full-Stack Web App)..."
                            className="custom-cat-input"
                          />
                        </div>
                      </div>

                      {/* IMAGEN Y PORTADA DEL PROYECTO */}
                      <div className="form-section highlight project-image-section">
                        <label>Imagen de Portada del Proyecto</label>
                        <div className="project-image-box-grid">
                          <div className="project-cover-preview-box">
                            {currentProject.image_url ? (
                              <div className="project-cover-preview-wrapper">
                                <img src={currentProject.image_url} alt="Portada" className="project-cover-preview-img" />
                                <button 
                                  type="button" 
                                  className="btn-remove-cover"
                                  onClick={() => setCurrentProject(prev => ({ ...prev, image_url: '' }))}
                                  title="Eliminar portada"
                                >
                                  <X size={15} />
                                </button>
                              </div>
                            ) : (
                              <div className="project-cover-empty-placeholder">
                                <ImageIcon size={32} />
                                <span>Sin imagen de portada</span>
                              </div>
                            )}
                          </div>

                          <div className="project-cover-inputs-col">
                            {/* Subir archivo */}
                            <label className="btn-upload-cover-file">
                              <Upload size={16} />
                              <span>{isUploading ? 'Subiendo imagen a Supabase...' : 'Subir Imagen desde el Equipo'}</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleProjectImageUpload} 
                                disabled={isUploading} 
                                hidden 
                              />
                            </label>

                            {/* O ingresar URL directa */}
                            <div className="project-cover-url-row">
                              <span className="cover-url-label">O pega un enlace directo de imagen (HTTPS):</span>
                              <input 
                                type="url" 
                                value={currentProject.image_url || ''} 
                                onChange={e => setCurrentProject(prev => ({ ...prev, image_url: e.target.value }))}
                                placeholder="https://images.unsplash.com/... o URL de Supabase" 
                                className="project-cover-url-input"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Presets Rápidos de Portadas */}
                        <div className="curated-covers-row" style={{ marginTop: '0.85rem' }}>
                          <span className="curated-covers-label">Sugerencias rápidas de portadas:</span>
                          <div className="curated-covers-list">
                            {curatedCovers.map((cov, cIdx) => (
                              <button
                                key={cIdx}
                                type="button"
                                className="curated-cover-btn"
                                onClick={() => setCurrentProject(prev => ({ ...prev, image_url: cov.url }))}
                              >
                                <span>{cov.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* STACK TECNOLÓGICO INTERACTIVO */}
                      <div className="form-section project-stack-section">
                        <div className="stack-header-row">
                          <label>Stack Tecnológico del Proyecto</label>
                          <span className="stack-hint">Haz clic en los tags para agregarlos o escribe uno nuevo</span>
                        </div>

                        {/* Tags Activos */}
                        <div className="active-stack-tags-box">
                          {stackList.length > 0 ? (
                            stackList.map((tag: string, tIdx: number) => (
                              <span key={tIdx} className="active-tag-chip">
                                <span>{tag}</span>
                                <button 
                                  type="button" 
                                  className="btn-remove-tag"
                                  onClick={() => toggleStackTag(tag)}
                                  title="Quitar tag"
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            ))
                          ) : (
                            <span className="no-tags-selected-hint">Ninguna tecnología seleccionada aún.</span>
                          )}
                        </div>

                        {/* Input para agregar tag personalizado */}
                        <div className="add-custom-tag-row">
                          <input 
                            type="text" 
                            value={customStackInput}
                            onChange={e => setCustomStackInput(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddCustomTag();
                              }
                            }}
                            placeholder="Escribe otra tecnología (ej: OpenCV, AWS S3, Chart.js) y pulsa Enter..."
                            className="custom-tag-input"
                          />
                          <button 
                            type="button" 
                            className="btn-add-custom-tag"
                            onClick={handleAddCustomTag}
                          >
                            <Plus size={15} />
                            <span>Añadir</span>
                          </button>
                        </div>

                        {/* Paleta Categorizada de Tecnologías */}
                        <div className="categorized-stack-groups">
                          {categorizedTags.map((grp, gIdx) => (
                            <div key={gIdx} className="stack-group-row">
                              <span className="stack-group-label">{grp.group}:</span>
                              <div className="stack-group-pills">
                                {grp.tags.map(tech => {
                                  const isSelected = stackList.some((t: string) => t.toLowerCase() === tech.toLowerCase());
                                  return (
                                    <button
                                      key={tech}
                                      type="button"
                                      className={`popular-tag-btn ${isSelected ? 'selected' : ''}`}
                                      onClick={() => toggleStackTag(tech)}
                                    >
                                      {isSelected ? <Check size={12} /> : <Plus size={12} />}
                                      <span>{tech}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ENLACES DEL PROYECTO (GITHUB & DEMO) */}
                      <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label>Repositorio en GitHub</label>
                          <div className="input-with-action-row">
                            <input 
                              type="url" 
                              value={currentProject.github_url || ''} 
                              onChange={e => setCurrentProject(prev => ({ ...prev, github_url: e.target.value }))} 
                              placeholder="https://github.com/JuanORTGA/..." 
                            />
                            {currentProject.github_url && (
                              <a 
                                href={currentProject.github_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-test-link"
                                title="Probar link de GitHub"
                              >
                                <ExternalLink size={15} />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="form-group" style={{ flex: 1 }}>
                          <label>Demo en Vivo / Despliegue</label>
                          <div className="input-with-action-row">
                            <input 
                              type="url" 
                              value={currentProject.live_url || ''} 
                              onChange={e => setCurrentProject(prev => ({ ...prev, live_url: e.target.value }))} 
                              placeholder="https://midemo.com..." 
                            />
                            {currentProject.live_url && (
                              <a 
                                href={currentProject.live_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-test-link live"
                                title="Abrir Demo en Vivo"
                              >
                                <Globe size={15} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* VISTA PREVIA EN VIVO DE LA TARJETA EN LA LANDING */}
                      <div className="live-preview-box project-live-preview-box">
                        <div className="live-preview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>Vista Previa en Vivo de la Tarjeta en la Landing</span>
                          <div className="preview-lang-switch">
                            <button 
                              type="button" 
                              className={`preview-lang-btn ${langTab === 'es' ? 'active' : ''}`}
                              onClick={() => setLangTab('es')}
                            >
                              ES
                            </button>
                            <button 
                              type="button" 
                              className={`preview-lang-btn ${langTab === 'en' ? 'active' : ''}`}
                              onClick={() => setLangTab('en')}
                            >
                              EN
                            </button>
                            <button 
                              type="button" 
                              className={`preview-lang-btn ${langTab === 'et' ? 'active' : ''}`}
                              onClick={() => setLangTab('et')}
                            >
                              ET
                            </button>
                          </div>
                        </div>
                        <div className="project-live-card-body">
                          <div className="project-live-cover-col">
                            {currentProject.image_url ? (
                              <img src={currentProject.image_url} alt="Cover Preview" className="project-live-cover-img" />
                            ) : (
                              <div className="project-live-cover-fallback">
                                <FolderCode size={30} />
                              </div>
                            )}
                            <span className="project-live-cat-badge">{currentProject.category || 'Full-Stack'}</span>
                          </div>

                          <div className="project-live-info-col">
                            <h4 className="project-live-title">
                              {(currentProject as any)[`title_${langTab}`] || currentProject.title_es || 'Título del Proyecto'}
                            </h4>
                            <p className="project-live-desc">
                              {(currentProject as any)[`description_short_${langTab}`] || currentProject.description_short_es || 'Descripción breve del proyecto en el idioma seleccionado.'}
                            </p>
                            <div className="project-live-stack-chips">
                              {stackList.length > 0 ? (
                                stackList.slice(0, 4).map((tech: string, i: number) => (
                                  <span key={i} className="project-live-tag">
                                    {tech}
                                  </span>
                                ))
                              ) : (
                                <span className="project-live-no-tags">Sin stack asignado</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsProjectModalOpen(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary" disabled={isUploading}><Save size={18} /> Guardar Proyecto</button>
                      </div>
                    </form>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skill Modal */}
      {/* Skill Modal Mejorado & Con Selector de Logos */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div className="modal-overlay" onClick={() => setIsSkillModalOpen(false)}>
            <motion.div className="modal-content glass skill-editor-modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}>
              {(() => {
                const currentLogoUrl = getTechLogoUrl(currentSkill.icon || currentSkill.name);
                const currentPreset = techPresetsList.find(p => p.id === (currentSkill.icon || '').toLowerCase() || p.name.toLowerCase() === currentSkill.name.toLowerCase());
                const brandColor = currentPreset?.color || '#0072ce';

                return (
                  <>
                    <div className="modal-header">
                      <div className="content-modal-header-title">
                        <div>
                          <span className="module-section-kicker" style={{ display: 'block', marginBottom: '0.2rem' }}>
                            // STACK & TECNOLOGÍAS
                          </span>
                          <h2>{currentSkill.id ? `Editar: ${currentSkill.name || 'Tecnología'}` : 'Nueva Tecnología / Stack'}</h2>
                          <span className="modal-subtitle">
                            Selecciona el logo oficial, categoría y orden de visualización en la landing
                          </span>
                        </div>
                      </div>
                      <button className="modal-close-btn" onClick={() => setIsSkillModalOpen(false)} title="Cerrar modal" aria-label="Cerrar modal"><X size={18} /></button>
                    </div>

                    <form onSubmit={saveSkill} className="admin-form content-form">
                      {/* HERRAMIENTA 1: SELECTOR VISUAL DE LOGOS OFICIALES */}
                      <div className="form-section-card">
                        <div className="logo-picker-header">
                          <div className="logo-picker-top">
                            <label className="logo-picker-title">Seleccionar Logo Oficial de Tecnología</label>
                            <span className="logo-picker-sub">Haz clic en un logo para autocompletar nombre, icono y categoría</span>
                          </div>

                          {/* Buscador de Logos en Vivo */}
                          <div className="logo-search-box">
                            <input 
                              type="text" 
                              value={logoSearchQuery}
                              onChange={e => setLogoSearchQuery(e.target.value)}
                              placeholder="🔍 Buscar tecnología... (ej: YOLO, Roboflow, Django, Python, React, Postgres)"
                              className="logo-search-input"
                            />
                            {logoSearchQuery && (
                              <button type="button" className="logo-search-clear" onClick={() => setLogoSearchQuery('')}>✕</button>
                            )}
                          </div>

                          {/* Pestañas de Filtro por Categoría de Logos */}
                          <div className="logo-group-filter-pills">
                            {techGroups.map(grp => (
                              <button
                                key={grp.id}
                                type="button"
                                className={`logo-grp-btn ${selectedLogoGroup === grp.id ? 'active' : ''}`}
                                onClick={() => setSelectedLogoGroup(grp.id)}
                              >
                                {grp.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Cuadrícula de Logos Filtrados */}
                        <div className="tech-logos-palette-grid">
                          {techPresetsList
                            .filter(preset => {
                              const matchGroup = selectedLogoGroup === 'all' || preset.group === selectedLogoGroup;
                              const q = logoSearchQuery.toLowerCase().trim();
                              const matchSearch = !q || 
                                preset.name.toLowerCase().includes(q) || 
                                preset.id.toLowerCase().includes(q) || 
                                preset.category.toLowerCase().includes(q);
                              return matchGroup && matchSearch;
                            })
                            .map(preset => {
                              const isSelected = (currentSkill.icon || '').toLowerCase() === preset.id || currentSkill.name.toLowerCase() === preset.name.toLowerCase();
                              return (
                                <button
                                  key={preset.id}
                                  type="button"
                                  className={`logo-preset-pill ${isSelected ? 'active' : ''}`}
                                  style={isSelected ? { borderColor: preset.color, background: `${preset.color}25` } : {}}
                                  onClick={() => {
                                    // Asignación automática instantánea de Nombre, Icono y Categoría
                                    setCurrentSkill(prev => ({
                                      ...prev,
                                      name: preset.name,
                                      icon: preset.id,
                                      category: preset.category
                                    }));
                                  }}
                                  title={`Seleccionar ${preset.name} (Categoría: ${preset.category})`}
                                >
                                  <img src={preset.svgIcon} alt={preset.name} className="preset-mini-logo" />
                                  <span className="preset-pill-name">{preset.name.split(' ')[0]}</span>
                                </button>
                              );
                            })}
                        </div>

                        {/* Input secundario para URL personalizada de logo */}
                        <div className="custom-logo-url-row">
                          <label className="custom-url-label">O ingresa URL de logo personalizado (SVG / PNG):</label>
                          <input 
                            type="text" 
                            value={currentSkill.icon || ''} 
                            onChange={e => setCurrentSkill(prev => ({ ...prev, icon: e.target.value }))} 
                            placeholder="Ej: https://midominio.com/logo.svg o id de preset (ej: yolo, roboflow, django, python)" 
                            className="custom-url-input"
                          />
                        </div>
                      </div>

                      {/* DATOS DE LA TECNOLOGÍA */}
                      <div className="form-group">
                        <label>Nombre de la Tecnología / Herramienta *</label>
                        <input 
                          type="text" 
                          value={currentSkill.name} 
                          onChange={e => setCurrentSkill(prev => ({ ...prev, name: e.target.value }))} 
                          required 
                          placeholder="Ej: YOLO (Ultralytics), Roboflow, Django & DRF, Python, React 18" 
                        />
                      </div>
                      
                      <div className="form-row">
                        {/* Campo de Categoría Editable con Botón Desplegable */}
                        <div className="form-group custom-category-dropdown-group" style={{ flex: 1.4, position: 'relative' }}>
                          <div className="cat-label-row">
                            <label>Categoría de la Tecnología *</label>
                            <span className="cat-auto-hint">Auto-asociada al logo oficial o personalizable</span>
                          </div>

                          <div className="cat-combobox-wrapper">
                            <input 
                              type="text" 
                              value={currentSkill.category || ''} 
                              onChange={e => setCurrentSkill(prev => ({ ...prev, category: e.target.value }))} 
                              placeholder="Ej: Computer Vision & AI, Backend Frameworks, Frontend & UI..." 
                              className="cat-editable-input"
                              required
                            />
                            <button 
                              type="button" 
                              className={`btn-toggle-cat-dropdown ${isCategoryDropdownOpen ? 'open' : ''}`}
                              onClick={() => setIsCategoryDropdownOpen(prev => !prev)}
                              title="Desplegar lista de categorías predefinidas"
                            >
                              <ChevronDown size={17} />
                            </button>
                          </div>

                          {/* Menú Desplegable Flotante de Categorías */}
                          {isCategoryDropdownOpen && (
                            <div className="category-dropdown-menu">
                              <div className="cat-dropdown-search" onClick={e => e.stopPropagation()}>
                                <input 
                                  type="text" 
                                  value={categorySearchQuery}
                                  onChange={e => setCategorySearchQuery(e.target.value)}
                                  placeholder="Filtrar categorías predefinidas..."
                                  className="cat-search-input"
                                  autoFocus
                                />
                              </div>

                              {/* Lista de Categorías Agrupadas */}
                              <div className="cat-dropdown-items-scroll">
                                {Array.from(new Set(skillCategoriesList.map(c => c.group))).map(groupName => {
                                  const items = skillCategoriesList.filter(c => 
                                    c.group === groupName && 
                                    (!categorySearchQuery || c.label.toLowerCase().includes(categorySearchQuery.toLowerCase()) || c.value.toLowerCase().includes(categorySearchQuery.toLowerCase()))
                                  );

                                  if (items.length === 0) return null;

                                  return (
                                    <div key={groupName} className="cat-group-section">
                                      <div className="cat-group-header">{groupName}</div>
                                      {items.map(cat => {
                                        const isSelected = currentSkill.category === cat.value || currentSkill.category === cat.label;
                                        return (
                                          <div
                                            key={cat.value}
                                            className={`cat-dropdown-item ${isSelected ? 'selected' : ''}`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setCurrentSkill(prev => ({ ...prev, category: cat.value }));
                                              setIsCategoryDropdownOpen(false);
                                              setCategorySearchQuery('');
                                            }}
                                          >
                                            <div className="cat-item-left">
                                              <span className="cat-item-icon">{cat.icon}</span>
                                              <span className="cat-item-label">{cat.label}</span>
                                            </div>
                                            {isSelected && <Check size={14} className="cat-item-check" />}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="form-group" style={{ flex: 0.8 }}>
                          <label>Orden de Posición</label>
                          <input 
                            type="number" 
                            min="1"
                            max="99"
                            value={currentSkill.order || 1} 
                            onChange={e => setCurrentSkill(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))} 
                          />
                        </div>
                      </div>

                      {/* VISTA PREVIA EN VIVO DE LA TARJETA */}
                      <div className="live-preview-box skill-live-preview-box" style={{ borderColor: `${brandColor}40` }}>
                        <div className="live-preview-header">
                          <span>Vista Previa en Vivo de la Tarjeta</span>
                        </div>
                        <div className="skill-live-card-body">
                          <div className="skill-live-logo-box" style={{ borderColor: `${brandColor}50`, boxShadow: `0 0 20px ${brandColor}25` }}>
                            <img src={currentLogoUrl} alt={currentSkill.name || 'Logo'} className="skill-live-logo-img" />
                          </div>
                          <div className="skill-live-details">
                            <h4 className="skill-live-name">{currentSkill.name || 'Nombre de la Tecnología'}</h4>
                            <div className="skill-live-badges">
                              <span className="skill-live-cat" style={{ color: brandColor, borderColor: `${brandColor}40`, background: `${brandColor}15` }}>
                                {currentSkill.category || 'Categoría'}
                              </span>
                              <span className="skill-live-tier">
                                {currentPreset?.tier || 'Stack Principal'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsSkillModalOpen(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary"><Save size={18} /> Guardar Tecnología</button>
                      </div>
                    </form>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Experience Modal Studio & Editor Ejecutivo */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div className="modal-overlay" onClick={() => setIsExpModalOpen(false)}>
            <motion.div 
              className="modal-content glass exp-editor-modal" 
              onClick={e => e.stopPropagation()} 
              initial={{ opacity: 0, scale: 0.92 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.92 }}
              style={{ maxWidth: '820px' }}
            >
              {(() => {
                const roleEs = currentExp.role_es || '';
                const descEs = currentExp.description_es || '';
                const activeRole = (currentExp as any)[`role_${langTab}`] || '';
                const activeDesc = (currentExp as any)[`description_${langTab}`] || '';
                
                const parseStack = (rawStack: any): string[] => {
                  if (Array.isArray(rawStack)) return rawStack;
                  if (typeof rawStack === 'string') {
                    try {
                      if (rawStack.trim().startsWith('[')) return JSON.parse(rawStack);
                      return rawStack.split(',').map((s: string) => s.trim()).filter(Boolean);
                    } catch {
                      return [rawStack];
                    }
                  }
                  return [];
                };

                const currentStack = parseStack(currentExp.stack);

                const popularTechPresets = [
                  'Django', 'React', 'PostgreSQL', 'Python', 'TypeScript', 'Docker',
                  'REST APIs', 'Supabase', 'MySQL', 'FastAPI', 'Node.js', 'Redis',
                  'Tailwind CSS', 'SQL Tuning', 'RBAC', 'Data Encryption', 'Git'
                ];

                const companyLogoPresets = [
                  { label: 'Sector Público / Estatal', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=200&q=80' },
                  { label: 'Sector Salud / MedTech', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80' },
                  { label: 'Startup Tecnológica', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80' },
                  { label: 'Consultoría / Digital', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80' },
                  { label: 'Software House / SaaS', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80' },
                ];

                const addTechToStack = (tech: string) => {
                  const trimmed = tech.trim();
                  if (!trimmed) return;
                  if (!currentStack.includes(trimmed)) {
                    setCurrentExp(prev => ({
                      ...prev,
                      stack: [...currentStack, trimmed]
                    }));
                  }
                  setExpCustomStackInput('');
                };

                const removeTechFromStack = (tech: string) => {
                  setCurrentExp(prev => ({
                    ...prev,
                    stack: currentStack.filter(t => t !== tech)
                  }));
                };

                return (
                  <>
                    <div className="modal-header">
                      <div className="content-modal-header-title">
                        <div>
                          <span className="module-section-kicker" style={{ display: 'block', marginBottom: '0.2rem' }}>
                            // TRAYECTORIA LABORAL
                          </span>
                          <h2>{currentExp.id ? (currentExp.company ? `Editar: ${currentExp.company}` : 'Editar Trayectoria') : 'Nueva Experiencia Profesional'}</h2>
                          <span className="modal-subtitle">
                            Configuración ejecutiva de trayectoria profesional y logros técnicos
                          </span>
                        </div>
                      </div>
                      <button className="modal-close-btn" onClick={() => setIsExpModalOpen(false)} title="Cerrar modal" aria-label="Cerrar modal"><X size={18} /></button>
                    </div>

                    <form onSubmit={saveExperience} className="admin-form content-form">
                      {/* Bloque 1: Empresa, Logo y Ubicación */}
                      <div className="form-section-card">
                        <h4 className="form-section-title">Datos de la Organización & Identidad Visual</h4>
                        
                        <div className="form-row">
                          <div className="form-group" style={{ flex: 1.3 }}>
                            <label>Empresa u Organización *</label>
                            <input 
                              type="text" 
                              value={currentExp.company} 
                              onChange={e => setCurrentExp(prev => ({ ...prev, company: e.target.value }))} 
                              required 
                              placeholder="Ej: Instituto Nacional de Tierras (INTI)" 
                            />
                          </div>

                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Ubicación Geográfica</label>
                            <input 
                              type="text" 
                              value={currentExp.location || ''} 
                              onChange={e => setCurrentExp(prev => ({ ...prev, location: e.target.value }))} 
                              placeholder="Ej: Caracas, Venezuela o Tallinn, Estonia" 
                            />
                          </div>
                        </div>

                        {/* Logo de la Empresa / Organización */}
                        <div className="form-group" style={{ marginTop: '0.5rem' }}>
                          <label>Logo de la Empresa (Imagen o Avatar)</label>
                          <div className="exp-logo-input-row" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {/* Preview del Logo */}
                            <div 
                              className="exp-admin-logo-preview"
                              style={{
                                width: '54px',
                                height: '54px',
                                borderRadius: '0.85rem',
                                background: 'rgba(0, 114, 206, 0.08)',
                                border: '1px solid rgba(0, 114, 206, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0
                              }}
                            >
                              {currentExp.company_logo ? (
                                <img 
                                  src={currentExp.company_logo} 
                                  alt="Logo" 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              ) : (
                                <Building2 size={24} color="#0072ce" />
                              )}
                            </div>

                            {/* Inputs de Subida / URL */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input 
                                  type="text" 
                                  value={currentExp.company_logo || ''} 
                                  onChange={e => setCurrentExp(prev => ({ ...prev, company_logo: e.target.value }))} 
                                  placeholder="https://... URL de logo o subir archivo" 
                                  style={{ flex: 1 }}
                                />
                                <label className="btn-upload-action">
                                  <Upload size={14} /> Subir Logo
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleCompanyLogoUpload} 
                                    style={{ display: 'none' }} 
                                    disabled={isUploading}
                                  />
                                </label>
                                {currentExp.company_logo && (
                                  <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setCurrentExp(prev => ({ ...prev, company_logo: '' }))}
                                    title="Quitar logo"
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </div>

                              {/* Presets Rápidos de Logo */}
                              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Presets rápidos:</span>
                                {companyLogoPresets.map((preset, pIdx) => (
                                  <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => setCurrentExp(prev => ({ ...prev, company_logo: preset.url }))}
                                    className="exp-preset-chip"
                                  >
                                    {preset.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Modalidad de Trabajo & Tipo de Empleo */}
                        <div className="form-row" style={{ marginTop: '0.75rem' }}>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Tipo de Empleo</label>
                            <select 
                              value={currentExp.employment_type || 'Jornada completa'}
                              onChange={e => setCurrentExp(prev => ({ ...prev, employment_type: e.target.value }))}
                              className="admin-select"
                            >
                              <option value="Jornada completa">Jornada completa (Full-time)</option>
                              <option value="Jornada parcial">Jornada parcial (Part-time)</option>
                              <option value="Contrato institucional">Contrato institucional</option>
                              <option value="Freelance / Consultoría">Freelance / Consultoría</option>
                              <option value="Pasantía / Prácticas">Pasantía / Prácticas</option>
                            </select>
                          </div>

                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Modalidad de Trabajo</label>
                            <select 
                              value={currentExp.work_mode || 'Presencial'}
                              onChange={e => setCurrentExp(prev => ({ ...prev, work_mode: e.target.value }))}
                              className="admin-select"
                            >
                              <option value="Presencial">Presencial (On-site)</option>
                              <option value="Remoto">Remoto (Remote)</option>
                              <option value="Híbrido">Híbrido (Hybrid)</option>
                            </select>
                          </div>
                        </div>

                        {/* Período de Tiempo */}
                        <div className="form-row" style={{ alignItems: 'flex-end', marginTop: '0.5rem' }}>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Fecha de Inicio</label>
                            <input 
                              type="text" 
                              placeholder="Ej: 2025 o Ene 2025" 
                              value={currentExp.start_date} 
                              onChange={e => setCurrentExp(prev => ({ ...prev, start_date: e.target.value }))} 
                              required
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Fecha de Fin</label>
                            <input 
                              type="text" 
                              placeholder={currentExp.is_current ? 'Presente' : 'Ej: 2026 o Dic 2025'} 
                              value={currentExp.is_current ? 'Presente' : (currentExp.end_date || '')} 
                              onChange={e => setCurrentExp(prev => ({ ...prev, end_date: e.target.value }))} 
                              disabled={currentExp.is_current} 
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1.1, paddingBottom: '0.4rem' }}>
                            <label className="checkbox-custom-card">
                              <input 
                                type="checkbox" 
                                checked={currentExp.is_current} 
                                onChange={e => setCurrentExp(prev => ({ 
                                  ...prev, 
                                  is_current: e.target.checked,
                                  end_date: e.target.checked ? null : prev.end_date 
                                }))} 
                              />
                              <span className="checkbox-label-txt">Puesto actual en curso</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Bloque 2: Pestañas de Idioma */}
                      <div className="lang-tabs-container">
                        <div className="lang-tabs-header">
                          <span className="lang-tabs-label">Idioma del Cargo & Responsabilidades:</span>
                          <div className="lang-pills-row">
                            {[
                              { code: 'es', label: 'ES', name: 'Español' },
                              { code: 'en', label: 'EN', name: 'English' },
                              { code: 'et', label: 'ET', name: 'Eesti keel' },
                            ].map(l => {
                              const isFilled = Boolean(
                                ((currentExp as any)[`role_${l.code}`] || '').trim() &&
                                ((currentExp as any)[`description_${l.code}`] || '').trim()
                              );
                              return (
                                <button
                                  key={l.code}
                                  type="button"
                                  className={`lang-modal-tab ${langTab === l.code ? 'active' : ''}`}
                                  onClick={() => setLangTab(l.code as any)}
                                >
                                  <span className="lang-code-pill">{l.label}</span>
                                  <span>{l.name}</span>
                                  <span className={`tab-check-badge ${isFilled ? 'filled' : 'empty'}`}>
                                    {isFilled ? '✓' : '—'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Botón de ayuda para copiar desde Español a EN/ET */}
                        {langTab !== 'es' && (roleEs || descEs) && (
                          <div className="copy-helper-bar">
                            <span>¿Deseas una base de traducción?</span>
                            <button
                              type="button"
                              className="copy-from-es-btn"
                              onClick={() => setCurrentExp(prev => ({ 
                                ...prev, 
                                [`role_${langTab}`]: (prev as any)[`role_${langTab}`] || roleEs,
                                [`description_${langTab}`]: (prev as any)[`description_${langTab}`] || descEs
                              }))}
                            >
                              Copiar rol y descripción desde Español
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Bloque 3: Cargo y Descripción */}
                      <div className="form-group">
                        <label>Cargo o Rol Profesional ({langTab.toUpperCase()}) *</label>
                        <input 
                          type="text" 
                          value={activeRole} 
                          onChange={e => setCurrentExp(prev => ({ ...prev, [`role_${langTab}`]: e.target.value }))} 
                          placeholder={langTab === 'es' ? 'Ej: Desarrollador Web Full-Stack' : langTab === 'en' ? 'Ej: Full-Stack Web Developer' : 'Ej: Full-Stack veebiarendaja'} 
                          required={langTab === 'es'}
                        />
                      </div>

                      <div className="form-group">
                        <div className="textarea-label-row">
                          <label>Descripción de Logros & Responsabilidades ({langTab.toUpperCase()})</label>
                          <span className="char-count">{activeDesc.length} caracteres</span>
                        </div>
                        <textarea 
                          rows={3} 
                          value={activeDesc} 
                          onChange={e => setCurrentExp(prev => ({ ...prev, [`description_${langTab}`]: e.target.value }))} 
                          placeholder={`Detalla las tecnologías utilizadas, arquitectura desarrollada y optimizaciones logradas en ${langTab === 'es' ? 'Español' : langTab === 'en' ? 'Inglés' : 'Estonio'}...`}
                          className="content-main-textarea"
                        />
                      </div>

                      {/* Bloque 4: Tecnologías & Skills Aplicadas */}
                      <div className="form-section-card" style={{ marginTop: '1rem' }}>
                        <h4 className="form-section-title">⚡ Tecnologías & Herramientas Aplicadas en el Puesto</h4>
                        
                        {/* Chips seleccionados */}
                        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', minHeight: '36px', alignItems: 'center', marginBottom: '0.75rem' }}>
                          {currentStack.length > 0 ? (
                            currentStack.map((tech, tIdx) => (
                              <span 
                                key={tIdx} 
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  background: 'rgba(0, 114, 206, 0.08)',
                                  border: '1px solid rgba(0, 114, 206, 0.25)',
                                  color: '#0072ce',
                                  padding: '0.25rem 0.65rem',
                                  borderRadius: '0.45rem',
                                  fontSize: '0.78rem',
                                  fontWeight: 600
                                }}
                              >
                                {tech}
                                <button
                                  type="button"
                                  onClick={() => removeTechFromStack(tech)}
                                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, display: 'flex' }}
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            ))
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                              Selecciona o escribe tecnologías para asociar a este puesto laboral...
                            </span>
                          )}
                        </div>

                        {/* Input personalizada */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input 
                            type="text" 
                            value={expCustomStackInput} 
                            onChange={e => setExpCustomStackInput(e.target.value)} 
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addTechToStack(expCustomStackInput);
                              }
                            }}
                            placeholder="Escribe una tecnología (Ej: React, Python, PostgreSQL, Docker) y presiona Enter..."
                            style={{ flex: 1 }}
                          />
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => addTechToStack(expCustomStackInput)}
                          >
                            <Plus size={14} /> Agregar Tag
                          </button>
                        </div>
                      </div>

                      {/* Bloque 5: Vista Previa en Vivo de la Tarjeta LinkedIn */}
                      <div className="live-preview-box exp-preview-timeline" style={{ marginTop: '1.25rem', background: '#070d18', border: '1px solid rgba(0, 114, 206, 0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
                        <div className="live-preview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.6rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0072ce' }}>👁️ Vista Previa en Vivo ({langTab.toUpperCase()})</span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Estilo LinkedIn Directo</span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          {/* Logo en preview 48x48 */}
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', background: '#070d18', border: '1px solid rgba(0, 114, 206, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {currentExp.company_logo ? (
                              <img src={currentExp.company_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                            ) : null}
                            <Building2 size={22} color="#0072ce" />
                          </div>

                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.08rem', color: '#ffffff', fontWeight: 700, lineHeight: 1.3 }}>
                              {activeRole || 'Senior Software Engineer'}
                            </h4>

                            <div style={{ fontSize: '0.92rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                              <span>{currentExp.company || 'Empresa / Organización'}</span>
                              <span style={{ color: '#94a3b8' }}>·</span>
                              <span style={{ color: '#475569' }}>{currentExp.employment_type || 'Jornada completa'}</span>
                            </div>

                            <div style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '0.1rem' }}>
                              <span>{currentExp.start_date || 'ene. 2025'} - {currentExp.is_current ? 'actualidad' : (currentExp.end_date || 'actualidad')}</span>
                            </div>

                            {(currentExp.location || currentExp.work_mode) && (
                              <div style={{ fontSize: '0.84rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                {currentExp.location && <span>{currentExp.location}</span>}
                                {currentExp.location && currentExp.work_mode && <span style={{ color: '#cbd5e1' }}>·</span>}
                                {currentExp.work_mode && <span>{currentExp.work_mode}</span>}
                              </div>
                            )}

                            {activeDesc && (
                              <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {activeDesc.split('\n').filter(Boolean).map((line: string, lIdx: number) => (
                                  <p key={lIdx} style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                                    {line.startsWith('-') ? line : `- ${line}`}
                                  </p>
                                ))}
                              </div>
                            )}

                            {currentStack.length > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.6rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                                <span style={{ color: '#0072ce' }}>💎</span>
                                <span style={{ fontWeight: 600, color: '#38bdf8' }}>{currentStack.slice(0, 3).join(', ')}</span>
                                {currentStack.length > 3 && (
                                  <span style={{ color: '#64748b' }}>y {currentStack.length - 3} aptitudes más</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsExpModalOpen(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary"><Save size={18} /> Guardar Experiencia</button>
                      </div>
                    </form>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Education & Certifications Modal Studio */}
      <AnimatePresence>
        {isEduModalOpen && (
          <div className="modal-overlay" onClick={() => setIsEduModalOpen(false)}>
            <motion.div 
              className="modal-content glass edu-editor-modal" 
              onClick={e => e.stopPropagation()} 
              initial={{ opacity: 0, scale: 0.92 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.92 }}
              style={{ maxWidth: '820px' }}
            >
              {(() => {
                const degreeEs = currentEdu.degree_es || '';
                const descEs = currentEdu.description_es || '';
                const activeDegree = (currentEdu as any)[`degree_${langTab}`] || '';
                const activeDesc = (currentEdu as any)[`description_${langTab}`] || '';
                
                const parseStack = (rawStack: any): string[] => {
                  if (Array.isArray(rawStack)) return rawStack;
                  if (typeof rawStack === 'string') {
                    try {
                      if (rawStack.trim().startsWith('[')) return JSON.parse(rawStack);
                      return rawStack.split(',').map((s: string) => s.trim()).filter(Boolean);
                    } catch {
                      return [rawStack];
                    }
                  }
                  return [];
                };

                const currentStack = parseStack(currentEdu.stack);

                const eduPresets = [
                  { label: 'Universidad / Grado', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80' },
                  { label: 'Certificación Profesional', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80' },
                  { label: 'Bootcamp Tecnológico', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=200&q=80' },
                  { label: 'Cloud & DevOps Cert', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80' },
                ];

                const addTechToStack = (tech: string) => {
                  const trimmed = tech.trim();
                  if (!trimmed) return;
                  if (!currentStack.includes(trimmed)) {
                    setCurrentEdu(prev => ({
                      ...prev,
                      stack: [...currentStack, trimmed]
                    }));
                  }
                  setEduCustomStackInput('');
                };

                const removeTechFromStack = (tech: string) => {
                  setCurrentEdu(prev => ({
                    ...prev,
                    stack: currentStack.filter(t => t !== tech)
                  }));
                };

                return (
                  <>
                    <div className="modal-header">
                      <div className="content-modal-header-title">
                        <div>
                          <span className="module-section-kicker" style={{ display: 'block', marginBottom: '0.2rem' }}>
                            // FORMACIÓN ACADÉMICA
                          </span>
                          <h2>{currentEdu.id ? (currentEdu.institution ? `Editar: ${currentEdu.institution}` : 'Editar Educación') : 'Nuevo Estudio o Certificación'}</h2>
                          <span className="modal-subtitle">
                            Títulos académicos, certificaciones de software y bootcamps estilo LinkedIn
                          </span>
                        </div>
                      </div>
                      <button className="modal-close-btn" onClick={() => setIsEduModalOpen(false)} title="Cerrar modal" aria-label="Cerrar modal"><X size={18} /></button>
                    </div>

                    <form onSubmit={saveEducation} className="admin-form content-form">
                      {/* Bloque 1: Institución y Logo */}
                      <div className="form-section-card">
                        <h4 className="form-section-title">Institución Académica & Credencial</h4>
                        
                        <div className="form-row">
                          <div className="form-group" style={{ flex: 1.3 }}>
                            <label>Universidad o Academia *</label>
                            <input 
                              type="text" 
                              value={currentEdu.institution} 
                              onChange={e => setCurrentEdu(prev => ({ ...prev, institution: e.target.value }))} 
                              required 
                              placeholder="Ej: Universidad de Carabobo / Platzi / Coursera / AWS" 
                            />
                          </div>

                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Disciplina o Especialidad</label>
                            <input 
                              type="text" 
                              value={currentEdu.field_of_study || ''} 
                              onChange={e => setCurrentEdu(prev => ({ ...prev, field_of_study: e.target.value }))} 
                              placeholder="Ej: Computación, Cloud, Desarrollo Web" 
                            />
                          </div>
                        </div>

                        {/* Logo de la Institución */}
                        <div className="form-group" style={{ marginTop: '0.5rem' }}>
                          <label>Logo de la Institución o Sello de Certificación</label>
                          <div className="exp-logo-input-row" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div 
                              style={{
                                width: '54px',
                                height: '54px',
                                borderRadius: '0.85rem',
                                background: 'rgba(0, 114, 206, 0.08)',
                                border: '1px solid rgba(0, 114, 206, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flexShrink: 0
                              }}
                            >
                              {currentEdu.institution_logo ? (
                                <img 
                                  src={currentEdu.institution_logo} 
                                  alt="Logo" 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                                />
                              ) : (
                                <GraduationCap size={24} color="#0072ce" />
                              )}
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input 
                                  type="text" 
                                  value={currentEdu.institution_logo || ''} 
                                  onChange={e => setCurrentEdu(prev => ({ ...prev, institution_logo: e.target.value }))} 
                                  placeholder="https://... URL de logo o subir archivo" 
                                  style={{ flex: 1 }}
                                />
                                <label className="btn-upload-action">
                                  <Upload size={14} /> Subir Logo
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleEduLogoUpload} 
                                    style={{ display: 'none' }} 
                                    disabled={isUploading}
                                  />
                                </label>
                                {currentEdu.institution_logo && (
                                  <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setCurrentEdu(prev => ({ ...prev, institution_logo: '' }))}
                                    title="Quitar logo"
                                  >
                                    <X size={14} />
                                  </button>
                                )}
                              </div>

                              {/* Presets Rápidos */}
                              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Presets rápidos:</span>
                                {eduPresets.map((preset, pIdx) => (
                                  <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => setCurrentEdu(prev => ({ ...prev, institution_logo: preset.url }))}
                                    className="exp-preset-chip"
                                  >
                                    {preset.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ID y URL de Credencial */}
                        <div className="form-row" style={{ marginTop: '0.75rem' }}>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>ID de Credencial / Certificado</label>
                            <input 
                              type="text" 
                              value={currentEdu.credential_id || ''} 
                              onChange={e => setCurrentEdu(prev => ({ ...prev, credential_id: e.target.value }))} 
                              placeholder="Ej: UC-CS-2024-JO o CERT-9982" 
                            />
                          </div>

                          <div className="form-group" style={{ flex: 1.2 }}>
                            <label>Enlace Público de la Credencial</label>
                            <input 
                              type="url" 
                              value={currentEdu.credential_url || ''} 
                              onChange={e => setCurrentEdu(prev => ({ ...prev, credential_url: e.target.value }))} 
                              placeholder="https://... URL verificable del certificado" 
                            />
                          </div>
                        </div>

                        {/* Período de Tiempo */}
                        <div className="form-row" style={{ alignItems: 'flex-end', marginTop: '0.5rem' }}>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Fecha de Inicio</label>
                            <input 
                              type="text" 
                              placeholder="Ej: 2020 o ene. 2020" 
                              value={currentEdu.start_date} 
                              onChange={e => setCurrentEdu(prev => ({ ...prev, start_date: e.target.value }))} 
                              required
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1 }}>
                            <label>Fecha de Fin</label>
                            <input 
                              type="text" 
                              placeholder={currentEdu.is_current ? 'Presente' : 'Ej: 2024 o dic. 2024'} 
                              value={currentEdu.is_current ? 'Presente' : (currentEdu.end_date || '')} 
                              onChange={e => setCurrentEdu(prev => ({ ...prev, end_date: e.target.value }))} 
                              disabled={currentEdu.is_current} 
                            />
                          </div>
                          <div className="form-group" style={{ flex: 1.1, paddingBottom: '0.4rem' }}>
                            <label className="checkbox-custom-card">
                              <input 
                                type="checkbox" 
                                checked={currentEdu.is_current} 
                                onChange={e => setCurrentEdu(prev => ({ 
                                  ...prev, 
                                  is_current: e.target.checked,
                                  end_date: e.target.checked ? null : prev.end_date 
                                }))} 
                              />
                              <span className="checkbox-label-txt">Actualmente en curso</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Bloque 2: Pestañas de Idioma */}
                      <div className="lang-tabs-container">
                        <div className="lang-tabs-header">
                          <span className="lang-tabs-label">Idioma del Título & Descripción:</span>
                          <div className="lang-pills-row">
                            {[
                              { code: 'es', flag: '🇪🇸', name: 'Español' },
                              { code: 'en', flag: '🇬🇧', name: 'English' },
                              { code: 'et', flag: '🇪🇪', name: 'Eesti keel' },
                            ].map(l => {
                              const isFilled = Boolean(
                                ((currentEdu as any)[`degree_${l.code}`] || '').trim()
                              );
                              return (
                                <button
                                  key={l.code}
                                  type="button"
                                  className={`lang-modal-tab ${langTab === l.code ? 'active' : ''}`}
                                  onClick={() => setLangTab(l.code as any)}
                                >
                                  <span>{l.flag}</span>
                                  <span>{l.name}</span>
                                  <span className={`tab-check-badge ${isFilled ? 'filled' : 'empty'}`}>
                                    {isFilled ? '✓' : '—'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Botón de ayuda para copiar desde Español */}
                        {langTab !== 'es' && (degreeEs || descEs) && (
                          <div className="copy-helper-bar">
                            <span>¿Deseas una base de traducción?</span>
                            <button
                              type="button"
                              className="copy-from-es-btn"
                              onClick={() => setCurrentEdu(prev => ({ 
                                ...prev, 
                                [`degree_${langTab}`]: (prev as any)[`degree_${langTab}`] || degreeEs,
                                [`description_${langTab}`]: (prev as any)[`description_${langTab}`] || descEs
                              }))}
                            >
                              Copiar título y descripción desde Español
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Bloque 3: Título y Descripción */}
                      <div className="form-group">
                        <label>Título o Certificado Obtenido ({langTab.toUpperCase()}) *</label>
                        <input 
                          type="text" 
                          value={activeDegree} 
                          onChange={e => setCurrentEdu(prev => ({ ...prev, [`degree_${langTab}`]: e.target.value }))} 
                          placeholder={langTab === 'es' ? 'Ej: Ingeniería de Sistemas / Informática' : langTab === 'en' ? 'Ej: Computer Science / Systems Engineering' : 'Ej: Arvutisüsteemide insener'} 
                          required={langTab === 'es'}
                        />
                      </div>

                      <div className="form-group">
                        <div className="textarea-label-row">
                          <label>Descripción / Aprendizajes Clave ({langTab.toUpperCase()})</label>
                          <span className="char-count">{activeDesc.length} caracteres</span>
                        </div>
                        <textarea 
                          rows={3} 
                          value={activeDesc} 
                          onChange={e => setCurrentEdu(prev => ({ ...prev, [`description_${langTab}`]: e.target.value }))} 
                          placeholder={`Detalla las materias, proyectos y competencias desarrolladas en ${langTab === 'es' ? 'Español' : langTab === 'en' ? 'Inglés' : 'Estonio'}...`}
                          className="content-main-textarea"
                        />
                      </div>

                      {/* Bloque 4: Competencias Adquiridas */}
                      <div className="form-section-card" style={{ marginTop: '1rem' }}>
                        <h4 className="form-section-title">Competencias & Tecnologías Adquiridas</h4>
                        
                        {/* Chips seleccionados */}
                        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', minHeight: '36px', alignItems: 'center', marginBottom: '0.75rem' }}>
                          {currentStack.length > 0 ? (
                            currentStack.map((tech, tIdx) => (
                              <span 
                                key={tIdx} 
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  background: 'rgba(0, 114, 206, 0.08)',
                                  border: '1px solid rgba(0, 114, 206, 0.25)',
                                  color: '#0072ce',
                                  padding: '0.25rem 0.65rem',
                                  borderRadius: '0.45rem',
                                  fontSize: '0.78rem',
                                  fontWeight: 600
                                }}
                              >
                                {tech}
                                <button
                                  type="button"
                                  onClick={() => removeTechFromStack(tech)}
                                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 0, display: 'flex' }}
                                >
                                  <X size={12} />
                                </button>
                              </span>
                            ))
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                              Escribe o selecciona competencias desarrolladas en estos estudios...
                            </span>
                          )}
                        </div>

                        {/* Input personalizada */}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <input 
                            type="text" 
                            value={eduCustomStackInput} 
                            onChange={e => setEduCustomStackInput(e.target.value)} 
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addTechToStack(eduCustomStackInput);
                              }
                            }}
                            placeholder="Escribe una competencia (Ej: Python, Algoritmos, Docker, Cloud) y presiona Enter..."
                            style={{ flex: 1 }}
                          />
                          <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => addTechToStack(eduCustomStackInput)}
                          >
                            <Plus size={14} /> Agregar Tag
                          </button>
                        </div>
                      </div>

                      {/* Bloque 5: Vista Previa en Vivo */}
                      <div className="live-preview-box exp-preview-timeline" style={{ marginTop: '1.25rem', background: '#070d18', border: '1px solid rgba(0, 114, 206, 0.25)', borderRadius: '1rem', padding: '1.25rem' }}>
                        <div className="live-preview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.6rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0072ce' }}>Vista Previa en Vivo ({langTab.toUpperCase()})</span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Estilo LinkedIn Directo</span>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', background: '#070d18', border: '1px solid rgba(0, 114, 206, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {currentEdu.institution_logo ? (
                              <img src={currentEdu.institution_logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                            ) : null}
                            <GraduationCap size={22} color="#0072ce" />
                          </div>

                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.08rem', color: '#ffffff', fontWeight: 700, lineHeight: 1.3 }}>
                              {activeDegree || 'Título o Certificado Obtenido'}
                            </h4>

                            <div style={{ fontSize: '0.92rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                              <span>{currentEdu.institution || 'Institución Académica'}</span>
                              {currentEdu.field_of_study && (
                                <>
                                  <span style={{ color: '#94a3b8' }}>·</span>
                                  <span style={{ color: '#94a3b8' }}>{currentEdu.field_of_study}</span>
                                </>
                              )}
                            </div>
                            <div style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '0.1rem' }}>
                              <span>{currentEdu.start_date || '2020'} - {currentEdu.is_current ? 'actualidad' : (currentEdu.end_date || '2024')}</span>
                            </div>

                            {(currentEdu.credential_id || currentEdu.credential_url) && (
                              <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '0.2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {currentEdu.credential_id && <span style={{ color: '#64748b' }}>ID: {currentEdu.credential_id}</span>}
                                {currentEdu.credential_url && <span>🔗 Ver credencial</span>}
                              </div>
                            )}

                            {activeDesc && (
                              <div style={{ marginTop: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {activeDesc.split('\n').filter(Boolean).map((line: string, lIdx: number) => (
                                  <p key={lIdx} style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.55, margin: 0 }}>
                                    {line.startsWith('-') ? line : `- ${line}`}
                                  </p>
                                ))}
                              </div>
                            )}

                            {currentStack.length > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.6rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
                                <span style={{ color: '#0072ce' }}>💎</span>
                                <span style={{ fontWeight: 600, color: '#38bdf8' }}>{currentStack.slice(0, 3).join(', ')}</span>
                                {currentStack.length > 3 && (
                                  <span style={{ color: '#64748b' }}>y {currentStack.length - 3} aptitudes más</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsEduModalOpen(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary"><Save size={18} /> Guardar Estudio / Certificado</button>
                      </div>
                    </form>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content Modal Mejorado & Pulido */}
      <AnimatePresence>
        {isContentModalOpen && (
          <div className="modal-overlay" onClick={() => setIsContentModalOpen(false)}>
            <motion.div className="modal-content glass content-editor-modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}>
              {(() => {
                const meta = keyMetadata[currentContent.key];
                const contentEs = (currentContent as any).content_es || '';
                const activeContent = (currentContent as any)[`content_${langTab}`] || '';

                return (
                  <>
                    <div className="modal-header">
                      <div className="content-modal-header-title">
                        <div>
                          <span className="module-section-kicker" style={{ display: 'block', marginBottom: '0.2rem' }}>
                            // TEXTOS & COPYS
                          </span>
                          <h2>{currentContent.key ? (meta?.label || `Editar: ${currentContent.key}`) : 'Nuevo Texto para la Landing'}</h2>
                          <span className="modal-subtitle">
                            {meta?.sectionName ? `Sección: ${meta.sectionName}` : 'Personalización de textos y copys trilingües'}
                          </span>
                        </div>
                      </div>
                      <button className="modal-close-btn" onClick={() => setIsContentModalOpen(false)} title="Cerrar modal" aria-label="Cerrar modal"><X size={18} /></button>
                    </div>

                    <form onSubmit={saveContent} className="admin-form content-form">
                      {/* Información y Clave Técnica */}
                      <div className="form-section-card">
                        <div className="form-group">
                          <label className="form-label-with-hint">
                            <span>Identificador de Clave (Key)</span>
                            <span className="label-helper">Identifica este elemento en el código de tu landing</span>
                          </label>
                          <input 
                            type="text" 
                            value={currentContent.key} 
                            onChange={e => setCurrentContent(prev => ({ ...prev, key: e.target.value }))} 
                            required 
                            placeholder="ej: hero_title, vision_desc, cta_title" 
                            className="key-code-input"
                          />
                        </div>

                        {meta?.hint && (
                          <div className="key-hint-alert">
                            <span><strong>Ubicación:</strong> {meta.hint}</span>
                          </div>
                        )}
                      </div>

                      {/* Selector de Pestañas de Idioma */}
                      <div className="lang-tabs-container">
                        <div className="lang-tabs-header">
                          <span className="lang-tabs-label">Idioma del Texto:</span>
                          <div className="lang-pills-row">
                            {[
                              { code: 'es', flag: '🇪🇸', name: 'Español' },
                              { code: 'en', flag: '🇬🇧', name: 'English' },
                              { code: 'et', flag: '🇪🇪', name: 'Eesti keel' },
                            ].map(l => {
                              const isFilled = Boolean(((currentContent as any)[`content_${l.code}`] || '').trim());
                              return (
                                <button
                                  key={l.code}
                                  type="button"
                                  className={`lang-modal-tab ${langTab === l.code ? 'active' : ''}`}
                                  onClick={() => setLangTab(l.code as any)}
                                >
                                  <span>{l.flag}</span>
                                  <span>{l.name}</span>
                                  <span className={`tab-check-badge ${isFilled ? 'filled' : 'empty'}`}>
                                    {isFilled ? '✓' : '—'}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Botón de ayuda para copiar desde Español a EN/ET */}
                        {langTab !== 'es' && contentEs && (
                          <div className="copy-helper-bar">
                            <span>¿Deseas una base de traducción?</span>
                            <button
                              type="button"
                              className="copy-from-es-btn"
                              onClick={() => setCurrentContent(prev => ({ ...prev, [`content_${langTab}`]: contentEs }))}
                            >
                              Copiar texto en Español como borrador
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Área de Texto Principal */}
                      <div className="form-group">
                        <div className="textarea-label-row">
                          <label>Contenido del Texto ({langTab.toUpperCase()})</label>
                          <span className="char-count">{activeContent.length} caracteres</span>
                        </div>
                        <textarea 
                          rows={4} 
                          value={activeContent} 
                          onChange={e => setCurrentContent(prev => ({ ...prev, [`content_${langTab}`]: e.target.value }))} 
                          placeholder={`Escribe el texto en ${langTab === 'es' ? 'Español' : langTab === 'en' ? 'Inglés' : 'Estonio'}...`}
                          className="content-main-textarea"
                        />
                      </div>

                      {/* Caja de Vista Previa en Vivo */}
                      {activeContent && (
                        <div className="live-preview-box">
                          <div className="live-preview-header">
                            <span>👁️ Vista Previa ({langTab.toUpperCase()})</span>
                          </div>
                          <div className="live-preview-content">
                            {activeContent}
                          </div>
                        </div>
                      )}

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setIsContentModalOpen(false)}>Cancelar</button>
                        <button type="submit" className="btn btn-primary"><Save size={18} /> Guardar Texto</button>
                      </div>
                    </form>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AdminPage;
