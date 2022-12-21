// console.log("%c api.js", "color: green; font-weight:bold;");

import * as index from "../index.js";

// GET DATA
export const GET_RECIPES = (async () => {
  await fetch("./recipes.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      index.GET_RECIPES_HYDRATE(data.recipes);

    })
    .catch((error) => {
      error.message;
    });
})();

// FUNCTION CONSTRUCTEUR
export function renderRecipes(data) {
  // console.log(data);
  this.data = data;
  this.returnRecipes = function (data) {
    console.log(data);
    return data;
  };
}
