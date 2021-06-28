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
  BotonesUser
} = require('../controllers/user');
const router = Router();


router.get('/registro', registroUser);
router.post('/registro', registroPostUser);

router.get('/perfil', authParticipanteLider, perfilUser);
router.post('/perfil', perfilPostUser);

router.get('/perfil/actualizar', authParticipanteLider, perfilActualizarUser);
router.post('/perfil/actualizar', perfilActualizarPostUser);

router.get('/equipo', authParticipanteLider, equipoUser);
router.post('/equipo', equipoPostUser);

router.get('/equipo/actualizar', authParticipanteLider, equipoActualizarUser);
router.post('/equipo/actualizar', equipoActualizarPostUser);
router.get('/botones', BotonesUser);

router.get('/posiciones', PosicionesUser);
router.get('/user1', (req, res) => {
  res.send('User 1');
});

module.exports = router;
