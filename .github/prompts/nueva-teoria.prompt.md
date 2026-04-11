---
name: "Nuevo archivo de teoría"
description: "Crea un archivo de teoría completo para 1-teoria/ siguiendo la estructura estándar del bootcamp: ~150 líneas, en español, con ejemplos de código en inglés y referencias a docs oficiales."
argument-hint: "Semana (ej: week-05), nombre del tema (ej: prisma-relaciones), conceptos clave a cubrir y nivel de dificultad relativo a la semana anterior"
mode: "agent"
---

# Nuevo archivo de teoría — Bootcamp ExpressJS

Crea un archivo de teoría para `1-teoria/` siguiendo los estándares del bootcamp.

## Reglas de extensión

- **Objetivo**: ~150 líneas por archivo
- **Máximo**: 200 líneas — si se supera, dividir en archivos temáticos
- **Mínimo**: 80 líneas para que el contenido sea completo
- Dividir por sub-temas: `01-introduccion.md`, `02-middleware.md`, `03-avanzado.md`

## Convenciones obligatorias

- **Idioma**: español (explicaciones, títulos, comentarios pedagógicos)
- **Código**: inglés (variables, funciones, tipos, nombres de archivo)
- **Comentarios de código**: español cuando explican conceptos de aprendizaje
- **Contexto backend vs frontend**: señalar diferencias cuando aplique
- **Sin ASCII art**: usar SVG para diagramas (referenciar desde `../0-assets/`)
- **Fuentes oficiales**: enlazar siempre a docs de Node.js, Express, Prisma, etc.

## Estructura requerida del archivo

```markdown
# [Título del Tema]

## 🎯 Objetivos

Al finalizar este archivo, comprenderás:

- Concepto 1
- Concepto 2
- Concepto 3

## 📋 Conceptos Clave

### 1. [Primer concepto]

Explicación en español...

> 💡 **Diferencia con el frontend**: [Si aplica]

\`\`\`ts
// Explicación del concepto en comentario
// Código con nombres en inglés
async function exampleHandler(req: Request, res: Response): Promise<void> {
// ...
}
\`\`\`

### 2. [Segundo concepto]

...

### 3. Ejemplos Prácticos

Caso de uso real de API REST (e-commerce, auth, CRUD):

\`\`\`ts
// Ejemplo del mundo real
\`\`\`

### 4. Casos de Uso en APIs REST

Cuándo usar [concepto] en una API real...

## ⚠️ Errores Comunes

- Error 1: [descripción + cómo evitarlo]
- Error 2: ...

## 📚 Recursos Adicionales

- [Documentación oficial](https://...)
- [Guía de Express](https://expressjs.com/...)

## ✅ Checklist de Verificación

Antes de continuar a las prácticas, verifica que entiendes:

- [ ] Concepto 1
- [ ] Concepto 2
- [ ] Concepto 3
```

## Estilo de los ejemplos de código

Los ejemplos deben ser **educativos**, no solo descriptivos:

```ts
// ✅ CORRECTO — comenta para enseñar
import { Request, Response, NextFunction } from "express";

// En Express, los middlewares reciben siempre (req, res, next).
// La diferencia con un controlador final es que DEBEN llamar next()
// para pasar el control al siguiente middleware de la cadena.
function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // El token viene en el header Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    // Si no hay token, cortamos la cadena aquí con un 401
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Si el token es válido, next() pasa al siguiente handler
  next();
}
```

```ts
// ❌ INCORRECTO — sin comentarios educativos
function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) res.status(401).json({ message: "Unauthorized" });
  else next();
}
```

## Cómo referenciar assets SVG

Si el tema necesita un diagrama, referenciar el SVG de `0-assets/`:

```markdown
![Diagrama del flujo JWT](../0-assets/jwt-flow.svg)
```

Si el SVG no existe, indicar que debe crearse con el prompt `svg-diagrama`.

## Convenciones de TypeScript en teoría

```ts
// interfaces para DTOs y tipos de dominio
interface CreateItemDto {
  name: string;
  description?: string;
  price: number;
}

// tipo de retorno explícito siempre
export async function createItem(dto: CreateItemDto): Promise<Item> {
  return prisma.item.create({ data: dto });
}

// generics nativos
const items: Array<Item> = await prisma.item.findMany();
```

## Instrucciones para el agente

1. Crear el archivo en `bootcamp/week-XX/1-teoria/nombre-tema.md`
2. Respetar el límite de ~150 líneas — dividir en múltiples archivos si el tema lo requiere
3. Incluir obligatoriamente: Objetivos, Conceptos Clave, Ejemplos Prácticos, Errores Comunes, Recursos, Checklist
4. Todos los ejemplos de código en TypeScript con tipos explícitos
5. Señalar diferencias con el frontend en al menos un concepto
6. Referenciar documentación oficial de Node.js, Express y/o la librería relevante
7. Si el tema requiere diagrama, indicar nombre del SVG a generar con el prompt `svg-diagrama`

## Datos del archivo de teoría a crear

$input
