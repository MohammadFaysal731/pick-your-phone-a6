// errorMasseges for many thinks like. number, nagative number, emty string , no result found.
const errorMasseges = document.getElementById('error-masseges');
// cards  cosntainer 
const phonesContainer = document.getElementById('cards');
// singal phone details 
const phoneDeatil = document.getElementById('card-deatil');
const loadPhones = () => {
    const searchBox = document.getElementById('search-box');
    const searchTex = searchBox.value;
    // errorMasseges for many thinks like. number, nagative number, emty string , no result found.
    const errorMasseges = document.getElementById('error-masseges');
    searchBox.value = '';
    // console.log(searchTex)
    if (searchTex === '') {
        errorMasseges.innerText = 'You can not search phone by balnck';
        // clear phones container when search emty
        phonesContainer.textContent = '';
        // clear phone detail when search emty 
        phoneDeatil.textContent = '';
    }
    else if (searchTex >= 0 || searchTex <= 0) {
        errorMasseges.innerText = 'You can search phones by names not numbres';
        // clear phone container whern search positive or nagative number 
        phonesContainer.textContent = '';
        // clear phone detail when search positiver or nagative number 
        phoneDeatil.textContent = '';
    }
    else {
        // loadPhones api 
        const url = (`https://openapi.programming-hero.com/api/phones?search=${searchTex}`);
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
        // clear error masseges after api load 
        errorMasseges.textContent = '';
        // clear phone detail and when search new phone 
        phoneDeatil.textContent = '';
    }
};
// display phones 
const displayPhones = phones => {
    // console.log(phones)
    // cards  cosntainer 
    const phonesContainer = document.getElementById('cards');
    if (phones.length === 0) {
        errorMasseges.innerText = 'Sorroy no phone found';
        phonesContainer.textContent = '';
    }
    else {
        phonesContainer.textContent = '';
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
                 <a  onclick ="loadPhoneDetais('${phone.slug}')"href="#" class="btn btn-success px-5">Details</a>
             </div>
         </div>
         `;
            phonesContainer.appendChild(div);
        });
    }
};

const loadPhoneDetais = phoneId => {
    // console.log(phoneId);
    const url = (`https://openapi.programming-hero.com/api/phone/${phoneId}`);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetais(data.data))
};
const displayPhoneDetais = phone => {
    // console.log(phone)
    // singal phone details 
    const phoneDeatil = document.getElementById('card-deatil');
    phoneDeatil.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card rounded-3 p-3">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
      <h3 class="card-title">${phone.name}</h3>
      <h4 class="card-text">${phone.releaseDate ? phone.releaseDate : 'No releasDate found'}</h4>
      <h6>Main Features:</h6>
      <p>Chipset: ${phone.mainFeatures.chipSet}</p>
      <p>Display Size: ${phone.mainFeatures.displaySize}</p>
      <p>Memory: ${phone.mainFeatures.memory}</p>
      <p>Storag: ${phone.mainFeatures.storage}</p>
      <h5>Sensors:</h5>
      <p>${phone.mainFeatures.sensors[0]}</p>
      <p>${phone.mainFeatures.sensors[1]}</p>
      <p>${phone.mainFeatures.sensors[2]}</p>
      <p>${phone.mainFeatures.sensors[3]}</p>
      <p>${phone.mainFeatures.sensors[4]}</p>
      <p>${phone.mainFeatures.sensors[5]}</p>
      <h5>Others:</h5>
      <p>Bluetooth: ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'Other not found'}</p>
      <p>GPS: ${phone.others?.GPS ? phone.others?.GPS : 'Other not found'}</p>
      <p>NFC: ${phone.others?.NFC ? phone?.others?.NFC : 'Other not found'}</p>
      <p>Radio: ${phone.others?.Radio ? phone?.others?.Radio : 'Other not found'}</p>
      <p>USB: ${phone.others?.USB ? phone?.others?.USB : 'Other not found'}</p>
      <p>WLAN: ${phone.others?.WLAN ? phone?.others?.WLAN : 'Other not found'}</p>
    </div> 
    `;
    phoneDeatil.appendChild(div);
};