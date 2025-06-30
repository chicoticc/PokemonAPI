let idPokemon = 1; // ID actual del Pokémon

// Buscar por nombre o ID escrito
document.getElementById('buscarPokemon').addEventListener('click', () => {
    const pokemonBuscado = document.getElementById('input').value.toLowerCase();
    obtenerPokemones(pokemonBuscado);
});

// Botón para ir al Pokémon anterior
document.getElementById('btn1').addEventListener('click', () => {
    if (idPokemon > 0) {
        idPokemon -= 1;
        obtenerPokemones(idPokemon);
    } else {
        alert('No existe un Pokémon anterior');
    }
});
document.getElementById('btn2').addEventListener('click', () => {
    if (idPokemon > 0) {
        idPokemon += 1;
        obtenerPokemones(idPokemon);
    } else {
        alert('Error');
    }
})

async function obtenerPokemones(pokemon) {
    try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (respuesta.ok) {
            console.log('respuesta', respuesta)
            const pokemonEncontrado = await respuesta.json();
            idPokemon = pokemonEncontrado.id;
            mostrarPokemon(pokemonEncontrado);
            console.log(pokemonEncontrado);
        } else {
            throw new Error('Error al obtener pokemones desde el servicio');
        }
    } catch (error) {
        console.error('Ha ocurrido un error', error);
        alert('Hubo un error al cargar el pokemon');
    }
}

function mostrarPokemon(pokemon) {
    console.log("Pokemon a mostrar: ", pokemon);
    actualizarHistorial(pokemon.name);

    // Obtener el contenedor donde se mostrará la info
    const contenedor = document.querySelector('#pokemonInfo');
    contenedor.innerHTML = ''; // Limpiar contenido anterior

    contenedor.innerHTML = `
    <div class="card text-center bg-warning" style="width: 18rem; margin: auto;">
      <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="Imagen de ${pokemon.name}">
      <div class="card-body">
        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
        <p class="card-text text-capitalize">Experiencia Base: ${pokemon.base_experience}</p>
        <p class="card-text text-capitalize">Tipo: ${pokemon.types[0].type.name}</p>
      </div>
    </div>
  `;
}

const historial = [];

function actualizarHistorial(nombre) {
    // Si ya está en el historial, lo sacamos
    const index = historial.indexOf(nombre);
    if (index !== -1) historial.splice(index, 1);

    // Lo agregamos al inicio
    historial.unshift(nombre);

    // Limitar a 5 elementos
    if (historial.length > 5) historial.pop();

    renderizarHistorial();
}

function renderizarHistorial() {
    const lista = document.getElementById('listaHistorial');
    lista.innerHTML = '';

    historial.forEach(nombre => {
        const item = document.createElement('li');
        item.textContent = nombre;
        item.classList.add('list-group-item', 'text-capitalize');
        lista.appendChild(item);
    });
}
