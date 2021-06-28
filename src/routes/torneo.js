const { Router } = require('express');

const { getTorneos, getTorneoById, getRondaByTorneoId } = require('../controllers/torneo');

const router = Router();


router.get('/', getTorneos);
/**
  * Renderiza la lista de equipos del respectivo torneo `id`
  */
router.get('/:torneoId', getTorneoById);

/**
  * Renderiza la ronda de un torneo y sus partidas
  */
router.get('/:torneoId/:rondaId', getRondaByTorneoId);

module.exports = router;
