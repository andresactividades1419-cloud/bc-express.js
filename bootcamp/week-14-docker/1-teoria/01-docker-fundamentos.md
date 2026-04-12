# Docker: Fundamentos

## 🎯 Objetivos

- Entender qué es Docker y por qué se usa en desarrollo backend
- Diferenciar imágenes, contenedores y capas
- Dominar los comandos esenciales del CLI de Docker

---

## 1. ¿Por qué Docker?

Antes de Docker, el problema clásico era: _"en mi máquina funciona"_.

Docker resuelve esto **empaquetando la aplicación junto con todas sus dependencias**
en una unidad portátil llamada **contenedor**. El contenedor corre igual en
cualquier sistema que tenga Docker instalado: laptop de desarrollo, servidor
de staging, producción en la nube.

Beneficios para APIs Express:

| Problema sin Docker | Solución con Docker |
|---------------------|---------------------|
| Versiones de Node.js distintas por equipo | Imagen fija `node:22-alpine` |
| "Funciona en mi máquina" | Mismo contenedor en todos los entornos |
| Configurar PostgreSQL / Redis manualmente | `docker-compose up` levanta todo |
| Dependencias del sistema (OpenSSL, etc.) | Incluidas en la imagen |

---

## 2. Arquitectura de Docker

```
┌─────────────────────────────────────────────┐
│                  Docker Host                │
│                                             │
│  ┌──────────────┐   ┌──────────────┐        │
│  │  Contenedor  │   │  Contenedor  │        │
│  │  (instancia) │   │  (instancia) │        │
│  └──────┬───────┘   └──────┬───────┘        │
│         │                  │                │
│  ┌──────▼──────────────────▼───────┐        │
│  │       Imagen (read-only)        │        │
│  │   Capas apiladas inmutables     │        │
│  └─────────────────────────────────┘        │
│                                             │
└─────────────────────────────────────────────┘
                     ▲
              Docker Registry
              (Docker Hub, ECR)
```

### Conceptos clave

| Concepto | Descripción |
|----------|-------------|
| **Image** | Plantilla inmutable de solo lectura construida desde un `Dockerfile` |
| **Container** | Instancia en ejecución de una imagen (tiene su propia capa de escritura) |
| **Layer** | Cada instrucción `RUN`, `COPY`, `ADD` del Dockerfile genera una capa cacheable |
| **Registry** | Repositorio de imágenes (Docker Hub, GitHub Container Registry, AWS ECR) |
| **Volume** | Almacenamiento persistente externo al ciclo de vida del contenedor |

---

## 3. Ciclo de vida de un contenedor

```
Dockerfile  →  docker build  →  Image  →  docker run  →  Container
                                              ↑                    ↓
                                         docker start         docker stop
                                                              docker rm
```

---

## 4. Comandos esenciales

### Construcción e imágenes

```bash
# Construir imagen desde el Dockerfile del directorio actual
docker build -t mi-api:1.0 .

# Listar imágenes locales
docker images

# Eliminar imagen
docker rmi mi-api:1.0

# Ver capas e historial de una imagen
docker history mi-api:1.0
```

### Contenedores

```bash
# Crear y arrancar un contenedor
docker run -d -p 3000:3000 --name api mi-api:1.0

# -d        → modo detached (background)
# -p 3000:3000 → mapeo host:container
# --name    → nombre del contenedor

# Ver contenedores en ejecución
docker ps

# Ver todos (incluyendo detenidos)
docker ps -a

# Ver logs
docker logs api
docker logs -f api   # follow (en tiempo real)

# Ejecutar comando dentro del contenedor
docker exec -it api sh

# Detener y eliminar
docker stop api
docker rm api
docker rm -f api   # forzar (detiene y elimina)
```

### Variables de entorno al arrancar

```bash
# Pasar variable individual
docker run -e NODE_ENV=production -p 3000:3000 mi-api:1.0

# Pasar archivo .env completo
docker run --env-file .env -p 3000:3000 mi-api:1.0
```

### Limpieza

```bash
# Eliminar contenedores parados, imágenes sin uso y caché
docker system prune

# Solo imágenes sin tag (dangling)
docker image prune
```

---

## 5. Flujo típico de desarrollo

```bash
# 1. Hacer cambio en el código
# 2. Reconstruir la imagen
docker build -t mi-api:dev .

# 3. Parar el contenedor anterior
docker stop api && docker rm api

# 4. Arrancar nuevo contenedor
docker run -d -p 3000:3000 --name api mi-api:dev

# 5. Verificar
curl http://localhost:3000/health
```

---

## ✅ Checklist de Verificación

- [ ] `docker --version` retorna versión 24+
- [ ] `docker build` crea una imagen sin errores
- [ ] `docker run` arrancar un contenedor y responde en el puerto esperado
- [ ] `docker logs` muestra los console.log del servidor
- [ ] `docker exec -it container sh` permite abrir una shell interactiva
