console.log("done bro");

// 1. Fetch, Load and Show Categories on html

// loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// loadPets
const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};

// loadCategoryPets
const loadCategoryPets = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
  .then(res => res.json())
  .then(data => {
    removeActiveClass()

    const activeBtn = document.getElementById(`btn-${category}`)
    activeBtn.classList.add("active")
    displayPets(data.data)
  })
  .catch(error => console.log(error))
}

// loadPetDetails
const loadPetDetails = async (petId) => {
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  const res = await fetch(uri)
  const data = await res.json()
  displayPetDetails(data.petData)
}

// displayPetDetails
const displayPetDetails = (petDetailsData) => {
  const petDetailsContainer = document.getElementById("petDetailsModalContent")
  petDetailsContainer.innerHTML = `
    <img class='mx-auto w-full object-cover rounded-xl' src=${petDetailsData.image}>
    <h2 class="font-bold my-2 text-2xl">${petDetailsData.pet_name}</h2>
    <div class='grid grid-cols-2'>
      <p>Breed : ${petDetailsData.breed}</p>
      <p>Birth : ${petDetailsData.date_of_birth}</p>
      <p>Gender : ${petDetailsData.gender}</p>
      <p>Price : ${petDetailsData.price}</p>
      <p>vaccinated Status : ${petDetailsData.vaccinated_status}</p>
    </div>
    <div class="divider"></div>
    <div class=''>
      <h3 class='font-bold'>Details Information</h3>
      <p>${petDetailsData.pet_details}</p>
    </div>
  `;
  document.getElementById("showPetDetailsModal").click()
}

// displayAdoptCongrats
const displayAdoptCongrats = () => {
  const countDownContainer = document.getElementById("AdoptModalContent")
  
  document.getElementById("AdoptModalBtn").click()
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn")
  for(let btn of buttons){
    btn.classList.remove("active")
  }
}
  
// displayCards
const displayPets = (pets) => {
  const petsContainer = document.getElementById("Pets");
  petsContainer.innerHTML = ""

  if(pets.length === 0){
    petsContainer.classList.remove("grid")
    petsContainer.innerHTML = `
    <div class="w-full flex flex-col gap-5 justify-center items-center">
      <img src="assets/error.webp"/>
      <h1 class="text-3xl font-bold">No information Available</h1>
      <p class="w-5/6 text-center">
        the information of this category in empty. kindly check the other category for the pets you want to adopt or to know the details of the available pets here. Hope you will find your likeable pet at affordable price. 
      </p>
    </div>
    `;
    return
  }else{
    petsContainer.classList.add("grid")
  }

  pets.forEach((pet) => {
    const checkData = (petData) => {
      if (petData === null || petData === undefined || petData === ""){
        return `<span class="text-teal-700 font-semibold">NO INFO</span>`
      }
      return petData
    }
    
    const petCard = document.createElement("div");
    petCard.classList = "card card-compact rounded-xl border border-gray-400 p-3 gap-2 shadow-sm";
    petCard.innerHTML = `
      <figure class='h-[200px] border  border-gray-400 rounded-xl'>
        <img class='h-full w-full object-cover' src="${checkData(pet.image)}" alt="Shoes"/>
      </figure>
      <div>
        <h2 class="font-bold">${checkData(pet.pet_name)}</h2>
        <p>Breed : ${checkData(pet.breed)}</p>
        <p>Birth : ${checkData(pet.date_of_birth)}</p>
        <p>Gender : ${checkData(pet.gender)}</p>
        <p>Price : ${checkData(pet.price)}</p>
      </div>
      <div class="flex justify-between">
        <button class="btn text-teal-700 rounded-xl border-teal-700">
          <i class="fa-regular fa-thumbs-up"></i>
        </button>
        <button onclick="displayAdoptCongrats()" class="btn text-white font-medium bg-teal-700 rounded-xl">Adopt</button>
        <button onclick="loadPetDetails('${pet.petId}')" class="btn text-white font-medium bg-teal-700 rounded-xl">Details</button>
      </div>
    `;
    petsContainer.append(petCard)
  });
};

// displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  // add data in html
  categories.forEach((item) => {
    // create button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <a id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="btn category-btn flex items-center justify-between bg-white border-teal-700 hover:text-white hover:bg-teal-700 rounded-lg">
      <img class="w-6 object-cover" src="${item.category_icon}"> ${item.category}
    </a>
    `

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadPets();
