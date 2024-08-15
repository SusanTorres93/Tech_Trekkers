const mongoose = require('mongoose');
const Duelo = require('../models/DueloModel');

const equipoSchema = new mongoose.Schema({
    nombreEquipo:{type:String, required:true},
    nombreAmigo:{type:String, required:false},
    resultadosDuelo:{
        type: [Duelo.schema],
        default: [] 
    }
})

module.exports = mongoose.model('Equipo', equipoSchema);