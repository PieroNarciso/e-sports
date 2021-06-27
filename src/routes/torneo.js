const { Router } = require('express');

const { getTorneos, getTorneoById } = require('../controllers/torneo');

const router = Router();


router.get('/', getTorneos);
/**
  * Renderiza la lista de equipos del respectivo torneo `id`
  */
router.get('/:id', getTorneoById);

module.exports = router;
