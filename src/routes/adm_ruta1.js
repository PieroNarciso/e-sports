const express = require("express")
const bodyParser = require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models = require('../models')
const adm_rol = models.Adm_Rol
const adm_usuario = models.Adm_Usuario

rutas.use( express.urlencoded({extended : true}))
rutas.use( express.json() )

var LR = []
rutas.get('/',(req,res) =>{
    adm_rol.findAll( { })
        .then (listaRoles => {
            LR = listaRoles
        res.redirect('ver')
    })
    .catch( error => {
        console.log(error)
        res.status(500).send(error)
    })
}
)

rutas.get('/ver',(req,res)=>{

    jugador.findAll( { } )
        .then(respuesta => {

            res.render('listado_adm', 
            {listaRoles:LR, lusuarios:respuesta })
        })

        .catch( error => {
            console.log(error)
            res.status(500).send(error)
        })

})


module.exports = rutas