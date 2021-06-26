const { Usuario, Equipo } = require("../models");
const models= require("../models");
const usuario=models.Usuario;
const equipo= models.Equipo;

const verificacion = (nombre,equipo) =>{
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
    Equipo.findAll({
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
}
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
        try{
            nombre=req.body.nombre;
            correo=req.body.correo;
            contrasena=req.body.contrasena;
            nombreequipo=req.body.equipo;
            const usr={nombre_completo: nombre, correo: correo, contraseña: contrasena, rol: 'lider'}
            const equipo={ nombre: nombreequipo, lista_integrantes: ["Gorila","Jaguar","Venado"]}
            if(verificacion(correo, nombreequipo) == true){
                Usuario.create(usr);
                Equipo.create(equipo);
                console.log("si es")
                res.redirect("/")
            }else{
                console.log("a")
                estado=false;
                res.render("registro",{estado})
            }
        }
        catch(e){
            console.log(e)
            estado=false;
            res.render("registro",{estado})
        }

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
