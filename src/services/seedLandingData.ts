import { supabase } from './supabase';

export const realLandingSeedData = {
  page_content: [
    // 01 · HERO
    { key: 'hero_kicker', content_es: 'Full-Stack Developer', content_en: 'Full-Stack Developer', content_et: 'Full-Stack Tarkvaraarendaja' },
    { key: 'hero_title', content_es: 'Desarrollo web con foco en arquitectura, rendimiento y código limpio.', content_en: 'Web development focused on architecture, performance, and clean code.', content_et: 'Veebiarendus, mis keskendub arhitektuurile, jõudlusele ja puhtale koodile.' },
    { key: 'hero_tagline', content_es: 'Hola, soy Juan Ortega. Especializado en crear aplicaciones web modernas, bases de datos eficientes e interfaces intuitivas.', content_en: 'Hi, I’m Juan Ortega. Specialized in building modern web apps, efficient databases, and intuitive user interfaces.', content_et: 'Tere, olen Juan Ortega. Spetsialiseerunud kaasaegsete veebirakenduste, tõhusate andmebaaside ja intuitiivsete kasutajaliideste loomisele.' },
    { key: 'specialty_label', content_es: 'ESPECIALIDAD', content_en: 'SPECIALTY', content_et: 'SPETSIALISEERUMINE' },
    { key: 'specialty_val', content_es: 'Software & Web Development', content_en: 'Software & Web Development', content_et: 'Tarkvara ja veebiarendus' },
    { key: 'objective_label', content_es: 'OBJETIVO', content_en: 'OBJECTIVE', content_et: 'EESMÄRK' },
    { key: 'objective_val', content_es: 'Crecer en el ecosistema estonio', content_en: 'Grow in the Estonian ecosystem', content_et: 'Kasvada Eesti ökosüsteemis' },
    { key: 'status_label', content_es: 'DISPONIBILIDAD', content_en: 'AVAILABILITY', content_et: 'SAADAVUS' },
    { key: 'status_val', content_es: 'Inmediata / Proyectos', content_en: 'Immediate / Projects', content_et: 'Kohe saadaval / Projektid' },
    { key: 'download_cv', content_es: 'Descargar CV', content_en: 'Download CV', content_et: 'Laadi alla CV' },
    { key: 'cv_modal_hint', content_es: 'Selecciona la versión de idioma para ver o descargar el Curriculum Vitae:', content_en: 'Select the language version to view or download the Curriculum Vitae:', content_et: 'Vali keeleversioon elulookirjelduse (CV) vaatamiseks või allalaadimiseks:' },

    // 02 · POR QUÉ ESTONIA (VISIÓN)
    { key: 'vision_kicker', content_es: '¿Por qué Estonia?', content_en: 'Why Estonia?', content_et: 'Miks Eesti?' },
    { key: 'vision_title', content_es: 'Un ecosistema donde la innovación digital es el estándar diario.', content_en: 'An ecosystem where digital innovation is the daily standard.', content_et: 'Ökosüsteem, kus digitaalne innovatsioon on igapäevane standard.' },
    { key: 'vision_desc', content_es: 'Me motiva la cultura tecnológica de Estonia: simple, funcional y enfocada en resolver problemas reales con software de alta calidad y arquitectura mantenible.', content_en: 'I am motivated by Estonia’s tech culture: simple, functional, and focused on solving real problems with high-quality software and maintainable architecture.', content_et: 'Mind motiveerib Eesti tehnikakultuur: lihtne, funktsionaalne ja keskendunud tõeliste probleemide lahendamisele kvaliteetse tarkvara ja hooldatava arhitektuuriga.' },
    { key: 'item1_title', content_es: 'Mentalidad de producto', content_en: 'Product mindset', content_et: 'Toote mõtteviis' },
    { key: 'item1_desc', content_es: 'Entender a fondo el problema y las necesidades del usuario antes de escribir cada línea de código.', content_en: 'Deeply understand the problem and user needs before writing a single line of code.', content_et: 'Mõista põhjalikult probleemi ja kasutaja vajadusi enne koodi kirjutamist.' },
    { key: 'item2_title', content_es: 'Arquitectura escalable', content_en: 'Scalable architecture', content_et: 'Skaleeritav arhitektuur' },
    { key: 'item2_desc', content_es: 'Código limpio, tipado estricto y bases de datos optimizadas para crecer de forma estable.', content_en: 'Clean code, strict typing, and databases optimized to scale reliably.', content_et: 'Puhas kood, range tüüpimine ja optimeeritud andmebaasid kindlaks kasvuks.' },
    { key: 'card_kicker', content_es: 'Estonia — Mentalidad Digital', content_en: 'Estonia — Digital Mindset', content_et: 'Eesti — Digitaalne mõtteviis' },
    { key: 'card_text', content_es: 'Innovación técnica, simplicidad y futuro digital.', content_en: 'Technical innovation, simplicity, and digital future.', content_et: 'Tehniline innovatsioon, lihtsus ja digitaalne tulevik.' },

    // 03 · SOBRE MÍ & IDIOMAS & MÉTRICAS
    { key: 'about_kicker', content_es: 'Sobre mí', content_en: 'About me', content_et: 'Minust' },
    { key: 'about_title', content_es: 'Construyo herramientas digitales que resuelven problemas reales.', content_en: 'I build digital tools that solve real problems.', content_et: 'Ehitan digitaalseid tööriistu, mis lahendavad tõelisi probleeme.' },
    { key: 'about_p1', content_es: 'Mi enfoque combina desarrollo frontend y backend con altos estándares: interfaces rápidas, APIs estructuradas y bases de datos eficientes y seguras.', content_en: 'My approach combines frontend and backend development with high standards: fast interfaces, structured APIs, and efficient, secure databases.', content_et: 'Minu lähenemine ühendab frontend- ja backend-arenduse kõrgete standarditega: kiired liidesed, structured API-d ning tõhusad ja turvalised andmebaasid.' },
    { key: 'about_p2', content_es: 'Valoro el trabajo en equipo, la comunicación clara y el aprendizaje continuo en cada producto y reto técnico que emprendo.', content_en: 'I value teamwork, clear communication, and continuous learning across every product and technical challenge I undertake.', content_et: 'Väärtustan meeskonnatööd, selget suhtlust ja pidevat õppimist igas tootes ja tehnilises väljakutses.' },
    { key: 'stat1_num', content_es: '+3', content_en: '+3', content_et: '+3' },
    { key: 'stat1_lbl', content_es: 'AÑOS DE EXPERIENCIA', content_en: 'YEARS EXPERIENCE', content_et: 'AASTAT KOGEMUST' },
    { key: 'stat2_num', content_es: '10+', content_en: '10+', content_et: '10+' },
    { key: 'stat2_lbl', content_es: 'PROYECTOS COMPLETADOS', content_en: 'COMPLETED PROJECTS', content_et: 'VALMINUD PROJEKTI' },
    { key: 'stat3_num', content_es: '100%', content_en: '100%', content_et: '100%' },
    { key: 'stat3_lbl', content_es: 'COMPROMISO TÉCNICO', content_en: 'TECH COMMITMENT', content_et: 'TEHNILINE PÜHENDUMUS' },
    { key: 'lang_section_title', content_es: 'IDIOMAS & COMUNICACIÓN PROFESIONAL', content_en: 'LANGUAGE PROFICIENCY & COMMUNICATION', content_et: 'KEELEOSKUS JA SUHTLUS' },
    { key: 'lang_es_name', content_es: 'Español', content_en: 'Spanish', content_et: 'Hispaania keel' },
    { key: 'lang_es_level', content_es: 'Nativo', content_en: 'Native', content_et: 'Emakeel' },
    { key: 'lang_es_desc', content_es: 'Lengua materna. Comunicación fluida, clara y estructurada en entornos de ingeniería.', content_en: 'Native fluency for clear communication, technical documentation, and collaborative team environments.', content_et: 'Emakeel sujuvaks suhtluseks, tehniliseks dokumentatsiooniks ja koostööks.' },
    { key: 'lang_en_name', content_es: 'Inglés', content_en: 'English', content_et: 'Inglise keel' },
    { key: 'lang_en_level', content_es: 'B1 / B2 · Profesional', content_en: 'B1 / B2 · Professional', content_et: 'B1 / B2 · Professionaalne' },
    { key: 'lang_en_desc', content_es: 'Competencia profesional en lectura de documentación técnica, desarrollo de software y participación en reuniones de equipo.', content_en: 'Professional competence for reading architectural documentation, writing clean code, and participating in daily syncs.', content_et: 'Ametialane pädevus tehnilise dokumentatsiooni lugemiseks, koodi kirjutamiseks ja igapäevaseks tiimitööks.' },
    { key: 'lang_et_name', content_es: 'Estonio', content_en: 'Estonian', content_et: 'Eesti keel' },
    { key: 'lang_et_level', content_es: 'A1 / A2 · En progreso activo', content_en: 'A1 / A2 · Active Learning', content_et: 'A1 / A2 · Aktiivne õpe' },
    { key: 'lang_et_desc', content_es: 'Estudio y práctica activa enfocada en la integración cultural y vida profesional en el ecosistema estonio.', content_en: 'Ongoing study of vocabulary, grammar, and daily communication focused on living and working in Estonia.', content_et: 'Pidev keeleõpe ja praktika suunatud elamiseks ja töötamiseks Eesti digitaalses ökosüsteemis.' },

    // 04 · EXPERIENCIA CABECERA
    { key: 'exp_kicker', content_es: 'Experiencia profesional', content_en: 'Professional experience', content_et: 'Töökogemus' },
    { key: 'exp_title', content_es: 'Trayectoria y desarrollo de soluciones en producción.', content_en: 'Track record building solutions in production.', content_et: 'Töökogemus ja lahenduste loomine tootmises.' },
    { key: 'exp_desc', content_es: 'Experiencia práctica en el desarrollo de software: interfaces web modernas, arquitecturas backend seguras y optimización de bases de datos.', content_en: 'Hands-on experience in software development: modern web interfaces, secure backend architectures, and database performance tuning.', content_et: 'Praktiline kogemus tarkvaraarenduses: kaasaegsed veebiliidesed, turvalised backend-arhitektuurid ja andmebaaside optimeerimine.' },
    { key: 'present_label', content_es: 'Presente · Activo', content_en: 'Present · Active', content_et: 'Praegu · Aktiivne' },

    // 05 · PROYECTOS CABECERA
    { key: 'projects_kicker', content_es: 'Proyectos', content_en: 'Projects', content_et: 'Projektid' },
    { key: 'projects_title', content_es: 'Aplicaciones desarrolladas de extremo a extremo.', content_en: 'End-to-end built applications.', content_et: 'Lõpuni välja arendatud rakendused.' },
    { key: 'projects_subtitle', content_es: 'Una selección de soluciones web completas: arquitectura, bases de datos e interfaces interactivas y fluidas.', content_en: 'A selection of full-stack web solutions: architecture, databases, and interactive, fluid interfaces.', content_et: 'Valik täislahendusi: arhitektuur, andmebaasid ning interaktiivsed ja sujuvad liidesed.' },
    { key: 'demo_btn', content_es: 'Demo en Vivo', content_en: 'Live Demo', content_et: 'Otseülekanne' },
    { key: 'code_btn', content_es: 'Código', content_en: 'Code', content_et: 'Kood' },

    // 06 · TECNOLOGÍAS CABECERA
    { key: 'skills_kicker', content_es: 'Tecnologías', content_en: 'Tech Stack', content_et: 'Tehnoloogiad' },
    { key: 'skills_title', content_es: 'Herramientas con las que construyo en producción.', content_en: 'Tools I use to build in production.', content_et: 'Tööriistad, millega ehitan tootmises.' },
    { key: 'skills_desc', content_es: 'Stack moderno seleccionado para garantizar velocidad de entrega, escalabilidad y una experiencia de usuario óptima.', content_en: 'Modern stack curated to ensure delivery speed, scalability, and optimal user experience.', content_et: 'Kaasaegne tehnoloogiakogum, mis tagab kiire tarne, skaleeritavuse ja optimaalse kasutajakogemuse.' },

    // 07 · CONTACTO CABECERA & FORMULARIO
    { key: 'cta_kicker', content_es: 'Contacto', content_en: 'Contact', content_et: 'Kontakt' },
    { key: 'cta_title', content_es: '¿Tienes un proyecto o una oportunidad en tu equipo? Hablemos.', content_en: 'Have a project or an opening on your team? Let’s talk.', content_et: 'Kas teil on projekt või võimalus oma meeskonnas? Räägime.' },
    { key: 'cta_text', content_es: 'Estoy disponible para conversar sobre nuevas oportunidades de desarrollo, colaboración técnica o proyectos freelance.', content_en: 'I am available to discuss new software opportunities, technical collaboration, or freelance projects.', content_et: 'Olen saadaval, et arutada uusi arendusvõimalusi, tehnilist koostööd või vabakutselisi projekte.' },
    { key: 'contact_form_name', content_es: 'Tu Nombre', content_en: 'Your Name', content_et: 'Sinu nimi' },
    { key: 'contact_form_email', content_es: 'Tu Correo', content_en: 'Your Email', content_et: 'Sinu e-post' },
    { key: 'contact_form_msg', content_es: 'Mensaje', content_en: 'Message', content_et: 'Sõnum' },
    { key: 'contact_send_btn', content_es: 'Enviar Mensaje', content_en: 'Send Message', content_et: 'Saada sõnum' },
  ]
};

export const syncAllLandingDataToSupabase = async () => {
  const results = {
    content: 0,
    projects: 0,
    skills: 0,
    experience: 0,
    errors: [] as string[]
  };

  try {
    // Sincronizar page_content preservando cualquier texto que el usuario ya haya editado en el panel
    const { data: existingRows } = await supabase.from('page_content').select('key');
    const existingSet = new Set((existingRows || []).map((r: any) => r.key));

    for (const item of realLandingSeedData.page_content) {
      if (!existingSet.has(item.key)) {
        const { error } = await supabase.from('page_content').insert([item]);
        if (error) results.errors.push(`Content (${item.key}): ${error.message}`);
        else results.content++;
      }
    }
  } catch (err: any) {
    results.errors.push(err.message || 'Error desconocido al sincronizar');
  }

  return results;
};

