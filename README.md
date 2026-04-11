<p align="center">
  <img src="assets/bootcamp-header.svg" alt="Bootcamp ExpressJS Zero to Hero" width="800">
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey.svg" alt="License CC BY-NC-SA 4.0"></a>
  <a href="#"><img src="https://img.shields.io/badge/semanas-16-yellow.svg" alt="16 Semanas"></a>
  <a href="#"><img src="https://img.shields.io/badge/horas-128-orange.svg" alt="128 Horas"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-68A063?logo=nodedotjs&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express"></a>
</p>

<p align="center">
  <a href="README_EN.md"><img src="https://img.shields.io/badge/🇺🇸_English-0969DA?style=for-the-badge&logoColor=white" alt="English Version"></a>
</p>

---

## 📋 Descripción

Bootcamp intensivo de **16 semanas (~4 meses)** enfocado en el dominio de **Express.js** y el desarrollo de APIs REST modernas con Node.js. Diseñado para llevar a desarrolladores con experiencia en JavaScript/TypeScript hasta **Desarrollador Backend Junior**, con énfasis en código limpio, mejores prácticas y APIs listas para producción.

### 🎯 Objetivos

Al finalizar el bootcamp, los estudiantes serán capaces de:

- ✅ Dominar el runtime de Node.js y el modelo de I/O no bloqueante
- ✅ Construir servidores HTTP con Express 5 y TypeScript desde cero
- ✅ Diseñar APIs REST siguiendo buenas prácticas (versioning, status codes, contratos)
- ✅ Validar y sanitizar datos de entrada con Zod
- ✅ Implementar persistencia con Prisma ORM + PostgreSQL y con Mongoose + MongoDB
- ✅ Autenticar usuarios con bcrypt, JWT (access/refresh tokens) y cookies HttpOnly
- ✅ Controlar acceso con RBAC (Role-Based Access Control)
- ✅ Aplicar seguridad OWASP: Helmet, rate limiting, CORS, sanitización
- ✅ Escribir tests unitarios e integration con Jest + Supertest
- ✅ Gestionar archivos con Multer y almacenamiento en S3/Cloudinary
- ✅ Implementar comunicación en tiempo real con Socket.io
- ✅ Usar Redis para caché y gestión de sesiones
- ✅ Documentar APIs con OpenAPI/Swagger
- ✅ Dockerizar aplicaciones y desplegarlas con CI/CD en producción

### 🚀 ¿Por qué Express con TypeScript?

> **Backend moderno desde el día 1** — Sin código legacy, solo las mejores prácticas actuales.

Express es el framework HTTP más usado del ecosistema Node.js. Este bootcamp se enfoca exclusivamente en Express 5 y Node.js 22+, con TypeScript desde el primer día. Los estudiantes aprenden directamente las herramientas y técnicas que usarán en el mundo profesional.

---

## 🗓️ Estructura del Bootcamp

|        Fase        | Semanas | Horas | Temas Principales                                          |
| :----------------: | :-----: | :---: | ---------------------------------------------------------- |
| **Fundamentos**    |   1-2   |  16h  | Node.js runtime, TypeScript, Express básico, middleware    |
| **Core API**       |  3-8    |  48h  | REST, Zod, Prisma, MongoDB, JWT auth, RBAC, seguridad      |
| **Avanzado**       |  9-13   |  40h  | Testing, uploads, WebSockets, Redis, OpenAPI/Swagger       |
| **Producción**     |  14-16  |  24h  | Docker, CI/CD, deployment, proyecto final                  |

**Total: 16 semanas** | **128 horas** de formación intensiva

---

## 📚 Contenido por Semana

Cada semana incluye:

```
bootcamp/week-XX-tema_principal/
├── README.md                 # Descripción y objetivos
├── rubrica-evaluacion.md     # Criterios de evaluación
├── 0-assets/                 # Imágenes y diagramas
├── 1-teoria/                 # Material teórico
├── 2-practicas/              # Ejercicios guiados
├── 3-proyecto/               # Proyecto semanal
├── 4-recursos/               # Recursos adicionales
│   ├── ebooks-free/
│   ├── videografia/
│   └── webgrafia/
└── 5-glosario/               # Términos clave
```

| Semana | Tema | Descripción |
|--------|------|-------------|
| 01 | `nodejs_fundamentals` | Node.js runtime, módulos ESM, async/await, TypeScript config |
| 02 | `express_intro` | Servidor HTTP, routing, middleware, req/res lifecycle |
| 03 | `rest_api_arquitectura` | Capas routes/controllers/services, HTTP status codes, REST |
| 04 | `validacion_error_handling` | Zod, middleware global de errores, logging con Winston |
| 05 | `postgresql_prisma` | PostgreSQL + Prisma ORM, migraciones, relaciones |
| 06 | `mongodb_mongoose` | MongoDB + Mongoose, comparativa, casos de uso |
| 07 | `autenticacion_jwt` | bcrypt, JWT access/refresh tokens, cookies HttpOnly |
| 08 | `autorizacion_seguridad` | RBAC, Helmet, rate limiting, CORS, sanitización |
| 09 | `testing` | Jest + Supertest, unit/integration, mocks, cobertura |
| 10 | `uploads_emails` | Multer, S3/Cloudinary, Nodemailer |
| 11 | `websockets` | Socket.io, rooms, autenticación WS, patrones real-time |
| 12 | `caching_performance` | Redis, paginación eficiente, compresión |
| 13 | `openapi_swagger` | OpenAPI/Swagger, versionado, contratos de API |
| 14 | `docker` | Dockerfile multi-stage, docker-compose, secrets |
| 15 | `cicd_deployment` | GitHub Actions, Railway/Render, monitoring |
| 16 | `proyecto_final` | Arquitectura completa, code review, presentación |

### 🔑 Componentes Clave

- 📖 **Teoría**: Conceptos fundamentales con ejemplos del mundo real
- 💻 **Práctica**: Ejercicios progresivos y proyectos hands-on
- 📝 **Evaluación**: Evidencias de conocimiento, desempeño y producto
- 🎓 **Recursos**: Glosarios, referencias y material complementario

---

## 🛠️ Stack Tecnológico

| Tecnología      | Versión   | Uso                           |
| --------------- | --------- | ----------------------------- |
| Node.js         | **22+**   | Runtime                       |
| Express         | **5.x**   | Framework HTTP                |
| TypeScript      | **5.x**   | Lenguaje principal            |
| Prisma ORM      | **6.x**   | Base de datos relacional      |
| PostgreSQL      | **16+**   | Base de datos relacional      |
| Mongoose        | **8.x**   | Base de datos NoSQL           |
| MongoDB         | **7+**    | Base de datos NoSQL           |
| Zod             | **3.x**   | Validación de schemas         |
| bcrypt          | **5.x**   | Hash de contraseñas           |
| JSON Web Token  | **9.x**   | Autenticación                 |
| Jest            | **29.x**  | Testing unitario e integration|
| Supertest       | **7.x**   | Testing de endpoints HTTP     |
| Socket.io       | **4.x**   | WebSockets real-time          |
| Redis (ioredis) | **5.x**   | Caché y sesiones              |
| Multer          | **2.x**   | File uploads                  |
| Winston         | **3.x**   | Logging                       |
| Swagger UI      | **5.x**   | Documentación de API          |
| Docker          | **26+**   | Contenedores                  |
| pnpm            | **10.x**  | Gestión de paquetes           |

**Entorno de desarrollo**: VS Code + Thunder Client / Postman  
**Despliegue**: Railway / Render vía GitHub Actions

---
## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js 22+** instalado
- **pnpm** como gestor de paquetes (`npm install -g pnpm`)
- **Docker** para levantar PostgreSQL y Redis en local
- **Git** para control de versiones
- **VS Code** (recomendado) con extensiones incluidas
- **Thunder Client** o **Postman** para probar endpoints

### 1. Clonar el Repositorio

```bash
git clone https://github.com/ergrato-dev/bc-expressjs.git
cd bc-expressjs
```

### 2. Instalar Extensiones de VS Code

```bash
# Abrir en VS Code
code .

# Las extensiones recomendadas aparecerán automáticamente
# O ejecutar: Ctrl+Shift+P → "Extensions: Show Recommended Extensions"
```

### 3. Navegar a la Semana Actual

```bash
cd bootcamp/week-01-nodejs_fundamentals
```

### 4. Seguir las Instrucciones

Cada semana contiene un `README.md` con instrucciones detalladas.

---

## 📊 Metodología de Aprendizaje

### Estrategias Didácticas

- 🎯 **Aprendizaje Basado en Proyectos (ABP)**
- 🏛️ **Dominios Únicos**: Cada aprendiz aplica conceptos a su dominio asignado (anticopia)
- 🧩 **Práctica Deliberada**
- 🖥️ **API-First Thinking**: Siempre pensar en contratos, status codes y consumidores
- 👥 **Code Review entre pares**
- 🎮 **Live Coding**

### Distribución del Tiempo (8h/semana)

- **Teoría**: 2 horas
- **Prácticas**: 3-4 horas
- **Proyecto**: 2-3 horas

### Evaluación

Cada semana incluye tres tipos de evidencias:

1. **Conocimiento 🧠** (30%): Cuestionarios y evaluaciones teóricas
2. **Desempeño 💪** (40%): Ejercicios prácticos en clase
3. **Producto 📦** (30%): Entregables evaluables (proyectos funcionales)

**Criterio de aprobación**: Mínimo 70% en cada tipo de evidencia. Implementación coherente con el dominio asignado. Originalidad: sin copia entre aprendices.

---

## 🏛️ Política de Dominios Únicos (Anticopia)

Cada aprendiz recibe un **dominio único asignado por el instructor** desde la primera clase, que usa en todos los proyectos del bootcamp.

Ejemplos de dominios: 📖 Biblioteca, 💊 Farmacia, 🏋️ Gimnasio, 🏫 Escuela, 🏬 Tienda de mascotas, 🍽️ Restaurante, 🏦 Banco, 🚕 Taxis, 🏥 Hospital, 🎥 Cine, 🏞️ Hotel, ✈️ Viajes, 🏎️ Concesionario, 👗 Ropa, 🛠️ Taller, y más.

**Objetivo:**

- ✅ Prevenir copia entre estudiantes
- ✅ Fomentar implementaciones originales
- ✅ Aplicar conceptos generales a contextos específicos
- ✅ Desarrollar capacidad de abstracción y adaptación

**Responsabilidades del instructor:**

1. Asignar un dominio único a cada aprendiz al inicio
2. Mantener registro de dominios asignados
3. No repetir dominios en el mismo grupo
4. Validar coherencia con el dominio en evaluaciones

---

## 📞 Soporte

- 💬 **Discussions**: [GitHub Discussions](https://github.com/ergrato-dev/bc-expressjs/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/ergrato-dev/bc-expressjs/issues)

---

## ⚠️ Exención de Responsabilidad

Este repositorio es un recurso **educativo** creado con fines de aprendizaje. Al utilizarlo, aceptas los siguientes términos:

- **Solo fines educativos**: El contenido, los ejemplos de código y los proyectos están diseñados exclusivamente para la enseñanza y el aprendizaje. No constituyen asesoramiento profesional, legal ni de seguridad.
- **Sin garantías**: El material se proporciona **"tal cual"**, sin garantías de ningún tipo, expresas o implícitas, incluyendo idoneidad para un propósito particular o ausencia de errores.
- **Código en producción**: Los ejemplos de código son ilustrativos. Antes de usarlos en entornos productivos, debes realizar revisiones de seguridad, rendimiento y adaptación a tu contexto específico.
- **Versiones de software**: Las versiones de librerías y herramientas mencionadas pueden quedar desactualizadas. Siempre consulta la documentación oficial más reciente.
- **Limitación de responsabilidad**: Los autores y contribuidores no se responsabilizan por pérdidas de datos, daños directos o indirectos, interrupciones de servicio ni cualquier otro perjuicio derivado del uso de este material.
- **Responsabilidad del estudiante**: Cada estudiante es responsable de sus propias implementaciones, entornos de desarrollo y decisiones técnicas.

---

## 📄 Licencia

Este proyecto está bajo la licencia **[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)** (Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International).

**Puedes:** compartir y adaptar el material, incluso crear forks educativos.  
**No puedes:** usar este material con fines comerciales.  
**Debes:** dar crédito apropiado y distribuir las adaptaciones bajo la misma licencia.

Ver el archivo [LICENSE](LICENSE) para el texto completo.

---

## 🏆 Agradecimientos

- [Node.js](https://nodejs.org/) — Por el runtime JavaScript del lado del servidor
- [Express](https://expressjs.com/) — Por el framework HTTP más popular del ecosistema
- [Prisma](https://www.prisma.io/) — Por el ORM moderno para TypeScript
- [Zod](https://zod.dev/) — Por la validación de schemas con inferencia TypeScript
- [Socket.io](https://socket.io/) — Por simplificar WebSockets en Node.js
- Comunidad Node.js — Por los recursos y ejemplos
- Todos los contribuidores

---

## 📚 Documentación Adicional

- [🤖 Instrucciones de Copilot](.github/copilot-instructions.md)
- [📜 Código de Conducta](CODE_OF_CONDUCT.md)
- [🔒 Política de Seguridad](SECURITY.md)

---

<p align="center">
  <strong>🎓 Bootcamp ExpressJS - Zero to Hero</strong><br>
  <em>De desarrollador JS/TS a desarrollador backend en 4 meses</em>
</p>

<p align="center">
  <a href="bootcamp/week-01-nodejs_fundamentals">Comenzar Semana 1</a> •
  <a href="docs">Ver Documentación</a> •
  <a href="https://github.com/ergrato-dev/bc-expressjs/issues">Reportar Issue</a>
</p>

<p align="center">
  Hecho con ❤️ para la comunidad de desarrolladores
</p>
