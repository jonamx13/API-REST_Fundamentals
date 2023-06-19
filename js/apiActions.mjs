export const apiDictionary = (choosePet) => {
    const pet = choosePet === 'cat' ? 'cat' : 'dog';

    const dictionary = {
    // Endpoints
    'API_URL' : `https://api.the${pet}api.com/v1/`,
    'RANDOM_SEARCH' : 'images/search',
    'FAVOURITES': 'favourites',
    'FAVOURITES_DELETE' : (dictionaryID) => `favourites/${dictionaryID}`,
    // Parameters
    'API_KEY' : 'api_key=live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
    'QUANTITY' : 'limit=16', //TODO: limit selector
    }
    
    const behaviour = {
        'random' : dictionary.API_URL + dictionary.RANDOM_SEARCH + '?' + dictionary.QUANTITY + '&' + dictionary.API_KEY,
        'favourites': dictionary.API_URL + dictionary.FAVOURITES + '?' + dictionary.QUANTITY + '&' + dictionary.API_KEY,
        'delete': (id) => dictionary.API_URL + dictionary.FAVOURITES_DELETE(id) + '?' + dictionary.API_KEY 
    }

    return behaviour;
}

export function urlBuilder(apiDictionary, action, photoID,) {
    const dictionary = apiDictionary;
    const actionLowered = typeof action === 'string' 
    ? action.toString().toLowerCase()
    : '';

    let URL;
    URL = {
        'random' : dictionary.API_URL + dictionary.RANDOM_SEARCH + '?' + dictionary.QUANTITY + '&' + dictionary.API_KEY,
        'favourites': dictionary.API_URL + dictionary.FAVOURITES + '?' + dictionary.QUANTITY + '&' + dictionary.API_KEY,
        'delete': dictionary.API_URL + dictionary.FAVOURITES_DELETE + '?' + dictionary.API_KEY 
    }

    return URL[actionLowered];
}

export async function getData(ApiURL) {
    const API = ApiURL;
    const res = await fetch(API);
    const data = await res.json();
    
    if(res.status !== 200) {
        return 'There was an error: ' + data.message;
    } else {
        return data;
    }
}