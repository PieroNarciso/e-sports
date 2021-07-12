module.exports = {
  /**
   * Renderiza la pagina principal de la aplicacion
   *
   * @param {import('express').Request & import('express-session').SessionData} req
   * @param {import('express').Response} res
   */
  mainPage: (req, res) => {
    if (!req.session.rol || req.session.rol.length === 0) {
      return res.render('spa');
    }
    if (req.session.rol === 'admin') {
      return res.redirect('/user');
    }
    return res.redirect('/torneos');
  },
};
