console.time("index.js");
("use strict");

import { renderRecipes } from "./js/api.js";
import * as cards from "./js/displayCards.js";
import * as filters from "./js/displayFilters.js";
import * as closeFilters from "./js/closeFilters.js";
import * as google from "./js/google.js";

// RÉCUPÈRE LA DATA ET HYDRATE LES COMPOSANTS
export const GET_RECIPES_HYDRATE = (renderRecipes.prototype.getAllRecipes =
  function (recipes) {
    // console.log(recipes);
    cards.DISPLAY_CARDS(recipes);
    filters.DISPLAY_FILTERS(recipes);
    google.IS_GOOGLE(recipes);
    google.IS_TAGGED(recipes);
    return recipes;
  });

// ASSURE L'OUVERTURE ET LA FERMETURE DES FILTRES
let buttons = document.querySelectorAll(".filter__select");
let buttonValue;
buttons.forEach((btn) => {
  // OPEN CLOSE FILTER
  btn.addEventListener("click", () => {
    buttonValue = btn.getAttribute("value");
    // console.log(buttonValue, btn);
    closeFilters.isFiltersInteractive(btn, buttonValue);
  });
});

window.onload = function() {
  document.querySelector(".search__input").value = '';
  }

// --------------------------------------------------------

// AFFICHE LE TEMPS D'EXECUTION DU SCRIPT JS
console.timeEnd("index.js");

// EFFACE LA CONSOLE APRES 7 SECONDE
setTimeout(() => {
  console.clear("this is the first message");
}, 7000);
