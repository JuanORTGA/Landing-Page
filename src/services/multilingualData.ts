// Servicio centralizado de internacionalización y traducción inteligente
// para Experiencia, Educación y Habilidades Técnicas (ES, EN, ET)

export type SupportedLang = 'es' | 'en' | 'et';

// Meses en los 3 idiomas
const monthMap: Record<string, { es: string; en: string; et: string }> = {
  enero: { es: 'Enero', en: 'January', et: 'Jaanuar' },
  febrero: { es: 'Febrero', en: 'February', et: 'Veebruar' },
  marzo: { es: 'Marzo', en: 'March', et: 'Märts' },
  abril: { es: 'Abril', en: 'April', et: 'Aprill' },
  mayo: { es: 'Mayo', en: 'May', et: 'Mai' },
  may: { es: 'Mayo', en: 'May', et: 'Mai' },
  junio: { es: 'Junio', en: 'June', et: 'Juuni' },
  june: { es: 'Junio', en: 'June', et: 'Juuni' },
  julio: { es: 'Julio', en: 'July', et: 'Juuli' },
  july: { es: 'Julio', en: 'July', et: 'Juuli' },
  agosto: { es: 'Agosto', en: 'August', et: 'August' },
  august: { es: 'Agosto', en: 'August', et: 'August' },
  septiembre: { es: 'Septiembre', en: 'September', et: 'September' },
  september: { es: 'Septiembre', en: 'September', et: 'September' },
  octubre: { es: 'Octubre', en: 'October', et: 'Oktoober' },
  october: { es: 'Octubre', en: 'October', et: 'Oktoober' },
  noviembre: { es: 'Noviembre', en: 'November', et: 'November' },
  november: { es: 'Noviembre', en: 'November', et: 'November' },
  diciembre: { es: 'Diciembre', en: 'December', et: 'Detsember' },
  december: { es: 'Diciembre', en: 'December', et: 'Detsember' },
};

export const translateDateStr = (dateStr: string | null | undefined, lang: SupportedLang): string => {
  if (!dateStr) return '';
  let result = dateStr.trim();
  
  // Normalizar meses
  for (const [key, val] of Object.entries(monthMap)) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    if (regex.test(result)) {
      result = result.replace(regex, val[lang]);
    }
  }

  // Si tiene formato "2026 May", reordenar a "May 2026" en EN/ES si aplica
  const matchYearMonth = result.match(/^(\d{4})\s+([A-Za-zÀ-ÿ]+)$/);
  if (matchYearMonth) {
    const [, yr, mo] = matchYearMonth;
    return `${mo} ${yr}`;
  }

  return result;
};

export const translateEmploymentType = (type: string | null | undefined, lang: SupportedLang): string => {
  if (!type) return lang === 'en' ? 'Full-time' : lang === 'et' ? 'Täistööaeg' : 'Jornada completa';
  const norm = type.toLowerCase().trim();
  if (norm.includes('completa') || norm.includes('full')) {
    return lang === 'en' ? 'Full-time' : lang === 'et' ? 'Täistööaeg' : 'Jornada completa';
  }
  if (norm.includes('pasant') || norm.includes('práct') || norm.includes('pract') || norm.includes('intern')) {
    return lang === 'en' ? 'Internship' : lang === 'et' ? 'Praktika' : 'Pasantía / Prácticas';
  }
  if (norm.includes('parcial') || norm.includes('part')) {
    return lang === 'en' ? 'Part-time' : lang === 'et' ? 'Osaajaline' : 'Media jornada';
  }
  if (norm.includes('freelance') || norm.includes('contrat')) {
    return lang === 'en' ? 'Freelance / Contract' : lang === 'et' ? 'Vabakutseline' : 'Freelance / Contrato';
  }
  return type;
};

export const translateWorkMode = (mode: string | null | undefined, lang: SupportedLang): string => {
  if (!mode) return '';
  const norm = mode.toLowerCase().trim();
  if (norm.includes('presencial') || norm.includes('onsite') || norm.includes('on-site')) {
    return lang === 'en' ? 'On-site' : lang === 'et' ? 'Kohapeal' : 'Presencial';
  }
  if (norm.includes('remoto') || norm.includes('remote')) {
    return lang === 'en' ? 'Remote' : lang === 'et' ? 'Kaugtöö' : 'En remoto';
  }
  if (norm.includes('híbrido') || norm.includes('hibrido') || norm.includes('hybrid')) {
    return lang === 'en' ? 'Hybrid' : lang === 'et' ? 'Hübriid' : 'Híbrido';
  }
  return mode;
};

// Traducciones curadas de Experiencia Laboral
interface ExpTranslation {
  role: Record<SupportedLang, string>;
  description: Record<SupportedLang, string>;
}

const knownExperiences: Record<string, ExpTranslation> = {
  amazonas: {
    role: {
      es: 'Programador Full-Stack',
      en: 'Full-Stack Developer',
      et: 'Full-Stack Arendaja',
    },
    description: {
      es: 'Participé en la creación y entrenamiento de modelos YOLO mediante la preparación de datasets en roboflow.com para la detección de personas y objetos en movimiento, procesando datos a través de cámaras de seguridad e implementando la lógica en Python.',
      en: 'Participated in developing and training YOLO computer vision models using Roboflow datasets for real-time person and moving object detection, processing security camera feeds with Python.',
      et: 'Osalesin YOLO arvutinägemise mudelite loomisel ja treenimisel roboflow.com andmestike abil reaalajas inimeste ja liikuvate objektide tuvastamiseks turvakaameratest, rakendades loogikat Pythonis.',
    },
  },
  tierras: {
    role: {
      es: 'Programador Python, Django',
      en: 'Python & Django Developer',
      et: 'Pythoni ja Django Arendaja',
    },
    description: {
      es: 'Construcción y automatización de módulos backend en Django para la gestión y procesamiento de información.',
      en: 'Development and automation of scalable Django backend modules for institutional data management and processing.',
      et: 'Skaleeritavate Django tagarakenduse moodulite ehitamine ja automatiseerimine andmete haldamiseks ja töötlemiseks.',
    },
  },
  salud: {
    role: {
      es: 'Programador Full-Stack',
      en: 'Full-Stack Developer',
      et: 'Full-Stack Arendaja',
    },
    description: {
      es: 'Desarrollo de plataforma web de mensajería virtual administrativa para el despacho y distribución interna de comunicados y noticias críticas entre departamentos.',
      en: 'Engineered an administrative internal messaging web platform for dispatching and distributing critical notices across departments.',
      et: 'Haldusliku virtuaalse sõnumside veebiplatvormi arendamine ametkondlike teadete ja kriitilise info edastamiseks osakondade vahel.',
    },
  },
};

export const resolveExperienceRole = (exp: any, lang: SupportedLang): string => {
  if (lang === 'en' && exp.role_en && exp.role_en.trim() && exp.role_en.trim() !== exp.role_es?.trim()) {
    return exp.role_en;
  }
  if (lang === 'et' && exp.role_et && exp.role_et.trim() && exp.role_et.trim() !== exp.role_es?.trim()) {
    return exp.role_et;
  }
  if (lang === 'es' && exp.role_es) {
    return exp.role_es;
  }

  // Buscar coincidencia en diccionario curado
  const comp = (exp.company || '').toLowerCase();
  for (const [key, item] of Object.entries(knownExperiences)) {
    if (comp.includes(key)) {
      return item.role[lang];
    }
  }

  return (lang === 'en' ? exp.role_en : lang === 'et' ? exp.role_et : exp.role_es) || exp.role_es || '';
};

export const resolveExperienceDescription = (exp: any, lang: SupportedLang): string => {
  // Detectar si description_et o description_en contiene español o typo
  const hasTypoOrSpanishInEt = exp.description_et && (exp.description_et.includes('Participe') || exp.description_et.includes('modelohttp'));
  const hasTypoOrSpanishInEn = exp.description_en && (exp.description_en.includes('modelohttp'));

  if (lang === 'en' && exp.description_en && exp.description_en.trim() && !hasTypoOrSpanishInEn && exp.description_en.trim() !== exp.description_es?.trim()) {
    return exp.description_en;
  }
  if (lang === 'et' && exp.description_et && exp.description_et.trim() && !hasTypoOrSpanishInEt && exp.description_et.trim() !== exp.description_es?.trim()) {
    return exp.description_et;
  }

  // Diccionario curado
  const comp = (exp.company || '').toLowerCase();
  for (const [key, item] of Object.entries(knownExperiences)) {
    if (comp.includes(key)) {
      return item.description[lang];
    }
  }

  return (lang === 'en' ? exp.description_en : lang === 'et' ? exp.description_et : exp.description_es) || exp.description_es || '';
};

// Traducciones curadas de Educación
export const resolveEducationDegree = (edu: any, lang: SupportedLang): string => {
  const dEs = (edu.degree_es || '').toLowerCase();
  
  if (dEs.includes('tsu')) {
    if (lang === 'en') return 'Associate Degree in Computer Science (TSU)';
    if (lang === 'et') return 'Rakenduskõrgharidus informaatikas (TSU)';
    return 'TSU en Informática';
  }
  if (dEs.includes('ingenier') || dEs.includes('ingeniería')) {
    if (lang === 'en') return 'B.S. in Computer Engineering (Degree in Progress)';
    if (lang === 'et') return 'Informaatikainseneri kraad (Diplom ootel)';
    return 'Ingeniería en Informática (Título en trámite)';
  }

  if (lang === 'en' && edu.degree_en && edu.degree_en.trim() && edu.degree_en !== edu.degree_es) return edu.degree_en;
  if (lang === 'et' && edu.degree_et && edu.degree_et.trim() && edu.degree_et !== edu.degree_es) return edu.degree_et;

  return edu.degree_es || '';
};

export const resolveEducationFieldOfStudy = (edu: any, lang: SupportedLang): string => {
  const f = (edu.field_of_study || '').toLowerCase();
  if (f.includes('informát') || f.includes('informat')) {
    if (lang === 'en') return 'Computer Engineering & Information Technology';
    if (lang === 'et') return 'Arvutitehnika ja informaatika';
    return 'Ingeniería en Informática';
  }
  return edu.field_of_study || '';
};

export const resolveEducationInstitution = (edu: any, lang: SupportedLang): string => {
  const inst = edu.institution || '';
  if (inst.includes('Experimental de Caracas') || inst.includes('Mariscal Sucre')) {
    if (lang === 'en') return 'Territorial Polytechnic University of Caracas "Mariscal Sucre"';
    if (lang === 'et') return 'Caracase Territoriaalne Tehnikaülikool "Mariscal Sucre"';
  }
  return inst;
};

// Diccionario Trilingüe de Habilidades Técnicas
export const techDescriptionsMultilingual: Record<string, {
  focus: Record<SupportedLang, string>;
  tags: Record<SupportedLang, string[]>;
}> = {
  react: {
    focus: {
      es: 'Componentes modernos, Single Page Applications, state management y renderizado fluido.',
      en: 'Modern component architecture, Single Page Applications (SPA), state management, and fluid rendering.',
      et: 'Kaasaegne komponentide arhitektuur, ühelehelised rakendused (SPA), olekuhaldus ja sujuv renderdamine.',
    },
    tags: {
      es: ['React 18', 'Hooks', 'Vite', 'Producción'],
      en: ['React 18', 'Hooks', 'Vite', 'Production'],
      et: ['React 18', 'Hooks', 'Vite', 'Tootmistase'],
    },
  },
  javascript: {
    focus: {
      es: 'Tecnología fundamental orientada a ingeniería y arquitectura de software.',
      en: 'Foundational technology focused on modern software engineering and clean architecture.',
      et: 'Põhitehnoloogia kaasaegse tarkvaraehituse ja veebiarhitektuuri jaoks.',
    },
    tags: {
      es: ['ES6+', 'Estándares Web', 'Semántica'],
      en: ['ES6+', 'Web Standards', 'Semantics'],
      et: ['ES6+', 'Veebistandardid', 'Semantika'],
    },
  },
  python: {
    focus: {
      es: 'Estructuras de datos, algoritmos, scripts de automatización y desarrollo backend robusto.',
      en: 'Data structures, algorithms, automation scripts, and robust backend engineering.',
      et: 'Andmestruktuurid, algoritmid, automatiseerimisskriptid ja töökindel tagarakenduste arendus.',
    },
    tags: {
      es: ['Lenguaje Principal', 'Python 3', 'POO', 'Estructuras'],
      en: ['Core Language', 'Python 3', 'OOP', 'Data Structures'],
      et: ['Peamine programmeerimiskeel', 'Python 3', 'OOP', 'Andmestruktuurid'],
    },
  },
  typescript: {
    focus: {
      es: 'Tipado estático seguro, interfaces robustas y prevención de bugs en compilación.',
      en: 'Static type safety, robust interfaces, and compile-time defect prevention.',
      et: 'Staatiline tüübikindlus, tugevad liidesed ja vigade vältimine kompileerimisel.',
    },
    tags: {
      es: ['TypeScript', 'Tipos Estrictos', 'ES6+'],
      en: ['TypeScript', 'Strict Types', 'ES6+'],
      et: ['TypeScript', 'Ranged tüübid', 'ES6+'],
    },
  },
  sqlite: {
    focus: {
      es: 'Bases de datos embebidas de alta velocidad, transacciones ACID y persistencia local sin servidor.',
      en: 'High-speed embedded databases, ACID transactions, and zero-configuration local persistence.',
      et: 'Kiire manustatud andmebaas, ACID tehingud ja serverivaba lokaalne andmesalvestus.',
    },
    tags: {
      es: ['Embebida', 'ACID', 'Cero Config'],
      en: ['Embedded', 'ACID', 'Zero Config'],
      et: ['Manustatud', 'ACID', 'Kergekaaluline'],
    },
  },
  tailwind: {
    focus: {
      es: 'Sistemas de diseño utility-first, interfaces responsivas de alta fidelidad y modo oscuro dinámico.',
      en: 'Utility-first design systems, high-fidelity responsive layouts, and dynamic dark mode.',
      et: 'Utiliidipõhised disainisüsteemid, kohanduvad paigutused ja dünaamiline tumerežiim.',
    },
    tags: {
      es: ['Utility-First', 'Modo Oscuro', 'Diseño Fluido'],
      en: ['Utility-First', 'Dark Mode', 'Fluid Layouts'],
      et: ['Utiliidipõhine', 'Tumerežiim', 'Sujuv disain'],
    },
  },
  html5: {
    focus: {
      es: 'Marcado semántico moderno, accesibilidad web (a11y) y optimización SEO técnica estructural.',
      en: 'Modern semantic markup, web accessibility (a11y), and structural SEO optimization.',
      et: 'Kaasaegne semantiline märgistus, veebi ligipääsetavus (a11y) ja tehniline SEO.',
    },
    tags: {
      es: ['Semántica', 'Accesibilidad', 'SEO Técnico'],
      en: ['Semantics', 'Accessibility (a11y)', 'Technical SEO'],
      et: ['Semantika', 'Ligipääsetavus', 'Tehniline SEO'],
    },
  },
  sql: {
    focus: {
      es: 'Diseño relacional, optimización de consultas complejas, índices y transacciones seguras.',
      en: 'Relational schema design, complex query optimization, indexing, and transactional integrity.',
      et: 'Relaatsiooniline disain, päringute optimeerimine, indeksid ja tehingute terviklikkus.',
    },
    tags: {
      es: ['Consultas SQL', 'Optimización', 'Índices'],
      en: ['SQL Queries', 'Optimization', 'Indexing'],
      et: ['SQL päringud', 'Optimeerimine', 'Indekseerimine'],
    },
  },
  django: {
    focus: {
      es: 'Modelos ORM relacionales, autenticación JWT, APIs REST y arquitectura backend escalable.',
      en: 'Relational ORM models, JWT authentication, RESTful APIs, and scalable backend architecture.',
      et: 'Relaatsioonilised ORM mudelid, JWT autentimine, REST API-d ja skaleeritav arhitektuur.',
    },
    tags: {
      es: ['Django', 'APIs REST', 'ORM', 'Seguridad'],
      en: ['Django', 'REST APIs', 'ORM', 'Security'],
      et: ['Django', 'REST API-d', 'ORM', 'Turvalisus'],
    },
  },
  css3: {
    focus: {
      es: 'Diseño avanzado con Flexbox, CSS Grid, micro-animaciones fluidas y efectos de cristal esmerilado.',
      en: 'Advanced layouts with Flexbox, CSS Grid, fluid micro-animations, and glassmorphism styling.',
      et: 'Keerukad paigutused Flexboxi ja CSS Gridiga, sujuvad animatsioonid ja klaasmorfism.',
    },
    tags: {
      es: ['CSS Grid', 'Animaciones', 'Glassmorphism'],
      en: ['CSS Grid', 'Animations', 'Glassmorphism'],
      et: ['CSS Grid', 'Animatsioonid', 'Klaasmorfism'],
    },
  },
  vite: {
    focus: {
      es: 'Compilación ultrarrápida, Hot Module Replacement (HMR) y empaquetado optimizado para producción.',
      en: 'Lightning-fast builds, instant Hot Module Replacement (HMR), and production asset bundling.',
      et: 'Välkkiire kompileerimine, reaalajas moodulite asendamine (HMR) ja optimeeritud pakkimine.',
    },
    tags: {
      es: ['Bundler', 'HMR Rápido', 'Build Óptimo'],
      en: ['Bundler', 'Fast HMR', 'Optimized Build'],
      et: ['Pakkija', 'Kiire HMR', 'Optimeeritud ehitus'],
    },
  },
  yolo: {
    focus: {
      es: 'Modelos de visión artificial para detección y seguimiento de objetos en tiempo real.',
      en: 'Computer vision neural networks for real-time object detection and telemetry tracking.',
      et: 'Arvutinägemise mudelid reaalajas objektide ja inimeste tuvastamiseks ning jälgimiseks.',
    },
    tags: {
      es: ['YOLOv8', 'Visión Artificial', 'Detección'],
      en: ['YOLOv8', 'Computer Vision', 'Object Detection'],
      et: ['YOLOv8', 'Arvutinägemine', 'Tuvastamine'],
    },
  },
  roboflow: {
    focus: {
      es: 'Anotación, preprocesamiento y aumentación de datasets para entrenamiento de modelos IA.',
      en: 'Dataset annotation, preprocessing, and augmentation pipeline for computer vision models.',
      et: 'Andmestike märgendamine, eeltöötlus ja arvutinägemise tehisintellekti treenimine.',
    },
    tags: {
      es: ['Datasets', 'Inferencia', 'Visión IA'],
      en: ['Datasets', 'Inference Pipeline', 'Vision AI'],
      et: ['Andmestikud', 'Järeldamine', 'Visiooni-AI'],
    },
  },
  supabase: {
    focus: {
      es: 'Arquitectura Backend-as-a-Service, bases de datos PostgreSQL, autenticación y storage seguro.',
      en: 'Backend-as-a-Service architecture, PostgreSQL databases, row-level security, and storage.',
      et: 'BaaS arhitektuur, PostgreSQL andmebaasid, reataseme turvalisus ja failisalvestus.',
    },
    tags: {
      es: ['Postgres', 'Autenticación', 'Cloud BaaS'],
      en: ['Postgres', 'Authentication', 'Cloud BaaS'],
      et: ['Postgres', 'Autentimine', 'Pilve-BaaS'],
    },
  },
  mongodb: {
    focus: {
      es: 'Bases de datos orientadas a documentos NoSQL, esquemas flexibles y consultas de alta velocidad.',
      en: 'NoSQL document-oriented databases, flexible schemas, and high-throughput query pipelines.',
      et: 'Dokumendipõhine NoSQL andmebaas, paindlikud skeemid ja suure läbilaskevõimega päringud.',
    },
    tags: {
      es: ['NoSQL', 'Documentos', 'BJSON'],
      en: ['NoSQL', 'Document Store', 'BJSON'],
      et: ['NoSQL', 'Dokumendipõhine', 'BJSON'],
    },
  },
  vscode: {
    focus: {
      es: 'Depuración avanzada, linters, extensiones de productividad y flujos de trabajo ágiles.',
      en: 'Advanced debugging workflows, linters, productivity extensions, and agile development tooling.',
      et: 'Täiustatud silumine, linterid, produktiivsuse laiendused ja agiilsed töövood.',
    },
    tags: {
      es: ['VS Code', 'Productividad', 'Tooling'],
      en: ['VS Code', 'Productivity', 'Tooling'],
      et: ['VS Code', 'Produktiivsus', 'Tööriistad'],
    },
  },
  postgresql: {
    focus: {
      es: 'Diseño relacional avanzado, consultas complejas, índices y transacciones seguras ACID.',
      en: 'Advanced relational modeling, complex SQL queries, indexing, and ACID transactions.',
      et: 'Keerukas relaatsiooniline modelleerimine, SQL-päringud, indeksid ja ACID tehingud.',
    },
    tags: {
      es: ['PostgreSQL', 'ACID', 'SQL Avanzado'],
      en: ['PostgreSQL', 'ACID', 'Advanced SQL'],
      et: ['PostgreSQL', 'ACID', 'Täiustatud SQL'],
    },
  },
  node: {
    focus: {
      es: 'Entorno de ejecución asíncrono para servidores en tiempo real, APIs y microservicios.',
      en: 'Asynchronous event-driven runtime for real-time backend servers, APIs, and microservices.',
      et: 'Asünkroonne sündmusepõhine töökeskkond reaalajas serverite, API-de ja mikroteenuste jaoks.',
    },
    tags: {
      es: ['Node.js', 'Express', 'APIs REST'],
      en: ['Node.js', 'Express', 'REST APIs'],
      et: ['Node.js', 'Express', 'REST API-d'],
    },
  },
  docker: {
    focus: {
      es: 'Contenedores estandarizados, Dockerfile multi-stage y ambientes de despliegue aislados.',
      en: 'Standardized containers, multi-stage Dockerfiles, and isolated cloud deployment environments.',
      et: 'Standardiseeritud konteinerid, mitmeastmelised Dockerfile-id ja isoleeritud juurutuskeskkonnad.',
    },
    tags: {
      es: ['Docker', 'Contenedores', 'Cloud'],
      en: ['Docker', 'Containers', 'Cloud'],
      et: ['Docker', 'Konteinerid', 'Pilv'],
    },
  },
};
