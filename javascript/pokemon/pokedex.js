document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let offset = 0;

    async function fetchPokemon(offset) {
        gallery.innerHTML = '';
        try {
            for (let i = offset + 1; i <= offset +5; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                    continue;
                }
                const pokemon = await response.json();
                await displayPokemon(pokemon);
            }
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }

    async function displayPokemon(pokemon) {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');

        const sprite = document.createElement('img');
        sprite.src = pokemon.sprites.front_default;
        sprite.alt = pokemon.name;

        const name = document.createElement('h2');
        name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        const type = document.createElement('p');
        type.textContent = `Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}`;

        const weight = document.createElement('p');
        weight.textContent = `Peso: ${pokemon.weight / 10} kg`;

        const height = document.createElement('p');
        height.textContent = `Altura: ${pokemon.height / 10} m`;

        const description = document.createElement('p');
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
        if (speciesResponse.ok) {
            const speciesData = await speciesResponse.json();
            const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
            description.textContent = `${flavorText ? flavorText.flavor_text.replace(/\n|\f/g, ' ') : 'No hay descripción disponible.'}`;
        } else {
            description.textContent = 'No hay descripción disponible.';
        }

        card.appendChild(sprite);
        card.appendChild(name);
        card.appendChild(type);
        card.appendChild(weight);
        card.appendChild(height);
        card.appendChild(description);
        gallery.appendChild(card);

        setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('fade-in');
        }, 50);
    }

    function updateGallery() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.classList.add('fade-out'));
        
        setTimeout(() => {
            fetchPokemon(offset);
        }, 600); 
    }

    prevButton.addEventListener('click', () => {
        if (offset > 0) {
            offset -= 10;
            updateGallery();
        }
    });

    nextButton.addEventListener('click', () => {
        offset += 10;
        updateGallery();
    });

    fetchPokemon(offset);
});
