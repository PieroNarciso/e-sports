
const { Usuario, Equipo } = require("../models");
const sequelize = require("sequelize")
const op = sequelize.Op
const models = require("../models");
const usuario = models.Usuario;
const equipo = models.Equipo;
const bcrypt = require('bcrypt');
const { authParticipanteLider } = require("../middlewares/auth");
const { HostNotReachableError } = require("sequelize");


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
                where: { correo: email }
            });
            // Usuario existe
            if (usr) {
                const isValid = await bcrypt.compare(password, usr.password);
                // Es valido, se loguea
                if (isValid) {
                    req.session.userId = usr.id;
                    req.session.rol = usr.rol;

                    return res.redirect('/');
                }
                // No es valido
                return res.render('login', { msg });
            }
            // Usuario no existe
            return res.render('login', { msg });
        } catch (err) {
        }
    },
    //Get de la visa Registro
    registroUser: (req, res) => {
        const estado = true; //Si estado == true, no se mostrará el mensaje error en la pagina.
        res.render("registro", { estado:estado });
    },

    //Post de la vista Registro
    registroPostUser: (req, res) => {
        estado = true; //Si estado == true, no se mostrará el mensaje error en la pagina.
        usuario.findAll({ //Encuentra todos los usuarios, donde el correo del registro sea igual.
            where: { correo: req.body.correo }
        })
            .then((lusur) => {
                console.log(lusur)
                if (lusur.length > 0) {//si el tamaño es mayor que 0 entonces si hay usuario.
                    console.log("entree") //Debug 
                    const estado = false;//ERROR
                    res.render("registro", { estado: estado }) //Se envia para mostrar con el error
                }
                else {
                    equipo.findAll({ //Encuentra todos los equipos donde el nombre a crear sea el mismo
                        where: {
                            nombre: req.body.equipo
                        }
                    })
                        .then((lequip) => {
                            console.log(lequip)
                            if (lequip.length > 0) { //si el tamaño es mayor que 0 entonces si hay equipo.
                                console.log(lequip)
                                const estado = false; //ERROR
                                res.render("registro", { estado }) //Se envia para mostrar con el error
                            } else {
                                Usuario.create({ //se crea usuario
                                    nombre_completo: req.body.nombre,
                                    correo: req.body.correo,
                                    password: req.body.contrasena,
                                    rol: 'lider'
                                })
                                    .then((rpta) => { //se crea equipo
                                        Equipo.create({
                                            nombre: req.body.equipo,
                                            lista_integrantes: ['Gorila', 'leon', 'perro'],
                                            lider_id: rpta.id //Se le asigna el id del participante lider creado al euqipo
                                        })
                                            .then((rpta) => {
                                                res.redirect('/') // Se redirecciona.
                                            }).catch(error => {
                                                res.status(500).send(error);
                                            })
                                    }).catch(error => {
                                        res.status(500).send(error);
                                    })
                            }
                        }).catch(error => {
                            res.status(500).send(error);
                        })
                }
            }).catch(error => {
                res.status(500).send(error);
            })
    },
    //GET DEL PERFIL DEL LIDER
    perfilUser: (req, res) => {
        usuario.findAll({
            where:
                { id: req.session.userId }
        })
            .then(usuario => {
                console.log(usuario)
                console.log(usuario[0].id)
                equipo.findAll({ where: { lider_id: usuario[0].id } })
                    .then(equipo => {
                        res.render("perfilLider", { nombre: usuario[0].nombre_completo, correo: usuario[0].correo, equipo: equipo[0].nombre })
                    })
            })
        //res.render("perfilLider",{nombre: "Pepe",correo:"pepe@gmail.com",equipo:"Gatos"
        // })
    },
    //POST DEL PERFIL DEL LIDER
    perfilPostUser: (req, res) => {

    },
    //GET DEL ACTUALIZAR DEL LIDER
    perfilActualizarUser: (req, res) => {
        usuario.findAll({
            where:
                { id: req.session.userId }
        })
            .then(usuario => {
                console.log(usuario)
                console.log(usuario[0].id)
                const estado = true; //Si estado == true, no se mostrará el mensaje error en la pagina.
                res.render("perfilLiderActualizar", { estado: estado, u: usuario[0]})
            })
        
    },
    //POST DEL ACTUALIZAR DEL LIDER
    perfilActualizarPostUser: (req, res) => {
        console.log("hola")
        usuario.findByPk(req.session.userId).then(usuario_conectado =>{
            usuario.findAll({
                where: {
                    correo: req.body.correo,
                    id: {[op.ne] :[req.session.userId]}
                }
            }).then(usuarios => {
                if (usuarios.length > 0) {
                    console.log("a")
                    var estado = false; //Si estado == true, no se mostrará el mensaje error en la pagina.
                    res.render("perfilLiderActualizar", { estado: estado, u: usuario_conectado[0]})
                } else {
                    usuario.update(
                        {
                            nombre_completo: req.body.nombre,
                            correo: req.body.correo,
                            password: req.body.contrasena
                        }
                        ,
                        {
                            where:
                            {
                                id: req.session.userId,
                            }
                        }
                    ).then(usuario => {
                        console.log(usuario)
                        res.redirect('/')
                    }).catch(error => {
                        res.status(500).send(error);
                    })
    
                }
            }).catch(error => {
                res.status(500).send(error);
            })



        })
        
    },
    //GET DEL EQUIPO
    equipoUser: (req, res) => {
        equipo.findAll({where:{
            lider_id: req.session.userId
        }})
        .then(equipos=> {
            res.render("perfilEquipo",{equipo: equipos[0].nombre, integrantes: equipos[0].lista_integrantes})
        })

    },
    //POST DEL EQUIPO
    equipoPostUser: (req, res) => {

    },
    //GET DEL EQUIPO ACTUALIZAR
    equipoActualizarUser: (req, res) => {
        equipo.findAll({where:{
            lider_id: req.session.userId
        }}).then(equipo_usuario =>{
            const estado = true;
            res.render("perfilEquipoActualizar", { estado: estado, u:equipo_usuario[0]})
        })

    },
    //POST DEL EQUIPO ACTUALIZAR
    equipoActualizarPostUser: (req, res) => {
        equipo.findAll({where:{
            lider_id: req.session.userId
        }}).then(equipo_usuario =>{
            equipo.findAll({
                where: {
                    nombre: req.body.nombre,
                    lider_id: {[op.ne] :[req.session.userId]}
                }
            }).then(equipos_encontrados => {
                if (equipos_encontrados.length > 0) {
                    var estado = false; //Si estado == true, no se mostrará el mensaje error en la pagina.
                    res.render("perfilEquipoActualizar", { estado: estado, u: equipo_usuario[0]})
                } else {
                    console.log("AAAAAAAAAAAAA")
                    var integrantes= req.body.integrante
                    var lista_integrantes=[integrantes]
                    equipo.update(
                        {
                            nombre: req.body.nombre,
                            lista_integrantes: lista_integrantes
                        }
                        ,
                        {
                            where:
                            {
                                lider_id: req.session.userId,
                            }
                        }
                    ).then(rpta => {
                        console.log(rpta)
                        res.redirect('/')
                    }).catch(error => {
                        res.status(500).send(error);
                    })
    
                }
            }).catch(error => {
                res.status(500).send(error);
            })
        })
        .catch(error=>{
            res.status(500).send(error);
        })
    },
    BotonesUser:(req,res)=>{
        res.render("botones")

    },
    PosicionesUser: (req, res) => {
        res.render("posiciones")
    }
}

