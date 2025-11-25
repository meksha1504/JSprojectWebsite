var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    },
});

let productList = [];
let cartProduct = [];


const cartIcon = document.querySelector('.cart-icon');
const cartTab = document.querySelector('.cart-tab');
const closeBtn = document.querySelector('.close-btn');
const cardList = document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');
const cartValue = document.querySelector('.cart-value');


if (cartIcon && cartTab) cartIcon.addEventListener('click', () => cartTab.classList.add('cart-tab-active'));
if (closeBtn && cartTab) closeBtn.addEventListener('click', () => cartTab.classList.remove('cart-tab-active'));


const showCards = () => {
    if (!cardList) {
        console.error("card-list not found");
        return;
    }

    cardList.innerHTML = ""; 

    productList.forEach(product => {
        const orderCard = document.createElement('div');
        orderCard.classList.add('order-card');

        orderCard.innerHTML = `
            <div class="card-image">
                <img src="${product.image}">
            </div>
            <h4>${product.name}</h4>
            <h4 class="item-total">Rs.${product.price}</h4>
            <a href="#" class="btn card-btn">Add to Cart</a>
        `;

        cardList.appendChild(orderCard);

        
        const cardBtn = orderCard.querySelector(".card-btn");
        cardBtn.addEventListener("click", (e) => {
            e.preventDefault();
            addToCart(product);
        });
    });
};



const addToCart = (product) => {
    const existingProduct = cartProduct.find(item => item.id === product.id);

    if (existingProduct) {
        alert("Item already in your Cart");
        return;
    }

    cartProduct.push({ ...product, quantity: 1 });

    updateCartUI();
    updateCartCount();
};



const updateCartUI = () => {
    cartList.innerHTML = "";

    cartProduct.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("item");

        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}">
            </div>

            <div class="detail">
                <h4>${item.name}</h4>
                <h4 class="item-total">Rs.${item.price * item.quantity}</h4>
            </div>

            <div class="flex">
                <a href="#" class="quantity-btn minus">
                    <i class="fa-solid fa-minus"></i>
                </a>
                <h4 class="quantity-value">${item.quantity}</h4>
                <a href="#" class="quantity-btn plus">
                    <i class="fa-solid fa-plus"></i>
                </a>
            </div>
        `;

        cartList.appendChild(cartItem);

        
        const plusBtn = cartItem.querySelector(".plus");
        plusBtn.addEventListener("click", () => {
            item.quantity++;
            updateCartUI();
            updateCartCount();
        });

        
        const minusBtn = cartItem.querySelector(".minus");
        minusBtn.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                
                cartProduct = cartProduct.filter(p => p.id !== item.id);
            }
            updateCartUI();
            updateCartCount();
        });
    });
};



const updateCartCount = () => {
    if (cartValue) {
        cartValue.textContent = cartProduct.length;
    }
};



const initApp = () => {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            productList = data;
            showCards();
        });
};

initApp();