const Equipo = require('../models/EquipoModel');

//Grabar un equipo en la DB
exports.nuevoEquipo = async (req, res) => {
    const nuevoEquipo = new Equipo(req.body);
    try {
        await nuevoEquipo.save();
        res.status(200).json({
            equipo:nuevoEquipo,
            mensaje: "Equipo agregado exitosamente"
        })
    } catch (error) {
        res.status(500).json({
            mensaje: "Ocurrió el siguiente error: ",
            error
        })
    }
}

