import { apiDictionary } from './js/apiActions.mjs';
import { choosePet, createSection, loadGrid} from './js/components.mjs';

const dictionary = apiDictionary('dog');
const choosePetHeader = () => choosePet();
let randomDoggos;
let favouriteDoggos;

/* choosePetHeader();
(function(callback) {
    randomDoggos = callback('Random doggos', true);
    loadGrid(dictionary.random, randomDoggos);
})(createSection); */

(function(callback) {
    favouriteDoggos = callback('Favourite doggos', false);
    loadGrid(dictionary.favourites, favouriteDoggos);
})(createSection);

//TODO: refresh by card
/* function reload() {
    window.location.reload();
} */
