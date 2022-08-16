const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-image-container]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeType = document.querySelector('[data-poke-type]');
const pokeStats = document.querySelector('[data-poke-stats]');





const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())

} 

const renderPokemonData = data => {
	const sprite = data.sprites.front_default;
	const { stats, types } = data;

	pokeName.textContent = data.name;
	pokeImg.setAttribute('src', sprite);
	pokeImg.style.background =  '#cdf0ff';
	pokeId.textContent = `Nº ${data.id}`;
	renderPokemonStats(stats);
}

const renderPokemonStats = stats => {
	pokeStats.innerHTML = '';
	stats.forEach(stat => {
		const statElement = document.createElement("div");
		const statsElementName = document.createElement("div");
		const statsElementAmmout = document.createElement("div");
		statsElementName.textContent = stat.stat.name;
		statsElementAmmout.textContent = stat.base_stat;
		statElement.appendChild(statsElementName);
		statElement.appendChild(statsElementAmmout);
		pokeStats.appendChild(statElement);
	});
}

// Validación //

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'nose.png');
    pokeImg.style.background =  '#cdf0ff';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}