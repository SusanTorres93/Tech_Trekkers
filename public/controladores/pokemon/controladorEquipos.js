// Llamar el formulario del equipo en el HTML
let formularioEquipo = document.getElementById("formularioEquipo");

// Llamar al botón que abre el formulario
let abrirFormulario = document.getElementById("abrirFormulario");

// llamar al botón que cierra el formulario
let closePopupBtn = document.getElementById("closePopupBtn");

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