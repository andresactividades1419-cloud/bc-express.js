# 🌐 Webgrafía — Semana 10: Uploads y Emails

Referencias de documentación oficial y artículos de calidad.

---

## Documentación Oficial

| Recurso | URL | Descripción |
|---------|-----|-------------|
| Multer (GitHub) | https://github.com/expressjs/multer | Repositorio oficial con documentación completa, opciones de `storage`, `fileFilter`, `limits` y ejemplos de uso. |
| Cloudinary Node.js SDK | https://cloudinary.com/documentation/node_integration | Guía de integración con Node.js: config, upload, delete, transformaciones. |
| Cloudinary Upload API | https://cloudinary.com/documentation/image_upload_api_reference | Referencia completa de parámetros de upload: `folder`, `public_id`, transformaciones en upload. |
| Nodemailer | https://nodemailer.com/about/ | Documentación oficial: transporter, SMTP, OAuth2, attachments, templates. |
| Ethereal Email | https://ethereal.email/ | SMTP fake para desarrollo. Integración con `nodemailer.createTestAccount()`. |
| Node.js crypto | https://nodejs.org/docs/latest/api/crypto.html | API nativa de criptografía. Usado para `randomBytes(32)` y hash SHA-256 de tokens. |
| Node.js Buffer | https://nodejs.org/docs/latest/api/buffer.html | Referencia del objeto Buffer. Clave para entender `memoryStorage`. |

---

## Seguridad

| Recurso | URL | Descripción |
|---------|-----|-------------|
| OWASP File Upload Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html | Guía completa sobre validación, restricción y almacenamiento seguro de archivos. |
| OWASP Forgot Password Cheat Sheet | https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html | Mejores prácticas para flujos de recuperación de contraseña: tokens seguros, expiración, anti-enumeration. |
| OWASP Input Validation | https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html | Validación de inputs incluyendo tipos de archivo. |

---

## Artículos Recomendados

| Recurso | URL | Descripción |
|---------|-----|-------------|
| Multer + Cloudinary integration | https://cloudinary.com/blog/node-js-express-upload-images-cloudinary | Artículo oficial de Cloudinary sobre integración con Multer y Express. |
| Understanding multipart/form-data | https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types | MDN sobre tipos MIME y multipart/form-data. |
| Email HTML Templates Best Practices | https://www.smashingmagazine.com/2017/01/introduction-building-sending-html-email-for-web-developers/ | Guía de Smashing Magazine sobre construcción de templates HTML para email. |

---

## Paquetes npm Utilizados

| Paquete | URL | Versión |
|---------|-----|---------|
| multer | https://www.npmjs.com/package/multer | 1.4.5-lts.2 |
| cloudinary | https://www.npmjs.com/package/cloudinary | 2.6.1 |
| nodemailer | https://www.npmjs.com/package/nodemailer | 6.10.1 |
| @types/multer | https://www.npmjs.com/package/@types/multer | 1.4.12 |
| @types/nodemailer | https://www.npmjs.com/package/@types/nodemailer | 6.4.17 |
