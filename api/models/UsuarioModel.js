const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    primerapellido:{type:String,required:true},
    segundoapellido:{type:String,required:true},
    usuario:{type:String,required:true,unique:true},
    correo:{type:String,required:true,unique:true},
    fechanacimiento:{type:Date,required:true},
    cedula:{type:String,required:true, unique:true},
    tipocedula:{type:String,required:true,enum:['nacional','dimex']},
    foto:{type:String, required:false},
    estado:{type:String, default:"inactivo"},
    password:{type:String, default:"usuario123", required:true},
})

module.exports = mongoose.model('Usuario',usuarioSchema)



      