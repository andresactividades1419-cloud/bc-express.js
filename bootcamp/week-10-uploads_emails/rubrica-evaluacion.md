# Rúbrica de Evaluación — Semana 10: File Uploads & Emails

## Distribución de Puntos

| Tipo de Evidencia | Porcentaje |
|-------------------|-----------|
| 🧠 Conocimiento   | 30%        |
| 💪 Desempeño      | 40%        |
| 📦 Producto       | 30%        |

---

## 🧠 Conocimiento (30%) — Evaluación Teórica

Cuestionario de 10 preguntas:

1. ¿Cuál es la diferencia entre `diskStorage` y `memoryStorage` en Multer?
2. ¿Por qué es importante validar el tipo MIME además de la extensión del archivo?
3. ¿Qué es un `public_id` en Cloudinary y para qué sirve?
4. ¿Qué hace `cloudinary.uploader.destroy()` y cuándo se debe llamar?
5. ¿Qué es un transporter en Nodemailer y cuáles son sus partes principales?
6. ¿Para qué sirve Ethereal en el contexto de testing de emails?
7. ¿Qué cabecera del `multipart/form-data` determina el tipo de contenido enviado?
8. ¿Qué problema de seguridad puede surgir si no se validan los MIME types de un upload?
9. ¿Cuál es la diferencia entre `req.file` y `req.files` en Multer?
10. ¿Por qué es recomendable usar `memoryStorage` al integrar con un servicio de cloud storage?

---

## 💪 Desempeño (40%)

### Ejercicio 01: File Uploads (20 puntos)

| Criterio | Puntos |
|----------|--------|
| Multer configurado con `memoryStorage` y límites correctos | 3 |
| Validación de MIME type implementada (`fileFilter`) | 4 |
| Upload a Cloudinary desde buffer con `upload_stream` | 5 |
| Endpoint `PUT /users/me/avatar` retorna URL de Cloudinary | 4 |
| Eliminación del avatar anterior antes de subir el nuevo | 4 |

### Ejercicio 02: Emails con Nodemailer (20 puntos)

| Criterio | Puntos |
|----------|--------|
| Transporter SMTP configurado con variables de entorno | 3 |
| Template HTML de bienvenida con nombre del usuario | 4 |
| Email de reset de contraseña con token temporal | 5 |
| `sendWelcomeEmail()` llamado desde el servicio de registro | 4 |
| Prueba de envío con Ethereal (preview URL en consola) | 4 |

---

## 📦 Producto (100 puntos)

### Proyecto Semanal: API con Uploads y Emails

| Criterio | Puntos |
|----------|--------|
| Upload de archivo principal del dominio (imagen de producto, portada, etc.) | 20 |
| Validación MIME y tamaño máximo correctamente configurados | 15 |
| Almacenamiento en Cloudinary con `public_id` persistido en BD | 15 |
| Email de bienvenida enviado al registrar usuario | 15 |
| Email de notificación al crear recurso principal del dominio | 15 |
| Manejo de errores: archivo inválido retorna 400 con mensaje claro | 10 |
| Variables de entorno para credenciales (Cloudinary + SMTP) en `.env.example` | 10 |

**Total: 100 puntos**

### Criterio Mínimo de Aprobación

- Mínimo **70 puntos** en el proyecto
- Al menos 1 upload funcional con archivo almacenado en Cloudinary
- Al menos 1 email transaccional enviado con Nodemailer
- Código adaptado al dominio asignado (no copiar la implementación de otro aprendiz)

---

## 📋 Criterios de Evaluación General

| Dimensión | Indicadores |
|-----------|-------------|
| **Funcionalidad** | ¿El upload funciona? ¿El email se envía? ¿Los errores se manejan correctamente? |
| **Seguridad** | ¿Se valida MIME type? ¿Hay límite de tamaño? ¿Las credenciales están en `.env`? |
| **Calidad de código** | ¿Sigue la arquitectura en capas? ¿Los servicios son responsabilidad única? |
| **Originalidad** | ¿La implementación es coherente con el dominio asignado? |
