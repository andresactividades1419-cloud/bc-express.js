# Semana 09: Testing — Jest + Supertest

## 🎯 Objetivos de Aprendizaje

Al finalizar esta semana, serás capaz de:

- ✅ Configurar Jest con TypeScript usando `ts-jest` en un proyecto Express
- ✅ Escribir tests unitarios para la capa de servicios con mocks de dependencias
- ✅ Usar `jest.fn()`, `jest.mock()` y `jest.spyOn()` para aislar unidades
- ✅ Escribir tests de integración para endpoints HTTP con Supertest
- ✅ Usar `mongodb-memory-server` para tests con MongoDB sin base de datos real
- ✅ Medir y configurar umbrales de cobertura de código (`--coverage`)
- ✅ Aplicar el patrón `describe/it/expect` con hooks de ciclo de vida
- ✅ Distinguir qué y cuándo testear: unitario vs integración

## 📚 Requisitos Previos

- Semana 07 completada: JWT, bcrypt, cookies HttpOnly
- Semana 08 completada: RBAC, Helmet, rate limiting, CORS
- Comprensión de arquitectura en capas: routes → controllers → services → repositories

## 🗂️ Estructura de la Semana

```
week-09-testing/
├── README.md
├── rubrica-evaluacion.md
├── 0-assets/
│   ├── 01-test-pyramid.svg
│   ├── 02-supertest-flow.svg
│   └── 03-coverage-report.svg
├── 1-teoria/
│   ├── 01-jest-configuracion.md
│   ├── 02-unit-tests.md
│   ├── 03-integration-tests.md
│   └── 04-mocks-cobertura.md
├── 2-practicas/
│   ├── ejercicio-01-unit-tests/
│   └── ejercicio-02-integration-tests/
├── 3-proyecto/
├── 4-recursos/
└── 5-glosario/
```

## 📝 Contenidos

### Teoría

| Archivo | Tema |
|---------|------|
| [01-jest-configuracion.md](1-teoria/01-jest-configuracion.md) | Instalación, `jest.config.ts`, `describe/it/expect`, lifecycle hooks |
| [02-unit-tests.md](1-teoria/02-unit-tests.md) | Tests unitarios con `jest.fn()`, `jest.mock()`, testing de services |
| [03-integration-tests.md](1-teoria/03-integration-tests.md) | Supertest, `mongodb-memory-server`, testing de endpoints HTTP |
| [04-mocks-cobertura.md](1-teoria/04-mocks-cobertura.md) | Módulos mock, cobertura de código, umbrales, qué no testear |

### Prácticas

| Ejercicio | Tema |
|-----------|------|
| [ejercicio-01-unit-tests](2-practicas/ejercicio-01-unit-tests/) | Tests unitarios del servicio de autenticación con mocks |
| [ejercicio-02-integration-tests](2-practicas/ejercicio-02-integration-tests/) | Tests de integración de rutas HTTP con Supertest |

## ⏱️ Distribución del Tiempo (8 horas)

| Actividad | Tiempo |
|-----------|--------|
| Teoría: Jest config + unit tests (01-02) | 2h |
| Ejercicio 01: Unit tests | 2h |
| Teoría: integration tests + mocks (03-04) | 1h |
| Ejercicio 02: Integration tests | 2h |
| Proyecto semanal | 1h |

## 📌 Entregables

1. **Ejercicio 01**: Suite de unit tests para `auth.service.ts` con mocks — todos los tests pasando
2. **Ejercicio 02**: Suite de integration tests para rutas `/auth` con Supertest + `mongodb-memory-server`
3. **Proyecto**: Tests unitarios e integration para la API de tu dominio con cobertura ≥ 80%

## 🔗 Navegación

- ← [Semana 08: Autorización y Seguridad](../week-08-autorizacion_seguridad/README.md)
- → [Semana 10: Uploads y Emails](../week-10-uploads_emails/README.md)
