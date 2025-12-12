console.log('done bro');

// 1. Fetch, Load and Show Categories on html


// Create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error))
}

// Create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories")

  // add data in html
  categories.forEach(item => {
    console.log(item);
    // create a button
    const button = document.createElement("button")
    button.classList = "btn"
    button.innerText = item.category

    // add button to category container
    categoryContainer.append(button)
  })
}

loadCategories()