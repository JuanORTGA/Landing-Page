import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Save, 
  X,
  ArrowLeft
} from 'lucide-react';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import { Toast } from '../components/admin/AdminShared';
import ProjectsTable from '../components/admin/tables/ProjectsTable';
import SkillsTable from '../components/admin/tables/SkillsTable';
import ExperienceTable from '../components/admin/tables/ExperienceTable';
import ContentTable from '../components/admin/tables/ContentTable';
import CVManagement from '../components/admin/tables/CVManagement';
import LangTabs from '../components/admin/modals/LangTabs';

import type { Project, Skill, ExperienceItem, PageContent } from '../types/database';
import '../styles/admin.css';

// ─────────────────────────── Helpers ───────────────────────────
const emptyProject: Project = {
  title_es: '', title_en: '', title_et: '',
  description_short_es: '', description_short_en: '', description_short_et: '',
  description_long_es: '', description_long_en: '', description_long_et: '',
  image_url: '', github_url: '', live_url: '', stack: '', category: ''
};

const emptySkill: Skill = { name: '', icon: '', category: '', level: 50, order: 0 };

const emptyExperience: ExperienceItem = {
  company: '', role_es: '', role_en: '', role_et: '',
  description_es: '', description_en: '', description_et: '',
  start_date: '', end_date: '', is_current: false, location: ''
};

const emptyContent: PageContent = { key: '', content_es: '', content_en: '', content_et: '' };

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // ─── Data States ───
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [contents, setContents] = useState<PageContent[]>([]);
  const [cvFiles, setCvFiles] = useState<any[]>([]);

  // ─── Modal States ───
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({ ...emptyProject });

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill>({ ...emptySkill });

  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState<ExperienceItem>({ ...emptyExperience });

  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState<PageContent>({ ...emptyContent });

  const [langTab, setLangTab] = useState<'es' | 'en' | 'et'>('es');

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
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
    }
  }, [activeTab]);

  // ─────────────────────────── Auth ───────────────────────────
  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setIsLoggedIn(true);
  }, []);

  // ─────────────────────────── Effects ───────────────────────────
  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn, fetchData]);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showToast(error.message, 'error');
    else setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  // ─────────────────────────── Upload ───────────────────────────
  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
    setIsUploading(true);

    try {
      const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
      if (uploadError) {
        if (uploadError.message.includes('Bucket not found')) {
          showToast(`Error: El bucket "${bucket}" no existe en Supabase. Debes crearlo en el panel de Storage.`, 'error');
        } else {
          showToast(uploadError.message, 'error');
        }
        setIsUploading(false);
        return null;
      }

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
      setIsUploading(false);
      return publicUrl;
    } catch (err: any) {
      showToast(err.message, 'error');
      setIsUploading(false);
      return null;
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const url = await uploadFile(e.target.files[0], 'projects');
    if (url) setCurrentProject(prev => ({ ...prev, image_url: url }));
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>, lang: string) => {
    if (!e.target.files?.length) return;
    const url = await uploadFile(e.target.files[0], 'cvs');
    if (url) {
      const { error } = await supabase.from('cv_files').upsert(
        { lang, file_url: url, updated_at: new Date().toISOString() },
        { onConflict: 'lang' }
      );
      if (error) showToast(error.message, 'error');
      else { showToast('CV uploaded successfully'); fetchData(); }
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
    if (error) showToast(error.message, 'error');
    else { showToast('Experience saved!'); setIsExpModalOpen(false); fetchData(); }
  };

  const deleteExperience = async (id: string) => {
    if (!window.confirm('¿Eliminar esta experiencia?')) return;
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) showToast(error.message, 'error');
    else { showToast('Experience deleted'); fetchData(); }
  };

  const saveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...currentContent };
    let error;
    if (data.id) {
      const { error: err } = await supabase.from('page_content').update(data).eq('id', data.id);
      error = err;
    } else {
      const saveData = { ...data };
      delete saveData.id;
      const { error: err } = await supabase.from('page_content').insert([saveData]);
      error = err;
    }
    if (error) showToast(error.message, 'error');
    else { showToast('Content saved!'); setIsContentModalOpen(false); fetchData(); }
  };

  const deleteContent = async (id: string) => {
    if (!window.confirm('¿Eliminar este contenido?')) return;
    const { error } = await supabase.from('page_content').delete().eq('id', id);
    if (error) showToast(error.message, 'error');
    else { showToast('Content deleted'); fetchData(); }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <motion.div className="login-card glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="login-logo">
            <div className="login-logo-icon"><Code size={32} /></div>
            <h2>Admin Panel</h2>
            <p className="login-subtitle">Manage your portfolio content</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@example.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-primary w-full">Login</button>
          </form>
          <a href="/" className="back-link"><ArrowLeft size={16} /> Back to Portfolio</a>
        </motion.div>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      <main className="admin-main">
        <AdminHeader 
          activeTab={activeTab} 
          onNewItem={() => {
            if (activeTab === 'projects') { setCurrentProject({ ...emptyProject }); setIsProjectModalOpen(true); }
            if (activeTab === 'skills') { setCurrentSkill({ ...emptySkill }); setIsSkillModalOpen(true); }
            if (activeTab === 'experience') { setCurrentExp({ ...emptyExperience }); setIsExpModalOpen(true); }
            if (activeTab === 'content') { setCurrentContent({ ...emptyContent }); setIsContentModalOpen(true); }
            setLangTab('es');
          }} 
        />

        <div className="admin-content glass">
          {activeTab === 'projects' && <ProjectsTable projects={projects} onEdit={(p) => { setCurrentProject(p); setIsProjectModalOpen(true); }} onDelete={deleteProject} />}
          {activeTab === 'skills' && <SkillsTable skills={skills} onEdit={(s) => { setCurrentSkill(s); setIsSkillModalOpen(true); }} onDelete={deleteSkill} />}
          {activeTab === 'experience' && <ExperienceTable experiences={experiences} onEdit={(e) => { setCurrentExp(e); setIsExpModalOpen(true); }} onDelete={deleteExperience} />}
          {activeTab === 'content' && <ContentTable contents={contents} onEdit={(c) => { setCurrentContent(c); setIsContentModalOpen(true); }} onDelete={deleteContent} />}
          {activeTab === 'cvs' && <CVManagement cvFiles={cvFiles} isUploading={isUploading} onUpload={handleCVUpload} />}
        </div>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
            <motion.div className="modal-content glass" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="modal-header">
                <h2>{currentProject.id ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={() => setIsProjectModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={saveProject} className="admin-form">
                <LangTabs currentLang={langTab} setLang={setLangTab} />
                
                <div className="form-section">
                  <div className="form-group">
                    <label>Título del Proyecto ({langTab.toUpperCase()})</label>
                    <input type="text" value={(currentProject as any)[`title_${langTab}`] || ''} onChange={e => setCurrentProject(prev => ({ ...prev, [`title_${langTab}`]: e.target.value }))} required={langTab === 'es'} placeholder="Ej: Mi Portafolio" />
                  </div>
                  
                  <div className="form-group">
                    <label>Descripción Corta ({langTab.toUpperCase()})</label>
                    <textarea rows={2} value={(currentProject as any)[`description_short_${langTab}`] || ''} onChange={e => setCurrentProject(prev => ({ ...prev, [`description_short_${langTab}`]: e.target.value }))} placeholder="Una breve introducción..." />
                  </div>
                </div>

                <div className="form-section highlight">
                  <label>Imagen del Proyecto (Bucket: "projects")</label>
                  <div className="image-upload-wrapper">
                    {currentProject.image_url ? (
                      <div className="preview-container">
                        <img src={currentProject.image_url} alt="Preview" className="image-preview" />
                        <button type="button" className="btn-remove" onClick={() => setCurrentProject(prev => ({ ...prev, image_url: '' }))}>X</button>
                      </div>
                    ) : (
                      <label className="upload-label-big">
                        {isUploading ? 'Subiendo...' : 'Click para subir imagen'}
                        <input type="file" accept="image/*" onChange={handleProjectImageUpload} disabled={isUploading} hidden />
                      </label>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>GitHub URL</label>
                    <input type="url" value={currentProject.github_url} onChange={e => setCurrentProject(prev => ({ ...prev, github_url: e.target.value }))} placeholder="https://github.com/..." />
                  </div>
                  <div className="form-group">
                    <label>Live Demo URL</label>
                    <input type="url" value={currentProject.live_url} onChange={e => setCurrentProject(prev => ({ ...prev, live_url: e.target.value }))} placeholder="https://..." />
                  </div>
                </div>

                <div className="form-divider" />

                <div className="form-row">
                  <div className="form-group">
                    <label>Stack Tecnológico (separado por comas)</label>
                    <input type="text" value={Array.isArray(currentProject.stack) ? currentProject.stack.join(', ') : currentProject.stack || ''} onChange={e => setCurrentProject(prev => ({ ...prev, stack: e.target.value }))} placeholder="React, Supabase, TypeScript" />
                  </div>
                  <div className="form-group">
                    <label>Categoría</label>
                    <input type="text" value={currentProject.category || ''} onChange={e => setCurrentProject(prev => ({ ...prev, category: e.target.value }))} placeholder="Web, Mobile, AI" />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsProjectModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="btn btn-primary" disabled={isUploading}><Save size={18} /> Guardar Proyecto</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skill Modal */}
      <AnimatePresence>
        {isSkillModalOpen && (
          <div className="modal-overlay" onClick={() => setIsSkillModalOpen(false)}>
            <motion.div className="modal-content glass modal-sm" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="modal-header">
                <h2>{currentSkill.id ? 'Edit Skill' : 'New Skill'}</h2>
                <button onClick={() => setIsSkillModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={saveSkill} className="admin-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={currentSkill.name} onChange={e => setCurrentSkill(prev => ({ ...prev, name: e.target.value }))} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" value={currentSkill.category} onChange={e => setCurrentSkill(prev => ({ ...prev, category: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Level ({currentSkill.level}%)</label>
                  <input type="range" className="range-input" value={currentSkill.level} onChange={e => setCurrentSkill(prev => ({ ...prev, level: parseInt(e.target.value) }))} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsSkillModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary"><Save size={18} /> Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Experience Modal */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div className="modal-overlay" onClick={() => setIsExpModalOpen(false)}>
            <motion.div className="modal-content glass" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="modal-header">
                <h2>{currentExp.id ? 'Edit Experience' : 'New Experience'}</h2>
                <button onClick={() => setIsExpModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={saveExperience} className="admin-form">
                <div className="form-group">
                  <label>Company</label>
                  <input type="text" value={currentExp.company} onChange={e => setCurrentExp(prev => ({ ...prev, company: e.target.value }))} required />
                </div>
                <LangTabs currentLang={langTab} setLang={setLangTab} />
                <div className="form-group">
                  <label>Role ({langTab.toUpperCase()})</label>
                  <input type="text" value={(currentExp as any)[`role_${langTab}`] || ''} onChange={e => setCurrentExp(prev => ({ ...prev, [`role_${langTab}`]: e.target.value }))} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="text" placeholder="e.g. 2023" value={currentExp.start_date} onChange={e => setCurrentExp(prev => ({ ...prev, start_date: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="text" placeholder="e.g. 2024" value={currentExp.end_date || ''} onChange={e => setCurrentExp(prev => ({ ...prev, end_date: e.target.value }))} disabled={currentExp.is_current} />
                  </div>
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={currentExp.is_current} onChange={e => setCurrentExp(prev => ({ ...prev, is_current: e.target.checked }))} />
                    Current Position
                  </label>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsExpModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary"><Save size={18} /> Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Content Modal */}
      <AnimatePresence>
        {isContentModalOpen && (
          <div className="modal-overlay" onClick={() => setIsContentModalOpen(false)}>
            <motion.div className="modal-content glass" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="modal-header">
                <h2>{currentContent.id ? 'Edit Page Content' : 'New Page Content'}</h2>
                <button onClick={() => setIsContentModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={saveContent} className="admin-form">
                <div className="form-group">
                  <label>Key (Unique Identifier)</label>
                  <input type="text" value={currentContent.key} onChange={e => setCurrentContent(prev => ({ ...prev, key: e.target.value }))} required placeholder="e.g. hero_title" />
                </div>
                <LangTabs currentLang={langTab} setLang={setLangTab} />
                <div className="form-group">
                  <label>Content ({langTab.toUpperCase()})</label>
                  <textarea rows={4} value={(currentContent as any)[`content_${langTab}`] || ''} onChange={e => setCurrentContent(prev => ({ ...prev, [`content_${langTab}`]: e.target.value }))} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setIsContentModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary"><Save size={18} /> Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AdminPage;
