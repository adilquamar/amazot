const sidebar = document.querySelector('.sidenav');
const prodList = document.querySelector('.products');

const PRODUCT_TEMPLATE =
    '<div class="product">' +
        '<div class="description"></div>' +
        '<div class="image"></div>' +
        '<div class="price"></div>' +
        '<div class="contact"></div>' +
    '</div>';

// loading image url
const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

let CURRENT_PRODUCT = '';
let PREVIOUS_PRODUCT = '';

sidebar.addEventListener('click', e => {
    prodList.innerHTML = "";
    console.log(e.target.classList[1]);
    const selectedProduct = e.target.classList[1];

    db.collection(selectedProduct).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = doc.data();

            const html = `
            <div class="product" id="display-${selectedProduct}">
                <div class="description">
                    <a>Description: ${data["description"]}</a>
                </div>
                <div class="image">
                    <img src="images/${selectedProduct}.png" alt="notes default picture">
                </div>
                <div class="price">
                    <a>Price: ${data["price"]}</a>
                </div>
                <div class="contact">
                    <a>Contact: ${data["contact"]}</a>
                </div>
            </div>
            `;

            prodList.innerHTML += html;

        });
    });
});

