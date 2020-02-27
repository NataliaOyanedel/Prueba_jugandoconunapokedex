
const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;


form.addEventListener('submit', function (e){
  e.preventDefault();
  responseContainer.innerHTML = '';
  searchedForText = searchField.value;
  getPokemon();
  
})


function getPokemon() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://pokeapi.co/api/v2/pokemon/${searchedForText}`);
  articleRequest.onload = addPokemon;
  articleRequest.onerror = handleError;
  articleRequest.send();

}

function grafico(data) {
  var chart = new CanvasJS.Chart("chartContainer",
  {
    backgroundColor: "transparent",
    title:{
     text: "Gráfico POKEDEX"       
    },
    data: [
    {        
      type: "column",
      toolTipContent: "{label}: {y}",
      dataPoints: [
      
        { label: data.stats[0].stat.name, y: data.stats[0].base_stat }, 
        { label: data.stats[1].stat.name, y: data.stats[1].base_stat }, 
        { label: data.stats[2].stat.name, y: data.stats[2].base_stat }, 
        { label: data.stats[3].stat.name, y: data.stats[3].base_stat }, 
        { label: data.stats[4].stat.name, y: data.stats[4].base_stat }, 
        { label: data.stats[5].stat.name, y: data.stats[5].base_stat }, 
      ]
    }
    ]
  });

  chart.render();
}


function handleError() {
  console.log('Se ha presentado un error');
}

function addPokemon() {
  const data = JSON.parse(this.responseText);
  //const response = data.response;
  console.log(data);

  //console.log(article);

  let imgPokemon = document.createElement('img');
  imgPokemon.className= 'img-responsive';
  imgPokemon.style.width='10em';
  let picture = data.sprites.front_default;
  imgPokemon.src= picture;
  responseContainer.appendChild(imgPokemon);


  let names = document.createElement('li');
  let namesPokemon = data.name;
  console.log(namesPokemon);
  //names.appendChild(namesPokemon);
  names.innerText = 'Nombre: ' + namesPokemon;
  responseContainer.appendChild(names);

  let li = document.createElement('li');
  const pokemon = [];
  for (let i=0; i < data.abilities.length; i++ ){
    pokemon.push(data.abilities[i].ability.name);
    console.log(data.abilities);
  }
console.log(pokemon);
  li.innerText = 'Habilidades: ' + pokemon;
  responseContainer.appendChild(li);

  let type = document.createElement('li');
  let typesPokemon = data.types[0].type.name;
  console.log(typesPokemon);
  type.innerText = 'Type: ' + typesPokemon;
  responseContainer.appendChild(type);

  let experience = document.createElement('li');
  let experiencePokemon = data.base_experience;
  console.log(experiencePokemon);
  experience.innerText = 'Experience: ' + experiencePokemon;
  responseContainer.appendChild(experience);

responseContainer.style.display='block';

grafico(data);


  
  }









