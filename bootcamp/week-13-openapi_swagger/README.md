# Semana 13: OpenAPI / Swagger

Documentar una API de forma clara y mantenible es una habilidad esencial en el
desarrollo backend profesional. Esta semana aprenderás a generar documentación
interactiva con **OpenAPI 3** y **Swagger UI** directamente desde tu código
Express con TypeScript, sin duplicar definiciones — la documentación vive junto
al código.

---

## 🎯 Objetivos de aprendizaje

Al finalizar esta semana serás capaz de:

- Explicar la especificación **OpenAPI 3.x** y su estructura (`info`, `paths`, `components`)
- Generar una spec OpenAPI desde JSDoc con **swagger-jsdoc**
- Servir **Swagger UI** desde tu API Express con **swagger-ui-express**
- Documentar parámetros de ruta, query, request bodies y respuestas HTTP
- Definir schemas reutilizables en `components/schemas` con `$ref`
- Agregar autenticación **Bearer JWT** al esquema de seguridad de la API
- Organizar endpoints con **tags** y aplicar estrategias de versionado

---

## 📚 Requisitos previos

| Semana | Tema | Conceptos necesarios |
|--------|------|----------------------|
| Semana 03 | REST API | Arquitectura en capas, HTTP status codes, contratos |
| Semana 07 | Autenticación JWT | JWT, Bearer tokens, endpoints de auth |

---

## 🗂️ Estructura de la semana

```
week-13-openapi_swagger/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/
│   ├── 01-openapi-structure.svg
│   ├── 02-swagger-express-integration.svg
│   └── 03-endpoint-anatomy.svg
├── 1-teoria/
│   ├── 01-openapi-fundamentos.md
│   ├── 02-swagger-express.md
│   ├── 03-documentar-rutas.md
│   └── 04-schemas-seguridad.md
├── 2-practicas/
│   ├── ejercicio-01-swagger-basico/
│   └── ejercicio-02-openapi-seguridad/
├── 3-proyecto/
│   ├── README.md
│   └── starter/
├── 4-recursos/
│   ├── ebooks-free/
│   ├── videografia/
│   └── webgrafia/
└── 5-glosario/
    └── README.md
```

---

## 📝 Contenidos

### Teoría

| Archivo | Tema |
|---------|------|
| `01-openapi-fundamentos.md` | Especificación OpenAPI 3.x: estructura, historia y casos de uso |
| `02-swagger-express.md` | Integración con Express: swagger-jsdoc + swagger-ui-express |
| `03-documentar-rutas.md` | JSDoc para endpoints: params, requestBody, responses, `$ref` |
| `04-schemas-seguridad.md` | Schemas reutilizables, Bearer JWT y organización con tags |

### Prácticas

| Ejercicio | Descripción |
|-----------|-------------|
| `ejercicio-01-swagger-basico` | Configurar Swagger en una API CRUD existente paso a paso |
| `ejercicio-02-openapi-seguridad` | Schemas con `$ref`, Bearer auth y tags |

---

## ⏱️ Distribución del tiempo (8 horas)

| Actividad | Tiempo |
|-----------|--------|
| Teoría (4 archivos) | 2 h |
| Ejercicio 01: swagger básico | 1.5 h |
| Ejercicio 02: seguridad + schemas | 1.5 h |
| Proyecto semanal | 3 h |
| **Total** | **8 h** |

---

## 📌 Entregables

- **Swagger UI** accesible en `GET /api-docs` con todos los endpoints documentados
- Schemas reutilizables en `components/schemas` con `$ref`
- Autenticación **Bearer JWT** documentada y funcional desde Swagger UI
- Endpoints organizados por **tags**
- Captura de pantalla de Swagger UI mostrando la especificación completa

---

## 🔗 Navegación

| Anterior | Siguiente |
|----------|-----------|
| [← Semana 12: Caching y Performance](../week-12-caching_performance/README.md) | [Semana 14: Docker →](../week-14-docker/README.md) |
