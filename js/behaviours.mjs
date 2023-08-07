import { apiDictionary } from "./apiActions.mjs";

const dictionary = apiDictionary('dog');
const API_URL_UPLOAD = 'https://api.thedog.com/v1/images/upload';

const apiAxios = axios.create({
    baseURL : 'https://api.thedog.com/v1',
    headers: { 'X-API-KEY' : 'live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0'}
});


export async function saveFavDogs(id) {
    console.log('click');
    const {data , status} = await apiAxios.post('/favourites', {
        image_id: id,
    });
//     const API = dictionary.favourites;
//     const res = await fetch(API, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key' : dictionary.key,
//     },
//     body: JSON.stringify({
//       image_id: id
//     }),
//   });
  
    console.log('Save');

    if (status !== 200) {
        console.log('There was an error: ' + status + data.message); 
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

export async function uploadPetPhoto() {
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            // 'content-type' : 'multipart/form-data',
            'x-api-key' : 'live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
        },
        body: formData,
    });

    const data = await res.json();

    if (res.status !== 201) {
        // spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
        console.log(`There was an error with uploading: ${res.status}`);
    }
    else {
        console.log("Doggo picture UPLOADED :)");
        console.log({ data });
        console.log(data.url);
        saveFavDogs(data.id) //add this photo to favourites
    }
};