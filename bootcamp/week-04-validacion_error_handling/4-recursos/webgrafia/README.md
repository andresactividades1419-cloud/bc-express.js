# Webgrafía — Semana 04

## Validación, Errores y Logging en Node.js + Express

---

### Zod — Documentación Oficial
**URL**: https://zod.dev  
**Qué encontrarás**: API completa de Zod: primitivos, objetos, arrays, unions, transforms,
refinements, z.infer<>. La referencia más actualizada.

---

### Express — Error Handling Guide
**URL**: https://expressjs.com/en/guide/error-handling.html  
**Qué encontrarás**: Explicación oficial del middleware de errores con 4 parámetros, manejo de
errores síncronos y asíncronos, los helpers `createError`.

---

### Winston — README en GitHub
**URL**: https://github.com/winstonjs/winston  
**Qué encontrarás**: Configuración de `createLogger`, transports disponibles, custom formats,
log levels, profiling.

---

### Morgan — npmjs.com
**URL**: https://www.npmjs.com/package/morgan  
**Qué encontrarás**: Opciones de formato predefinidas (`dev`, `combined`, `tiny`), tokens
disponibles, opción `stream` para integrar con Winston.

---

### Node.js Best Practices — Error Handling
**URL**: https://github.com/goldbergyoni/nodebestpractices#2-error-handling-practices  
**Qué encontrarás**: 12 mejores prácticas de manejo de errores: operational vs programmer,
async errors, rejections no manejadas, reinicio de proceso.

---

### TypeScript — Narrowing con instanceof
**URL**: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing  
**Qué encontrarás**: Cómo TypeScript usa `instanceof` para narrowing de tipos en bloques
`if`/`catch`, relevante para distinguir `ZodError` de `AppError`.
