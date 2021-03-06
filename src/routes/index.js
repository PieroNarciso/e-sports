const express = require('express');

const { mainPage } = require('../controllers');
const { getLoginUser, postLoginUser, logoutUser } = require('../controllers/user');
const { authSession } = require('../middlewares/auth');

const userRoute = require('./user')
const torneoRoutes = require('./torneo');


/**
  * @param {express.Express} app
  */
const routerConnection = (app) => {

  app.use('^/$', mainPage);
  
  app.get('/login', getLoginUser);
  app.post('/login', postLoginUser);
  app.post('/logout', authSession, logoutUser);

  app.use('/user', userRoute);
  app.use('/torneos', torneoRoutes);

  app.use((_, res) => {
    res.render('notFound');
  });
}

module.exports = {
  routerConnection,
}
