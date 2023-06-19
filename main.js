const randomDoggos = document.getElementById('random-doggos');
const favouriteDoggos = document.getElementById('favourite-doggos');

const petChoose = {dog: 'dog', cat: 'cat'}; //TODO: pet selector
const API_URL = 'https://api.thedogapi.com/v1/';
// Endpoints
const RANDOM_SEARCH = 'images/search';
const FAVOURITES =  'favourites'
const FAVOURITES_DELETE = (id) => `favourites/${id}`;
// Parameters
const QUANTITY = 'limit=16'; //TODO: limit selector
const API_KEY = 'api_key=live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0';


// loadDogRandomGrid('random', randomDoggos);
// loadDogFavsGrid('favourites', API_KEY);
createSection('Random doggos', true);

//TODO: refresh by card
function reload() {
    window.location.reload();
}

// TODO: create section and add reload button only if does reload(false by default)
function createSection(title, doesReload) {
    {/* <button class="reload" onClick="reload()">Reload</button>
    <h2 class="subtitles">Random Doggos</h2>
    <section id="random-doggos" class="dog-grid">

    </section> */}
    const body = document.getElementsByTagName('body')

    const titleSection = document.createElement('h2');
    const sectionContainer = document.createElement('section');
    

    titleSection.setAttribute('class', 'subtitles');
    titleSection.innerText = title;

    if(doesReload) {
        const reloadButton = document.createElement('button');
        reloadButton.setAttribute('class', 'reload');
        body.appendChild(reloadButton);
    }

    
    body.append(titleSection, sectionContainer);
}

function createCard(urlDoggo, sectionID, pinMode, cardID) {
    const doggosSection = sectionID;
    const doggoCard = document.createElement('article');
    const doggoContainer = document.createElement('div');
    const imgDoggo = document.createElement('img');
    const pinSave = document.createElement('button');
    const title = document.createElement('h3');
    const description = document.createElement('p');

    doggoCard.setAttribute('class', 'doggo-card');
    doggoContainer.setAttribute('class', 'doggo-container');
    imgDoggo.setAttribute('class', 'doggo');
    imgDoggo.setAttribute('alt', 'doggo-picture');
    pinSave.setAttribute('class', 'pin-save');

    imgDoggo.src = urlDoggo;

    //Select pin icon and behaviour
    if (pinMode === 'unsave') {
        pinSave.innerHTML = '<img src=\"/assets/pin-unsave.svg\" alt="pin icon for saving">';
        pinSave.onclick = () => deleteFavDogs(cardID);
    } else {
        pinSave.innerHTML = '<img src=\"/assets/pin-save.svg\" alt="pin icon for saving">';
        pinSave.onclick = () => saveFavDogs(cardID);
    }
    
    title.innerText = 'Description of this turtle';
    description.innerText = 'This kind of turtle is epic and there are just a few of these living in kings landing and Narnia.';
    
    doggosSection.appendChild(doggoCard);
    doggoCard.append(doggoContainer, title, description);
    doggoContainer.append(imgDoggo, pinSave);
}

function createSpanError(dataResult, sectionID) {
    const spanError = document.createElement('span');
    const data = dataResult;

        sectionID.removeAttribute('class');
        spanError.setAttribute('class', 'subtitles');
        spanError.innerHTML = data;
        sectionID.appendChild(spanError);
        return;
}

function urlBuilder(action, photoID) {
    const actionLowered = action.toString().toLowerCase();
    let URL;
    URL = {
        'random' : API_URL + RANDOM_SEARCH + '?' + QUANTITY + '&' + API_KEY,
        'favourites': API_URL + FAVOURITES + '?' + QUANTITY + '&' + API_KEY,
        'delete': API_URL + FAVOURITES_DELETE(photoID) + '?' + API_KEY 
    }

    return URL[actionLowered];
}
async function getData(ApiURL) {
    const API = ApiURL;
    const res = await fetch(API);
    const data = await res.json();
    
    if(res.status !== 200) {
        return 'There was an error: ' + data.message;
    } else {
        return data;
    }
}

async function loadDogRandomGrid(behaviour, sectionID) {
    const APIRandom = urlBuilder(behaviour);
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
}

async function loadDogFavsGrid(behaviour, sectionID) {
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
}

async function saveFavDogs(id) {
    const API = urlBuilder('favourites');
    const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  
    console.log('Save');

    if (res.status !== 200) {
        const data = await res.json();
        console.log('There was an error: ' + data.message); 
    } else {
        console.log('Dog saved');
    }
}


async function deleteFavDogs(id) {
    const API = urlBuilder('delete', id);
    const res = await fetch(API, {
        method: 'DELETE'
    });

    console.log('Unsave');

    const data = await res.json();
    if (res.status !== 200) {
        console.log('There was an error: ' + data.message); 
    } else {
        console.log('Dog unsaved');
        loadDogFavsGrid();
    }
};