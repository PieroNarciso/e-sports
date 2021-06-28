const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

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
    } catch(err) {
    }
  },


  registroUser: (req,res) => {
    const estado = true;
    res.render("registro",{estado});
  },
  registroPostUser:(req,res) => {
    try{

    }
    catch{
      estado=false;
      res.render("registro",{estado})
    }
    res.redirect("/")
  },
  perfilUser:(req,res)=>{
    res.render("perfilLider",{nombre: "Pepe",correo:"pepe@gmail.com",equipo:"Gatos"
    })
  },
  perfilPostUser:(req,res) =>{

  },
  perfilActualizarUser:(req,res)=>{
    const estado=true;
    res.render("perfilLiderActualizar",{estado})
  },
  perfilActualizarPostUser:(req,res)=>{
    try{

    }
    catch{
      estado=false;
      res.render("registro",{estado})
    }
    res.redirect("/")
  },
  equipoUser:(req,res)=>{
    res.render("perfilEquipo",{equipo: "Gatos", integrantes:"Pepe,Juan,Pikachu"})

  },
  equipoPostUser:(req,res) =>{

  },
  equipoActualizarUser:(req,res)=>{
    const estado=true;
    res.render("perfilEquipoActualizar",{estado})
  },
  equipoActualizarPostUser:(req,res)=>{
    try{

    }
    catch{
      estado=false;
      res.render("registro",{estado})
    }
    res.redirect("/")
  }
}
