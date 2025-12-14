
// Load cart from localStorage immediately
let cart = JSON.parse(localStorage.getItem('bupangCart')) || [];
let deliveryFee = parseFloat(localStorage.getItem('bupangDeliveryFee')) || 0;
let deliveryMethod = localStorage.getItem('bupangDeliveryMethod') || 'self-pickup';

// Update cart count badge (works on all pages)
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('bupangCart', JSON.stringify(cart));
  localStorage.setItem('bupangDeliveryFee', deliveryFee);
  localStorage.setItem('bupangDeliveryMethod', deliveryMethod);
  updateCartCount();
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount(); // Update count immediately on page load

  /* ===== NAVBAR ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  /* ===== PRODUCT CARD IMAGE HOVER ===== */
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach(card => {
    const defaultImg = card.querySelector(".default-img");
    const hoverImg = card.querySelector(".hover-img");
    if (defaultImg && hoverImg) {
      let showingDefault = true;
      setInterval(() => {
        defaultImg.style.opacity = showingDefault ? "0" : "1";
        hoverImg.style.opacity = showingDefault ? "1" : "0";
        showingDefault = !showingDefault;
      }, 2000);
    }
  });

  if ("ontouchstart" in window) {
    document.querySelectorAll(".flip-card").forEach(card => {
  
      // Toggle flip on tap
      card.addEventListener("click", function (e) {
        this.classList.toggle("flipped");
        e.stopPropagation(); // Prevent closing immediately
      });
  
      // Tap anywhere else to flip back
      document.addEventListener("click", function () {
        card.classList.remove("flipped");
      });
    });
  }

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = (window.scrollY > 200) ? "block" : "none";
    });
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

// Flip-up images
const animElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const duration = entry.target.dataset.duration || 800; // default 0.8s
      entry.target.style.transitionDuration = `${duration}ms`;
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // allow re-animation
    }
  });
}, { threshold: 0.2 });

animElements.forEach(el => fadeObserver.observe(el));

  /* ===== ANIMATION ===== */
  const allElements = document.querySelectorAll('.fade-up, .flip-down img, .blur-text, #home_img, .zoom-out-down');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Handle fade-up duration
      if (entry.target.classList.contains('fade-up')) {
        const duration = entry.target.dataset.duration || 800;
        entry.target.style.transitionDuration = `${duration}ms`;
      }
      entry.target.classList.add('animate');
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('animate');
    }
  });
}, { threshold: 0.2 });

allElements.forEach(el => observer.observe(el));

  /* ===== MENU (Recipe Modal) ===== */
  const recipeCards = document.querySelectorAll('.recipe-card');
  const modal = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const container = document.getElementById('recipesContainer');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');

  if (recipeCards.length && modal && closeBtn) {
    recipeCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.title;
        const image = card.dataset.image;
        const prep = card.dataset.prep;
        const cook = card.dataset.cook;
        const total = card.dataset.total;

        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalImage').src = image;
        document.getElementById('prepTime').textContent = prep;
        document.getElementById('cookTime').textContent = cook;
        document.getElementById('totalTime').textContent = total;

        const ingredientsHTML = card.querySelector('.ingredients').innerHTML;
        const instructionsHTML = card.querySelector('.instructions').innerHTML;
        document.getElementById('ingredientsList').innerHTML = ingredientsHTML;
        document.getElementById('instructionsList').innerHTML = instructionsHTML;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    if (leftArrow && rightArrow && container) {
      leftArrow.addEventListener('click', () => {
        container.scrollBy({ left: -310, behavior: 'smooth' });
      });
      rightArrow.addEventListener('click', () => {
        container.scrollBy({ left: 310, behavior: 'smooth' });
      });
    }
  }

  /* ===== POPUP ELEMENTS ===== */
  const popup = document.getElementById('productPopup');
  const popupImage = document.getElementById('popupImage');
  const popupName = document.getElementById('popupName');
  const popupDesc = document.getElementById('popupDesc');
  const popupCategory = document.getElementById('popupCategory');
  const popupPrice = document.getElementById('popupPrice');
  const popupClose = document.querySelector('.popup-close');

  // Quantity controls
  const qtyInput = document.getElementById('popupQty');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      if (qtyInput.value > 1) qtyInput.value--;
    });
    qtyPlus.addEventListener('click', () => {
      qtyInput.value++;
    });
  }

  // Handle popup open on "View More" click
  document.querySelectorAll('.explore-btn').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const imageSrc = card.querySelector('.default-img').src;
      const name = card.querySelector('.product-title').innerText;
      const category = card.dataset.category || "Breads";

      // Get custom details from button data attributes
      const desc = button.dataset.desc || "No description available.";
      const price = button.dataset.price || "RM -";

      // Update popup content
      if (popupImage) popupImage.src = imageSrc;
      if (popupName) popupName.textContent = name;
      if (popupCategory) popupCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
      if (popupDesc) popupDesc.textContent = desc;
      if (popupPrice) popupPrice.textContent = price;

      // Reset quantity each time popup opens
      if (qtyInput) qtyInput.value = 1;

      // Show popup
      if (popup) popup.style.display = 'flex';
    });
  });

  // Close popup when click close button or outside box
  if (popupClose) {
    popupClose.addEventListener('click', () => {
      if (popup) popup.style.display = 'none';
    });
  }
  window.addEventListener('click', e => {
    if (e.target === popup && popup) popup.style.display = 'none';
  });

  /* ===== ADD TO CART & CART COUNT ===== */
  const cartIcon = document.getElementById("cartIcon");
  const cartCount = document.getElementById("cartCount");

  const addToCartBtn = document.querySelector('.popup-cart-btn');
  if (addToCartBtn && cartIcon && popupImage && cartCount) {
    addToCartBtn.addEventListener('click', () => {
      // Fly image animation
      const cartClone = popupImage.cloneNode(true);
      cartClone.style.position = 'fixed';
      cartClone.style.width = '60px';
      cartClone.style.height = '60px';
      cartClone.style.borderRadius = '50%';
      cartClone.style.transition = 'all 1s ease';
      cartClone.style.top = popupImage.getBoundingClientRect().top + 'px';
      cartClone.style.left = popupImage.getBoundingClientRect().left + 'px';
      cartClone.style.zIndex = '9999';
      document.body.appendChild(cartClone);

      const cartRect = cartIcon.getBoundingClientRect();
      setTimeout(() => {
        cartClone.style.top = cartRect.top + 'px';
        cartClone.style.left = cartRect.left + 'px';
        cartClone.style.opacity = '0';
        cartClone.style.transform = 'scale(0.1)';
      }, 100);
      setTimeout(() => cartClone.remove(), 1000);

      // Add item to cart
      addItemToCart();

      // Close popup after adding
      if (popup) popup.style.display = 'none';
    });
  }

  /* ===== CART ICON CLICK TO OPEN DRAWER ===== */
  if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      const cartOverlay = document.getElementById("cartOverlay");
      if (cartOverlay) {
        updateCartUI(); // Update cart UI when opening
        cartOverlay.classList.add('active');
      } else {
        // If no cart drawer (not on menu page), go to menu page
        window.location.href = '../html/menu.html';
      }
    });
  }

  /* ===== MINI CART DRAWER WITH DELIVERY OPTIONS ===== */
  const cartOverlay = document.getElementById("cartOverlay");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCartDrawer = document.getElementById("closeCartDrawer");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Add item to cart
  function addItemToCart() {
    const name = popupName.textContent;
    const price = parseFloat(popupPrice.textContent.replace('RM', '').trim()) || 0;
    const qty = parseInt(qtyInput.value) || 1;
    const imgSrc = popupImage.src;

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, price, qty, imgSrc });
    }

    saveCart();
    updateCartUI();
  }

  // Close drawer
  if (closeCartDrawer) {
    closeCartDrawer.addEventListener('click', () => {
      cartOverlay.classList.remove('active');
    });
  }

  // Close by clicking outside
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove('active');
      }
    });
  }

  // Update cart UI
  function updateCartUI() {
    if (!cartItemsContainer) return; 
    
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    // Cart items
    cart.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px; flex:1;">
          <span style="font-size:15px; font-weight:500; font-family:Alegreya; color:#016a3e; text-align:left; margin-right:5px;">${item.name}</span>
        </div>
        <div class="qty-controls" style="display:flex; align-items:center; gap:8px;">
          <button class="decrease" data-index="${index}" style="width:25px; height:25px; border:1px solid #ddd; background:#016a3e; cursor:pointer; border-radius:4px;">-</button>
          <span style="min-width:20px; text-align:center; font-family:Alegreya; color:#016a3e;">${item.qty}</span>
          <button class="increase" data-index="${index}" style="width:25px; height:25px; border:1px solid #ddd; font-family:Alegreya; background:#016a3e; cursor:pointer; border-radius:4px;">+</button>
          <span style="margin-left:10px; font-weight:600; font-family:Alegreya; color:#016a3e;">RM ${(item.price * item.qty).toFixed(2)}</span>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
      subtotal += item.price * item.qty;
    });

    // Update cart count badge
    updateCartCount();

    // Calculate total
    const total = subtotal + deliveryFee;
    
    // Update total in footer with delivery options
    const footerTotal = document.querySelector('.cart-footer p');
    if (footerTotal) {
      footerTotal.innerHTML = `
        <div style="margin-bottom:20px; padding-bottom:20px; border-bottom:2px solid #016a3e;">
          <h3 style="margin-bottom:15px; font-size:15px; color:#01290a; font-family:Alegreya; font-weight:bold;">Delivery Method</h3>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <label style="display:flex; align-items:center; gap:10px; padding:12px; border:2px solid ${deliveryMethod === 'self-pickup' ? '#016a3e' : '#ddd'}; border-radius:8px; cursor:pointer; transition:all 0.3s;">
              <input type="radio" name="delivery" value="self-pickup" ${deliveryMethod === 'self-pickup' ? 'checked' : ''} style="width:15px; height:10px; cursor:pointer;">
              <div style="flex:1;">
                <div style="font-weight:600; color:#01290a;font-family:Alegreya; font-size:15px;">Self Pick-up</div>
                <div style="font-size:10px; color:#016a3e; font-family:Alegreya;">Free</div>
              </div>
              <span style="font-weight:600; color:#016a3e; font-family:Alegreya;">RM 0.00</span>
            </label>
            <label style="display:flex; align-items:center; gap:10px; padding:12px; border:2px solid ${deliveryMethod === 'delivery' ? '#016a3e' : '#ddd'}; border-radius:8px; cursor:pointer; transition:all 0.3s;">
              <input type="radio" name="delivery" value="delivery" ${deliveryMethod === 'delivery' ? 'checked' : ''} style="width:15px; height:10px; cursor:pointer;">
              <div style="flex:1;">
                <div style="font-weight:600; color:#333; font-family:Alegreya; font-size:15px;"> Gdex Delivery</div>
                <div style="font-size:10px; color:#016a3e; font-family:Alegreya;">West Malaysia only</div>
              </div>
              <span style="font-weight:600; color:#016a3e; font-family:Alegreya;">RM 10.00</span>
            </label>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px; color:#016a3e; font-family:Alegreya;">
          <span>Subtotal:</span>
          <span>RM ${subtotal.toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:8px; color:#016a3e; font-family:Alegreya;">
          <span>Delivery:</span>
          <span>RM ${deliveryFee.toFixed(2)}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-weight:700; font-size:18px; padding-top:8px; border-top:2px solid #01290a; font-family:Alegreya;">
          <span>Total:</span>
          <span>RM ${total.toFixed(2)}</span>
        </div>
      `;
      
      // Add radio button listeners after rendering
      const radioButtons = footerTotal.querySelectorAll('input[name="delivery"]');
      radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
          deliveryMethod = e.target.value;
          deliveryFee = deliveryMethod === 'delivery' ? 10 : 0;
          saveCart(); // Save delivery method
          updateCartUI();
        });
      });
    }

    // Add event listeners for qty buttons
    const increaseBtns = cartItemsContainer.querySelectorAll('.increase');
    const decreaseBtns = cartItemsContainer.querySelectorAll('.decrease');
    const removeBtns = cartItemsContainer.querySelectorAll('.remove');

    increaseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        cart[i].qty += 1;
        saveCart(); // Save after quantity change
        updateCartUI();
      });
    });

    decreaseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        if (cart[i].qty > 1) {
          cart[i].qty -= 1;
        } else {
          cart.splice(i, 1);
        }
        saveCart(); // Save after quantity change
        updateCartUI();
      });
    });

    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        cart.splice(i, 1);
        saveCart(); // Save after removing item
        updateCartUI();
      });
    });
  }

  // Checkout with email functionality
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }

      // Show success message
      showCheckoutSuccess();
      
      // Clear cart
      cart = [];
      deliveryFee = 0;
      deliveryMethod = 'self-pickup';
      saveCart(); // Clear localStorage
      updateCartUI();
      
      // Close cart drawer after a delay
      setTimeout(() => {
        if (cartOverlay) {
          cartOverlay.classList.remove('active');
        }
      }, 2500);
    });
  }

  // Show checkout success message
  function showCheckoutSuccess() {
    const successOverlay = document.createElement('div');
    successOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;

    successOverlay.innerHTML = `
      <div style="background:white; padding:40px; border-radius:16px; text-align:center; max-width:400px; animation: slideUp 0.4s ease;">
        <div style="width:80px; height:80px; background:#6ca96e; border-radius:50%; margin:0 auto 20px; display:flex; align-items:center; justify-content:center;">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 style="color:#333; margin-bottom:10px; font-size:24px; font-weight:700;">Checkout Successful!</h2>
        <p style="color:#666; margin-bottom:20px; font-size:16px;">Your order has been placed successfully.</p>
        <p style="color:#999; font-size:14px;">Thank you for choosing Bupang Bakery!</p>
      </div>
    `;

    document.body.appendChild(successOverlay);

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Remove after 2.5 seconds
    setTimeout(() => {
      successOverlay.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => successOverlay.remove(), 300);
    }, 2500);
  }

  /* ===== NEWSLETTER POPUP ===== */
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("email");
  const popupMsg = document.getElementById("popupMessage");
  if (form && popupMsg && emailInput) {
    const registeredEmails = new Set(JSON.parse(localStorage.getItem("registeredEmails") || "[]"));

    function showPopup(message, type) {
      popupMsg.textContent = message;
      popupMsg.className = "popup-message " + type + " show";
      setTimeout(() => popupMsg.classList.remove("show"), 3000);
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = emailInput.value.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) return showPopup("❌ Please enter a valid email address", "error");
      if (registeredEmails.has(email)) return showPopup("⚠️ This email is already registered!", "warning");

      registeredEmails.add(email);
      localStorage.setItem("registeredEmails", JSON.stringify([...registeredEmails]));
      showPopup("🎉 Registered successfully!", "success");
      form.reset();
    });
  }

  /* ===== FAQ ===== */
  const questions = document.querySelectorAll(".faq-question");
  questions.forEach(q => {
    q.addEventListener("click", () => {
      q.classList.toggle("active");
      const answer = q.nextElementSibling;
      answer.style.display = q.classList.contains("active") ? "block" : "none";
    });
  });

  // Initialize cart UI if on menu page
  if (cartItemsContainer) {
    updateCartUI();
  }
});

const contactForm = document.querySelector('.contact-form form');
const successMessage = document.getElementById('successMessage');

if (contactForm && successMessage) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form inputs
    const inputs = contactForm.querySelectorAll('input, textarea');
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const phone = inputs[2].value.trim();
    const message = inputs[3].value.trim();
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10,11}$/;
    
    // Validate name
    if (name === '') {
      alert('❌ Please enter your name');
      return;
    }
    
    // Validate email
    if (!emailPattern.test(email)) {
      alert('❌ Please enter a valid email address (e.g., example@gmail.com)');
      return;
    }
    
    // Validate phone
    if (!phonePattern.test(phone)) {
      alert('❌ Please enter a valid phone number (10-11 digits only)');
      return;
    }
    
    // Validate message
    if (message === '') {
      alert('❌ Please enter your message');
      return;
    }
    
    // All validations passed
    successMessage.classList.add('show');
    contactForm.reset();
    
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 4000);
  });
}

// --- VARIABLES ---
const drawer = document.getElementById("filterDrawer");
const mobileFilterBtn = document.getElementById("mobileFilterBtn");
const drawerClose = document.getElementById("drawerClose");
const filterBtns = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

// --- OPEN/CLOSE DRAWER ---
mobileFilterBtn.addEventListener("click", () => {
  drawer.classList.add("open");
});

drawerClose.addEventListener("click", () => {
  drawer.classList.remove("open");
});

// --- FILTER FUNCTION ---
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    // Remove 'active' from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));

    // Add 'active' to all buttons with the same category
    filterBtns.forEach((b) => {
      if (b.getAttribute("data-category") === category) {
        b.classList.add("active");
      }
    });

    // Show/hide product cards
    productCards.forEach((card) => {
      card.style.display =
        category === "all" || card.dataset.category === category
          ? "block"
          : "none";
    });

    // Close drawer on mobile after selecting
    drawer.classList.remove("open");
  });
});

// --- AUTO CLOSE DRAWER & SYNC ACTIVE ON RESIZE ---
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    // Close mobile drawer
    drawer.classList.remove("open");

    // Get the currently active category
    const activeBtn = document.querySelector(".filter-btn.active");
    const activeCategory = activeBtn
      ? activeBtn.getAttribute("data-category")
      : "all";

    // Sync active class to all buttons
    filterBtns.forEach((b) => {
      if (b.getAttribute("data-category") === activeCategory) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    // Ensure filtered products match the active category
    productCards.forEach((card) => {
      card.style.display =
        activeCategory === "all" || card.dataset.category === activeCategory
          ? "block"
          : "none";
    });
  }
});

// --- INITIAL SYNC ON PAGE LOAD ---
window.addEventListener("DOMContentLoaded", () => {
  const activeBtn = document.querySelector(".filter-btn.active");
  const activeCategory = activeBtn
    ? activeBtn.getAttribute("data-category")
    : "all";

  filterBtns.forEach((b) => {
    if (b.getAttribute("data-category") === activeCategory) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  productCards.forEach((card) => {
    card.style.display =
      activeCategory === "all" || card.dataset.category === activeCategory
        ? "block"
        : "none";
  });
});