# Semana 01 — Node.js Fundamentals

## 🎯 Objetivos de la Semana

Al finalizar esta semana, serás capaz de:

- Comprender el runtime de Node.js y su modelo de I/O no bloqueante
- Explicar el Event Loop y por qué Node.js puede manejar miles de conexiones simultáneas
- Usar módulos ES Modules (ESM) con `import`/`export` en Node.js
- Escribir código asíncrono moderno con `async`/`await` y manejar errores correctamente
- Configurar TypeScript para un proyecto backend con `strict: true`
- Ejecutar y compilar TypeScript en Node.js con `tsx` y `tsc`

## 📋 Prerrequisitos

- Conocimiento sólido de JavaScript moderno (ES2020+)
- Experiencia con `async`/`await` básico
- Familiaridad con la terminal (bash/zsh)
- Node.js 22+ instalado (`node --version`)
- pnpm instalado (`pnpm --version`)
- VS Code con extensiones recomendadas

## 🗂️ Estructura de la Semana

```
week-01-nodejs_fundamentals/
├── 1-teoria/
│   ├── 01-nodejs-runtime.md      # Event loop, I/O no bloqueante
│   ├── 02-modulos-esm.md         # ESM, import/export, path, fs
│   ├── 03-async-await.md         # Callbacks → Promises → async/await
│   └── 04-typescript-config.md  # tsconfig, strict, @types/node
├── 2-practicas/
│   ├── ejercicio-01-hello-node/  # Primer script Node.js + TypeScript
│   └── ejercicio-02-async/       # Patrones asíncronos comparados
├── 3-proyecto/
│   └── starter/                  # Procesador de datos con Node.js
└── 5-glosario/
    └── README.md                 # Términos clave de la semana
```

## 📝 Contenidos

### Teoría

| Archivo | Tema | Duración estimada |
|---------|------|:-----------------:|
| [01-nodejs-runtime.md](1-teoria/01-nodejs-runtime.md) | Event Loop y modelo I/O | 30 min |
| [02-modulos-esm.md](1-teoria/02-modulos-esm.md) | Módulos ESM en Node.js | 25 min |
| [03-async-await.md](1-teoria/03-async-await.md) | async/await y manejo de errores | 30 min |
| [04-typescript-config.md](1-teoria/04-typescript-config.md) | TypeScript para backend | 25 min |

### Prácticas

| Ejercicio | Concepto | Duración estimada |
|-----------|----------|:-----------------:|
| [ejercicio-01-hello-node](2-practicas/ejercicio-01-hello-node/) | Primer script Node.js + TS | 45 min |
| [ejercicio-02-async](2-practicas/ejercicio-02-async/) | Comparar patrones async | 60 min |

### Proyecto

[3-proyecto/README.md](3-proyecto/README.md) — Procesador de datos con Node.js puro (sin frameworks). Aplica lectura de archivos, transformación de datos y escritura de resultados con async/await.

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|-------:|
| Teoría (4 archivos) | 2 h |
| Ejercicio 01 — Hello Node | 45 min |
| Ejercicio 02 — Async patterns | 1 h |
| Proyecto semanal | 2.5 h |
| Revisión y corrección | 45 min |
| **Total** | **7 h** |

## 📌 Entregables

1. ✅ Ejercicio 01 funcionando: script que lee un archivo y muestra datos en consola
2. ✅ Ejercicio 02 funcionando: los 3 patrones async implementados y comparados
3. ✅ Proyecto entregado: procesador de datos adaptado a tu dominio asignado
4. ✅ README en el proyecto con descripción de tu implementación

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| — | **Semana 01: Node.js Fundamentals** | [Semana 02: Express Intro →](../week-02-express_intro/README.md) |
