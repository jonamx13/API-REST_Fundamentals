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
    sectionContainer.setAttribute('class', 'pet-grid'); //TODO: change depending on pet selector

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
    return titleIntoID;

}

class Pet {
    #petCard;
    #petContainer;
    #imgPet;
    #pinSave;
    #title;
    #description
    constructor(petURL, pinMode, cardID) {
        this.petURL = petURL;
        this.pinMode = pinMode;
        this.cardID = cardID;

        this.#petCard = document.createElement('article');
        this.#petContainer = document.createElement('div');
        this.#imgPet = document.createElement('img');
        this.#pinSave = document.createElement('button');
        this.#title = document.createElement('h3');
        this.#description = document.createElement('p');

    }

    #createCardElements() {
        this.#petCard.setAttribute('class', 'pet-card');
        this.#petContainer.setAttribute('class', 'pet-container');
        this.#imgPet.setAttribute('class', 'pet');
        this.#imgPet.setAttribute('alt', 'pet-picture');
        this.#imgPet.src = this.petURL;

        this.#pinSave.setAttribute('class', 'pin-save');

        if (this.pinMode === 'unsave') {
            this.#pinSave.innerHTML = '<img src=\"/assets/pin-unsave.svg\" alt="pin icon for unsaving">';
            this.#pinSave.onclick = () => deleteFavDogs(this.cardID);
        } else {
            this.#pinSave.innerHTML = '<img src=\"/assets/pin-save.svg\" alt="pin icon for saving">';
            this.#pinSave.onclick = () => saveFavDogs(this.cardID);
        }

        this.#title.innerText = 'Description of this turtle';
        this.#description.innerText = 'This kind of turtle is epic and there are just a few of these living in kings landing and Narnia.';
    }

    assembleCardElements() {
        this.#createCardElements();
        this.#petContainer.append(this.#imgPet, this.#pinSave);
        this.#petCard.append(this.#petContainer, this.#title, this.#description);
        return this.#petCard;
    }
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
export async function loadGrid(sectionID, behaviour) {
    const data = await getData('dog', behaviour);
    const petSection = document.getElementById(sectionID);
    const createGrid = () => Object.entries(data.collection).forEach(thumbnail => {
        const imageID = thumbnail[1].id;
        let imageURL;
        let pinModeInterior;
        
        data.apiStr.includes('favourites')
        ? (imageURL = thumbnail[1].image.url, pinModeInterior = 'unsave')
        : (imageURL = thumbnail[1].url, pinModeInterior = 'save'); 
        
        const petCard = new Pet(imageURL, pinModeInterior, imageID);
        petSection.appendChild(petCard.assembleCardElements());
    });
    
    if (typeof data == 'string') {
        createSpanError(data, sectionID);
        return;
    }
    createGrid();
}