const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
};

const displayPhones = phones => {
    console.log(phones);
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.textContent = '';
    //display 10 phones only
    phones = phones.slice(0, 10);
    //display no phones found 
    const noPhones = document.getElementById('no-found-massage');
    if( phones.length === 0){
   
    noPhones.classList.remove('d-none')
    }
    else {
        noPhones.classList.add('d-none')
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
      <div class="card h-100 p-3">
      <img class="" src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${phone.phone_name
            }</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit longer.</p>
      </div>
  </div>
      `;
        phoneContainer.appendChild(phoneDiv);
    });
}

document.getElementById('btn-search').addEventListener('click', function () {
    const search_Field = document.getElementById('searchField');
    const searchText = search_Field.value;
    loadPhone(searchText)
})
loadPhone('iphone');