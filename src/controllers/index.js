const express = require('express');

module.exports = {
  /**
   * Renderiza la pagina principal de la aplicacion
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  mainPage: (_, res) => {
    const equipos = [
      {
        nombre: 'Leon',
        activo: true,
        integrantes: ['Integrante1', 'Integrante2'],
      },
      {
        nombre: 'Cobra',
        activo: false,
        integrantes: ['Integrante 1', 'Integrante 2'],
      },
    ];
    res.render('index', { equipos });
  },
};
