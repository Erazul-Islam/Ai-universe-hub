const loadPhone = async (searchText,isShow) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShow)
}

const displayPhones = (phones,isShow) => {
    
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container cards before adding new cards
    phoneContainer.textContent = ' '

    const showAll = document.getElementById('show-all')

    if(phones.length > 10){
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }
    console.log(isShow,'show')

    // display only first 10 phones if not show all
    if(!isShow){
        phones = phones.slice(0,10);
    }

    phones.forEach(phone => {
        // console.log(phone)
        // 2. creat a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;

        // 3. set inner html

        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="Details('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
            </div>
        </div>
        `;

        // 4. append child

        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false); 
}

// 

const Details = async (id) =>{
    console.log('details',id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone ${id}`)
    const data = await res.json();
    const phone = data.data;

    showPhone(phone)
}

const showPhone = (phone) => {
    // show the modal
    console.log(phone)
    my_modal_4.showModal()
}


// handle search button
const handleSearch = (isShow) => {
    toggleLoading(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShow)
}

const toggleLoading = (isLoading) =>{
    const loeadingSpinner = document.getElementById('loading');
    if (isLoading){
        loeadingSpinner.classList.remove('hidden')
    }
    else{
        loeadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handleShow = () =>{
    handleSearch(true)
}

// loadPhone()