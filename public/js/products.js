const sidebar = document.querySelector('.sidenav');
const prodList = document.querySelector('.products');

sidebar.addEventListener('click', e => {
    prodList.innerHTML = "";
    const selectedProduct = e.target.classList[1];

    if (selectedProduct === "all"){
        showAllProducts();
    } else {
        db.collection(selectedProduct).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                prodList.innerHTML += getProdHTML(selectedProduct, doc.data());
            });
        });
    }
});
