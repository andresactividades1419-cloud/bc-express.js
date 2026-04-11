# Semana 03 — REST API Arquitectura en Capas

## 🎯 Objetivos de la Semana

Al finalizar esta semana, serás capaz de:

- Organizar un proyecto Express en capas: `routes → controllers → services → repositories`
- Separar responsabilidades: qué hace cada capa y por qué
- Diseñar contratos de API REST coherentes (rutas, verbos, status codes)
- Crear DTOs (Data Transfer Objects) tipados con TypeScript
- Estructurar respuestas JSON consistentes (data wrapper, paginación, errores)
- Aplicar el principio de capas delgadas (thin controllers, logic in services)

## 📋 Prerrequisitos

- Semanas 01 y 02 completadas (Node.js, TypeScript, Express 5, middleware)
- Conocer cómo crear rutas y leer `req.body`, `req.params`, `req.query`
- Entender qué es un middleware y el error handler de Express

## 🗂️ Estructura de la Semana

```
week-03-rest_api_arquitectura/
├── 1-teoria/
│   ├── 01-arquitectura-capas.md   # Por qué separar en capas, diagrama
│   ├── 02-rest-contratos.md       # REST, versioning, response contracts
│   ├── 03-controllers-services.md # Thin controllers, business logic in services
│   └── 04-repositories-dtos.md   # Repository pattern, DTOs, TypeScript types
├── 2-practicas/
│   ├── ejercicio-01-refactor/     # Refactorizar app flat de semana 02 en capas
│   └── ejercicio-02-contratos/    # Diseñar y validar contratos REST
├── 3-proyecto/
│   └── starter/                   # API CRUD en memoria con arquitectura en capas
└── 5-glosario/
    └── README.md
```

## 📝 Contenidos

### Teoría

| Archivo | Tema | Duración estimada |
|---------|------|:-----------------:|
| [01-arquitectura-capas.md](1-teoria/01-arquitectura-capas.md) | Arquitectura en capas y separación de responsabilidades | 35 min |
| [02-rest-contratos.md](1-teoria/02-rest-contratos.md) | REST, versioning y contratos de respuesta | 30 min |
| [03-controllers-services.md](1-teoria/03-controllers-services.md) | Controllers delgados y lógica en services | 30 min |
| [04-repositories-dtos.md](1-teoria/04-repositories-dtos.md) | Repository pattern, DTOs y tipos TypeScript | 25 min |

### Prácticas

| Ejercicio | Concepto | Duración estimada |
|-----------|----------|:-----------------:|
| [ejercicio-01-refactor](2-practicas/ejercicio-01-refactor/) | Refactorizar app flat en arquitectura de capas | 60 min |
| [ejercicio-02-contratos](2-practicas/ejercicio-02-contratos/) | Diseñar contratos REST con responses consistentes | 50 min |

### Proyecto

[3-proyecto/README.md](3-proyecto/README.md) — API CRUD en memoria con arquitectura completa en 4 capas. Sin base de datos aún — los datos persisten en memoria. Aplica la separación `routes → controllers → services → repositories` con DTOs tipados.

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|-------:|
| Teoría (4 archivos) | 2 h |
| Ejercicio 01 — Refactor en capas | 1 h |
| Ejercicio 02 — Contratos REST | 50 min |
| Proyecto semanal | 2.5 h |
| Revisión y corrección | 40 min |
| **Total** | **7 h** |

## 📌 Entregables

1. ✅ Ejercicio 01 funcionando: app de semana 02 refactorizada con capas separadas
2. ✅ Ejercicio 02 funcionando: respuestas JSON con contrato consistente (data wrapper, paginación, errores)
3. ✅ Proyecto entregado: API CRUD adaptada a tu dominio con arquitectura en 4 capas
4. ✅ Screenshots de las peticiones con Thunder Client / Postman

## 🔗 Navegación

← [Semana 02 — Express Intro](../week-02-express_intro/README.md) | [Semana 04 — Validación y Error Handling](../week-04-validacion_error_handling/README.md) →
