const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const { sequelize } = require('./models')
const { routerConnection } = require('./routes');
const { PORT } = require('./config/env');

const app = express();

// Express global config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'layouts/main'));
app.set('layout extractScripts', true);



// Routes middlewares
routerConnection(app);

app.listen(PORT, () => {
  console.log('Server running in port', PORT);
  // true significa que se eliminarán las tablas y se volverán a crear cada que se inicie la app
  sequelize.sync({ force: false }).then(() => {
    console.log('Conectado')
  }).catch(error => {
    console.log('error: ', error)
  })
});
