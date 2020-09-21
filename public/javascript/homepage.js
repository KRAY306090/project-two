async function dropSubmitHandler(event) {
    event.preventDefault();

    const category = document.querySelector("#category").value.trim();
    console.log(category);
    const response = await fetch('/api/posts/:category', {
        

    })
}

document.querySelector('#catButton').addEventListener('click', dropSubmitHandler);