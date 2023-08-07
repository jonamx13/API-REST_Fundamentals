const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1'
  });
  api.defaults.headers.common['X-API-KEY'] = 'live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0';
  
  const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2';
  const API_URL_FAVOTITES = 'https://api.thedogapi.com/v1/favourites';
  const API_URL_FAVOTITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
  const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload';
  
  const spanError = document.getElementById('error')
  
  async function loadRandomDoggos() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
      const img1 = document.getElementById('img1');
      const img2 = document.getElementById('img2');
      const btn1 = document.getElementById('btn1');
      const btn2 = document.getElementById('btn2');
      
      img1.src = data[0].url;
      img2.src = data[1].url;
  
      btn1.onclick = () => saveFavouriteDoggo(data[0].id);
      btn2.onclick = () => saveFavouriteDoggo(data[1].id);
    }
  }
  
  async function loadFavouriteDoggos() {
    const res = await fetch(API_URL_FAVOTITES, {
      method: 'GET',
      headers: {
        'X-API-KEY': 'live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
      },
    });
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      const section = document.getElementById('favoriteDoggos')
      section.innerHTML = "";
  
      const h2 = document.createElement('h2');
      const h2Text = document.createTextNode('Doggos favoritos');
      h2.appendChild(h2Text);
      section.appendChild(h2);
  
      data.forEach(doggo => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Sacar al doggo de favoritos');
  
        img.src = doggo.image.url;
        img.width = 150;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavouriteDoggo(doggo.id);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
      });
    }
  }
  
  async function saveFavouriteDoggo(id) {
    const { data, status } = await api.post('/favourites', {
      image_id: id,
    });
    
    
    // const res = await fetch(API_URL_FAVOTITES, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-API-KEY': 'c08d415f-dea7-4a38-bb28-7b2188202e46',
    //   },
    //   body: JSON.stringify({
    //     image_id: id
    //   }),
    // });
    // const data = await res.json();
  
    console.log('Save')
  
    if (status !== 200) {
      spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
      console.log('Doggo guardado en favoritos')
      loadFavouriteDoggos();
    }
  }
  
  async function deleteFavouriteDoggo(id) {
    const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
      method: 'DELETE',
      headers: {
        'X-API-KEY': 'live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
      }
    });
    const data = await res.json();
  
    if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      console.log('Doggo eliminado de favoritos')
      loadFavouriteDoggos();
    }
  }
  
  async function uploadDoggoPhoto() {
    const form = document.getElementById('uploadingForm')
    const formData = new FormData(form);
  
    console.log(formData.get('file'))
  
    const res = await fetch(API_URL_UPLOAD, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'live_Zw2RVsJsCsJVGIm1mI08GbGWnZfS6GQ1LI10VoDslKtUWjmae0uBM6cON3Iy5jG0',
      },
      body: formData,
    })
    const data = await res.json();
  
    if (res.status !== 201) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      console.log({data})
    } else {
      console.log('Foto de doggo subida :)')
      console.log({data})
      console.log(data.url)
      saveFavouriteDoggo(data.id);
    }
  }
  
  loadRandomDoggos();
  loadFavouriteDoggos();