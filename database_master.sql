-- ==========================================
-- MASTER DATABASE SCRIPT: LOADING-PAGEJO
-- Contains: Schema, Storage, Policies and Data
-- ==========================================

-- 1. CLEANUP (Optional - Use only if you want a fresh start)
-- DROP TABLE IF EXISTS projects, page_content, skills, experience, cv_files, messages CASCADE;

-- 2. CREATE TABLES
-- Projects Table
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

-- Page Content Table (Translations)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  content_es TEXT,
  content_en TEXT,
  content_et TEXT
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT,
  category TEXT,
  level INTEGER DEFAULT 0,
  "order" INTEGER DEFAULT 0
);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  role_es TEXT NOT NULL,
  role_en TEXT NOT NULL,
  role_et TEXT NOT NULL,
  description_es TEXT,
  description_en TEXT,
  description_et TEXT,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  location TEXT
);

-- CV Files Table
CREATE TABLE IF NOT EXISTS cv_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lang TEXT UNIQUE NOT NULL,
  file_url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table (Contact Form)
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 4. SECURITY POLICIES (Public and Admin)
-- Public Read Access
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
  CREATE POLICY "Public Insert Messages" ON messages FOR INSERT WITH CHECK (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Admin Full Access (Authenticated Users)
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
  CREATE POLICY "Admin Read Messages" ON messages FOR SELECT USING (auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 5. STORAGE CONFIGURATION (Buckets)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cvs', 'cvs', true), ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
DO $$ BEGIN
  CREATE POLICY "Public Read Storage" ON storage.objects FOR SELECT USING (bucket_id IN ('cvs', 'projects'));
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Manage Storage" ON storage.objects FOR ALL USING (bucket_id IN ('cvs', 'projects') AND auth.role() = 'authenticated');
  EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 6. POPULATE INITIAL DATA
-- PAGE CONTENT
INSERT INTO page_content (key, content_es, content_en, content_et) VALUES
('hero_badge', 'Full-Stack Developer', 'Full-Stack Developer', 'Full-Stack Arendaja'),
('hero_name', 'Juan Ortega: Full-Stack Developer', 'Juan Ortega: Full-Stack Developer', 'Juan Ortega: Full-Stack Developer'),
('hero_specialist', 'Especialista en:', 'Specialist in:', 'Spetsialist:'),
('role_1', 'T.S.U en Informática', 'Computer Science Technician', 'Informaatika tehnik'),
('role_2', 'Ingeniería en Informática (2026)', 'Computer Engineering (2026)', 'Informaatikainsener (2026)'),
('role_3', 'Full-Stack Developer (Python, Django, React)', 'Full-Stack Developer (Python, Django, React)', 'Full-Stack Arendaja (Python, Django, React)'),
('hero_tagline', 'Disponible para reubicación en Estonia (requiere patrocinio de visa de trabajo)', 'Available for relocation to Estonia (requires work visa sponsorship)', 'Saadaval ümberasumiseks Eestisse (vajab tööviisa sponsorlust)'),
('view_projects', 'Ver proyectos', 'View projects', 'Vaata projekte'),
('download_cv', 'Descargar CV', 'Download CV', 'Laadi alla CV'),
('floating_1', 'Desarrollo Web', 'Web Development', 'Veebiarendus'),
('floating_2', 'Optimización SQL', 'SQL Optimization', 'SQL optimeerimine'),
('floating_3', 'Arquitectura Segura', 'Secure Architecture', 'Turvaline arhitektuur'),
('about_subtitle', 'Conoce un poco más', 'Get to know more', 'Saa rohkem teada'),
('about_title', 'Sobre Mí', 'About Me', 'Minust'),
('about_badge_1', 'Inglés: B1/B2 – Competencia profesional', 'English: B1/B2 – Professional proficiency', 'Inglise keel: B1/B2 – Professionaalne pädevus'),
('about_badge_2', 'Estatus: Remoto / Abierto a reubicación Estonia', 'Status: Remote / Open to Estonia relocation', 'Staatus: Kaugtöö / Avatud Eesti ümberasumisele'),
('about_badge_3', 'Meta: Trabajar en Estonia, alto rendimiento', 'Goal: To work in Estonia, high performance', 'Eesmärk: Töötada Eestis, kõrge jõudlus'),
('about_text_1', 'Ingeniero en Informática (próximo a graduarse) con experiencia comprobada en desarrollo Full-Stack.', 'Computer Engineer (soon to graduate) with proven experience in Full-Stack development.', 'Informaatikainsener (peagi lõpetamas), kellel on tõestatud kogemus Full-Stack arenduses.'),
('about_text_2', 'Optimización de consultas SQL y reducción de tiempos de carga en un 20%.', 'SQL query optimization and 20% reduction in load times.', 'SQL päringute optimeerimine ja laadimisaegade vähendamine 20%.'),
('about_text_3', 'Apasionado por la seguridad, cifrado de datos y código limpio.', 'Passionate about security, data encryption, and clean code.', 'Kirglik turvalisuse, andmete krüpteerimise ja puhta koodi vastu.'),
('about_text_4', 'Uso de asistentes de IA para acelerar el desarrollo manteniendo la calidad.', 'Use of AI assistants to accelerate development while maintaining quality.', 'AI assistentide kasutamine arenduse kiirendamiseks, säilitades kvaliteedi.'),
('skills_subtitle', 'Tecnologías y herramientas', 'Technologies and tools', 'Tehnoloogiad ja tööriistad'),
('skills_title', 'Habilidades Técnicas', 'Technical Skills', 'Tehnilised oskused'),
('experience_subtitle', 'Mi trayectoria', 'My career path', 'Minu karjäär'),
('experience_title', 'Experiencia Laboral', 'Work Experience', 'Töökogemus'),
('projects_subtitle', 'Mi portafolio', 'My portfolio', 'Minu portfell'),
('projects_title', 'Proyectos Destacados', 'Featured Projects', 'Esiletõstetud projektid'),
('contact_title', 'Contacto', 'Contact', 'Kontakt'),
('contact_subtitle', '¿Hablamos?', 'Let''s Talk', 'Räägime?'),
('contact_description', 'Estoy disponible para nuevos proyectos.', 'I am available for new projects.', 'Olen saadaval uute projektide jaoks.'),
('contact_desc_detail', 'Siéntete libre de contactarme. Responderé lo antes posible.', 'Feel free to contact me. I will reply as soon as possible.', 'Võtke minuga julgelt ühendust. Vastan esimesel võimalusel.'),
('contact_form_name', 'Nombre', 'Name', 'Nimi'),
('contact_form_email', 'Email', 'Email', 'Email'),
('contact_form_message', 'Mensaje', 'Message', 'Sõnum'),
('contact_send', 'Enviar Mensaje', 'Send Message', 'Saada sõnum'),
('sending', 'Enviando...', 'Sending...', 'Saatmine...'),
('contact_success', '¡Mensaje enviado con éxito!', 'Message sent successfully!', 'Sõnum edukalt saadetud!'),
('contact_error', 'Hubo un error al enviar el mensaje.', 'There was an error sending the message.', 'Sõnumi saatmisel tekkis viga.'),
('cv_not_available', 'El CV en este idioma no está disponible actualmente.', 'The CV in this language is not currently available.', 'Selles keeles CV ei ole hetkel saadaval.'),
('footer_title', 'T.S.U EN INFORMÁTICA | INGENIERÍA EN INFORMÁTICA (2026)', 'COMPUTER SCIENCE TECHNICIAN | COMPUTER ENGINEERING (2026)', 'INFORMAATIKA TEHNIK | INFORMAATIKAINSENER (2026)'),
('footer_location', 'Caracas, Venezuela', 'Caracas, Venezuela', 'Caracas, Venezuela'),
('footer_email', 'juanchoortega2020@gmail.com', 'juanchoortega2020@gmail.com', 'juanchoortega2020@gmail.com'),
('footer_phone', '+58 424-246-18-43', '+58 424-246-18-43', '+58 424-246-18-43'),
('footer_visa', 'Disponible para reubicación en Estonia (requiere patrocinio de visa de trabajo)', 'Available for relocation to Estonia (requires work visa sponsorship)', 'Saadaval ümberasumiseks Eestisse (vajab tööviisa sponsorlust)'),
('footer_text', '© {year} Juan Ortega. Todos los derechos reservados.', '© {year} Juan Ortega. All rights reserved.', '© {year} Juan Ortega. Kõik õigused kaitstud.')
ON CONFLICT (key) DO UPDATE SET
  content_es = EXCLUDED.content_es,
  content_en = EXCLUDED.content_en,
  content_et = EXCLUDED.content_et;

-- SKILLS
INSERT INTO skills (name, category, level, "order") VALUES
('Python', 'Languages', 95, 1),
('JavaScript (JS)', 'Languages', 90, 2),
('TypeScript (TS)', 'Languages', 85, 3),
('HTML5', 'Languages', 95, 4),
('CSS3', 'Languages', 90, 5),
('Django', 'Frameworks', 95, 6),
('React', 'Frameworks', 90, 7),
('MySQL', 'Databases', 90, 8),
('SQLite', 'Databases', 85, 9),
('Supabase', 'Databases', 75, 10),
('Git/GitHub/GitLab', 'Tools', 90, 11),
('VS Code / PyCharm', 'Tools', 95, 12),
('Docker', 'Infrastructure', 60, 13),
('Vercel', 'Infrastructure', 80, 14),
('Proxmox / Grafana', 'Infrastructure', 70, 15),
('DeepSeek / Claude / Gemini', 'AI Tools', 95, 16),
('Scrum / Kanban', 'Methodologies', 90, 17)
ON CONFLICT (id) DO NOTHING;

-- EXPERIENCE
INSERT INTO experience (company, role_es, role_en, role_et, description_es, description_en, description_et, start_date, end_date, is_current, location) VALUES
('Instituto Nacional de Tierras (INTI)', 'Desarrollador Web Full-Stack', 'Full-Stack Web Developer', 'Full-Stack veebiarendaja', 'Construí y mantuve aplicaciones web internas utilizando Django (backend) y React (frontend). Reduje los tiempos de carga en un 20% mediante optimización SQL.', 'Built and maintained internal web applications using Django (backend) and React (frontend). Reduced page load times by 20% through SQL optimization.', 'Ehitasin ja hooldasin sisemisi veebirakendusi kasutades Djangot (backend) ja Reacti (frontend). Vähendasin lehekülgede laadimisaegu 20% SQL optimeerimise kaudu.', '2025-01-01', NULL, TRUE, 'Caracas, Venezuela'),
('Ministerio de Salud (Venezuela)', 'Desarrollador Backend (Proyecto Universitario)', 'Backend Developer (University Project)', 'Backend-arendaja (Ülikooliprojekt)', 'Diseñé e implementé un prototipo de sistema seguro de mensajería interna utilizando Python, Django y MySQL.', 'Designed and implemented a secure internal messaging system prototype using Python, Django, and MySQL.', 'Projekteerisin ja rakendasin turvalise sisemise sõnumisüsteemi prototüübi kasutades Pythonit, Djangot ja MySQLi.', '2024-01-01', '2024-12-31', FALSE, 'Caracas, Venezuela')
ON CONFLICT (id) DO NOTHING;

-- PROJECTS
INSERT INTO projects (title_es, title_en, title_et, description_short_es, description_short_en, description_short_et, github_url, live_url, stack, category) VALUES
('bodega-app', 'bodega-app', 'bodega-app', 'Sistema de gestión de inventario construido con React.', 'Inventory management system built with React.', 'Reactiga ehitatud laohaldussüsteem.', 'https://github.com/JuanORTGA/bodega-app', '#', '["React", "CSS3", "Logic"]', 'Web'),
('NetRevolution', 'NetRevolution', 'NetRevolution', 'Frontend de e-commerce con React, Vite y Supabase.', 'E-commerce frontend with React, Vite and Supabase.', 'E-kaubanduse frontend Reacti, Vite ja Supabase''iga.', 'https://github.com/JuanORTGA/NetRevolution', '#', '["React", "Vite", "Supabase", "Auth"]', 'Web')
ON CONFLICT (id) DO NOTHING;
