// console.log("%c displayFilters.js", "color: green; font-weight:bold;");

import { renderRecipes } from "./api.js";
import * as utils from "./utils.js";
import { listenFilter } from "./displayTags.js";

var distinctIngredients = [];
var distinctAppliance = [];
var distinctUstensils = [];
// NEW DATA ARRAY : distinct INGREDIENTS
export const displayFilterIngredients =
  (renderRecipes.prototype.displayFilterIngredients = function (data, filter) {
    for (const recipe of data) {
      // console.log(recipe);
      for (const ingredient of recipe.ingredients) {
        let currentIngredient = ingredient.ingredient.toLowerCase().trim();
        // console.log(currentIngredient);
        if (distinctIngredients.length === 0) {
          distinctIngredients.push(currentIngredient);
          // console.log(ingredients);
        } else {
          let isIn = false;
          for (const itemInIngredients of distinctIngredients) {
            // console.log(itemInIngredients);
            if (itemInIngredients === currentIngredient) {
              isIn = true;
            }
          }
          if (!isIn) {
            distinctIngredients.push(currentIngredient);
          }
        }
      }
    }

    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctIngredients.filter((ingredient) =>
        ingredient.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return distinctIngredients;
  });

// NEW SET : distinct APPLIANCE
export const displayFilterAppliance =
  (renderRecipes.prototype.displayFilterAppliance = function (data, filter) {
    for (const recipe of data) {
      // console.log(recipe);
      // for (const appliance of recipe) {
      // console.log(recipe.appliance);
      let currentAppliance = recipe.appliance.toLowerCase().trim();
      // console.log(currentAppliance);
      if (distinctAppliance.length === 0) {
        distinctAppliance.push(currentAppliance);
        // console.log(distinctAppliance);
      } else {
        let isIn = false;
        for (const itemInAppliance of distinctAppliance) {
          // console.log(itemInIngredients);
          if (itemInAppliance === currentAppliance) {
            isIn = true;
          }
        }
        if (!isIn) {
          distinctAppliance.push(currentAppliance);
        }
      }
      // }
    }

    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctAppliance.filter((appliance) =>
        appliance.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return distinctAppliance;
  });

// NEW SET : distinct USTENSILS
export const displayFilterUstensils =
  (renderRecipes.prototype.displayFilterUstensils = function (data, filter) {
    for (const recipe of data) {
      // console.log(recipe);
      for (const ustensil of recipe.ustensils) {
        let currentUstensil = ustensil.toLowerCase().trim();
        // console.log(currentUstensil);
        if (distinctUstensils.length === 0) {
          distinctUstensils.push(currentUstensil);
          // console.log(ustensil);
        } else {
          let isIn = false;
          for (const itemInUstensils of distinctUstensils) {
            // console.log(itemInUstensils);
            if (itemInUstensils === currentUstensil) {
              isIn = true;
            }
          }
          if (!isIn) {
            distinctUstensils.push(currentUstensil);
          }
        }
      }
    }

    // SI RECHERCHE DANS INPUT....
    if (filter) {
      return distinctUstensils.filter((ustensil) =>
        ustensil.includes(filter.toLowerCase().trim())
      );
    }
    // SANS RECHERCHE
    return distinctUstensils;
  });

// HYDRATE HTML DANS LES FILTRES
const list_HTML = (renderRecipes.prototype.getList_HTML = (
  distinctData,
  datacolor
) => {
  // console.log(distinctData, datacolor);
  let li_HTML = "";
  distinctData.map((setLi) => {
    li_HTML += `<li class="filter__custom-option" data-color="${datacolor}">${utils.capitalize(
      setLi
    )}</li>`;
  });
  // console.log(li_HTML);
  return li_HTML;
});

// TEST CONDITIONNEL POUR ROUTER HTML
export const hydrateFilter = (renderRecipes.prototype.hydrateFilter = function (
  data,
  value,
  btn,
  datacolor,
  filter
) {
  // console.log(value);
  // console.log(data, value, btn, filter);
  switch (value) {
    case "Ingrédients":
      // console.log(data, filter);
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--primary">
      ${list_HTML(displayFilterIngredients(data, filter), datacolor)}
      </ul>`
      );
      break;
    case "Appareil":
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--success">
      ${list_HTML(displayFilterAppliance(data, filter), datacolor)}
      </ul>`
      );
      break;
    case "Ustensiles":
      btn.insertAdjacentHTML(
        "afterend",
        `
        <ul class="filter__custom-menu filter__custom-menu--danger">
      ${list_HTML(displayFilterUstensils(data, filter), datacolor)}
      </ul>`
      );
      break;
    default:
      break;
  }
});

// FONCTION GLOBALE
export const DISPLAY_FILTERS = (renderRecipes.displayFilters = function (
  data,
  btn,
  filter,
  value,
  color
) {
  if (btn && filter && value && color) {
    // console.log(data, btn, filter, value, color);
    hydrateFilter(data, value, btn, color, filter);
  } else if (data) {
    document.querySelectorAll(".filter__select").forEach((button) => {
      let value = button.getAttribute("value");
      // console.log(value, button);
      let datacolor = button.getAttribute("data-color");

      // console.log(data, value, button, datacolor);
      hydrateFilter(data, value, button, datacolor);
    });
  }

  // ECOUTE L'ENSEMBLE DES LI (textcontent et color)
  listenFilter(data, document.querySelectorAll(".filter__custom-option"));
});
