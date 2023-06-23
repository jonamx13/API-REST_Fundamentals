export const apiDictionary = (choosePet) => {
    const pet = choosePet === 'cat' ? 'cat' : 'dog';

    const dictionary = {
    // Endpoints
    'API_URL' : `https://api.the${pet}api.com/v1/`,
    'RANDOM_SEARCH' : 'images/search',
    'FAVOURITES': 'favourites',
    'FAVOURITES_DELETE' : (dictionaryID) => `favourites/${dictionaryID}`,
    // Parameters
    'API_KEY' : 'live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
    'QUANTITY' : 'limit=16', //TODO: limit selector
    }
    
    const behaviour = {
        'random' : dictionary.API_URL + dictionary.RANDOM_SEARCH + '?' + dictionary.QUANTITY,
        'favourites': dictionary.API_URL + dictionary.FAVOURITES + '?' + dictionary.QUANTITY,
        'delete': (id) => dictionary.API_URL + dictionary.FAVOURITES_DELETE(id) + '?' + dictionary.API_KEY,
        'key': dictionary.API_KEY
    }

    return behaviour;
}


export async function getData(fromPetChoice, behaviour) {
    const ApiConstructor = apiDictionary(fromPetChoice);
    const KEY = ApiConstructor.key;
    let API;
    let fetchParams;
    if(behaviour === 'random') {
        API = ApiConstructor.random;
        fetchParams = {
            method: 'GET',
            headers: {
            'content-type': 'application/json',
            'x-api-key' : KEY
           }
        }
    }
    if(behaviour === 'favourites') {
        API = ApiConstructor.favourites;
        fetchParams = {
            method: 'GET',
            headers: {
            'content-type': 'application/json',
            'x-api-key' : KEY
           }
        }
    }


    const res = await fetch(API, fetchParams);
    const data = await res.json();
    
    if(res.status !== 200) {
        return 'There was an error: ' + data.message;
    } else {
        return {'collection': data, 'apiStr': API};
    }
}