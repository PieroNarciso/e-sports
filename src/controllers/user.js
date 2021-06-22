
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
            console.log("nombre"+nombre+"correo"+correo+"contraseña: "+contrasena+"nombre equipo"+nombreequipo)
            res.redirect("/")
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
