const express = require('express');
const router = express.Router();
const { getAllSubdivisions, getSubdivisionById } = require('../controllers/subdivisions.controller');

router.get('/', getAllSubdivisions);
router.get('/:id', getSubdivisionById);

module.exports = router;