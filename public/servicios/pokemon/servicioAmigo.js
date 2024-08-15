const registaramigo = async (pnombre) => {
    try {
        const res = await axios({
            method: "post",
            url: "http://localhost:3000/amigo",
            responseType: "json",
            data:{
                nombre:pnombre,
            }
        })

        if(res.data.resultado==false){
            if(res.data.error.code==11000){
                Swal.fire({
                    title:"No se completo el registro",
                    text:"El amigo ya esta agregado",
                    icon:"error"
                })
        }
        
        }else{
            Swal.fire({
                title:"Exito",
                text:"Amigo registrado",
                icon:"success"
            })

            setTimeout(() => {
                window.location.href="friends.html"
            }, 1000);
            
        }
    } catch (error) {
        console.log(error);
        Swal.fire({
            title:"No se registró el amigo",
            text:"Pongase en contacto con el admin del sistema",
            icon:"error"
        })
    }
}

const listarAmigos = async () => {
    let listaAmigosDB = [];
    try {
        const res = await axios({
            method:'get',
            url:'http://localhost:3000/amigo',
            responseType:'json'
        })

        listaAmigosDB = res.data.friends
        
    } catch (error) {
        console.log(error);
        Swal.fire({
            text:"No se pudieron recuperar la lista de amigos de la base de datos",
            icon:"error"
        }) 
    }

    return listaAmigosDB;
}

const eliminarAmigo = async(id)=>{
    try {
        const res  =  await axios({
            method:'delete',
            url:'http://localhost:3000/amigo',
            params:{id}, //req.query
            responseType:"json"
        });

        setTimeout(() => {
            window.location.href="friends.html"
        }, 1000);
 
    } catch (error) {
        console.log(error);
        Swal.fire({
            text:"No se pudo eliminar el amigo",
            icon:"error"
        })
    }
}

//servicio para recuperar a la persona por su id
const recuperarAmigoID = async(id)=>{
    try {
        const response = await axios({
            method:'get',
            url:'http://localhost:3000/amigoID',
            params:{id:id},
            responseType:'json'
        });
        if(response.status == 200){
            return response.data.amigo
        }else{
            Swal.fire({
                text:"No se encontro al amigo",
                icon:"error"
            });
            return null
        }
    } catch (error) {
        console.log(error);
        
    }
}
