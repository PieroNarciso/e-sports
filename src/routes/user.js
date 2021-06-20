const { Router } = require('express');

const { getUser, loginUser, loginPostUser } = require('../controllers/user');
const router = Router();


router.get('/1', getUser);

router.get('/login', loginUser);
router.post('/login', loginPostUser)

router.get('/user1', (req, res) => {
    res.send('User 1');
});


module.exports = router;
