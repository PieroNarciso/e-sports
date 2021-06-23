module.exports = {
  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  getTorneos: (req, res) => {
    const torneos = [
      { estado: 'activo', nombre: 'Trueno Lima', inscrito: true, registrados: 4, max: 6}
    ]
    res.render('torneos', { torneos });
  }
}
