---
name: "Nuevo ejercicio práctico"
description: "Crea un ejercicio guiado para 2-practicas/ con el patrón de código comentado para descomentar. El estudiante aprende descomentando código, NO implementando desde cero."
argument-hint: "Semana (ej: week-03), nombre del ejercicio (ej: ejercicio-01-router-basico), concepto a practicar y dependencias requeridas"
mode: "agent"
---

# Nuevo ejercicio práctico — Bootcamp ExpressJS

Crea un ejercicio guiado para `2-practicas/` usando el patrón de código comentado.

## ⚠️ REGLA FUNDAMENTAL: Patrón de Descomentar

Los ejercicios son **tutoriales guiados**, NO tareas con TODOs.

```ts
// ✅ CORRECTO — código comentado para descomentar
// El estudiante aprende descomentando estas líneas:
// router.get('/items', async (req: Request, res: Response) => {
//   const items = await itemService.findAll();
//   res.json(items);
// });

// ❌ INCORRECTO — esto es para PROYECTOS, no ejercicios
router.get("/items", async (req: Request, res: Response) => {
  // TODO: Implementar listado de items
});
```

## Estructura de carpetas del ejercicio

```
2-practicas/ejercicio-01-nombre/
├── README.md           # Instrucciones paso a paso con el código explicado
└── starter/            # Código inicial con todo comentado
    ├── package.json    # Versiones exactas (sin ^, ~, *)
    ├── tsconfig.json   # strict: true
    ├── .env.example    # Variables de entorno necesarias
    └── src/
        ├── index.ts    # Entry point (puede estar listo o parcialmente comentado)
        ├── app.ts      # Configuración Express
        └── ...         # Archivos específicos del ejercicio
```

> ⚠️ **Sin carpeta `solution/`**: Los ejercicios NO tienen solución oculta. El código comentado IS la solución.

## Formato del README.md del ejercicio

```markdown
# Ejercicio XX — [Título del Ejercicio]

## 🎯 Objetivo

Aprender [concepto específico] del bootcamp de ExpressJS.

## 📋 Prerrequisitos

- [Concepto de la semana anterior]
- [Tema de teoría relacionado]

## ⏱️ Tiempo estimado: [30-90] minutos

---

## Paso 1: [Nombre del concepto]

Explicación clara del concepto con ejemplo:

\`\`\`ts
// Ejemplo con comentarios educativos
const router = Router();
router.get('/items', async (req: Request, res: Response) => {
// Handler que responde con lista de items
const items = await itemService.findAll();
res.json(items); // 200 OK por defecto
});
\`\`\`

**Abre `starter/src/routes/items.routes.ts`** y descomenta la sección del Paso 1.

Verifica con Thunder Client o curl:
\`\`\`bash
curl http://localhost:3000/api/v1/items
\`\`\`

Deberías ver:
\`\`\`json
{ "data": [], "total": 0 }
\`\`\`

---

## Paso 2: [Siguiente concepto]

...
```

## Formato del archivo starter con código comentado

```ts
// ============================================
// PASO 1: Router básico de Express
// Abre este archivo y descomenta las líneas
// ============================================

import { Router, Request, Response } from "express";

// Descomenta las siguientes líneas para el Paso 1:
// const router = Router();
//
// router.get('/', async (req: Request, res: Response) => {
//   // findAll retorna todos los items de la DB
//   const items = await itemService.findAll();
//   res.json({ data: items });
// });

// ============================================
// PASO 2: Parámetros de ruta
// ============================================

// Descomenta las siguientes líneas para el Paso 2:
// router.get('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const item = await itemService.findById(id);
//   if (!item) {
//     res.status(404).json({ message: 'Item not found' });
//     return;
//   }
//   res.json(item);
// });

// export default router; // <- descomenta al final
```

## package.json obligatorio en starter

```json
{
  "name": "ejercicio-XX-nombre",
  "version": "1.0.0",
  "description": "Ejercicio XX — [Tema]",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "5.1.0"
  },
  "devDependencies": {
    "@types/express": "5.0.1",
    "@types/node": "22.15.21",
    "tsx": "4.19.4",
    "typescript": "5.8.3"
  }
}
```

> **Regla de oro**: versiones **exactas** siempre. Nunca `^`, `~` ni `*`.

## tsconfig.json en starter

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Instrucciones para el agente

1. Crear la carpeta `bootcamp/week-XX/2-practicas/ejercicio-XX-nombre/`
2. Crear `README.md` con pasos numerados y ejemplos explicativos del concepto
3. Crear `starter/` con código completamente comentado por secciones (PASO 1, PASO 2…)
4. El README incluye el código correcto para que el estudiante lo entienda antes de descomentar
5. Incluir comandos de verificación (`curl` o Thunder Client) después de cada paso
6. **package.json con versiones exactas** — usar `pnpm add paquete@X.Y.Z` si hay dudas de la versión
7. TypeScript `strict: true` en todos los starters
8. `.env.example` con todas las variables necesarias (nunca valores reales)
9. No crear carpeta `solution/`
10. El ejercicio debe poder completarse en 30-90 minutos

## Datos del ejercicio a crear

$input
