const express = require('express');
const router = express.Router()
const { getTorneos } = require('../controllers/torneo');


const models = require("../models")
const Torneo = models.Torneo

router.get('/', getTorneos)

module.exports = router;