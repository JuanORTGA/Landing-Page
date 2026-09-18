export interface TechPreset {
  id: string;
  name: string;
  category: string;
  group: 'ai' | 'frontend' | 'backend' | 'database' | 'devops' | 'languages' | 'tools';
  color: string;
  tier: string;
  svgIcon: string;
}

export const techGroups = [
  { id: 'all', label: '🌟 Todos los Logos', icon: '🌟' },
  { id: 'ai', label: '👁️ IA & Computer Vision', icon: '👁️' },
  { id: 'backend', label: '⚙️ Backend & Frameworks', icon: '⚙️' },
  { id: 'frontend', label: '🎨 Frontend & UI', icon: '🎨' },
  { id: 'database', label: '🗄️ Bases de Datos', icon: '🗄️' },
  { id: 'devops', label: '🚀 DevOps & Cloud', icon: '🚀' },
  { id: 'languages', label: '💻 Lenguajes Core', icon: '💻' },
  { id: 'tools', label: '🛠️ Herramientas & Diseño', icon: '🛠️' },
];

export interface SkillCategoryOption {
  label: string;
  value: string;
  group: string;
  icon: string;
}

export const skillCategoriesList: SkillCategoryOption[] = [
  { label: 'Computer Vision & AI', value: 'Computer Vision & AI', group: '👁️ IA & Visión Artificial', icon: '👁️' },
  { label: 'Deep Learning & AI', value: 'Deep Learning & AI', group: '👁️ IA & Visión Artificial', icon: '🧠' },
  { label: 'Generative AI & LLMs', value: 'Generative AI & LLMs', group: '👁️ IA & Visión Artificial', icon: '🤖' },
  { label: 'Machine Learning & Data', value: 'Machine Learning & Data', group: '👁️ IA & Visión Artificial', icon: '📊' },
  { label: 'Data Science & Analysis', value: 'Data Science & Analysis', group: '👁️ IA & Visión Artificial', icon: '📈' },
  
  { label: 'Backend Frameworks', value: 'Backend Frameworks', group: '⚙️ Backend & Servidores', icon: '⚙️' },
  { label: 'Backend APIs & Microservicios', value: 'Backend APIs', group: '⚙️ Backend & Servidores', icon: '🔌' },
  { label: 'Backend Architecture', value: 'Backend Architecture', group: '⚙️ Backend & Servidores', icon: '🏛️' },

  { label: 'Frontend & UI', value: 'Frontend & UI', group: '🎨 Frontend & Web', icon: '🎨' },
  { label: 'Frontend & SSR / Frameworks', value: 'Frontend & SSR', group: '🎨 Frontend & Web', icon: '⚡' },
  { label: 'Frontend UI & Styling', value: 'Frontend UI', group: '🎨 Frontend & Web', icon: '💄' },
  { label: 'Frontend Tooling & Bundlers', value: 'Frontend Tooling', group: '🎨 Frontend & Web', icon: '📦' },

  { label: 'Databases & SQL', value: 'Databases & SQL', group: '🗄️ Bases de Datos', icon: '🗄️' },
  { label: 'Databases & Auth / BaaS', value: 'Databases & Auth', group: '🗄️ Bases de Datos', icon: '🔐' },
  { label: 'Databases & Cache', value: 'Databases & Cache', group: '🗄️ Bases de Datos', icon: '⚡' },
  { label: 'Databases & NoSQL', value: 'Databases & NoSQL', group: '🗄️ Bases de Datos', icon: '🍃' },

  { label: 'DevOps & Containers', value: 'DevOps & Containers', group: '🚀 DevOps & Infraestructura', icon: '🐳' },
  { label: 'DevOps & Cloud', value: 'DevOps & Cloud', group: '🚀 DevOps & Infraestructura', icon: '☁️' },
  { label: 'CI/CD & Workflows', value: 'CI/CD & Workflows', group: '🚀 DevOps & Infraestructura', icon: '🔄' },
  { label: 'Cloud & Hosting', value: 'Cloud & Hosting', group: '🚀 DevOps & Infraestructura', icon: '🌐' },

  { label: 'Languages & Core', value: 'Languages & Core', group: '💻 Lenguajes de Programación', icon: '💻' },

  { label: 'Design & Prototyping', value: 'Design & Prototyping', group: '🛠️ Herramientas & Entorno', icon: '🖌️' },
  { label: 'API Testing & Design', value: 'API Testing & Design', group: '🛠️ Herramientas & Entorno', icon: '📬' },
  { label: 'Testing & QA', value: 'Testing & QA', group: '🛠️ Herramientas & Entorno', icon: '🧪' },
  { label: 'Developer Environment', value: 'Developer Environment', group: '🛠️ Herramientas & Entorno', icon: '🖥️' }
];

export const techPresetsList: TechPreset[] = [
  // ─── 1. INTELIGENCIA ARTIFICIAL, COMPUTER VISION & DATA SCIENCE ───
  {
    id: 'yolo',
    name: 'YOLO (Ultralytics)',
    category: 'Computer Vision & AI',
    group: 'ai',
    color: '#0052ff',
    tier: 'Object Detection',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="yoloGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230052ff"/><stop offset="100%" stop-color="%2300d2ff"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(%23yoloGrad)"/><rect x="18" y="18" width="64" height="64" rx="10" fill="none" stroke="%23ffffff" stroke-width="3" stroke-dasharray="8 5"/><path d="M32 30 L48 50 L48 68 L54 68 L54 50 L70 30 L61 30 L51 44 L41 30 Z" fill="%23ffffff"/><circle cx="51" cy="44" r="4.5" fill="%2300f0ff"/><text x="50" y="90" font-family="system-ui,-apple-system,sans-serif" font-size="13" font-weight="900" fill="%23ffffff" text-anchor="middle" letter-spacing="1.5">YOLO</text></svg>'
  },
  {
    id: 'roboflow',
    name: 'Roboflow',
    category: 'Computer Vision & AI',
    group: 'ai',
    color: '#6706ce',
    tier: 'Dataset & Model Deploy',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="roboGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%236706ce"/><stop offset="100%" stop-color="%239d4edd"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(%23roboGrad)"/><path d="M50 15 L78 31 L50 47 L22 31 Z" fill="%23c77dff"/><path d="M22 31 L50 47 L50 79 L22 63 Z" fill="%235a189a"/><path d="M78 31 L50 47 L50 79 L78 63 Z" fill="%237b2cbf"/><rect x="40" y="39" width="20" height="20" rx="4" fill="%23ffffff"/><circle cx="50" cy="49" r="5" fill="%236706ce"/><text x="50" y="93" font-family="system-ui,-apple-system,sans-serif" font-size="9.5" font-weight="900" fill="%23ffffff" text-anchor="middle" letter-spacing="1">ROBOFLOW</text></svg>'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'Computer Vision & AI',
    group: 'ai',
    color: '#5c3ee8',
    tier: 'Image Processing',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'Deep Learning & AI',
    group: 'ai',
    color: '#ee4c2c',
    tier: 'Neural Networks',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow & Keras',
    category: 'Machine Learning & AI',
    group: 'ai',
    color: '#ff6f00',
    tier: 'Deep Learning',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face & Transformers',
    category: 'AI & NLP',
    group: 'ai',
    color: '#ffcc00',
    tier: 'LLMs & Foundation Models',
    svgIcon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg'
  },
  {
    id: 'openai',
    name: 'OpenAI API & LLMs',
    category: 'Generative AI',
    group: 'ai',
    color: '#10a37f',
    tier: 'GPT & Agents',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%2310a37f"/><path d="M78 47.5c-.8-5.3-4.2-9.7-9-11.8.4-1.5.5-3 .3-4.6-.6-4.9-4.2-8.9-9.1-10-3.3-.8-6.8-.2-9.6 1.6-1.5-2.2-3.8-3.7-6.5-4.4-5.3-1.3-10.8.9-13.4 5.4-2.5.3-4.8 1.4-6.6 3.1-3.8 3.5-5.2 8.9-3.7 13.8-2.2 1.3-3.8 3.5-4.5 6.1-1.3 5.2.8 10.7 5.2 13.6-.4 1.5-.5 3-.3 4.6.6 4.9 4.2 8.9 9.1 10 3.3.8 6.8.2 9.6-1.6 1.5 2.2 3.8 3.7 6.5 4.4 5.3 1.3 10.8-.9 13.4-5.4 2.5-.3 4.8-1.4 6.6-3.1 3.8-3.5 5.2-8.9 3.7-13.8 2.2-1.3 3.8-3.5 4.5-6.1 1.2-5.3-.9-10.8-5.2-13.8zm-26.6 33.4c-2.4 0-4.7-.7-6.6-2.1l11.4-6.6c.8-.5 1.3-1.3 1.3-2.2v-16.1l4.8 2.8c.1 0 .2.1.2.2v14.1c0 5.4-4.4 9.9-11.1 9.9zm-26.1-12c-1.4-2.3-2-5-1.6-7.7l11.4 6.6c.8.5 1.7.5 2.5 0l13.9-8v5.6c0 .1-.1.2-.2.2l-12.2 7.1c-4.7 2.7-10.7 1.2-13.8-3.8zm-3.8-28.7c1-2.5 2.9-4.6 5.3-5.7v13.2c0 .9.5 1.8 1.3 2.2l13.9 8-4.8 2.8c-.1 0-.2.1-.2 0l-12.2-7.1c-4.7-2.7-6.5-8.6-3.3-13.4zm48.5 10.3l-13.9-8 4.8-2.8c.1 0 .2-.1.2 0l12.2 7.1c4.7 2.7 6.5 8.6 3.3 13.4-1 2.5-2.9 4.6-5.3 5.7v-13.2c0-.9-.5-1.8-1.3-2.2zm7.7-11.1c1.4 2.3 2 5 1.6 7.7l-11.4-6.6c-.8-.5-1.7-.5-2.5 0l-13.9 8v-5.6c0-.1.1-.2.2-.2l12.2-7.1c4.7-2.7 10.7-1.2 13.8 3.8zm-23.7-13.3c2.4 0 4.7.7 6.6 2.1l-11.4 6.6c-.8.5-1.3 1.3-1.3 2.2v16.1l-4.8-2.8c-.1 0-.2-.1-.2-.2v-14.1c0-5.4 4.4-9.9 11.1-9.9zm-5.7 24.1l6.2-3.6 6.2 3.6v7.2l-6.2 3.6-6.2-3.6v-7.2z" fill="%23ffffff"/></svg>'
  },
  {
    id: 'scikitlearn',
    name: 'Scikit-Learn',
    category: 'Machine Learning',
    group: 'ai',
    color: '#f89939',
    tier: 'Predictive Models',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg'
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data Science & Analysis',
    group: 'ai',
    color: '#150458',
    tier: 'Data Wrangling',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg'
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Scientific Computing',
    group: 'ai',
    color: '#4dabcf',
    tier: 'Numerical Matrix',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg'
  },

  // ─── 2. LENGUAJES CORE (PYTHON SEPARADO DE DJANGO) ───
  {
    id: 'python',
    name: 'Python',
    category: 'Languages & Core',
    group: 'languages',
    color: '#3776ab',
    tier: 'Core Language',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Languages & Core',
    group: 'languages',
    color: '#3178c6',
    tier: 'Daily Driver',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Languages & Core',
    group: 'languages',
    color: '#f7df1e',
    tier: 'Web Standard',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  {
    id: 'sql',
    name: 'SQL (Optimization)',
    category: 'Languages & Core',
    group: 'languages',
    color: '#0072ce',
    tier: 'Query Architecture',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
  },
  {
    id: 'cplusplus',
    name: 'C++',
    category: 'Languages & Core',
    group: 'languages',
    color: '#00599c',
    tier: 'High Performance',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
  },
  {
    id: 'go',
    name: 'Go (Golang)',
    category: 'Languages & Core',
    group: 'languages',
    color: '#00add8',
    tier: 'Concurrent Systems',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'Languages & Core',
    group: 'languages',
    color: '#dea584',
    tier: 'Memory Safety',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 106 106"><rect width="106" height="106" rx="22" fill="%23241b18"/><g fill="%23dea584"><path d="M103.7 44.5l-8.5-4.9c-.3-.9-.6-1.8-1-2.6l4.9-8.5c1.4-2.5.6-5.7-1.9-7.1l-6.8-3.9c-2.5-1.4-5.7-.6-7.1 1.9l-4.9 8.5c-.9-.3-1.8-.6-2.7-.9l-1.3-9.7c-.4-2.9-2.9-5-5.8-5h-7.8c-2.9 0-5.4 2.1-5.8 5l-1.3 9.7c-.9.3-1.8.6-2.7.9l-4.9-8.5c-1.4-2.5-4.6-3.3-7.1-1.9l-6.8 3.9c-2.5 1.4-3.3 4.6-1.9 7.1l4.9 8.5c-.4.8-.7 1.7-1 2.6l-8.5 4.9c-2.5 1.4-3.3 4.6-1.9 7.1l3.9 6.8c1.4 2.5 4.6 3.3 7.1 1.9l8.5-4.9c.8.4 1.7.7 2.6 1l1.3 9.7c.4 2.9 2.9 5 5.8 5h7.8c2.9 0 5.4-2.1 5.8-5l1.3-9.7c.9-.3 1.8-.6 2.7-.9l4.9 8.5c1.4 2.5 4.6 3.3 7.1 1.9l6.8-3.9c2.5-1.4 3.3-4.6 1.9-7.1l-4.9-8.5c.4-.8.7-1.7 1-2.6l8.5-4.9c2.5-1.4 3.3-4.6 1.9-7.1l-3.9-6.8c-1.4-2.5-4.6-3.3-7.1-1.9zm-50.7 27c-10.2 0-18.5-8.3-18.5-18.5s8.3-18.5 18.5-18.5 18.5 8.3 18.5 18.5-8.3 18.5-18.5 18.5z"/><path d="M43 33h16c6.6 0 11 4.2 11 10 0 4.5-2.6 8.2-7 9.5l8 15.5h-7l-7.2-14.5H49.5V68H43V33zm6.5 15.5h9c3 0 5-1.8 5-4.5s-2-4.5-5-4.5h-9v9z"/></g></svg>'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Languages & Core',
    group: 'languages',
    color: '#f89820',
    tier: 'Enterprise Systems',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'Languages & Core',
    group: 'languages',
    color: '#777bb4',
    tier: 'Web Backend',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
  },

  // ─── 3. BACKEND & FRAMEWORKS (DJANGO SEPARADO) ───
  {
    id: 'django',
    name: 'Django',
    category: 'Backend Frameworks',
    group: 'backend',
    color: '#0c4b33',
    tier: 'Python Backend Core',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="djBg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230c4b33"/><stop offset="100%" stop-color="%23092e20"/></linearGradient></defs><rect width="100" height="100" rx="20" fill="url(%23djBg)"/><rect x="6" y="6" width="88" height="88" rx="16" fill="none" stroke="%2344b78b" stroke-width="2" opacity="0.4"/><g fill="%23ffffff" transform="translate(6, 28) scale(0.88)"><path d="M12 28 C5.4 28 0 22.6 0 16 C0 9.4 5.4 4 12 4 C14.6 4 17 4.8 19 6.2 V-8 H27 V27 H19.2 V25.6 C17.2 27.1 14.8 28 12 28 Z M13.5 21 C17.6 21 20 18.2 20 15 C20 11.8 17.6 9 13.5 9 C9.4 9 7 11.8 7 15 C7 18.2 9.4 21 13.5 21 Z"/><path d="M32 -8 H40 V4.5 H32 Z M32 7.5 H40 V35 C40 40 37 43 31 43 C28 43 25.5 42 24 41 L26 35 C27 36 28.5 36.5 30 36.5 C32.5 36.5 33.5 35 33.5 32.5 V7.5 H32 Z"/><path d="M51 28 C45 28 41 24.5 41 19.5 C41 14 46 11.5 53 11.5 C55 11.5 57 11.8 58.5 12.2 V11 C58.5 8.5 56.5 7 53 7 C50 7 47.5 8 46 9 L44 4 C46.5 2.5 50.5 1.5 54.5 1.5 C61.5 1.5 66 5 66 12 V27 H58.5 V25.5 C56.5 27.1 54 28 51 28 Z M53.5 22.5 C56.5 22.5 58.5 20.8 58.5 18 V16.5 C57 16 55 15.8 53.5 15.8 C49 15.8 46.5 17 46.5 19.2 C46.5 21.2 48.5 22.5 53.5 22.5 Z"/><path d="M71 7.5 H78.5 V10 C80.5 8 83 7 86.5 7 C92.5 7 96 10.5 96 17 V27 H88.5 V18 C88.5 14 86.5 12.5 84 12.5 C81 12.5 78.5 14.5 78.5 18.5 V27 H71 Z"/></g></svg>'
  },
  {
    id: 'drf',
    name: 'Django REST Framework',
    category: 'Backend APIs',
    group: 'backend',
    color: '#a30000',
    tier: 'REST APIs & Serialization',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%238a0000"/><rect x="6" y="6" width="88" height="88" rx="16" fill="none" stroke="%23ff6666" stroke-width="2" opacity="0.4"/><text x="50" y="62" font-family="system-ui,-apple-system,sans-serif" font-size="28" font-weight="900" fill="%23ffffff" text-anchor="middle" letter-spacing="1">DRF</text></svg>'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend APIs',
    group: 'backend',
    color: '#05998b',
    tier: 'Async REST APIs',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend Microframeworks',
    group: 'backend',
    color: '#38bdf8',
    tier: 'Lightweight APIs',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="22" fill="%231e293b"/><path d="M44 20 L56 20 L56 36 L74 68 C78 75 73 82 65 82 L35 82 C27 82 22 75 26 68 L44 36 Z" fill="none" stroke="%2338bdf8" stroke-width="4"/><path d="M32 64 L68 64" stroke="%2338bdf8" stroke-width="3"/><circle cx="50" cy="72" r="3" fill="%2338bdf8"/></svg>'
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'Backend APIs',
    group: 'backend',
    color: '#68a063',
    tier: 'APIs & Microservices',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 6 L88 28 L88 72 L50 94 L12 72 L12 28 Z" fill="%23339933"/><path d="M50 11 L82 30 L82 70 L50 89 L18 70 L18 30 Z" fill="%231e5628"/><text x="50" y="52" font-family="system-ui,-apple-system,sans-serif" font-size="20" font-weight="900" fill="%23ffffff" text-anchor="middle" letter-spacing="-0.5">node</text><text x="50" y="74" font-family="system-ui,-apple-system,sans-serif" font-size="22" font-weight="900" fill="%2383cd29" text-anchor="middle" letter-spacing="1">.js</text></svg>'
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'Backend Architecture',
    group: 'backend',
    color: '#e0234e',
    tier: 'Enterprise TypeScript',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg'
  },
  {
    id: 'graphql',
    name: 'GraphQL & Apollo',
    category: 'Backend APIs',
    group: 'backend',
    color: '#e10098',
    tier: 'Query Federation',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg'
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'Backend Frameworks',
    group: 'backend',
    color: '#ff2d20',
    tier: 'Full-Stack PHP',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'
  },
  {
    id: 'spring',
    name: 'Spring Boot',
    category: 'Backend Frameworks',
    group: 'backend',
    color: '#6db33f',
    tier: 'Enterprise Java',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
  },

  // ─── 4. FRONTEND & UI ───
  {
    id: 'react',
    name: 'React 18',
    category: 'Frontend & UI',
    group: 'frontend',
    color: '#61dafb',
    tier: 'Production Grade',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    id: 'nextjs',
    name: 'Next.js 14/15',
    category: 'Frontend & SSR',
    group: 'frontend',
    color: '#ffffff',
    tier: 'Full-Stack React',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23000000" stroke="%23ffffff" stroke-width="3"/><path d="M36 32 V68 M36 32 L68 70 M64 32 V54" stroke="%23ffffff" stroke-width="6" stroke-linecap="round" fill="none"/></svg>'
  },
  {
    id: 'vue',
    name: 'Vue.js & Nuxt',
    category: 'Frontend & UI',
    group: 'frontend',
    color: '#42b883',
    tier: 'Progressive UI',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg'
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'Frontend & UI',
    group: 'frontend',
    color: '#dd0031',
    tier: 'Enterprise SPA',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg'
  },
  {
    id: 'svelte',
    name: 'Svelte & SvelteKit',
    category: 'Frontend & UI',
    group: 'frontend',
    color: '#ff3e00',
    tier: 'Reactive Engine',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend UI',
    group: 'frontend',
    color: '#38bdf8',
    tier: 'Modern Utility Styling',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
  },
  {
    id: 'html5',
    name: 'HTML5 & Semantic Web',
    category: 'Frontend Standards',
    group: 'frontend',
    color: '#e34f26',
    tier: 'Standards',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  },
  {
    id: 'css3',
    name: 'CSS3 & Modern Layouts',
    category: 'Frontend Standards',
    group: 'frontend',
    color: '#1572b6',
    tier: 'Flexbox & Grid',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  },
  {
    id: 'sass',
    name: 'Sass / SCSS',
    category: 'Frontend Styling',
    group: 'frontend',
    color: '#cc6699',
    tier: 'Preprocessors',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg'
  },
  {
    id: 'vite',
    name: 'Vite & Bundlers',
    category: 'Frontend Tooling',
    group: 'frontend',
    color: '#646cff',
    tier: 'Fast Build Tools',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg'
  },

  // ─── 5. BASES DE DATOS & CACHE ───
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Databases & SQL',
    group: 'database',
    color: '#336791',
    tier: 'Relational DB Core',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'
  },
  {
    id: 'supabase',
    name: 'Supabase & Postgres',
    category: 'Databases & Auth',
    group: 'database',
    color: '#3ecf8e',
    tier: 'Cloud Architecture & RLS',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases & SQL',
    group: 'database',
    color: '#00758f',
    tier: 'Relational Database',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Databases & Cache',
    group: 'database',
    color: '#dc382d',
    tier: 'High Speed Memory Cache',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases & NoSQL',
    group: 'database',
    color: '#47a248',
    tier: 'Document Database',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'Databases & Embedded',
    group: 'database',
    color: '#003b57',
    tier: 'Embedded Storage',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg'
  },
  {
    id: 'firebase',
    name: 'Firebase & Firestore',
    category: 'Databases & BaaS',
    group: 'database',
    color: '#ffca28',
    tier: 'Real-Time Sync',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg'
  },
  {
    id: 'prisma',
    name: 'Prisma ORM',
    category: 'Databases & ORMs',
    group: 'database',
    color: '#2d3748',
    tier: 'Type-Safe Queries',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg'
  },

  // ─── 6. DEVOPS, CLOUD & CONTENEDORES ───
  {
    id: 'docker',
    name: 'Docker & DevOps',
    category: 'DevOps & Containers',
    group: 'devops',
    color: '#2496ed',
    tier: 'Containerization',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'DevOps & Orchestration',
    group: 'devops',
    color: '#326ce5',
    tier: 'Container Orchestration',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'CI/CD & Workflows',
    group: 'devops',
    color: '#f05032',
    tier: 'Version Control',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'
  },
  {
    id: 'github',
    name: 'GitHub Actions & CI/CD',
    category: 'CI/CD & Workflows',
    group: 'devops',
    color: '#ffffff',
    tier: 'Automated CI/CD',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%231e293b" stroke="%23ffffff" stroke-width="2"/><path d="M50 16 C31.2 16 16 31.2 16 50 C16 65 25.8 77.8 39.3 82.3 C41 82.6 41.6 81.6 41.6 80.7 V74.8 C32.1 76.8 30.1 70.3 30.1 70.3 C28.5 66.4 26.3 65.3 26.3 65.3 C23.2 63.2 26.5 63.2 26.5 63.2 C29.9 63.5 31.7 67 31.7 67 C34.7 72.1 39.7 70.6 41.6 69.7 C41.9 67.5 42.8 66 43.8 65.1 C36.2 64.3 28.2 61.3 28.2 48.3 C28.2 44.6 29.5 41.5 31.7 39.1 C31.3 38.2 30.2 34.7 32 30 C32 30 34.8 29.1 41.3 33.5 C44 32.8 46.8 32.4 49.6 32.4 C52.4 32.4 55.2 32.8 57.9 33.5 C64.4 29.1 67.2 30 67.2 30 C69 34.7 67.9 38.2 67.5 39.1 C69.7 41.5 71 44.6 71 48.3 C71 61.4 62.9 64.2 55.3 65.1 C56.5 66.2 57.6 68.3 57.6 71.5 V80.7 C57.6 81.6 58.2 82.6 59.9 82.3 C73.4 77.8 83.2 65 83.2 50 C83.2 31.2 68 16 50 16 Z" fill="%23ffffff"/></svg>'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    category: 'CI/CD & DevOps',
    group: 'devops',
    color: '#fc6d26',
    tier: 'DevOps Platform',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg'
  },
  {
    id: 'linux',
    name: 'Linux Server & Bash',
    category: 'DevOps & Systems',
    group: 'devops',
    color: '#fcc624',
    tier: 'Infrastructure OS',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'
  },
  {
    id: 'aws',
    name: 'AWS (Cloud)',
    category: 'DevOps & Cloud',
    group: 'devops',
    color: '#ff9900',
    tier: 'Cloud Provider',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg'
  },
  {
    id: 'googlecloud',
    name: 'Google Cloud Platform',
    category: 'DevOps & Cloud',
    group: 'devops',
    color: '#4285f4',
    tier: 'GCP Cloud Infrastructure',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg'
  },
  {
    id: 'vercel',
    name: 'Vercel Deployments',
    category: 'Cloud & Hosting',
    group: 'devops',
    color: '#ffffff',
    tier: 'Edge Deployments',
    svgIcon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="%23000000" stroke="%23ffffff" stroke-width="2"/><path d="M50 24 L80 74 L20 74 Z" fill="%23ffffff"/></svg>'
  },
  {
    id: 'nginx',
    name: 'Nginx Reverse Proxy',
    category: 'DevOps & Networking',
    group: 'devops',
    color: '#009639',
    tier: 'Web Server & Load Balancer',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg'
  },

  // ─── 7. HERRAMIENTAS, TESTING & DISEÑO ───
  {
    id: 'figma',
    name: 'Figma & UI/UX',
    category: 'Design & Prototyping',
    group: 'tools',
    color: '#f24e1e',
    tier: 'Design Systems',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'API Testing & Design',
    group: 'tools',
    color: '#ff6c37',
    tier: 'API Testing & Docs',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg'
  },
  {
    id: 'swagger',
    name: 'Swagger & OpenAPI',
    category: 'API Documentation',
    group: 'tools',
    color: '#85ea2d',
    tier: 'API Specifications',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg'
  },
  {
    id: 'jest',
    name: 'Jest & Vitest',
    category: 'Testing & QA',
    group: 'tools',
    color: '#c21325',
    tier: 'Unit Testing',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg'
  },
  {
    id: 'vscode',
    name: 'VS Code & Tooling',
    category: 'Developer Environment',
    group: 'tools',
    color: '#007acc',
    tier: 'IDE & Extensions',
    svgIcon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
  }
];

export const getTechLogoUrl = (iconOrName?: string): string => {
  if (!iconOrName) return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg';
  
  // Si ya es una URL válida
  if (iconOrName.startsWith('http://') || iconOrName.startsWith('https://') || iconOrName.startsWith('data:')) {
    return iconOrName;
  }

  const query = iconOrName.toLowerCase().trim();
  const match = techPresetsList.find(t => 
    t.id === query || 
    t.name.toLowerCase() === query ||
    t.name.toLowerCase().startsWith(query) ||
    query.startsWith(t.id) ||
    query.includes(t.id) ||
    query.includes(t.name.toLowerCase())
  );

  return match ? match.svgIcon : `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${query}/${query}-original.svg`;
};

// ─── Diccionario Trilingüe Oficial Universal para Categorías de Skills (ES / EN / ET) ───
export const skillCategoriesDictionary = [
  {
    id: 'computer vision & ai',
    es: 'Visión por Computador & IA',
    en: 'Computer Vision & AI',
    et: 'Arvutinägemine ja AI'
  },
  {
    id: 'deep learning & ai',
    es: 'Deep Learning & IA',
    en: 'Deep Learning & AI',
    et: 'Süvaõpe ja AI'
  },
  {
    id: 'generative ai & llms',
    es: 'IA Generativa & LLMs',
    en: 'Generative AI & LLMs',
    et: 'Generatiivne AI ja LLM-id'
  },
  {
    id: 'machine learning & data',
    es: 'Machine Learning & Datos',
    en: 'Machine Learning & Data',
    et: 'Masinõpe ja andmed'
  },
  {
    id: 'machine learning',
    es: 'Aprendizaje Automático (ML)',
    en: 'Machine Learning',
    et: 'Masinõpe'
  },
  {
    id: 'data science & analysis',
    es: 'Ciencia de Datos & Análisis',
    en: 'Data Science & Analysis',
    et: 'Andmeteadus ja analüüs'
  },
  {
    id: 'ai & nlp',
    es: 'IA & Procesamiento de Lenguaje',
    en: 'AI & Natural Language Processing',
    et: 'AI ja keeletöötlus'
  },
  {
    id: 'scientific computing',
    es: 'Computación Científica',
    en: 'Scientific Computing',
    et: 'Teaduslik arvutus'
  },
  {
    id: 'backend frameworks',
    es: 'Frameworks Backend',
    en: 'Backend Frameworks',
    et: 'Tagarakenduste raamistikud'
  },
  {
    id: 'backend apis',
    es: 'APIs Backend & Microservicios',
    en: 'Backend APIs & Microservices',
    et: 'Tagarakenduse API-d ja mikroteenused'
  },
  {
    id: 'backend architecture',
    es: 'Arquitectura Backend',
    en: 'Backend Architecture',
    et: 'Tagarakenduse arhitektuur'
  },
  {
    id: 'backend microframeworks',
    es: 'Microframeworks Backend',
    en: 'Backend Microframeworks',
    et: 'Tagarakenduse mikroraamistikud'
  },
  {
    id: 'backend & servidores',
    es: 'Backend & Servidores',
    en: 'Backend & Server Architecture',
    et: 'Tagarakendus ja serverid'
  },
  {
    id: 'frontend & ui',
    es: 'Frontend & Interfaces UI',
    en: 'Frontend & UI Interfaces',
    et: 'Kasutajaliides ja Frontend'
  },
  {
    id: 'frontend & ssr',
    es: 'Frontend & SSR / Full-Stack',
    en: 'Frontend & SSR / Full-Stack',
    et: 'Frontend ja SSR / täislahendus'
  },
  {
    id: 'frontend ui',
    es: 'Estilos Frontend & CSS',
    en: 'Frontend Styling & CSS',
    et: 'Frontendi stiilid ja CSS'
  },
  {
    id: 'frontend tooling',
    es: 'Herramientas Frontend',
    en: 'Frontend Tooling',
    et: 'Frontendi tööriistad'
  },
  {
    id: 'frontend standards',
    es: 'Estándares Web Frontend',
    en: 'Frontend Web Standards',
    et: 'Frontendi veebistandardid'
  },
  {
    id: 'frontend styling',
    es: 'Preprocesadores & CSS',
    en: 'Frontend Styling & Preprocessors',
    et: 'Frontendi stiilid ja eeltöötlus'
  },
  {
    id: 'frontend & web',
    es: 'Frontend & Desarrollo Web',
    en: 'Frontend & Web Development',
    et: 'Frontend ja veebiarendus'
  },
  {
    id: 'databases & sql',
    es: 'Bases de Datos & SQL',
    en: 'Databases & SQL',
    et: 'Andmebaasid ja SQL'
  },
  {
    id: 'databases & auth',
    es: 'Bases de Datos & Autenticación',
    en: 'Databases & Authentication',
    et: 'Andmebaasid ja autentimine'
  },
  {
    id: 'databases & cache',
    es: 'Bases de Datos & Caché',
    en: 'Databases & Cache',
    et: 'Andmebaasid ja vahemälu'
  },
  {
    id: 'databases & nosql',
    es: 'Bases de Datos NoSQL',
    en: 'NoSQL Databases',
    et: 'NoSQL andmebaasid'
  },
  {
    id: 'databases & embedded',
    es: 'Bases de Datos Embebidas',
    en: 'Embedded Storage',
    et: 'Manustatud andmebaasid'
  },
  {
    id: 'databases & baas',
    es: 'BaaS & Tiempo Real',
    en: 'BaaS & Real-Time Databases',
    et: 'BaaS ja reaalaja andmebaasid'
  },
  {
    id: 'databases & orms',
    es: 'ORMs & Consultas Tipadas',
    en: 'ORMs & Type-Safe Queries',
    et: 'ORM-id ja tüübiturvalised päringud'
  },
  {
    id: 'devops & containers',
    es: 'DevOps & Contenedores',
    en: 'DevOps & Containers',
    et: 'DevOps ja konteinerid'
  },
  {
    id: 'devops & cloud',
    es: 'DevOps & Infraestructura Cloud',
    en: 'DevOps & Cloud Infrastructure',
    et: 'DevOps ja pilvetaristu'
  },
  {
    id: 'devops & orchestration',
    es: 'Orquestación de Contenedores',
    en: 'Container Orchestration',
    et: 'Konteinerite orkestreerimine'
  },
  {
    id: 'devops & systems',
    es: 'Sistemas & Servidores Linux',
    en: 'Linux Systems & Servers',
    et: 'Linuxi süsteemid ja serverid'
  },
  {
    id: 'devops & infraestructura',
    es: 'DevOps & Infraestructura',
    en: 'DevOps & Infrastructure',
    et: 'DevOps ja taristu'
  },
  {
    id: 'ci/cd & workflows',
    es: 'CI/CD & Flujos de Trabajo',
    en: 'CI/CD & Workflows',
    et: 'CI/CD ja töövood'
  },
  {
    id: 'ci/cd & devops',
    es: 'Plataformas CI/CD & DevOps',
    en: 'CI/CD Platforms & DevOps',
    et: 'CI/CD platvormid ja DevOps'
  },
  {
    id: 'cloud & hosting',
    es: 'Cloud & Despliegues',
    en: 'Cloud & Deployments',
    et: 'Pilv ja juurutused'
  },
  {
    id: 'languages & core',
    es: 'Lenguajes de Programación',
    en: 'Programming Languages',
    et: 'Programmeerimiskeeled'
  },
  {
    id: 'developer environment',
    es: 'Entorno de Desarrollo',
    en: 'Developer Environment',
    et: 'Arenduskeskkond'
  },
  {
    id: 'herramientas & entorno',
    es: 'Herramientas & Entorno',
    en: 'Tools & Development Environment',
    et: 'Tööriistad ja keskkond'
  },
  {
    id: 'design & prototyping',
    es: 'Diseño & Prototipado',
    en: 'Design & Prototyping',
    et: 'Disain ja prototüüpimine'
  },
  {
    id: 'api testing & design',
    es: 'Pruebas & Diseño de APIs',
    en: 'API Testing & Design',
    et: 'API testimine ja disain'
  },
  {
    id: 'api documentation',
    es: 'Documentación de APIs',
    en: 'API Documentation',
    et: 'API dokumentatsioon'
  },
  {
    id: 'testing & qa',
    es: 'Pruebas Automatizadas & QA',
    en: 'Automated Testing & QA',
    et: 'Automaattestimine ja QA'
  }
];

export const translateSkillCategory = (cat: string, lang: 'es' | 'en' | 'et'): string => {
  if (!cat) return '';
  // Limpiar emojis, viñetas y espacios
  const clean = cat.toLowerCase().replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[•·\-–—]/g, '').trim();

  for (const entry of skillCategoriesDictionary) {
    if (
      entry.id === clean ||
      entry.es.toLowerCase() === clean ||
      entry.en.toLowerCase() === clean ||
      entry.et.toLowerCase() === clean ||
      clean.includes(entry.id) ||
      clean.includes(entry.es.toLowerCase()) ||
      clean.includes(entry.en.toLowerCase()) ||
      entry.es.toLowerCase().includes(clean) ||
      entry.en.toLowerCase().includes(clean) ||
      entry.et.toLowerCase().includes(clean)
    ) {
      return entry[lang] || entry.en;
    }
  }

  return cat;
};

// ─── Diccionario Trilingüe Oficial Universal para Especialidades / Tiers (ES / EN / ET) ───
export const skillTiersDictionary = [
  {
    id: 'python backend core',
    es: 'Desarrollo Backend Python',
    en: 'Python Backend Development',
    et: 'Pythoni tagarakenduste arendus'
  },
  {
    id: 'object detection',
    es: 'Detección de Objetos en Tiempo Real',
    en: 'Real-Time Object Detection',
    et: 'Objektide reaalajas tuvastamine'
  },
  {
    id: 'dataset & model deploy',
    es: 'Gestión de Datasets & Visión',
    en: 'Dataset & Vision Models',
    et: 'Andmestikud ja visioonimudelid'
  },
  {
    id: 'cloud architecture & rls',
    es: 'Arquitectura Cloud & RLS',
    en: 'Cloud Architecture & RLS',
    et: 'Pilvearhitektuur ja RLS'
  },
  {
    id: 'ide & extensions',
    es: 'Entorno de Desarrollo & Extensiones',
    en: 'Development Environment & Extensions',
    et: 'Arenduskeskkond ja laiendused'
  },
  {
    id: 'entorno de desarrollo & extensiones',
    es: 'Entorno de Desarrollo & Extensiones',
    en: 'Development Environment & Extensions',
    et: 'Arenduskeskkond ja laiendused'
  },
  {
    id: 'entorno de desarrollo',
    es: 'Entorno de Desarrollo',
    en: 'Development Environment',
    et: 'Arenduskeskkond'
  },
  {
    id: 'daily driver',
    es: 'Tipado Estricto & ES6+',
    en: 'Strict Typing & ES6+',
    et: 'Range tüüpimine ja ES6+'
  },
  {
    id: 'tipado estricto & es6+',
    es: 'Tipado Estricto & ES6+',
    en: 'Strict Typing & ES6+',
    et: 'Range tüüpimine ja ES6+'
  },
  {
    id: 'standards',
    es: 'Estándares Web & Semántica',
    en: 'Web Standards & Semantic HTML',
    et: 'Veebistandardid ja semantika'
  },
  {
    id: 'flexbox & grid',
    es: 'Diseño Flexbox & CSS Grid',
    en: 'Flexbox & CSS Grid Layouts',
    et: 'Flexbox ja CSS Grid paigutus'
  },
  {
    id: 'utility-first & responsive',
    es: 'Diseño Utility-First & Responsive',
    en: 'Utility-First & Responsive UI',
    et: 'Utility-First ja kohanduv disain'
  },
  {
    id: 'frontend core',
    es: 'Arquitectura Frontend & SPAs',
    en: 'Frontend Architecture & SPAs',
    et: 'Frontendi arhitektuur ja SPA-d'
  },
  {
    id: 'fast build tooling',
    es: 'Empaquetado Ultrarrápido (ESM)',
    en: 'Ultra-Fast ESM Bundling',
    et: 'Kiire ESM koostamine'
  },
  {
    id: 'relational database',
    es: 'Base de Datos Relacional & SQL',
    en: 'Relational Database & SQL',
    et: 'Relatsiooniline andmebaas ja SQL'
  },
  {
    id: 'containers & microservices',
    es: 'Contenedores & Microservicios',
    en: 'Containers & Microservices',
    et: 'Konteinerid ja mikroteenused'
  },
  {
    id: 'containerization',
    es: 'Contenedores Docker',
    en: 'Docker Containerization',
    et: 'Konteinerdamine'
  },
  {
    id: 'version control',
    es: 'Control de Versiones Git',
    en: 'Git Version Control',
    et: 'Git versioonihaldus'
  },
  {
    id: 'rest apis & serialization',
    es: 'APIs REST & Serialización',
    en: 'REST APIs & Serialization',
    et: 'REST API-d ja serialiseerimine'
  },
  {
    id: 'async rest apis',
    es: 'APIs Asíncronas de Alto Rendimiento',
    en: 'High-Performance Async APIs',
    et: 'Kiired asünkroonsed API-d'
  },
  {
    id: 'stack principal',
    es: 'Stack Principal',
    en: 'Core Tech Stack',
    et: 'Põhiline tehnoloogiakogum'
  },
  {
    id: 'core language',
    es: 'Lenguaje Principal',
    en: 'Core Programming Language',
    et: 'Peamine programmeerimiskeel'
  },
  {
    id: 'image processing',
    es: 'Procesamiento de Imágenes & Video',
    en: 'Image & Video Processing',
    et: 'Pildi- ja videotöötlus'
  },
  {
    id: 'neural networks',
    es: 'Redes Neuronales Profundas',
    en: 'Deep Neural Networks',
    et: 'Sügavad närvivõrgud'
  },
  {
    id: 'deep learning',
    es: 'Aprendizaje Profundo (Deep Learning)',
    en: 'Deep Learning Engineering',
    et: 'Süvaõppe inseneritöö'
  },
  {
    id: 'llms & foundation models',
    es: 'Modelos de Lenguaje & Transformers',
    en: 'LLMs & Foundation Models',
    et: 'Suured keelemudelid ja transformerid'
  },
  {
    id: 'gpt & agents',
    es: 'Agentes Autónomos & GPT',
    en: 'GPT & Autonomous Agents',
    et: 'GPT ja autonoomsed agendid'
  },
  {
    id: 'predictive models',
    es: 'Modelos Predictivos & Clasificación',
    en: 'Predictive & Classification Models',
    et: 'Ennustavad ja klassifitseerimismudelid'
  },
  {
    id: 'data wrangling',
    es: 'Manipulación & Análisis de Datos',
    en: 'Data Wrangling & Analysis',
    et: 'Andmetöötlus ja analüüs'
  },
  {
    id: 'api testing & docs',
    es: 'Pruebas de APIs & Documentación',
    en: 'API Testing & Documentation',
    et: 'API testimine ja dokumentatsioon'
  },
  {
    id: 'unit testing',
    es: 'Pruebas Unitarias & Integración',
    en: 'Unit & Integration Testing',
    et: 'Ühik- ja integratsioonitestid'
  },
  {
    id: 'ui/ux & prototyping',
    es: 'Diseño UI/UX & Prototipado',
    en: 'UI/UX Design & Prototyping',
    et: 'UI/UX disain ja prototüüpimine'
  }
];

export const translateSkillTier = (tier: string, lang: 'es' | 'en' | 'et'): string => {
  if (!tier) return '';
  const clean = tier.toLowerCase().replace(/[\u{1F300}-\u{1F9FF}]/gu, '').replace(/[•·\-–—]/g, '').trim();

  for (const entry of skillTiersDictionary) {
    if (
      entry.id === clean ||
      entry.es.toLowerCase() === clean ||
      entry.en.toLowerCase() === clean ||
      entry.et.toLowerCase() === clean ||
      clean.includes(entry.id) ||
      clean.includes(entry.es.toLowerCase()) ||
      clean.includes(entry.en.toLowerCase()) ||
      entry.es.toLowerCase().includes(clean) ||
      entry.en.toLowerCase().includes(clean) ||
      entry.et.toLowerCase().includes(clean)
    ) {
      return entry[lang] || entry.en;
    }
  }

  return tier;
};


