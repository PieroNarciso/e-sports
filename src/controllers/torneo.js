const models = require('../models')
const otorneo = models.Torneo
const oTorneoEquipo = models.torneo_equipo
const { Op } = require("sequelize")

const renderizar = (req, torneos, res) => {
  var pagActual = req.query.p
  var cantidadPaginas = Math.round((torneos.length / 5) + 0.5)
  var inicio = (pagActual - 1) * 5
  var fin = pagActual * 5
  if (pagActual == cantidadPaginas) {
    var listatorneos = torneos.slice(inicio)
  } else {
    var listatorneos = torneos.slice(inicio, fin)
  }
  const rol = 'lider'
  res.render('torneos', { listatorneos, rol, cantidadPaginas, pagActual });
}

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
  */
  
// http://localhost:3000/torneos?p=1&cbAbierto=true&cbEnCurso=true&cbCerrado=true&cbInscrito=true&cbNoInscrito=true


  getTorneos: (req, res) => {
    if (req.query.cbAbierto != null) {
      var cbAbierto = ''
      var cbEnCurso = ''
      var cbCerrado = ''
      if (req.query.cbAbierto == 'true') cbAbierto = 'abierto'
      if (req.query.cbEnCurso == 'true') cbEnCurso = 'cerrado'
      if (req.query.cbCerrado == 'true') cbCerrado = 'inactivo'
      console.log(req.query)
      otorneo.findAll({
        where: {
          // torneos abiertos
          estado: { [Op.or]: [cbAbierto, cbEnCurso, cbCerrado].filter(e => e != '') }
        }
      }).then((torneos) => {
        renderizar(req, torneos, res)
      }).catch((err) => {
        console.log("Ocurrió un error: " + err)
      })


    } else if (req.query.txtNombre != null) {
      
    } else {
      otorneo.findAll()
        .then((torneos) => {
          renderizar(req, torneos, res)
        }).catch((err) => {
          console.log("Ocurrió un error: " + err)
        })
    }
        // PARÁMETRO: NÚMERO DE PÁGINA

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
      
  }
}


/*
      // filtros del lider
      if(req.query.cbAbierto != null){

      }*/