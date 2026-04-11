# Glosario — Semana 09: Testing

Términos clave ordenados alfabéticamente.

---

## A

**AAA (Arrange-Act-Assert)**
Patrón de estructura para tests. _Arrange_: preparar datos y mocks. _Act_: ejecutar la función que se testea. _Assert_: verificar el resultado.

**Assertion**
Verificación explícita de un resultado esperado. En Jest: `expect(valor).toBe(esperado)`. Un test sin assertions pasa siempre pero no verifica nada.

---

## B

**Branch Coverage**
Porcentaje de ramas condicionales (`if`/`else`/`switch`) ejecutadas por los tests. Requiere testear tanto el camino verdadero como el falso de cada condición.

---

## C

**clearAllMocks**
Función de Jest que resetea el historial de llamadas de todos los mocks (cuántas veces llamados, con qué argumentos), pero mantiene la implementación. Se puede configurar automáticamente con `clearMocks: true` en `jest.config.ts`.

**Coverage Threshold**
Umbral mínimo de cobertura configurado en `jest.config.ts`. Si el coverage cae por debajo, `jest --coverage` falla con exit code 1, bloqueando el CI/CD.

---

## D

**describe()**
Función de Jest para agrupar tests relacionados. Se puede anidar. Equivale a una "suite" de tests. Los `beforeEach`/`afterEach` dentro de un `describe` solo aplican a los tests de ese bloque.

---

## F

**Function Coverage**
Porcentaje de funciones del código que fueron invocadas al menos una vez durante la ejecución de los tests.

---

## H

**Happy Path**
El flujo principal de éxito de una función, sin errores ni casos extremos. Es el primer test que se escribe; luego se agregan los tests de error.

**Hoisting**
Comportamiento de Jest que mueve automáticamente `jest.mock()` al inicio del archivo, antes de cualquier `import`. Permite que el mock esté activo cuando se cargan los módulos.

---

## I

**Integration Test**
Test que verifica la interacción entre múltiples capas del sistema (HTTP → controller → service → DB). En Express, se usa Supertest y mongodb-memory-server para simular el ciclo completo sin infra real.

---

## J

**jest.fn()**
Crea una función mock vacía. Registra todas sus llamadas y permite configurar valores de retorno con `mockReturnValue()` o `mockResolvedValue()`.

**jest.mock()**
Reemplaza un módulo completo con una versión mock. Se usa para aislar la unidad bajo prueba de sus dependencias.

**jest.spyOn()**
Crea un mock parcial sobre una función existente de un objeto. Permite restaurar la implementación original con `mockRestore()`.

---

## L

**Line Coverage**
Porcentaje de líneas de código ejecutadas. Es el indicador más visible en los reportes. Una línea "no cubierta" aparece en la columna `Uncovered Line #s` del reporte.

---

## M

**Mock**
Sustituto controlado de una dependencia real (función, módulo, servicio externo). Permite testear código en aislamiento sin conectarse a una DB, API, o sistema externo.

**mockResolvedValue()**
Configura un `jest.fn()` para devolver una Promise resuelta con el valor dado. Equivale a `mockImplementation(() => Promise.resolve(valor))`. Se usa para simular funciones async.

**mockRejectedValue()**
Configura un `jest.fn()` para devolver una Promise rechazada. Se usa para simular errores async en dependencias.

**mongodb-memory-server**
Librería que ejecuta una instancia de MongoDB en RAM durante los tests. Sin Docker, sin persistencia entre ejecuciones. Se crea con `MongoMemoryServer.create()` y se detiene con `mongod.stop()`.

---

## R

**Red-Green-Refactor**
Ciclo del Test Driven Development (TDD): escribir un test que falla (Red), implementar el mínimo código para que pase (Green), limpiar sin romper los tests (Refactor).

**resetAllMocks**
Similar a `clearAllMocks` pero también elimina la implementación mock. Útil cuando se quiere que el mock vuelva a ser una función vacía.

---

## S

**Statement Coverage**
Porcentaje de declaraciones/sentencias del código ejecutadas. Métrica más general que line coverage.

**Supertest**
Librería para testear aplicaciones HTTP sin iniciar un servidor real en un puerto. Importa `app` directamente y crea un servidor temporal por petición.

---

## T

**TDD (Test Driven Development)**
Metodología de desarrollo donde los tests se escriben antes que el código de implementación. Ciclo: Red → Green → Refactor.

**Test Double**
Término genérico para cualquier sustituto de prueba: mock, stub, spy, fake, dummy.

**toHaveBeenCalledWith()**
Assertion de Jest para verificar que un mock fue llamado con argumentos específicos.

**toMatchObject()**
Assertion de Jest que verifica que un objeto contiene al menos las propiedades esperadas (no necesita igualdad exacta). Útil para verificar errores parciales: `expect(err).toMatchObject({ statusCode: 409 })`.

---

## U

**Unit Test**
Test que verifica una unidad de código (función, clase, método) en aislamiento total de sus dependencias. Las dependencias se reemplazan con mocks. Es el nivel más rápido y barato de la pirámide de testing.
