const loadPhones = async (searchText, dataLimit) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    }
    catch (error) {
        console.log(error);
    }


}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    // display 10 phones only 
    const showAllBtn = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);

        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }


    // display no phone found massage 
    const noPhoneMassage = document.getElementById('no-phone-massage');
    if (phones.length === 0) {
        noPhoneMassage.classList.remove('hidden');
    }
    else {
        noPhoneMassage.classList.add('hidden');
    }

    // display all phones 
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl " >
                <figure class="px-10 pt-10">
                    <img src="${phone.image}" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions">
                    <!-- The button to open modal -->
                        <label for="phone-detail-modal" onclick="loadPhoneDetail('${phone.slug}')" 
                        class="btn btn-primary " data-modal-toggle="defaultModal" >View Detail</label>                
                    </div>
                </div>
            </div>
        `
        phoneContainer.appendChild(div)

        // console.log(phone)
    });
    toggleSpinner(false)
}


const processSearch = (dataLimit) => {
    // start loader 
    toggleSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    loadPhones(inputText, dataLimit)
}
// handale search button 
document.getElementById('button-search').addEventListener('click', function () {
    processSearch(10);

})

// search input field enter key handaler
document.getElementById('input-field').addEventListener('keypress', function (e) {
    // console.log(e.key)
    if (e.key === 'Enter') {

        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const spinningSection = document.getElementById('spinner');
    if (isLoading) {
        spinningSection.classList.remove('hidden');
    }
    else {
        spinningSection.classList.add('hidden');
    }
}
// not the best way to show all 
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
})

const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayInmodal(data.data);
}

// display clicked phone detail in modal 
const modalDiv = document.createElement('div');
const displayInmodal = (phoneDetail) => {
    console.log(phoneDetail)
    const modalContainer = document.getElementById('modal-container');
    modalDiv.classList.add('modal');
    modalDiv.innerHTML = `
    <div class="modal-box relative card card-compact  bg-base-100 shadow-xl">
                <label  for="phone-detail-modal"  class="btn btn-sm btn-circle absolute right-2 top-2 " >✕</label>
    
                <figure><img src="${phoneDetail.image} " alt="Phone" /></figure>
                <div class="card-body">
                    <h2 class="card-title">${phoneDetail.name}</h2>
                    <h3 class="text-lg font-semibold text-blue-300">MainFeatures</h3>
                    <h4> ChipSet : ${phoneDetail.mainFeatures.chipSet}</h4>
                    <p> displaySize : ${phoneDetail.mainFeatures.displaySize}</p>
                    <p> memory : ${phoneDetail.mainFeatures.memory}</p>
                    <h4 class="text-lg font-semibold text-blue-400">Sensors</h4>
                    <div >
                        <ul id="sensor-div">
                           
                        </ul> 
                    <h3 class="text-lg font-semibold text-blue-300">Others</h3>
                    <h4> bluetooth : ${phoneDetail.others?.Bluetooth ? phoneDetail.others.Bluetooth : 'N/A'}</h4>
                    <p> GPS : ${phoneDetail.others?.GPS ? phoneDetail.others.GPS : 'N/A'}</p>
                    <p> NFC : ${phoneDetail.others?.NFC ? phoneDetail.others.NFC : 'N/A'}</p>
                    <p> RADIO : ${phoneDetail.others?.Radio ? phoneDetail.others.Radio : 'N/A'}</p>
                    <p> USB : ${phoneDetail.others?.USB ? phoneDetail.others.USB : 'N/A'}</p>
                    <p> WLAN : ${phoneDetail.others?.WLAN ? phoneDetail.others.WLAN : 'N/A'}</p>
                    
                    <p> memory : ${phoneDetail.mainFeatures?.memory}</p>
                    </div>
                    <p> Release Date : ${phoneDetail.releaseDate ? phoneDetail.releaseDate : 'NO RELEASE DATE FOUND'}</p>
                    
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>

                    </div>
                </div>
            </div>
    `

    modalContainer.appendChild(modalDiv);

    //function for show sensor part using for each
    let text = "";
    const sensors = phoneDetail.mainFeatures.sensors;
    sensors.forEach(myFunction);

    document.getElementById("sensor-div").innerHTML = text;

    function myFunction(sensor, index) {
        text += index + 1 + ": " + sensor + "<br>";
    }


}


