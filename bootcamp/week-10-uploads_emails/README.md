# Semana 10: File Uploads & Emails — Multer + Cloudinary + Nodemailer

## 🎯 Objetivos de Aprendizaje

Al finalizar esta semana, serás capaz de:

- ✅ Configurar Multer para recibir archivos en endpoints Express (single, array, fields)
- ✅ Validar tipo MIME y tamaño máximo de archivos en el middleware de upload
- ✅ Integrar Cloudinary para almacenar imágenes en la nube desde Node.js
- ✅ Eliminar archivos de Cloudinary usando su `public_id`
- ✅ Enviar emails transaccionales con Nodemailer + Gmail OAuth2 / SMTP
- ✅ Crear templates HTML reutilizables para emails (bienvenida, reset password)
- ✅ Gestionar correctamente archivos temporales y manejo de errores en uploads
- ✅ Aplicar patrones de seguridad: validación estricta de MIME types, límite de tamaño

## 📚 Requisitos Previos

- Semana 07 completada: JWT, bcrypt, autenticación con Bearer token
- Semana 08 completada: RBAC, middlewares de seguridad
- Semana 09 completada: Jest + Supertest (los tests de esta semana los usan como base)

## 🗂️ Estructura de la Semana

```
week-10-uploads_emails/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/
│   ├── 01-multer-pipeline.svg
│   ├── 02-cloudinary-flow.svg
│   └── 03-email-flow.svg
├── 1-teoria/
│   ├── 01-multer-configuracion.md
│   ├── 02-cloudinary-storage.md
│   ├── 03-nodemailer-emails.md
│   └── 04-seguridad-uploads.md
├── 2-practicas/
│   ├── ejercicio-01-file-uploads/
│   └── ejercicio-02-email-nodemailer/
├── 3-proyecto/
├── 4-recursos/
└── 5-glosario/
```

## 📝 Contenidos

### Teoría

| Archivo | Tema |
|---------|------|
| [01-multer-configuracion.md](1-teoria/01-multer-configuracion.md) | Instalación, `diskStorage`, `memoryStorage`, `single/array/fields` |
| [02-cloudinary-storage.md](1-teoria/02-cloudinary-storage.md) | SDK Cloudinary, upload desde buffer, `public_id`, delete, transformaciones |
| [03-nodemailer-emails.md](1-teoria/03-nodemailer-emails.md) | Transporter SMTP, templates HTML, emails transaccionales, Ethereal para testing |
| [04-seguridad-uploads.md](1-teoria/04-seguridad-uploads.md) | Validación MIME, límite de tamaño, path traversal, archivos temporales |

### Prácticas

| Ejercicio | Tema |
|-----------|------|
| [ejercicio-01-file-uploads](2-practicas/ejercicio-01-file-uploads/) | Upload de avatar con Multer + Cloudinary, validación MIME y tamaño |
| [ejercicio-02-email-nodemailer](2-practicas/ejercicio-02-email-nodemailer/) | Email de bienvenida y reset de contraseña con Nodemailer + templates HTML |

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|--------|
| Teoría: Multer + Cloudinary (01-02) | 2h |
| Ejercicio 01: File uploads | 2h |
| Teoría: Nodemailer + seguridad (03-04) | 1h |
| Ejercicio 02: Emails transaccionales | 2h |
| Proyecto semanal | 1h |

## 📌 Entregables

1. **Ejercicio 01**: Endpoint `PUT /users/me/avatar` funcional con upload a Cloudinary, validación MIME/tamaño
2. **Ejercicio 02**: Sistema de emails con template de bienvenida y reset de contraseña
3. **Proyecto**: API de tu dominio con upload de archivos y notificaciones por email integradas

## 🔗 Navegación

← [Semana 09: Testing](../week-09-testing/README.md) | [Semana 11: WebSockets](../week-11-websockets/README.md) →
