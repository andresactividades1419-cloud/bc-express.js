# Semana 02 — Express Intro

## 🎯 Objetivos de la Semana

Al finalizar esta semana, serás capaz de:

- Crear un servidor HTTP con Express 5 y TypeScript desde cero
- Definir rutas con los métodos GET, POST, PUT y DELETE
- Comprender la cadena de middlewares y su orden de ejecución
- Leer datos desde `req.body`, `req.params` y `req.query`
- Construir respuestas con los códigos HTTP correctos
- Estructurar un proyecto Express con `app.ts` y `server.ts` separados
- Aplicar middlewares esenciales: `express.json()`, morgan, cors

## 📋 Prerrequisitos

- Semana 01 completada (Node.js, ESM, async/await, TypeScript)
- Saber qué es una petición HTTP (verb, path, headers, body)
- `pnpm` instalado y funcionando

## 🗂️ Estructura de la Semana

```
week-02-express_intro/
├── 1-teoria/
│   ├── 01-http-express.md         # ¿Qué es Express 5? Servidor HTTP básico
│   ├── 02-routing.md              # Router, params, query, métodos HTTP
│   ├── 03-middleware.md           # Cadena de middlewares, orden, next()
│   └── 04-req-res-lifecycle.md   # req/res API completa, status codes
├── 2-practicas/
│   ├── ejercicio-01-hello-express/ # Primer servidor Express con rutas
│   └── ejercicio-02-middleware/    # Cadena de middlewares personalizada
├── 3-proyecto/
│   └── starter/                   # API CRUD en memoria con Express
└── 5-glosario/
    └── README.md
```

## 📝 Contenidos

### Teoría

| Archivo | Tema | Duración estimada |
|---------|------|:-----------------:|
| [01-http-express.md](1-teoria/01-http-express.md) | HTTP y servidor Express 5 | 30 min |
| [02-routing.md](1-teoria/02-routing.md) | Routing y parámetros | 25 min |
| [03-middleware.md](1-teoria/03-middleware.md) | Cadena de middlewares | 30 min |
| [04-req-res-lifecycle.md](1-teoria/04-req-res-lifecycle.md) | req/res lifecycle | 25 min |

### Prácticas

| Ejercicio | Concepto | Duración estimada |
|-----------|----------|:-----------------:|
| [ejercicio-01-hello-express](2-practicas/ejercicio-01-hello-express/) | Primer servidor con rutas CRUD | 50 min |
| [ejercicio-02-middleware](2-practicas/ejercicio-02-middleware/) | Pipeline de middlewares | 60 min |

### Proyecto

[3-proyecto/README.md](3-proyecto/README.md) — API CRUD en memoria con Express 5. Sin base de datos aún — los datos viven en un array en memoria. Aplica routing, middlewares y manejo básico de errores HTTP.

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|-------:|
| Teoría (4 archivos) | 2 h |
| Ejercicio 01 — Hello Express | 50 min |
| Ejercicio 02 — Middleware chain | 1 h |
| Proyecto semanal | 2.5 h |
| Revisión y corrección | 40 min |
| **Total** | **7 h** |

## 📌 Entregables

1. ✅ Ejercicio 01 funcionando: servidor Express con rutas GET, POST, PUT, DELETE
2. ✅ Ejercicio 02 funcionando: pipeline de middlewares con logging, auth ficticio y manejo de errores
3. ✅ Proyecto entregado: API CRUD adaptada a tu dominio asignado, probada con Thunder Client / Postman
4. ✅ Screenshots de las peticiones en la herramienta HTTP

## 🔗 Navegación

| Anterior | Actual | Siguiente |
|----------|--------|-----------|
| [← Semana 01: Node.js Fundamentals](../week-01-nodejs_fundamentals/README.md) | **Semana 02: Express Intro** | [Semana 03: REST API Arquitectura →](../week-03-rest_api_arquitectura/README.md) |
