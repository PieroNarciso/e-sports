const { Router } = require('express');

const {
  eliminar,
  getTorneos,
  getTorneoById,
  getRondaByTorneoId,
  changeTorneoToEnCurso,
  inscribirEquipo,
  getPosiciones,
  editarTorneo,
  postEditarTorneo,
} = require('../controllers/torneo');
const { BotonesUser } = require('../controllers/user');
const {
  authOrganizador,
  authParticipanteLider,
} = require('../middlewares/auth');

const router = Router();

router.get('/', getTorneos);

router.post('/eliminar', authOrganizador, eliminar);
/**
 * Renderiza la tabla de posiciones al darle click a Ver
 */
router.get('/botones/posiciones/:id', authOrganizador, getPosiciones);

/**
 * Renderiza los botones
 */
router.get('/botones/:torneoId', authOrganizador, BotonesUser);

/**
 * Renderiza la pantalla para editar un torneo
 */
router.get('/editar/:torneoId', authOrganizador, editarTorneo);

/**
 * Actualiza el torneo editado y regresa al estado anterior `/editar/:torneoId`
 *
 */
router.post('/editar/:torneoId', authOrganizador, postEditarTorneo);

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
router.get(
  '/inscribir-equipo/:torneoId',
  authParticipanteLider,
  inscribirEquipo
);

/**
 * Renderiza la ronda de un torneo y sus partidas
 */
router.get('/:torneoId/:rondaId', authOrganizador, getRondaByTorneoId);

module.exports = router;
