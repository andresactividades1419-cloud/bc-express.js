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
3. **Estrategia de Git y Ramas:**
   - Nomenclatura exacta de ramas por semana: `week-01`, `week-02`, ..., `week-16`.
4. **Protocolo de Entrega por Correo:**
   - **Destinatario:** `profeerickgranados@gmail.com`
   - **Asunto exacto:** `bc-expressjs semana <NN> ficha 3228970` (ej: `bc-expressjs semana 01 ficha 3228970`)
   - **Cuerpo:** Única y exclusivamente la URL del repositorio público en GitHub (sin texto adicional).
   - **Repositorio Remoto:** El usuario indicará posteriormente a qué repositorio se subirá.
   - **Repos de Referencia del Instructor:** [bc-ejemplo](https://github.com/ergrato-dev/bc-ejemplo) y [bc-ejemplo-entrega](https://github.com/ergrato-dev/bc-ejemplo-entrega).
5. **Estándar Arquitectónico:**
   - Express 5 + TypeScript con `pnpm@10.34.5`.
   - Código modular y limpio (Routes, Controllers, Services/Repositories, Middlewares, Validators, DTOs).
   - Manejo centralizado de errores, códigos de estado HTTP semánticos y seguridad REST API.

---

## 📅 BITÁCORA DE AVANCE POR SEMANA

| Semana | Rama Git | Tema Principal | Estado | Envíos / Correo |
| :---: | :---: | :--- | :---: | :--- |
| `week-01` | `week-01` | Node.js Fundamentals & TypeScript Setup | ✅ Completado | Listo para envío |
| `week-02` | `week-02` | Express Intro & Servidor HTTP | ⏳ Pendiente | Pendiente |
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
* CLI Procesador de datos (`entregas/week-01`): Lectura asíncrona de `data/events.json`, filtrado por categoría `--category`, cálculo de presupuestos/aforos y generación de `output/report.json`.


### `clients`
* *(Aún no registrados - iniciando Semana 01)*

### `vendors`
* *(Aún no registrados - iniciando Semana 01)*

### `staff`
* *(Aún no registrados - iniciando Semana 01)*
