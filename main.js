console.log('Hello world');

const URL = 'https://api.thedogapi.com/v1/images/search';

/* fetch(URL)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    }); */

fetchData(URL);

// Challenge: Create async/await syntax
async function fetchData(ApiURL) {
    const response = await fetch(ApiURL);
    const data = await response.json();
    let img = document.querySelector('img');
    img.src = data[0].url;
}

function reload() {
    window.location.reload();
}