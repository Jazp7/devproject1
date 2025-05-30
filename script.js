// Datos de productos (simulando carga desde JSON)
const productsData = [
    {
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
    },
    {
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
    }
];

// Estado del carrito
let cart = [];

// Referencias del DOM
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartEmpty = document.getElementById('cart-empty');
const cartItems = document.getElementById('cart-items');
const cartList = document.getElementById('cart-list');
const totalAmount = document.getElementById('total-amount');
const confirmOrderBtn = document.getElementById('confirm-order-btn');
const modalOverlay = document.getElementById('modal-overlay');
const orderModal = document.getElementById('order-modal');
const orderSummary = document.getElementById('order-summary');
const modalTotalAmount = document.getElementById('modal-total-amount');
const startNewOrderBtn = document.getElementById('start-new-order-btn');

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupEventListeners();
    updateCartDisplay();
    loadCartFromStorage();
});

// Configurar event listeners
function setupEventListeners() {
    confirmOrderBtn.addEventListener('click', showOrderConfirmation);
    startNewOrderBtn.addEventListener('click', startNewOrder);
    modalOverlay.addEventListener('click', closeModalOnOverlayClick);
    
    // Navegación por teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Renderizar productos en el grid[1][5]
function renderProducts() {
    productsGrid.innerHTML = '';
    
    productsData.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
}

// Crear tarjeta de producto[5][24]
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', index);
    
    const cartItem = cart.find(item => item.id === index);
    const quantity = cartItem ? cartItem.quantity : 0;
    const isInCart = quantity > 0;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image.desktop}" alt="${product.name}" loading="lazy">
            
            <button class="add-to-cart-btn" data-product-id="${index}" style="${isInCart ? 'display: none;' : ''}" aria-label="Add ${product.name} to cart">
                <svg width="21" height="20" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#C73B0F" fill-rule="nonzero">
                        <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096L3.446 1.752Z"/>
                    </g>
                </svg>
                Add to Cart
            </button>
            
            <div class="quantity-controls ${isInCart ? 'active' : ''}" data-product-id="${index}">
                <button class="quantity-btn decrease-btn" aria-label="Decrease quantity">-</button>
                <span class="quantity-display">${quantity}</span>
                <button class="quantity-btn increase-btn" aria-label="Increase quantity">+</button>
            </div>
        </div>
        
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>
    `;
    
    // Event listeners para botones
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const quantityControls = card.querySelector('.quantity-controls');
    const decreaseBtn = card.querySelector('.decrease-btn');
    const increaseBtn = card.querySelector('.increase-btn');
    
    addToCartBtn.addEventListener('click', () => addToCart(index));
    decreaseBtn.addEventListener('click', () => decreaseQuantity(index));
    increaseBtn.addEventListener('click', () => increaseQuantity(index));
    
    if (isInCart) {
        card.classList.add('selected');
    }
    
    return card;
}

// Añadir producto al carrito[24][25]
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            product: productsData[productId]
        });
    }
    
    updateCartDisplay();
    updateProductCard(productId);
    saveCartToStorage();
}

// Aumentar cantidad
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        updateProductCard(productId);
        saveCartToStorage();
    }
}

// Disminuir cantidad
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
        }
        updateCartDisplay();
        updateProductCard(productId);
        saveCartToStorage();
    }
}

// Remover del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateProductCard(productId);
    saveCartToStorage();
}

// Actualizar tarjeta de producto
function updateProductCard(productId) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    const addBtn = card.querySelector('.add-to-cart-btn');
    const quantityControls = card.querySelector('.quantity-controls');
    const quantityDisplay = card.querySelector('.quantity-display');
    
    const cartItem = cart.find(item => item.id === productId);
    const quantity = cartItem ? cartItem.quantity : 0;
    
    if (quantity > 0) {
        addBtn.style.display = 'none';
        quantityControls.classList.add('active');
        quantityDisplay.textContent = quantity;
        card.classList.add('selected');
    } else {
        addBtn.style.display = 'flex';
        quantityControls.classList.remove('active');
        card.classList.remove('selected');
    }
}

// Actualizar display del carrito[5][24]
function updateCartDisplay() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    totalAmount.textContent = `$${total.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        renderCartItems();
    }
}

// Renderizar items del carrito
function renderCartItems() {
    cartList.innerHTML = '';
    
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'cart-item';
        
        const itemTotal = item.product.price * item.quantity;
        
        listItem.innerHTML = `
            <div class="item-info">
                <h4>${item.product.name}</h4>
                <div class="item-details">
                    <span class="item-quantity">${item.quantity}x</span>
                    <span class="item-price">@ $${item.product.price.toFixed(2)}</span>
                    <span class="item-total">$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <button class="remove-item" data-product-id="${item.id}" aria-label="Remove ${item.product.name} from cart">
                ×
            </button>
        `;
        
        const removeBtn = listItem.querySelector('.remove-item');
        removeBtn.addEventListener('click', () => removeFromCart(item.id));
        
        cartList.appendChild(listItem);
    });
}

// Mostrar confirmación de orden
function showOrderConfirmation() {
    if (cart.length === 0) return;
    
    renderOrderSummary();
    modalOverlay.classList.add('active');
    orderModal.focus();
    
    // Trap focus en el modal
    trapFocus(orderModal);
}

// Renderizar resumen de orden
function renderOrderSummary() {
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    modalTotalAmount.textContent = `$${total.toFixed(2)}`;
    
    orderSummary.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        const itemTotal = item.product.price * item.quantity;
        
        orderItem.innerHTML = `
            <img src="${item.product.image.thumbnail}" alt="${item.product.name}" class="order-item-image">
            <div class="order-item-info">
                <h4>${item.product.name}</h4>
                <div class="order-item-details">
                    <span class="order-item-quantity">${item.quantity}x</span>
                    <span class="order-item-price">@ $${item.product.price.toFixed(2)}</span>
                </div>
            </div>
            <span class="order-item-total">$${itemTotal.toFixed(2)}</span>
        `;
        
        orderSummary.appendChild(orderItem);
    });
}

// Iniciar nueva orden
function startNewOrder() {
    cart = [];
    updateCartDisplay();
    
    // Actualizar todas las tarjetas de productos
    productsData.forEach((_, index) => {
        updateProductCard(index);
    });
    
    modalOverlay.classList.remove('active');
    saveCartToStorage();
}

// Cerrar modal al hacer clic en overlay
function closeModalOnOverlayClick(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
}

// Navegación por teclado[9][18][19]
function handleKeyboardNavigation(e) {
    // Escape para cerrar modal
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        modalOverlay.classList.remove('active');
        return;
    }
    
    // Enter y Space para activar botones
    if ((e.key === 'Enter' || e.key === ' ') && e.target.tagName === 'BUTTON') {
        e.preventDefault();
        e.target.click();
        return;
    }
}

// Trap focus en modal para accesibilidad
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Persistencia en localStorage
function saveCartToStorage() {
    localStorage.setItem('dessert-cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('dessert-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        
        // Actualizar vista de productos
        cart.forEach(item => {
            updateProductCard(item.id);
        });
    }
}
