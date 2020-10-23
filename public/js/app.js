// generate snackbar
function addSnackbar(message){
    const el = document.createElement('div');
    el.className = "snackbar";
    const snackbar_container = document.getElementById('snackbar-container');
    el.innerHTML = message;
    snackbar_container.append(el)
    el.className = "snackbar show";
    setTimeout(function ()
    {el.className = el.className.replace("snackbar show", "snackbar");}, 3000)
}

function getProdHTML(prod, data){
    return `
        <div class="product" id="display-${prod}">
            <div class="description">
                <a>Description: ${data["description"]}</a>
            </div>
            <div class="image">
                <img src="images/${prod}.png" alt="notes default picture">
            </div>
            <div class="price">
                <a>Price: ${data["price"]}</a>
            </div>
            <div class="contact">
                <a>Contact: ${data["contact"]}</a>
            </div>
        </div>`;
}

function showAllProducts(){
    const productList = ["books", "iclicker", "furniture", "mealSwipes", "merch", "notes", "sublease"];
    productList.forEach(prod => {
        db.collection(prod).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                prodList.innerHTML += getProdHTML(prod, doc.data());
            });
        });
    })
}