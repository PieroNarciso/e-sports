const {
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
  EMAIL_USER_ID,
} = require('../config/env');

module.exports = {
  /**
   * @param {import('express').Request & import('express-session').SessionData} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   *
   * Middleware para asignar el rol del usuario logueado, si es que no hay un
   * usuario logueado el valor es un string vacio `''`. Por otro lado, toma
   * el valor de `Usuario.rol` del modelo `Usuario` en sequelize
   *
   * Esto permite acceder a una variable global: `globalRol` en cualquier
   * view, layout o partial {ejs}
   */
  roleRequestMiddleware: (req, res, next) => {
    res.locals.globalRol = req.session.rol ? req.session.rol : '';
    next();
  },

  /**
   * @param {import('express').Request & import('express-session').SessionData} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   *
   * Middleware para obtener las keys de emailjs en los archivos ejs
   */
  emailjsKeysMiddleware: (_, res, next) => {
    res.locals.EMAIL_SERVICE_ID = EMAIL_SERVICE_ID ? EMAIL_SERVICE_ID : '';
    res.locals.EMAIL_TEMPLATE_ID = EMAIL_TEMPLATE_ID ? EMAIL_TEMPLATE_ID : '';
    res.locals.EMAIL_USER_ID = EMAIL_USER_ID ? EMAIL_USER_ID : '';
    next();
  },
};
