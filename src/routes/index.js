const express = require('express');

const { mainPage } = require('../controllers');

const userRoute = require('./user')
const torneoRoutes = require('./torneo');

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('^/$', mainPage);

  app.use('/user', userRoute);
  app.use('/torneos', torneoRoutes);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
