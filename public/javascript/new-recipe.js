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

// function posts new recipe to database
async function postRecipeHandler(event) {
    event.preventDefault();

    // takes array of ingredients and turns it into string
    const stringed = ingredientArr.join(", ");
    const title = document.querySelector('#name').value.trim();
    const instructions = document.querySelector('#instructions').value.trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            stringed,
            instructions
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('dashboard');
    }
    else {
        alert(response.statusText);
    }
}

// click listener calls function above
document.querySelector('#add-ingredient').addEventListener('click', addIngredientHandler);
document.querySelector('#submit').addEventListener('click', postRecipeHandler);