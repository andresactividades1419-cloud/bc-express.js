# 🚀 Proyecto Semanal: API con Uploads y Emails

## 🎯 Objetivo

Integrar Multer + Cloudinary para uploads de archivos y Nodemailer para emails transaccionales en la API de tu dominio asignado. El proyecto consolida los conceptos de los ejercicios 01 y 02 aplicándolos a un sistema CRUD completo.

## 📋 Tu Dominio Asignado

**Dominio**: El instructor te ha asignado tu dominio único.

## 🔧 Stack del Proyecto

- Express 5 + TypeScript + Mongoose + MongoDB
- Multer (memoryStorage) + Cloudinary (upload de imágenes)
- Nodemailer + Ethereal (emails transaccionales)
- JWT + bcrypt (autenticación)

## ✅ Requisitos Funcionales (Adaptables a tu dominio)

### Uploads
1. Endpoint para subir imagen del recurso principal del dominio
   - `PUT /items/:id/image` (imagen de libro, medicamento, producto, etc.)
   - Validación MIME: solo JPEG, PNG, WebP
   - Límite de tamaño: 5 MB
   - Almacenamiento en Cloudinary con `public_id` en BD
   - Eliminar imagen anterior antes de subir la nueva

2. Upload de avatar de usuario
   - `PUT /users/me/avatar`
   - Mismas validaciones que el recurso principal

### Emails
3. Email de bienvenida al registrar usuario (fire-and-forget)
4. Email de notificación al crear el recurso principal del dominio
   - Ejemplo: "Tu libro fue agregado al catálogo", "Cita confirmada"
5. Endpoint de reset de contraseña con token temporal

## 💡 Ejemplos de Adaptación por Dominio

| Dominio | Upload principal | Email de notificación |
|---------|-----------------|----------------------|
| Biblioteca | Portada del libro | "Libro disponible para préstamo" |
| Farmacia | Imagen del medicamento | "Medicamento en stock bajo" |
| Gimnasio | Foto de la clase/rutina | "Inscripción confirmada" |
| Restaurante | Foto del platillo | "Pedido recibido" |
| Hospital | Imagen del doctor (opcional) | "Cita agendada el [fecha]" |
| Cine | Poster de la película | "Reserva confirmada" |

## 📁 Estructura del Starter

```
3-proyecto/starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts
    ├── server.ts
    ├── config/
    │   ├── env.ts
    │   ├── cloudinary.ts
    │   └── email.ts
    ├── errors/
    │   └── AppError.ts
    ├── models/
    │   ├── user.model.ts
    │   └── item.model.ts          ← adaptar a tu dominio
    ├── repositories/
    │   ├── users.repository.ts
    │   └── items.repository.ts
    ├── middlewares/
    │   ├── auth.middleware.ts
    │   ├── error.middleware.ts
    │   └── upload.middleware.ts
    ├── utils/
    │   ├── jwt.ts
    │   └── email-templates.ts
    ├── services/
    │   ├── auth.service.ts
    │   ├── upload.service.ts
    │   ├── email.service.ts
    │   └── items.service.ts       ← adaptar a tu dominio
    ├── validators/
    │   ├── auth.schema.ts
    │   └── items.schema.ts
    ├── controllers/
    │   ├── auth.controller.ts
    │   ├── users.controller.ts
    │   └── items.controller.ts    ← adaptar a tu dominio
    └── routes/
        ├── auth.routes.ts
        ├── users.routes.ts
        └── items.routes.ts
```

## 🛠️ Entregables

1. **API funcional** con Thunder Client / Postman screenshots:
   - Upload de imagen del recurso principal → URL de Cloudinary
   - Upload de avatar de usuario → URL de Cloudinary
   - Email de bienvenida → preview URL de Ethereal en consola
   - Email de notificación del dominio → preview URL en consola
   - Reset de contraseña → email con enlace válido

2. **Código adaptado** al dominio asignado:
   - Modelos con campos coherentes con el dominio
   - Nombres de endpoints descriptivos (`/books/:id/cover`, `/meds/:id/photo`, etc.)
   - Templates de email personalizados para el dominio

3. **README** del proyecto con:
   - Descripción del dominio implementado
   - Lista de endpoints con ejemplos de request/response
   - Instrucciones de configuración (`.env`)

## 📊 Criterios de Evaluación

| Criterio | Puntos |
|----------|--------|
| Upload de imagen del recurso principal con Cloudinary | 20 |
| Validación MIME type y tamaño correctamente configurados | 15 |
| `public_id` persistido y eliminación de imagen anterior | 15 |
| Email de bienvenida con Nodemailer + Ethereal | 15 |
| Email de notificación del dominio | 15 |
| Reset de contraseña funcional (token + email) | 10 |
| Variables de entorno en `.env.example`, sin secretos en código | 10 |
| **Total** | **100** |
