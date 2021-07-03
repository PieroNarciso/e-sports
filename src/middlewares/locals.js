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
    res.locals.globalRol = req.session.rol? req.session.rol : '';
    next();
  }
}
