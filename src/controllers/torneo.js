module.exports = {
<<<<<<< HEAD
    getTorneos: (req, res) => {
        res.render('pantallaTorneo');
    },
}
=======
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
>>>>>>> f24a7f1604113386bff23ccb66602425f84fbefe
