const loadPhone = async (searchText,isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await response.json();
    const allPhones = data.data;
    displayPhone(allPhones,isShowAll);
}
const displayPhone = (phones,isShowAll) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerText='';
    const length=phones.length;
    const showAllContainer=document.getElementById('show-all-btn');
    if(length>9 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
    if(!isShowAll){
        phones=phones.slice(0,9);
    }
    phones.forEach((phone) => {
        const div = document.createElement('div');
        div.classList.add("card", "card-compact","bg-base-100", "shadow-xl");
        div.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body">
                  <h2 class="text-center text-2xl font-bold">${phone.phone_name}</h2>
                  <p>There are many variations of passages of available, but the majority have suffered</p>
                  <p class="text-2xl font-semibold text-center">$999</p>
                  <div class="card-actions justify-center">
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                  </div>
                </div>
        `;
        cardContainer.appendChild(div);
    })
    // Stop loading Spineer
    toggleLoadingSpineer(false);
}
const searchPhone=(isShowAll)=>{
    // Start loading Spineer
    toggleLoadingSpineer(true);
    const searchText=document.getElementById('search-text').value;
    loadPhone(searchText,isShowAll);
}

const loadPhoneDetails=async(id)=>{
    const response=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await response.json();
    const phoneDetails=data.data;
    loadPhoneDetailsModal(phoneDetails);
}
const loadPhoneDetailsModal=(phoneDetails)=>{
    const modalContainer=document.getElementById('modal-item');
    modalContainer.innerHTML=`
    <figure class="flex justify-center my-4 bg-[#0D6EFD0D] p-4"><img src="${phoneDetails.image}"></figure>
    <h2 class="text-2xl font-bold mb-4">${phoneDetails?.name}</h2>
    <h2 class="text-base"><span class="text-base font-bold">Brand: </span>${phoneDetails?.brand}</h2>
    <h2 class="text-base"><span class="text-base font-bold">Storage: </span>${phoneDetails?.mainFeatures?.storage}</h2>
    <h2 class="text-base"><span class="text-base font-bold">Display Size: </span>${phoneDetails?.mainFeatures?.displaySize}</h2>
    <h2 class="text-base"><span class="text-base font-bold">Chipset: </span>${phoneDetails?.mainFeatures?.chipSet}</h2>
    <h2 class="text-base"><span class="text-base font-bold">Memory: </span>${phoneDetails?.mainFeatures?.memory}</h2>
    <h2 class="text-base"><span class="text-base font-bold">Release data: </span>${phoneDetails?.releaseDate}</h2>
    <h2 class="text-base"><span class="text-base font-bold">GPS: </span>${phoneDetails?.others?.GPS}</h2>
    `;
    show_phone_details.showModal();
}
// loading Spinner Function
const toggleLoadingSpineer=(isLoading)=>{
    const spinnerContainer=document.getElementById('spinner-container');
    if(isLoading){
        spinnerContainer.classList.remove('hidden');
    }else{
        spinnerContainer.classList.add('hidden');
    }
}
    const showAllPhones=()=>{
        searchPhone(true);
    }
// loadPhone('iphone');