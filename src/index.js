const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const db = require('./db')
const { routerConnection } = require('./routes');
const { PORT, SECRET_KEY, SESSION_NAME, DB_MONGODB_URI } = require('./config/env');
const app = express();


// Express global config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Session config
const MongoStore = require('connect-mongo');
app.use(session({
  name: SESSION_NAME,
  secret: SECRET_KEY,
  store: MongoStore.create({
    mongoUrl: DB_MONGODB_URI,
  }),
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}));

// View Engine config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'layouts/main'));
app.set('layout extractScripts', true);


// Middlewares
app.use(require('./middlewares/locals').roleRequestMiddleware);
app.use(require('./middlewares/locals').emailjsKeysMiddleware);


// Routes middlewares
routerConnection(app);

app.listen(PORT, async () => {
  console.log('Server running in port', PORT);
  // true significa que se eliminarán las tablas y se volverán a crear cada que se inicie la app
  try {
    await db.sync({ force: false });
    require('./mongo/db')();
    //require('../seed')
    console.log('DB connectado');
  } catch(err) {
    console.log(err);
  }
});
