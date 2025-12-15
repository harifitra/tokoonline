document.addEventListener('DOMContentLoaded', () => {

    /* ================= IMAGE AUTO LOAD ================= */
    document.querySelectorAll('.product-card').forEach(card => {
        const image = card.dataset.image;
        const imageBox = card.querySelector('.product-image');

        if (image && imageBox) {
            imageBox.style.backgroundImage = `url(images/${image})`;
        }
    });

    /* ================= ADD TO CART ================= */
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;

            alert(`${productName} berhasil ditambahkan ke keranjang!`);
        });
    });

});
