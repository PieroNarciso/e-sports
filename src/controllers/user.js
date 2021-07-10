const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const { Usuario, Equipo, Torneo, Ronda, Partida , torneo_equipo} = require('../models');
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
      const usr = await Usuario.findOne({
        where: { correo: email },
      });
      // Usuario existe
      if (usr) {
        const isValid = await bcrypt.compare(password, usr.password);
        // Es valido, se loguea
        if (isValid) {
          req.session.userId = usr.id;
          req.session.rol = usr.rol;

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

  //Post de la vista Registro
  registroPostUser: (req, res) => {
    estado = true; //Si estado == true, no se mostrará el mensaje error en la pagina.
    usuario
      .findAll({
        //Encuentra todos los usuarios, donde el correo del registro sea igual.
        where: { correo: req.body.correo },
      })
      .then((lusur) => {
        if (lusur.length > 0) {
          //si el tamaño es mayor que 0 entonces si hay usuario.
          const estado = false; //ERROR
          res.render('registro', { estado: estado }); //Se envia para mostrar con el error
        } else {
          equipo
            .findAll({
              //Encuentra todos los equipos donde el nombre a crear sea el mismo
              where: {
                nombre: req.body.equipo,
              },
            })
            .then((lequip) => {
              if (lequip.length > 0) {
                //si el tamaño es mayor que 0 entonces si hay equipo.
                const estado = false; //ERROR
                res.render('registro', { estado }); //Se envia para mostrar con el error
              } else {
                bcrypt
                  .hash(req.body.contrasena, SALT_ROUNDS)
                  .then((passHashed) => {
                    req.body.contrasena = passHashed;
                    Usuario.create({
                      //se crea usuario
                      nombre_completo: req.body.nombre,
                      correo: req.body.correo,
                      password: req.body.contrasena,
                      rol: 'lider',
                    })
                      .then((rpta) => {
                        //se crea equipo
                        Equipo.create({
                          nombre: req.body.equipo,
                          lista_integrantes: ['Gorila', 'leon', 'perro'],
                          lider_id: rpta.id, //Se le asigna el id del participante lider creado al euqipo
                        })
                          .then((rpta) => {
                            res.redirect('/login'); // Se redirecciona.
                          })
                          .catch((error) => {
                            res.status(500).send(error);
                          });
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
          }
        }) 
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
            if(req.body.contrasena == 0 && req.body.correo != 0 && req.body.nombre != 0){
                usuario.update({ nombre_completo: req.body.nombre, correo: req.body.correo},{where:{id: req.session.userId}})
                .then(()=>{
                  res.redirect('/user/perfil');
                })
                .catch((error)=>{res.status(500).send(error)})
            }
            else{
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
          }}
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
    var id=req.params.id;
    res.render('botones',{id: id});
  },
  //Posiciones 
  PosicionesUser: (req, res) => {
    var id= req.params.id;
    Torneo.findByPk(id,
      {include: [{ model: Equipo}, {model: Ronda, as: "rondas", include: {model: Partida, as: "partidas"}}]
    })
    .then(rpta=>{       
      res.render("posiciones",{ lequipo: rpta.Equipos, rpta: rpta})
    })  
    .catch(error =>{
      console.log(error)
    })
  },
};
