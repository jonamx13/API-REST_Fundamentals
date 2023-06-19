import { apiDictionary } from './js/apiActions.mjs';
import { createSection, loadRandomGrid } from './js/components.mjs';

const dictionary = apiDictionary('dog');
let randomDoggos = createSection('Random doggos', true);
const favouriteDoggos = createSection('Favourite doggos');
const title = document.getElementById('title-name')

title.innerText = 'Doggies'

loadRandomGrid(dictionary.random, randomDoggos);
loadRandomGrid(dictionary.favourites, favouriteDoggos);

//TODO: refresh by card
/* function reload() {
    window.location.reload();
} */

// TODO: create section and add reload button only if does reload(false by default)


