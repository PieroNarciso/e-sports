const { Router } = require('express');

const { getTorneos, getTorneoById } = require('../controllers/torneo');

const router = Router();


router.get('/', getTorneos);
router.get('/:id', getTorneoById);

module.exports = router;
