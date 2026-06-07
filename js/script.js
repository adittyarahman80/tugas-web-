
const cartBtn =
document.querySelector(".cart-btn");

const cartSidebar =
document.querySelector(".cart-sidebar");

const overlay =
document.querySelector(".cart-overlay");

const closeBtn =
document.querySelector(".close-cart");

cartBtn.onclick = () => {
    cartSidebar.classList.add("active");
    overlay.classList.add("active");
};

closeBtn.onclick = () => {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
};

overlay.onclick = () => {
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
};

let cart = [];

document.querySelectorAll(".add-cart")
.forEach(btn => {

    btn.addEventListener("click", () => {

        const name =
        btn.dataset.name;

        const price =
        parseInt(btn.dataset.price);

        const existing = cart.find(
    item => item.name === name
);

if(existing){
    existing.qty++;
}else{
    cart.push({
        name,
        price,
        qty: 1
    });
}

        document.getElementById(
        "cart-count"
        ).innerText = cart.length;

        renderCart();

        btn.innerHTML = "✓ Ditambahkan";

        setTimeout(()=>{
            btn.innerHTML = "Tambah";
        },1000);

    });

});

function renderCart(){

    const container =
    document.getElementById("cart-items");

    container.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;

        container.innerHTML += `
        <div class="cart-item">
            <h4>${item.name}</h4>

            <div class="qty-control">
                <button onclick="decreaseQty(${index})">-</button>

                <span>${item.qty}</span>

                <button onclick="increaseQty(${index})">+</button>
            </div>

            <p>
                Rp ${(item.price * item.qty).toLocaleString()}
            </p>
        </div>
        `;
    });

    document.getElementById("cart-total")
    .innerText = total.toLocaleString();

    document.getElementById("cart-count")
    .innerText =
    cart.reduce((sum,item)=>sum+item.qty,0);
}

function increaseQty(index){
    cart[index].qty++;
    renderCart();
}

function decreaseQty(index){

    cart[index].qty--;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    renderCart();
}


function checkoutWA() {

    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    const nama =
    document.getElementById("customer-name").value.trim();

    const levelPedas =
    document.getElementById("spicy-level").value;

    const jenis =
    document.getElementById("order-type").value;

    const meja =
    document.getElementById("table-number").value;

    const alamat =
    document.getElementById("customer-address").value.trim();

    if(!nama){
    alert("Masukkan nama pembeli!");
    return;
}

    if(!jenis){
        alert("Pilih jenis pesanan!");
        return;
    }

    if(!levelPedas){
    alert("Pilih level pedas!");
    return;
    }

    if(jenis === "Makan di Tempat" && !meja){
        alert("Masukkan nomor meja!");
        return;
    }

    if(jenis === "Delivery" && !alamat){
        alert("Masukkan alamat pengiriman!");
        return;
    }

    let pesan = "Halo Seblak Nguawor\n\n";

    pesan += `Nama: ${nama}\n`;
    pesan += `Level Pedas: ${levelPedas}\n`;
    pesan += `Jenis Pesanan: ${jenis}\n`;

    if(jenis === "Makan di Tempat"){
        pesan += `Nomor Meja: ${meja}\n`;
    }

    if(jenis === "Delivery"){
        pesan += `Alamat: ${alamat}\n`;
    }

    pesan += "\nSaya ingin memesan:\n";

    let total = 0;

    cart.forEach(item => {
        pesan += `• ${item.name} x${item.qty}\n`;
        total += item.price * item.qty;
    });

    pesan += `\nTotal: Rp ${total.toLocaleString('id-ID')}`;

    const nomorWA = "6285716384748";

const url =
    `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

window.open(url, "_blank");

// Kosongkan keranjang
cart = [];
renderCart();

document.getElementById("customer-name").value = "";
document.getElementById("order-type").value = "";
document.getElementById("table-number").value = "";
document.getElementById("customer-address").value = "";

document.getElementById("table-number").style.display = "none";
document.getElementById("customer-address").style.display = "none";

// Tutup sidebar
cartSidebar.classList.remove("active");
overlay.classList.remove("active");

alert("Pesanan berhasil dikirim ke WhatsApp!");
}

const orderType = document.getElementById("order-type");

orderType.addEventListener("change", () => {

    const meja =
    document.getElementById("table-number");

    const alamat =
    document.getElementById("customer-address");

    if(orderType.value === "Makan di Tempat"){

        meja.style.display = "block";
        alamat.style.display = "none";

    }else if(orderType.value === "Delivery"){

        meja.style.display = "none";
        alamat.style.display = "block";

    }else{

        meja.style.display = "none";
        alamat.style.display = "none";
    }
});

    




