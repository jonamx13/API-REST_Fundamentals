import { saveFavDogs, deleteFavDogs } from "./behaviours.mjs";
import { getData } from "./apiActions.mjs";

//TODO: reload function
export function reload() {}
export function choosePet() {
    let defaultTitle = 'Doggos';
    const sectionChoose = document.createElement('section');
    const question = document.createElement('p');
    const buttonsSection = document.createElement('section');
    const dogButton = document.createElement('button');
    const catButton = document.createElement('button');

    //! Begin DOM setup
    sectionChoose.setAttribute('id', 'choose-pet');
    question.innerText = 'What kind of person are you?';

    //* Dog button behaviours
    dogButton.setAttribute('id', 'dog-button');
    dogButton.innerHTML = '<img src="./assets/dog_button.png" alt="choose dog button">';
    
    //* Cat button behaviours
    catButton.setAttribute('id', 'cat-button');
    catButton.innerHTML = '<img src="./assets/cat_button.png" alt="choose cat button">';

    //* Toggle titles
    dogButton.onclick = () => {defaultTitle = 'Doggos', console.log(defaultTitle);}
    catButton.onclick = () => {defaultTitle = 'Kitties', console.log(defaultTitle);}

    //! DOM Appending
    buttonsSection.append(
        dogButton,
        catButton);

    sectionChoose.append(
        question,
        buttonsSection
    );
    document.body.appendChild(sectionChoose)
}
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

        //TODO: Reload function
        function reload() {
            window.location.reload();
        }
    }

    document.body.append(titleSection, sectionContainer);
    console.log(titleIntoID);
    return titleIntoID;

}

/* class Pet {
    constructor(urlPet, sectionID)
} */

function createCard(urlDoggo, pinMode, cardID) {
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
        pinSave.innerHTML = '<img src=\"/assets/pin-unsave.svg\" alt="pin icon for unsaving">';
        pinSave.onclick = () => deleteFavDogs(cardID);
    } else {
        pinSave.innerHTML = '<img src=\"/assets/pin-save.svg\" alt="pin icon for saving">';
        pinSave.onclick = () => saveFavDogs(cardID);
    }
    
    title.innerText = 'Description of this turtle';
    description.innerText = 'This kind of turtle is epic and there are just a few of these living in kings landing and Narnia.';
    
    doggoCard.append(doggoContainer, title, description);
    doggoContainer.append(imgDoggo, pinSave);
    return doggoCard;
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
export async function loadGrid(ApiURL, sectionID) {
    const APISTR = ApiURL.toString();
    const data = await getData(APISTR);
    const petSection = document.getElementById(sectionID);
    const createGrid = () => Object.entries(data).forEach(thumbnail => {
        const imageID = thumbnail[1].id;
        let imageURL;
        let pinModeInterior;
        
        APISTR.includes('favourites')
        ? (imageURL = thumbnail[1].image.url, pinModeInterior = 'unsave')
        : (imageURL = thumbnail[1].url, pinModeInterior = 'save');
        petSection.appendChild(createCard(imageURL, pinModeInterior, imageID));
    });

    if (typeof data == 'string') {
        createSpanError(data, sectionID);
        return;
    }
    createGrid();
}