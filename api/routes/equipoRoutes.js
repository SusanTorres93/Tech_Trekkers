const express = require('express');
const router = express.Router();

const equipoController = require('../api/controllers/equipoController');

//POST 
router.post('/equipo', equipoController.nuevoEquipo)