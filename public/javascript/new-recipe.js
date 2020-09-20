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

    // takes array of ingredients and turns it into string so it can be stored in database
    const ingredients = ingredientArr.join(", ");
    const title = document.querySelector('#name').value.trim();
    const post_text = document.querySelector('#instructions').value.trim();
    const category = document.querySelector('#category').value.trim();
    //const user_id = loginStatus.id;
    

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            ingredients,
            post_text,
            category,
            // user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
        console.log("success");
    }
    else {
        alert(response.statusText);
    }
}

// click listener calls function above
document.querySelector('#add-ingredient').addEventListener('click', addIngredientHandler);
document.querySelector('#submit').addEventListener('click', postRecipeHandler);