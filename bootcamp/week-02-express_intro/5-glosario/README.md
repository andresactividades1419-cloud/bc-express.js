# Glosario — Semana 02: Express Intro

Términos técnicos clave de la semana, ordenados alfabéticamente.

---

## A

**app.ts**
Archivo que configura la aplicación Express: registra middlewares, rutas y el error handler. Se exporta como función (`createApp()`) para poder importarla en tests sin arrancar el servidor.

**async/await (en Express 5)**
En Express 5, los errores lanzados en handlers async se propagan automáticamente al error handler mediante `next(err)`. En Express 4 era necesario envolver en `try/catch`.

---

## B

**body parser**
Middleware que transforma el cuerpo de la petición HTTP de bytes a objeto JavaScript. En Express se activa con `app.use(express.json())`. Sin él, `req.body` es `undefined`.

---

## C

**CRUD**
Acrónimo de las 4 operaciones básicas sobre recursos: **C**reate (POST), **R**ead (GET), **U**pdate (PUT/PATCH), **D**elete (DELETE).

---

## E

**error handler**
Middleware especial con exactamente 4 parámetros `(err, req, res, next)`. Express lo identifica por la aridad y lo invoca solo cuando se llama `next(err)` o cuando un handler async lanza un error. Siempre se registra como el último `app.use()`.

**Express**
Framework minimalista para Node.js que simplifica la creación de servidores HTTP. Añade routing declarativo, middleware chaineable y una API limpia para `req`/`res` sobre el módulo `http` nativo.

**express.json()**
Middleware integrado de Express que parsea el body de peticiones con `Content-Type: application/json` y lo asigna a `req.body`.

---

## G

**graceful shutdown**
Patrón que cierra el servidor HTTP limpiamente ante señales del sistema operativo (`SIGTERM`, `SIGINT`): termina las conexiones activas antes de salir. Evita pérdida de peticiones en vuelo.

---

## H

**handler**
Función que procesa una petición y genera una respuesta. Firma básica: `(req: Request, res: Response) => void`. Puede ser async en Express 5.

**HTTP method (verbo)**
Indica la intención de la petición: `GET` (leer), `POST` (crear), `PUT` (reemplazar), `PATCH` (actualizar parcialmente), `DELETE` (eliminar).

**HTTP status code**
Código numérico de 3 dígitos que indica el resultado de la petición. Familias: `2xx` (éxito), `4xx` (error del cliente), `5xx` (error del servidor).

---

## M

**middleware**
Función con firma `(req, res, next)` que se ejecuta en la cadena de procesamiento de Express. Puede modificar `req`/`res`, terminar la petición o llamar `next()` para pasar al siguiente.

**morgan**
Librería de logging HTTP popular para Express. Registra método, URL, status code y tiempo de respuesta en cada petición. Alternativa: crear un logger personalizado.

---

## N

**next()**
Función que pasa el control al siguiente middleware en la cadena. `next(err)` pasa el control directamente al error handler.

---

## R

**req (Request)**
Objeto que representa la petición entrante. Propiedades clave: `req.params` (segmentos de ruta), `req.query` (query string), `req.body` (body parseado), `req.headers`, `req.method`, `req.path`.

**req.body**
Objeto con los datos enviados en el body de la petición. Requiere `express.json()`. Usualmente disponible en `POST`, `PUT` y `PATCH`.

**req.params**
Objeto con los parámetros de ruta capturados. Ejemplo: en la ruta `/items/:id`, `req.params.id` contiene el valor de `:id`.

**req.query**
Objeto con los parámetros de la query string. Ejemplo: `/items?page=2&limit=10` → `req.query.page === '2'`. Siempre strings.

**res (Response)**
Objeto para construir y enviar la respuesta HTTP. Métodos clave: `res.json()`, `res.status().json()`, `res.send()`, `res.sendStatus()`, `res.redirect()`.

**res.json()**
Envía una respuesta JSON con `Content-Type: application/json`. Internamente llama `JSON.stringify()`. Siempre usar `return res.json()` para evitar el error "headers already sent".

**REST**
Arquitectura para APIs que usa HTTP de forma semántica: verbos correctos, rutas basadas en recursos (sustantivos plurales), status codes apropiados y representaciones JSON.

**Router**
Clase de Express que permite agrupar rutas relacionadas en módulos. Se instancia con `const router = Router()` y se registra en `app.ts` con `app.use('/prefix', router)`.

---

## S

**server.ts**
Archivo de entry point que importa `createApp()` y llama a `app.listen()`. Al estar separado de `app.ts`, permite importar la app en tests sin iniciar el servidor.

**status code 200** → OK. Respuesta exitosa para GET y PUT.

**status code 201** → Created. Recurso creado exitosamente en POST.

**status code 204** → No Content. Operación exitosa sin body en la respuesta (DELETE).

**status code 400** → Bad Request. El cliente envió datos inválidos o malformados.

**status code 401** → Unauthorized. El cliente no está autenticado (sin token / credenciales).

**status code 403** → Forbidden. El cliente está autenticado pero no tiene permisos.

**status code 404** → Not Found. El recurso solicitado no existe.

**status code 409** → Conflict. El recurso ya existe (ej. email duplicado en registro).

**status code 500** → Internal Server Error. Error inesperado en el servidor.
