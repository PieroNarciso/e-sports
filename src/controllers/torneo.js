const models = require('../models')
const otorneo = models.Torneo
const oTorneoEquipo = models.torneo_equipo
module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  getTorneos: (req, res) => {
    otorneo.findAll()
      .then((torneos) => {
        /*var sessionId = 3
        var listaInscritos = []
        oTorneoEquipo.findAll({
          where : {
            Equipos_lider_id_fkey: sessionId
          }
        }).then((lista) => {
          lista.forEach(element => {
            listaInscritos.push(element.)
          });
        })*/
        const rol = 'org'
        res.render('torneos', { torneos, rol });
      }).catch((err) => {
        console.log("Ocurrió un error: " + err)
      })
  }
}
