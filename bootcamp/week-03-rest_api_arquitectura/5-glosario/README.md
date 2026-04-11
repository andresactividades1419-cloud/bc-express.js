# Glosario — Semana 03: REST API Architecture

Términos clave ordenados alfabéticamente.

---

## A

**Arquitectura en capas** (_Layered Architecture_)
Patrón de diseño que organiza el código en grupos con responsabilidades distintas y ordenadas verticalmente: `routes → controllers → services → repositories`. Cada capa solo depende de la capa inmediatamente inferior.

**async/await**
Sintaxis moderna de JavaScript para manejar operaciones asíncronas (Promises) de manera legible. En el backend, todos los métodos del repository deben ser `async` para que la firma no cambie al migrar de datos en memoria a una base de datos real.

---

## C

**Controller (controlador)**
Capa que actúa como interfaz HTTP. Su único trabajo es: (1) extraer datos de `req`, (2) llamar al service, (3) devolver la respuesta con `res.json()`. No debe contener lógica de negocio.

**Contrato de respuesta** (_Response Contract_)
Estructura JSON fija que la API siempre devuelve, sin importar el endpoint. Permite a los clientes saber qué esperar. Ejemplo: `{ "data": T }` para éxito, `{ "error", "message" }` para fallos.

**Copia defensiva** (_Defensive Copy_)
Retornar `[...array]` o `{ ...object }` en vez de la referencia interna del store. Evita que código externo mute el estado del repository sin pasar por sus métodos.

**CRUD**
Acrónimo de las 4 operaciones básicas sobre datos: **C**reate, **R**ead, **U**pdate, **D**elete. En REST se mapean a POST, GET, PUT/PATCH y DELETE respectivamente.

---

## D

**Data wrapper**
Patrón de envolver la respuesta en `{ "data": ... }`. Mejora la extensibilidad de la API: en el futuro puedes agregar `meta`, `links` o `pagination` sin romper a los clientes.

**DTO** (_Data Transfer Object_)
Objeto que define la forma de los datos para una operación específica. Evita exponer la entidad interna directamente. `CreateDto` es lo que llega del cliente, `ResponseDto` es lo que se devuelve.

---

## E

**Endpoint**
URL + Método HTTP que identifica una operación de la API. Por ejemplo: `GET /api/v1/products` es un endpoint diferente a `POST /api/v1/products`.

**Entidad** (_Entity_)
Tipo TypeScript que representa el modelo completo tal como existe en el store o base de datos. Incluye campos auto-generados como `id` y `createdAt`.

---

## I

**Idempotencia**
Propiedad de una operación que produce el mismo resultado sin importar cuántas veces se ejecute. `GET` y `DELETE` son idempotentes; `POST` no lo es (crea un nuevo recurso en cada llamada).

---

## O

**`Omit<T, K>`**
_Utility type_ de TypeScript que genera un tipo nuevo a partir de `T` excluyendo las propiedades `K`. Usado para `CreateDto`: `Omit<Product, 'id' | 'createdAt'>`.

---

## P

**Paginación** (_Pagination_)
Técnica para dividir colecciones grandes en páginas más pequeñas. Parámetros estándar: `?page=1&limit=10`. La respuesta incluye los datos de la página, el total y los parámetros usados.

**`Partial<T>`**
_Utility type_ de TypeScript que hace opcionales todas las propiedades de `T`. Usado para `UpdateDto`: `Partial<CreateProductDto>`. Permite actualizar solo los campos enviados.

---

## R

**Repository (repositorio)**
Capa que abstrae el acceso a los datos. Es el único punto del código que sabe cómo y dónde se guardan los datos. Al cambiar de array en memoria a Prisma, solo cambia esta capa.

**REST** (_Representational State Transfer_)
Estilo arquitectónico para APIs web basado en 5 principios: recursos con URLs estables, métodos HTTP semánticos, stateless, representaciones uniformes y sistema en capas.

**Route (ruta)**
Capa más delgada de la arquitectura. Solo mapea `Método HTTP + URL` → función del controller. No contiene lógica.

---

## S

**Separación de responsabilidades** (_Separation of Concerns, SoC_)
Principio de diseño que dice que cada módulo debe tener una sola razón para cambiar. La arquitectura en capas aplica este principio: si cambia la BD, solo cambia el repository; si cambia la lógica, solo cambia el service.

**Service (servicio)**
Capa que contiene la lógica de negocio: paginación, cálculos, validaciones de dominio, orquestación entre repositories. No debe tener ningún import de Express.

**SRP** (_Single Responsibility Principle_)
Del SOLID, indica que una clase/función/módulo debe tener una sola responsabilidad. Un controller que calcula precios viola SRP: calcular es responsabilidad del service.

**`SingleResponse<T>`**
Tipo genérico que envuelve una sola entidad: `{ data: T }`. Se usa en GET por ID, POST (201) y PUT.

**Status code HTTP**
Código numérico de 3 dígitos en la respuesta que indica el resultado de la operación. Semana 03 usa: `200 OK`, `201 Created`, `204 No Content`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`.

---

## T

**Thin controller**
Controller minimalista que sigue la regla de los 3 pasos. Su tamaño ideal está entre 5 y 15 líneas por método. Si crece más, es señal de que lógica debe moverse al service.

---

## V

**Versioning de API**
Prefijo en la URL que indica la versión de la API (`/api/v1/`). Permite publicar cambios potencialmente incompatibles en `/api/v2/` sin romper a clientes que usan v1.
