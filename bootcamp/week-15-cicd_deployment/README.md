# Semana 15 — CI/CD y Deployment

## 🎯 Objetivos de la Semana

Al finalizar esta semana serás capaz de:

1. Entender el ciclo completo de CI/CD y su propósito en equipos profesionales
2. Crear pipelines de GitHub Actions para lint, tests y build automáticos
3. Desplegar una API Express dockerizada en Railway o Render
4. Configurar variables de entorno y secretos en plataformas cloud
5. Implementar health checks y validar deploys exitosos
6. Agregar logging estructurado con Winston + Logtail para monitoreo
7. Gestionar rollbacks y estrategias de despliegue seguro

---

## 📚 Requisitos Previos

| Semana | Conocimiento necesario |
|--------|----------------------|
| Semana 01 | Node.js, TypeScript, async/await |
| Semana 09 | Jest + Supertest: tests de integración |
| Semana 14 | Docker: Dockerfile multi-stage, docker-compose |

---

## 🗂️ Estructura de la Semana

```
week-15-cicd_deployment/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/
│   ├── 01-cicd-pipeline.svg          # Flujo completo del pipeline CI/CD
│   ├── 02-github-actions-workflow.svg # Anatomía de un workflow de GitHub Actions
│   └── 03-deployment-topology.svg    # Topología de despliegue en Railway/Render
├── 1-teoria/
│   ├── 01-cicd-fundamentos.md        # CI/CD: conceptos, ventajas, etapas
│   ├── 02-github-actions.md          # Workflows, jobs, steps, secrets, cache
│   ├── 03-deployment-railway.md      # Despliegue en Railway: DB, variables, logs
│   └── 04-monitoring-logging.md      # Logtail, Winston estructurado, health checks
├── 2-practicas/
│   ├── ejercicio-01-github-actions/  # Crear pipeline CI: lint + test + build
│   └── ejercicio-02-deployment/      # Desplegar API en Railway/Render
├── 3-proyecto/
│   ├── README.md
│   └── starter/                      # API dockerizada lista para CI/CD
├── 4-recursos/
│   ├── ebooks-free/
│   ├── videografia/
│   └── webgrafia/
└── 5-glosario/
    └── README.md
```

---

## 📝 Contenidos

### Teoría (2 horas)

| Archivo | Tema |
|---------|------|
| [01-cicd-fundamentos.md](1-teoria/01-cicd-fundamentos.md) | Qué es CI/CD, pipeline stages, trunk-based development |
| [02-github-actions.md](1-teoria/02-github-actions.md) | Workflows, triggers, jobs, steps, secrets, caché |
| [03-deployment-railway.md](1-teoria/03-deployment-railway.md) | Railway: servicio, PostgreSQL, env vars, logs |
| [04-monitoring-logging.md](1-teoria/04-monitoring-logging.md) | Logging estructurado, Logtail, health check |

### Prácticas (3 horas)

| Ejercicio | Descripción |
|-----------|-------------|
| [ejercicio-01-github-actions](2-practicas/ejercicio-01-github-actions/) | Pipeline CI con lint, tests y build en GitHub Actions |
| [ejercicio-02-deployment](2-practicas/ejercicio-02-deployment/) | Despliegue en Railway con PostgreSQL y variables de entorno |

---

## ⏱️ Distribución del Tiempo

| Actividad | Tiempo |
|-----------|--------|
| Teoría: CI/CD + GitHub Actions | 2 h |
| Ejercicio 01: Pipeline CI | 1.5 h |
| Ejercicio 02: Deployment | 1.5 h |
| Proyecto semanal | 3 h |
| **Total** | **8 h** |

---

## 📌 Entregables

1. **Pipeline CI funcional**: Repositorio con `.github/workflows/ci.yml` que pase en verde
2. **API desplegada**: URL pública en Railway/Render con `GET /health` respondiendo `200 OK`
3. **Variables de entorno configuradas**: Sin secretos hardcodeados
4. **Screenshot de deploy exitoso**: Log de GitHub Actions + URL de producción

---

## 🔗 Navegación

← [Semana 14 — Docker](../week-14-docker/README.md) | [Semana 16 — Proyecto Final](../week-16-proyecto_final/README.md) →
