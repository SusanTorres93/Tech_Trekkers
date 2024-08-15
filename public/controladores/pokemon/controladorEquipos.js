const inputNombreEquipo = document.getElementById("nombreEquipo");
const inputNombreAmigo = document.getElementById("nombreAmigo");
const btnSubmitEquipo = document.getElementById("btnSubmitEquipo");
// Llamar el formulario del equipo en el HTML
let formularioEquipo = document.getElementById("formularioEquipo");
// Llamar al botón que abre el formulario
let abrirFormulario = document.getElementById("abrirFormulario");
// llamar al botón que cierra el formulario
let closePopupBtn = document.getElementById("closePopupBtn");

//funciones para manejar cambios en el front end

// Cuando el usuario presione el botón "agregar equipo" se abre el formulario
abrirFormulario.onclick = function() {
    formularioEquipo.style.display = "block";
}

// Cerrar el formulario con la X
closePopupBtn.onclick = function() {
    formularioEquipo.style.display = "none";
}

// Cerrar el formulario cuando el usuario le de click fuera del formulario
window.onclick = function(event) {
    if (event.target == formularioEquipo) {
        formularioEquipo.style.display = "none";
    }
}

//Validaciones
function validarCamposVaciosEquipos() {
    let error = false;
    let camposRequeridos = document.querySelectorAll("formularioCamposRequeridos [required]");
    for (let i; i < camposRequeridos.length; i++) {
        if (camposRequeridos[i].value === "") {
            camposRequeridos[i].classList.add("error");
            error = true;
        } else {
            camposRequeridos[i]/classList.remove("error");
            error = false
        }
    }
    return error;
}

function enviarDatosEquipos() {
    let errorCamposVacios = validarCamposVaciosEquipos();
    if (errorCamposVacios) {
        Swal.fire({
            title: "Dejaste campos vacíos",
            text: "Por favor revisa los campos marcados",
            icon: "warning"
        });
    } else {
        // Si todo sale bien
        const nombreEquipo = inputNombreEquipo.value;
        const nombreAmigo = inputNombreAmigo.value;

        //enviar datos al backend
        registrarEquipo(nombreEquipo, nombreAmigo);

        limpiarCamposEquipo();
    }
}    

function limpiarCamposEquipo(){
    inputNombreEquipo.value = "";
    inputNombreAmigo.value = "";
}

btnSubmitEquipo.addEventListener('click', enviarDatosEquipos);