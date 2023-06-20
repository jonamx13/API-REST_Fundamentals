import { apiDictionary } from './js/apiActions.mjs';
import { createSection, loadRandomGrid } from './js/components.mjs';

const dictionary = apiDictionary('dog');
let randomDoggos = createSection('Random doggos', true);
const favouriteDoggos = createSection('Favourite doggos');
const title = document.getElementById('title-name');

const dogButton = document.getElementById('dog-button');
const catButton = document.getElementById('cat-button');

dogButton.onclick = () => {title.innerText = 'Doggies'};
catButton.onclick = () => {title.innerText = 'Kitties'};


loadRandomGrid(dictionary.random, randomDoggos);
loadRandomGrid(dictionary.favourites, favouriteDoggos);

//TODO: refresh by card
/* function reload() {
    window.location.reload();
} */
