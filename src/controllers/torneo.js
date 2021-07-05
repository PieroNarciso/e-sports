const { Torneo, Equipo, Ronda, Usuario, sequelize } = require('../models')
const { Op } = require("sequelize")

const asignar = (i) => {
  inscritos = []
  inscritos = i
}

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
  res.render('torneos', { listatorneos, rol, cantidadPaginas, pagActual, ids, inscritos });
}

var id = 2
// si es lider, almacena los ids de los torneos inscritos
// si es organizador, almacena los ids de los torneos que ha creado
var ids
var rol
var contador
// lista de "dictionaries" con el id del torneo y la cantidad de equipos activos del mismo torneo
var inscritos = []

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
      // BUSCAR CANTIDAD DE EQUIPOS ACTIVOS POR TORNEO
      /* Esto es para mostrar por cada torneo el numero de equipos activos inscritos sobre el máximo de equipos posibles*/
      Torneo.findAll({
        include: {
          model: Equipo
        }
      }).then((torneos) => {
        var x = []
        torneos.forEach(function (t) {
          contador = 0
          if (t.Equipos.length > 0) {
            t.Equipos.forEach(function (e) {
              if (e.torneo_equipo.estado == 'activo') {
                contador++
              }
            });
          }
          var d = {
            id: t.id,
            activos: contador
          }
          x.push(d)
        });
        asignar(x)
      })

      // SI ES LIDER
      if (rol == 'lider') {
        // hallar id torneos inscritos
        ids = []
        Equipo.findOne({
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
            Equipo.findOne({
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
          Torneo.findAll()
            .then((torneos) => {
              renderizar(req, torneos, res)
            })
        }
      }

      // SI ES ORGANIZADOR
      else if (rol == 'org') {
        ids = []
        // hallar id de los torneos creados
        Torneo.findAll({
          where: {
            organizador_id: id
          }
        }).then((torneos) => {
          torneos.forEach(function (t) {
            ids.push(t.id)
          })
        }).then(() => {
          // si el campo de texto está vacío o no se aplicó el filtro:
          if ((req.query.nomb == '') || (req.query.nomb == null)) {
            Torneo.findAll().then((torneos) => {
              console.log(ids)
              renderizar(req, torneos, res)
            })
          }
          // si hay filtro
          else {
            Torneo.findAll({
              where: {
                nombre: {
                  [Op.substring]: req.query.nomb
                }
              }
            }).then((torneos) => {
              console.log(torneos)
              renderizar(req, torneos, res)
            })
          }
        })
      }
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
