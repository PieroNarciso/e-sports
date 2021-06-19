const express = require('express');

const userRoute = require('./user')

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('/user', userRoute);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
