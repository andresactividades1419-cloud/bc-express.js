# Glosario — Semana 15: CI/CD y Deployment

Términos clave ordenados alfabéticamente.

---

## A

**Artifact (Artefacto)**
Resultado de una build: imagen Docker, binario compilado o archivo `.zip`. Un artefacto inmutable garantiza que lo probado es exactamente lo que se despliega.

**Action (Acción)**
Unidad reutilizable en GitHub Actions. Puede ser del marketplace (ej: `actions/checkout@v4`) o definida localmente en `.github/actions/`.

---

## B

**Badge de CI**
Imagen SVG que muestra el estado del último pipeline. Se incluye en el README del repositorio. Sintaxis: `![CI](https://github.com/ORG/REPO/actions/workflows/ci.yml/badge.svg)`.

**Branch protection rule**
Regla en GitHub que requiere que los checks de CI pasen antes de permitir merge a `main`. Evita que código roto llegue a producción.

---

## C

**CD — Continuous Delivery / Deployment**
Práctica de mantener el código en un estado siempre desplegable (Delivery) o de desplegar automáticamente cada cambio que pasa CI (Deployment).

**CI — Continuous Integration**
Práctica de integrar cambios de código frecuentemente, verificando con tests automáticos en cada push o PR.

**Cache (caché)**
En GitHub Actions, almacena `node_modules` o el store de pnpm entre runs para acelerar las builds (~70% menos tiempo de install).

---

## D

**Deploy**
Proceso de poner una versión del software en ejecución en un servidor o plataforma. Railway y Render automatizan este proceso tras cada push a `main`.

**Dockerfile**
Archivo de instrucciones para construir una imagen Docker. En CI/CD se usa como base del artefacto inmutable que se despliega.

---

## E

**Entorno (Environment)**
Conjunto de variables de configuración que cambian entre desarrollo, staging y producción. Nunca se hardcodean: van en el panel de la plataforma.

---

## F

**`--frozen-lockfile`**
Flag de `pnpm install` equivalente a `npm ci`. Usa exactamente las versiones del lockfile sin actualizarlas. Garantiza builds reproducibles en CI.

---

## G

**GitHub Actions**
Plataforma de CI/CD integrada en GitHub. Los workflows se definen en `.github/workflows/*.yml` como YAML.

**GitHub Secrets**
Variables cifradas almacenadas en `Settings → Secrets → Actions`. Se referencian como `${{ secrets.NOMBRE }}` en workflows. Nunca se imprimen en logs.

---

## H

**Health check**
Endpoint (`GET /health`) que verifica que la aplicación está viva y sus dependencias (DB, cache) responden. PaaS como Railway lo usa para detectar deploys fallidos y hacer rollback.

---

## I

**`if:` (condicional)**
Expresión en un job o step de GitHub Actions que controla si se ejecuta. Ejemplo: `if: github.ref == 'refs/heads/main'` para deploys solo en main.

**Imagen inmutable**
Imagen Docker que no cambia después de su construcción. Si los tests pasan en esa imagen, es exactamente la misma que va a producción.

---

## J

**Job**
Conjunto de steps que corren en un runner. Los jobs son independientes por defecto; se ordenan con `needs:`.

---

## L

**Logtail / BetterStack**
Servicio de log management. Recibe logs estructurados (JSON) de Winston vía `LOGTAIL_SOURCE_TOKEN` y los centraliza en un dashboard con búsqueda y alertas.

---

## M

**Morgan**
Middleware Express de HTTP logging. Se conecta a Winston pasando `stream: { write }` para centralizar todos los logs.

---

## N

**`needs:`**
Array de dependencias entre jobs en GitHub Actions. `needs: [test]` hace que el job `deploy` solo corra si `test` pasa.

---

## P

**PaaS — Platform as a Service**
Plataforma que abstrae la infraestructura (servidores, networking, DB). Railway y Render son PaaS: el desarrollador solo sube el código.

**Pipeline**
Secuencia de etapas automáticas: código → CI → build → deploy → verificación. Si una etapa falla, las siguientes no se ejecutan.

---

## R

**Railway**
PaaS que auto-detecta Dockerfile, provee PostgreSQL y gestiona variables de entorno. Ofrece deploy automático en cada push.

**Render**
Alternativa a Railway con soporte para `render.yaml` como IaC. Tiene tier gratuito para proyectos de aprendizaje.

**Runner**
Máquina virtual efímera donde corre un job de GitHub Actions. `ubuntu-latest` es el más común para Node.js.

**Rollback**
Proceso de volver a una versión anterior estable. En Railway: dashboard → Deployments → seleccionar deploy anterior → Rollback.

---

## S

**Secret**
Variable sensible (tokens, contraseñas) almacenada cifrada en la plataforma. Nunca en el código ni en `.env` commiteados.

**Step**
Unidad mínima de trabajo en un job. Puede ser una acción (`uses:`) o un comando shell (`run:`).

---

## T

**Trigger**
Evento que inicia un workflow. Los más comunes: `push` a una rama, `pull_request`, `workflow_dispatch` (manual), `schedule` (cron).

**Trunk-based Development**
Estrategia de branching donde todos los desarrolladores integran frecuentemente a `main`. Facilita CI porque hay menos divergencia.

---

## W

**Winston**
Librería de logging para Node.js. Soporta múltiples transports (consola, archivo, Logtail) y formatos estructurados (JSON).

**Workflow**
Archivo YAML en `.github/workflows/` que define el pipeline completo: triggers, jobs y steps.
