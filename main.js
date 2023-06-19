import { apiDictionary } from './js/apiActions.mjs';
import { createSection, loadRandomGrid } from './js/components.mjs';

const dictionary = apiDictionary('dog');
let randomDoggos = createSection('Random doggos', true);
const favouriteDoggos = createSection('Favourite doggos');

loadRandomGrid(dictionary.random, randomDoggos);
loadRandomGrid(dictionary.favourites, favouriteDoggos);

//TODO: refresh by card
/* function reload() {
    window.location.reload();
} */

// TODO: create section and add reload button only if does reload(false by default)

/* async function loadDogRandomGrid(ApiURL, sectionID) {
    const APIRandom = ApiURL;
    const data = await getData(APIRandom);

    if (typeof data == 'string') {
        createSpanError(data, sectionID);
        return;
    }

    Object.entries(data).forEach(thumbnail => {
        const [imageURL, imageID] = [thumbnail[1].url, thumbnail[1].id];
        console.log(thumbnail);
        createCard(imageURL, sectionID,'save', imageID);
    });
} */

/* async function loadDogFavsGrid(behaviour, sectionID) {
    const APIRandom = urlBuilder(behaviour);
    const data = await getData(APIRandom);

    if (typeof data == 'string') {
        createSpanError(data, sectionID);
        return;
    }

    Object.entries(data).forEach(thumbnail => {
        console.log(thumbnail);
        const [imageURL, imageID] = [thumbnail[1].image.url, thumbnail[1].id];
        createCard(imageURL, favouriteDoggos,'unsave', imageID);
    });
} */

