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
  getCrearUser,
  crearNuevoUsuario,
  
} = require('../controllers/user');
const router = Router();

//adminstrador
router.get('/crear', getCrearUser)
router.post('/crear', crearNuevoUsuario)

router.get('/', getUsuarios);

router.get('/registro', registroUser);
router.post('/registro', registroPostUser);

router.get('/perfil', authParticipanteLider, perfilUser);
router.post('/perfil', perfilPostUser);

router.get('/perfil/actualizar', authParticipanteLider, perfilActualizarUser);
router.post('/perfil/actualizar', perfilActualizarPostUser);

router.get('/equipo', authParticipanteLider, equipoUser);
router.post('/equipo', equipoPostUser);

router.get('/equipo/actualizar', authParticipanteLider, equipoActualizarUser);
router.post('/equipo/actualizar',authParticipanteLider, equipoActualizarPostUser);
router.get('/botones/:id', BotonesUser);

router.get('/posiciones/:id', PosicionesUser);

module.exports = router;
