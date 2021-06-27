const { Usuario, Equipo } = require("../models");
const sequelize = require("sequelize")
const op= sequelize.Op
const models= require("../models");
const usuario=models.Usuario;
const equipo= models.Equipo;


/*const verificacion = (nombre,equipo) =>{
    let verificado;
    Usuario.findAll({
        where:{
            correo:correo,
            rol:"lider"
        },
        attributes:['correo'],
    }) 
    .then(lusr => { 
        console.log(lusr)
        if(lusr.length>0){
            verificado=false;
        }else{
            verificado=true;
        }

    })
    
    //.then((lusr)=>{
        //lusr.forEach(element =>{
            //jsonObject= element.get({raw:true})
           // console.log(jsonObject)
            /*if(jsonObject == "nombre_completo: "+nombre){
                console.log("si existe")
                return false
            }else{
                return true
            }*/

        //})

    //})
    /*Equipo.findAll({
        where:{
            nombre:equipo

        }

    })
    .then((lequipo)=>{
        if(lequipo.length>0){
            verificado=false;
        }else{
            verificado=true;
        }
    

    })
    return verificado;
}*/
module.exports = {
    getUser: (req, res) => {
        res.send('User');    
    },

    loginUser: (req, res) => {
        res.render('login');
    },

    loginPostUser: (req, res) => {

    },
    registroUser: (req,res) => {
        const estado = true;
        res.render("registro",{estado});
    },
    registroPostUser:(req,res) => {
        estado=true;
        usuario.findAll({
            where:{correo: req.body.correo}
        })
        .then( (lusur) => {
            console.log(lusur)
            if(lusur.length > 0 ){
                console.log("entree")
                const estado=false;
                res.render("registro",{estado})
            }
            else{
                equipo.findAll({
                    where: {
                        nombre: req.body.equipo
                    } 
                })
                .then( (lequip) =>{
                    console.log(lequip)
                    if(lequip.length > 0){
                        console.log(lequip)
                        const estado= false;
                        res.render("registro",{estado})
                    }else{
                        Usuario.create({
                            nombre_completo: req.body.nombre,
                            correo: req.body.correo,
                            contraseña: req.body.contrasena,
                            rol:'lider'
                        })
                        .then((rpta) =>{
                            Equipo.create({
                                nombre: req.body.equipo,
                                lista_integrantes: ['Gorila','leon','perro'],
                                lider_id: rpta.id
                            })
                            .then((rpta) =>{
                                res.redirect('/')
                            }).catch(error =>{
                                res.sen(500).send(error)
                            })
                        }).catch(error =>{
                            res.sen(500).send(error)
                        })
                    }
                }).catch(error =>{
                    res.sen(500).send(error)
                })     
            }
        }).catch(error =>{
            res.sen(500).send(error)
        })
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



        /*try{
            nuevo_nombre=req.body.nombre;
            nuevo_correo=req.body.correo;
            nuevo_nombreequipo=req.body.equipo;
            if(verificacion(nuevo_correo, nuevo_nombreequipo) == true){
                Usuario.update(
                    {
                    nombre_completo: nuevo_nombre,
                    correo: nuevo_correo,
                    },{
                        where:{
                            
                        }
                    }
                )
                Equipo.update({
                    nombre: nuevo_nombreequipo
                },{
                    where:{

                    } 
                });
                res.redirect("/")
            }else{
                estado=false;
                res.render("registro",{estado})
            }
        }
        catch{
            estado=false;
            res.render("registro",{estado})

        }
        res.redirect("/")*/
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
