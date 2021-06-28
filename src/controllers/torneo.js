const { Torneo, Equipo, Ronda, Usuario } = require('../models')
const models = require('../models')
const otorneo = models.Torneo
const equipo = models.Equipo
const { Op } = require("sequelize")

const renderizar = (req, torneos, res) => {
  // PAGINACIÓN
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
  // PARA VER INSCRITOS DEL LIDER
  res.render('torneos', { listatorneos, rol, cantidadPaginas, pagActual, ids });
}

var id = 3
var ids = []
var rol

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
  */
  
// http://localhost:3000/torneos?p=1&cbAbierto=true&cbEnCurso=true&cbCerrado=true&cbInscrito=true&cbNoInscrito=true


  getTorneos: async (req, res) => {
    try {
      // BUSCAR ROL
      const us = await Usuario.findByPk(id)
      rol = us.rol
      // SI ES LIDER
      if (rol == 'lider') {
        // hallar id torneos inscritos
        equipo.findOne({
          where: {
            lider_id: id
          }
        }).then((eq) => {
          eq.getTorneos({
          }).then((torneos) => {
            torneos.forEach(function (t) {
              ids.push(t.id)
            });
          })
        })
        // SECCIÓN PARA FILTRAR
        if (req.query.cbAbierto != null) {
          var cbAbierto = ''
          var cbEnCurso = ''
          var cbCerrado = ''
          if (req.query.cbAbierto == 'true') cbAbierto = 'abierto'
          if (req.query.cbEnCurso == 'true') cbEnCurso = 'en curso'
          if (req.query.cbCerrado == 'true') cbCerrado = 'cerrado'

          if (req.query.cbInscrito == 'true' && req.query.cbNoInscrito == 'true') {
            Torneo.findAll({
              where: {
                estado: { [Op.or]: [cbAbierto, cbEnCurso, cbCerrado].filter(e => e != '') }
              }
            }).then((torneos) => {
              renderizar(req, torneos, res)
            })
          }
          else {
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
                // SOLO TORNEOS INSCRITOS
                if (req.query.cbInscrito == 'true' && req.query.cbNoInscrito == 'false') {
                  renderizar(req, torneos, res)
                }
                // SOLO TORNEOS NO INSCRITOS
                else if (req.query.cbInscrito == 'false' && req.query.cbNoInscrito == 'true') {
                  Torneo.findAll({
                    where: {
                      [Op.not]: { id: ids },
                    }
                  }).then((torneos2) => {
                    renderizar(req, torneos2, res)
                  })
                }
                // NINGUNO
                else res.send('No se encontraron torneos.')
              })
            })
          }
          
        }
        // SIN FILTROS
        else {
          otorneo.findAll()
            .then((torneos) => {
              renderizar(req, torneos, res)
            })
        }
      }

      // SI ES ORGANIZADOR

    } catch (err) {
      console.log(err)
      return res.send('Error');
    }
  },

  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  getTorneoById: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.torneoId, { include: Equipo });
      return res.render('torneo-equipos', { equipos: torneo.Equipos });
    } catch(err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  /**
  * @param {import('express').Request} req
  * @param {import('express').Request} res
  *
  * Necesita en los parametros `torneoId` y `rondaId`
  */
  getRondaByTorneoId: async (req, res) => {
    const { rondaId } = req.params;
    try {
      const ronda = await Ronda.findByPk(rondaId, { include: 'partidas' });
      if (ronda) {
        return res.render('ronda-partidas', { ronda });
      } else {
        return res.send('404');
      }
    } catch(err) {
      return res.send('Error');
    }
  }
}


/*
      // filtros del lider
      if(req.query.cbAbierto != null){

      }*/
