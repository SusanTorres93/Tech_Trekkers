//Constantes para obtener los inputs
const inputnombre = document.getElementById("nombre")
const inputapellido1 = document.getElementById("apellido1")
const inputapellido2 = document.getElementById("apellido2")
const inputusuario = document.getElementById("usuario")
const inputemail = document.getElementById("email")
const inputfechanacimiento = document.getElementById("fechanacimiento")
const inputidentificacion = document.getElementById("identificacion")
const inputfoto = document.getElementById("foto-usuario")
const btnRegistrar = document.getElementById("btnRegistrar")

// Funcion para validar campos vacios
function validarcamposvacios (){
let error = false
let required_inputs = document.querySelectorAll("#formulario [required]")
for (let i = 0; i < required_inputs.length; i++) {
    if (required_inputs[i].value == "") {
        required_inputs[i].classList.add("error")
        error = true
    } else {
        required_inputs[i].classList.remove("error")
        error = false
    }
}
return error
}

//Funcion para validar Nombre
function validarnombre(){
    let error = false
    let textoUsuario = inputnombre.value
    let regex = /^[a-zA-Z]+$/
    if(regex.test(textoUsuario)==false){
        inputnombre.classList.add("error")
        error = true
    } else {
        inputnombre.classList.remove("error")
        error = false
        }
    return error
}

//Funcion para validar Apellido1
function validarapellido1(){
    let error = false
    let textoUsuario = inputapellido1.value
    let regex = /^[a-zA-Z]+$/
    if(regex.test(textoUsuario)==false){
        inputapellido1.classList.add("error")
        error = true
    } else {
        inputapellido1.classList.remove("error")
        error = false
        }
    return error
}

//Funcion para validar Apellido2
function validarapellido2(){
    let error = false
    let textoUsuario = inputapellido2.value
    let regex = /^[a-zA-Z]+$/
    if(regex.test(textoUsuario)==false){
        inputapellido2.classList.add("error")
        error = true
    } else {
        inputapellido2.classList.remove("error")
        error = false
        }
    return error
}

//Funcion para validar Usuario
function validarusuario(){
    let error = false
    let textoUsuario = inputapellido2.value
    let regex = /^[a-zA-Z0-9!@#$%]+$/
    if(regex.test(textoUsuario)==false){
        inputapellido2.classList.add("error")
        error = true
    } else {
        inputapellido2.classList.remove("error")
        error = false
        }
    return error
}

//Funcion para validar Email
function validaremail(){
    let error = false
    let textoUsuario = inputemail.value
    let regex = /^[a-zA-Z0-9].+@[a-zA-Z0-9]+.[a-z]+$/
    if(regex.test(textoUsuario)==false){
        inputemail.classList.add("error")
        error = true
    }else{
        inputemail.classList.remove("error")
        error = false
    }
    return error
}

//Funcion para validar Fecha Nacimiento
function validarfechanacimiento(){
    let error = false
    let fechausuario = inputfechanacimiento.value
    if (fechausuario == "") {
        inputfechanacimiento.classList.add("error")
        error = true
    } else {
        inputfechanacimiento.classList.remove("error")
        error = false
    }
    return error
}

//Funcion para validar Foto
function validarfoto(){
    let error = false
    let fechausuario = inputfoto.value
    if (fechausuario == "") {
        inputfoto.classList.add("error")
        error = true
    } else {
        inputfoto.classList.remove("error")
        error = false
    }
    return error
}

//Funcion para validar numero de identificacion y tipo de identificacion
function validaridentificacion(){
const tipoidentificacion = document.querySelector('input[name="tipoIdentificacion"]:checked')
let seleccionusuario = tipoidentificacion.value
let regex
let error = false
let textousuario = inputidentificacion.value

if(seleccionusuario == "nacional"){
    regex = /^[1-7]{1}[0-9]{4}[0-9]{4}$/
}else if (seleccionusuario=="dimex"){
    regex = /^[1-7]{4}[0-9]{4}[0-9]{4}$/
}

if(regex.test(textousuario)==false){
    inputidentificacion.classList.add('error')
    error = true
}else{
    inputidentificacion.classList.remove('error')
    error = false
}
return error
}

//Funcion para Limpiar datos ingresados por el usuario
function limpiar(){
inputnombre.value = ""
inputapellido1.value = ""
inputapellido2.value = ""
inputusuario.value = ""
inputemail.value = ""
inputfechanacimiento.value = ""
inputidentificacion.value = ""
inputfoto.value = ""
}

//Funcion para enviar datos ingresados por el usuario
function enviardatos() {
    let errorcamposvacios = validarcamposvacios()
    let errornombre = validarnombre()
    let errorapellido1 = validarapellido1()
    let errorapellido2 = validarapellido2()
    let errorusuario = validarusuario()
    let erroremail = validaremail()
    let erroridentificacion = validaridentificacion()

    if (errorcamposvacios) {
        Swal.fire({
            title: "Los espacios marcados en rojo son obligatorios!",
            text: "Por favor ingrese la información solicitada y/o revise la información suministrada",
            icon: "warning"
          });
    } else if (errornombre) {
        Swal.fire({
            title: "Error al ingresar el nombre!",
            text: "Utilice solo letras de la A a la Z, tanto minúsculas como mayúsculas",
            icon: "warning"
          });
    } else if (errorapellido1) {
        Swal.fire({
            title: "Error al ingresar el primer apellido!",
            text: "Utilice solo letras de la A a la Z, tanto minúsculas como mayúsculas",
            icon: "warning"
          });
    } else if (errorapellido2) {
        Swal.fire({
            title: "Error al ingresar el segundo apellido!",
            text: "Utilice solo letras de la A a la Z, tanto minúsculas como mayúsculas",
            icon: "warning"
          });
    } else if (errorusuario) {
        Swal.fire({
            title: "Error al ingresar el usuario!",
            text: "Utilice letras de la A a la Z, tanto minúsculas como mayúsculas, números del 0 al 9, y los símbolos !@#$%",
            icon: "warning"
          });
    } else if (erroremail) {
        Swal.fire({
            title: "Error al ingresar el correo electrónico!",
            text: "Utilice letras de la A a la Z, tanto minúsculas como mayúsculas, números del 0 al 9. El formato permitido es XXXX@XXXXX.XXX",
            icon: "warning"
          });
    } else if (erroridentificacion) {
        Swal.fire({
            title: "Error al ingresar el numero de Identificación!",
            text: "Utilice números del 0 al 9. El formato permitido es XXXXXXXXX",
            icon: "warning"
          });
    } else {
        Swal.fire({
            title: "Exito!",
            text: "Informacion guardada",
            icon: "success"
          });
          limpiar()
    }
}

btnRegistrar.addEventListener('click',enviardatos)


