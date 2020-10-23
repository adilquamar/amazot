const sidebar = document.querySelector('.sidenav');

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
    console.log(e.target.classList[1]);
    const selectedProduct = e.target.classList[1];
    document.querySelector(`.display-${selectedProduct}`).classList.add('open');

    db.collection(selectedProduct).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            const data = doc.data();
            console.log(data["contact"]);
            console.log(data["description"]);
            console.log(data["price"]);

            /*
            let html = document.querySelector(`.display-${selectedProduct}`);
            const new_html = `<div class="product" id=`${doc.id}`>
                        <div class="description"></div>
                        <div class="image"></div>
                        <div class="price"></div>
                        <div class="contact"></div>
                    </div>`;

             */

        });
    });
});

