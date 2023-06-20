import { apiDictionary } from './js/apiActions.mjs';
import { choosePet, createSection, loadGrid } from './js/components.mjs';

const dictionary = apiDictionary('dog');
const choosePetHeader = () => choosePet();
const randomDoggos = async () => createSection('Random doggos', true);
/* const favouriteDoggos = createSection('Favourite doggos');
const title = document.getElementById('title-name'); */

loadGrid(dictionary.random, randomDoggos);

/* loadGrid(dictionary.favourites, favouriteDoggos); */

//TODO: refresh by card
/* function reload() {
    window.location.reload();
} */
