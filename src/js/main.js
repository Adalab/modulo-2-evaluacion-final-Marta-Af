"use strict";
// QUERYSELECTOR
const btnSearch = document.querySelector(".js_btn");
const form = document.querySelector(".js_form");
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

  const selectFav = chartersList.find(
    (charters) => charters._id === parseInt(selectedId)
  ); // Buscar el cromo en la lista de datos

  const favouriteIndex = favouriteData.findIndex(
    (charters) => charters._id === parseInt(selectedId)
  );

  if (favouriteIndex === -1) {
    favouriteData.push(selectFav);
  } else {
    favouriteData.splice(favouriteIndex, 1);
  }
  localStorage.setItem("favouriteData", JSON.stringify(favouriteData));
  // pintar favoritos
  renderFavourites();
  favChrome.classList.toggle("favourite");

  // Opcionalmente se ha eliminado la clase hidden para que aparezca la seccion de favoritos al hacer click en un cromo
  sectionFavourite.classList.remove("hidden");
}
// EVENTOS
// Evento click en buscar
btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  // traer el value del form
  const formValue = form.querySelector("input").value;
  fetch(`//api.disneyapi.dev/character?name=${formValue}`)
    .then((response) => response.json())
    .then((data) => {
      chartersList = data.data;
      listCard.innerHTML = "";
      renderAll(); // Renderizar después de obtener los datos de la API
      console.log(chartersList);
    });
});

// CÓDIGO CUANDO INICIA LA PÁGINA
//Funcion pintar un cromo
function renderOne(charters) {
  if (charters.imageUrl === undefined) {
    listCard.innerHTML += `
        <li class="chrome js_oneChrome" data-id="${charters._id}">
          <img class="photo" src="https://via.placeholder.com/210x295/ffffff/555555/?text=Disney" alt="" />
          <h3>${charters.name}</h3>
        </li>
      `;
  } else {
    listCard.innerHTML += `
        <li class="chrome js_oneChrome" data-id="${charters._id}">
          <img class="photo" src="${charters.imageUrl}" alt="" />
          <h3>${charters.name}</h3>
        </li>
      `;
  }
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
function renderOneFavourite(favourite) {
  liFavourites.innerHTML += `<li class="chrome js_oneChrome" data-id="${favourite._id}">
    <button class="btnStar js_btnReset" data-id="${favourite._id}">&times;</button>
      <img class="photo" src="${favourite.imageUrl}" alt="" />
      
      <h3>${favourite.name}</h3>
    </li>`;

  
}


//Funcion pintar favoritos
function renderFavourites() {
  liFavourites.innerHTML = "";

  for (let i = 0; i < favouriteData.length; i++) {
    renderOneFavourite(favouriteData[i]);
  }
  const btnResets = document.querySelectorAll(".js_btnReset");
  // console.log(btnReset);
  // console.log(JSON.stringify(favouriteData));
  // console.log(favouriteData);

  btnResets.forEach((btnResets) => {})
// Eliminar favorito
btnResets.forEach((btnReset) => {
  btnReset.addEventListener("click", (event) => {
    const clickResetBtn = event.currentTarget;
    const selectedId = clickResetBtn.dataset.id;
    console.log(selectedId);

    const clickResetFavouriteIndex = favouriteData.findIndex(
      (charter) => charter._id === parseInt(selectedId)
    );
    console.log(clickResetFavouriteIndex);

    // Elimina el favorito
    favouriteData.splice(clickResetFavouriteIndex, 1);
    
    // Vuelve a pintar los favoritos
    renderFavourites();
  });
});
}

// Pintar los cromos
fetch("//api.disneyapi.dev/character")
  .then((response) => response.json())
  .then((data) => {
    chartersList = data.data;
    renderAll();

   console.log(data.data);
  });

console.log(">> Ready :)");
