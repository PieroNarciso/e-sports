# E-Sport Project

## Como correr el proyecto

### Desarrollo

Instalar las dependencias de `npm`

```bash
$ npm install
```

Crear un arhico `.env` en el root del proyecto teniendo como ejemplo el archivo `.env.sample` que contengan las variables de la base de datos de desarrollo.

```bash
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_DATABASE=<database>
DB_HOST=<host>
DB_MONGODB_URI=<mongodb-uri>
EMAIL_SERVICE_ID=<emailjs-service-id | optional>
EMAIL_TEMPLATE_ID=<emailjs-template-id | optional>
EMAIL_USER_ID=<emailjs-user-id | optional>
```

Compilar tailwindcss y se genera un archivo en el path `./src/public/css/index.css`
> Esto se realizará cada vez que se cambie alguna configuración de tailwindcss

```bash
$ npm run dev:tailwind
```

> En caso se quiera iniciar el project con los seeders, correr `npm run seed`

Correr el script de desarrollo

```bash
$ npm run dev
```

### Producción

Instalar las dependencias de `npm`

```bash
$ npm install
```

Compilar tailwindcss en modo produccion

```bash
$ npm run build:tailwind
```

Crear un arhico `.env` en el root del proyecto teniendo como ejemplo el archivo `.env.sample` que contengan las variables de producción de la base de datos.

```bash
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_DATABASE=<database>
DB_HOST=<host>
DB_MONGODB_URI=<mongodb-uri>
NODE_ENV=production
EMAIL_SERVICE_ID=<emailjs-service-id | optional>
EMAIL_TEMPLATE_ID=<emailjs-template-id | optional>
EMAIL_USER_ID=<emailjs-user-id | optional>
```

Para incluir los seeders iniciales ejecutar lo siguiente (al inicializar los seeder, se hace `DROP` a las tablas de la `base de datos`)

```bash
$ npm run seed
```

Correr el script de producción (compila tailwind e inicializa el servidor)

```bash
$ npm run start
```

## Estructura del proyecto

### Stack

* Express
* Sequelize (postgres)
* Vue
* Mongoose (mongodb)

### Estructura del proyecto

* `/src`: contiene el código fuente
    * `/config`: contiene la configuracion para la base de datos y variables de entorno del proyecto.
    * `/controllers`: contiene los controladores para las rutas.
    * `/layouts`: contiene los layout en ejs que se van a mostrar en las distintas vistas.
    * `/migrations`: contiene las migraciones que se realicen a la base de datos (postgres).
    * `/middlewares`: contiene los middlewares de atenticación de los usuarios y otros.
    * `/models`: contiene los modelos de las tablas de la base de datos (postgres|mongodb).
    * `/partials`: contiene partials en ejs de distintos componentes reutilizables.
    * `/public`: contiene las hojas de estilos y javascript.
    * `/routes`: configuración y rutas del proyecto
    * `/seeders`: contiene los inserts inicial de la base de dato (`npm run seed`)
    * `/views`: contiene las vistas que se van a renderizar en su respectiva ruta.
    * `/index.js`: contiene la aplicación y su configuración inicial.
* `/package.json`: Contiene las dependencias del proyecto y scripts
* `/.sequelizerc`: Configuración del ORM para postgres


## Ingredientes
* Piero Narciso
* Alessandra Nuñez
* Sebastián Bañón
* Maricielo Jara
