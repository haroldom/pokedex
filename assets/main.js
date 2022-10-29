const API = 'https://pokeapi.co/api/v2';
const content = null || document.querySelector('.pokes_main');
const type_container = null || document.querySelector('.poke_container__type');
const loader_screen = null || document.querySelector('.loader-wrapper');

const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};


async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

(async()=>{
    try{
        // List pokemons almacena los pokemons mapeados con solo 4 atributos
        let result_api = await fetchData(`${API}/pokemon?limit=100&offset=0`); 
        result_api = result_api.results;
        let list_pokemons = [];
        for (let index = 0; index < result_api.length; index++) {
            list_pokemons.push(await fetchData(`${result_api[index].url}`))
        }
        loader_off(true)
        list_pokemons = list_pokemons.map(pokemon=>{
            return({
                id: pokemon.id.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
                name: pokemon.name,
                image: pokemon.sprites.other.home.front_default,
                type: pokemon.types.map(type=>type.type.name)
            })
        })




        let view = `
        ${list_pokemons.map(pokemon=>`
        <div class="poke_container" style="background-color:${colours[pokemon.type[0]]}">
            <p class="poke_container__text id">#${pokemon.id}</p>
            <p class="poke_container__text title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            <div class="poke_container__type">
                ${pokemon.type.map(typepoke=>`
                <div class="type_container">
                    <p class="poke_container__type_text">${typepoke.charAt(0).toUpperCase() + typepoke.slice(1)}</p>
                </div>
                `).join('') 
                }
            </div>
            <img class="poke_container__img" src="${pokemon.image}" alt="poke-imagen">
            <img class="poke_container__background" src="./pokeball.png" alt="pokeball">
        </div>
        `).join('')}

        `;



        content.innerHTML=view;



        }catch(error){
            console.log(error);
        }
    })();

function loader_off(condition){
    condition
    ? loader_screen.classList.add('hidden') : console.log('its false');
}