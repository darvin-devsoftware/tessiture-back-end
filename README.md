Aquí tienes el **README.md exactamente en formato Markdown (.md)** listo para copiar y pegar en tu archivo `README.md` del proyecto **Tessiture**.

---

# ✅ **README.md (Formato Markdown completo y limpio)**

```md
# **TESSITURE — Podcast CMS Backend**
Backend modular y escalable para la gestión de un sistema de podcasts, autores, libros, artículos y multimedia.  
Construido con **Node.js**, **Express**, **Clean Architecture**, **Multer** y **Cloudinary**.

---

## 🚀 Tecnologías Principales

- **Node.js / Express**
- **MySQL (pool connections)**
- **Cloudinary (imágenes, videos, PDF, Word)**
- **Multer con upload.fields()**
- **Arquitectura basada en:**
  - Repository Pattern  
  - Service Layer  
  - Controller Layer  
- **Error Handling Global**
- **Slug Generator para URLs amigables**
- **Modular Routes**

---

## 📦 Estructura del Proyecto

```

src/
├── app.js
├── server.js
├── DB/
│     └── connection.js
├── Routes/
├── Controller/
├── Service/
├── Repository/
├── Middleware/
│     └── upload.middleware.js
├── Config/
└── cloudinary.js

````

---

## 🧱 Módulos Implementados

### 🎙️ Podcast
- Subida de video (mp4, mov…)
- Subida de audio (mp3, wav…)
- Img (thumbnail)
- CRUD completo  

### ✍️ Articles
- Imagen principal  
- CRUD completo  
- Slug automático  

### 👤 Authors
- primaryImg  
- Galería (múltiples imágenes)  
- CRUD completo  

### 📚 Books
- Imagen de portada  
- Archivos PDF / Word  
- CRUD completo  

### 🗂️ Logs
- Registro de acciones realizadas por usuarios  
- Consultas de logs en orden cronológico

---

## 🔧 Instalación y Configuración

### 1️⃣ Instalar dependencias

```bash
npm install
````

### 2️⃣ Crear archivo `.env` con:

```
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=*****
DB_NAME=tessiture
```

### 3️⃣ Ejecutar servidor

```bash
npm run dev
```

---

## 🗂️ Endpoints Principales

### Podcast

`/api/v1/podcast`

### Articles

`/api/v1/articles`

### Authors

`/api/v1/authors`

### Books

`/api/v1/books`

### Logs

`/api/v1/logs`

---

## 📁 Upload de Archivos (Multer)

Ejemplo para múltiples archivos:

```js
upload.fields([
  { name: "primaryImg", maxCount: 1 },
  { name: "gallery", maxCount: 20 },
  { name: "video", maxCount: 1 },
  { name: "audio", maxCount: 1 }
])
```

---

## 🛠️ Arquitectura Aplicada

* **Repository Pattern:** Acceso limpio a la base de datos
* **Service Layer:** Lógica de negocio
* **Controller Layer:** Validación de requests
* **Dependency Injection:** Objetos construidos por capa
* **Error Handler Global:** Captura y manejo uniforme

---

## 📄 Licencia

MIT – libre uso y modificación.

---

## ✨ Autor

**Darvin Rodriguez – darvin.devsoftware@gmail.com**
Backend Developer & Software Architect (en progreso 🚀)

