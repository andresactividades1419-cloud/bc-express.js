# Ejercicio 01 — Hello Node.js + TypeScript

## 🎯 Objetivo

Crear tu primer script Node.js con TypeScript que lee un archivo JSON, procesa los datos y muestra un reporte en consola. Aprenderás: módulos ESM, `fs/promises`, `path`, tipado básico y el flujo `tsx watch`.

## 📋 Prerrequisitos

- [01-nodejs-runtime.md](../../1-teoria/01-nodejs-runtime.md) leído
- [02-modulos-esm.md](../../1-teoria/02-modulos-esm.md) leído
- [04-typescript-config.md](../../1-teoria/04-typescript-config.md) leído

## ⏱️ Tiempo estimado: 45 minutos

---

## Paso 0: Configurar el proyecto

```bash
cd starter/
pnpm install
```

Verifica que el proyecto arranca:

```bash
pnpm dev
# Deberías ver: [tsx] watching for changes...
```

---

## Paso 1: Definir los tipos

En TypeScript, siempre definimos los tipos antes de escribir la lógica.

**Abre `starter/src/types.ts`** y descomenta la sección del Paso 1:

```ts
// Los tipos representan la forma de los datos que vamos a procesar.
// `interface` es la forma preferida para objetos de dominio en backend.

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface Report {
  totalProducts: number;
  totalValue: number;
  categories: string[];
  lowStockItems: Product[];
}
```

---

## Paso 2: Leer el archivo JSON

Node.js puede leer archivos del sistema con `fs/promises`. Es asíncrono y no bloquea el Event Loop.

**Abre `starter/src/reader.ts`** y descomenta la sección del Paso 2:

```ts
import { readFile } from 'fs/promises';
import { join } from 'path';

// join construye la ruta de forma multiplataforma (/ en Unix, \ en Windows)
// import.meta.dirname es el directorio del archivo actual (equivale a __dirname)
async function readProducts(): Promise<Product[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'products.json');

  // await pausa la función hasta que readFile termine — sin bloquear el Event Loop
  const raw = await readFile(filePath, 'utf-8');

  // JSON.parse convierte el string JSON en un objeto JavaScript
  return JSON.parse(raw) as Product[];
}
```

Verifica en la terminal de `pnpm dev` que no hay errores TypeScript.

---

## Paso 3: Procesar los datos

**Abre `starter/src/processor.ts`** y descomenta la sección del Paso 3:

```ts
// Funciones puras: reciben datos y retornan datos transformados.
// Sin efectos secundarios — fácil de testear.

function generateReport(products: Product[]): Report {
  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0
  );

  // Set elimina duplicados automáticamente
  const categories = [...new Set(products.map((p) => p.category))];

  // Items con stock menor a 5 unidades
  const lowStockItems = products.filter((p) => p.stock < 5);

  return {
    totalProducts: products.length,
    totalValue,
    categories,
    lowStockItems,
  };
}
```

---

## Paso 4: Mostrar el reporte

**Abre `starter/src/index.ts`** y descomenta la sección del Paso 4:

```ts
import { readProducts } from './reader.js';
import { generateReport } from './processor.js';

// IIFE async — patrón común para el entry point de scripts Node.js
async function main(): Promise<void> {
  try {
    console.log('Reading product data...\n');

    const products = await readProducts();
    const report = generateReport(products);

    console.log('=== Product Report ===');
    console.log(`Total products: ${report.totalProducts}`);
    console.log(`Total inventory value: $${report.totalValue.toFixed(2)}`);
    console.log(`Categories: ${report.categories.join(', ')}`);

    if (report.lowStockItems.length > 0) {
      console.log('\n⚠️  Low stock items:');
      report.lowStockItems.forEach((p) => {
        console.log(`  - ${p.name} (stock: ${p.stock})`);
      });
    }
  } catch (error) {
    // En scripts Node.js, los errores no manejados terminan el proceso
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
```

Resultado esperado al ejecutar `pnpm dev`:

```
Reading product data...

=== Product Report ===
Total products: 8
Total inventory value: $2340.50
Categories: electronics, clothing, food
...
```

---

## ✅ Verificación Final

1. `pnpm dev` ejecuta sin errores
2. El reporte muestra datos correctos del archivo `products.json`
3. `pnpm build` compila sin errores TypeScript
4. Si borras un campo de `products.json` y recargas, el `try/catch` muestra el error sin crashear
