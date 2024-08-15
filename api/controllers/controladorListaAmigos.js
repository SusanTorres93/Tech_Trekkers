//referencia al DOM
const cuerpoTabla = document.querySelector("#tablaAmigos tbody");

let listaAmigosRecuperados = [];

const crearBotones =(fila,i)=>{
    let celda_acciones = fila.insertCell()
    let boton_eliminar = document.createElement('button')
    let boton_editar = document.createElement('button')

    boton_editar.innerText="Editar"
    boton_editar.style.backgroundColor="blue"
    boton_editar.style.color = "#fff"
    boton_editar.style.padding = '10px'
    boton_editar.style.marginRight='10px'
    boton_editar.style.cursor = "pointer"


    boton_eliminar.innerText="Eliminar"
    boton_eliminar.style.backgroundColor="red"
    boton_eliminar.style.color = "#fff"
    boton_eliminar.style.padding = '10px'
    boton_eliminar.style.cursor = "pointer"

    celda_acciones.appendChild(boton_editar)
    celda_acciones.appendChild(boton_eliminar)

    boton_eliminar.addEventListener("click",()=>{

        localStorage.setItem("mongo_id", listaAmigosRecuperados[i]["_id"]);
        let id = localStorage.getItem("mongo_id");
        eliminarAmigo(id);
        Swal.fire({
            icon: "success",
            title: "Amigo Eliminado",
            showConfirmButton: false,
            timer: 1500
          });
    })        

}

const mostrarAmigosEnTabla = async()=>{
    listaAmigosRecuperados = await listarAmigos()

    cuerpoTabla.innerHTML=""

    for(let i=0; i<listaAmigosRecuperados.length;i++){
        let fila = cuerpoTabla.insertRow()

        fila.insertCell().innerHTML = listaAmigosRecuperados[i]["nombre"]

        crearBotones(fila,i);
    }

    
}    

mostrarAmigosEnTabla();