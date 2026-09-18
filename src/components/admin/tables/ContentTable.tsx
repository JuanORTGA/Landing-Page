import React, { useState, useMemo, useRef } from 'react';
import { 
  Edit, 
  Trash2, 
  Search, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Globe, 
  Compass, 
  FileText 
} from 'lucide-react';
import type { PageContent } from '../../../types/database';
import { EmptyState } from '../AdminShared';
import { 
  AdminFolderProjectsIcon, 
  AdminChipSkillsIcon, 
  AdminBriefcaseExpIcon, 
  AdminDocumentCopyIcon 
} from '../icons/AdminIcons';

interface ContentTableProps {
  contents: PageContent[];
  onEdit: (content: PageContent) => void;
  onDelete: (key: string) => void;
}

// Mapeo semántico de claves técnicas a descripciones humanas y secciones
export const keyMetadata: Record<string, { section: string; sectionName: string; label: string; badge: string; hint?: string }> = {
  // HERO
  'hero_kicker': { section: 'hero', sectionName: '01 · Hero', label: 'Kicker / Etiqueta Superior', badge: 'HERO', hint: 'Texto superior que aparece arriba del titular en la portada de la landing' },
  'hero_title': { section: 'hero', sectionName: '01 · Hero', label: 'Titular Principal de Portada', badge: 'HERO', hint: 'Título de gran impacto visual con degradado en la sección principal' },
  'hero_tagline': { section: 'hero', sectionName: '01 · Hero', label: 'Subtítulo / Introducción', badge: 'HERO', hint: 'Párrafo de bienvenida y propuesta de valor inicial' },
  'specialty_label': { section: 'hero', sectionName: '01 · Hero', label: 'Etiqueta: Especialidad', badge: 'HERO', hint: 'Título de la tarjeta de especialidad técnica' },
  'specialty_val': { section: 'hero', sectionName: '01 · Hero', label: 'Valor: Especialidad', badge: 'HERO', hint: 'Ej: Software & Web Development' },
  'objective_label': { section: 'hero', sectionName: '01 · Hero', label: 'Etiqueta: Objetivo', badge: 'HERO', hint: 'Título de la tarjeta de objetivo profesional' },
  'objective_val': { section: 'hero', sectionName: '01 · Hero', label: 'Valor: Objetivo en Estonia', badge: 'HERO', hint: 'Ej: Crecer en el ecosistema estonio' },
  'status_label': { section: 'hero', sectionName: '01 · Hero', label: 'Etiqueta: Disponibilidad', badge: 'HERO', hint: 'Título de la tarjeta de estado laboral' },
  'status_val': { section: 'hero', sectionName: '01 · Hero', label: 'Valor: Disponibilidad', badge: 'HERO', hint: 'Ej: Inmediata / Proyectos' },
  'download_cv': { section: 'hero', sectionName: '01 · Hero', label: 'Texto Botón de CV', badge: 'HERO', hint: 'Texto del botón interactivo de descarga de currículum en portada' },

  // VISION / ESTONIA
  'vision_kicker': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Kicker Por Qué Estonia', badge: 'VISIÓN', hint: 'Etiqueta superior de la sección Visión Estonia' },
  'vision_title': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Titular de Visión', badge: 'VISIÓN', hint: 'Titular principal sobre el ecosistema e-Estonia e innovación nórdica' },
  'vision_desc': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Párrafo de Visión Tecnológica', badge: 'VISIÓN', hint: 'Descripción detallada de la motivación por el ecosistema estonio' },
  'item1_title': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Pilar 1: Título (Mentalidad)', badge: 'VISIÓN', hint: 'Título del primer pilar: Mentalidad de producto' },
  'item1_desc': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Pilar 1: Descripción', badge: 'VISIÓN', hint: 'Explicación del enfoque en resolver problemas reales' },
  'item2_title': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Pilar 2: Título (Arquitectura)', badge: 'VISIÓN', hint: 'Título del segundo pilar: Arquitectura escalable' },
  'item2_desc': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Pilar 2: Descripción', badge: 'VISIÓN', hint: 'Explicación de bases de datos resilientes y código limpio' },
  'card_kicker': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Tarjeta Panorámica: Kicker', badge: 'VISIÓN', hint: 'Etiqueta sobre la fotografía de Estonia' },
  'card_text': { section: 'vision', sectionName: '02 · Visión Estonia', label: 'Tarjeta Panorámica: Texto', badge: 'VISIÓN', hint: 'Frase inspiracional sobre el futuro digital' },

  // ABOUT & LANGUAGES & STATS
  'about_kicker': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Kicker Sobre Mí', badge: 'ABOUT', hint: 'Etiqueta superior de la sección personal' },
  'about_title': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Titular Sobre Mí', badge: 'ABOUT', hint: 'Titular principal de la sección Sobre Mí' },
  'about_p1': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Biografía: Párrafo 1 (Técnico)', badge: 'ABOUT', hint: 'Primer párrafo de presentación técnica y frontend/backend' },
  'about_p2': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Biografía: Párrafo 2 (Valores)', badge: 'ABOUT', hint: 'Segundo párrafo enfocado en trabajo en equipo y aprendizaje' },
  'stat1_num': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Métrica 1: Número (+3)', badge: 'STATS', hint: 'Número de años de experiencia' },
  'stat1_lbl': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Métrica 1: Etiqueta (Años)', badge: 'STATS', hint: 'Texto debajo del número de años de experiencia' },
  'stat2_num': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Métrica 2: Número (10+)', badge: 'STATS', hint: 'Número de proyectos completados' },
  'stat2_lbl': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Métrica 2: Etiqueta (Proyectos)', badge: 'STATS', hint: 'Texto debajo del número de proyectos' },
  'stat3_num': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Métrica 3: Número (100%)', badge: 'STATS', hint: 'Porcentaje de compromiso técnico' },
  'stat3_lbl': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Métrica 3: Etiqueta (Compromiso)', badge: 'STATS', hint: 'Texto debajo del porcentaje de compromiso' },
  'lang_section_title': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idiomas: Título del Bloque', badge: 'IDIOMAS', hint: 'Encabezado de la tarjeta de idiomas' },
  'lang_es_name': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Español: Nombre', badge: 'IDIOMAS', hint: 'Nombre del idioma Español' },
  'lang_es_level': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Español: Nivel (Nativo)', badge: 'IDIOMAS', hint: 'Nivel de dominio del Español' },
  'lang_es_desc': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Español: Descripción', badge: 'IDIOMAS', hint: 'Detalle de comunicación en Español' },
  'lang_en_name': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Inglés: Nombre', badge: 'IDIOMAS', hint: 'Nombre del idioma Inglés' },
  'lang_en_level': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Inglés: Nivel (B1/B2)', badge: 'IDIOMAS', hint: 'Nivel de dominio del Inglés' },
  'lang_en_desc': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Inglés: Descripción', badge: 'IDIOMAS', hint: 'Detalle de comunicación técnica en Inglés' },
  'lang_et_name': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Estonio: Nombre', badge: 'IDIOMAS', hint: 'Nombre del idioma Estonio' },
  'lang_et_level': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Estonio: Nivel (A1/A2)', badge: 'IDIOMAS', hint: 'Nivel de aprendizaje del Estonio' },
  'lang_et_desc': { section: 'about', sectionName: '03 · Sobre Mí', label: 'Idioma Estonio: Descripción', badge: 'IDIOMAS', hint: 'Detalle de aprendizaje activo del Estonio' },

  // EXPERIENCE HEADERS
  'exp_kicker': { section: 'experience', sectionName: '04 · Experiencia', label: 'Kicker Sección Experiencia', badge: 'EXPERIENCIA', hint: 'Etiqueta superior de la cronología laboral' },
  'exp_title': { section: 'experience', sectionName: '04 · Experiencia', label: 'Titular Sección Experiencia', badge: 'EXPERIENCIA', hint: 'Titular principal de trayectoria laboral' },
  'exp_desc': { section: 'experience', sectionName: '04 · Experiencia', label: 'Descripción Sección Experiencia', badge: 'EXPERIENCIA', hint: 'Párrafo introductorio de experiencia práctica' },
  'present_label': { section: 'experience', sectionName: '04 · Experiencia', label: 'Etiqueta: Presente / Activo', badge: 'EXPERIENCIA', hint: 'Texto para empleos en curso' },

  // PROJECTS HEADERS
  'projects_kicker': { section: 'projects', sectionName: '05 · Proyectos', label: 'Kicker Proyectos', badge: 'PROYECTOS', hint: 'Etiqueta superior de la galería de proyectos' },
  'projects_title': { section: 'projects', sectionName: '05 · Proyectos', label: 'Titular Sección Proyectos', badge: 'PROYECTOS', hint: 'Titular principal del portafolio de aplicaciones' },
  'projects_subtitle': { section: 'projects', sectionName: '05 · Proyectos', label: 'Subtítulo Sección Proyectos', badge: 'PROYECTOS', hint: 'Párrafo explicativo de aplicaciones full-stack' },
  'demo_btn': { section: 'projects', sectionName: '05 · Proyectos', label: 'Texto Botón Demo', badge: 'PROYECTOS', hint: 'Texto del botón de demo en vivo' },
  'code_btn': { section: 'projects', sectionName: '05 · Proyectos', label: 'Texto Botón Código', badge: 'PROYECTOS', hint: 'Texto del botón para ver repositorio GitHub' },

  // SKILLS HEADERS
  'skills_kicker': { section: 'skills', sectionName: '06 · Tecnologías', label: 'Kicker Tecnologías', badge: 'SKILLS', hint: 'Etiqueta superior de la sección de habilidades' },
  'skills_title': { section: 'skills', sectionName: '06 · Tecnologías', label: 'Titular Sección Tecnologías', badge: 'SKILLS', hint: 'Titular principal del stack tecnológico' },
  'skills_desc': { section: 'skills', sectionName: '06 · Tecnologías', label: 'Descripción Sección Tecnologías', badge: 'SKILLS', hint: 'Párrafo sobre herramientas y tecnologías modernas' },

  // CONTACT HEADERS & FORM
  'cta_kicker': { section: 'contact', sectionName: '07 · Contacto', label: 'Kicker Contacto', badge: 'CONTACTO', hint: 'Etiqueta superior de la sección de contacto' },
  'cta_title': { section: 'contact', sectionName: '07 · Contacto', label: 'Titular Principal de Contacto', badge: 'CONTACTO', hint: 'Titular invitando a conectar profesionalmente' },
  'cta_text': { section: 'contact', sectionName: '07 · Contacto', label: 'Párrafo de Contacto', badge: 'CONTACTO', hint: 'Mensaje de disponibilidad para proyectos o empleo' },
  'contact_form_name': { section: 'contact', sectionName: '07 · Contacto', label: 'Formulario: Placeholder Nombre', badge: 'CONTACTO', hint: 'Placeholder del campo de nombre en formulario' },
  'contact_form_email': { section: 'contact', sectionName: '07 · Contacto', label: 'Formulario: Placeholder Email', badge: 'CONTACTO', hint: 'Placeholder del campo de email en formulario' },
  'contact_form_msg': { section: 'contact', sectionName: '07 · Contacto', label: 'Formulario: Placeholder Mensaje', badge: 'CONTACTO', hint: 'Placeholder del campo de mensaje en formulario' },
  'contact_send_btn': { section: 'contact', sectionName: '07 · Contacto', label: 'Formulario: Botón Enviar', badge: 'CONTACTO', hint: 'Texto del botón para enviar mensaje' },
};

const sectionsList: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Todos los Textos', icon: <AdminDocumentCopyIcon size={18} color="#38bdf8" /> },
  { id: 'hero', label: '01 · Hero & Portada', icon: <Globe size={18} color="#38bdf8" /> },
  { id: 'vision', label: '02 · Visión Estonia', icon: <Compass size={18} color="#38bdf8" /> },
  { id: 'about', label: '03 · Sobre Mí & Métricas', icon: <FileText size={18} color="#38bdf8" /> },
  { id: 'experience', label: '04 · Experiencia Laboral', icon: <AdminBriefcaseExpIcon size={18} color="#38bdf8" /> },
  { id: 'projects', label: '05 · Proyectos', icon: <AdminFolderProjectsIcon size={18} color="#38bdf8" /> },
  { id: 'skills', label: '06 · Stack & Skills', icon: <AdminChipSkillsIcon size={18} color="#38bdf8" /> },
  { id: 'contact', label: '07 · Contacto & Formulario', icon: <Layers size={18} color="#38bdf8" /> },
];

const ContentTable: React.FC<ContentTableProps> = ({ contents, onEdit, onDelete }) => {
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterLangStatus, setFilterLangStatus] = useState<'all' | 'complete' | 'incomplete'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Conteo de textos por sección
  const countsBySection = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    contents.forEach(c => {
      if (c.key.startsWith('image_') || c.key === 'cv_digital_data_json') return;
      counts.all = (counts.all || 0) + 1;
      const meta = keyMetadata[c.key];
      const sec = meta ? meta.section : 'other';
      counts[sec] = (counts[sec] || 0) + 1;
    });
    return counts;
  }, [contents]);

  // Filtrar y ordenar los contenidos organizadamente
  const filteredContents = useMemo(() => {
    return contents.filter(c => {
      // Ignorar imágenes y datos de json interno
      if (c.key.startsWith('image_') || c.key === 'cv_digital_data_json') return false;

      const meta = keyMetadata[c.key];
      const sec = meta ? meta.section : 'other';
      const matchesSection = selectedSection === 'all' || sec === selectedSection;
      
      const isComplete = Boolean(c.content_es && c.content_en && c.content_et);
      if (filterLangStatus === 'complete' && !isComplete) return false;
      if (filterLangStatus === 'incomplete' && isComplete) return false;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesSection;

      const matchesSearch = 
        c.key.toLowerCase().includes(query) ||
        (meta?.label && meta.label.toLowerCase().includes(query)) ||
        (meta?.hint && meta.hint.toLowerCase().includes(query)) ||
        (c.content_es && c.content_es.toLowerCase().includes(query)) ||
        (c.content_en && c.content_en.toLowerCase().includes(query)) ||
        (c.content_et && c.content_et.toLowerCase().includes(query));

      return matchesSection && matchesSearch;
    });
  }, [contents, selectedSection, searchQuery, filterLangStatus]);

  const handleSelectSection = (secId: string) => {
    setSelectedSection(secId);
    // Desplazamiento suave para ver inmediatamente los textos filtrados
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleCopyKey = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDeleteWithConfirm = (key: string, label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar el texto "${label}" (${key}) de la landing page?`)) {
      onDelete(key);
    }
  };

  if (contents.length === 0) {
    return <EmptyState text="Aún no hay textos cargados en la base de datos." />;
  }

  const activeSectionInfo = sectionsList.find(s => s.id === selectedSection);

  return (
    <div className="content-manager-root">
      {/* ─────────────────────────────────────────────────────────────
          TARJETAS DE RESUMEN Y FILTRADO POR SECCIONES
         ───────────────────────────────────────────────────────────── */}
      <div className="content-sections-summary-grid">
        {sectionsList.map(sec => {
          const count = countsBySection[sec.id] || 0;
          const isActive = selectedSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              className={`section-summary-card ${isActive ? 'active' : ''}`}
              onClick={() => handleSelectSection(sec.id)}
            >
              <div className="summary-card-icon">{sec.icon}</div>
              <div className="summary-card-text">
                <span className="summary-card-name">{sec.label}</span>
                <span className="summary-card-count">{count} {count === 1 ? 'texto' : 'textos'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BANNER DE SECCIÓN ACTIVA & HERRAMIENTAS
         ───────────────────────────────────────────────────────────── */}
      <div className="content-toolbar-panel" ref={tableContainerRef}>
        <div className="active-section-indicator">
          <span className="active-sec-badge">
            {activeSectionInfo?.icon}
            <span>{activeSectionInfo?.label}</span>
          </span>
          <span className="active-sec-count">
            Mostrando <strong>{filteredContents.length}</strong> {filteredContents.length === 1 ? 'texto' : 'textos'}
          </span>
          {selectedSection !== 'all' && (
            <button 
              className="reset-section-btn"
              onClick={() => handleSelectSection('all')}
            >
              Ver todos (58)
            </button>
          )}
        </div>

        <div className="content-toolbar-right-group">
          {/* Buscador */}
          <div className="content-search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por texto, clave o palabra..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Filtros de traducción */}
          <div className="content-status-filters">
            <button 
              className={`filter-pill-btn ${filterLangStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterLangStatus('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-pill-btn ${filterLangStatus === 'complete' ? 'active' : ''}`}
              onClick={() => setFilterLangStatus('complete')}
            >
              <CheckCircle2 size={13} color="#34d399" />
              <span>3/3 Traducidos</span>
            </button>
            <button 
              className={`filter-pill-btn ${filterLangStatus === 'incomplete' ? 'active' : ''}`}
              onClick={() => setFilterLangStatus('incomplete')}
            >
              <AlertCircle size={13} color="#f87171" />
              <span>Incompletos</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LISTA ORGANIZADA DE TEXTOS (TARJETAS DINÁMICAS)
         ───────────────────────────────────────────────────────────── */}
      <div className="content-cards-container">
        {filteredContents.length > 0 ? (
          filteredContents.map((c) => {
            const meta = keyMetadata[c.key];
            const isComplete = Boolean(c.content_es && c.content_en && c.content_et);

            return (
              <div 
                key={c.id || c.key} 
                className="content-item-card"
                onClick={() => onEdit(c)}
              >
                {/* Cabecera del Item */}
                <div className="content-card-top-row">
                  <div className="content-card-title-col">
                    <div className="content-card-title-line">
                      <h4 className="content-card-main-title">{meta?.label || c.key}</h4>
                      {meta?.badge && (
                        <span className="content-card-badge">{meta.badge}</span>
                      )}
                      {isComplete ? (
                        <span className="status-badge-complete">
                          <CheckCircle2 size={12} />
                          <span>3/3 Traducido</span>
                        </span>
                      ) : (
                        <span className="status-badge-incomplete">
                          <AlertCircle size={12} />
                          <span>Faltan Traducciones</span>
                        </span>
                      )}
                    </div>
                    {meta?.hint && (
                      <p className="content-card-hint">{meta.hint}</p>
                    )}
                  </div>

                  {/* Botones de acción mejorados */}
                  <div className="content-card-actions" onClick={e => e.stopPropagation()}>
                    <button 
                      type="button"
                      className="btn-action-edit-pill"
                      onClick={() => onEdit(c)}
                      title="Editar contenido y traducciones de este texto"
                    >
                      <Edit size={14} />
                      <span>Editar Texto</span>
                    </button>

                    <button 
                      type="button"
                      className="btn-action-delete-pill"
                      onClick={(e) => handleDeleteWithConfirm(c.key, meta?.label || c.key, e)}
                      title="Eliminar este texto de la landing"
                    >
                      <Trash2 size={15} />
                      <span>Eliminar</span>
                    </button>
                  </div>
                </div>

                {/* Clave técnica copiable */}
                <div className="content-card-key-row">
                  <span className="key-prefix-lbl">Clave técnica:</span>
                  <button 
                    type="button"
                    className="key-copy-chip"
                    onClick={(e) => handleCopyKey(c.key, e)}
                    title="Haz clic para copiar la clave técnica al portapapeles"
                  >
                    <code>{c.key}</code>
                    {copiedKey === c.key ? (
                      <span className="copied-toast"><Check size={11} color="#34d399" /> ¡Copiado!</span>
                    ) : (
                      <Copy size={11} color="#94a3b8" />
                    )}
                  </button>
                </div>

                {/* Previews trilingües claros y espaciosos */}
                <div className="content-card-trilingual-grid">
                  {/* Español */}
                  <div className="lang-box-card es">
                    <div className="lang-box-header">
                      <span className="lang-box-flag">🇪🇸</span>
                      <span className="lang-box-name">Español</span>
                      {c.content_es ? <CheckCircle2 size={12} color="#34d399" /> : <AlertCircle size={12} color="#f87171" />}
                    </div>
                    <p className="lang-box-text">{c.content_es || <em className="missing-text">Sin texto configurado</em>}</p>
                  </div>

                  {/* Inglés */}
                  <div className="lang-box-card en">
                    <div className="lang-box-header">
                      <span className="lang-box-flag">🇬🇧</span>
                      <span className="lang-box-name">English</span>
                      {c.content_en ? <CheckCircle2 size={12} color="#34d399" /> : <AlertCircle size={12} color="#f87171" />}
                    </div>
                    <p className="lang-box-text">{c.content_en || <em className="missing-text">Sin traducción al inglés</em>}</p>
                  </div>

                  {/* Estonio */}
                  <div className="lang-box-card et">
                    <div className="lang-box-header">
                      <span className="lang-box-flag">🇪🇪</span>
                      <span className="lang-box-name">Eesti keel</span>
                      {c.content_et ? <CheckCircle2 size={12} color="#34d399" /> : <AlertCircle size={12} color="#f87171" />}
                    </div>
                    <p className="lang-box-text">{c.content_et || <em className="missing-text">Sin traducción al estonio</em>}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-content-found-card">
            <div className="no-content-icon">
              <Search size={32} color="#64748b" />
            </div>
            <h3>No se encontraron textos con ese filtro</h3>
            <p>Prueba seleccionando otra sección arriba o borrando el término de búsqueda.</p>
            <button 
              type="button" 
              className="btn btn-primary btn-sm reset-all-filter-btn"
              onClick={() => { setSelectedSection('all'); setSearchQuery(''); setFilterLangStatus('all'); }}
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}
      </div>

      <style>{`
        .content-manager-root {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ─── Grid de Tarjetas de Sección ─── */
        .content-sections-summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 0.85rem;
        }

        .section-summary-card {
          background: #0b1320;
          border: 1px solid rgba(0, 114, 206, 0.22);
          border-radius: 1.15rem;
          padding: 1rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          color: #ffffff;
        }

        .section-summary-card:hover {
          background: #0f192b;
          border-color: #0072ce;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 114, 206, 0.2);
        }

        .section-summary-card.active {
          background: #0072ce;
          border-color: #0072ce;
          box-shadow: 0 4px 14px rgba(0, 114, 206, 0.3);
        }

        .section-summary-card.active .summary-card-name,
        .section-summary-card.active .summary-card-count {
          color: #ffffff !important;
        }

        .summary-card-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .summary-card-text {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
        }

        .summary-card-name {
          font-family: var(--font-heading);
          font-size: 0.86rem;
          font-weight: 800;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .summary-card-count {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: #38bdf8;
          font-weight: 700;
        }

        /* ─── Toolbar Panel ─── */
        .content-toolbar-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
          background: #0c131c;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.25rem;
          padding: 0.9rem 1.35rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
        }

        .active-section-indicator {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .active-sec-badge {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
          background: #0072ce;
          border: 1px solid rgba(0, 114, 206, 0.3);
          padding: 0.35rem 0.95rem;
          border-radius: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .active-sec-count {
          font-size: 0.82rem;
          color: #64748b;
        }

        .active-sec-count strong {
          color: #0072ce;
        }

        .reset-section-btn {
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.25);
          color: #0072ce;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-section-btn:hover {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
        }

        .content-toolbar-right-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .content-search-input-wrap {
          min-width: 240px;
          position: relative;
          display: flex;
          align-items: center;
        }

        .content-search-input-wrap .search-icon {
          position: absolute;
          left: 1rem;
          color: #64748b;
          pointer-events: none;
        }

        .content-search-input-wrap input {
          width: 100%;
          background: #070d18;
          border: 1px solid #1e293b;
          border-radius: 2rem;
          padding: 0.55rem 2.2rem 0.55rem 2.5rem;
          color: #ffffff;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .content-search-input-wrap input:focus {
          border-color: #0072ce;
          background: #09111e;
        }

        .clear-search-btn {
          position: absolute;
          right: 0.85rem;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .content-status-filters {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .filter-pill-btn {
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.2);
          border-radius: 2rem;
          padding: 0.35rem 0.75rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: #cbd5e1;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-pill-btn:hover {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
        }

        .filter-pill-btn.active {
          background: #0072ce;
          border-color: #0072ce;
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 114, 206, 0.2);
        }

        /* ─── Tarjetas de Contenido ─── */
        .content-cards-container {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .content-item-card {
          background: #0b1320;
          border: 1px solid rgba(0, 114, 206, 0.22);
          border-radius: 1.25rem;
          padding: 1.4rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          color: #ffffff;
        }

        .content-item-card:hover {
          background: #0f192b;
          border-color: #0072ce;
          box-shadow: 0 8px 30px rgba(0, 114, 206, 0.2);
          transform: translateY(-2px);
        }

        .content-card-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .content-card-title-col {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }

        .content-card-title-line {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .content-card-main-title {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .content-card-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: #38bdf8;
          background: rgba(0, 114, 206, 0.12);
          border: 1px solid rgba(0, 114, 206, 0.25);
          padding: 0.15rem 0.5rem;
          border-radius: 0.4rem;
        }

        .status-badge-complete {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #059669;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.15rem 0.55rem;
          border-radius: 1rem;
        }

        .status-badge-incomplete {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: #dc2626;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 0.15rem 0.55rem;
          border-radius: 1rem;
        }

        .content-card-hint {
          font-size: 0.8rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.4;
        }

        /* ─── Botones de Acción Mejorados (Sutiles y Naturales) ─── */
        .content-card-actions {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }

        .btn-action-edit-pill {
          background: rgba(0, 114, 206, 0.08);
          border: 1px solid rgba(0, 114, 206, 0.25);
          color: #0072ce;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 1.05rem;
          border-radius: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-action-edit-pill:hover {
          background: #0072ce;
          color: #ffffff;
          border-color: #0072ce;
          box-shadow: 0 2px 8px rgba(0, 114, 206, 0.2);
          transform: translateY(-1px);
        }

        .btn-action-delete-pill {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 0.95rem;
          border-radius: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-action-delete-pill:hover {
          background: #ef4444;
          color: #ffffff;
        }

        /* Clave técnica */
        .content-card-key-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: #64748b;
        }

        .key-copy-chip {
          background: #070d18;
          border: 1px solid rgba(0, 114, 206, 0.25);
          border-radius: 0.5rem;
          padding: 0.2rem 0.6rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .key-copy-chip:hover {
          background: rgba(0, 114, 206, 0.15);
          border-color: #0072ce;
        }

        .key-copy-chip code {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: #0072ce;
        }

        .copied-toast {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: #059669;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }

        /* Previews Trilingües Grid */
        .content-card-trilingual-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 0.85rem;
        }

        .lang-box-card {
          background: #070d18;
          border: 1px solid #1e293b;
          border-radius: 0.85rem;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          transition: all 0.2s ease;
        }

        .lang-box-card:hover {
          background: #0a1322;
          border-color: rgba(0, 114, 206, 0.4);
        }

        .lang-box-card.es { border-left: 3px solid #ef4444; }
        .lang-box-card.en { border-left: 3px solid #0072ce; }
        .lang-box-card.et { border-left: 3px solid #10b981; }

        .lang-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          font-weight: 700;
          color: #cbd5e1;
        }

        .lang-box-header span {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .lang-box-text {
          font-size: 0.88rem;
          color: #ffffff;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .missing-text {
          color: #94a3b8;
          font-style: italic;
          font-size: 0.8rem;
        }

        .no-content-found-card {
          background: #0b1320;
          border: 1px dashed rgba(0, 114, 206, 0.3);
          border-radius: 1.5rem;
          padding: 3.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.65rem;
        }

        .no-content-icon {
          font-size: 2.5rem;
          margin-bottom: 0.25rem;
        }

        .no-content-found-card h3 {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: #ffffff;
          margin: 0;
        }

        .no-content-found-card p {
          font-size: 0.88rem;
          color: #94a3b8;
          max-width: 400px;
          margin: 0;
        }

        .reset-all-filter-btn {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default ContentTable;
