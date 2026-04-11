# AppError — Clase de Errores HTTP

## 🎯 Objetivos

- Distinguir entre errores operacionales y errores de programador
- Crear una clase `AppError` para representar errores HTTP del dominio
- Lanzar errores desde services y repositories con `throw new AppError()`

---

## 1. Errores operacionales vs errores de programador

| Tipo | Descripción | Ejemplos |
|------|-------------|----------|
| **Operacional** | Esperados, parte del flujo normal. El sistema sabe cómo manejarlos. | 404 Not Found, 400 Bad Request, 401 Unauthorized |
| **Programador** | Bugs inesperados. El sistema NO sabe cómo manejarlos. | TypeError, ReferenceError, acceso a undefined |

La diferencia importa porque:
- Los errores operacionales se devuelven al cliente con un mensaje claro
- Los errores de programador deben loguearse, alertar y NO exponer detalles al cliente

---

## 2. La clase AppError

```ts
// src/errors/AppError.ts

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);

    // Necesario cuando se extiende Error en TypeScript con CommonJS
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Captura el stack trace sin incluir el constructor en él
    Error.captureStackTrace(this, this.constructor);
  }
}
```

---

## 3. Errores HTTP comunes

```ts
import { AppError } from '../errors/AppError';

// 400 Bad Request — datos inválidos que no capturó Zod
throw new AppError(400, 'El precio no puede ser menor al costo');

// 404 Not Found — recurso inexistente
throw new AppError(404, 'Producto no encontrado');

// 409 Conflict — estado inconsistente
throw new AppError(409, 'Ya existe un producto con ese nombre');

// 403 Forbidden — usuario sin permisos (semana 08)
throw new AppError(403, 'No tienes permisos para esta acción');
```

---

## 4. Dónde lanzar AppError

El patrón de semana 03 retornaba `undefined` cuando un recurso no existía. Con `AppError`, el service puede lanzar directamente:

```ts
// service — antes (semana 03)
export async function findById(id: number): Promise<Product | undefined> {
  return repo.findById(id);
}

// service — con AppError (semana 04)
export async function findById(id: number): Promise<Product> {
  const product = await repo.findById(id);
  if (!product) {
    throw new AppError(404, `Producto con id ${id} no encontrado`);
  }
  return product;
}
```

El controller queda más limpio — ya no necesita validar `undefined`:

```ts
// controller — antes
const product = await service.findById(id);
if (!product) { res.status(404).json({ error: 'Not Found', ... }); return; }
res.json({ data: product });

// controller — con AppError
const product = await service.findById(id);  // lanza 404 si no existe
res.json({ data: product });                  // solo éxito llega aquí
```

---

## 5. `instanceof` para identificar el tipo

```ts
import { AppError } from '../errors/AppError';

function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}

// Uso en error handler
if (isAppError(err)) {
  // error esperado con statusCode conocido
  res.status(err.statusCode).json({ error: 'Error', message: err.message });
} else {
  // error inesperado del programador
  res.status(500).json({ error: 'Internal Server Error', message: 'Algo falló' });
}
```

---

## ✅ Checklist de verificación

- [ ] `AppError` está en `src/errors/AppError.ts`
- [ ] Tienes `Object.setPrototypeOf(this, new.target.prototype)` (fix TypeScript + CommonJS)
- [ ] Los services lanzan `throw new AppError(404, ...)` cuando no encuentran un recurso
- [ ] Los controllers usan `try/catch` y pasan el error a `next(err)`
- [ ] No expones `err.stack` en respuestas de producción
