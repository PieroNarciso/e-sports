const { Torneo, Equipo, Ronda, Usuario, Partida, torneo_equipo } = require('../models')
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

var id
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
  
  getTorneos: async (req, res) => {
    try {
      // PARA EL SPA
      if (req.query.spa == 'true') {
        const torneosSPA = await Torneo.findAll({
          include: Equipo,
          where: {
            estado: 'en curso'
          }
        })
        const inscritosSPA = []
        torneosSPA.forEach(function (t) {
          var cont = 0
          if (t.Equipos.length > 0) {
            t.Equipos.forEach(function (e) {
              if (e.torneo_equipo.estado == 'activo') {
                cont++
              }
            })
          }
          var elem = {
            id: t.id,
            activos: cont
          }
          inscritosSPA.push(elem)
        })
        return res.send({
          torneos: torneosSPA,
          inscritos: inscritosSPA
        })
      }
      // PARA MVC
      else {
        id = req.session.userId
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
        }).then(() => {
          // SI ES LIDER
          if (rol == 'lider') {
            // hallar id torneos inscritos
            Equipo.findOne({
              where: {
                lider_id: id
              }
            }).then((eq) => {
              ids = []
              eq.getTorneos({
              }).then((torneos) => {
                torneos.forEach(function (t) {
                  ids.push(t.id)
                });
              })
            }).then(() => {
              // FILTROS
              if (req.query.cbAbierto != null) {
                var cbAbierto = ''
                var cbEnCurso = ''
                var cbCerrado = ''
                if (req.query.cbAbierto == 'true') cbAbierto = 'abierto'
                if (req.query.cbEnCurso == 'true') cbEnCurso = 'en curso'
                if (req.query.cbCerrado == 'true') cbCerrado = 'cerrado'

                if (req.query.cbInscrito == 'true' && req.query.cbNoInscrito == 'true') {
                  Torneo.findAll({
                    include: Equipo,
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
                          include: Equipo,
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
            })
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
                  renderizar(req, torneos, res)
                })
              }
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
  eliminar: async (req, res) => {
    try {
      const t = await Torneo.findByPk(req.body.identif)
      await t.destroy();
      res.redirect('/torneos')
    } catch {
      console.log(err);
      res.status(500).send(err);
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
  },

  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  *
  * Params:
  *   -- torneoId: number - Torneo id
  */
  inscribirEquipo: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.torneoId, { include: Equipo });
      const equipo = await Equipo.findOne({ where: { lider_id: req.session.userId }});

      await torneo.addEquipo(equipo, { through: { estado: 'activo' } });
      return res.status(200).redirect('/torneos');
    } catch(err) {
      return res.status(500).redirect('/torneos');
    }
  },

  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  *
  * Cambiar el estado del torneo a `en curso`
  * Params:
  *   - id: number Torneo id
  *
  * 1. Verificar que el numero de equipos no sea mayor a 6
  */
  changeTorneoToEnCurso: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.id, {
        include: {
          model: Equipo,
          where: {
            '$Equipos.torneo_equipo.estado$': 'activo'
          }
        }
      });

      if (torneo.Equipos.length < 2) {
        return res.send({ msg: 'Hay menos de 2 equipos' });
      }
      if (torneo.Equipos.length > 6) {
        // Retornar mensaje de error en el ejs
        return res.send({ msg: 'Hay más de 6 equipos' });
      }

      const rondas = [];

      for (let i = 0; i < torneo.Equipos.length-1; ++i) {
        const ronda = await Ronda.create({ torneo_id: torneo.id });
        rondas.push(ronda);
      }

      for (let i = 0; i < torneo.Equipos.length; ++i) {
        let rondaNum = 1;
        for (let j = 0; j < torneo.Equipos.length; ++j) {
          if (i !== j) {
            await Partida.create({
              ronda_id: rondas[rondaNum-1].id,
              equipo_A: torneo.Equipos[i].nombre,
              equipo_B: torneo.Equipos[j].nombre,
              resultado_A: parseInt(Math.random()*(5 - 3)+3),
              resultado_B: parseInt(Math.random()*(2 - 1)+1)
            });
            rondaNum++;
          }
        }
      }
      return res.redirect('/torneos');
    } catch(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  getPosiciones: async (req, res )=>{
    try{
      var id= req.params.id;
      const torneo = await Torneo.findByPk(id,
      {include: [{ model: Equipo}, {model: Ronda, as: "rondas", include: {model: Partida, as: "partidas"}}]
      })
      res.render('posiciones',{lequipo: torneo.Equipos, rpta: torneo})
    }catch(error){
      res.status(500).send(error)
    }
  },

  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  *
  * Recibe en params `torneoId`
  */
  editarTorneo: async (req, res) => {
    try {
      const torneo = await Torneo.findByPk(req.params.torneoId, {
        include: {
          model: Equipo,
        }
      });
      torneo.Equipos = torneo.Equipos.filter(equipo => {
        equipo.torneo_equipo.estado == 'activo'
      })
      return res.render('editar-torneo', { torneo });
    } catch(err) {
      return res.status(500).send(err);
    }
  },

  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  *
  * Recibe en params `torneoId`
  */
  postEditarTorneo: async (req, res) => {
    try {
      await Torneo.update(
        {...req.body},
        { where: { id: req.params.torneoId } }
      );
      return res.redirect('/torneos');
    } catch(err) {
      return res.status(500).send(err);
    }
  }

}
