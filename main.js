console.log('Hello world');

const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=09';

/* fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    }); */

/* fetchData(URL);

// Challenge: Create async/await syntax
async function fetchData(ApiURL) {
    const response = await fetch(ApiURL);
    const data = await response.json();
    let img = document.querySelector('img');
    img.src = data[0].url;
}

function reload() {
    window.location.reload();
} */



dogGrid(getData());

function reload() {
    window.location.reload();
}

async function getData() {
    const res = await fetch(API_URL);
    const data = await res.json();

    return data;
}

async function dogGrid(collection) {
    const doggosSection = document.getElementById('dog-grid');
    const data = await collection;
    
    Object.entries(data).forEach(thumbnail => {
        let img = document.createElement('img');
        img.src = thumbnail[1].url;
        doggosSection.appendChild(img);
    });
}