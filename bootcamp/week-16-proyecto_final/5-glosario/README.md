# Glosario — Semana 16 · Proyecto Final Integrador

Términos integrados de las 16 semanas del bootcamp, ordenados alfabéticamente.

---

## A

**Access Token**: JWT de vida corta (15 min) enviado en el header `Authorization: Bearer <token>`. Se usa para autenticar cada request a la API.

**API REST**: Architectural style for distributed hypermedia systems. Usa HTTP verbs (GET, POST, PATCH, DELETE) y recursos identificados por URL.

**AppError**: Clase personalizada que extiende `Error` con un `statusCode`. Permite al error middleware distinguir errores operacionales de errores inesperados.

**async/await**: Sintaxis de ES2017 para manejar promesas de forma legible. Todo el I/O en Node.js (DB, filesystem, HTTP) es asíncrono.

**Authorization**: Proceso que determina QUÉ puede hacer un usuario autenticado. Distinto de *autenticación* (verificar quién es). Implementado con RBAC en este bootcamp.

## B

**bcrypt**: Algoritmo de hash para contraseñas. Incluye un *salt* aleatorio y es computacionalmente costoso por diseño (resistance to brute force).

**Bearer Token**: Esquema de autorización HTTP. El cliente incluye `Authorization: Bearer <jwt>` en cada request protegido.

## C

**Cache**: Almacenamiento temporal de respuestas costosas (Redis). Reduce latencia y carga en la base de datos. Ver semana 12.

**CI/CD**: Continuous Integration / Continuous Deployment. Pipeline que valida (tests, lint) y despliega automáticamente. GitHub Actions + Railway/Render. Ver semana 15.

**Controller**: Capa que recibe `req`/`res` de Express y llama al service. No contiene lógica de negocio. Delegación limpia hacia la capa inferior.

**Cookie HttpOnly**: Cookie inaccesible desde JavaScript del navegador. Se utiliza para almacenar el refresh token de forma segura, previniendo ataques XSS.

**CORS**: Cross-Origin Resource Sharing. Política de seguridad del navegador. Se configura en Express con el middleware `cors()` para permitir orígenes específicos.

## D

**Docker**: Plataforma de contenedores que empaqueta la aplicación y sus dependencias en una imagen reproducible. `Dockerfile` multi-stage minimiza el tamaño final.

**DTO (Data Transfer Object)**: Tipo TypeScript (generalmente inferido de Zod) que define la forma exacta de los datos de entrada de un endpoint.

## E

**ESM (ES Modules)**: Sistema de módulos nativo de JavaScript. Usa `import`/`export`. Node.js 22+ lo soporta de forma estable.

**Event Loop**: Mecanismo central de Node.js que permite ejecutar I/O no bloqueante en un solo hilo. Fundamental para entender la performance de Express.

**Express**: Framework minimalista de Node.js para construir servidores HTTP. Express 5 incluye manejo de promesas nativo en handlers.

## G

**Graceful Shutdown**: Patrón para cerrar el servidor limpiamente al recibir `SIGTERM`/`SIGINT`. Espera que los requests en curso terminen antes de salir.

## H

**Helmet**: Middleware de seguridad que configura headers HTTP defensivos (CSP, X-Content-Type-Options, etc.) con una sola línea de código.

**HTTP Status Codes**: Códigos que comunican el resultado de un request. 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error.

## J

**Jest**: Framework de testing para JavaScript/TypeScript. Incluye test runner, assertions y mocks. Usado con `ts-jest` para TypeScript.

**JWT (JSON Web Token)**: Token firmado digitalmente con tres partes: header, payload y signature. No se persiste en el servidor (stateless). Ver semana 07.

## L

**Logger**: Herramienta para emitir logs estructurados. Winston produce JSON en producción (fácil de indexar) y texto colorizado en desarrollo.

## M

**Middleware**: Función `(req, res, next)` que se ejecuta en la cadena de procesamiento de Express. Puede modificar `req`/`res`, terminar el ciclo o pasar al siguiente middleware.

**Migration**: Archivo generado por Prisma que describe cambios al schema de la DB de forma versionada y reversible. `pnpm prisma migrate dev`.

**MongoDB**: Base de datos NoSQL orientada a documentos. Flexible para datos sin schema fijo. Ver semana 06 (Mongoose).

## O

**OpenAPI / Swagger**: Especificación estándar para documentar APIs REST. Ver semana 13. Generada automáticamente con `swagger-jsdoc` + `swagger-ui-express`.

**ORM (Object-Relational Mapper)**: Herramienta que mapea tablas de la DB a objetos TypeScript. Prisma es el ORM del stack principal del bootcamp.

## P

**Pagination**: Técnica para dividir grandes conjuntos de datos en páginas. Offset pagination (`skip`/`take` en Prisma) vs Cursor pagination (más eficiente para grandes datasets).

**Prisma**: ORM type-safe para TypeScript + Node.js. Genera tipos a partir del `schema.prisma`. Incluye cliente, CLI y soporte para migraciones.

## R

**Rate Limiting**: Middleware que limita el número de requests por IP en una ventana de tiempo. Previene ataques de fuerza bruta y DDoS. `express-rate-limit`.

**RBAC (Role-Based Access Control)**: Sistema de autorización donde los permisos se asignan a roles (USER, ADMIN) en lugar de a usuarios individuales.

**Redis**: Base de datos en memoria, extremadamente rápida. Usada para caché de respuestas, sesiones y pub/sub. Ver semana 12.

**Refresh Token**: JWT de vida larga (7 días) almacenado en cookie HttpOnly. Se usa para obtener un nuevo access token sin requerir credenciales. Su hash bcrypt se guarda en la DB para permitir revocación.

**Repository Pattern**: Capa de acceso a datos que abstrae al service de la implementación concreta (Prisma, Mongoose, array en memoria). Facilita el testing con mocks.

## S

**Salt**: Valor aleatorio agregado a la contraseña antes de hacer el hash con bcrypt. Previene ataques de *rainbow tables*.

**Service**: Capa de lógica de negocio. Recibe DTOs del controller, aplica reglas del dominio y llama al repository. No conoce Express (`req`/`res`).

**Socket.io**: Biblioteca para comunicación bidireccional en tiempo real sobre WebSockets. Rooms, namespaces y autenticación via middleware. Ver semana 11.

**Supertest**: Librería para hacer HTTP requests a la app Express en tests de integración, sin levantar un servidor real.

## T

**TypeScript**: Superset de JavaScript con tipado estático. Detecta errores en tiempo de compilación. `strict: true` habilita todas las validaciones recomendadas.

## V

**Versioning (API)**: Práctica de versionar los endpoints de la API (`/api/v1/...`) para poder evolucionar el contrato sin romper clientes existentes.

## W

**WebSocket**: Protocolo de comunicación full-duplex sobre una única conexión TCP. Base de Socket.io para comunicación en tiempo real. Ver semana 11.

**Winston**: Librería de logging flexible para Node.js. Soporta múltiples transportes (consola, archivo, Logtail) y formatos (JSON, texto).

## Z

**Zod**: Librería de validación y parsing de schemas TypeScript-first. `z.safeParse()` retorna un result sin lanzar excepciones, facilitando el manejo de errores de validación.
