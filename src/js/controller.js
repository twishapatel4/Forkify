import * as model from './model.js';
import recipeView from './views/recipeView.js';
import serachView from './views/serachView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';

if (module) {
  module.hot.accept();
}
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const ControlRecipe = async function () {
  try {
    console.log('controlRecipe triggered');
    const id = window.location.hash.slice(1);
    console.log('Recipe ID:', id);
    if (!id) return;
    recipeView.renderSpinner();
    //0.Update results view to mark selected search result
    // resultsView.update(model.getSearchResultsPage);

    //1. Loading Recipe
    await model.loadRecipe(id);

    const { recipe } = model.state;
    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {
    //1.Get Search query
    const query = serachView.getQuery();

    if (!query) return;

    //2. Load Search Results
    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    //3.Render results
    resultsView.render(model.getSearchResultsPage(1));

    //4.Render initial pagination buttons
    paginationView.render(model.state.search);
    //console.log(model.state.search.results);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};

const controlBookmark = async function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe);
  }
  recipeView.render(model.state.recipe);
};

// controlSearch();
const controlPagination = async function (page) {
  console.log('heloo');
  resultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlServings = async function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(ControlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  serachView.addHandlerRender(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};
init();
// window.addEventListener('hashchange', showRecipe);

/////////////////////////////////////////////////////////////////////////////
// import * as model from './model.js';
// import { MODAL_CLOSE_SEC } from './config.js';
// import recipeView from './views/recipeView.js';
// import searchView from './views/searchView.js';
// import resultsView from './views/resultsView.js';
// import paginationView from './views/paginationView.js';
// import bookmarksView from './views/bookmarksView.js';
// import addRecipeView from './views/addRecipeView.js';

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import { async } from 'regenerator-runtime';

// const controlRecipes = async function () {
//   try {
//     const id = window.location.hash.slice(1);

//     if (!id) return;
//     recipeView.renderSpinner();

//     // 0) Update results view to mark selected search result
//     resultsView.update(model.getSearchResultsPage());

//     // 1) Updating bookmarks view
//     bookmarksView.update(model.state.bookmarks);

//     // 2) Loading recipe
//     await model.loadRecipe(id);

//     // 3) Rendering recipe
//     recipeView.render(model.state.recipe);
//   } catch (err) {
//     recipeView.renderError();
//     console.error(err);
//   }
// };

// const controlSearchResults = async function () {
//   try {
//     resultsView.renderSpinner();

//     // 1) Get search query
//     const query = searchView.getQuery();
//     if (!query) return;

//     // 2) Load search results
//     await model.loadSearchResults(query);

//     // 3) Render results
//     resultsView.render(model.getSearchResultsPage());

//     // 4) Render initial pagination buttons
//     paginationView.render(model.state.search);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const controlPagination = function (goToPage) {
//   // 1) Render NEW results
//   resultsView.render(model.getSearchResultsPage(goToPage));

//   // 2) Render NEW pagination buttons
//   paginationView.render(model.state.search);
// };

// const controlServings = function (newServings) {
//   // Update the recipe servings (in state)
//   model.updateServings(newServings);

//   // Update the recipe view
//   recipeView.update(model.state.recipe);
// };

// const controlAddBookmark = function () {
//   // 1) Add/remove bookmark
//   if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
//   else model.deleteBookmark(model.state.recipe.id);

//   // 2) Update recipe view
//   recipeView.update(model.state.recipe);

//   // 3) Render bookmarks
//   bookmarksView.render(model.state.bookmarks);
// };

// const controlBookmarks = function () {
//   bookmarksView.render(model.state.bookmarks);
// };

// const controlAddRecipe = async function (newRecipe) {
//   try {
//     // Show loading spinner
//     addRecipeView.renderSpinner();

//     // Upload the new recipe data
//     await model.uploadRecipe(newRecipe);
//     console.log(model.state.recipe);

//     // Render recipe
//     recipeView.render(model.state.recipe);

//     // Success message
//     addRecipeView.renderMessage();

//     // Render bookmark view
//     bookmarksView.render(model.state.bookmarks);

//     // Change ID in URL
//     window.history.pushState(null, '', `#${model.state.recipe.id}`);

//     // Close form window
//     setTimeout(function () {
//       addRecipeView.toggleWindow();
//     }, MODAL_CLOSE_SEC * 1000);
//   } catch (err) {
//     console.error('💥', err);
//     addRecipeView.renderError(err.message);
//   }
// };

// const init = function () {
//   bookmarksView.addHandlerRender(controlBookmarks);
//   recipeView.addHandlerRender(controlRecipes);
//   recipeView.addHandlerUpdateServings(controlServings);
//   recipeView.addHandlerAddBookmark(controlAddBookmark);
//   searchView.addHandlerSearch(controlSearchResults);
//   paginationView.addHandlerClick(controlPagination);
//   addRecipeView.addHandlerUpload(controlAddRecipe);
// };
// init();
