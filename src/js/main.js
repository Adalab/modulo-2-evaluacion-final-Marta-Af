"use strict";
// QUERYSELECTOR
const btnSearch = document.querySelector(".js_btn");
const listCard = document.querySelector(".js_listCard");
const sectionFavourite = document.querySelector('.js_sectionFavourite');
const chromesFavourites = document.querySelector('.js_chromesFavourites');
const liFavourites = document.querySelector('.js_liFavourites');



// VARIABLES DE DATOS
let chartersList = [];


// FUNCIONES

// FUNCIONES HANDLE

// Evento de clic en un cromo
function handleClickChromes(event) {
    const favChrome = event.currentTarget;
    favChrome.classList.toggle('favourite');

    // Obtener el id del cromo seleccionado
    const selectedId = favChrome.dataset.id;

    // Buscar el cromo en la lista de datos
    const selectFav = chartersList.find(charters => charters._id == selectedId);

    // Hacer algo con el cromo seleccionado (en este caso, imprimir en la consola)
    console.log(selectFav);
}

  
// EVENTOS
// btnSearch.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log("Clic");
// });

// CÓDIGO CUANDO INICIA LA PÁGINA
//Funcion pintar uno
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
// Pintar los cromos
fetch("//api.disneyapi.dev/character")
  .then((response) => response.json())
  .then((data) => {
    chartersList = data.data;
    renderAll();

    // console.log(data.data);
  });



console.log(">> Ready :)");
