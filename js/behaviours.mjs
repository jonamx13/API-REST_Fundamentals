import { apiDictionary } from "./apiActions.mjs";

const dictionary = apiDictionary('dog');


//TODO: Make this methods work with new getData function
export async function saveFavDogs(id) {
    const API = dictionary.favourites;
    const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
        method: 'DELETE'
    });

    console.log('Unsave');

    const data = await res.json();
    if (res.status !== 200) {
        console.log('There was an error: ' + data.message); 
    } else {
        console.log('Dog unsaved');
    }
};