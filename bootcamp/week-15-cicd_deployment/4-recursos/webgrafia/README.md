# Webgrafía — Semana 15: CI/CD y Deployment

Documentación oficial y artículos de referencia.

---

## GitHub Actions

| Recurso | URL | Descripción |
|---------|-----|-------------|
| Documentación oficial | https://docs.github.com/en/actions | Referencia completa de GitHub Actions |
| Workflow syntax | https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions | Todas las keywords del YAML |
| Marketplace de Actions | https://github.com/marketplace?type=actions | Acciones oficiales y de la comunidad |
| `actions/checkout` | https://github.com/actions/checkout | Action para checkout en runners |
| `actions/setup-node` | https://github.com/actions/setup-node | Setup de Node.js con cache |
| `pnpm/action-setup` | https://github.com/pnpm/action-setup | Action oficial de pnpm |

---

## Deployment

| Recurso | URL | Descripción |
|---------|-----|-------------|
| Railway Docs | https://docs.railway.app | Documentación completa de Railway |
| Render Docs | https://render.com/docs | Documentación de Render |
| Railway CLI | https://docs.railway.app/guides/cli | Referencia del CLI de Railway |
| `railway.json` schema | https://railway.app/railway.schema.json | Schema del archivo de configuración |
| `render.yaml` docs | https://render.com/docs/infrastructure-as-code | IaC en Render |

---

## Logging y Monitoreo

| Recurso | URL | Descripción |
|---------|-----|-------------|
| BetterStack / Logtail | https://betterstack.com/docs/logs | Documentación de Logtail |
| Package `@logtail/winston` | https://www.npmjs.com/package/@logtail/winston | Integración con Winston |
| Winston docs | https://github.com/winstonjs/winston | README oficial de Winston |
| Morgan docs | https://github.com/expressjs/morgan | Middleware HTTP logger |

---

## Artículos de referencia

| Artículo | URL | Descripción |
|----------|-----|-------------|
| CI/CD Best Practices | https://docs.github.com/en/actions/use-cases-and-examples/deploying | Guías de deploy con GitHub Actions |
| Docker + CI/CD | https://docs.docker.com/build/ci/ | Docker en pipelines de CI/CD |
| 12-factor App | https://12factor.net | Principios para apps cloud-native |
| Health Check Pattern | https://microservices.io/patterns/observability/health-check-api.html | Patrón de health check en microservicios |
| OWASP CI/CD Security | https://owasp.org/www-project-top-10-ci-cd-security-risks | Top 10 de riesgos de seguridad en CI/CD |

---

## Herramientas adicionales

| Herramienta | URL | Uso |
|-------------|-----|-----|
| act (local GitHub Actions) | https://github.com/nektos/act | Ejecutar workflows localmente |
| Actionlint | https://github.com/rhysd/actionlint | Linter estático para workflows |
| Dependabot | https://docs.github.com/en/code-security/dependabot | Actualizar actions automáticamente |
