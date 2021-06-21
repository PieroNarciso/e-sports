const { Router } = require('express');

const { getUser, loginUser, loginPostUser, registroUser,registroPostUser, perfilUser, perfilPostUser, perfilActualizarPostUser, perfilActualizarUser } = require('../controllers/user');
const router = Router();


router.get('/1', getUser);

router.get('/login', loginUser);
router.post('/login', loginPostUser)

router.get('/registro', registroUser);
router.post('/registro',registroPostUser)

router.get('/perfilLider', perfilUser);
router.post('/perfilLider', perfilPostUser);
    
router.get('/perfilLider/perfilLiderActualizar', perfilActualizarUser);
router.post('/perfilLider/perfilLiderActualizar', perfilActualizarPostUser);

router.get('/user1', (req, res) => {
    res.send('User 1');
});


module.exports = router;
