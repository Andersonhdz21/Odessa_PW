const express = require('express');
const router = express.Router();
const lots = require('../controllers/lots.controller');

// Rutas públicas; añade middleware de auth si hace falta
router.get('/', lots.listLots);
router.get('/:id', lots.getLot);
router.post('/', lots.createLot);
router.put('/:id', lots.updateLot);
router.delete('/:id', lots.deleteLot);

module.exports = router;