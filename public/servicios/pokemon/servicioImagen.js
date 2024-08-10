const boton_imagen = document.querySelector("#btn-foto-usuario");
const imagen = document.querySelector("#foto-usuario");

let widget_cloudinary = cloudinary.createUploadWidget({
    cloudName: "dotfkbt7b",
    uploadPreset: "daniel_preset"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log("Imagen registrada", result.info);
        imagen.src = result.info.secure_url;
    }
});

boton_imagen.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);