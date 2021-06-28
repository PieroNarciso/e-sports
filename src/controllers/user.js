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
    //Get de la visa Registro
    registroUser: (req,res) => {
        const estado = true; //Si estado == true, no se mostrará el mensaje error en la pagina.
        res.render("registro",{estado});
    },
    
    //Post de la vista Registro
    registroPostUser:(req,res) => {
        estado=true; //Si estado == true, no se mostrará el mensaje error en la pagina.
        usuario.findAll({ //Encuentra todos los usuarios, donde el correo del registro sea igual.
            where:{correo: req.body.correo}
        })
        .then( (lusur) => { 
            console.log(lusur)
            if(lusur.length > 0 ){//si el tamaño es mayor que 0 entonces si hay usuario.
                console.log("entree") //Debug 
                const estado=false;//ERROR
                res.render("registro",{estado}) //Se envia para mostrar con el error
            }
            else{
                equipo.findAll({ //Encuentra todos los equipos donde el nombre a crear sea el mismo
                    where: {
                        nombre: req.body.equipo
                    } 
                })
                .then( (lequip) =>{
                    console.log(lequip)
                    if(lequip.length > 0){ //si el tamaño es mayor que 0 entonces si hay equipo.
                        console.log(lequip)
                        const estado= false; //ERROR
                        res.render("registro",{estado}) //Se envia para mostrar con el error
                    }else{
                        Usuario.create({ //se crea usuario
                            nombre_completo: req.body.nombre,
                            correo: req.body.correo,
                            password: req.body.contrasena,
                            rol:'lider'
                        })
                        .then((rpta) =>{ //se crea equipo
                            Equipo.create({
                                nombre: req.body.equipo,
                                lista_integrantes: ['Gorila','leon','perro'],
                                lider_id: rpta.id //Se le asigna el id del participante lider creado al euqipo
                            })
                            .then((rpta) =>{
                                res.redirect('/') // Se redirecciona.
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
    //GET DEL PERFIL DEL LIDER
    perfilUser:(req,res)=>{
        res.render("perfilLider",{nombre: "Pepe",correo:"pepe@gmail.com",equipo:"Gatos"
    })
    },
    //POST DEL PERFIL DEL LIDER
    perfilPostUser:(req,res) =>{
        
    },
    //GET DEL ACTUALIZAR DEL LIDER
    perfilActualizarUser:(req,res)=>{
        const estado=true; //Si estado == true, no se mostrará el mensaje error en la pagina.
        res.render("perfilLiderActualizar",{estado})
    },
    //POST DEL ACTUALIZAR DEL LIDER
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
    //GET DEL EQUIPO
    equipoUser:(req,res)=>{
        res.render("perfilEquipo",{equipo: "Gatos", integrantes:"Pepe,Juan,Pikachu"})

    },
    //POST DEL EQUIPO
    equipoPostUser:(req,res) =>{

    },
    //GET DEL EQUIPO ACTUALIZAR
    equipoActualizarUser:(req,res)=>{
        const estado=true;
        res.render("perfilEquipoActualizar",{estado})
    },//POST DEL EQUIPO ACTUALIZAR
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
