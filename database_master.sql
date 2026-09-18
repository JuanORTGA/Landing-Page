-- SCRIPT MAESTRO DE BASE DE DATOS (IDEMPOTENTE Y SEGURO PARA PRODUCCIÓN)
-- NOTA: NO se eliminan tablas para proteger los datos existentes.

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title_es TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_et TEXT NOT NULL,
  description_short_es TEXT,
  description_short_en TEXT,
  description_short_et TEXT,
  description_long_es TEXT,
  description_long_en TEXT,
  description_long_et TEXT,
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  stack JSONB,
  category TEXT
);

CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  content_es TEXT,
  content_en TEXT,
  content_et TEXT
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  category TEXT,
  level INTEGER DEFAULT 0,
  "order" INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  company_logo TEXT,
  role_es TEXT NOT NULL,
  role_en TEXT NOT NULL,
  role_et TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  description_et TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  location TEXT,
  employment_type TEXT,
  work_mode TEXT,
  stack JSONB
);

-- Columnas añadidas para compatibilidad con bases de datos existentes:
ALTER TABLE experience ADD COLUMN IF NOT EXISTS company_logo TEXT;
ALTER TABLE experience ADD COLUMN IF NOT EXISTS employment_type TEXT;
ALTER TABLE experience ADD COLUMN IF NOT EXISTS work_mode TEXT;
ALTER TABLE experience ADD COLUMN IF NOT EXISTS stack JSONB;

CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  institution TEXT NOT NULL,
  institution_logo TEXT,
  degree_es TEXT NOT NULL,
  degree_en TEXT NOT NULL,
  degree_et TEXT NOT NULL,
  field_of_study TEXT,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  credential_id TEXT,
  credential_url TEXT,
  description_es TEXT,
  description_en TEXT,
  description_et TEXT,
  stack JSONB
);

CREATE TABLE IF NOT EXISTS cv_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lang TEXT UNIQUE NOT NULL,
  file_url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public Read Access Education" ON education FOR SELECT USING (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Full Access Education" ON education FOR ALL USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Access Projects" ON projects FOR SELECT USING (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Access Content" ON page_content FOR SELECT USING (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Access Skills" ON skills FOR SELECT USING (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Access Experience" ON experience FOR SELECT USING (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Access CV" ON cv_files FOR SELECT USING (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Public Insert Messages" ON messages FOR INSERT TO anon, authenticated WITH CHECK (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Full Access Projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Full Access Content" ON page_content FOR ALL USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Full Access Skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Full Access Experience" ON experience FOR ALL USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Full Access CV" ON cv_files FOR ALL USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Full Access Messages" ON messages FOR ALL USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('cvs', 'cvs', true), ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

DO $$ BEGIN
  CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id IN ('cvs', 'projects'));
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Manage Storage" ON storage.objects FOR ALL USING (bucket_id IN ('cvs', 'projects') AND auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Insertamos solo los que no existan, SIN borrar los datos del usuario
INSERT INTO page_content (key, content_es, content_en, content_et) VALUES
-- HERO SECTION
('hero_kicker', 'FULL-STACK DEVELOPER', 'FULL-STACK DEVELOPER', 'FULL-STACK ARENDAJA'),
('hero_title', 'Desarrollo web con foco en arquitectura, rendimiento y código limpio.', 'Web development focused on architecture, performance, and clean code.', 'Veebiarendus, mis keskendub arhitektuurile, jõudlusele ja puhtale koodile.'),
('hero_tagline', 'Hola, soy Juan Ortega. Especializado en crear aplicaciones web modernas, bases de datos eficientes e interfaces intuitivas.', 'Hi, I’m Juan Ortega. Specialized in building modern web apps, efficient databases, and intuitive user interfaces.', 'Tere, olen Juan Ortega. Spetsialiseerunud kaasaegsete veebirakenduste, tõhusate andmebaaside ja intuitiivsete kasutajaliideste loomisele.'),
('specialty_label', 'ESPECIALIDAD', 'SPECIALTY', 'SPETSIALISEERUMINE'),
('specialty_val', 'Software & Web Development', 'Software & Web Development', 'Tarkvara ja veebiarendus'),
('objective_label', 'OBJETIVO', 'OBJECTIVE', 'EESMÄRK'),
('objective_val', 'Crecer en el ecosistema estonio', 'Grow in the Estonian ecosystem', 'Kasvada Eesti ökosüsteemis'),
('status_label', 'DISPONIBILIDAD', 'AVAILABILITY', 'SAADAVUS'),
('status_val', 'Inmediata / Proyectos', 'Immediate / Projects', 'Kohe saadaval / Projektid'),
('download_cv', 'Descargar CV', 'Download CV', 'Laadi alla CV'),

-- SECCIÓN 02: POR QUÉ ESTONIA (VISION)
('vision_kicker', '¿Por qué Estonia?', 'Why Estonia?', 'Miks Eesti?'),
('vision_title', 'Un ecosistema donde la innovación digital es el estándar diario.', 'An ecosystem where digital innovation is the daily standard.', 'Ökosüsteem, kus digitaalne innovatsioon on igapäevane standard.'),
('vision_desc', 'Me motiva la cultura tecnológica de Estonia: simple, funcional y enfocada en resolver problemas reales con software de alta calidad y arquitectura mantenible.', 'I am motivated by Estonia’s tech culture: simple, functional, and focused on solving real problems with high-quality software and maintainable architecture.', 'Mind motiveerib Eesti tehnikakultuur: lihtne, funktsionaalne ja keskendunud tõeliste probleemide lahendamisele kvaliteetse tarkvara ja hooldatava arhitektuuriga.'),
('item1_title', 'Mentalidad de producto', 'Product mindset', 'Toote mõtteviis'),
('item1_desc', 'Entender a fondo el problema y las necesidades del usuario antes de escribir cada línea de código.', 'Deeply understand the problem and user needs before writing a single line of code.', 'Mõista põhjalikult probleemi ja kasutaja vajadusi enne koodi kirjutamist.'),
('item2_title', 'Arquitectura escalable', 'Scalable architecture', 'Skaleeritav arhitektuur'),
('item2_desc', 'Código limpio, tipado estricto y bases de datos optimizadas para crecer de forma estable.', 'Clean code, strict typing, and databases optimized to scale reliably.', 'Puhas kood, range tüüpimine ja optimeeritud andmebaasid kindlaks kasvuks.'),
('card_kicker', '• ESTONIA MINDSET', '• ESTONIA MINDSET', '• EESTI MINDSET'),
('card_text', 'Innovación técnica, simplicidad y futuro digital.', 'Technical innovation, simplicity, and digital future.', 'Tehniline innovatsioon, lihtsus ja digitaalne tulevik.'),

-- SECCIÓN 03: SOBRE MÍ (ABOUT)
('about_kicker', '• SOBRE MÍ', '• ABOUT ME', '• MINUST'),
('about_title', 'Construyo herramientas digitales que resuelven problemas reales.', 'I build digital tools that solve real problems.', 'Ehitan digitaalseid tööriistu, mis lahendavad tõelisi probleeme.'),
('about_p1', 'Mi enfoque combina desarrollo frontend y backend con altos estándares: interfaces rápidas, APIs estructuradas y bases de datos eficientes y seguras.', 'My approach combines frontend and backend development with high standards: fast interfaces, structured APIs, and efficient, secure databases.', 'Minu lähenemine ühendab frontend- ja backend-arenduse kõrgete standarditega: kiired liidesed, structured API-d ning tõhusad ja turvalised andmebaasid.'),
('about_p2', 'Valoro el trabajo en equipo, la comunicación clara y el aprendizaje continuo en cada producto y reto técnico que emprendo.', 'I value teamwork, clear communication, and continuous learning across every product and technical challenge I undertake.', 'Väärtustan meeskonnatööd, selget suhtlust ja pidevat õppimist igas tootes ja tehnilises väljakutses.'),
('stat1_num', '+3', '+3', '+3'),
('stat1_lbl', 'AÑOS DE EXPERIENCIA', 'YEARS EXPERIENCE', 'AASTAT KOGEMUST'),
('stat2_num', '10+', '10+', '10+'),
('stat2_lbl', 'PROYECTOS COMPLETADOS', 'COMPLETED PROJECTS', 'VALMINUD PROJEKTI'),
('stat3_num', '100%', '100%', '100%'),
('stat3_lbl', 'COMPROMISO TÉCNICO', 'TECH COMMITMENT', 'TEHNILINE PÜHENDUMUS'),

-- SECCIÓN 04: PROYECTOS (PROJECTS)
('projects_kicker', '• PROYECTOS', '• PROJECTS', '• PROJEKTID'),
('projects_title', 'Aplicaciones desarrolladas de extremo a extremo.', 'End-to-end built applications.', 'Lõpuni välja arendatud rakendused.'),
('projects_subtitle', 'Una selección de soluciones web completas: arquitectura, bases de datos e interfaces interactivas y fluidas.', 'A selection of full-stack web solutions: architecture, databases, and interactive, fluid interfaces.', 'Valik täislahendusi: arhitektuur, andmebaasid ning interaktiivsed ja sujuvad liidesed.'),
('demo_btn', 'Demo en Vivo', 'Live Demo', 'Otseülekanne'),
('code_btn', 'Código', 'Code', 'Kood'),

-- SECCIÓN 05: TECNOLOGÍAS (SKILLS)
('skills_kicker', '• TECNOLOGÍAS', '• TECH STACK', '• TEHNOLOOGIAD'),
('skills_title', 'Herramientas con las que construyo en producción.', 'Tools I use to build in production.', 'Tööriistad, millega ehitan tootmises.'),
('skills_desc', 'Stack moderno seleccionado para garantizar velocidad de entrega, escalabilidad y una experiencia de usuario óptima.', 'Modern stack curated to ensure delivery speed, scalability, and optimal user experience.', 'Kaasaegne tehnoloogiakogum, mis tagab kiire tarne, skaleeritavuse ja optimaalse kasutajakogemuse.'),

-- SECCIÓN 06: CONTACTO (CONTACT)
('cta_kicker', '• CONTACTO', '• CONTACT', '• KONTAKT'),
('cta_title', '¿Tienes un proyecto o una oportunidad en tu equipo? Hablemos.', 'Have a project or an opening on your team? Let’s talk.', 'Kas teil on projekt või võimalus oma meeskonnas? Räägime.'),
('cta_text', 'Estoy disponible para conversar sobre nuevas oportunidades de desarrollo, colaboración técnica o proyectos freelance.', 'I am available to discuss new software opportunities, technical collaboration, or freelance projects.', 'Olen saadaval, et arutada uusi arendusvõimalusi, tehnilist koostööd või vabakutselisi projekte.'),
('contact_form_name', 'Tu Nombre', 'Your Name', 'Sinu nimi'),
('contact_form_email', 'Tu Correo', 'Your Email', 'Sinu e-post'),
('contact_form_msg', 'Mensaje', 'Message', 'Sõnum'),
('contact_send_btn', 'Enviar Mensaje', 'Send Message', 'Saada sõnum')
ON CONFLICT (key) DO NOTHING;

-- DELETE FROM projects;

INSERT INTO projects (title_es, title_en, title_et, description_short_es, description_short_en, description_short_et, github_url, live_url, stack, category, image_url) VALUES
(
  'Nordic Metrics', 
  'Nordic Metrics', 
  'Nordic Metrics', 
  'Dashboard web para visualizar datos operativos y facilitar decisiones rápidas en equipos digitales.', 
  'Web dashboard to visualize operational data and streamline fast decisions in digital teams.', 
  'Veebipõhine juhtpaneel operatiivandmete visualiseerimiseks ja kiirete otsuste toetamiseks.', 
  'https://github.com/JuanORTGA', 
  'https://github.com/JuanORTGA', 
  '["React 18", "TypeScript", "Tailwind", "Chart.js"]', 
  'WEB APP',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
),
(
  'KeeleLeek', 
  'KeeleLeek', 
  'KeeleLeek', 
  'Plataforma interactiva para aprender estonio con ejercicios de audio, vocabulario y gamificación.', 
  'Interactive platform to learn Estonian with audio drills, vocabulary, and gamification.', 
  'Interaktiivne platvorm eesti keele õppimiseks audioharjutuste, sõnavara ja mängulisusega.', 
  'https://github.com/JuanORTGA', 
  'https://github.com/JuanORTGA', 
  '["React", "Node.js", "PostgreSQL", "Tailwind"]', 
  'EDTECH APP',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
),
(
  'TaskFlow Architecture', 
  'TaskFlow Architecture', 
  'TaskFlow Architecture', 
  'Sistema de gestión de tareas en tiempo real con sincronización de estado, autenticación y base de datos relacional.', 
  'Real-time task management system with state sync, auth, and relational database.', 
  'Reaalajas ülesannete haldussüsteem oleku sünkroonimise, autentimise ja relatsioonilise andmebaasiga.', 
  'https://github.com/JuanORTGA', 
  'https://github.com/JuanORTGA', 
  '["TypeScript", "Supabase", "REST API", "Framer"]', 
  'SAAS TOOL',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
);

-- DELETE FROM skills;

INSERT INTO skills (name, icon, category, level, "order") VALUES
('Python & Django', 'python', 'Backend Core', 95, 1),
('React 18 & Vite', 'react', 'Frontend UI', 92, 2),
('TypeScript', 'typescript', 'Languages', 90, 3),
('PostgreSQL & Supabase', 'database', 'Databases', 88, 4),
('Node.js & Express', 'nodejs', 'Backend APIs', 85, 5),
('Docker & Cloud Deploy', 'docker', 'DevOps & Cloud', 82, 6);

-- DELETE FROM experience;

INSERT INTO experience (company, role_es, role_en, role_et, description_es, description_en, description_et, start_date, end_date, is_current, location) VALUES
(
  'Instituto Nacional de Tierras (INTI)', 
  'Desarrollador Web Full-Stack', 
  'Full-Stack Web Developer', 
  'Full-Stack veebiarendaja', 
  'Construí y mantuve aplicaciones web internas utilizando Django (backend) y React (frontend). Reduje tiempos de carga en 20% mediante optimización SQL.', 
  'Built and maintained internal web applications using Django and React. Reduced page load times by 20% through SQL optimization.', 
  'Ehitasin ja hooldasin sisemisi veebirakendusi kasutades Djangot ja Reacti. Vähendasin laadimisaegu 20% SQL optimeerimise kaudu.', 
  '2025-01-01', 
  NULL, 
  TRUE, 
  'Caracas, Venezuela'
),
(
  'Ministerio de Salud (Venezuela)', 
  'Desarrollador Backend', 
  'Backend Developer', 
  'Backend-arendaja', 
  'Diseñé e implementé un prototipo de sistema seguro de mensajería interna utilizando Python, Django y MySQL garantizando cifrado de datos.', 
  'Designed and implemented a secure internal messaging system prototype using Python, Django, and MySQL ensuring data encryption.', 
  'Projekteerisin ja rakendasin turvalise sisemise sõnumisüsteemi prototüübi kasutades Pythonit, Djangot ja MySQLi tagades andmete krüpteerimise.', 
  '2024-01-01', 
  '2024-12-31', 
  FALSE, 
  'Caracas, Venezuela'
);

-- ==============================================================================
-- 🚀 SCRIPT DE SINCRONIZACIÓN TOTAL: INFORMACIÓN REAL DE LA LANDING EN EL ADMIN
-- ==============================================================================
-- Este script actualiza tu base de datos con EXACTAMENTE la misma información,
-- proyectos, tecnologías y textos que tienes actualmente en tu landing page.

-- 1. LIMPIAR CONTENIDOS ANTIGUOS Y SINCRONIZAR TEXTOS REALES (page_content)
DELETE FROM page_content;

INSERT INTO page_content (key, content_es, content_en, content_et) VALUES
-- HERO SECTION
('hero_kicker', 'FULL-STACK DEVELOPER', 'FULL-STACK DEVELOPER', 'FULL-STACK ARENDAJA'),
('hero_title', 'Desarrollo web con foco en arquitectura, rendimiento y código limpio.', 'Web development focused on architecture, performance, and clean code.', 'Veebiarendus, mis keskendub arhitektuurile, jõudlusele ja puhtale koodile.'),
('hero_tagline', 'Hola, soy Juan Ortega. Especializado en crear aplicaciones web modernas, bases de datos eficientes e interfaces intuitivas.', 'Hi, I’m Juan Ortega. Specialized in building modern web apps, efficient databases, and intuitive user interfaces.', 'Tere, olen Juan Ortega. Spetsialiseerunud kaasaegsete veebirakenduste, tõhusate andmebaaside ja intuitiivsete kasutajaliideste loomisele.'),
('specialty_label', 'ESPECIALIDAD', 'SPECIALTY', 'SPETSIALISEERUMINE'),
('specialty_val', 'Software & Web Development', 'Software & Web Development', 'Tarkvara ja veebiarendus'),
('objective_label', 'OBJETIVO', 'OBJECTIVE', 'EESMÄRK'),
('objective_val', 'Crecer en el ecosistema estonio', 'Grow in the Estonian ecosystem', 'Kasvada Eesti ökosüsteemis'),
('status_label', 'DISPONIBILIDAD', 'AVAILABILITY', 'SAADAVUS'),
('status_val', 'Inmediata / Proyectos', 'Immediate / Projects', 'Kohe saadaval / Projektid'),
('download_cv', 'Descargar CV', 'Download CV', 'Laadi alla CV'),

-- SECCIÓN 02: POR QUÉ ESTONIA (VISION)
('vision_kicker', '¿Por qué Estonia?', 'Why Estonia?', 'Miks Eesti?'),
('vision_title', 'Un ecosistema donde la innovación digital es el estándar diario.', 'An ecosystem where digital innovation is the daily standard.', 'Ökosüsteem, kus digitaalne innovatsioon on igapäevane standard.'),
('vision_desc', 'Me motiva la cultura tecnológica de Estonia: simple, funcional y enfocada en resolver problemas reales con software de alta calidad y arquitectura mantenible.', 'I am motivated by Estonia’s tech culture: simple, functional, and focused on solving real problems with high-quality software and maintainable architecture.', 'Mind motiveerib Eesti tehnikakultuur: lihtne, funktsionaalne ja keskendunud tõeliste probleemide lahendamisele kvaliteetse tarkvara ja hooldatava arhitektuuriga.'),
('item1_title', 'Mentalidad de producto', 'Product mindset', 'Toote mõtteviis'),
('item1_desc', 'Entender a fondo el problema y las necesidades del usuario antes de escribir cada línea de código.', 'Deeply understand the problem and user needs before writing a single line of code.', 'Mõista põhjalikult probleemi ja kasutaja vajadusi enne koodi kirjutamist.'),
('item2_title', 'Arquitectura escalable', 'Scalable architecture', 'Skaleeritav arhitektuur'),
('item2_desc', 'Código limpio, tipado estricto y bases de datos optimizadas para crecer de forma estable.', 'Clean code, strict typing, and databases optimized to scale reliably.', 'Puhas kood, range tüüpimine ja optimeeritud andmebaasid kindlaks kasvuks.'),
('card_kicker', '• ESTONIA MINDSET', '• ESTONIA MINDSET', '• EESTI MINDSET'),
('card_text', 'Innovación técnica, simplicidad y futuro digital.', 'Technical innovation, simplicity, and digital future.', 'Tehniline innovatsioon, lihtsus ja digitaalne tulevik.'),

-- SECCIÓN 03: SOBRE MÍ (ABOUT)
('about_kicker', '• SOBRE MÍ', '• ABOUT ME', '• MINUST'),
('about_title', 'Construyo herramientas digitales que resuelven problemas reales.', 'I build digital tools that solve real problems.', 'Ehitan digitaalseid tööriistu, mis lahendavad tõelisi probleeme.'),
('about_p1', 'Mi enfoque combina desarrollo frontend y backend con altos estándares: interfaces rápidas, APIs estructuradas y bases de datos eficientes y seguras.', 'My approach combines frontend and backend development with high standards: fast interfaces, structured APIs, and efficient, secure databases.', 'Minu lähenemine ühendab frontend- ja backend-arenduse kõrgete standarditega: kiired liidesed, struktureeritud API-d ning tõhusad ja turvalised andmebaasid.'),
('about_p2', 'Valoro el trabajo en equipo, la comunicación clara y el aprendizaje continuo en cada producto y reto técnico que emprendo.', 'I value teamwork, clear communication, and continuous learning across every product and technical challenge I undertake.', 'Väärtustan meeskonnatööd, selget suhtlust ja pidevat õppimist igas tootes ja tehnilises väljakutses.'),
('stat1_num', '+3', '+3', '+3'),
('stat1_lbl', 'AÑOS DE EXPERIENCIA', 'YEARS EXPERIENCE', 'AASTAT KOGEMUST'),
('stat2_num', '10+', '10+', '10+'),
('stat2_lbl', 'PROYECTOS COMPLETADOS', 'COMPLETED PROJECTS', 'VALMINUD PROJEKTI'),
('stat3_num', '100%', '100%', '100%'),
('stat3_lbl', 'COMPROMISO TÉCNICO', 'TECH COMMITMENT', 'TEHNILINE PÜHENDUMUS'),

-- SECCIÓN 04: PROYECTOS (PROJECTS)
('projects_kicker', '• PROYECTOS', '• PROJECTS', '• PROJEKTID'),
('projects_title', 'Aplicaciones desarrolladas de extremo a extremo.', 'End-to-end built applications.', 'Lõpuni välja arendatud rakendused.'),
('projects_subtitle', 'Una selección de soluciones web completas: arquitectura, bases de datos e interfaces interactivas y fluidas.', 'A selection of full-stack web solutions: architecture, databases, and interactive, fluid interfaces.', 'Valik täislahendusi: arhitektuur, andmebaasid ning interaktiivsed ja sujuvad liidesed.'),
('demo_btn', 'Demo en Vivo', 'Live Demo', 'Otseülekanne'),
('code_btn', 'Código', 'Code', 'Kood'),

-- SECCIÓN 05: TECNOLOGÍAS (SKILLS)
('skills_kicker', '• TECNOLOGÍAS', '• TECH STACK', '• TEHNOLOOGIAD'),
('skills_title', 'Herramientas con las que construyo en producción.', 'Tools I use to build in production.', 'Tööriistad, millega ehitan tootmises.'),
('skills_desc', 'Stack moderno seleccionado para garantizar velocidad de entrega, escalabilidad y una experiencia de usuario óptima.', 'Modern stack curated to ensure delivery speed, scalability, and optimal user experience.', 'Kaasaegne tehnoloogiakogum, mis tagab kiire tarne, skaleeritavuse ja optimaalse kasutajakogemuse.'),

-- SECCIÓN 06: CONTACTO (CONTACT)
('cta_kicker', '• CONTACTO', '• CONTACT', '• KONTAKT'),
('cta_title', '¿Tienes un proyecto o una oportunidad en tu equipo? Hablemos.', 'Have a project or an opening on your team? Let’s talk.', 'Kas teil on projekt või võimalus oma meeskonnas? Räägime.'),
('cta_text', 'Estoy disponible para conversar sobre nuevas oportunidades de desarrollo, colaboración técnica o proyectos freelance.', 'I am available to discuss new software opportunities, technical collaboration, or freelance projects.', 'Olen saadaval, et arutada uusi arendusvõimalusi, tehnilist koostööd või vabakutselisi projekte.'),
('contact_form_name', 'Tu Nombre', 'Your Name', 'Sinu nimi'),
('contact_form_email', 'Tu Correo', 'Your Email', 'Sinu e-post'),
('contact_form_msg', 'Mensaje', 'Message', 'Sõnum'),
('contact_send_btn', 'Enviar Mensaje', 'Send Message', 'Saada sõnum');

-- 2. SINCRONIZAR PROYECTOS REALES (projects)
-- DELETE FROM projects;

INSERT INTO projects (title_es, title_en, title_et, description_short_es, description_short_en, description_short_et, github_url, live_url, stack, category, image_url) VALUES
(
  'Nordic Metrics', 
  'Nordic Metrics', 
  'Nordic Metrics', 
  'Dashboard web para visualizar datos operativos y facilitar decisiones rápidas en equipos digitales.', 
  'Web dashboard to visualize operational data and streamline fast decisions in digital teams.', 
  'Veebipõhine juhtpaneel operatiivandmete visualiseerimiseks ja kiirete otsuste toetamiseks.', 
  'https://github.com/JuanORTGA', 
  'https://github.com/JuanORTGA', 
  '["React 18", "TypeScript", "Tailwind", "Chart.js"]', 
  'WEB APP',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
),
(
  'KeeleLeek', 
  'KeeleLeek', 
  'KeeleLeek', 
  'Plataforma interactiva para aprender estonio con ejercicios de audio, vocabulario y gamificación.', 
  'Interactive platform to learn Estonian with audio drills, vocabulary, and gamification.', 
  'Interaktiivne platvorm eesti keele õppimiseks audioharjutuste, sõnavara ja mängulisusega.', 
  'https://github.com/JuanORTGA', 
  'https://github.com/JuanORTGA', 
  '["React", "Node.js", "PostgreSQL", "Tailwind"]', 
  'EDTECH APP',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
),
(
  'TaskFlow Architecture', 
  'TaskFlow Architecture', 
  'TaskFlow Architecture', 
  'Sistema de gestión de tareas en tiempo real con sincronización de estado, autenticación y base de datos relacional.', 
  'Real-time task management system with state sync, auth, and relational database.', 
  'Reaalajas ülesannete haldussüsteem oleku sünkroonimise, autentimise ja relatsioonilise andmebaasiga.', 
  'https://github.com/JuanORTGA', 
  'https://github.com/JuanORTGA', 
  '["TypeScript", "Supabase", "REST API", "Framer"]', 
  'SAAS TOOL',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
);

-- 3. SINCRONIZAR TECNOLOGÍAS REALES (skills)
-- DELETE FROM skills;

INSERT INTO skills (name, icon, category, level, "order") VALUES
('Python & Django', 'python', 'Backend Core', 95, 1),
('React 18 & Vite', 'react', 'Frontend UI', 92, 2),
('TypeScript', 'typescript', 'Languages', 90, 3),
('PostgreSQL & Supabase', 'database', 'Databases', 88, 4),
('Node.js & Express', 'nodejs', 'Backend APIs', 85, 5),
('Docker & Cloud Deploy', 'docker', 'DevOps & Cloud', 82, 6);

-- 4. SINCRONIZAR EXPERIENCIA LABORAL REAL (experience)
-- DELETE FROM experience;

INSERT INTO experience (company, role_es, role_en, role_et, description_es, description_en, description_et, start_date, end_date, is_current, location) VALUES
(
  'Instituto Nacional de Tierras (INTI)', 
  'Desarrollador Web Full-Stack', 
  'Full-Stack Web Developer', 
  'Full-Stack veebiarendaja', 
  'Construí y mantuve aplicaciones web internas utilizando Django (backend) y React (frontend). Reduje tiempos de carga en 20% mediante optimización SQL.', 
  'Built and maintained internal web applications using Django and React. Reduced page load times by 20% through SQL optimization.', 
  'Ehitasin ja hooldasin sisemisi veebirakendusi kasutades Djangot ja Reacti. Vähendasin laadimisaegu 20% SQL optimeerimise kaudu.', 
  '2025-01-01', 
  NULL, 
  TRUE, 
  'Caracas, Venezuela'
),
(
  'Ministerio de Salud (Venezuela)', 
  'Desarrollador Backend', 
  'Backend Developer', 
  'Backend-arendaja', 
  'Diseñé e implementé un prototipo de sistema seguro de mensajería interna utilizando Python, Django y MySQL garantizando cifrado de datos.', 
  'Designed and implemented a secure internal messaging system prototype using Python, Django, and MySQL ensuring data encryption.', 
  'Projekteerisin ja rakendasin turvalise sisemise sõnumisüsteemi prototüübi kasutades Pythonit, Djangot ja MySQLi tagades andmete krüpteerimise.', 
  '2024-01-01', 
  '2024-12-31', 
  FALSE, 
  'Caracas, Venezuela'
);
