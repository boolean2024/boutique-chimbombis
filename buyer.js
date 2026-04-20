// LÓGICA DE COMPRADOR

let buyerProducts = [];
let cart = [];
let currentFilter = 'all';

// Cargar al iniciar
async function initBuyer() {
    try {
        buyerProducts = await loadProducts();
        loadCart();
        renderBuyerProducts();
        setupFilters();
        setupSearch();
        updateCartUI();
        renderCart();
    } catch (error) {
        console.error('Error iniciando buyer:', error);
        showNotification('Error al cargar productos', 'error');
    }
}

// Renderizar productos para comprador
function renderBuyerProducts() {
    const grid = document.getElementById('buyerProductsGrid');
    let filtered = buyerProducts;
    
    if (currentFilter !== 'all') {
        filtered = buyerProducts.filter(p => p.category === currentFilter);
    }
    
    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                ${product.stock === 0 ? '<div class="stock-badge out">Agotado</div>' : '<div class="stock-badge in">${product.stock} Stock</div>'}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="description">${product.description.substring(0, 60)}...</p>
                <div class="product-footer">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizar carrito
function renderCart() {
    const cartContainer = document.getElementById('cartContainer');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        return;
    }
    
    cartContainer.innerHTML = '<div class="cart-items">' + cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateCartQty(${item.id}, ${item.quantity - 1})"><i class="fas fa-minus"></i></button>
                <span class="qty">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id}, ${item.quantity + 1})"><i class="fas fa-plus"></i></button>
            </div>
            <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
    `).join('') + '</div>';
}

// Actualizar cantidad en carrito
function updateCartQty(productId, newQty) {
    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const product = buyerProducts.find(p => p.id === productId);
    if (product && newQty > product.stock) {
        showNotification(`Stock máximo: ${product.stock}`, 'warning');
        return;
    }
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = newQty;
        saveCart();
        updateCartUI();
        renderCart();
        showNotification('Carrito actualizado', 'success');
    }
}

// Eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCart();
    showNotification('Producto removido del carrito', 'success');
}

// Configurar filtros
function setupFilters() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            e.target.closest('.filter-tab').classList.add('active');
            currentFilter = e.target.closest('.filter-tab').dataset.filter;
            renderBuyerProducts();
        });
    });
}

// Configurar búsqueda
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const grid = document.getElementById('buyerProductsGrid');
            
            let filtered = buyerProducts.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
            
            if (currentFilter !== 'all') {
                filtered = filtered.filter(p => p.category === currentFilter);
            }
            
            grid.innerHTML = filtered.length ? filtered.map(product => `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-img">
                        ${product.stock === 0 ? '<div class="stock-badge out">Agotado</div>' : '<div class="stock-badge in">${product.stock} Stock</div>'}
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="category">${product.category}</p>
                        <p class="description">${product.description.substring(0, 60)}...</p>
                        <div class="product-footer">
                            <span class="price">$${product.price.toFixed(2)}</span>
                            <button class="btn-add-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                                <i class="fas fa-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            `).join('') : '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No encontramos productos</div>';
        });
    }
}

// Agregar al carrito
function addToCart(productId) {
    const product = buyerProducts.find(p => p.id === productId);
    const cartItem = cart.find(c => c.id === productId);
    
    if (product && product.stock > 0) {
        if (cartItem) {
            if (cartItem.quantity < product.stock) {
                cartItem.quantity++;
            } else {
                showNotification('⚠️ No hay más stock disponible', 'warning');
                return;
            }
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        saveCart();
        updateCartUI();
        showNotification(`✅ ${product.name} agregado al carrito`, 'success');
    }
}

// Actualizar UI del carrito
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('cartCount').textContent = totalItems;
    document.getElementById('cartTotal').textContent = totalPrice.toFixed(2);
}

// Guardar carrito
function saveCart() {
    localStorage.setItem('boutique_cart', JSON.stringify(cart));
}

// Cargar carrito
function loadCart() {
    const saved = localStorage.getItem('boutique_cart');
    cart = saved ? JSON.parse(saved) : [];
}

// Abrir modal de producto
function openProductModal(productId) {
    const product = buyerProducts.find(p => p.id === productId);
    if (product) {
        const modal = document.getElementById('productModal');
        const body = document.getElementById('modalBody');
        
        body.innerHTML = `
            <div class="product-detail-content">
                <img src="${product.image}" alt="${product.name}" class="detail-image">
                <div class="detail-info">
                    <h1>${product.name}</h1>
                    <p class="detail-category">${product.category.toUpperCase()}</p>
                    <p class="detail-description">${product.description}</p>
                    
                    <div class="detail-price">
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <span class="stock">Stock: ${product.stock}</span>
                    </div>
                    
                    <button class="btn-primary btn-lg" onclick="addToCart(${product.id}); closeProductModal();" ${product.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}
