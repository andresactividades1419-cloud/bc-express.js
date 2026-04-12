# Glosario — Semana 10: Uploads y Emails

Términos técnicos clave ordenados alfabéticamente.

---

## B

### Buffer
Objeto de Node.js que representa datos binarios crudos en memoria. Cuando Multer usa `memoryStorage`, el archivo queda disponible en `req.file.buffer` como un Buffer. Se pasa directamente al stream de Cloudinary sin escribir en disco.

---

## C

### Cloudinary
Plataforma CDN para almacenamiento y transformación de imágenes y vídeos. Devuelve una URL pública `secure_url` y un identificador `public_id` para cada archivo subido.

### `cloudinary.uploader.upload_stream()`
Método de la SDK de Cloudinary (v2) que recibe un stream de datos en lugar de una ruta de archivo. Se envuelve en una `Promise` para usarlo de forma asíncrona:
```ts
const stream = cloudinary.uploader.upload_stream(options, cb);
stream.end(buffer);
```

---

## D

### `diskStorage`
Estrategia de almacenamiento de Multer que guarda los archivos en el disco duro del servidor. Útil cuando se procesa el archivo localmente. No recomendable para subidas a servicios cloud (preferir `memoryStorage`).

---

## E

### Email template
Función que retorna HTML de un correo electrónico. Permite construir mensajes dinámicos con el nombre del usuario, URLs de acción, etc. Separar los templates de la lógica de envío mejora la mantenibilidad.

### Ethereal Email
Servicio SMTP falso para desarrollo. Captura todos los correos salientes y proporciona una URL de vista previa (`nodemailer.getTestMessageUrl(info)`) sin enviar nada al destinatario real.

---

## F

### `fileFilter`
Función de Multer que se ejecuta para cada archivo antes de guardarlo. Recibe el objeto `file` con `mimetype` y llama a `cb(null, true)` para aceptar o `cb(error)` para rechazar.

### Fire-and-forget
Patrón en el que se lanza una operación asíncrona sin esperar su resultado. Se usa para enviar correos de bienvenida desde `register()` sin bloquear la respuesta HTTP:
```ts
sendWelcomeEmail(email, name).catch(err => console.error(err));
```

---

## M

### `memoryStorage`
Estrategia de almacenamiento de Multer que guarda el archivo en RAM como un `Buffer`. Es la opción correcta cuando se va a subir el archivo a un servicio cloud (Cloudinary, S3).

### MIME type
Identificador estándar del tipo de contenido de un archivo: `image/jpeg`, `image/png`, `image/webp`, etc. Es más seguro validar el MIME type que la extensión del filename, ya que la extensión puede ser falsificada.

### Multer
Middleware de Express para procesar solicitudes `multipart/form-data`. Pone los archivos en `req.file` (campo único) o `req.files` (múltiples campos). Nunca llamar `multer()` como middleware global — usar solo en las rutas que necesiten carga de archivos.

### `MulterError`
Clase de error lanzada por Multer cuando se violan sus límites. Códigos frecuentes:
- `LIMIT_FILE_SIZE`: archivo supera el `limits.fileSize`
- `LIMIT_FILE_COUNT`: más archivos de los permitidos
- `LIMIT_UNEXPECTED_FILE`: campo de archivo no esperado

### `multipart/form-data`
Tipo de `Content-Type` del request HTTP usado para enviar archivos binarios junto con campos de texto. Requiere un parser específico (Multer) ya que Express no lo procesa de forma nativa.

---

## N

### Nodemailer
Librería de Node.js para enviar correos electrónicos mediante SMTP o servicios de terceros. Se configura con un `transporter` que representa la conexión al servidor de correo.

---

## P

### Path traversal
Ataque donde un usuario malintencionado manipula el nombre del archivo para acceder a rutas no permitidas (ej. `../../etc/passwd`). Se previene usando `crypto.randomBytes` para generar el nombre del archivo en lugar de usar `file.originalname`.

### `public_id`
Identificador único de un recurso en Cloudinary. Incluye la carpeta (ej. `bootcamp/avatars/user-abc123`). Se almacena en base de datos para poder eliminar el recurso con `uploader.destroy(publicId)`.

---

## R

### Reset token
Token aleatorio generado con `crypto.randomBytes(32)` para restablecer la contraseña. Se envía al usuario por email como parámetro de URL. En base de datos se guarda su hash SHA-256 (nunca el token en claro) junto a su fecha de expiración.

---

## S

### `secure_url`
URL HTTPS del recurso subido a Cloudinary. Es la URL que se almacena en base de datos y se devuelve en las respuestas de la API.

### SMTP
Protocolo de transferencia de correo. Nodemailer se conecta a un servidor SMTP (Gmail, SendGrid, Ethereal…) con host, port, auth credentials para enviar correos.

---

## T

### Transporter
Objeto de Nodemailer que encapsula la conexión al servidor SMTP. Se crea con `nodemailer.createTransport(config)` y se reutiliza como singleton para evitar crear una conexión nueva en cada correo.

---

## U

### `upload_stream`
Ver `cloudinary.uploader.upload_stream()`.

### User enumeration
Vulnerabilidad en la que la API revela si un correo está registrado o no a través de mensajes de error distintos. Se previene devolviendo siempre la misma respuesta genérica en `POST /forgot-password`, independientemente de si el usuario existe.
