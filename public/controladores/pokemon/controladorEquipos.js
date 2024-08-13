// Llamar el formulario del equipo en el HTML
let formularioEquipo = document.getElementById("formularioEquipo");

// Llamar al botón que abre el formulario
let abrirFormulario = document.getElementById("abrirFormulario");

// llamar al botón que cierra el formulario
let closePopupBtn = document.getElementById("closePopupBtn");

// Cuando el usuario presione el botón "agregar equipo" se abre el formulario
abrirFormulario.onclick = function() {
    popup.style.display = "block";
}

// When the user clicks on <span> (x), close the popup
closePopupBtn.onclick = function() {
    popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}