# Reglas del Bootcamp `bc-expressjs` (Ficha 3228970)

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

