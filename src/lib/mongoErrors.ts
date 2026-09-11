// ============================================
// MONGO ERRORS — Helper para detectar errores de MongoDB
// ============================================
// Mongoose 9 vendoriza su propia copia interna del driver `mongodb`
// (node_modules/mongoose/node_modules/mongodb), distinta de la que el
// proyecto declara como dependencia directa. Por eso `err instanceof
// MongoServerError` (importado del paquete de nivel superior) deja de
// funcionar: en tiempo de ejecución el error lanzado es una instancia de
// la clase `MongoServerError` del mongodb interno de mongoose, que NO es
// el mismo objeto de clase. Se verifica el error de forma estructural
// (duck typing) para que no dependa de qué copia del driver lo creó.
export function isMongoDuplicateKeyError(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    (err as { code?: unknown }).code === 11000
  );
}
