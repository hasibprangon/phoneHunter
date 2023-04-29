const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.textContent = '';
    //display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {

        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none')
    }
    //display no phones found 
    const noPhones = document.getElementById('no-found-massage');
    if (phones.length === 0) {

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
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
          
      </div>
  </div>
      `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop loader
    togglrLoader(false);
};

const processSearch = (dataLimit) => {
    togglrLoader(true);
    const search_Field = document.getElementById('searchField');
    const searchText = search_Field.value;
    loadPhone(searchText, dataLimit)
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);
});

// search input field presing  enter kye
// enter kye event listener always happend on input field not on btn
const input = document.getElementById('searchField');
input.addEventListener('keydown', function (event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        processSearch(10);
    }
})
const togglrLoader = isLoading => {
    const spinnerSection = document.getElementById('loader');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
};
// second way to load show all component inside api
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

const loadPhoneDetails = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data);
};

const displayPhoneDetail = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel')
    modalTitle.innerText = phone.data.name;
    const phoneDetailsModal = document.getElementById('phone-detail-modal-body');
    phoneDetailsModal.innerHTML = `
<p> Release Date: ${phone.data.releaseDate ? phone.data.releaseDate : 'No release date found'}</p>
<p> Others: <br> WLAN: ${phone.data.others ? phone.data.others.WLAN : 'No data found'} ,<br> Bluetooth: ${phone.data.others ? phone.data.others.Bluetooth : 'No data found'} , <br> GPS: ${phone.data.others ? phone.data.others.GPS : 'No data found'}</p>
` ;
}
loadPhone('iphone');