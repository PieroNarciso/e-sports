
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
      res.render("registro")
    },
    perfilUser:(req,res)=>{
        res.render("perfilLider")

    },
    perfilPostUser:(req,res) =>{

    },
    perfilActualizarUser:(req,res)=>{
        res.render("perfilLiderActualizar")
    },
    perfilActualizarPostUser:(req,res)=>{}
}
