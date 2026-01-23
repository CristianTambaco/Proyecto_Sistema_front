# 🐶 Frontend – Sistema de Gestión Estética Canina

Aplicación **frontend** desarrollada para el **Sistema de Gestión de Estética Canina**, encargada de la interacción con el usuario final. Permite a administradores, estilistas y clientes gestionar citas, mascotas, servicios y atenciones de forma visual, intuitiva y responsiva.

Este frontend se comunica con el **backend mediante una API REST**, manejando autenticación, roles y estados de la aplicación.

---

## 🚀 Tecnologías utilizadas

- **JavaScript / TypeScript**
- **Framework Frontend (Vue / React)**
- **Vite** – Entorno de desarrollo
- **HTML5 + CSS3**
- **Axios / Fetch** – Consumo de API
- **JWT** – Autenticación
- **SweetAlert / Toasts** – Alertas
- **CSS Framework (Bootstrap / Tailwind)**

---

## 📂 Estructura del proyecto

```
frontend/
│── package.json
│── vite.config.js
│── index.html
└── src/
    │── main.js            # Punto de entrada
    │── App.vue / App.jsx  # Componente raíz
    │
    ├── assets/            # Imágenes, íconos y estilos
    ├── components/        # Componentes reutilizables
    ├── pages / views/     # Vistas principales
    │   ├── Login
    │   ├── Dashboard
    │   ├── Clientes
    │   ├── Mascotas
    │   ├── Citas
    │   ├── Servicios
    │   ├── Atenciones
    │   └── Pagos
    │
    ├── router/            # Rutas y navegación
    ├── services/          # Consumo de API
    ├── store / context/   # Gestión de estado
    ├── utils/             # Funciones auxiliares
    └── styles/            # Estilos globales
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd frontend
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4️⃣ Ejecutar el proyecto

Modo desarrollo:
```bash
npm run dev
```

Compilar para producción:
```bash
npm run build
```

---

## 🔐 Autenticación y roles

La aplicación maneja autenticación mediante **JWT**, almacenando el token de forma segura y validando el acceso según el rol:

- 👑 Administrador
- ✂️ Estilista
- 🐕 Cliente

Las rutas están protegidas mediante **guards / middlewares de frontend**.

---

## 🧭 Funcionalidades principales

- Inicio de sesión y registro
- Gestión de clientes y mascotas
- Reserva y administración de citas
- Visualización de atenciones
- Panel administrativo
- Diseño responsivo

---

## 🎨 Diseño UI/UX

- Interfaz clara y amigable
- Componentes reutilizables
- Colores claros y accesibles

---

## 🔌 Integración con Backend

El frontend consume la API REST del backend para:

- Autenticación de usuarios
- CRUD de entidades
- Gestión de horarios y citas

---

## 🧪 Buenas prácticas

- Separación por capas
- Componentes reutilizables
- Variables de entorno
- Manejo de errores

---

## 📄 Licencia

Proyecto académico / educativo.

---

