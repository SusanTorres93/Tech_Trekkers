//Funcion para crear Usuario
const registrarUsuario = async (pnombre, papellido1, papelldio2, pusuario, pemail, pfechanacimiento, pcedula, ptipocedula, pfoto) => {
    try {
        const res = await axios({
            method: "post",
            url: "http://127.0.0.1:4000/usuario",
            responseType: "json",
            data: {
                nombre: pnombre, 
                primerapellido: papellido1, 
                segundoapellido: papelldio2, 
                usuario: pusuario, 
                correo: pemail, 
                fechanacimiento: pfechanacimiento, 
                cedula: pcedula, 
                tipocedula: ptipocedula, 
                foto: pfoto
            }
        });
        if (res.data.resultado==false) {
            if (res.data.error.code==11000) {
                Swal.fire({
                    title: "No se creo el usuario",
                    text: "El usuario ya esta registrado",
                    icon: "error"
                })
            }
        } else {
            Swal.fire({
                title: "Exito",
                text: "Usuario creado con exito",
                icon: "success",
            })
            setTimeout(() => {
                window.location.href="/public/html/pokemon/login.html"
            }, 2000);
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title:"No se registro el Usuario",
            text:"Contacte al Administrador",
            icon:"error"
        })
    }
    }
    
    