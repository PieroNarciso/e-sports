module.exports = {
  /**
   * Renderiza la pagina principal de la aplicacion
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  mainPage: (req, res) => {
    res.render('index');
  },
};
