console.log('Hello world');

const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=18&api_key=live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0';
const randomDoggos = document.getElementById('random-doggos');
const favouriteDoggos = document.getElementById('favourite-doggos');

dogGrid(getData());

function reload() {
    window.location.reload();
}

function createCard(urlDoggo, sectionID, pinMode) {
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

async function getData() {
    const res = await fetch(API_URL);
    const data = await res.json();

    return data;
}

async function dogGrid(collection) {
    const data = await collection;
    
    Object.entries(data).forEach(thumbnail => {
        createCard(thumbnail[1].url, randomDoggos,'save');
    });
}