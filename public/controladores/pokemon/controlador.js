let chart; //variable global para el grafico

//una consulta al API para listar/recuperar todos los pokemones
//la funcion devuelve la informacion de los 150 pokemons
async function fetchPokemonList(){
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    const data = await response.json()
    //console.log(data.results);
    return data.results

}

//funcion que popula los select
async function populatePokemonSelects(){
    const pokemonList = await fetchPokemonList();
    //referencia a ambos select
    const select1 = document.getElementById('pokemon1')
    const select2 = document.getElementById('pokemon2')

    pokemonList.forEach(pokemon=>{
        const option1 = document.createElement('option')
        const option2 = document.createElement('option')
        option1.value = pokemon.name
        option2.value = pokemon.name

        option1.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        option2.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

        select1.appendChild(option1)
        select2.appendChild(option2)
    })
}

//crear una funcion que devuelve la info de un pokemon seleccionado
async function fetchPokemonData(pokemonName){
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
   const data = await response.json();
   return data
}

//funcion para cargar la imagen del pokemon seleccionado
async function updatePokemonImage(selectId){
    //crear la referencia al select
    const pokemonSelected = document.getElementById(selectId).value
    if(pokemonSelected){
        const data = await fetchPokemonData(pokemonSelected)
        //console.log(data)
        const imgElement = document.getElementById(`${selectId}Image`)
        imgElement.src = data.sprites.front_default
        imgElement.style.display='block'
        
    }

}


//funcion para la creacion del grafico
function createChart(pokemon1,pokemon2){
    const ctx = document.getElementById("comparisonChart").getContext('2d')

    //si existe un grafico lo vamos a destruir
    if(chart){
        chart.destroy()
    }

    //caso contrario si no existe lo vamos a crear
    chart = new Chart(ctx,{
        type:"radar",
        data:{
            labels:['HP','Ataque','Defensa','Ataque Especial','Defensa Especial','Velocidad'],
            datasets:[
                {
                    label:pokemon1.name,
                    data:[
                        pokemon1.stats[0].base_stat,
                        pokemon1.stats[1].base_stat,
                        pokemon1.stats[2].base_stat,
                        pokemon1.stats[3].base_stat,
                        pokemon1.stats[4].base_stat,
                        pokemon1.stats[5].base_stat,
                    ],
                    backgroundColor:'rgba(255,99,132,0.2)',
                    borderColor:'rgba(255,99,132,1)',
                    borderWidth:1
   
                },
                {
                    label:pokemon2.name,
                    data:[
                        pokemon2.stats[0].base_stat,
                        pokemon2.stats[1].base_stat,
                        pokemon2.stats[2].base_stat,
                        pokemon2.stats[3].base_stat,
                        pokemon2.stats[4].base_stat,
                        pokemon2.stats[5].base_stat,
                    ],
                    backgroundColor:'rgba(54,162,235,0.2)',
                    borderColor:'rgba(54,162,235,1)',
                    borderWidth:1
   
                }

            ]
        },
        options:{
            scale:{
                ticks:{beginAtZero:true}
            }
        }

    })
}

//crear una funcion que realiza la comparacion
async function comparePokemon(){
    const pokemon1 = document.getElementById('pokemon1').value
    const pokemon2 = document.getElementById('pokemon2').value

    if(!pokemon1 || !pokemon2){
        Swal.fire({
            text:'No seleccionas nada',
            icon:'info'
        })
        return;
    }
        const dataPokemon1 = await fetchPokemonData(pokemon1)
        const dataPokemon2 = await fetchPokemonData(pokemon2)

        createChart(dataPokemon1,dataPokemon2)
    
}

function resetComparison(){
    document.getElementById('pokemon1').selectedIndex = 0
    document.getElementById('pokemon2').selectedIndex = 0
    document.getElementById('pokemon1Image').style.display='none'
    document.getElementById('pokemon2Image').style.display='none'
    if(chart){
        chart.destroy()
    }
}


window.onload = populatePokemonSelects()