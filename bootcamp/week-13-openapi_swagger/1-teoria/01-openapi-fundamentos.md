# OpenAPI: Fundamentos

## 🎯 Objetivos

- Entender qué es la especificación OpenAPI 3.x y por qué existe
- Conocer la estructura top-level de un documento OpenAPI
- Diferenciar Swagger 2.0 de OpenAPI 3.x
- Identificar los bloques clave: `info`, `servers`, `paths`, `components`

---

## 1. ¿Qué es OpenAPI?

**OpenAPI Specification (OAS)** es un estándar abierto para describir APIs REST
de forma legible tanto por humanos como por máquinas. Antes se llamaba
**Swagger** (v2.0); en 2016 el proyecto fue donado a la OpenAPI Initiative y
pasó a llamarse OpenAPI 3.x.

```
Historia:
  Swagger 2.0      (2014) → formato propietario de SmartBear
  OpenAPI 3.0 / 3.1 (2017/2021) → estándar abierto de la industria
```

> La especificación define **qué endpoints existen**, **qué datos aceptan**
> y **qué datos devuelven** — sin ambigüedad, sin leer el código fuente.

---

## 2. Estructura top-level

Un documento OpenAPI válido en YAML tiene esta forma:

```yaml
openapi: "3.1.0"               # versión de la especificación

info:                           # metadatos de la API
  title: My API
  version: 1.0.0
  description: API de ejemplo del bootcamp

servers:                        # dónde vive la API
  - url: http://localhost:3000
    description: Desarrollo
  - url: https://api.example.com
    description: Producción

tags:                           # grupos lógicos de endpoints
  - name: Products
    description: Gestión de productos
  - name: Auth
    description: Autenticación

paths:                          # endpoints y sus operaciones
  /api/v1/products:
    get: ...
    post: ...

components:                     # tipos y esquemas reutilizables
  schemas:
    Product: ...
  securitySchemes:
    BearerAuth: ...

security:                       # aplica a toda la API (se puede sobrescribir)
  - BearerAuth: []
```

---

## 3. El bloque `paths`

Cada ruta tiene una o más **operaciones** (`get`, `post`, `put`, `delete`, `patch`).

```yaml
paths:
  /api/v1/products/{id}:
    get:
      summary: Get product by ID           # texto corto (aparece en UI colapsado)
      description: Returns a single product # texto largo (aparece al expandir)
      tags: [Products]                     # agrupa en Swagger UI
      parameters:
        - in: path                         # dónde está el parámetro
          name: id
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Product found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
        "404":
          description: Product not found
```

### Tipos de parámetros (`in`)

| Valor | Ejemplo | Descripción |
|-------|---------|-------------|
| `path` | `/products/{id}` | Parte de la URL |
| `query` | `?limit=20&cursor=xyz` | Query string |
| `header` | `Authorization: Bearer ...` | Header HTTP |
| `cookie` | `refreshToken=...` | Cookie |

---

## 4. El bloque `components`

Centraliza definiciones reutilizables. La clave es `$ref` para referenciarlas:

```yaml
components:
  schemas:
    Product:
      type: object
      required: [id, name]
      properties:
        id:
          type: string
          example: "clh2x..."
        name:
          type: string
          example: "Laptop Pro"
        price:
          type: number
          format: float
          example: 999.99
    Error:
      type: object
      properties:
        error:
          type: string
          example: "Resource not found"
```

Uso con `$ref`:
```yaml
schema:
  $ref: "#/components/schemas/Product"
```

---

## 5. Ventajas de OpenAPI en un proyecto real

| Ventaja | Detalle |
|---------|---------|
| **Documentación viva** | Se genera desde el código, no desde un README desactualizado |
| **Contrato explícito** | Frontend y backend acuerdan tipos antes de implementar |
| **Pruebas desde UI** | Swagger UI permite probar endpoints con autenticación |
| **Generación de código** | Herramientas como `openapi-generator` crean SDKs automáticamente |
| **Validación** | Herramientas como `zod-openapi` pueden derivar schemas de Zod |

---

## ✅ Checklist de verificación

- [ ] Entiendo la diferencia entre Swagger 2.0 y OpenAPI 3.x
- [ ] Sé qué va en `info`, `servers`, `paths` y `components`
- [ ] Comprendo para qué sirve `$ref` y cómo referenciar schemas
- [ ] Conozco los cuatro tipos de `in` para parámetros
- [ ] Sé qué es el campo `summary` y para qué sirve `tags`
