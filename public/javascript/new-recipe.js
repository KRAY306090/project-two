// create arrays to hold ingredients 
const ingredientArr = [];

// onclick function adds item to ingredient array
function addIngredientHandler(event) {
    event.preventDefault();

    const measurement = document.querySelector('#measurement').value.trim();
    const unit = document.querySelector('#unit').value.trim();
    const ingredientName = document.querySelector('#ingredient-name').value.trim();
   
     const newIngredient = measurement + " " + unit + " " + ingredientName;
    
     ingredientArr.push(newIngredient);
     console.log(ingredientArr);
}

// function takes array of ingredients and turns it into string to pass to database

// function posts new recipe to database

// click listener calls function above
document.querySelector('#add-ingredient').addEventListener('click', addIngredientHandler);