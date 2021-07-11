const { Router } = require('express');

const { getTorneos, getTorneoById, getRondaByTorneoId, changeTorneoToEnCurso, inscribirEquipo,getPosiciones } = require('../controllers/torneo');
const { BotonesUser} = require('../controllers/user')
const { authOrganizador, authParticipanteLider } = require('../middlewares/auth');

const router = Router();


router.get('/', getTorneos);
/**
 * Renderiza la tabla de posiciones al darle click a Ver
 */
 router.get('/botones/posiciones/:id',authOrganizador,getPosiciones)
/**
  * Renderiza la lista de equipos del respectivo torneo `id`
  */
router.get('/:torneoId', authOrganizador, getTorneoById);

/**
  * Genera el fixture al cambiar `en curso` y se redirige a
  * `/torneos`
  */
router.get('/en-curso/:id', authOrganizador, changeTorneoToEnCurso);

/**
  * Inscribe a un equipo si no esta inscrito
  * redirige a `/torneos`
  */
  router.get('/inscribir-equipo/:torneoId', authParticipanteLider, inscribirEquipo);

/**
  * Renderiza la ronda de un torneo y sus partidas
  */
router.get('/:torneoId/:rondaId', authOrganizador, getRondaByTorneoId);
/**
 * Renderiza los botones
 */
router.get('/botones/:id',authOrganizador,BotonesUser);

module.exports = router;
