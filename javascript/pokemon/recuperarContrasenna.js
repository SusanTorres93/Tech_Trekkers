const inputEmail = document.getElementById("email");
const btnRecuperar = document.getElementById("btnRecuperar");

// Funcion para validar campos vacios
function validarCamposVacios() {
    let error = false;
    let required_inputs = document.querySelectorAll("#formulario [required]");
    required_inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add("error");
            error = true;
        } else {
            input.classList.remove("error");
        }
    });
    return error;
}

// Funcion para validar Email
function validarEmail() {
    let error = false;
    let textoEmail = inputEmail.value.trim(); // Utilizamos trim para eliminar espacios en blanco al inicio y final
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular más simple para validar email
    if (!regex.test(textoEmail)) {
        inputEmail.classList.add("error");
        error = true;
    } else {
        inputEmail.classList.remove("error");
    }
    return error;
}

// Funcion para enviar datos ingresados por el usuario
function enviarDatos(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    let errorCamposVacios = validarCamposVacios();
    let errorEmail = validarEmail();

    if (errorCamposVacios) {
        Swal.fire({
            title: "Dejaste campos vacíos",
            text: "Por favor revisa los campos marcados",
            icon: "warning"
        });
    } else if (errorEmail) {
        Swal.fire({
            title: "Error en el correo electrónico",
            text: "Por favor ingresa un correo electrónico válido",
            icon: "warning"
        });
    } else {
        // Simulación de recuperación de contraseña exitosa
        Swal.fire({
            title: "Contraseña recuperada",
            text: "Hemos enviado un correo electrónico con instrucciones para recuperar tu contraseña.",
            icon: "success"
        }).then(() => {
            // Aquí podrías redirigir a otra página si lo deseas
            window.location.href = "/Pokemon/login.html";
        });
    }
}

btnRecuperar.addEventListener('click', enviarDatos);
