// ===== PRODUCT DATA =====
const products = [
  // Coffee
  {
    id: 1,
    name: "Cappuccino",
    price: 1.5,
    category: "coffee",
    desc: "Entict inne coffee with small and home mdke cappuccino.",
    icon: "ph-coffee",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
  },
  {
    id: 2,
    name: "Coffee Latte",
    price: 1.6,
    category: "coffee",
    desc: "Enticonce coffee with sassor catmes, botten coffee Latte.",
    icon: "ph-coffee",
    img: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=80",
  },
  {
    id: 3,
    name: "Americano",
    price: 1.55,
    category: "coffee",
    desc: "Fast ouusant recent and etion wed coffee ran americano.",
    icon: "ph-snowflake",
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80",
  },
  {
    id: 4,
    name: "V60",
    price: 50,
    category: "coffee",
    desc: "High cond coffee with convectador annost coffee wnm.",
    icon: "ph-coffee",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
  },
  {
    id: 5,
    name: "Flat White",
    price: 2.1,
    category: "coffee",
    desc: "Smooth microfoam espresso with velvety texture.",
    icon: "ph-coffee",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&q=80",
  },
  {
    id: 6,
    name: "Macchiato",
    price: 1.75,
    category: "coffee",
    desc: "Bold espresso with a dollop of creamy foam on top.",
    icon: "ph-coffee",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
  },

  // Non Coffee
  {
    id: 7,
    name: "Matcha Latte",
    price: 2.2,
    category: "noncoffee",
    desc: "Creamy Japanese matcha blended with steamed milk.",
    icon: "ph-tea-bag",
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80",
  },
  {
    id: 8,
    name: "Chocolate",
    price: 1.9,
    category: "noncoffee",
    desc: "Rich hot chocolate made with premium cocoa.",
    icon: "ph-coffee",
    img: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&q=80",
  },
  {
    id: 9,
    name: "Strawberry Tea",
    price: 1.5,
    category: "noncoffee",
    desc: "Fresh brewed tea infused with natural strawberry.",
    icon: "ph-tea-bag",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
  },
  {
    id: 10,
    name: "Lemonade",
    price: 1.4,
    category: "noncoffee",
    desc: "Zesty freshly squeezed lemon with sparkling water.",
    icon: "ph-orange-slice",
    img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80",
  },

  // Food
  {
    id: 11,
    name: "Croissant",
    price: 1.8,
    category: "food",
    desc: "Buttery flaky croissant baked fresh every morning.",
    icon: "ph-bread",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
  },
  {
    id: 12,
    name: "Club Sandwich",
    price: 3.5,
    category: "food",
    desc: "Triple-layered sandwich with turkey, bacon and veggies.",
    icon: "ph-hamburger",
    img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
  },
  {
    id: 13,
    name: "Eggs Benedict",
    price: 4.0,
    category: "food",
    desc: "Poached eggs on English muffin with hollandaise sauce.",
    icon: "ph-egg",
    img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80",
  },
  {
    id: 14,
    name: "Avocado Toast",
    price: 3.2,
    category: "food",
    desc: "Sourdough toast topped with smashed avocado and seeds.",
    icon: "ph-bread",
    img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80",
  },

  // Snack
  {
    id: 15,
    name: "Cheese Cake",
    price: 2.5,
    category: "snack",
    desc: "Classic NY-style cheesecake with berry compote.",
    icon: "ph-cake",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
  },
  {
    id: 16,
    name: "Nachos",
    price: 2.8,
    category: "snack",
    desc: "Crispy corn chips with cheese dip and jalapeños.",
    icon: "ph-bowl-food",
    img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80",
  },
  {
    id: 17,
    name: "Pão de Queijo",
    price: 1.2,
    category: "snack",
    desc: "Classic Brazilian cheese bread, warm and fluffy.",
    icon: "ph-bread",
    img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80",
  },

  // Dessert
  {
    id: 18,
    name: "Brownie",
    price: 2.3,
    category: "dessert",
    desc: "Fudgy chocolate brownie with walnut chunks.",
    icon: "ph-cookie",
    img: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&q=80",
  },
  {
    id: 19,
    name: "Tiramisu",
    price: 3.1,
    category: "dessert",
    desc: "Italian classic with mascarpone and espresso layers.",
    icon: "ph-cake",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
  },
  {
    id: 20,
    name: "Cookie",
    price: 1.1,
    category: "dessert",
    desc: "Soft-baked cookie with chocolate chips, warm inside.",
    icon: "ph-cookie",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80",
  },
];

// ===== STATE =====
let currentCategory = "coffee";
let cart = JSON.parse(localStorage.getItem("purr_cart")) || [];
let orders = JSON.parse(localStorage.getItem("purr_orders")) || [];
let deliveryType = "Delivery";
let discount = 0;

// ===== ELEMENTS =====
const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cartItems");
const priceEl = document.getElementById("priceEl");
const discountEl = document.getElementById("discountEl");
const totalEl = document.getElementById("totalEl");
const searchInput = document.getElementById("search");
const cartBadge = document.getElementById("cartBadge");
const toastEl = document.getElementById("toast");

// ===== FORMAT CURRENCY =====
function fmt(value) {
  return "$" + value.toFixed(2);
}

// ===== SAVE =====
function saveCart() {
  localStorage.setItem("purr_cart", JSON.stringify(cart));
}

function saveOrders() {
  localStorage.setItem("purr_orders", JSON.stringify(orders));
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = products.filter(
    (p) =>
      p.category === currentCategory &&
      (p.name.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query)),
  );

  if (filtered.length === 0) {
    productsEl.innerHTML = `<p style="color: var(--text-muted); font-size:14px; grid-column:1/-1;">No products found.</p>`;
    return;
  }

  productsEl.innerHTML = filtered
    .map(
      (p) => `
    <div class="card" data-id="${p.id}">
      <img
        class="card-img"
        src="${p.img}"
        alt="${p.name}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />
      <div class="card-img-placeholder" style="display:none;"><i class="ph-bold ${p.icon}"></i></div>

      <div class="card-body">
        <div class="card-header">
          <span class="card-name">${p.name}</span>
          <span class="card-price">${fmt(p.price)}</span>
        </div>
        <p class="card-desc">${p.desc}</p>

        <div class="size-label">Size</div>
        <div class="sizes">
          <button class="size-btn active" onclick="selectSize(this)">Small</button>
          <button class="size-btn" onclick="selectSize(this)">Large</button>
        </div>

        <div class="card-actions">
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty(this, -1)">−</button>
            <span class="qty-display">1</span>
            <button class="qty-btn" onclick="changeQty(this, 1)">+</button>
          </div>
          <button class="add-btn" onclick="addToCart(${p.id}, this)">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// ===== SIZE SELECTION =====
function selectSize(btn) {
  const sizesBox = btn.closest(".sizes");
  sizesBox
    .querySelectorAll(".size-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  // Update displayed price based on size
  const card = btn.closest(".card");
  const productId = parseInt(card.dataset.id);
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const size = btn.textContent.trim();
  const priceAdj = size === "Large" ? product.price * 0.2 : 0;
  const finalPrice = product.price + priceAdj;
  card.querySelector(".card-price").textContent = fmt(finalPrice);
}

// ===== QTY ON CARD =====
function changeQty(btn, delta) {
  const display = btn.closest(".qty-controls").querySelector(".qty-display");
  let val = parseInt(display.textContent) + delta;
  if (val < 1) val = 1;
  display.textContent = val;
}

// ===== ADD TO CART =====
function addToCart(id, btn) {
  const product = products.find((p) => p.id === id);
  const card = btn.closest(".card");
  const qty = parseInt(card.querySelector(".qty-display").textContent);
  const sizeBtn = card.querySelector(".size-btn.active");
  const size = sizeBtn ? sizeBtn.textContent : "Small";
  const priceAdj = size === "Large" ? product.price * 0.2 : 0;
  const finalPrice = product.price + priceAdj;

  const existing = cart.find((item) => item.id === id && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id,
      name: product.name,
      price: finalPrice,
      size,
      qty,
      icon: product.icon,
      img: product.img,
    });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} added to cart`);
}

// ===== RENDER CART =====
function renderCart() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="empty-cart"><i class="ph-bold ph-shopping-cart-simple"></i><span>Your cart is empty.</span></div>`;
  } else {
    cartItemsEl.innerHTML = cart
      .map(
        (item, i) => `
      <div class="cart-item">
        <div class="cart-thumb">
          <img src="${item.img}" alt="${item.name}"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'ph-bold ${item.icon}\'></i>';"
          />
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name.length > 10 ? item.name.slice(0, 9) + "…" : item.name}</div>
          <div class="cart-item-price">${fmt(item.price)}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="cart-qty-btn" onclick="cartDecrease(${i})">−</button>
          <span class="cart-qty-display">${item.qty}</span>
          <button class="cart-qty-btn" onclick="cartIncrease(${i})">+</button>
        </div>
      </div>
    `,
      )
      .join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = deliveryType === "Delivery" && cart.length > 0 ? 2.0 : 0;
  const grand = subtotal + deliveryFee - discount;

  priceEl.textContent = fmt(subtotal);
  discountEl.textContent = "-" + fmt(discount);
  totalEl.textContent = fmt(grand > 0 ? grand : 0);

  // badge
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.textContent = totalQty;
  if (window.syncCartBadges) window.syncCartBadges();
}

function cartIncrease(i) {
  cart[i].qty++;
  saveCart();
  renderCart();
}

function cartDecrease(i) {
  if (cart[i].qty > 1) {
    cart[i].qty--;
  } else {
    cart.splice(i, 1);
  }
  saveCart();
  renderCart();
}

// ===== TABS =====
document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  document
    .querySelectorAll(".tab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentCategory = btn.dataset.category;
  renderProducts();
});

// ===== SEARCH =====
searchInput.addEventListener("input", renderProducts);

// ===== DELIVERY OPTIONS =====
document.querySelectorAll(".delivery-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".delivery-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    deliveryType = btn.dataset.type;
    renderCart();
  });
});

// ===== PLACE ORDER =====
document.getElementById("placeOrderBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = deliveryType === "Delivery" ? 2.0 : 0;
  const order = {
    id: Date.now(),
    date: new Date().toLocaleString("en-US"),
    deliveryType,
    items: [...cart],
    total: subtotal + deliveryFee - discount,
  };
  orders.push(order);
  saveOrders();
  cart = [];
  discount = 0;
  saveCart();
  renderCart();
  showToast("Order placed successfully!");
});

// ===== SIDEBAR NAV =====
document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
  link.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-link[data-page]")
      .forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const page = link.dataset.page;
    if (page === "history") {
      if (orders.length === 0) {
        showToast("No order history yet.");
      } else {
        const last = orders[orders.length - 1];
        showToast(
          `Last order: ${last.items.length} item(s) • ${fmt(last.total)}`,
        );
      }
    }
    if (page === "orders") {
      const qty = cart.reduce((s, i) => s + i.qty, 0);
      showToast(`You have ${qty} item(s) in cart.`);
    }
    if (page === "menu") {
      renderProducts();
    }
  });
});

// ===== LOG OUT =====
document.getElementById("logoutBtn").addEventListener("click", () => {
  showToast("See you soon!");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
});

// ===== FILTER BTN (demo) =====
document.querySelector(".filter-btn").addEventListener("click", () => {
  showToast("Filter coming soon!");
});

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}

// ===== PAW STAMPS (5 patinhas decorativas no cart) =====
(function () {
  const cart = document.querySelector(".cart-sidebar");

  // Posições: [top%, left%] — espalhadas e separadas
  const positions = [
    { top: 4, left: 58, rot: -15 },
    { top: 22, left: 12, rot: 20 },
    { top: 44, left: 68, rot: -30 },
    { top: 64, left: 22, rot: 10 },
    { top: 82, left: 55, rot: -10 },
  ];

  positions.forEach(({ top, left, rot }) => {
    const img = document.createElement("img");
    img.src = "imgs/patinhas.png";
    img.alt = "";
    img.className = "paw-stamp";
    img.style.top = top + "%";
    img.style.left = left + "%";
    img.style.transform = `rotate(${rot}deg)`;
    cart.appendChild(img);
  });
})();

// ===== INIT =====
renderProducts();
renderCart();
