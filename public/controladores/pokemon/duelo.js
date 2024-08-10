const buttonDuel = document.getElementById('start-duel')
const buttonReset = document.getElementById('reset-duel');

document.addEventListener("DOMContentLoaded",()=>{
    fetchAllPokemon();
    document.getElementById("pokemon-select-1").addEventListener("change",(event)=>{
        const pokemonSelected = event.target.value;
        if (pokemonSelected) {
            fetchPokemon(pokemonSelected,1);
            displayPokemonImg(pokemonSelected,1);
        }
    });

    document.getElementById("pokemon-select-2").addEventListener("change",(event)=>{
        const pokemonSelected = event.target.value;
        if (pokemonSelected) {
            fetchPokemon(pokemonSelected,2);
         displayPokemonImg(pokemonSelected,2);
        }
    });

    buttonDuel.addEventListener('click',startDuel);
    buttonReset.addEventListener('click', refreshPage);
});



//url: https://pokeapi.co/api/v2/pokemon?limit=151
async function fetchAllPokemon(){
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'

    try {
        const response = await axios.get(url);

        const pokemonList = response.data.results;

        populateDropDownMenu(pokemonList,1);
        populateDropDownMenu(pokemonList,2);

    } catch (error) {
        console.log('Hubo el siguiente error: ', error);
        
    }

}

function populateDropDownMenu(pokemonList, containerId){
    const selectElement = document.getElementById(`pokemon-select-${containerId}`);
    selectElement.innerHTML = '<option value="">Select Pokémon</option>';

    pokemonList.forEach(pokemon=>{
        const option = document.createElement('option');
        option.value = pokemon.name;
        option.textContent = capitalizeFirstLetter(pokemon.name);
        selectElement.appendChild(option);
    })
}


function capitalizeFirstLetter(string){
   return string.charAt(0).toUpperCase() + string.slice(1);
}

//URL  https://pokeapi.co/api/v2/pokemon/ditto
async function fetchPokemon(name, containerId){
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`

    try {
        const response = await axios.get(url);
        const pokemon = response.data;

        displayPokemonInfo(pokemon, containerId);
        displayPokemonImg(pokemon, containerId);

    } catch (error) {
        console.log('Ocurrió el siguiente error: ', error);
    }
}

function displayPokemonInfo(pokemon, containerId){
    const dataContainer = document.getElementById(`statsPokemon${containerId}`);
    
    const hpstats = pokemon.stats.find(stat => stat.stat.name == 'hp');
    const hp = hpstats ? hpstats.base_stat : 100;

    const attacks = pokemon.moves.slice(0,3).map(moveInfo => ({
        name:moveInfo.move.name,
        power:moveInfo.move.power || 20
    }))

    dataContainer.innerHTML = `
    <h2 id="name${containerId}">${capitalizeFirstLetter(pokemon.name)}</h2>
    <h2 id="hpTitle${containerId}"><strong>HP: </strong> <span id="hp-${containerId}">${hp}</span></h2>
    <p id="movesTitle${containerId}"><strong>Ataques: </strong>
    <ul id="movesList${containerId}">
        ${attacks.map(attack => `<li id="listItem${containerId}">${attack.name}: ${attack.power}</li>`).join('')}
    </ul>
    `

    dataContainer.dataset.attacks = JSON.stringify(attacks)
    dataContainer.dataset.hp = hp

}

function displayPokemonImg(pokemon, containerId) {
    const dataContainer = document.getElementById(`imgPokemon${containerId}`);
    dataContainer.innerHTML = `
    <img id="img${containerId}" src="${pokemon.sprites.front_default}" alt="${pokemon.name}"</img>
    `
}

function startDuel(){
    const hp1Element = document.getElementById('hp-1');
    const hp2Element = document.getElementById('hp-2');
    let hp1 = parseInt(hp1Element.textContent);
    let hp2 = parseInt(hp2Element.textContent);
    const attackPokemon1 = JSON.parse(document.getElementById('statsPokemon1').dataset.attacks || '[]');
    const attackPokemon2 = JSON.parse(document.getElementById('statsPokemon2').dataset.attacks || '[]');
  
    if (attackPokemon1.length === 0 || attackPokemon2.length === 0){
        Swal.fire({
            icon: 'error',
            text: 'Seleccione primero un Pokémon'
        });
        return;
    }

    const attack1 = attackPokemon1[Math.floor(Math.random() * attackPokemon1.length)];
    const attack2 = attackPokemon2[Math.floor(Math.random() * attackPokemon2.length)];
  
    hp1 = Math.max(hp1 - attack2.power, 0);
    hp2 = Math.max(hp2 - attack1.power, 0);

    hp1Element.textContent = hp1;
    hp2Element.textContent = hp2;

    Swal.fire({
        icon: 'info',
        title: 'Resultado del duelo',
        html: `
            <p>Pokémon 1 atacó con: ${attack1.name} y causó ${attack1.power} de daño</p>
            <p>Pokémon 2 atacó con: ${attack2.name} y causó ${attack2.power} de daño</p>
        `
    });

    if (hp1 <= 0 || hp2 <= 0) {
        let winner;
        let nombreGanador;

        if (hp1 <= 0 && hp2 <= 0) {
            winner = "Hubo un empate";
            nombreGanador = "Empate";
        } else if (hp1 <= 0) {
            winner = "El Jugador 1 fue derrotado. Jugador 2 es el ganador!";
            nombreGanador = "Jugador 1"
        } else {
            winner = "El Jugador 2 fue derrotado. Jugador 1 es el ganador!";
            nombreGanador = "Jugador 2"
        }

        Swal.fire({
            icon: 'success',
            title: 'Duelo terminado',
            text: winner
        });

        buttonDuel.style.display = 'none';
        buttonReset.style.display = 'block';
    }
}


function refreshPage() {
    window.location.reload();
}
