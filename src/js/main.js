"use strict";
// QUERYSELECTOR
const btnSearch = document.querySelector(".js_btn");
const form = document.querySelector('.js_form');
const listCard = document.querySelector(".js_listCard");
const sectionFavourite = document.querySelector(".js_sectionFavourite");
const chromesFavourites = document.querySelector(".js_chromesFavourites");
const liFavourites = document.querySelector(".js_liFavourites");


// VARIABLES DE DATOS
let chartersList = []; //array inicial
let favouriteData = []; //array de favoritos

// FUNCIONES

// FUNCIONES HANDLE

// Evento de clic en un cromo
function handleClickChromes(event) {
    const favChrome = event.currentTarget;
  
    const selectedId = favChrome.dataset.id; // Obtener el id del cromo seleccionado
  console.log(selectedId);
    const selectFav = chartersList.find((charters) => charters._id === parseInt(selectedId)); // Buscar el cromo en la lista de datos
  console.log(selectFav);
    const favouriteIndex = favouriteData.findIndex((charters) => charters._id === selectedId);
  
    if (favouriteIndex === -1) {
      favouriteData.push(selectFav);

    } else {
      favouriteData.splice(favouriteIndex, 1);
    }
  
    renderFavourites();
    favChrome.classList.toggle("favourite");
    // Hacer algo con el cromo seleccionado (en este caso, imprimir en la consola)
    console.log(selectFav); // cromo seleccionado como favorito
    console.log(favouriteIndex);
  }

// EVENTOS
// Evento click en buscar
btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    // traer el value del form
    const formValue = form.querySelector('input').value;
    fetch(`//api.disneyapi.dev/character?name=${formValue}`)
    .then((response) => response.json())
    .then(data => {
        chartersList = data.data;
        listCard.innerHTML = "";
        renderAll(); // Renderizar después de obtener los datos de la API
        console.log(chartersList);
    });

    // al click en el boton, ir a la api
});

// CÓDIGO CUANDO INICIA LA PÁGINA
//Funcion pintar un cromo
function renderOne(charters) {
  listCard.innerHTML += `
        <li class="chrome js_oneChrome" data-id="${charters._id}">
            <img class="photo" src="${charters.imageUrl}" alt="" />
            <h3>${charters.name}</h3>
        </li>
    `;
}
//Funcion pintar todos los cromos
function renderAll() {
  for (let i = 0; i < chartersList.length; i++) {
    renderOne(chartersList[i]);
  }
  const oneChrome = document.querySelectorAll(".js_oneChrome");

  for (const chrome of oneChrome) {
    chrome.addEventListener("click", handleClickChromes);
  }
}
//Pintar un favorito
function renderOneFavourite(favouriteData) {
    liFavourites.innerHTML += `<li class="chrome js_oneChrome">
    <img class="photo" src="${favouriteData.imageUrl}" alt="" />
    <h3>${favouriteData.name}</h3>
</li>`;
}

//Funcion pintar favoritos
function renderFavourites() {
    liFavourites.innerHTML ='';
    for (let i = 0; i < favouriteData.length; i++) {
        renderOneFavourite(favouriteData[i])
      }
}


// Pintar los cromos
fetch('//api.disneyapi.dev/character')
  .then((response) => response.json())
  .then((data) => {
    chartersList = data.data;
    renderAll();

    // console.log(data.data);
  });

console.log(">> Ready :)");
