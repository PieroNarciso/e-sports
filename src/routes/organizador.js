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

/* Pagina de inicio*/
var LT = []
rutas.get('/', (req,res) =>{


})

/* Consulta*/

/* Insert*/

modules.exports = rutas