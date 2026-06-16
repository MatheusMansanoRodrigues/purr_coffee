(function () {
  const MOBILE_BP = 1000;

  function syncCartBadges() {
    const cart = JSON.parse(localStorage.getItem("purr_cart") || "[]");
    const qty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

    document
      .querySelectorAll("#cartBadge, #sidebarBadge, #mobileCartBadge")
      .forEach((el) => {
        el.textContent = qty;
        el.dataset.qty = String(qty);
      });
  }

  window.syncCartBadges = syncCartBadges;

  function init() {
    const sidebar = document.querySelector(".sidebar");
    const content = document.querySelector(".content");
    if (!sidebar || !content) return;

    sidebar.id = "mainSidebar";

    const app = sidebar.closest(".app, .app-inner");
    if (!app) return;

    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    overlay.setAttribute("aria-hidden", "true");
    sidebar.insertAdjacentElement("afterend", overlay);

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "sidebar-close";
    closeBtn.setAttribute("aria-label", "Fechar menu");
    closeBtn.innerHTML = '<i class="ph-bold ph-x"></i>';
    sidebar.insertBefore(closeBtn, sidebar.firstChild);

    const header = document.createElement("header");
    header.className = "mobile-header";
    header.innerHTML = `
      <button type="button" class="cookie-menu-btn" aria-label="Abrir menu" aria-expanded="false" aria-controls="mainSidebar">
        <span class="cookie-menu-icon" aria-hidden="true"><i class="ph-bold ph-cookie"></i></span>
        <span class="cookie-menu-label">Menu</span>
      </button>
      <a href="home.html" class="mobile-logo">
        <img src="imgs/cabeca.png" alt="Purr'Coffee">
        <span>Purr'Coffee</span>
      </a>
      <button type="button" class="mobile-cart-btn" id="mobileHeaderCartBtn" aria-label="Carrinho">
        <i class="ph-bold ph-shopping-cart"></i>
        <span class="mobile-cart-badge" id="mobileCartBadge" data-qty="0">0</span>
      </button>
    `;
    content.insertBefore(header, content.firstChild);

    const menuBtn = header.querySelector(".cookie-menu-btn");
    const cartBtn = header.querySelector("#mobileHeaderCartBtn");
    const cartSidebar = document.querySelector(".cart-sidebar");
    let cartOverlay = null;

    if (cartSidebar) {
      cartOverlay = document.createElement("div");
      cartOverlay.className = "cart-overlay";
      cartOverlay.setAttribute("aria-hidden", "true");
      cartSidebar.insertAdjacentElement("beforebegin", cartOverlay);

      const handle = document.createElement("div");
      handle.className = "cart-sheet-handle";
      handle.setAttribute("aria-hidden", "true");
      cartSidebar.insertBefore(handle, cartSidebar.firstChild);

      const cartClose = document.createElement("button");
      cartClose.type = "button";
      cartClose.className = "cart-sheet-close";
      cartClose.setAttribute("aria-label", "Fechar carrinho");
      cartClose.innerHTML = '<i class="ph-bold ph-x"></i>';
      cartSidebar.insertBefore(cartClose, cartSidebar.firstChild);
    }

    function openMenu() {
      sidebar.classList.add("is-open");
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      sidebar.classList.remove("is-open");
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }

    function openCart() {
      if (!cartSidebar) {
        window.location.href = "orders.html";
        return;
      }
      cartSidebar.classList.add("is-open");
      cartOverlay.classList.add("is-visible");
      cartOverlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("cart-open");
    }

    function closeCart() {
      if (!cartSidebar || !cartOverlay) return;
      cartSidebar.classList.remove("is-open");
      cartOverlay.classList.remove("is-visible");
      cartOverlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("cart-open");
    }

    menuBtn.addEventListener("click", () => {
      if (sidebar.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    cartBtn.addEventListener("click", () => {
      if (cartSidebar?.classList.contains("is-open")) closeCart();
      else openCart();
    });

    if (cartOverlay && cartSidebar) {
      cartOverlay.addEventListener("click", closeCart);
      cartSidebar
        .querySelector(".cart-sheet-close")
        ?.addEventListener("click", closeCart);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeMenu();
      closeCart();
    });

    sidebar.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= MOBILE_BP) closeMenu();
      });
    });

    window.addEventListener("storage", syncCartBadges);
    window.addEventListener("purrCartUpdated", syncCartBadges);

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_BP) closeMenu();
      if (window.innerWidth > 1000) closeCart();
    });

    syncCartBadges();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
