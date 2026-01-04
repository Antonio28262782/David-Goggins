// ============================================
// MAIN JAVASCRIPT - DAVID GOGGINS STORE
// ============================================

// Navigation
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll behavior
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links (only for home page sections)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // If it's a product link, handle it with routing
        if (href.startsWith('#product/')) {
            e.preventDefault();
            const productId = parseInt(href.split('/')[1]);
            if (productId) {
                showProductPage(productId);
            }
            return;
        }
        
        // If it's a home section link
        if (href !== '#home' && !href.startsWith('#product/')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            // Check if we're already on the home page
            const isOnHomePage = window.location.hash === '#home' || window.location.hash === '' || !window.location.hash.startsWith('#product/');
            
            if (target) {
                if (isOnHomePage) {
                    // Already on home page, just scroll to section
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    // Not on home page, navigate to home first then scroll
                    window.history.pushState({ page: 'home' }, '', '#home');
                    showPage('home', true); // Skip scroll to top
                    // Wait for page to show, then scroll
                    setTimeout(() => {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
            return;
        }
        
        // Default behavior for #home
        if (href === '#home') {
            e.preventDefault();
            window.history.pushState({ page: 'home' }, '', '#home');
            showPage('home');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Newsletter Popup
const newsletterPopup = document.getElementById('newsletterPopup');
const popupClose = document.getElementById('popupClose');
const newsletterForm = document.getElementById('newsletterForm');

// Show popup after 3 seconds
setTimeout(() => {
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    if (!hasSeenPopup) {
        newsletterPopup.classList.add('active');
    }
}, 3000);

popupClose.addEventListener('click', () => {
    newsletterPopup.classList.remove('active');
    localStorage.setItem('newsletterPopupSeen', 'true');
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    // Here you would typically send to your backend
    console.log('Newsletter signup:', email);
    alert('Thank you for subscribing! Stay Hard!');
    newsletterPopup.classList.remove('active');
    localStorage.setItem('newsletterPopupSeen', 'true');
});

// Products Data with color variants
const products = [
    {
        id: 1,
        name: "Stay Hard T-Shirt",
        description: "Premium t-shirt with the iconic 'Stay Hard' message. 100% organic cotton.",
        price: 39.99,
        image: "assets/images/stay-hard-tshirt.png",
        category: "tshirts",
        colors: [
            { name: "black", hex: "#000000", label: "Black" },
            { name: "red", hex: "#DC143C", label: "Red" }
        ]
    },
    {
        id: 2,
        name: "Uncommon Hoodie",
        description: "Premium 'Uncommon Amongst the Uncommon' hoodie. Comfort and style for your workouts.",
        price: 79.99,
        image: "assets/images/uncommon-hoodie.png",
        category: "hoodies",
        colors: [
            { name: "black", hex: "#000000", label: "Black" }
        ]
    },
    {
        id: 3,
        name: "You Don't Know Me Son",
        description: "Premium t-shirt with the iconic 'You Don't Know Me Son' message. 100% organic cotton.",
        price: 33.32,
        image: "assets/images/you-dont-know-me.png",
        category: "tshirts",
        colors: [
            { name: "black", hex: "#000000", label: "Black" },
            { name: "white", hex: "#FFFFFF", label: "White" }
        ]
    },
    {
        id: 4,
        name: "Uncommon Amongst The Uncommon Tee",
        description: "Premium 'Uncommon Amongst The Uncommon' t-shirt. 100% organic cotton.",
        price: 33.32,
        image: "assets/images/uncommon-stamp.png",
        category: "tshirts",
        colors: [
            { name: "black", hex: "#000000", label: "Black" },
            { name: "red", hex: "#DC143C", label: "Red" },
            { name: "white", hex: "#FFFFFF", label: "White" }
        ]
    },
    {
        id: 5,
        name: "Stay Hard Hoodie",
        description: "Premium heavyweight hooded sweatshirt with soft hand feel. Features the Goggins logo on the front and 'Stay Hard' call out on the back.",
        price: 66.65,
        image: "assets/images/stay-hard-hoodie.png",
        category: "hoodies",
        colors: [
            { name: "black", hex: "#000000", label: "Black" },
            { name: "green", hex: "#228B22", label: "Green" }
        ]
    },
    {
        id: 8,
        name: "Women's OG Crop Hoodie",
        description: "Super soft, casual, and extremely comfortable pullover hoodie with a slightly cropped length. Made of super soft mid-weight fabric with Goggins wordmark logo on the front center.",
        price: 36.18,
        image: "assets/images/womens-og-crop-hoodie.png",
        category: "hoodies",
        colors: [
            { name: "pink", hex: "#FFB6C1", label: "Pink" }
        ]
    },
    {
        id: 6,
        name: "Stay Hard Water Bottle",
        description: "Premium stainless steel water bottle. Stay hydrated during your challenges.",
        price: 24.99,
        image: "https://via.placeholder.com/400x500/1a1a1a/FFFFFF?text=Water+Bottle",
        category: "accessories",
        colors: [
            { name: "black", hex: "#000000", label: "Black" },
            { name: "red", hex: "#DC143C", label: "Red" }
        ]
    }
];

// Load Best Sellers
function loadBestSellers() {
    const bestsellersGrid = document.getElementById('bestsellersGrid');
    const bestSellers = products.slice(0, 4); // First 4 products as best sellers

    bestsellersGrid.innerHTML = bestSellers.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">€${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-product-id="${product.id}">Add</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(card.dataset.productId);
                showProductPage(productId);
            }
        });
    });

    // Add to cart handlers
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
}

// ============================================
// PRODUCT HELPERS
// ============================================

// Generate color selector HTML based on product color variants
function generateColorSelector(product) {
    if (!product.colors || product.colors.length === 0) {
        return ''; // No colors available
    }

    const colorButtons = product.colors.map((color, index) => {
        const isActive = index === 0 ? 'active' : '';
        const borderStyle = color.name === 'white' ? 'border: 1px solid #333;' : '';
        return `<button class="color-btn ${isActive}" data-color="${color.name}" style="background: ${color.hex}; ${borderStyle}"></button>`;
    }).join('');

    return `
        <div class="option-group">
            <label>Color</label>
            <div class="color-selector">
                ${colorButtons}
            </div>
        </div>
    `;
}

// ============================================
// SPA ROUTING SYSTEM
// ============================================

// Get all page sections
const pageSections = {
    home: {
        hero: document.querySelector('.hero'),
        bestsellers: document.querySelector('.bestsellers'),
        collections: document.getElementById('collections'),
        collectionProducts: document.getElementById('collectionProducts'),
        story: document.getElementById('story'),
        reviews: document.querySelector('.reviews'),
        faq: document.getElementById('faq')
    },
    product: document.getElementById('productPage')
};

// Track if this is the first page load
let isFirstLoad = true;

// Show only the specified page, hide all others
function showPage(pageName, skipScroll = false) {
    // Hide all sections
    if (pageSections.home.hero) pageSections.home.hero.style.display = 'none';
    if (pageSections.home.bestsellers) pageSections.home.bestsellers.style.display = 'none';
    if (pageSections.home.collections) pageSections.home.collections.style.display = 'none';
    if (pageSections.home.collectionProducts) pageSections.home.collectionProducts.style.display = 'none';
    if (pageSections.home.story) pageSections.home.story.style.display = 'none';
    if (pageSections.home.reviews) pageSections.home.reviews.style.display = 'none';
    if (pageSections.home.faq) pageSections.home.faq.style.display = 'none';
    if (pageSections.product) pageSections.product.style.display = 'none';

    // Show requested page
    if (pageName === 'home') {
        // Show home sections
        if (pageSections.home.hero) {
            pageSections.home.hero.style.display = 'block';
            // Disable animations if not first load (internal navigation)
            if (!isFirstLoad) {
                pageSections.home.hero.classList.add('no-animation');
            } else {
                pageSections.home.hero.classList.remove('no-animation');
            }
        }
        if (pageSections.home.bestsellers) pageSections.home.bestsellers.style.display = 'block';
        if (pageSections.home.collections) pageSections.home.collections.style.display = 'block';
        if (pageSections.home.story) pageSections.home.story.style.display = 'block';
        if (pageSections.home.reviews) pageSections.home.reviews.style.display = 'block';
        if (pageSections.home.faq) pageSections.home.faq.style.display = 'block';
        // collectionProducts stays hidden unless explicitly shown by loadCollectionProducts
    } else if (pageName === 'product' && pageSections.product) {
        pageSections.product.style.display = 'block';
        // Mark that we've navigated away from home
        isFirstLoad = false;
    }

    // Scroll to top only if skipScroll is false
    if (!skipScroll) {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
}

// Show Product Page (Real product page with SPA routing)
function showProductPage(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const productDetail = document.getElementById('productDetail');

    // Create real product page HTML using existing product.css classes
    const colorSelectorHTML = generateColorSelector(product);
    
    const productPageHTML = `
        <div class="product-gallery">
            <div class="product-main-image ${product.id === 1 ? 'stay-hard-product' : ''} ${product.id === 2 ? 'uncommon-hoodie-product' : ''} ${product.id === 3 ? 'you-dont-know-me-product' : ''} ${product.id === 4 ? 'uncommon-stamp-product' : ''} ${product.id === 5 ? 'stay-hard-hoodie-product' : ''} ${product.id === 8 ? 'womens-og-crop-hoodie-product' : ''}">
                <img src="${product.image}" alt="${product.name}" id="mainImage">
            </div>
        </div>
        <div class="product-details">
            <h1 class="product-name">${product.name}</h1>
            <p class="product-price-large">€${product.price.toFixed(2)}</p>
            
            <div class="product-options">
                <div class="option-group">
                    <label>Size</label>
                    <div class="size-selector">
                        <button class="size-btn active" data-size="S">S</button>
                        <button class="size-btn" data-size="M">M</button>
                        <button class="size-btn" data-size="L">L</button>
                        <button class="size-btn" data-size="XL">XL</button>
                        <button class="size-btn" data-size="XXL">XXL</button>
                    </div>
                </div>
                
                ${colorSelectorHTML}
            </div>
            
            <button class="btn btn-primary btn-large add-to-cart-detail" data-product-id="${product.id}">
                Add to Cart
            </button>
            
            <p class="product-description-large">${product.description}</p>
            
            <div class="product-features">
                <h3>Features</h3>
                <ul>
                    <li>✓ 100% Premium organic cotton</li>
                    <li>✓ Durable high-quality printing</li>
                    <li>✓ Machine wash at 30°C</li>
                    <li>✓ Premium quality product</li>
                </ul>
            </div>
        </div>
    `;

    // Set product page content
    productDetail.innerHTML = productPageHTML;

    // Update URL and show product page
    const newUrl = `#product/${productId}`;
    window.history.pushState({ page: 'product', productId: productId }, '', newUrl);
    showPage('product');

    // Setup product page event listeners
    setupProductPageListeners(productId);
}

// Setup product page event listeners
function setupProductPageListeners(productId) {
    const product = products.find(p => p.id === productId);
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-detail');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const size = document.querySelector('.size-btn.active')?.dataset.size || 'M';
            // Get first available color if none selected
            const defaultColor = product?.colors && product.colors.length > 0 ? product.colors[0].name : 'black';
            const color = document.querySelector('.color-btn.active')?.dataset.color || defaultColor;
            addToCart(productId, { size, color });
        });
    }

    // Size selector
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Color selector (only if colors exist)
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Back to home (SPA navigation)
function backToHome() {
    window.history.pushState({ page: 'home' }, '', '#home');
    showPage('home');
}

// Router: Parse URL and show appropriate page
function router() {
    const hash = window.location.hash || '#home';
    
    if (hash.startsWith('#product/')) {
        const productId = parseInt(hash.split('/')[1]);
        if (productId && products.find(p => p.id === productId)) {
            // Load product without changing URL (already correct)
            const product = products.find(p => p.id === productId);
            if (product) {
                const productDetail = document.getElementById('productDetail');
                const colorSelectorHTML = generateColorSelector(product);
                
                const productPageHTML = `
                    <div class="product-gallery">
                        <div class="product-main-image ${product.id === 1 ? 'stay-hard-product' : ''} ${product.id === 2 ? 'uncommon-hoodie-product' : ''} ${product.id === 3 ? 'you-dont-know-me-product' : ''} ${product.id === 4 ? 'uncommon-stamp-product' : ''} ${product.id === 5 ? 'stay-hard-hoodie-product' : ''} ${product.id === 8 ? 'womens-og-crop-hoodie-product' : ''}">
                            <img src="${product.image}" alt="${product.name}" id="mainImage">
                        </div>
                        <div class="product-3d" id="product3D"></div>
                    </div>
                    <div class="product-details">
                        <h1 class="product-name">${product.name}</h1>
                        <p class="product-price-large">€${product.price.toFixed(2)}</p>
                        
                        <div class="product-options">
                            <div class="option-group">
                                <label>Size</label>
                                <div class="size-selector">
                                    <button class="size-btn active" data-size="S">S</button>
                                    <button class="size-btn" data-size="M">M</button>
                                    <button class="size-btn" data-size="L">L</button>
                                    <button class="size-btn" data-size="XL">XL</button>
                                    <button class="size-btn" data-size="XXL">XXL</button>
                                </div>
                            </div>
                            
                            ${colorSelectorHTML}
                        </div>
                        
                        <button class="btn btn-primary btn-large add-to-cart-detail" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                        
                        <p class="product-description-large">${product.description}</p>
                        
                        <div class="product-features">
                            <h3>Features</h3>
                            <ul>
                                <li>✓ 100% Premium organic cotton</li>
                                <li>✓ Durable high-quality printing</li>
                                <li>✓ Machine wash at 30°C</li>
                                <li>✓ Premium quality product</li>
                            </ul>
                        </div>
                    </div>
                `;
                productDetail.innerHTML = productPageHTML;
                showPage('product');
                setupProductPageListeners(productId);
                return;
            }
        }
    }
    
    // Default to home
    showPage('home');
}

// Add to Cart (will be handled by cart.js)
function addToCart(productId, options = {}) {
    if (typeof window.addToCart === 'function') {
        window.addToCart(productId, options);
    } else {
        // Fallback if cart.js not loaded
        console.log('Adding to cart:', productId, options);
    }
}

// Load Collection Products
function loadCollectionProducts(category) {
    const collectionProducts = products.filter(p => p.category === category);
    const collectionProductsGrid = document.getElementById('collectionProductsGrid');
    const collectionProductsSection = document.getElementById('collectionProducts');
    const collectionTitle = document.getElementById('collectionTitle');
    const bestsellersSection = document.querySelector('.bestsellers');

    if (collectionProducts.length === 0) {
        collectionProductsGrid.innerHTML = '<p>No products found in this collection.</p>';
        return;
    }

    // Update title based on category
    const categoryNames = {
        'tshirts': 'T-Shirts',
        'hoodies': 'Hoodies',
        'accessories': 'Accessories'
    };
    collectionTitle.textContent = categoryNames[category] || 'Collection';

    // Render products
    collectionProductsGrid.innerHTML = collectionProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">€${product.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-product-id="${product.id}">Add</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('#collectionProductsGrid .product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(card.dataset.productId);
                showProductPage(productId);
            }
        });
    });

    // Add to cart handlers
    document.querySelectorAll('#collectionProductsGrid .add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });

    // Show collection section, hide best sellers (but keep on home page)
    collectionProductsSection.style.display = 'block';
    if (bestsellersSection) {
        bestsellersSection.style.display = 'none';
    }

    // Make sure we're on home page
    if (window.location.hash && !window.location.hash.startsWith('#home') && !window.location.hash.startsWith('#product/')) {
        window.history.pushState({ page: 'home' }, '', '#home');
    }

    // Scroll to collection section
    collectionProductsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Back to collections
function backToCollections() {
    const collectionProductsSection = document.getElementById('collectionProducts');
    const bestsellersSection = document.querySelector('.bestsellers');

    collectionProductsSection.style.display = 'none';
    if (bestsellersSection) {
        bestsellersSection.style.display = 'block';
    }

    // Make sure we're on home page
    if (window.location.hash && !window.location.hash.startsWith('#home')) {
        window.history.pushState({ page: 'home' }, '', '#home');
        showPage('home');
    }

    // Scroll to collections section
    document.getElementById('collections').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    loadBestSellers();

    // Collection card click handlers
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            loadCollectionProducts(category);
        });
    });

    // Back to collections button
    const backToCollectionsBtn = document.getElementById('backToCollections');
    if (backToCollectionsBtn) {
        backToCollectionsBtn.addEventListener('click', backToCollections);
    }

    // Back to home button
    const backToProductsBtn = document.getElementById('backToProducts');
    if (backToProductsBtn) {
        backToProductsBtn.addEventListener('click', backToHome);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        router();
    });

    // Handle hash changes
    window.addEventListener('hashchange', () => {
        router();
    });

    // Mark first load as complete after initial render
    setTimeout(() => {
        isFirstLoad = false;
    }, 2000); // After animations complete (1.2s + buffer)

    // Initial route on page load
    router();

    // Subtle scroll animations for sections (opacity + translateY max 40px)
    initScrollAnimations();

    // Initialize story video autoplay on scroll
    initStoryVideo();
});

// Scroll animations for sections - subtle and non-intrusive
function initScrollAnimations() {
    const sections = document.querySelectorAll('section:not(.hero)');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Story Video - Autoplay on scroll and unmute on click
function initStoryVideo() {
    const storyVideo = document.getElementById('storyVideo');
    const storySection = document.getElementById('story');
    
    if (!storyVideo || !storySection) return;

    // Intersection Observer to detect when section is visible
    const observerOptions = {
        threshold: 0.3, // Start playing when 30% of section is visible
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible, play video
                storyVideo.play().catch(err => {
                    console.log('Video autoplay prevented:', err);
                });
            } else {
                // Section is not visible, pause video
                storyVideo.pause();
            }
        });
    }, observerOptions);

    observer.observe(storySection);

    // Click to unmute/mute
    storyVideo.addEventListener('click', () => {
        if (storyVideo.muted) {
            storyVideo.muted = false;
        } else {
            storyVideo.muted = true;
        }
    });

    // Ensure video is muted on load
    storyVideo.muted = true;
}

// Export for use in other scripts
window.products = products;
window.showProductPage = showProductPage;

