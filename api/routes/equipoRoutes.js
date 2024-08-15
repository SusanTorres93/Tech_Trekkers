const express = require('express');
const router = express.Router();

const equipoController = require('../api/controllers/equipoController');

router.post('/nuevoEquipo', equipoController.nuevoEquipo);

module.exports = router;