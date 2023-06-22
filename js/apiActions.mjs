export const apiDictionary = (choosePet) => {
    const pet = choosePet === 'cat' ? 'cat' : 'dog';

    const dictionary = {
    // Endpoints
    'API_URL' : `https://api.the${pet}api.com/v1/`,
    'RANDOM_SEARCH' : 'images/search',
    'FAVOURITES': 'favourites',
    'FAVOURITES_DELETE' : (dictionaryID) => `favourites/${dictionaryID}`,
    // Parameters
    //'API_KEY' : 'api_key=live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
    'API_KEY' : 'Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
    'QUANTITY' : 'limit=16', //TODO: limit selector
    }
    
    const behaviour = {
        'random' : dictionary.API_URL + dictionary.RANDOM_SEARCH + '?' + dictionary.QUANTITY + '&' + dictionary.API_KEY,
        'favourites': dictionary.API_URL + dictionary.FAVOURITES/*  + '?' + dictionary.QUANTITY */,
        'delete': (id) => dictionary.API_URL + dictionary.FAVOURITES_DELETE(id) + '?' + dictionary.API_KEY,
        'key': dictionary.API_KEY
    }

    return behaviour;
}

export async function getData(fromPetChoice) {
    const ApiConstructor = apiDictionary(fromPetChoice);
    const KEY = ApiConstructor.key;
    let API;
    let fetchParams;
    /* if(behaviour === 'favourites') {
        API = ApiConstructor.favourites;
        fetchParams = {
           headers: {
            'content-type': 'application/json',
            'x-api-key' : KEY
           }
        }
    } */

    console.log(API);
    console.log(fetchParams);
    const res = await fetch(API, {
        headers:{
            "content-type":"application/json",
            'x-api-key': 'Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0'
        }
    });
    const data = await res.json();
    
    if(res.status !== 200) {
        console.log('hola desde el error');
        // return 'There was an error: ' + data.message;
    } else {
        console.log(data);
        return data;
    }
}