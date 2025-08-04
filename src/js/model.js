import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: { query: '', results: [], resultsperpage: 10, page: 1 },
  bookmark: [],
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients.map(ing => {
        return {
          quantity: ing.quantity ? +ing.quantity : null,
          unit: ing.unit,
          description: ing.description,
        };
      }),
    };
    if (state.bookmark.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    console.log(state.recipe);
  } catch (er) {
    console.error(er);
    throw er;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}>`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (er) {
    console.log(er);
    throw er;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsperpage;
  const end = page * state.search.resultsperpage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    if (ing.quantity) {
      ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    }
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  //addig bookmark
  state.bookmark.push(recipe);

  //mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

export const removeBookmark = function (recipe) {
  const index = state.bookmark.findIndex(el => el.id === recipe.id);
  if (index !== -1) state.bookmark.splice(index, 1);
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
};
