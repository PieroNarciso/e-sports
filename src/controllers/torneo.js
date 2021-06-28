const models = require('../models')
const otorneo = models.Torneo
const equipo = models.Equipo
const oTorneoEquipo = models.torneo_equipo
const { Op } = require("sequelize")
const { Equipo } = require('../models')

const renderizar = (req, torneos, res) => {
  if (req.query.p == undefined) var pagActual = 1
  else var pagActual = req.query.p
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
    var id = 3
    // SECCIÓN PARA FILTRAR
    if (req.query.cbAbierto != null) {
      var cbAbierto = ''
      var cbEnCurso = ''
      var cbCerrado = ''
      if (req.query.cbAbierto == 'true') cbAbierto = 'abierto'
      if (req.query.cbEnCurso == 'true') cbEnCurso = 'en curso'
      if (req.query.cbCerrado == 'true') cbCerrado = 'cerrado'
      console.log(req.query)
      // SOLO TORNEOS INSCRITOS
      if (req.query.cbInscrito == 'true' && req.query.cbNoInscrito == 'false') {
        equipo.findOne({
          where: {
            lider_id: id
          }
        }).then((eq) => {
          eq.getTorneos({
            where: {
              estado: { [Op.or]: [cbAbierto, cbEnCurso, cbCerrado].filter(e => e != '') }
            }
          }).then((torneos) => {
            renderizar(req, torneos, res)
          })
        }).catch((err) => {
          console.log("Ocurrió un error: " + err)
        })
      }
      // SOLO NO INSCRITOS
      else if (req.query.cbInscrito == 'false' && req.query.cbNoInscrito == 'true') {
        equipo.findOne({  // hallar id del equipo
          where: { lider_id: id }
        }).then((eq) => {
          console.log(eq.id)
          otorneo.findAll({
            include: [{
              model: Equipo,
              through: {
                attributes: ['EquipoId', 'TorneoId'],
                where: { [Op.not]: [{ EquipoId: eq.id }]}
              }
            }]
          }).then((torneos) => {
            console.log(torneos)
            res.send(torneos)
          }).catch((err) => { console.log("Ocurrió un error: " + err) })
        }).catch((err) => { console.log("Ocurrió un error: " + err) })
      }
    } else if (req.query.txtNombre != null) {
      
    } 
    // SIN FILTROS
    else {
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