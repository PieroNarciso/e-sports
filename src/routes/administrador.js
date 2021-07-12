const { Router } = require("express")

const rutas = Router();


rutas.post( '/create', (req,res) => {
    return usuario.create(
        {
            nombres : req.body.nombres,
            correo_electrico : req.body.correo_electronico,
            rol : req.body.rol
        }
    )
    .then ( usuario => res.status(200).send(usuario) )
    .catch( error => res.status(400).send(error) )
})
module.exports =rutas
