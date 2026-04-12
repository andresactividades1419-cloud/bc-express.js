# 📖 Glosario — Semana 12: Caching y Performance

Términos clave ordenados alfabéticamente.

---

## B

### Benchmark
Prueba controlada para medir el rendimiento de un sistema (latencia, throughput, RPS). Herramienta habitual: `ab` (ApacheBench) o `autocannon`.

### Brotli
Algoritmo de compresión más eficiente que gzip, soportado por navegadores modernos. Express puede negociar automáticamente entre gzip y brotli según el header `Accept-Encoding`.

---

## C

### Cache-aside (Lazy loading)
Estrategia de caché donde la aplicación lee primero de Redis y, si no encuentra el dato, lo obtiene del origen y lo guarda en Redis para futuras peticiones.

### Cache hit
Situación en que el dato solicitado ya existe en la caché. Respuesta inmediata sin consultar la base de datos.

### Cache invalidation
Proceso de eliminar o marcar como obsoletas las entradas de caché cuando los datos subyacentes cambian. Es considerado uno de los problemas más difíciles en informática.

### Cache miss
Situación en que el dato solicitado **no** existe en la caché. La aplicación debe buscar en el origen y (opcionalmente) guardar el resultado en caché.

### Caché
Almacenamiento de alta velocidad que guarda copias temporales de datos costosos de obtener, para servirlos más rápido en peticiones futuras.

### Compresión HTTP
Técnica para reducir el tamaño del cuerpo de las respuestas HTTP antes de enviarlas al cliente. Se negocia mediante los headers `Accept-Encoding` / `Content-Encoding`.

### Cursor (paginación)
Identificador único (generalmente el `id` del último elemento visto) que permite continuar la paginación desde un punto exacto, sin depender de un índice de posición.

---

## E

### ETag
Header HTTP que contiene un token que representa la versión de un recurso. Permite validaciones condicionales (`If-None-Match`) y respuestas `304 Not Modified`.

### Eviction (expulsión)
Proceso por el que Redis elimina claves cuando se alcanza el límite de memoria (`maxmemory`). La política más común es `allkeys-lru`.

---

## G

### gzip
Algoritmo de compresión ampliamente compatible. El middleware `compression` de Express lo aplica automáticamente a respuestas mayores al umbral configurado.

---

## H

### hasNextPage
Campo booleano en la respuesta de cursor pagination que indica si existen más elementos después de la página actual.

### HASH (Redis)
Tipo de dato de Redis equivalente a un objeto: campo → valor. Útil para almacenar entidades con múltiples propiedades sin serializar JSON completo.

---

## I

### ioredis
Cliente de Redis para Node.js con soporte TypeScript nativo, reconexión automática, pipelining y clusters. Alternativa a `node-redis`.

---

## L

### Latencia
Tiempo que tarda una operación en completarse desde que se inicia. Redis tiene latencias de ~0.1–0.3 ms; una base de datos relacional típica tarda 50–500 ms.

### LIST (Redis)
Lista doblemente enlazada en Redis. Útil para colas de tareas (`LPUSH` / `RPOP`) o feeds de actividad reciente.

### LRU (Least Recently Used)
Política de eviction que elimina primero las claves que no han sido usadas recientemente cuando Redis alcanza su límite de memoria.

---

## N

### nextCursor
Valor del `id` del último elemento de la página actual. Se envía al cliente para que lo use como parámetro `cursor` en la siguiente petición.

### N+1 trick (paginación)
Técnica para detectar si hay más páginas sin ejecutar `COUNT(*)`: se solicitan `limit + 1` elementos y se comprueba si la respuesta tiene más de `limit` items.

---

## O

### Offset pagination
Paginación basada en un número de página y tamaño (`LIMIT` + `OFFSET`). Simple de implementar pero con degradación de rendimiento en páginas altas (`OFFSET 10000` escanea 10,000 filas).

---

## P

### Paginación eficiente
Estrategia de paginación que evita escaneos costosos en la base de datos. La paginación por cursor es más eficiente que la paginación por offset para tablas grandes.

### Pipeline (Redis)
Mecanismo para enviar múltiples comandos Redis en un solo round-trip de red, reduciendo la latencia acumulada.

---

## R

### Redis
Base de datos en memoria (RAM) de tipo clave-valor, de código abierto, con soporte para estructuras de datos avanzadas. Latencia sub-milisegundo. Usada para caché, sesiones, colas y pub/sub.

### response-time
Middleware Express que añade el header `X-Response-Time` con la duración de cada petición en milisegundos.

---

## S

### SET (Redis)
Colección de valores únicos sin orden en Redis. Útil para listas negras de tokens, tags únicos o conteo de visitantes.

### STRING (Redis)
Tipo de dato más simple de Redis: almacena bytes, números o JSON serializado. Límite de 512 MB por valor.

---

## T

### Throughput
Número de operaciones (peticiones, transacciones) que un sistema puede procesar por unidad de tiempo. Medido en RPS (requests per second).

### TTL (Time To Live)
Tiempo de vida de una clave en Redis. Cuando expira, la clave se elimina automáticamente. Se configura con `EX` (segundos) o `PX` (milisegundos).

---

## W

### Write-through
Estrategia de caché donde cada escritura actualiza simultáneamente la caché y el origen de datos. Garantiza consistencia pero añade latencia a las escrituras.

---

## X

### X-Cache
Header HTTP personalizado que indica si la respuesta provino de la caché (`HIT`) o del origen (`MISS`). Convención ampliamente usada en proxies y CDNs (e.g., Cloudflare, Varnish).
