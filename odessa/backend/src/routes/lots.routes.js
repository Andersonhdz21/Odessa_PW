const express = require('express');
const router = express.Router();
const { createLot, getLots } = require('../controllers/lots.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', getLots);     // pública
router.post('/', auth, createLot); // protegida

module.exports = router;