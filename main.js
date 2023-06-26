import { choosePet, createSection, loadGrid} from './js/components.mjs';

const choosePetHeader = () => choosePet();
let randomDoggos;
let favouriteDoggos;

// choosePetHeader();
export async function uploadPetPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));
}

(function(callback) {
    randomDoggos = callback('Random doggos', true);
    loadGrid(randomDoggos, 'random');
})(createSection);

(function(callback) {
    favouriteDoggos = callback('Favourite doggos', false);
    loadGrid(favouriteDoggos, 'favourites');
})(createSection);

//TODO: refresh by card
/* function reload() {
    window.location.reload();
} */
