# 🌐 Webgrafía — Semana 06: MongoDB + Mongoose

Enlaces a documentación oficial, artículos y herramientas de referencia para la semana.

---

## Documentación Oficial

### Mongoose — Documentación Completa
- **URL**: https://mongoosejs.com/docs/
- **Descripción**: Referencia principal para todo el trabajo con Mongoose. Consultar siempre ante cualquier duda sobre Schemas, Queries, Populate, Middleware o TypeScript.

### MongoDB Manual
- **URL**: https://www.mongodb.com/docs/manual/
- **Descripción**: Documentación oficial de MongoDB. Cubre el modelo de documentos, operadores de consulta (`$regex`, `$gte`, `$in`, `$or`), indexación y el aggregation pipeline.

### Mongoose — Populate
- **URL**: https://mongoosejs.com/docs/populate.html
- **Descripción**: Guía detallada de `populate()`: populate simple, múltiple, anidado, selectivo y virtualizado. Indispensable para el Ejercicio 02 y el Proyecto.

### Mongoose — Validation
- **URL**: https://mongoosejs.com/docs/validation.html
- **Descripción**: Todos los validators de Mongoose: `required`, `min`/`max`, `minlength`/`maxlength`, `enum`, `match`, validators personalizados y cuándo se ejecutan.

### Mongoose — TypeScript Support
- **URL**: https://mongoosejs.com/docs/typescript.html
- **Descripción**: Integración oficial de Mongoose con TypeScript. Explica el uso de genéricos en `Schema<IDocument>` y `model<IDocument>()`, y tipado de documentos hidratados vs planos.

### Mongoose — Middleware (Hooks)
- **URL**: https://mongoosejs.com/docs/middleware.html
- **Descripción**: Pre y post hooks para document, query y aggregate middleware. Casos de uso: hashing de contraseñas, auditoría, soft-delete.

---

## Docker + MongoDB

### Docker Hub — Imagen oficial `mongo`
- **URL**: https://hub.docker.com/_/mongo
- **Descripción**: Variables de entorno (`MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`, `MONGO_INITDB_DATABASE`), volúmenes y scripts de inicialización para la imagen oficial de MongoDB en Docker.

---

## MongoDB Atlas (Cloud gratuito)

### MongoDB Atlas — Free Tier (M0)
- **URL**: https://www.mongodb.com/atlas/database
- **Descripción**: Versión en la nube de MongoDB con tier gratuito permanente (512 MB). Útil para desplegar el proyecto en producción sin gestionar infraestructura. Alternativa al Docker local para el proyecto final.

---

## Artículos Técnicos

### MongoDB vs SQL — Comparación de conceptos
- **URL**: https://www.mongodb.com/docs/manual/reference/sql-comparison/
- **Descripción**: Tabla de equivalencias oficial entre SQL y MongoDB: `TABLE → Collection`, `ROW → Document`, `JOIN → $lookup`, `SELECT → find()`. Útil para desarrolladores con background relacional.

### Mongoose — Error Handling (MongoServerError)
- **URL**: https://mongoosejs.com/docs/api/error.html
- **Descripción**: Referencia de errores de Mongoose: `ValidationError`, `CastError`, `MongoServerError` (código 11000). Esencial para implementar manejo correcto de errores en repositorios.

### Node.js Driver — MongoServerError
- **URL**: https://www.mongodb.com/docs/drivers/node/current/
- **Descripción**: Documentación del driver oficial de Node.js para MongoDB (que Mongoose usa internamente). Relevante para entender `MongoServerError` y el código de error `11000`.

---

## Herramientas

### MongoDB Compass (GUI)
- **URL**: https://www.mongodb.com/products/tools/compass
- **Descripción**: Cliente gráfico oficial para explorar colecciones, documentos e índices. Alternativa visual a `mongosh`. Disponible para Linux, macOS y Windows.

### mongosh — Shell oficial de MongoDB
- **URL**: https://www.mongodb.com/docs/mongodb-shell/
- **Descripción**: Shell interactivo moderno para administrar MongoDB desde la terminal. Reemplaza al antiguo cliente `mongo`. Incluido en la imagen Docker `mongo:7`.
