const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser') 
const cors = require('cors')
require('dotenv').config()

//Se declaran constantes para indicarle donde tomar las rutas 
const UsuarioRoutes = require('./routes/UsuarioRoutes')

//establecer la conexion con mongo
mongoose.connect(process.env.MONGO_URI)

//Creo que habilita el uso de express como applicacion (API)
const app = express()

//habilitar cors
app.use(cors());

//habilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//servir los archivos estaticos
app.use(express.static('public'))

//Se le dice all app que routes utilizar
app.use('/', UsuarioRoutes)

/* //Mensaje que corre en el CMD
const PORT = 4000
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
}) */

const port = process.env.PORT || 4000;
app.listen(port, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});