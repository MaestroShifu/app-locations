# app-locations-api

## Requerimientos
- node v14.15.4
- yarn v1.22.5

## Comandos
- Para correr en produccion: ```yarn start```
- Para correr en desarrollo: ```yarn start:dev```
- Para correr en modo debug: ```yarn start:debug```
- Crear transpilado de ts a js: ```yarn build```
- Sirve para correr los test: ```yarn test```
- Sirve para ejecutar la migraciones: ```yarn migration:up```
- Sirve para crear migraciones: ```yarn migration:create```
- Sirve para retroceder el ultimo bloque de migraciones: ```yarn migration:rollback```
- Sirve para limpiar todas las tablas de la base de datos: ```yarn migration:rollback:all```
- Lista las migraciones: ```yarn migrate:list```
- Sirve para crear seeders: ```yarn seed:create```
- Sirve para lanzar todos los datos semilla: ```yarn seed:run```
- Sirve para correr todos los test de la aplicacion: ```yarn test```
- Sirve para estar pendiente a cambios en los test: ```yarn test:watch```
- Sirve para hacer debug de los test: ```yarn test:debug```

## Como correr el proyecto
- Creamos una red en docker: ```docker network create dev_network```
- Nos vamos a la carpeta postgres_db y corremos: ```docker-compose up -d```
- Las credenciales para conectarse a nuestra db son:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: root
    POSTGRES_PORT: 5432
    POSTGRES_DB: location_db
- Instalamos las dependencias del proyecto ```yarn install```
- Corremos las migracion: ```yarn migration:up```
- Si vamos a correr la app en modo desarrollo: ```yarn start:dev```
- Si vamos correr la app en produccion:
    1. ```yarn build```
    2. Cambiar nuestra variable de entorno a ```prod```
    3. Corremos por ultimo: ```yarn start```