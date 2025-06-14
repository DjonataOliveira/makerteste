const products = [
  {
    id: 1,
    name: "Spaceship 3D",
    price: 49.9,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp",
  },
  {
    id: 2,
    name: "Robot Model",
    price: 35.0,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp",
  },
  {
    id: 3,
    name: "Fantasy Sword",
    price: 29.9,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp",
  },
  {
    id: 4,
    name: "Futuristic Car",
    price: 55.0,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp",
  },
,

  {
    id: 5,
    name: "Dragon Miniature",
    price: 45.5,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },
  {
    id: 6,
    name: "3D Printed Helmet",
    price: 60.0,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },
  {
    id: 7,
    name: "Custom Keycap Set",
    price: 25.0,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },
  {
    id: 8,
    name: "3D Terrain Tiles",
    price: 75.9,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },

];

const productList = document.getElementById("product-list");
const cart = [,

  {
    id: 5,
    name: "Dragon Miniature",
    price: 45.5,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },
  {
    id: 6,
    name: "3D Printed Helmet",
    price: 60.0,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },
  {
    id: 7,
    name: "Custom Keycap Set",
    price: 25.0,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },
  {
    id: 8,
    name: "3D Terrain Tiles",
    price: 75.9,
    image: "./img/D_NQ_NP_738062-MLA82912072874_032025-O.webp"
  },

];
const cartToggle = document.getElementById("cart-toggle");
const cartEl = document.getElementById("cart");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout");

function renderProducts() {
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Adicionar</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
}

function updateCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
    cartItemsEl.appendChild(li);
    total += item.price;
  });
  cartCountEl.textContent = cart.length;
  cartTotalEl.textContent = total.toFixed(2);
}

cartToggle.addEventListener("click", () => {
  cartEl.classList.toggle("open");
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  cart.length = 0;
  updateCart();
  cartEl.classList.remove("open");
});

renderProducts();
