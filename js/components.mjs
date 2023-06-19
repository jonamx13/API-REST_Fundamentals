import { saveFavDogs, deleteFavDogs } from "./behaviours.mjs";
import { getData } from "./apiActions.mjs";

export function createSection(title, doesReload) {
    const titleSection = document.createElement('h2');
    const sectionContainer = document.createElement('section');
    const titleIntoID = title.split(' ').join('-').toLowerCase()
    

    titleSection.setAttribute('class', 'subtitles');
    titleSection.innerText = title;
    sectionContainer.setAttribute('id', titleIntoID);
    sectionContainer.setAttribute('class', 'dog-grid'); //TODO: change depending on pet selector

    if(doesReload) {
        const reloadButton = document.createElement('button');
        reloadButton.innerText = 'Reload'
        reloadButton.setAttribute('class', 'reload');
        reloadButton.onclick = () => reload(); //TODO: reload just photos
        document.body.appendChild(reloadButton);
    }

    document.body.append(titleSection, sectionContainer);
    return document.getElementById(titleIntoID) //

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

export function createSpanError(dataResult, sectionID) {
    const spanError = document.createElement('span');
    const data = dataResult;

        sectionID.removeAttribute('class');
        spanError.setAttribute('class', 'subtitles');
        spanError.innerHTML = data;
        sectionID.appendChild(spanError);
        return;
}

//Grid
export async function loadRandomGrid(ApiURL, sectionID) {
    const APISTR = ApiURL.toString();
    const data = await getData(APISTR);
    const createGrid = () => Object.entries(data).forEach(thumbnail => {
        const imageID = thumbnail[1].id;
        let imageURL;
        let pinModeInterior;

        ApiURL.includes('favourites')
        ? (imageURL = thumbnail[1].image.url, pinModeInterior == 'unsave' )
        : imageURL = thumbnail[1].url
        createCard(imageURL, sectionID, pinModeInterior, imageID);
    });

    if (typeof data == 'string') {
        createSpanError(data, sectionID);
        return;
    }
    createGrid();
}