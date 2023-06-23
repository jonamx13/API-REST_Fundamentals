import { apiDictionary } from "./apiActions.mjs";

const dictionary = apiDictionary('dog');

export async function saveFavDogs(id) {
    const API = dictionary.favourites;
    const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key' : dictionary.key,
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  
    console.log('Save');

    if (res.status !== 200) {
        const data = await res.json();
        console.log('There was an error: ' + data.message); 
    } else {
        console.log('Dog saved');
    }
}


export async function deleteFavDogs(id) {
    const API = dictionary.delete(id);
    const res = await fetch(API, {
        method: 'DELETE',
        headers: {
            'x-api-key' : dictionary.key,
        }
    });

    console.log('Unsave');

    const data = await res.json();
    if (res.status !== 200) {
        console.log('There was an error: ' + data.message); 
    } else {
        console.log('Dog unsaved');
    }
};