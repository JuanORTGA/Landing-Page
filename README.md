# Juan Ortega — Portfolio & Executive CMS

Portafolio profesional moderno y sistema de gestión de contenidos (CMS) diseñado para desarrollo full-stack, optimización de datos e interfaces interactivas de alto rendimiento con foco en el ecosistema tecnológico de Estonia y Europa.

Construido con **React 19, TypeScript, Vite, Tailwind CSS / Vanilla CSS y Supabase (PostgreSQL)**.

---

##  Características Principales

*  **Experiencia Trilingüe Dinámica:** Soporte completo en tiempo real para **Español (ES)**, **Inglés (EN)** y **Estonio (ET)** con persistencia en el navegador.
* **Generador de CV con Normas ATS:** 
  * Creador interactivo y exportador de currículum adaptado a los filtros de selección de talento y normas ATS internacionales.
  * Personalización de foto, tipografía, márgenes, secciones y descarga directa en PDF.
  * Centro de descarga de currículums en PDF multi-idioma.
*  **Panel de Administración Exclusivo (CMS):**
  * Gestión visual de **Proyectos**, **Tecnologías / Habilidades**, **Experiencia Laboral**, **Educación** y **Textos**.
  * **Live Content Studio:** Edición de textos en vivo con vista previa interactiva.
  * **Gestor de Medios:** Carga de imágenes de portada (*Hero*), fotos de perfil y logos con almacenamiento en Supabase Storage.
* **Formulario de Contacto Blindado:**
  * Trampa invisible para bots (*Honeypot*).
  * Límite de frecuencia de envío (*Rate Limiting* de 45 segundos).
  * Sanitización de texto para prevenir inyecciones de código (Anti-XSS).

---

## Arquitectura de Seguridad Implementada

Este proyecto cuenta con medidas de seguridad de nivel de producción:

1. **Aislamiento de Código (*Code-Splitting*):** El panel de administración está encapsulado mediante `React.lazy()`. Quien visita la landing pública **nunca descarga** el código del panel administrativo.
2. **Ruta Administrativa Oculta (*Secret Route*):** 
   * No existe `/admin` ni `/login`.
   * El acceso se gestiona a través de la variable `VITE_ADMIN_PATH` (por defecto: `/studio-jo-2026`).
   * Cualquier intento de escaneo en `/admin`, `/wp-admin` o `/dashboard` es redirigido inmediatamente a la página de inicio.
3. **Sesión Efímera y Cierre de Sesión en Recarga:**
   * Al recargar la página (**F5**) o cerrar la pestaña, la sesión se destruye automáticamente y exige iniciar sesión de nuevo.
4. **Protección Anti-Fuerza Bruta en Login:**
   * Al registrar 5 intentos fallidos, el formulario se bloquea por 60 segundos con temporizador regresivo.
5. **Seguridad a Nivel de Filas (*Supabase Row-Level Security - RLS*):**
   * El público solo puede consultar datos públicos y enviar mensajes de contacto.
   * Solo el administrador autenticado puede crear, modificar o eliminar registros.
6. **Protección contra Motores de Búsqueda:**
   * Archivo `robots.txt` que prohíbe a Google y buscadores indexar las rutas administrativas privadas.
7. **Navegación Segura:**
   * Todos los enlaces externos cuentan con `rel="noopener noreferrer"` para evitar ataques de *Reverse Tabnabbing*.

---

## Variables de Entorno

Copia el archivo de plantilla `.env.example` a `.env`:

```bash
cp .env.example .env
```

Configura tus credenciales:

```env
# Conexión con Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon-de-supabase

# Ruta Secreta del Panel de Administración (cámbiala por la que prefieras)
VITE_ADMIN_PATH=/studio-jo-2026
```

> **Importante:** El archivo `.env` está protegido en `.gitignore` para evitar que tus contraseñas y claves se publiquen en GitHub.

---

## Ejecución en Modo Local (Desarrollo)

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Acceder a la aplicación:**
   * **Landing Page Pública:** `http://localhost:5173/`
   * **Panel de Administración Secreto:** `http://localhost:5173/studio-jo-2026`

4. **Verificar calidad de código y compilación:**
   ```bash
   # Comprobar reglas de código y linter
   npm run lint

   # Compilar bundle de producción
   npm run build
   ```

---

##  Guía de Despliegue en Producción

### Opción Recomendada: Cloudflare Pages (o Vercel)

1. **Subir los cambios a GitHub:**
   ```bash
   git add .
   git commit -m "feat: produccion lista con seguridad y rutas protegidas"
   git push origin main
   ```

2. **En Cloudflare Pages / Vercel:**
   * Conecta tu repositorio `JuanORTGA/Landing-Page`.
   * **Comando de compilación:** `npm run build`
   * **Directorio de salida:** `dist`
   * **Variables de entorno:** Agrega `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` y `VITE_ADMIN_PATH`.

3. **Rutas SPA:**
   * El proyecto ya incluye `public/_redirects` y `vercel.json` para que todas las recargas en rutas como `/studio-jo-2026` funcionen sin error 404.

---

## 📁 Estructura del Proyecto

```text
├── public/
│   ├── _redirects          # Reglas de redirección SPA (Cloudflare Pages / Netlify)
│   ├── robots.txt          # Bloqueo de indexación de rutas privadas
│   └── favicon.ico         # Iconos de marca
├── src/
│   ├── assets/             # Fotografías, logos y recursos estáticos
│   ├── components/         # Componentes de la Landing Page (Hero, Vision, About, Projects, Skills, Contact, Footer)
│   │   ├── admin/          # Componentes del CMS administrativo (Login, Tablas, Modales, Live Studio)
│   │   └── icons/          # Vectores SVG y banderas
│   ├── context/            # Proveedor de idiomas (LanguageContext)
│   ├── pages/              # LandingPage.tsx y AdminPage.tsx (aislado con lazy loading)
│   ├── services/           # Cliente Supabase, utilidades de logotipos y datos
│   ├── styles/             # Hojas de estilo CSS optimizadas
│   ├── types/              # Definiciones TypeScript de la base de datos
│   ├── App.tsx             # Enrutamiento principal y honeypots de seguridad
│   └── main.tsx            # Punto de entrada de la aplicación
├── database_master.sql     # Esquema completo de PostgreSQL y políticas de seguridad RLS
├── vercel.json             # Configuración de enrutamiento para Vercel
├── .env.example            # Plantilla segura de variables de entorno
└── package.json            # Scripts y dependencias del proyecto
```

---

## Autor

**Juan Ortega**
* **Rol:** Full-Stack Developer (Python, Django, React, TypeScript)
* **GitHub:** [@JuanORTGA](https://github.com/JuanORTGA)
* **LinkedIn:** [Juan Ortega](https://linkedin.com/in/juan-ortega-223804326)
