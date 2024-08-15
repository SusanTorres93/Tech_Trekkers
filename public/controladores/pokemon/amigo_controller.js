const Amigo = require("../models/amigo");

exports.agregarAmigo = async (req, res) => {
    const agregarAmigo = new Amigo(req.body);
    try {
        await agregarAmigo.save();
        res.status(200).json({
            amigo: agregarAmigo,
            mensaje: "Amigo agregado exitosamente!"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrió el siguiente error: ",
            error
        });
    }
};

exports.recuperarAmigos = async (req, res) => {
    try {
        const recuperarAmigos = await Amigo.find();
        res.status(200).json({
            friends: recuperarAmigos,
            mensaje: "Amigos recuperados exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrió el siguiente error: ",
            error
        });
    }
};

exports.recuperarAmigoID = async (req, res) => {
    const id = req.query.id;
    try {
        const amigoRecuperado = await Amigo.findById(id);
        if (!amigoRecuperado) {
            return res.status(400).json({
                mensaje: "Amigo no encontrado"
            });
        }
        res.status(200).json({
            amigo: amigoRecuperado,
            mensaje: "Amigo recuperado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrió el siguiente error: ",
            error
        });
    }
};

exports.eliminarAmigo = async (req, res) => {
    const id = req.query.id;
    try {
        const amigoEliminado = await Amigo.findByIdAndDelete(id);
        if (!amigoEliminado) {
            return res.status(400).json({
                mensaje: "Amigo no encontrado"
            });
        }

        res.status(200).json({
            amigo: amigoEliminado,
            mensaje: "Amigo eliminado exitosamente"
        });
        
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrió el siguiente error: ",
            error
        });
    }
};
