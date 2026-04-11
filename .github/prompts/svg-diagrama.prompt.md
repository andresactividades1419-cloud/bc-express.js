---
name: "Diagrama SVG"
description: "Crea un diagrama SVG para 0-assets/ con tema dark, paleta Node.js (#68A063), sin degradés, fuentes sans-serif. Útil para flujos JWT, arquitectura en capas, diagramas ER y flujos de middleware."
argument-hint: "Tipo de diagrama (ej: jwt-flow, layered-architecture, er-diagram, middleware-chain), semana destino (ej: week-07) y descripción del contenido"
mode: "agent"
---

# Diagrama SVG — Bootcamp ExpressJS

Crea un diagrama SVG siguiendo los estándares visuales del bootcamp.

## Estándares visuales obligatorios

| Propiedad          | Valor                                             |
| ------------------ | ------------------------------------------------- |
| Tema               | Dark (sin opción light)                           |
| Fondo              | `#0d1117`                                         |
| Sin degradés       | Colores sólidos únicamente                        |
| Fuente principal   | `system-ui, -apple-system, sans-serif`            |
| Lenguaje de labels | Inglés (código) / Español (conceptos pedagógicos) |

## Paleta de colores

```
FONDO:
  bg-primary:    #0d1117   (fondo del SVG)
  bg-surface:    #161b22   (cajas, tarjetas)
  bg-elevated:   #21262d   (elementos destacados)

TEXTO:
  text-primary:  #f0f6fc   (texto principal)
  text-secondary: #8b949e  (texto secundario, etiquetas)
  text-muted:    #484f58   (notas, metadata)

ACENTO Node.js:
  accent:        #68A063   (Node.js green — bordes principales, flechas de acción)
  accent-light:  #a5d6a7   (hover, nodos activos)
  accent-dark:   #2e7d32   (fondos de nodos principales)

ESTADO:
  success:       #3fb950   (respuestas 2xx, OK)
  warning:       #d29922   (advertencias, tokens próximos a expirar)
  error:         #f85149   (errores 4xx/5xx, fallos)
  info:          #58a6ff   (información, notas)

BORDES:
  border:        #30363d   (bordes default)
  border-strong: #6e7681   (bordes con énfasis)
```

## Estructura SVG requerida

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="800"
  height="500"
  viewBox="0 0 800 500"
  role="img"
  aria-labelledby="title desc"
>
  <!-- Accesibilidad obligatoria -->
  <title id="title">Nombre del Diagrama</title>
  <desc id="desc">Descripción completa del diagrama para lectores de pantalla</desc>

  <!-- 1. Fondo -->
  <rect width="800" height="500" fill="#0d1117" rx="12"/>

  <!-- 2. Definiciones de marcadores (flechas) -->
  <defs>
    <marker id="arrow-green" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#68A063"/>
    </marker>
    <marker id="arrow-muted" markerWidth="10" markerHeight="7"
            refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#8b949e"/>
    </marker>
  </defs>

  <!-- 3. Contenido del diagrama -->
  <!-- ... nodos, flechas, labels ... -->

  <!-- 4. Leyenda (si aplica) -->
</svg>
```

## Tipos de diagramas del bootcamp

### 1. Arquitectura en Capas (layered-architecture)

Representa el flujo `Request → Routes → Controllers → Services → Repositories → DB`.

```
┌─────────────────────────────────────────────────────┐
│                   HTTP Request                       │
└───────────────────────┬─────────────────────────────┘
                        ↓ (verde)
┌───────────────────────────────────────────────────┐
│              Middlewares (Helmet, CORS)            │
└───────────────────────┬───────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────┐
│                    Routes Layer                    │
└───────────────────────┬───────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────┐
│                Controllers Layer                   │
│         (req/res handling, calls services)        │
└───────────────────────┬───────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────┐
│                 Services Layer                     │
│            (business logic)                       │
└───────────────────────┬───────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────┐
│              Repositories Layer                    │
│           (data access, Prisma/Mongoose)          │
└───────────────────────┬───────────────────────────┘
                        ↓
┌───────────────────────────────────────────────────┐
│           Database (PostgreSQL / MongoDB)          │
└───────────────────────────────────────────────────┘
```

- Cajas: `bg-surface` (#161b22) con borde `accent` (#68A063)
- Flechas: `accent` (#68A063) con marker de flecha
- Fondo: `bg-primary` (#0d1117)

### 2. Flujo JWT (jwt-flow)

Represent el ciclo de access token + refresh token.

Nodos: Client, POST /auth/login, Validate credentials, JWT Service, Access Token (15m), Refresh Token (7d), HttpOnly Cookie, Protected Route, authMiddleware, /auth/refresh.

- Tokens: fondo `accent-dark` (#2e7d32), borde `accent` (#68A063)
- Error paths: flechas `error` (#f85149)
- Success paths: flechas `success` (#3fb950)

### 3. Diagrama ER (er-diagram)

Entidades y relaciones de la base de datos.

```
┌─────────────┐     1     ┌─────────────┐
│    User     │────────── │    Post     │
│─────────────│    N      │─────────────│
│ id: uuid    │           │ id: uuid    │
│ email       │           │ title       │
│ password    │           │ content     │
│ role        │           │ authorId FK │
└─────────────┘           └─────────────┘
```

- Tablas: `bg-elevated` (#21262d) con borde `border` (#30363d)
- PKs: color `accent` (#68A063)
- FKs: color `info` (#58a6ff)
- Líneas de relación: `border-strong` (#6e7681)

### 4. Cadena de Middleware (middleware-chain)

```
Request → helmet() → cors() → rateLimit() → authMiddleware → controller → Response
```

Cada middleware es una caja con flechas horizontales. Los middlewares de seguridad en `warning` (#d29922), el de auth en `accent` (#68A063), el controller en `success` (#3fb950).

## Reglas de tipografía

```xml
<!-- Título del diagrama -->
<text font-family="system-ui, sans-serif" font-size="18" font-weight="700"
      fill="#f0f6fc" text-anchor="middle">Título</text>

<!-- Labels de nodos -->
<text font-family="system-ui, sans-serif" font-size="14" font-weight="600"
      fill="#f0f6fc" text-anchor="middle">Label</text>

<!-- Subtítulos / notas -->
<text font-family="system-ui, sans-serif" font-size="12" font-weight="400"
      fill="#8b949e" text-anchor="middle">nota</text>
```

## Reglas de borde y esquinas

- Cajas principales: `rx="8"` (bordes redondeados suaves)
- Cajas de código / monospace: `rx="4"`
- Fondo del SVG: `rx="12"`
- **Sin `filter: drop-shadow`** ni efectos de sombra
- **Sin `linearGradient` ni `radialGradient`**

## Nombre y ubicación del archivo

```
bootcamp/week-XX/0-assets/NN-nombre-diagrama.svg
```

Donde `NN` es el orden de lectura: `01-layered-architecture.svg`, `02-jwt-flow.svg`, `03-er-diagram.svg`.

## Instrucciones para el agente

1. Crear el SVG en `bootcamp/week-XX/0-assets/` con nombre descriptivo en kebab-case
2. Respetar la paleta de colores exacta (verificar que no hay degradés)
3. Incluir `<title>` y `<desc>` para accesibilidad
4. Definir marcadores de flecha en `<defs>` para flechas consistentes
5. Fuente: siempre `system-ui, -apple-system, sans-serif`
6. Tamaño recomendado: 800×500 o 800×600 (ajustar según complejidad)
7. Después de crear el SVG, agregar la referencia en el archivo de teoría correspondiente:
   ```markdown
   ![Nombre del diagrama](../0-assets/NN-nombre.svg)
   ```
8. Validar que el SVG renderiza correctamente (sin errores de XML)

## Datos del diagrama a crear

$input
