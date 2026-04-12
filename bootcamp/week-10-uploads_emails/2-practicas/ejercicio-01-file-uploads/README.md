# Ejercicio 01: File Uploads con Multer + Cloudinary

## 🎯 Objetivo

Implementar un endpoint `PUT /users/me/avatar` que reciba una imagen, la valide con Multer y la almacene en Cloudinary. Al terminar, el usuario tendrá su `avatarUrl` y `avatarPublicId` actualizados en la base de datos.

## 📚 Requisitos Previos

- Teoría [01-multer-configuracion.md](../../1-teoria/01-multer-configuracion.md) completada
- Teoría [02-cloudinary-storage.md](../../1-teoria/02-cloudinary-storage.md) completada
- Cuenta gratuita en [cloudinary.com](https://cloudinary.com) (Cloud name, API key, API secret)

## 📁 Estructura del Starter

```
ejercicio-01-file-uploads/starter/
├── package.json
├── tsconfig.json
├── .env.example
└── src/
    ├── app.ts              ← DADO (ya configurado)
    ├── server.ts           ← DADO
    ├── config/
    │   ├── env.ts          ← DADO
    │   └── cloudinary.ts   ← PASO 1: configurar el SDK
    ├── errors/
    │   └── AppError.ts     ← DADO
    ├── types/
    │   └── index.ts        ← DADO
    ├── models/
    │   └── user.model.ts   ← DADO
    ├── middlewares/
    │   ├── auth.middleware.ts      ← DADO
    │   ├── error.middleware.ts     ← DADO
    │   └── upload.middleware.ts    ← PASO 2: configurar Multer
    ├── services/
    │   └── upload.service.ts      ← PASO 3: uploadToCloudinary
    ├── controllers/
    │   └── users.controller.ts    ← PASO 4: updateAvatar
    └── routes/
        └── users.routes.ts        ← PASO 5: registrar la ruta
```

## 📋 Pasos del Ejercicio

---

### PASO 1: Configurar el SDK de Cloudinary

El SDK de Cloudinary necesita tus credenciales de la nube para poder hacer upload.

```ts
// Configuración básica del SDK:
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});
```

**Abre `starter/src/config/cloudinary.ts`** y descomenta la sección de configuración.

---

### PASO 2: Configurar el middleware de Multer

Multer necesita saber cómo almacenar el archivo y qué archivos aceptar.

```ts
// Multer con memoryStorage y validación de MIME:
const uploadAvatar = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);
    allowed.has(file.mimetype) ? cb(null, true) : cb(new Error('MIME no permitido'));
  },
});
```

**Abre `starter/src/middlewares/upload.middleware.ts`** y descomenta la configuración de Multer.

---

### PASO 3: Implementar el servicio de upload

El servicio recibe el `Buffer` de Multer y lo envía a Cloudinary usando `upload_stream`.

```ts
// upload_stream pattern:
const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
  if (error) { reject(error); return; }
  resolve({ url: result!.secure_url, publicId: result!.public_id });
});
stream.end(buffer);
```

**Abre `starter/src/services/upload.service.ts`** y descomenta las funciones `uploadToCloudinary` y `deleteFromCloudinary`.

---

### PASO 4: Controller updateAvatar

El controller recibe `req.file` de Multer, llama al service y retorna la nueva URL.

```ts
// Flujo del controller:
// 1. Verificar que req.file existe (400 si no)
// 2. Llamar a usersService.updateAvatar(req.user.id, req.file)
// 3. Retornar 200 con { avatarUrl }
```

**Abre `starter/src/controllers/users.controller.ts`** y descomenta la función `updateAvatar`.

---

### PASO 5: Registrar la ruta

Conectar el middleware de Multer con el controller en el router de usuarios.

```ts
// La ruta completa usa dos middlewares:
// 1. authenticate — verifica el JWT
// 2. uploadAvatar.single('avatar') — procesa el archivo
// 3. usersController.updateAvatar — sube a Cloudinary y actualiza BD
router.put('/me/avatar', authenticate, uploadAvatar.single('avatar'), updateAvatar);
```

**Abre `starter/src/routes/users.routes.ts`** y descomenta la definición de la ruta.

---

## ✅ Verificación

Prueba el endpoint con Thunder Client o Postman:

1. **Registrar un usuario**: `POST /api/v1/auth/register` y guardar el `accessToken`
2. **Subir avatar**: `PUT /api/v1/users/me/avatar`
   - Header: `Authorization: Bearer <accessToken>`
   - Body: `form-data` → clave `avatar`, tipo `File`, seleccionar una imagen JPG/PNG
3. **Resultado esperado**: `200 { "avatarUrl": "https://res.cloudinary.com/..." }`
4. **Volver a subir**: El avatar anterior debe eliminarse de Cloudinary antes de subir el nuevo

### Casos de error a probar

| Request | Esperado |
|---------|---------|
| Sin archivo | `400 Se requiere una imagen` |
| Archivo PDF | `400 Solo se permiten imágenes JPEG, PNG o WebP` |
| Archivo > 5 MB | `400 Archivo demasiado grande. Máximo 5 MB.` |
| Sin token JWT | `401 No autorizado` |
