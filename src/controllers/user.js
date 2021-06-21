
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
        res.render("registro");
    },
    registroPostUser:(req,res) => {
        
    },
    perfilUser:(req,res)=>{
        res.render("perfilLider",{nombre: "Pepe",correo:"pepe@gmail.com",equipo:"Gatos"
    })
    },
    perfilPostUser:(req,res) =>{

    },
    perfilActualizarUser:(req,res)=>{
        res.render("perfilLiderActualizar")
    },
    perfilActualizarPostUser:(req,res)=>{

    },
    equipoUser:(req,res)=>{
        res.render("perfilEquipo",{equipo: "Gatos", integrantes:"Pepe,Juan,Pikachu"})

    },
    equipoPostUser:(req,res) =>{

    },
    equipoActualizarUser:(req,res)=>{
        res.render("perfilEquipoActualizar")
    },
    equipoActualizarPostUser:(req,res)=>{
        
    }
}
