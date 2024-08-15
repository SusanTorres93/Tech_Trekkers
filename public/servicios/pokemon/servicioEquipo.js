const registrarEquipo = async (pnombreEquipo, pnombreAmigo) => {
    try {
        const res = await axios({
            responseType: "json",
            data:{
                nombreEquipo: pnombreEquipo,
                nombreAmigo: pnombreAmigo
            }
        })

        if(res.data.resultado==false){
            if(res.data.error.code==11000){
                Swal.fire({
                    title:"No se completo el registro del gimnasio",
                    text:"El gimnasio ya está registrado",
                    icon:"error"
                })
            }
        } else {
            Swal.fire({
                title:"Éxito",
                text:"Equipo registrado",
                icon:"success"
            })

            setTimeout(() => {
                window.location.href="gimn.html"
            }, 1000);
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire({
            title:"No se registró el gimnasio",
            text:"Pongase en contacto con el admin del sistema",
            icon:"error"
        })  
    }
}
