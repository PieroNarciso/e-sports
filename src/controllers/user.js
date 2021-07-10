const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const { Usuario, Equipo, Torneo, Ronda, Partida } = require('../models');
const { User } = require('../mongo');
const models = require('../models');
const usuario = models.Usuario;
const equipo = models.Equipo;
const { SESSION_NAME, SALT_ROUNDS } = require('../config/env');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   * Renderiza la pantalla del `Login` para diferentes usuarios
   * `admin | org | lider`
   */
  getLoginUser: (_, res) => {
    res.render('login', { msg: '' });
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response & import('express-session').SessionData} res
   *
   * Verifica la informacion otorgada por el usuario al hacer login
   */
  postLoginUser: async (req, res) => {
    const { email, password } = req.body;
    const msg = 'Email o contraseña incorrecto';
    try {
      // Se obtiene el usuario desde MongoDB
      const usr = await User.findOne({
        email,
      });
      // Usuario existe
      if (usr) {
        const isValid = await bcrypt.compare(password, usr.password);
        // Es valido, se loguea
        if (isValid) {
          // Se obtiene el mismo usuario en postgres
          // Para obtener el id (que es foreignKey en relaciones
          // con otras tablas, además del rol
          const user = await Usuario.findOne({ where: {
            correo: usr.email,
          }});
          req.session.userId = user.id;
          req.session.rol = user.rol;

          if (usr.rol == 'admin')
            return res.redirect('/user');
          return res.redirect('/torneos');
        }
        // No es valido
        return res.render('login', { msg });
      }
      // Usuario no existe
      return res.render('login', { msg });
    } catch (err) {
      return res.status(500).send('500 Server Error');
    }
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   * Destruye la session y el rol del usuario logueado
   */
  logoutUser: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).redirect('/');
      }
      return res.clearCookie(SESSION_NAME).redirect('/');
    });
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   * Se encarga de renderizar la opcion `usuarios` donde se muestra la lista de
   * usuarios y el boton para crear un usuario nuevo
   */
  getUsuarios: (_, res) => {
    res.render('usuarios');
  },

  //Get de la visa Registro
  registroUser: (req, res) => {
    const estado = true; //Si estado == true, no se mostrará el mensaje error en la pagina.
    res.render('registro', { estado: estado });
  },

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   *
   * Verifica si el correo ya existe o el equipo ya existe
   * En caso no exista, crea al Usuario y a su equipo
   */
  registroPostUser: async (req, res) => {
    const { correo, contrasena, nombre, equipo } = req.body;
    try {
      const userVerificar = await Usuario.findOne({ correo : correo });
      const equipoVerificar = await Equipo.findOne({ nombre: equipo });
      // Verifica que usuarios ni equipos ya exista en la BD
      if (userVerificar || equipoVerificar) {
        return res.render('registro', { estado: true });
      }
      // Hash del password
      const password = await bcrypt.hash(contrasena, SALT_ROUNDS);
      await Usuario.create({
        nombre_completo: nombre,
        correo,
        password,
      });
      // Mongo db Schema (para el login)
      await User.create({ email: correo, password });

      await Equipo.create({
        nombre: equipo,
        lista_integrantes: ['Gorila', 'Jirafa', 'Leon', 'Cobra']
      });
      return res.status('/login'); 
    } catch(err) {
      return res.status(500).send(err);
    }
  },
  //GET DEL PERFIL DEL LIDER
  perfilUser: (req, res) => {
    usuario
      .findAll({
        where: { id: req.session.userId },
      })
      .then((usuario) => {
        equipo
          .findAll({ where: { lider_id: usuario[0].id } })
          .then((equipo) => {
            res.render('perfilLider', {
              nombre: usuario[0].nombre_completo,
              correo: usuario[0].correo,
              equipo: equipo[0].nombre,
            });
          });
      });
  },
  //POST DEL PERFIL DEL LIDER
  perfilPostUser: (req, res) => {},
  //GET DEL ACTUALIZAR DEL LIDER
  perfilActualizarUser: (req, res) => {
    usuario
      .findAll({
        where: { id: req.session.userId },
      })
      .then((usuario) => {
        const estado = true; //Si estado == true, no se mostrará el mensaje error en la pagina.
        res.render('perfilLiderActualizar', { estado: estado, u: usuario[0] });
      });
  },
  //POST DEL ACTUALIZAR DEL LIDER
  perfilActualizarPostUser: (req, res) => {
    usuario.findByPk(req.session.userId).then((usuario_conectado) => {
      usuario
        .findAll({
          where: {
            correo: req.body.correo,
            id: { [Op.ne]: [req.session.userId] },
          },
        })
        .then((usuarios) => {
          if (usuarios.length > 0) {
            var estado = false; //Si estado == true, no se mostrará el mensaje error en la pagina.
            res.render('perfilLiderActualizar', {
              estado: estado,
              u: usuario_conectado[0],
            });
          } else {
            bcrypt
              .hash(req.body.contrasena, SALT_ROUNDS)
              .then((passHashed) => {
                req.body.contrasena = passHashed;
                usuario
                  .update(
                    {
                      nombre_completo: req.body.nombre,
                      correo: req.body.correo,
                      password: req.body.contrasena,
                    },
                    {
                      where: {
                        id: req.session.userId,
                      },
                    }
                  )
                  .then(() => {
                    res.redirect('/user/perfil');
                  })
                  .catch((error) => {
                    res.status(500).send(error);
                  });
              })
              .catch((err) => {
                return res.status(500).send(err);
              });
          }
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    });
  },
  //GET DEL EQUIPO
  equipoUser: (req, res) => {
    equipo
      .findAll({
        where: {
          lider_id: req.session.userId,
        },
      })
      .then((equipos) => {
        res.render('perfilEquipo', {
          equipo: equipos[0].nombre,
          integrantes: equipos[0].lista_integrantes,
        });
      });
  },
  //POST DEL EQUIPO
  equipoPostUser: (req, res) => {},
  //GET DEL EQUIPO ACTUALIZAR
  equipoActualizarUser: (req, res) => {
    equipo
      .findAll({
        where: {
          lider_id: req.session.userId,
        },
      })
      .then((equipo_usuario) => {
        const estado = true;
        res.render('perfilEquipoActualizar', {
          estado: estado,
          u: equipo_usuario[0],
        });
      });
  },
  //POST DEL EQUIPO ACTUALIZAR
  equipoActualizarPostUser: (req, res) => {
    equipo
      .findAll({
        where: {
          lider_id: req.session.userId,
        },
      })
      .then((equipo_usuario) => {
        equipo
          .findAll({
            where: {
              nombre: req.body.nombre,
              lider_id: { [Op.ne]: [req.session.userId] },
            },
          })
          .then((equipos_encontrados) => {
            if (equipos_encontrados.length > 0) {
              var estado = false; //Si estado == true, no se mostrará el mensaje error en la pagina.
              res.render('perfilEquipoActualizar', {
                estado: estado,
                u: equipo_usuario[0],
              });
            } else {
              equipo
                .update(
                  {
                    nombre: req.body.nombre,
                    lista_integrantes: req.body.integrante.split(','),
                  },
                  {
                    where: {
                      lider_id: req.session.userId,
                    },
                  }
                )
                .then((rpta) => {
                  res.redirect('/user/equipo');
                })
                .catch((error) => {
                  res.status(500).send(error);
                });
            }
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },

  //Botones
  BotonesUser: (req, res) => {
    var id = req.params.id;
    res.render('botones', { id: id });
  },

  //Posiciones
  PosicionesUser: (req, res) => {
    var id = req.params.id;
    res.render('posiciones');
    /*
    torneo_equipo.findAll({
      where:{
        torneo_id: id
      },
      include:[{
        
      }]
    })
    .then(equipostorneo=>{

    })*/
    /*Torneo.findByPk(id,
      {
        include: [
          {model: Equipo},
          {model: Ronda,include: Partida}]
      })
    .then(objeto => {
      var Lequipos= objeto.Equipo;
      var lrondas = objeto.Ronda;
      var lpartidas= objeto.Partida;
    })*/
  },
};
