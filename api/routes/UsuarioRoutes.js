const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController')

//Post
router.post('/usuario', UsuarioController.nuevoUsuario);
//Delete
router.delete('/usuario', UsuarioController.eliminarUsuario);
//Put
router.put('/usuario', UsuarioController.actualizarUsuario);
//Get
router.get('/usuario', UsuarioController.obtenerUsuarios);
//Get
router.get('/usuarioID', UsuarioController.obtenerUsuarioID);

module.exports = router;