const express = require('express');
const router = express.Router();

const amigoController = require("../controllers/amigo_controller")

router.post('/amigo',amigoController.agregarAmigo);

router.get('/amigo',amigoController.recuperarAmigos);

router.get('/amigoID',amigoController.recuperarAmigoID);

router.delete('/amigo',amigoController.eliminarAmigo);

module.exports = router