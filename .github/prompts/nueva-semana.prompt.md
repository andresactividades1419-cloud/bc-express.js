---
name: "Nueva semana"
description: "Crea la estructura completa de una semana del bootcamp: carpetas, README, rúbrica, teoría placeholder, prácticas placeholder, proyecto starter y glosario. Usar cuando se vaya a comenzar una nueva semana."
argument-hint: "Número de semana (ej: 05), slug del tema (ej: postgresql_prisma), objetivos de aprendizaje y conceptos clave que se enseñan"
mode: "agent"
---

# Scaffold de nueva semana — Bootcamp ExpressJS

Crea la estructura completa de carpetas y archivos base para una semana del
bootcamp, siguiendo estrictamente las convenciones de `.github/copilot-instructions.md`.

## Estructura que debes crear

```
bootcamp/week-XX-tema_principal/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/                  ← carpeta vacía (crear .gitkeep)
├── 1-teoria/                  ← archivos .md de teoría
├── 2-practicas/               ← ejercicios guiados (uncomment pattern)
│   └── ejercicio-01/
│       ├── README.md
│       └── starter/
│           ├── src/
│           │   └── index.ts
│           └── package.json
├── 3-proyecto/
│   ├── README.md
│   └── starter/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── app.ts
│           └── routes/
│               └── items.routes.ts
└── 5-glosario/
    └── README.md
```

> ⚠️ La carpeta `3-proyecto/solution/` está en `.gitignore`. NO la crees.

## Convenciones obligatorias

- **Idioma documentación**: español
- **Idioma código**: inglés (variables, funciones, tipos, nombres de archivo)
- **TypeScript**: tipos explícitos, `strict: true`, sin `any`
- **pnpm**: SOLO pnpm, versiones exactas sin `^`, `~` ni `*`
- **Ejercicios**: patrón uncomment (código comentado para descomentar), SIN TODOs
- **Proyectos**: TODOs genéricos adaptables al dominio asignado al aprendiz
- **Teoría**: ~150 líneas por archivo, máx 200 — dividir si es necesario
- **SVGs**: dark theme (`#0d1117`), sin degradés, fuente sans-serif

## README.md de la semana

Debe seguir esta estructura:

```markdown
# Semana XX — [Título del Tema]

> Descripción breve de la semana en 1-2 líneas.

## 🎯 Objetivos de aprendizaje

Al finalizar esta semana, el estudiante será capaz de:

- ...

## 📚 Requisitos previos

- Semana anterior completada
- ...

## 🗂️ Estructura de la semana

| Carpeta        | Contenido           | Tiempo |
| -------------- | ------------------- | ------ |
| `1-teoria/`    | ...                 | 2h     |
| `2-practicas/` | ...                 | 3-4h   |
| `3-proyecto/`  | Proyecto integrador | 2-3h   |

## 📝 Contenidos

### Teoría

- [Tema 1](1-teoria/tema-1.md)
- ...

### Prácticas

- [Ejercicio 01](2-practicas/ejercicio-01/README.md)
- ...

## ⏱️ Distribución del tiempo (8 horas)

| Actividad | Tiempo | Descripción           |
| --------- | ------ | --------------------- |
| Teoría    | 2h     | Lectura y ejemplos    |
| Prácticas | 4h     | Ejercicios guiados    |
| Proyecto  | 2h     | Implementación propia |

## 📌 Entregables

- [ ] Ejercicios completados (prácticas descomentadas y funcionando)
- [ ] Proyecto adaptado al dominio asignado
- [ ] API probada con Postman/Thunder Client

## 🔗 Navegación

← [Semana XX-1](../week-XX-tema-anterior/README.md) | [Semana XX+1](../week-XX-tema-siguiente/README.md) →
```

## rubrica-evaluacion.md

Usar esta estructura base con el desglose 30/40/30:

```markdown
# Rúbrica de Evaluación — Semana XX

## Distribución de Puntaje

| Tipo de Evidencia | Peso | Instrumento          |
| ----------------- | ---- | -------------------- |
| Conocimiento 🧠   | 30%  | Cuestionario teórico |
| Desempeño 💪      | 40%  | Ejercicios en clase  |
| Producto 📦       | 30%  | Proyecto entregable  |

**Mínimo aprobatorio**: 70% en cada tipo de evidencia.

## 🧠 Conocimiento (30%)

...criterios específicos del tema...

## 💪 Desempeño (40%)

...criterios de ejercicios...

## 📦 Producto (30%)

...criterios del proyecto adaptado al dominio...

### Criterios transversales

- ✅ Implementación coherente con el dominio asignado
- ✅ Sin copia de implementaciones de otros aprendices
- ✅ API funcional probada con Postman/Thunder Client
- ✅ TypeScript sin errores de compilación
```

## 5-glosario/README.md

```markdown
# Glosario — Semana XX

Términos técnicos clave introducidos esta semana, ordenados alfabéticamente.

## A

## B

...

> 📚 Glosario global del bootcamp: [docs/glosario-global.md](../../docs/glosario-global.md)
```

## Instrucciones para el agente

1. Crear la estructura de carpetas completa según el árbol indicado
2. Generar el `README.md` de la semana con los objetivos y contenidos del input
3. Generar la `rubrica-evaluacion.md` adaptada al tema de la semana
4. Crear archivos placeholder en `1-teoria/` (un archivo .md por concepto principal)
5. Crear `2-practicas/ejercicio-01/` con README y `starter/src/index.ts` usando patrón uncomment
6. Crear `3-proyecto/README.md` con instrucciones genéricas adaptables a dominios
7. Crear `3-proyecto/starter/` con estructura Express básica y TODOs genéricos
8. Crear `5-glosario/README.md` con los términos clave del tema
9. Crear `0-assets/.gitkeep` para que la carpeta quede trackeada por git
10. NO crear la carpeta `solution/` — está en `.gitignore`

## Datos de la semana a crear

$input
