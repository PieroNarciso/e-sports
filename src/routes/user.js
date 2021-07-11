const { Router } = require('express');
const {authParticipanteLider} = require("../middlewares/auth")
const {
  registroUser,
  registroPostUser,
  perfilUser,
  perfilPostUser,
  perfilActualizarPostUser,
  perfilActualizarUser,
  equipoUser,
  equipoPostUser,
  equipoActualizarUser,
  equipoActualizarPostUser,
  PosicionesUser,
  BotonesUser,
  getUsuarios,
  fetchPosiciones
} = require('../controllers/user');
const router = Router();


router.get('/', getUsuarios);

/* Permite registrar al participante lider*/
router.get('/registro', registroUser);
router.post('/registro', registroPostUser);


/* Permite ver el perfil del participante lider*/
router.get('/perfil', authParticipanteLider, perfilUser);
router.post('/perfil', perfilPostUser);


/* Permite ver actualizar el perfil del participante lider*/
router.get('/perfil/actualizar', authParticipanteLider, perfilActualizarUser);
router.post('/perfil/actualizar', perfilActualizarPostUser);

/* Permite ver el equipo del participante lider*/

router.get('/equipo', authParticipanteLider, equipoUser);
router.post('/equipo', equipoPostUser);

/* Permite actualizar el equipo del participante lider*/

router.get('/equipo/actualizar', authParticipanteLider, equipoActualizarUser);
router.post('/equipo/actualizar',authParticipanteLider, equipoActualizarPostUser);

/* Recibe como params el id del torneo para luego renderizar el boton posiciones y fixture*/

router.get('/botones/:id', BotonesUser);
router.get('/api/posiciones/:id',fetchPosiciones)

/* Recbie como params el id del torne para luego renderizar las posiciones*/
router.get('/posiciones/:id',authParticipanteLider, PosicionesUser);

module.exports = router;
