// LÓGICA DE ADMINISTRADOR

let products = [];
let editingProductId = null;

// Cargar productos al iniciar
function initAdmin() {
    products = loadProducts();
    renderAdminTable();
    updateAdminStats();
}

// Renderizar tabla de productos
function renderAdminTable() {
    const table = document.getElementById('adminProductsTable');
    
    table.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(p => `
                    <tr class="product-row">
                        <td class="img-cell"><img src="${p.image}" alt="${p.name}"></td>
                        <td><strong>${p.name}</strong><br><small>${p.description.substring(0, 50)}...</small></td>
                        <td><span class="badge badge-${p.category}">${p.category}</span></td>
                        <td>$${p.price.toFixed(2)}</td>
                        <td><span class="stock ${p.stock < 10 ? 'low' : ''}">${p.stock}</span></td>
                        <td class="actions">
                            <button class="btn-icon edit" onclick="openEditProductModal(${p.id})" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon delete" onclick="deleteProduct(${p.id})" title="Eliminar">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Actualizar estadísticas
function updateAdminStats() {
    document.getElementById('totalProductsCount').textContent = products.length;
    document.getElementById('totalValue').textContent = products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2);
    document.getElementById('totalStock').textContent = products.reduce((sum, p) => sum + p.stock, 0);
}

// Abrir modal para agregar
function openAddProductModal() {
    editingProductId = null;
    document.getElementById('modalTitle').textContent = 'Agregar Nuevo Producto';
    document.getElementById('productForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('adminModal').classList.add('active');
}

// Abrir modal para editar
function openEditProductModal(id) {
    editingProductId = id;
    const product = products.find(p => p.id === id);
    
    if (product) {
        document.getElementById('modalTitle').textContent = 'Editar Producto';
        document.getElementById('inputName').value = product.name;
        document.getElementById('inputDescription').value = product.description;
        document.getElementById('inputCategory').value = product.category;
        document.getElementById('inputPrice').value = product.price;
        document.getElementById('inputStock').value = product.stock;
        
        // Mostrar imagen actual
        showImagePreview(product.image);
        document.getElementById('adminModal').classList.add('active');
    }
}

// Cerrar modal
function closeAddProductModal() {
    document.getElementById('adminModal').classList.remove('active');
    editingProductId = null;
}

// Preview de imagen
document.getElementById('inputImage')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            showImagePreview(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function showImagePreview(imageData) {
    const preview = document.getElementById('imagePreview');
    const img = document.getElementById('previewImg');
    img.src = imageData;
    preview.style.display = 'flex';
}

// Guardar producto
function handleProductSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('inputName').value,
        description: document.getElementById('inputDescription').value,
        category: document.getElementById('inputCategory').value,
        price: parseFloat(document.getElementById('inputPrice').value),
        stock: parseInt(document.getElementById('inputStock').value),
        image: document.getElementById('previewImg').src
    };
    
    if (editingProductId) {
        // Editar
        const index = products.findIndex(p => p.id === editingProductId);
        if (index >= 0) {
            products[index] = { ...products[index], ...formData };
            showNotification('✅ Producto actualizado', 'success');
        }
    } else {
        // Agregar
        const newProduct = {
            id: Math.max(...products.map(p => p.id), 0) + 1,
            ...formData
        };
        products.push(newProduct);
        showNotification('✅ Producto agregado', 'success');
    }
    
    saveProducts(products);
    renderAdminTable();
    updateAdminStats();
    closeAddProductModal();
}

// Eliminar producto
function deleteProduct(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderAdminTable();
        updateAdminStats();
        showNotification('✅ Producto eliminado', 'success');
    }
}
