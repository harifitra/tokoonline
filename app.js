let cart = [];

// =====================
// LOAD GAMBAR PRODUK
// =====================
document.querySelectorAll(".product-card").forEach(card => {
    const image = card.dataset.image;
    const imageDiv = card.querySelector(".product-image");

    if (image && imageDiv) {
        imageDiv.style.backgroundImage = `url('images/${image}')`;
    }
});


const cartPanel = document.getElementById("cart-panel");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// =====================
// BUKA / TUTUP KERANJANG
// =====================
document.getElementById("open-cart").onclick = () => {
    cartPanel.style.right = "0";
};

document.getElementById("close-cart").onclick = () => {
    cartPanel.style.right = "-350px";
};

// =====================
// PILIH WARNA
// =====================
document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const parent = btn.parentElement;
        parent.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// =====================
// TAMBAH KE KERANJANG
// =====================
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.onclick = () => {
        const card = btn.closest(".product-card");

        let stock = Number(card.dataset.stock);
        if (stock <= 0) {
            alert("Stok habis!");
            return;
        }

        const name = card.dataset.name;
        const price = Number(card.dataset.price);
        const color = card.querySelector(".color-btn.active").dataset.color;

        cart.push({ name, price, color });

        // kurangi stok
        stock--;
        card.dataset.stock = stock;
        card.querySelector(".stock-count").textContent = stock;

        if (stock === 0) {
            card.classList.add("out-of-stock");
            btn.disabled = true;
            btn.textContent = "Stok Habis";
        }

        updateCart();
    };
});

// =====================
// UPDATE KERANJANG
// =====================
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Warna: ${item.color}</p>
            <p>Rp ${item.price.toLocaleString()}</p>
            <hr>
        `;
        cartItems.appendChild(div);
        total += item.price;
    });

    cartTotal.textContent = "Rp " + total.toLocaleString();
    cartCount.textContent = `(${cart.length})`;
}

// =====================
// CHECKOUT KE WHATSAPP
// =====================
document.querySelector(".checkout-btn").onclick = () => {

    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let message = "Halo M-Tech Store 👋\n\n";
    message += "Saya ingin memesan produk berikut:\n\n";

    let total = 0;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Warna: ${item.color}\n`;
        message += `   Harga: Rp ${item.price.toLocaleString()}\n\n`;
        total += item.price;
    });

    message += `Total: Rp ${total.toLocaleString()}\n\n`;
    message += "Mohon info ketersediaan dan pengiriman.\nTerima kasih 🙏";

    const phone = "6285157293855"; // GANTI NOMOR WA TOKO
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
};
