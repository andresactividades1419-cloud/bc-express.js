# Multer: File Uploads en Express

## 🎯 Objetivos

- Instalar y configurar Multer en un proyecto Express + TypeScript
- Distinguir entre `diskStorage` y `memoryStorage` y saber cuándo usar cada uno
- Manejar upload de uno o múltiples archivos con `single`, `array` y `fields`
- Implementar `fileFilter` para validar tipos de archivo antes de procesarlos

## 📋 ¿Qué es Multer?

Multer es el middleware estándar de Node.js para manejar `multipart/form-data`,
que es el encoding usado cuando los formularios HTML envían archivos.

Sin Multer, Express no puede parsear archivos adjuntos — solo maneja JSON y URL-encoded.

```
Cliente  →  POST /upload  multipart/form-data  →  Multer  →  req.file  →  Controller
```

## 1. Instalación

```bash
pnpm add multer@1.4.5-lts.2
pnpm add -D @types/multer@1.4.12
```

> Multer 1.4.5-lts.2 es la versión LTS estable para Express 5 + Node.js 22.

## 2. Storage: diskStorage vs memoryStorage

### diskStorage — guardar directamente en disco

```ts
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  // Define dónde guardar cada archivo
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // Define el nombre del archivo en disco
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});
```

**Cuándo usar diskStorage:**
- Archivos grandes que no caben en memoria
- Procesamiento posterior (transcoding de video, etc.)
- Cuando el servidor tiene almacenamiento local persistente

### memoryStorage — guardar en buffer de memoria

```ts
const storage = multer.memoryStorage();
```

`req.file.buffer` contiene los bytes del archivo.

**Cuándo usar memoryStorage:**
- ✅ Integración con cloud storage (Cloudinary, S3, GCS)
- ✅ Archivos pequeños (imágenes, documentos)
- ✅ Evita escribir archivos temporales en disco

> **Regla práctica**: Si vas a subir a la nube, usa `memoryStorage`. Si vas a guardar en disco del servidor, usa `diskStorage`.

## 3. fileFilter: validar tipo de archivo

```ts
import { Request } from 'express';

// Solo permite imágenes JPEG y PNG
const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Validar por MIME type (más seguro que validar por extensión)
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);   // Aceptar el archivo
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan: JPEG, PNG, WebP'));
  }
};
```

> ⚠️ **Seguridad**: Siempre validar por MIME type, nunca solo por extensión. Un atacante puede renombrar `malware.exe` a `photo.jpg`. Ver [04-seguridad-uploads.md](./04-seguridad-uploads.md).

## 4. Configuración completa del upload

```ts
// src/config/upload.ts
import multer from 'multer';

export const uploadAvatar = multer({
  storage: multer.memoryStorage(),

  // Límite de tamaño: 5 MB
  limits: {
    fileSize: 5 * 1024 * 1024,  // 5 MB en bytes
  },

  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes JPEG, PNG o WebP'));
    }
  },
});
```

## 5. Middleware en rutas: single, array, fields

### single — un solo archivo

```ts
// router.ts
import { uploadAvatar } from '../config/upload';

router.put('/me/avatar', authenticate, uploadAvatar.single('avatar'), updateAvatar);
// req.file contiene el archivo (o undefined si no se envió)
```

### array — múltiples archivos del mismo campo

```ts
// Hasta 5 fotos del mismo campo "photos"
router.post('/products', authenticate, upload.array('photos', 5), createProduct);
// req.files es un array de Express.Multer.File[]
```

### fields — múltiples campos con archivos distintos

```ts
router.post(
  '/profile',
  authenticate,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]),
  updateProfile
);
// req.files es un objeto: { avatar: File[], cover: File[] }
```

## 6. Acceder al archivo en el controller

```ts
// controllers/users.controller.ts
import { Request, Response, NextFunction } from 'express';

export async function updateAvatar(req: Request, res: Response, next: NextFunction) {
  // Multer adjunta el archivo a req.file (para single)
  if (!req.file) {
    return next(new AppError(400, 'Se requiere un archivo de imagen'));
  }

  // req.file tiene:
  // - fieldname: nombre del campo HTML ("avatar")
  // - originalname: nombre original del archivo
  // - mimetype: "image/jpeg", "image/png", etc.
  // - size: tamaño en bytes
  // - buffer: contenido del archivo (solo en memoryStorage)

  const imageUrl = await uploadService.uploadAvatar(req.file, req.user!.id);
  res.json({ avatarUrl: imageUrl });
}
```

## 7. Manejo de errores de Multer

Multer lanza errores con `err.code` específico:

```ts
// middlewares/error.middleware.ts
import multer from 'multer';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof multer.MulterError) {
    // Errores de Multer (límite, campo inesperado, etc.)
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Archivo demasiado grande. Máximo 5 MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Demasiados archivos.' });
    }
    return res.status(400).json({ error: `Error de upload: ${err.message}` });
  }

  // Errores lanzados por fileFilter
  if (err.message.includes('Tipo de archivo')) {
    return res.status(400).json({ error: err.message });
  }

  next(err);
}
```

## 8. Objeto req.file — referencia completa

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `fieldname` | `string` | Nombre del campo del formulario |
| `originalname` | `string` | Nombre original del archivo |
| `encoding` | `string` | Encoding del archivo |
| `mimetype` | `string` | MIME type detectado por el cliente |
| `size` | `number` | Tamaño en bytes |
| `buffer` | `Buffer` | Contenido (solo `memoryStorage`) |
| `path` | `string` | Ruta en disco (solo `diskStorage`) |
| `filename` | `string` | Nombre en disco (solo `diskStorage`) |

## ✅ Checklist de Verificación

- [ ] Multer instalado con `memoryStorage` para cloud uploads
- [ ] `fileFilter` valida por MIME type (no solo extensión)
- [ ] `limits.fileSize` configurado con valor apropiado
- [ ] Middleware de error captura `multer.MulterError`
- [ ] Controller verifica `if (!req.file)` antes de procesar

## 📚 Recursos Adicionales

- [Documentación oficial de Multer](https://github.com/expressjs/multer)
- [MIME types comunes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
