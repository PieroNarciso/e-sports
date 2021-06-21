const express = require('express');

const { mainPage } = require('../controllers');

const userRoute = require('./user')
const torneoRoute = require('./torneo')

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('/', mainPage);

  app.use('/user', userRoute);
  // Rutas (ALE)
  app.use('/torneo', torneoRoute);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
