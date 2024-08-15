const inputNombreAmigo = document.getElementById("nombreAmigo");
const btnAgregarAmigo = document.getElementById("btnAgregarAmigo");

function validarCamposVaciosAmigo() {
    let error = false;
    let campos_requiridos = document.querySelectorAll("#formularioAmigo [required]");
    for (let i = 0; i < campos_requiridos.length; i++) {
        if (campos_requiridos[i].value === "") {
            campos_requiridos[i].classList.add('error');
            error = true;
        } else {
            campos_requiridos[i].classList.remove('error');
            error = false;
        }
    }
    return error;
}

function enviarDatosAmigo() {
    let errorCamposVacios = validarCamposVaciosAmigo();

    if (errorCamposVacios) {
        Swal.fire({
            title: "Campos vacios",
            text: "Revisar campos marcados",
            icon: "warning"
        });
    } else {
        const nombre = inputNombreAmigo.value


        registarAmigo(nombre);

        limpiarCamposAmigo();
    }
}

function limpiarCamposAmigo() {
    inputNombreAmigo.value = "";

}

btnAgregarAmigo.addEventListener('click', enviarDatosAmigo);