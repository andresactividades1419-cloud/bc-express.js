# Semana 04 — Validación y Manejo de Errores

## 🎯 Objetivos de la Semana

Al finalizar esta semana, serás capaz de:

- Validar datos de entrada con **Zod** y generar errores descriptivos automáticamente
- Diseñar una clase `AppError` para representar errores HTTP del dominio
- Implementar un **middleware global de errores** en Express que centralice todas las respuestas de fallo
- Agregar un **404 handler** para rutas no existentes
- Configurar **Winston** como logger de producción con niveles y transports
- Integrar **Morgan** para registrar automáticamente cada petición HTTP

## 📋 Prerrequisitos

- Semanas 01, 02 y 03 completadas
- Conocer la arquitectura en 4 capas (`routes → controllers → services → repositories`)
- Entender qué es un middleware y cómo funciona `next(err)` en Express

## 🗂️ Estructura de la Semana

```
week-04-validacion_error_handling/
├── 1-teoria/
│   ├── 01-validacion-zod.md       # Schemas, parse, safeParse, ZodError
│   ├── 02-app-error.md            # AppError class, tipos de errores HTTP
│   ├── 03-middleware-errores.md   # Error handler global, 404 handler
│   └── 04-logging-winston.md     # Winston, Morgan, niveles, transports
├── 2-practicas/
│   ├── ejercicio-01-validacion/   # Agregar Zod a API de semana 03
│   └── ejercicio-02-error-handler/ # AppError + error handler global
├── 3-proyecto/
│   └── starter/                   # API completa con validación, errores y logs
└── 5-glosario/
    └── README.md
```

## 📝 Contenidos

### Teoría

| Archivo | Tema | Duración estimada |
|---------|------|:-----------------:|
| [01-validacion-zod.md](1-teoria/01-validacion-zod.md) | Schemas Zod, parsing y manejo de errores de validación | 35 min |
| [02-app-error.md](1-teoria/02-app-error.md) | AppError class, errores operacionales vs programáticos | 30 min |
| [03-middleware-errores.md](1-teoria/03-middleware-errores.md) | Middleware global de errores y 404 handler en Express | 30 min |
| [04-logging-winston.md](1-teoria/04-logging-winston.md) | Winston logger, niveles, transports e integración Morgan | 25 min |

### Prácticas

| Ejercicio | Concepto | Duración estimada |
|-----------|----------|:-----------------:|
| [ejercicio-01-validacion](2-practicas/ejercicio-01-validacion/) | Agregar validación Zod a todos los endpoints | 60 min |
| [ejercicio-02-error-handler](2-practicas/ejercicio-02-error-handler/) | AppError + error handler global + 404 handler | 50 min |

### Proyecto

[3-proyecto/README.md](3-proyecto/README.md) — API CRUD con la arquitectura de semana 03 extendida con: validación Zod en todos los endpoints, `AppError` para errores HTTP, middleware global de errores, 404 handler y Winston logger configurado por entorno.

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|-------:|
| Teoría (4 archivos) | 2 h |
| Ejercicio 01 — Validación Zod | 1 h |
| Ejercicio 02 — Error handler + AppError | 50 min |
| Proyecto semanal | 2.5 h |
| Revisión y corrección | 40 min |
| **Total** | **7 h** |

## 📌 Entregables

1. ✅ Ejercicio 01: validación Zod activa en `POST` y `PUT`, con respuestas 400 descriptivas
2. ✅ Ejercicio 02: error handler global con `AppError`, manejo de `ZodError`, 404 handler
3. ✅ Proyecto adaptado a tu dominio con validación, errores y logs funcionando
4. ✅ Screenshots de peticiones exitosas y errores con Thunder Client / Postman

## 🔗 Navegación

← [Semana 03 — REST API Arquitectura](../week-03-rest_api_arquitectura/README.md) | [Semana 05 — PostgreSQL + Prisma](../week-05-postgresql_prisma/README.md) →
