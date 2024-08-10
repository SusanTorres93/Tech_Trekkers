const mongoose = require('mongoose');

const dueloSchema = new mongoose.Schema({
    numeroDuelo: { type: Number, required: true },
    nombreGanador: { type: String, required: true },
    nombrePerdedor: { type: String, required: true },
    pokemonGanador: { type: String, required: true },
    pokemonPerdedor: { type: String, required: true },
});

module.exports = mongoose.model('Duelo', dueloSchema);
