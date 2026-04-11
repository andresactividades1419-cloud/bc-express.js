# Glosario — Semana 04

Términos clave de validación, manejo de errores y logging en Node.js + Express.

---

## A

**AppError**
Clase personalizada que extiende `Error`. Representa errores operacionales predecibles
con un `statusCode` HTTP y una bandera `isOperational`. Permite al `errorHandler`
distinguir entre errores del negocio y errores inesperados del sistema.

```ts
throw new AppError(404, 'Recurso no encontrado');
```

---

## C

**captureStackTrace**
Método estático de `Error` que captura el call stack en el momento en que se llama.
Se usa en `AppError` para que el stack trace apunte al lugar donde se lanzó el error,
no a la clase `AppError` en sí.

```ts
Error.captureStackTrace(this, this.constructor);
```

**colorize (Winston)**
Módulo de formato de Winston (`format.colorize()`) que añade colores ANSI a los
mensajes de log según el nivel. Útil en desarrollo para distinguir rápidamente
`error` (rojo) de `info` (verde) de `http` (magenta).

---

## E

**error handler (Express)**
Middleware de Express con exactamente **4 parámetros** `(err, req, res, next)`.
Express lo detecta como manejador de errores por la _aridad_ de la función.
Debe registrarse al final de todos los middlewares y rutas.

**errorHandler**
Función middleware de 4 parámetros que centraliza el manejo de todos los errores de
una aplicación Express. Distingue `ZodError` (→ 400), `AppError` (→ statusCode) y
errores genéricos (→ 500).

---

## F

**format.combine (Winston)**
Función de Winston que encadena varios formatos en uno. Equivalente a `pipe` para
formatos de log.

```ts
format.combine(format.timestamp(), format.json());
```

**format.json (Winston)**
Serializa cada entrada de log como un objeto JSON. Ideal para producción porque
herramientas como Logtail o Datadog consumen logs en formato JSON.

---

## I

**isOperational**
Propiedad booleana de `AppError` que indica que el error fue anticipado por la
aplicación (true) y no es un fallo inesperado del sistema (false). Permite al
`errorHandler` decidir si reiniciar el proceso o solo informar al cliente.

---

## L

**logger**
Instancia de Winston creada con `createLogger`. Expone métodos como `logger.error()`,
`logger.warn()`, `logger.info()`, `logger.http()`, `logger.debug()` para loguear
mensajes en diferentes niveles de severidad.

**log level (nivel de log)**
Propiedad que determina qué tan "grave" es un mensaje. Winston solo imprime mensajes
con nivel igual o superior al configurado. Niveles de menor a mayor severidad:
`debug < http < info < warn < error`.

---

## M

**Morgan**
Middleware HTTP de Node.js que registra cada petición entrante (método, ruta, código
de respuesta, tiempo). Se integra con Winston redirigiendo su output a `logger.http()`
mediante un objeto `stream`.

**morganStream**
Objeto `{ write: (msg) => logger.http(msg.trim()) }` que actúa como puente entre
Morgan y Winston. Morgan llama a `write()` con cada línea de log; Winston la recibe
en el nivel `http`.

---

## N

**next(err)**
Llamada a la función `next` de Express pasando un objeto de error. Indica a Express
que salte todos los middlewares normales y vaya directamente al primer error handler
(middleware de 4 parámetros).

**notFound**
Middleware de 3 parámetros registrado después de todas las rutas. Se activa cuando
ninguna ruta coincide y pasa un `AppError(404, ...)` al siguiente error handler.

---

## O

**Object.setPrototypeOf**
Llamada necesaria en TypeScript al extender clases nativas como `Error` en entornos
CommonJS. Sin ella, `instanceof AppError` puede devolver `false` en runtime aunque
el objeto sea una instancia de `AppError`.

```ts
Object.setPrototypeOf(this, new.target.prototype);
```

**operational error**
Error anticipado y manejado intencionalmente por la aplicación: recurso no encontrado,
validación fallida, permisos insuficientes. Opuesto a _programmer error_ (bug).

---

## P

**printf (Winston)**
Función de formato personalizado en Winston que define cómo se ve cada línea de log
en la consola. Recibe `{ level, message, timestamp }` y retorna un string.

```ts
format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}`)
```

**programmer error**
Error no anticipado que indica un bug en el código: `TypeError`, `ReferenceError`,
acceso a `undefined`, etc. No debe ser capturado y respondido como error HTTP; lo
correcto es dejar que el proceso falle o reinicie.

---

## S

**safeParse**
Método de Zod (`.safeParse(data)`) que NO lanza excepción si la validación falla.
Retorna `{ success: true, data }` si es válido, o `{ success: false, error: ZodError }`
si no lo es. Preferible a `.parse()` en controladores Express.

**schema (Zod)**
Descripción declarativa de la forma y restricciones esperadas de un valor.

```ts
const schema = z.object({ name: z.string().min(1), price: z.number().positive() });
```

**stream (Morgan)**
Objeto con método `write(message: string)` que Morgan llama con cada entrada de log.
Se usa para redirigir la salida de Morgan a Winston en lugar de `process.stdout`.

---

## T

**transport (Winston)**
Destino físico donde Winston escribe los logs. Los más comunes:
- `transports.Console` — imprime en la terminal
- `transports.File` — escribe en un archivo

---

## Z

**z.coerce**
Namespace de Zod que convierte el valor antes de validarlo.
`z.coerce.number()` convierte strings a números, útil para parámetros de URL:

```ts
z.coerce.number().int().positive().safeParse('42') // { success: true, data: 42 }
z.coerce.number().int().positive().safeParse('abc') // { success: false }
```

**z.infer**
Operador de TypeScript + Zod para derivar un tipo desde un schema. Elimina la
duplicación entre schemas de validación e interfaces TypeScript.

```ts
type CreateProductDto = z.infer<typeof createProductSchema>;
```

**ZodError**
Objeto de error lanzado (o retornado en `.error`) cuando la validación de Zod falla.
Contiene un array `issues` con detalles de cada fallo: campo afectado (`path`) y
mensaje (`message`).

**ZodIssue**
Elemento individual del array `ZodError.issues`. Cada issue representa un único fallo
de validación con: `path` (array con el nombre del campo), `message` (descripción),
`code` (tipo de error).

**.partial() (Zod)**
Método de `z.object()` que convierte todos los campos del schema en opcionales.
Se usa para schemas de actualización (`PUT`) reutilizando el schema de creación.

```ts
const updateSchema = createSchema.partial(); // todos los campos se vuelven opcionales
```
