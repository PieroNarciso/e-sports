const express = require('express');

/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
