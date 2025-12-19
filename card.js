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
  .then(data => displayPets(data.data))
  .catch(error => console.log(error))
}

// displayCards
const displayPets = (cards) => {
  const petsContainer = document.getElementById("Pets");
  petsContainer.innerHTML = ""

  cards.forEach((card) => {
    const petCard = document.createElement("div");
    petCard.classList = "card card-compact rounded-xl border border-gray-400 p-3 gap-2 shadow-sm";
    petCard.innerHTML = `
      <figure class='h-[200px] border  border-gray-400 rounded-xl'>
        <img class='h-full w-full object-cover' src=${card.image} alt="Shoes"/>
      </figure>
      <div>
        <h2 class="font-bold">${card.pet_name}</h2>
        <p>Breed : ${card.breed}</p>
        <p>Birth : ${card.date_of_birth}</p>
        <p>Gender : ${card.gender}</p>
        <p>Price : ${card.price}</p>
      </div>
      <div class="flex justify-between">
        <button class="btn text-teal-700 rounded-xl border-teal-700">
          <i class="fa-regular fa-thumbs-up"></i>
        </button>
        <button class="btn text-white font-medium bg-teal-700 rounded-xl">Adopt</button>
        <button class="btn text-white font-medium bg-teal-700 rounded-xl">Details</button>
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
    // console.log(item);
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <a onclick="loadCategoryPets('${item.category}')" class="btn flex items-center justify-between hover:text-white hover:bg-teal-700 rounded-lg">
      <img class="w-8 object-cover" src="${item.category_icon}"> ${item.category}
    </a>
    `

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadPets();
