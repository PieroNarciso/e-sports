const express = require("express")
const bodyParser = require("body-parser")

const rutas = express.Router()

const Sequelize = require('sequelize')
const models = require('../models')
const usuario= models.Usuario

//Multer
const multer = require('multer')
const par = multer()

//Parsing de los datos
rutas.use( express.urlencoded({extended : true}))
rutas.use( express.json() )
rutas.use( par.array() )

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