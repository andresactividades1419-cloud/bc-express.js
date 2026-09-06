# Semana 01 — Procesador de Datos CLI (Productora de Eventos)

## Descripción del Proyecto

Proyecto entregable de la **Semana 01** para el Bootcamp **bc-expressjs**, adaptado 100% al dominio asignado: **Productora de Eventos**.

Esta herramienta de línea de comandos (CLI) procesa información sobre eventos de la empresa (conciertos, bodas, conferencias, eventos corporativos, festivales y exposiciones), realiza lectura asíncrona de datos desde `data/events.json`, calcula métricas de presupuestos y aforos, permite filtrado dinámico por categoría y exporta un reporte estructurado en `output/report.json`.

---

## Entidad del Dominio: `Event`

- `id`: Identificador único del evento (ej: `EVT-001`)
- `name`: Nombre descriptivo del evento
- `category`: Categoría (`concierto`, `boda`, `conferencia`, `corporativo`, `festival`, `exposicion`)
- `price`: Presupuesto asignado / costo total del evento en COP
- `capacity`: Aforo máximo estimado
- `active`: Estado del evento (`true` = confirmado, `false` = cancelado)
- `location`: Recinto o lugar del evento
- `date`: Fecha programada (ISO 8601)

---

## Requisitos Cumplidos (Rúbrica de Evaluación)

- **Compilación TypeScript**: `strict: true`, sin tipos `any`, compatible con Node.js 22+.
- **ES Modules**: `import`/`export` nativos de ESM.
- **Lectura y Escritura Asíncrona**: Uso de `fs/promises` (`readFile`, `writeFile`, `mkdir`) y `async/await`.
- **Filtrado CLI**: Soporte para argumento `--category <categoría>`.
- **Resumen Estadístico**: Total de eventos, activos/inactivos, presupuesto promedio, evento más caro/barato y categorías únicas.
- **Manejo de Errores**: Captura con `try/catch` y mensajes amigables sin crashes inesperados.

---

## Instrucciones de Ejecución

```bash
# 1. Instalar dependencias con pnpm
pnpm install

# 2. Verificar compilación TypeScript
pnpm build

# 3. Ejecutar procesador (sin filtro — procesa todos los eventos)
pnpm dev

# 4. Ejecutar filtrando por categoría de evento
pnpm dev -- --category concierto
pnpm dev -- --category boda
pnpm dev -- --category conferencia
```

---

## Estructura del Proyecto

```
./
├── package.json
├── tsconfig.json
├── README.md
├── data/
│   └── events.json          # 10 registros de eventos reales
├── output/
│   └── report.json          # Generado automáticamente al ejecutar
└── src/
    ├── types.ts             # Interfaces Event, EventSummary y Report
    ├── reader.ts            # Lectura asíncrona de events.json
    ├── processor.ts         # Filtrado por categoría y cálculo de resumen
    ├── writer.ts            # Escritura asíncrona en output/report.json
    └── index.ts             # Orquestador principal de la CLI
```
