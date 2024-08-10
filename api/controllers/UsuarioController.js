const Usuario = require('../models/UsuarioModel')

//Crear un usuario
exports.nuevoUsuario = async (req, res) => {
    const nuevoUsuario = new Usuario(req.body)
    try {
        await nuevoUsuario.save()
        res.status(200).json({
            Usuario: nuevoUsuario,
            Mensaje: "Usuario creado con exito",
            Resultado: true
        })
    } catch (error) {
        res.status(500).json({
            Resultado: false,
            Error: "No se pudo crear el usuario, ocurrio el siguiente error: ", error
        })
    }
}

//Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    const id = req.query.id
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(id)
        if (!usuarioEliminado) {
            return res.status(400).json({
                Mensaje: 'Usuario no existe!'
            })
        }
        res.status(200).json({
            Usuario: usuarioEliminado,
            Mensaje: 'Usuario eliminado con exito!'
        })
    } catch (error) {
        res.status(500).json({
            Resultado: false,
            Error: "No se pudo eliminar el usuario: ", error
        })
    }
}

//Actualizar Usuario
exports.actualizarUsuario = async (req, res) => {
    const id = req.query.id
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, {new:true})
        if (!usuarioActualizado) {
            return res.status(400).json({
                Mensaje: 'Usuario no existe!'
            })
        }
        res.status(200).json({
            Usuario: usuarioActualizado,
            Mensaje: 'Usuario actualizado con exito!'
        })
    } catch (error) {
        res.status(500).json({
            Mensaje: "Error al actualizar al cliente: ", error
        })
    }
}

//Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuariosobtenidos = await Usuario.find()
        res.status(200).json({
            Usuarios: usuariosobtenidos,
            Mensaje: "Usuarios obtenidos con exito!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Mensaje: "Ocurrio el siguiente error: ", error
        })
    }
}

//Obtener un usuario con su ID
exports.obtenerUsuarioID = async (req, res) => {
    const id = req.query.id
    try {
        const usuarioObtenido = await Usuario.findById(id)
        if (!usuarioObtenido) {
            return res.status(404).json({
                Mensaje: "Usuario no encontrado"
            })
        }
        res.status(200).json({
            Usuario: usuarioObtenido,
            Mensaje: "Usuario obtenido exitosamente"
           })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            Mensaje: "Ocurrio el siguiente error: ", error
        })
    }
}
