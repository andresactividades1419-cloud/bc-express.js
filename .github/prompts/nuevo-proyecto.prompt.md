---
name: "Nuevo proyecto semanal"
description: "Crea el proyecto integrador de una semana en 3-proyecto/. Usa TODOs (a diferencia de los ejercicios) con dominio genérico adaptable. Incluye starter/ con código base y carpeta solution/ oculta."
argument-hint: "Semana (ej: week-05), tema integrador (ej: CRUD con Prisma y PostgreSQL), conceptos a demostrar"
mode: "agent"
---

# Nuevo proyecto semanal — Bootcamp ExpressJS

Crea el proyecto integrador para `3-proyecto/` con TODOs genéricos adaptables a cualquier dominio.

## Diferencia clave vs ejercicios

| Ejercicio (`2-practicas/`)        | Proyecto (`3-proyecto/`)                 |
| --------------------------------- | ---------------------------------------- |
| Código comentado para descomentar | TODOs para implementar                   |
| Concepto único y guiado           | Integra múltiples conceptos              |
| Sin `solution/`                   | Con `solution/` (oculto en `.gitignore`) |
| 30-90 minutos                     | 2-3 horas                                |
| El código completo ya existe      | El estudiante lo implementa              |

## Estructura de carpetas del proyecto

```
3-proyecto/
├── README.md         # Instrucciones genéricas adaptables al dominio
├── starter/          # Código base con TODOs
│   ├── package.json  # Versiones exactas
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── index.ts
│       ├── app.ts
│       ├── config/
│       │   └── env.ts
│       ├── routes/
│       │   └── items.routes.ts      # Ruta genérica "items"
│       ├── controllers/
│       │   └── items.controller.ts  # TODOs aquí
│       ├── services/
│       │   └── items.service.ts     # TODOs aquí
│       ├── repositories/
│       │   └── items.repository.ts  # TODOs aquí
│       ├── validators/
│       │   └── items.schema.ts      # TODOs aquí
│       └── types/
│           └── index.ts
└── solution/         # ⚠️ OCULTO — solo para instructores
    └── src/          # Implementación completa
```

## Formato del README.md del proyecto

```markdown
# Proyecto Semana XX — [Título Genérico]

## 🎯 Objetivo

Implementar [concepto de la semana] aplicado a tu dominio asignado.

## 📋 Tu Dominio Asignado

> **El instructor te asignará tu dominio.** Ejemplos:
>
> - 📖 Biblioteca → gestionar libros, autores, préstamos
> - 💊 Farmacia → gestionar medicamentos, ventas, inventario
> - 🏋️ Gimnasio → gestionar miembros, rutinas, asistencias
> - 🍽️ Restaurante → gestionar platillos, mesas, pedidos

## 🛠️ Stack Requerido

- Express 5 + TypeScript 5 con `strict: true`
- [Tecnologías específicas de la semana: Prisma, Zod, JWT, etc.]

## ✅ Requisitos Funcionales

Los siguientes endpoints son obligatorios (adapta los nombres a tu dominio):

| Método | Ruta                | Descripción           |
| ------ | ------------------- | --------------------- |
| GET    | `/api/v1/items`     | Listar con paginación |
| GET    | `/api/v1/items/:id` | Obtener por ID        |
| POST   | `/api/v1/items`     | Crear nuevo           |
| PUT    | `/api/v1/items/:id` | Actualizar completo   |
| DELETE | `/api/v1/items/:id` | Eliminar              |

## 💡 Cómo adaptar el código

El código starter usa `Item` como entidad genérica. Reemplaza:

- `Item` / `items` → el recurso de tu dominio (Libro, Medicamento, Miembro, etc.)
- Los campos del schema Zod → los campos propios de tu entidad
- Los mensajes de error → los adecuados para tu contexto

## 📊 Criterios de Evaluación

| Criterio     | Peso | Descripción                             |
| ------------ | ---- | --------------------------------------- |
| Conocimiento | 30%  | Quiz sobre los conceptos de la semana   |
| Desempeño    | 40%  | Ejercicios prácticos completados        |
| Producto     | 30%  | Este proyecto funcional y bien adaptado |

Para aprobar necesitas mínimo **70%** en cada criterio.

## 🛠️ Entregables

1. API funcional con screenshots de Postman / Thunder Client
2. Código adaptado a tu dominio con `package.json` actualizado
3. README con descripción de tu implementación específica
4. Tests pasando (si la semana incluye testing)

## 🚀 Cómo Iniciar

\`\`\`bash
cd starter/
pnpm install
cp .env.example .env # configura tus variables
pnpm dev # inicia con hot-reload
\`\`\`
```

## Formato del starter con TODOs

```ts
// ============================================
// CONTROLLER: ItemsController
// CRUD del recurso principal del dominio
// ============================================
//
// NOTA PARA EL APRENDIZ:
// Adapta este controlador a tu dominio asignado.
// Ejemplos:
// - Biblioteca: controlador de libros (Book)
// - Farmacia: controlador de medicamentos (Medicine)
// - Gimnasio: controlador de miembros (Member)

import { Request, Response, NextFunction } from "express";

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // TODO: Implementar listado con paginación (page, limit)
  // Debe retornar { data: Item[], total: number, page: number, limit: number }
  // Manejar errores con next(error)
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // TODO: Implementar búsqueda por ID
  // - Extraer id de req.params
  // - Responder 404 si no existe
  // - Responder 200 con el item si existe
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // TODO: Implementar creación
  // - Validar el body con el schema Zod correspondiente
  // - Llamar al service con los datos validados
  // - Responder 201 con el recurso creado
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // TODO: Implementar actualización completa (PUT)
  // - Verificar que el item existe (404 si no)
  // - Validar body con schema Zod
  // - Responder 200 con el item actualizado
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  // TODO: Implementar eliminación
  // - Verificar que el item existe (404 si no)
  // - Responder 204 No Content si se eliminó correctamente
}
```

## package.json para starter del proyecto

```json
{
  "name": "week-XX-proyecto",
  "version": "1.0.0",
  "description": "Proyecto Semana XX — [Título]",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest --passWithNoTests"
  },
  "dependencies": {
    "express": "5.1.0",
    "zod": "3.24.4"
  },
  "devDependencies": {
    "@types/express": "5.0.1",
    "@types/node": "22.15.21",
    "tsx": "4.19.4",
    "typescript": "5.8.3"
  }
}
```

> Añade las dependencias exactas de la semana (Prisma, JWT, bcrypt, etc.) según el tema.

## Instrucciones para el agente

1. Crear `bootcamp/week-XX/3-proyecto/` con exactamente esta estructura
2. El README usa `Item` / `items` como nombre genérico — el aprendiz lo adapta a su dominio
3. En `starter/`: TODOs claros con instrucciones de qué debe implementar y cómo
4. En `solution/`: implementación completa y funcional (el instructor la revisará)
5. **`solution/` NO se debe hacer commit** — ya está en `.gitignore` como `**/solution/`
6. `package.json` con versiones exactas en ambas carpetas (`starter/` y `solution/`)
7. `.env.example` con todas las variables necesarias sin valores reales
8. La arquitectura debe respetar la estructura en capas: `routes → controllers → services → repositories`
9. Incluir schema Zod para validación de inputs en `validators/`
10. El proyecto debe poder completarse en 2-3 horas

## Datos del proyecto a crear

$input
