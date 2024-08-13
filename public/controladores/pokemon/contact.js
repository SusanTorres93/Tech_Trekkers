document.addEventListener('DOMContentLoaded', function () {
    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
    const inputSubject = document.getElementById("subject");
    const inputMessage = document.getElementById("message");
    const btnEnviar = document.getElementById("btnEnviar");

    // Función para validar campos vacíos
    function validarCamposVacios() {
        let error = false;
        let requiredInputs = document.querySelectorAll("#formulario-contacto [required]");
        requiredInputs.forEach(input => {
            if (input.value.trim() === "") {
                input.classList.add("error");
                error = true;
            } else {
                input.classList.remove("error");
            }
        });

        // Validar campo de Asunto
        if (inputSubject.value.trim() === "") {
            inputSubject.classList.add("error");
            error = true;
        } else {
            inputSubject.classList.remove("error");
        }

       // Validar campo de Mensaje
       const mensaje = inputMessage.value.trim();
       const palabrasMensaje = mensaje.split(/\s+/).length; // Cuenta las palabras

       if (mensaje === "" || palabrasMensaje < 50) {
           inputMessage.classList.add("error");
           error = true;
           Swal.fire({
               title: "Mensaje demasiado corto",
               text: "El mensaje debe contener al menos 50 palabras.",
               icon: "warning"
           });
       } else {
           inputMessage.classList.remove("error");
       }

       return error;
   }

   // Función para limpiar campos del formulario
   function limpiarCampos() {
       inputName.value = "";
       inputEmail.value = "";
       inputSubject.value = "";
       inputMessage.value = "";
   }

   // Función para enviar datos
   function enviarDatos() {
       let errorCamposVacios = validarCamposVacios();

       if (errorCamposVacios) {
           Swal.fire({
               title: "Campos obligatorios vacíos",
               text: "Por favor complete todos los campos requeridos",
               icon: "warning"
           });
       } else {
        
           Swal.fire({
               title: "¡Éxito!",
               text: "Información enviada correctamente",
               icon: "success"
           });
           limpiarCampos();
       }
   }

   // Evento click para enviar datos al hacer clic en el botón
   btnEnviar.addEventListener('click', enviarDatos);
});