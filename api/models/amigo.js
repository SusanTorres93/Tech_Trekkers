const mongoose = require('mongoose')

const amigoSchema = new mongoose.Schema({
    nombre:{type:String, required:true},
    
})

module.exports = mongoose.model('Amigo')