const { Router } = require('express');

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
  equipoActualizarPostUser
} = require('../controllers/user');
const router = Router();


router.get('/registro', registroUser);
router.post('/registro', registroPostUser);

router.get('/perfil', perfilUser);
router.post('/perfil', perfilPostUser);

router.get('/perfil/actualizar', perfilActualizarUser);
router.post('/perfil/actualizar', perfilActualizarPostUser);

router.get('/equipo', equipoUser);
router.post('/equipo', equipoPostUser);

router.get('/equipo/actualizar', equipoActualizarUser);
router.post('/equipo/actualizar', equipoActualizarPostUser);

router.get('/user1', (req, res) => {
  res.send('User 1');
});

module.exports = router;
