const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const { routerConnection } = require('./routes');
const { PORT, SECRET_KEY } = require('./config/env');

const app = express();

// Express global config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let secure = false;
if (process.env.NODE_ENV === 'production') {
  secure = true;
}

app.use(session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure }
}));

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
});
