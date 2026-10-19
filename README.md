# Taller API de Personajes Marvel

Integrantes:

1. Laura Sarmiento - 202113056 
2. Tomas Sierra - 202221567

# 1. API de Personajes Marvel

API REST en NestJS para registrar personajes del universo Marvel y los equipos a los que pertenecen. Usa la base de datos PostgreSQL incluida en la raíz del repositorio.

## Requisitos

- Node.js 22+
- pnpm
- Docker

## Cómo correrlo

1. Levantar la base de datos (desde la raíz del repositorio):

   ```bash
   docker compose up -d
   ```

2. Crear el archivo `.env` dentro de `marvel-characters-api/`:

   ```bash
   cp ../.env.example .env
   ```

3. Instalar dependencias y arrancar:

   ```bash
   pnpm install
   pnpm start:dev
   ```

La API queda en `http://localhost:3000`.

## Endpoints

### Teams

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/teams` | Lista todos los equipos |
| GET | `/teams/:id` | Obtiene un equipo |
| GET | `/teams/:id/characters` | Lista los personajes del equipo |
| POST | `/teams` | Crea un equipo (acepta `characterIds` opcional) |
| PUT | `/teams/:id` | Reemplaza el equipo |
| PATCH | `/teams/:id/characters` | Asigna personajes (`characterIds`) |
| DELETE | `/teams/:id` | Elimina un equipo sin personajes |

### Characters

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/characters` | Lista personajes (filtros `?status=` y `?teamId=`) |
| GET | `/characters/:id` | Obtiene un personaje con su equipo |
| POST | `/characters` | Crea un personaje |
| PUT | `/characters/:id` | Reemplaza el personaje |
| PATCH | `/characters/:id/status` | Cambia solo el estado |
| DELETE | `/characters/:id` | Elimina un personaje |


# 2. Base de datos

Este repositorio **solo** contiene la base de datos PostgreSQL con datos de prueba.
El proyecto NestJS lo deben crear ustedes desde cero, en una carpeta aparte.

## Requisitos
- Docker Desktop (o Docker Engine + Docker Compose)

## Levantar la base de datos
```bash
docker compose up -d
```
La primera vez se crean las tablas `teams` y `characters` y se cargan los datos iniciales.

## Datos de conexión
| Dato       | Valor       |
|------------|-------------|
| Host       | localhost   |
| Puerto     | 5433        |
| Usuario    | marvel      |
| Contraseña | marvel123   |
| Base       | marvel_db   |

(Se usa el puerto 5433 para no chocar con un PostgreSQL que ya tengan instalado.)

## Comandos útiles
```bash
docker compose ps          # ver si está corriendo
docker compose logs -f     # ver logs
docker compose down        # apagar (los datos se conservan)
docker compose down -v     # apagar y BORRAR datos (al subir de nuevo se recargan los iniciales)
docker exec -it marvel_db psql -U marvel -d marvel_db   # consola SQL
```