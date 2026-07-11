# 📌 Política de versiones de dependencias

## Regla

**PROHIBIDO** usar `^`, `~`, `>=` o cualquier rango de versión en cualquier
`package.json` de este repo (raíz o cualquier `starter/`). Toda dependencia se
declara con su versión exacta.

```jsonc
// ❌ Mal
"zod": "^4.3.6"

// ✅ Bien
"zod": "4.3.6"
```

## Por qué

Un rango de versión permite que `pnpm install` resuelva una versión distinta a
la que el instructor probó, en cualquier momento y sin aviso — incluida una
versión con un CVE conocido publicado después de que el contenido de la semana
se escribió. Pinear exacto convierte cada actualización de dependencia en un
cambio explícito y auditable (`chore(deps): bump <paquete> X→Y`), no en algo que
ocurre solo porque un estudiante instaló el proyecto un mes después que otro.

Esta política es consistente con la usada en otros repos `bc-*` de
ergrato-dev (ver `bc-react/docs/politica-versiones-dependencias.md`).

## Enforcement

- Todo PR que agregue o modifique una dependencia debe usar versión exacta.
- `packageManager` en cada `package.json` fija además la versión de pnpm
  (`pnpm@10.34.5`) — con Corepack habilitado, esto bloquea `npm`/`yarn` y
  cualquier versión distinta de pnpm por accidente.
- `engines.node` (`>=22.0.0`) documenta el runtime mínimo soportado; no es
  enforcement duro (pnpm no bloquea la instalación por esto), pero es la señal
  visible en el `package.json` para quien no leyó el README.

## Procedimiento para actualizar una dependencia

1. Verifica la versión nueva no tiene un CVE conocido (`pnpm audit` o
   [GitHub Advisory Database](https://github.com/advisories)).
2. Si la dependencia se repite en varias semanas (ej. `zod`, `prisma`,
   `typescript`), actualízala en **todas** a la misma versión exacta — no dejes
   semanas en versiones distintas de la misma dependencia mayor.
3. Instala y corre `tsc --noEmit` (y los tests, si el `starter/` los tiene) en
   al menos un proyecto representativo antes de comitear, para detectar breaking
   changes de la nueva versión.
4. Commit: `chore(deps): bump <paquete> X.Y.Z → A.B.C [+ semanas afectadas]`.

## Historial de auditoría

**2026-07-11** — Auditoría de actualidad y CVEs de `bc-expressjs` (16 semanas):

- `zod`: homogenizado a `4.3.6` en las 37 semanas que lo usan (antes: mezcla de
  `3.24.2` en 22 archivos y `4.3.6` en 15 — inconsistencia entre semanas 04-08 y
  el resto, sin CVE involucrado, pero riesgo de fricción de API entre bloques).
- `prisma` / `@prisma/client`: homogenizado a `6.8.2` en las 5 semanas que lo
  usan (antes: mezcla de `6.6.0`/`6.7.0`/`6.8.2`/`7.7.0`). La semana 05
  declaraba `prisma@7.7.0` en `package.json` pero su `schema.prisma` y sus
  imports (`@prisma/client`, generador `prisma-client-js`) seguían siendo
  código de Prisma 6 — el número de versión no coincidía con el código real.
  Verificado con `pnpm install` + `prisma generate` + `tsc --noEmit` tras el
  cambio: instala y compila limpio.
- `typescript`: homogenizado a `5.8.3` (antes: mezcla `5.8.2`/`5.8.3`, diferencia
  de patch sin impacto funcional).
- Se agregó `packageManager` (`pnpm@10.34.5`) y `engines.node` (`>=22.0.0`) a
  los 46 `package.json` del repo — no existían antes, README exigía estos
  requisitos sin forma de hacerlos cumplir a nivel de proyecto.
- No se encontraron rangos (`^`/`~`) en ningún `package.json` — el repo ya
  pineaba versión exacta antes de esta auditoría; el problema era falta de
  homogeneidad entre semanas, no uso de rangos.
