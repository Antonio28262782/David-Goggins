// ============================================
// CART FUNCTIONALITY
// ============================================

let cart = JSON.parse(localStorage.getItem('gogginsCart')) || [];

const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Open/Close Cart
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        updateCartDisplay();
    });
}

if (cartClose) {
    cartClose.addEventListener('click', closeCart);
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Add to Cart
function addToCart(productId, options = {}) {
    const product = window.products?.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    const cartItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: options.size || 'M',
        color: options.color || 'black',
        quantity: 1
    };
    
    cart.push(cartItem);
    saveCart();
    updateCartCount();
    updateCartDisplay();
    
    // Show animation
    showAddToCartAnimation();
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
}

// Update Quantity
function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('gogginsCart', JSON.stringify(cart));
}

// Update Cart Count
function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Update Cart Display
function updateCartDisplay() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-details">Size: ${item.size} | Color: ${item.color}</p>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <p class="cart-item-price">€${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
    }
    
    // Update total
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `€${total.toFixed(2)}`;
    }
}

// Show Add to Cart Animation
function showAddToCartAnimation() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = '✓ Added to cart';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #DC143C;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        font-weight: 700;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Checkout
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        // In a real app, this would redirect to checkout page
        alert('Redirecting to checkout page...\n\nIn a real application, this would redirect to your payment system (Stripe, PayPal, etc.)');
        
        // For demo, we can show checkout summary
        console.log('Checkout:', cart);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateCartDisplay();
});

// Export for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;

