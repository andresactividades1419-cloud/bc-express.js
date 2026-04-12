# Glosario — Semana 13: OpenAPI / Swagger

Términos clave ordenados alfabéticamente.

---

## A

**API Contract**
Acuerdo formal que define cómo un cliente y un servidor se comunican: qué
endpoints existen, qué parámetros aceptan, qué respuestas devuelven y qué
errores pueden ocurrir. La especificación OpenAPI es la forma estándar de
expresar un API contract.

---

## B

**BearerAuth**
Nombre convencional para el security scheme de tipo `http` con `scheme:
bearer` en OpenAPI. Indica que el endpoint requiere un token Bearer (JWT) en
el header `Authorization: Bearer <token>`.

---

## C

**components**
Sección de la especificación OpenAPI donde se definen recursos reutilizables:
`schemas`, `securitySchemes`, `responses`, `parameters`, `requestBodies`.
Se referencia desde otras partes de la spec con `$ref`.

---

## D

**description** (OpenAPI)
Campo de texto libre disponible en casi todos los objetos de la spec (info,
paths, parameters, responses). Soporta Markdown. Se muestra como tooltip o
texto expandido en Swagger UI.

---

## J

**JSDoc `@openapi`**
Tag especial de JSDoc que `swagger-jsdoc` interpreta para extraer fragmentos
YAML/JSON de la especificación OpenAPI directamente desde comentarios del
código fuente.

```typescript
/**
 * @openapi
 * /api/v1/items:
 *   get:
 *     summary: List items
 */
```

---

## O

**OpenAPI**
Especificación estándar y agnóstica de lenguaje para describir APIs HTTP REST.
Anteriormente llamada "Swagger Specification". La versión actual es **3.1**,
que alinea sus tipos con JSON Schema Draft 2020-12.

**operationId**
Identificador único de una operación HTTP dentro de la spec. Se usa para
generar clientes de API, hacer referencia a operaciones y mejorar la
navegación en herramientas. Ejemplo: `listItems`, `createItem`.

---

## P

**paths**
Sección principal de la spec OpenAPI que lista todas las rutas de la API.
Cada path puede tener uno o más métodos (`get`, `post`, `put`, `delete`, etc.)
con su documentación correspondiente.

**parameters**
Metadatos de entrada de un endpoint que no van en el body: `path`, `query`,
`header` o `cookie`. Cada parámetro especifica su nombre, ubicación, tipo,
si es requerido y una descripción.

---

## R

**requestBody**
Objeto en la spec OpenAPI que documenta el cuerpo de la petición para métodos
`POST`, `PUT` y `PATCH`. Incluye el flag `required`, el content type
(`application/json`) y el schema del cuerpo.

**$ref**
Referencia (`$reference`) a otro objeto dentro de la spec o en un archivo
externo. Forma: `$ref: '#/components/schemas/Item'`. Evita duplicación y
mantiene los schemas sincronizados.

---

## S

**schema** (OpenAPI)
Definición de la estructura y tipos de un objeto JSON. Basado en JSON Schema.
Define `type`, `properties`, `required`, `example`, `format`, validaciones
(`minimum`, `maxLength`, `pattern`) y composición (`oneOf`, `anyOf`).

**securityScheme**
Descripción de un mecanismo de autenticación en `components.securitySchemes`.
Tipos comunes: `http` (Basic/Bearer), `apiKey`, `oauth2`, `openIdConnect`.

**security** (operación)
Lista de security requirements aplicados a un endpoint. Formato:
`[{ BearerAuth: [] }]`. Un array vacío `[]` indica que el endpoint es público,
incluso si hay seguridad global definida.

**summary**
Descripción corta y concisa de un endpoint (máximo ~120 caracteres). Aparece
en la lista de endpoints de Swagger UI como título de cada operación.

**swagger-jsdoc**
Librería Node.js que lee archivos fuente, extrae los bloques `@openapi` de
los comentarios JSDoc y genera un objeto JSON con la especificación OpenAPI
completa en tiempo de ejecución.

**swagger-ui-express**
Middleware de Express que sirve Swagger UI (interfaz web interactiva) desde
la especificación OpenAPI JSON. Expone los endpoints como formularios HTML
probables desde el navegador.

**Swagger UI**
Interfaz web que renderiza una especificación OpenAPI como documentación
interactiva. Permite explorar endpoints, ver schemas, ingresar tokens de
autenticación y ejecutar peticiones directamente desde el navegador.

---

## T

**tag**
Etiqueta que agrupa endpoints relacionados en Swagger UI (acordeón de grupo).
Se define en la sección `tags` raíz de la spec y se aplica a operaciones con
el campo `tags: [NombreTag]`.

**Try it out**
Funcionalidad de Swagger UI que convierte la documentación de un endpoint en
un formulario interactivo. Permite enviar peticiones reales a la API desde
el navegador y ver la respuesta.

---

## Y

**YAML**
"YAML Ain't Markup Language" — formato de serialización legible por humanos
basado en indentación. La especificación OpenAPI puede escribirse en YAML o
JSON; YAML es el formato preferido para escritura manual por su legibilidad.

---

## 2

**204 No Content**
Código HTTP de respuesta para operaciones exitosas que no retornan body (típico
en `DELETE`). En OpenAPI, la respuesta 204 NO debe tener un campo `content`.
```yaml
responses:
  204:
    description: Deleted successfully
    # ← sin 'content' aquí
```
