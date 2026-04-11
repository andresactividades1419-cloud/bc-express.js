# Glosario — Semana 06: MongoDB + Mongoose

Términos clave ordenados alfabéticamente.

---

## A

### `authSource`
Parámetro de la cadena de conexión MongoDB que indica en qué base de datos están almacenadas las credenciales del usuario. Cuando se usa `MONGO_INITDB_ROOT_USERNAME`, las credenciales viven en la base `admin`, por lo que se requiere `?authSource=admin` en el URI.

```
mongodb://user:pass@localhost:27017/midb?authSource=admin
```

---

## B

### BSON
**Binary JSON**. Formato de serialización binaria usado internamente por MongoDB para almacenar documentos. Extiende JSON añadiendo tipos como `Date`, `ObjectId`, `Binary`, `Decimal128` e `int32/int64`. Permite búsquedas más eficientes que JSON puro.

---

## C

### `CastError`
Error que lanza Mongoose cuando un valor no puede convertirse al tipo definido en el Schema. El caso más frecuente: un string que no tiene el formato de un ObjectId válido (24 hex chars). Se produce **antes** de consultar MongoDB.

```ts
// Provoca CastError → 400 Bad Request
await Product.findById('id-invalido');
```

### Collection
Equivalente a una **tabla** en SQL. Agrupación de documentos relacionados dentro de una base de datos MongoDB. Una colección no impone estructura fija; cada documento puede tener campos diferentes.

### `countDocuments()`
Método de Mongoose que retorna el número de documentos que coinciden con un filtro, sin traerlos a memoria. Esencial para implementar paginación junto con `.skip()` y `.limit()`.

```ts
const total = await Product.countDocuments({ active: true });
```

---

## D

### Document
La unidad básica de almacenamiento en MongoDB, equivalente a una **fila** en SQL. Se representa como un objeto JSON (internamente BSON) con campos clave-valor. Cada documento tiene un campo `_id` único.

```json
{ "_id": "6472a...", "name": "Laptop", "price": 999 }
```

---

## E

### Embedding (Documentos Embebidos)
Estrategia de modelado en MongoDB donde un subdocumento se almacena **dentro** del documento padre, sin colección separada. Ideal para datos que siempre se consultan juntos y que no cambian de forma independiente.

```ts
// Dirección embebida dentro de usuario
{ "_id": "...", "name": "Ana", "address": { "city": "Madrid", "zip": "28001" } }
```

### Error 11000
Código de error de `MongoServerError` que indica violación de un **índice único** (duplicate key). Debe capturarse para retornar `409 Conflict` en lugar de `500 Internal Server Error`.

```ts
import { MongoServerError } from 'mongodb';
if (err instanceof MongoServerError && err.code === 11000) {
  throw new AppError(409, 'Ya existe un registro con ese valor único');
}
```

---

## F

### `findById()`
Método de Mongoose equivalente a `findOne({ _id: id })`. Retorna `null` si no encuentra el documento (no lanza excepción). Siempre verificar el retorno antes de continuar.

```ts
const doc = await Product.findById(id);
if (!doc) throw new AppError(404, 'No encontrado');
```

### `findByIdAndDelete()`
Busca un documento por `_id`, lo elimina y retorna el documento eliminado. Retorna `null` si no existe.

### `findByIdAndUpdate()`
Busca por `_id`, aplica la actualización y retorna el documento. Con `{ new: true }` retorna la versión actualizada; con `{ runValidators: true }` ejecuta las validaciones del Schema en el update.

---

## I

### Índice (Index)
Estructura de datos auxiliar que acelera las consultas en una colección. En Mongoose se define con `unique: true` en el SchemaType o con `schema.index({ campo: 1 })`. Sin índice, MongoDB hace un *full collection scan*.

---

## L

### `lean()`
Modificador de consulta Mongoose que retorna **objetos JavaScript plenos** en lugar de instancias de Document de Mongoose. Elimina overhead de hidratación, getters, setters y métodos de instancia. Usar en todas las rutas de solo lectura.

```ts
// Con lean() → objeto JS plano, más rápido
const products = await Product.find().lean();
```

---

## M

### Model
Clase de Mongoose que proporciona la interfaz principal para interactuar con una colección MongoDB. Se crea a partir de un Schema y expone métodos estáticos (`find`, `create`, `findById`, etc.). El nombre del Model se pluraliza automáticamente para nombrar la colección (`Product` → `products`).

```ts
export const Product = mongoose.model<IProduct>('Product', productSchema);
```

### `mongoose.connect()`
Función que establece la conexión con MongoDB. Mongoose mantiene un **estado de conexión global**; solo se llama una vez en `server.ts` antes del `app.listen()`. A diferencia de Prisma, no requiere patrón singleton.

### `mongosh`
Shell interactivo oficial de MongoDB (reemplaza al antiguo `mongo`). Permite ejecutar operaciones CRUD, administrar índices y explorar colecciones directamente desde la terminal.

---

## O

### ObjectId
Tipo único de MongoDB para identificadores de documentos (`_id`). Ocupa 12 bytes en binario: 4 bytes de timestamp Unix, 5 bytes de identidad del proceso y 3 bytes de contador incremental. Se representa como string hexadecimal de 24 caracteres.

```ts
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido');
```

---

## P

### `populate()`
Método de Mongoose que reemplaza un campo de tipo ObjectId con el documento referenciado completo, realizando una segunda consulta automática. Equivalente conceptual a un `JOIN` de SQL, pero ejecutado en la capa de aplicación.

```ts
const product = await Product.findById(id).populate('category').lean();
// product.category → { _id: '...', name: 'Electrónica' }
```

### Pre/Post Middleware (Hooks)
Funciones que Mongoose ejecuta automáticamente antes (`pre`) o después (`post`) de ciertas operaciones (save, validate, remove, find). Útiles para hashear contraseñas antes de guardar, auditar cambios, etc.

```ts
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
```

---

## R

### Referencing (Referencia)
Estrategia de modelado donde un documento almacena el `ObjectId` de otro documento en lugar de embeber sus datos. Permite normalización y evita duplicación, a costa de necesitar `populate()` para obtener los datos relacionados.

```ts
// product.category guarda solo el ObjectId
category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
```

---

## S

### Schema
Definición de la estructura, tipos y validaciones de los documentos de una colección en Mongoose. No se almacena en MongoDB; es una capa de Node.js que normaliza los datos antes de escribirlos.

### SchemaType
Tipo de dato asignado a un campo de un Schema: `String`, `Number`, `Boolean`, `Date`, `Buffer`, `ObjectId`, `Array`, `Mixed`, `Decimal128`, `Map`.

### `sort()`
Método de consulta Mongoose que ordena los resultados. Se usa con un objeto donde `1` es ascendente y `-1` descendente.

```ts
Product.find().sort({ createdAt: -1 }); // más recientes primero
```

---

## T

### `timestamps: true`
Opción de Schema que añade automáticamente los campos `createdAt` (fecha de creación) y `updatedAt` (fecha de última modificación) a cada documento. Mongoose los gestiona sin que el desarrollador los actualice manualmente.

---

## V

### Virtual Field
Campo calculado definido en el Schema de Mongoose que **no se almacena en la base de datos**. Se computa dinámicamente a partir de otros campos del documento. No permanece con `.lean()`.

```ts
productSchema.virtual('displayPrice').get(function () {
  return `$${this.price.toFixed(2)}`;
});
```

### Validators
Restricciones definidas en el Schema de Mongoose que se evalúan antes de `save()` y `create()`. Incluyen: `required`, `min`/`max` (números), `minlength`/`maxlength` (strings), `enum`, `match` (regex), `trim`, `uppercase`/`lowercase`, `default`.
