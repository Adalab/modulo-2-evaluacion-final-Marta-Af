"use strict";
// QUERYSELECTOR
const btnSearch = document.querySelector(".js_btn");
const listCard = document.querySelector(".js_listCard");


// VARIABLES DE DATOS
let chartersList = [];


// FUNCIONES

// FUNCIONES HANDLE

//Funcion pintar uno
function renderOne(charters) {
  listCard.innerHTML += `
        <li class="chrome js_oneChrome">
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

function handleClickChromes(event) {
    console.log(event.currentTarget);

    const favChrome = event.currentTarget;
    favChrome.classList.toggle('favourite')

  }

  
// EVENTOS
// btnSearch.addEventListener('click', (event) => {
//     event.preventDefault();
//     console.log("Clic");
// });

// CÓDIGO CUANDO INICIA LA PÁGINA
// Pintar los cromos
fetch("//api.disneyapi.dev/character")
  .then((response) => response.json())
  .then((data) => {
    chartersList = data.data;
    renderAll();

    // console.log(data.data);
  });



console.log(">> Ready :)");
