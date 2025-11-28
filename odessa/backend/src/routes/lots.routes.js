const express = require('express');
const router = express.Router();
const lots = require('../controllers/lots.controller');

const authMiddleware = require('../middlewares/auth.middleware'); 

router.get('/', lots.listLots);
router.get('/:id', lots.getLot);

router.post('/', authMiddleware, lots.createLot);
router.put('/:id', authMiddleware, lots.updateLot);
router.delete('/:id', authMiddleware, lots.deleteLot);

module.exports = router;