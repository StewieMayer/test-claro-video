# 🎬 Claro Video EPG Demo

[![Versión 1.0.0](https://img.shields.io/badge/Version-1.0.0-blue?style=flat&logo=github)]()
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)]()
[![RTK Query](https://img.shields.io/badge/RTK_Query-593D88?style=flat&logo=redux&logoColor=white)]()

## Descripción del Proyecto

**Claro Video EPG Demo** es una aplicación web dinámica, construida con React y TypeScript, que simula una Guía Electrónica de Programación (EPG) al estilo de Claro Video.

La aplicación carga un horario de contenido de 24 horas a partir del momento en que el usuario hace clic en el botón "Mostrar EPG". Permite:

- Visualizar y navegar una grilla de eventos y canales.

- Hacer clic en cualquier evento de la grilla para ver su información detallada (nombre, descripción, horario e imagen) en el visor principal.

- Desplazarse horizontalmente por la línea de tiempo.

### 🚀 Acceso Rápido

Puedes acceder a una versión funcional en vivo aquí:
[**Ver Live Demo**](https://stewiemayer.github.io/test-claro-video)

## 🛠️ Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando un stack moderno y eficiente:

| Categoría             | Tecnología                   | Uso Principal                                     |
| --------------------- | ---------------------------- | ------------------------------------------------- |
| **Frontend Core**     | React & TypeScript           | Lógica de la UI y tipado estricto.                |
| **Bundler & Tooling** | Webpack 5 & Babel            | Empaquetado de módulos y transpilación.           |
| **State Management**  | RTK Query                    | Manejo de estado asíncrono y caché de datos.      |
| **Testing**           | Jest & RTL (Testing Library) | Pruebas unitarias y de integración.               |
| **Estilos & UI**      | Tailwind CSS & Headless UI   | Estilizado rápido y componentes UI accesibles.    |
| **Utilidades**        | HeroIcons & Day.js           | Iconografía y manejo eficiente de fechas/tiempos. |

## 💻 Inicialización y Configuración

Para poner en marcha esta aplicación en tu entorno local, sigue los siguientes pasos.

### 1. Clonar el Repositorio

```Bash
git clone https://github.com/StewieMayer/test-claro-video.git
```

### 2. Instalar Dependencias

```Bash
npm i
```

### 3. Ejecutar la Aplicación

Inicia el servidor de desarrollo. La aplicación estará disponible en `http://localhost:3000` (o el puerto configurado en Webpack).

```Bash
npm run start
```

## ✅ Ejecución de Tests

Se ha implementado una suite completa de pruebas unitarias usando Jest y React Testing Library para garantizar la calidad del código.

Para ejecutar todos los tests:

```Bash
npm run test
```

## 🚢 Despliegue (CI/CD)

El proyecto incluye un flujo de trabajo de GitHub Actions (`.github/workflows/deploy.yml`) para el Despliegue Continuo.

El pipeline se activa en cada _push_ a la rama `main` y sigue la siguiente secuencia para garantizar la calidad antes del despliegue:

1.  **Instalar Dependencias** (`npm ci`).
2.  **Ejecutar Tests** (`npm run test`). Si fallan, el flujo se detiene.
3.  **Construir Proyecto** (`npm run build`).
4.  **Desplegar en GitHub Pages** (`actions/deploy-pages`).

## 🧑‍💻 Autor

| **Rol**             | **Nombre**    | **Versión** |
| ------------------- | ------------- | ----------- |
| **Autor Principal** | Antonio Amaya | 1.0.0       |
