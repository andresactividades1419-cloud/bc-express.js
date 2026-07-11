# 🔒 Política de Seguridad

## Alcance

Este repositorio es material didáctico (Bootcamp Express.js — ergrato-dev). No aloja
servicios en producción ni procesa datos reales de usuarios. Los `starter/` y
proyectos de cada semana son entornos de aprendizaje: **nunca** deben usarse con
datos personales reales, credenciales reales, ni desplegarse con datos sensibles.

## Reportar una vulnerabilidad

Si encuentras una vulnerabilidad en el código de este bootcamp (por ejemplo, un
patrón inseguro presentado como "buena práctica", una dependencia con un CVE
conocido, o un secreto expuesto por error en el historial de git):

1. **No abras un issue público** si la vulnerabilidad es explotable de forma
   directa contra terceros (poco probable dado el alcance de este repo, pero
   aplica el mismo cuidado).
2. Repórtalo por email a **elparcheti@gmail.com** con el asunto
   `[SECURITY] bc-expressjs: <resumen>`.
3. Incluye: archivo/semana afectada, descripción del problema, y si es posible,
   una sugerencia de corrección.

Se responde en un plazo razonable (no hay SLA formal, es un proyecto educativo
mantenido por una sola persona). Correcciones se publican como commits
`fix(security): ...` referenciando la semana afectada.

## Política de versiones de dependencias

Todas las dependencias en cada `package.json` se mantienen **pineadas a versión
exacta** (sin `^`, `~` ni rangos) — ver
[`docs/politica-versiones-dependencias.md`](docs/politica-versiones-dependencias.md).
Esto evita que una actualización silenciosa introduzca una versión con una
vulnerabilidad conocida sin que se audite antes.

## Fuera de alcance

- Vulnerabilidades en dependencias de terceros (Express, Prisma, etc.) — repórtalas
  directamente al proyecto correspondiente.
- Vulnerabilidades introducidas intencionalmente como ejercicio pedagógico (por
  ejemplo, código "antes" de aplicar una corrección de seguridad en la semana 08).
