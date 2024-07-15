// Ingresar como invitado
document.addEventListener('DOMContentLoaded', function () {
    const btnGuestLogin = document.getElementById('btnGuestLogin');

    btnGuestLogin.addEventListener('click', function () {
        window.location.href = '/Pokemon/jugar.html';
    });
});


const inputUsuario = document.getElementById("username")
const inputContrasena = document.getElementById("password")
const btnIngresar = document.getElementById("btnIngresar")

//funcion para validar campos vacios
function validarCamposVacios() {
    let error = false //asumiendo que al inicio no tenemos ningun error
    let campos_requiridos = document.querySelectorAll("#formularioRegistro [required]")//devuelve una lista con todos los campos que cumplen la condicion de [required]
    for(let i=0;i<campos_requiridos.length;i++){
        if(campos_requiridos[i].value==""){
            campos_requiridos[i].classList.add('error')
            error=true
        }else{
            campos_requiridos[i].classList.remove('error')
        }
    }
    return error
}

//funcion para validar Usuario
function validarUsuario(){
    let error = false
    //extraer lo que el usuario escribio en el input
    let textoUsuario = inputUsuario.value
    //regex para validar lo que el usuario ingreso
    let regex = /^[a-zA-Z0-9]+$/ 
    //evaluar lo que escribio el usuario dentro de la regex
    if(!regex.test(textoUsuario)){
        inputUsuario.classList.add('error')
        error = true
    }else{
        inputUsuario.classList.remove('error')
    }

    return error
}

//validar la contrasenna
function validarContrasena(){
    let error = false
    let textoUsuario = inputContrasena.value
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{}\[\]:;"',.<>?\\|]).{12,}$/
    if(!regex.test(textoUsuario)){
        inputContrasena.classList.add('error')
        error = true
    }else{
        inputContrasena.classList.remove('error')
    }

    return error
}

// Obtener el formulario y agregar un evento de escucha para el envío
document.getElementById('login-form').addEventListener('submit', function(event) {
    // Prevenir el envío del formulario por defecto
    event.preventDefault();

    // Obtener los valores de usuario y contraseña
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Aquí puedes realizar la validación del usuario y contraseña
    // Supongamos que la validación es exitosa
    if (username === 'usuario' && password === 'contraseña') {
        // Redirigir al usuario a la página deseada
        window.location.href = "/Pokemon/about.html";
    } else {
        // En caso de error de inicio de sesión, puedes mostrar un mensaje o realizar otra acción
        alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }
});



//limpiar campos del formulario
function limpiarCampos(){
    inputUsuario.value = ""
    inputContrasena.value=""
}

function enviarDatos(event){
    event.preventDefault() // Evitar que el formulario se envíe de manera tradicional
    let errorCamposVacios = validarCamposVacios()
    let errorUsuario = validarUsuario()
    let errorContrasena = validarContrasena()

    if(errorCamposVacios){
        Swal.fire({
            title: "Dejaste campos vacíos",
            text: "Por favor revisa los campos marcados",
            icon: "warning"
        });
    }else if(errorUsuario){
        Swal.fire({
            title: "Error con el campo de nombre",
            text: "En el nombre solo se permiten letras y números",
            icon: "warning"
        });
    }else if(errorContrasena){
        Swal.fire({
            title: "Error con el campo de contraseña",
            text: "La contraseña debe ser de al menos 12 caracteres, tener 1 mayúscula y 1 símbolo especial",
            icon: "warning"
        });
    }else{
        //si todo sale bien
        Swal.fire({
            title: "¡Éxito!",
            text: "Información guardada",
            icon: "success"
        });
        limpiarCampos()
    }
}

btnIngresar.addEventListener('click', enviarDatos)