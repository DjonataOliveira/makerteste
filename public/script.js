
function showToast(message, color = "#4caf50") {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.right = "20px";
  toast.style.padding = "12px 20px";
  toast.style.backgroundColor = color;
  toast.style.color = "#fff";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  toast.style.transform = "translateY(-20px)";
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-20px)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Exemplo de uso (substitua com eventos reais em seu app):
// showToast("Produto adicionado ao carrinho!");
// showToast("Compra realizada com sucesso!", "#2196f3");
// showToast("Login realizado com sucesso!", "#673ab7");
// showToast("Registro concluído!", "#009688");
// showToast("Conectado com sucesso!", "#ff9800");


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
