const API_URL_UPLOAD = 'https://api.thedog.com/v1/images/upload'

async function uploadPetPhoto() {
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
        // saveFavouriteMichi(data.id) //add this photo to favourites
    }
}