const { Router } = require('express');

const { getTorneos, getTorneoById, getRondaByTorneoId, changeTorneoToEnCurso } = require('../controllers/torneo');

const router = Router();


router.get('/', getTorneos);
/**
  * Renderiza la lista de equipos del respectivo torneo `id`
  */
router.get('/:torneoId', getTorneoById);

/**
  * Genera el fixture al cambiar `en curso` y se redirige a
  * `/torneos`
  */
router.get('/en-curso/:id', changeTorneoToEnCurso);

/**
  * Renderiza la ronda de un torneo y sus partidas
  */
router.get('/:torneoId/:rondaId', getRondaByTorneoId);

module.exports = router;
