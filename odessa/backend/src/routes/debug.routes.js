const express = require('express');
const router = express.Router();
const { checkDb } = require('../controllers/debug.controller');

router.get('/db', checkDb);

module.exports = router;