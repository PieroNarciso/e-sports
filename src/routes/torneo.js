const { Router } = require('express');

const { getTorneos } = require('../controllers/torneo');

const router = Router();


router.get('/', getTorneos);

module.exports = router;
