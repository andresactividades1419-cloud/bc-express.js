# 📌 CONTEXTO_BOOTCAMP.md — Bitácora y Reglas de Desarrollo

## 👤 DATOS DEL APRENDIZ Y DOMINIO
- **Nombre del Aprendiz:** ANDRES FELIPE FERNANDEZ CARDOZA
- **Ficha:** 3228970
- **Bootcamp:** `bc-express` (Express.js Zero to Hero)
- **Dominio Asignado:** **Productora de Eventos**

### 🏢 Entidades Principales del Dominio
1. **`events` (Eventos):** Conciertos, bodas, conferencias, fechas, presupuestos, locaciones, aforo, etc.
2. **`clients` (Clientes):** Contratantes, empresas, datos de contacto, contratos.
3. **`vendors` (Proveedores):** Catering, luces, sonido, seguridad, servicios contratados.
4. **`staff` (Personal):** Logística, coordinadores, técnicos, roles, pagos por evento.

---

## 🚨 REGLAS DE ORO Y FUNCIONAMIENTO
1. **Contexto Vivo (`CONTEXTO_BOOTCAMP.md`):**
   - Consultar este archivo al inicio de cada sesión/semana y actualizarlo al finalizar con avances, endpoints y estado de la bitácora.
2. **Adaptación 100% al Dominio:**
   - **PROHIBIDO** el uso de nombres genéricos (`Item`, `Product`, `User`, `Data`, `Test`) en el código entregable.
   - Cualquier ejercicio o proyecto se adapta a la **Productora de Eventos** (`events`, `clients`, `vendors`, `staff`).
3. **Moneda y Formatos del Negocio:**
   - Todos los presupuestos, cotizaciones, costos y valores financieros del negocio de eventos deben manejarse estrictamente en **Pesos Colombianos (COP)**.
4. **Desarrollo Incremental y Acumulativo:**
   - El proyecto de **Productora de Eventos** es **UN SOLO PROYECTO INCREMENTAL**. En cada semana se toma la base desarrollada en la semana anterior y se le integran las nuevas características (Semana 1: CLI/TS → Semana 2: HTTP Express → Semana 3: REST Router → etc.).
5. **Estrategia de Git y Ramas:**
   - Nomenclatura exacta de ramas por semana: `week-01`, `week-02`, ..., `week-16`.
   - En la raíz de cada rama en GitHub solo debe existir la aplicación lista de esa semana.
6. **Protocolo de Entrega por Correo:**
   - **Destinatario:** `profeerickgranados@gmail.com`
   - **Asunto exacto:** `bc-expressjs semana <NN> ficha 3228970` (ej: `bc-expressjs semana 01 ficha 3228970`)
   - **Cuerpo:** Única y exclusivamente la URL del repositorio público en GitHub.
7. **Estándar Arquitectónico:**
   - Express 5 + TypeScript con `pnpm@10.34.5`.
   - Código modular y limpio (Routes, Controllers, Services/Repositories, Middlewares, Validators, DTOs).
   - Manejo centralizado de errores, códigos de estado HTTP semánticos y seguridad REST API.

---

## 📂 ARQUITECTURA DE SOLUCIONES Y ESTRUCTURA DE GIT

### A. Organización Local de Respaldos (`soluciones/`)
1. **Uso Exclusivamente Local:** En la raíz de tu proyecto local existe una carpeta llamada `soluciones/`.
2. **Subcarpetas por Semana:** Dentro de `soluciones/` se almacenará una copia/respaldo resuelto de cada semana (`soluciones/week-01/`, `soluciones/week-02/`, `soluciones/week-03/`, etc.).
3. **Ignorado por Git:** La carpeta `soluciones/` **DEBE estar registrada en el `.gitignore`** para evitar que se suban respaldos innecesarios al repositorio remoto.

### B. Estructura de la Rama de Entrega en GitHub (`week-<NN>`)
1. **Raíz Limpia e Independiente:** En la rama de entrega en GitHub (`week-01`, `week-02`, etc.), **ÚNICA Y EXCLUSIVAMENTE debe existir el código fuente de la aplicación** en el nivel raíz.
2. **Prohibición de Carpetas Residuales:** En el repositorio público en GitHub **NO deben existir** carpetas como `bootcamp/`, `starter/`, `scripts/`, `entregas/` o `soluciones/`.
3. **Contenido Obligatorio en la Raíz de la Rama:**
   - `App.tsx` / `src/server.ts` (Según corresponda al bootcamp)
   - `package.json`
   - `tsconfig.json`
   - `app.json` (si aplica)
   - `README.md` (con la documentación y decisiones de la semana)
   - `src/` (código fuente modular adaptado a la Productora de Eventos)

### C. Regla del Repositorio Único
1. **Un solo Repositorio Remoto:** Se utiliza **EXACTAMENTE el mismo repositorio de GitHub** durante todo el bootcamp. NUNCA se crea un repositorio nuevo por semana.
2. **Entrega por Ramas:** Cada entrega semanal se publica en su respectiva rama independiente (`week-01`, `week-02`, ..., `week-16`).


---

## 📅 BITÁCORA DE AVANCE POR SEMANA

| Semana | Rama Git | Tema Principal | Estado | Envíos / Correo |
| :---: | :---: | :--- | :---: | :--- |
| `week-01` | `week-01` | Node.js Fundamentals & TypeScript Setup | ✅ Completado | Listo para envío |
| `week-02` | `week-02` | Express Intro & Servidor HTTP | ✅ Completado | Listo para envío |
| `week-03` | `week-03` | Arquitectura REST API | ⏳ Pendiente | Pendiente |
| `week-04` | `week-04` | Validación con Zod & Error Handling | ⏳ Pendiente | Pendiente |
| `week-05` | `week-05` | PostgreSQL + Prisma ORM | ⏳ Pendiente | Pendiente |
| `week-06` | `week-06` | MongoDB + Mongoose | ⏳ Pendiente | Pendiente |
| `week-07` | `week-07` | Autenticación JWT & Cookies | ⏳ Pendiente | Pendiente |
| `week-08` | `week-08` | Autorización RBAC & Seguridad OWASP | ⏳ Pendiente | Pendiente |
| `week-09` | `week-09` | Testing (Jest + Supertest) | ⏳ Pendiente | Pendiente |
| `week-10` | `week-10` | Uploads con Multer + S3/Cloudinary | ⏳ Pendiente | Pendiente |

---

## 🛠️ REGISTRO DE ENDPOINTS CREADOS POR DOMINIO

### `events`
* CLI Procesador de datos (`soluciones/week-01`): Lectura asíncrona de `data/events.json`, filtrado por categoría `--category`, cálculo de presupuestos/aforos y generación de `output/report.json`.
* Express HTTP REST API (`soluciones/week-02`): Endpoints CRUD completos sobre el dominio (`GET /api/v1/events`, `GET /api/v1/events/:id`, `POST /api/v1/events`, `PUT /api/v1/events/:id`, `DELETE /api/v1/events/:id`).


### `clients`
* *(Aún no registrados - iniciando Semana 01)*

### `vendors`
* *(Aún no registrados - iniciando Semana 01)*

### `staff`
* *(Aún no registrados - iniciando Semana 01)*
