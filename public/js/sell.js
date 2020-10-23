const sellLink = document.querySelector(".sell-product");
const sellModal = document.querySelector('.sellProduct');
const cancelSell = document.querySelector('.cancel')
const productList = document.getElementById('product-list');
const sellForm = document.querySelector('.sellProduct form')

let SELECTED_PRODUCT = "";
const PRODUCTS = {"books": "Textbooks", "iclicker": "iClicker", "furniture": "Furniture", "mealSwipes": "Meal Swipes",
                    "merch": "Merch", "notes": "Notes", "sublease": "Sublease"};

sellLink.addEventListener('click', () => {
    sellModal.classList.add('open');
});

cancelSell.addEventListener('click', e => {
    sellModal.classList.remove('open');
});

productList.addEventListener('click', e => {
    SELECTED_PRODUCT = e.target.id;
    addSnackbar(`Selected: ${PRODUCTS[SELECTED_PRODUCT]}`);
});

sellForm.addEventListener('submit', e => {
    e.preventDefault();

    if (SELECTED_PRODUCT){
        addSnackbar("Loading. Please Wait...");
        const description = sellForm.description.value || "No description";
        const price = sellForm.price.value || "No price given";
        const contact = sellForm.contact.value || "No contact information given";
        db.collection(SELECTED_PRODUCT).add({
            description: description,
            price: price,
            contact: contact
        }).then(() => {
            sellForm.reset();
            sellModal.classList.remove('open');
        });
    } else {
        addSnackbar("Need to select a product before submitting...");
    }
});

