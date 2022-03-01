const errorMasseges = document.getElementById('error-masseges');
const cardsContainer = document.getElementById('cards');
const loadPhones = () => {
    const searchBox = document.getElementById('search-box')
    const searchTex = searchBox.value;
    searchBox.value = '';
    // console.log(searchTex)
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searchTex}`)
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}
// display phones 
const displayPhones = phones => {
    console.log(phones)
    cardsContainer.textContent = '';
    phones.forEach(phone => {
        console.log(phone)
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
                 <a href="#" class="btn btn-primary">Details</a>
             </div>
         </div>
         `;
        cardsContainer.appendChild(div);
    });

}