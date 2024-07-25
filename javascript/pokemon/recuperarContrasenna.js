document.addEventListener('DOMContentLoaded', () => {
    const inputEmail = document.getElementById("email");
    const btnRecuperar = document.getElementById("btnRecuperar");
    const form = document.getElementById("recuperarForm");

    function validarCamposVacios() {
        let error = false;
        let required_inputs = document.querySelectorAll("#recuperarForm [required]");
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

    function validarEmail() {
        let error = false;
        let textoEmail = inputEmail.value.trim();
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(textoEmail)) {
            inputEmail.classList.add("error");
            error = true;
        } else {
            inputEmail.classList.remove("error");
        }
        return error;
    }

    async function enviarDatos(event) {
        event.preventDefault();

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
            try {
                const response = await fetch('/api/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: inputEmail.value })
                });
                const result = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: "Correo enviado",
                        text: "Hemos enviado un correo electrónico con instrucciones para recuperar tu contraseña.",
                        icon: "success"
                    }).then(() => {
                        window.location.href = "/Pokemon/login.html";
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: result.error || "Ocurrió un error al enviar el correo.",
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al enviar el correo.",
                    icon: "error"
                });
            }
        }
    }

    form.addEventListener('submit', enviarDatos);
});
