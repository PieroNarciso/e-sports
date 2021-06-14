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
```

Correr el script de desarrollo

```bash
$ npm run dev
```

### Producción

Instalar las dependencias de `npm`

```bash
$ npm install
```

Crear un arhico `.env` en el root del proyecto teniendo como ejemplo el archivo `.env.sample` que contengan las variables de producción de la base de datos.

```bash
DB_USERNAME=<username>
DB_PASSWORD=<password>
DB_DATABASE=<database>
DB_HOST=<host>
NODE_ENV=production
```

Correr el script de producción

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
    * `/models`: contiene los modelos de las tablas de la base de datos (postgres|mongodb).
    * `/partials`: contiene partials en ejs de distintos componentes reutilizables.
    * `/public`: contiene las hojas de estilos y javascript.
    * `/routes`: configuración y rutas del proyecto
    * `/views`: contiene las vistas que se van a renderizar en su respectiva ruta.
    * `/index.js`: contiene la aplicación y su configuración inicial.
* `/package.json`: Contiene las dependencias del proyecto y scripts
* `/.sequelizerc`: Configuración del ORM para postgres


## Integrantes
