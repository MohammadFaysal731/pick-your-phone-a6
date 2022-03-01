// errorMasseges for many thinks like. number, nagative number, emty string , no result found.
const errorMasseges = document.getElementById('error-masseges');
const cardsContainer = document.getElementById('cards');
const loadPhones = () => {
    const searchBox = document.getElementById('search-box');
    const searchTex = searchBox.value;
    searchBox.value = '';
    // console.log(searchTex)
    if (searchTex === '') {
        errorMasseges.innerText = 'You can not search phone by balnck';
        cardsContainer.textContent = '';
    }
    else if (searchTex >= 0 || searchTex <= 0) {
        errorMasseges.innerText = 'You can search phones by names not numbres';
        cardsContainer.textContent = '';
    }
    else {
        // loadPhones api 
        const url = (`https://openapi.programming-hero.com/api/phones?search=${searchTex}`);
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
        errorMasseges.textContent = '';
    }
};
// display phones 
const displayPhones = phones => {
    // console.log(phones)
    if (phones.length === 0) {
        errorMasseges.innerText = 'Sorroy no phone found';
        cardsContainer.textContent = '';
    }
    else {
        cardsContainer.textContent = '';
        phones.forEach(phone => {
            // console.log(phone)
            const div = document.createElement('div');
            div.classList.add('col-lg-4');
            div.classList.add('col-md-6');
            div.classList.add('col-12');
            div.innerHTML = `
         <div class="card rounded-3 p-3" style="width: 18rem; ">
             <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                 <a  onclick ="loadPhoneDetais('${phone.slug}')"href="#" class="btn btn-primary">Details</a>
             </div>
         </div>
         `;
            cardsContainer.appendChild(div);
        });
    }
};
const loadPhoneDetais = phoneId => {
    console.log(phoneId);
    const url = (`https://openapi.programming-hero.com/api/phone/${phoneId}`);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetais(data.data))
};
const displayPhoneDetais = phone => {
    console.log(phone)
    const cardDeatil = document.getElementById('card-deatil');
    cardDeatil.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card rounded-3 p-3">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h4 class="card-title">${phone.name}</h4>
      <h5 class="card-text">${phone.releaseDate ? phone.releaseDate : 'No releasDate found'}</h5>
      <p>${phone.mainFeatures.chipSet}</p>
      <p>${phone.mainFeatures.displaySize}</p>
      <p>${phone.mainFeatures.memory}</p>
      <p>${phone.mainFeatures.storage}</p>
    </div>
    `;
    cardDeatil.appendChild(div);
};