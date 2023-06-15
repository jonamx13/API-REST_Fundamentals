const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=16';
const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?limit=16';
const API_KEY = '&api_key=live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0';
const randomDoggos = document.getElementById('random-doggos');
const favouriteDoggos = document.getElementById('favourite-doggos');


loadDogRandomGrid(API_URL_RANDOM, API_KEY, randomDoggos);
// loadDogFavsGrid(API_URL_FAVOURITES, API_KEY);


function reload() {
    window.location.reload();
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
    pinSave.onclick = () => saveFavDogs(cardID);

    imgDoggo.src = urlDoggo;
    //Select pin icon
    pinMode === 'unsave'
        ? pinSave.innerHTML = '<img src=\"/assets/pin-unsave.svg\" alt="pin icon for saving">'
        : pinSave.innerHTML = '<img src=\"/assets/pin-save.svg\" alt="pin icon for saving">'
    
    title.innerText = 'Description of this turtle';
    description.innerText = 'This kind of turtle is epic and there are just a few of these living in kings landing and Narnia.';
    
    doggosSection.appendChild(doggoCard);
    doggoCard.append(doggoContainer, title, description);
    doggoContainer.append(imgDoggo, pinSave);
}

function createSpanError(dataResult, sectionID) {
    console.log('Hola desde aqui')
    const spanError = document.createElement('span');
    const data = dataResult;

        sectionID.removeAttribute('class');
        spanError.setAttribute('class', 'subtitles');
        spanError.innerHTML = data;
        sectionID.appendChild(spanError);
        return;
}

async function getData(ApiURL, ApiKey) {
    const API = ApiURL + ApiKey;
    const res = await fetch(API);
    const data = await res.json();
    
    if(res.status !== 200) {
        return 'There was an error: ' + data.message;
    } else {
        return data;
    }
}

async function loadDogRandomGrid(ApiURL, ApiKey, sectionID) {
    const data = await getData(ApiURL, ApiKey);

    if (typeof data == 'string') {
        createSpanError(data, sectionID);
        return;
    }

    Object.entries(data).forEach(thumbnail => {
        const [imageURL, imageID] = [thumbnail[1].url, thumbnail[1].id];

        createCard(imageURL, sectionID,'save', imageID);
    });
}
async function loadDogFavsGrid(ApiURL, ApiKey) {
    const data = await getData(ApiURL, ApiKey);

    if (typeof data == 'string') {
        const spanError = document.createElement('span');
        favouriteDoggos.removeAttribute('class');
        spanError.setAttribute('class', 'subtitles');
        spanError.innerHTML = data;
        favouriteDoggos.appendChild(spanError);
        return;
    }

    console.log('tortilla')
    console.log(data);
    Object.entries(data).forEach(thumbnail => {
        console.log(thumbnail)
        createCard(thumbnail[1].image.url, favouriteDoggos,'unsave');
    });
}

async function saveFavDogs(id) {
    const API = API_URL_FAVOURITES + API_KEY;
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
    console.log(res);

    if (res.status !== 200) {
        console.log('mames'); 
    }
}