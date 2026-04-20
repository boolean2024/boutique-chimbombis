// LÓGICA DE ADMINISTRADOR

let products = [];
let editingProductId = null;

// Cargar productos al iniciar
async function initAdmin() {
    try {
        products = await loadProducts();
        renderAdminTable();
        updateAdminStats();
    } catch (error) {
        console.error('Error iniciando admin:', error);
        showNotification('Error al cargar productos', 'error');
    }
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
async function handleProductSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('inputName').value,
        description: document.getElementById('inputDescription').value,
        category: document.getElementById('inputCategory').value,
        price: parseFloat(document.getElementById('inputPrice').value),
        stock: parseInt(document.getElementById('inputStock').value),
        image: document.getElementById('previewImg').src
    };
    
    try {
        if (editingProductId) {
            // Actualizar en API
            const updated = await updateProduct(editingProductId, formData);
            if (updated) {
                showNotification('✅ Producto actualizado exitosamente', 'success');
                const index = products.findIndex(p => p.id === editingProductId);
                if (index >= 0) {
                    products[index] = updated;
                }
            } else {
                showNotification('❌ Error al actualizar producto', 'error');
            }
        } else {
            // Crear nuevo en API
            const newProduct = await createProduct(formData);
            if (newProduct) {
                showNotification('✅ Producto agregado exitosamente', 'success');
                products.push(newProduct);
            } else {
                showNotification('❌ Error al agregar producto', 'error');
            }
        }
        
        renderAdminTable();
        updateAdminStats();
        closeAddProductModal();
    } catch (error) {
        console.error('Error guardando producto:', error);
        showNotification('Error al guardar producto', 'error');
    }
}

// Eliminar producto
async function deleteProduct(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        try {
            const deleted = await apiDeleteProduct(id);
            if (deleted) {
                products = products.filter(p => p.id !== id);
                renderAdminTable();
                updateAdminStats();
                showNotification('✅ Producto eliminado exitosamente', 'success');
            } else {
                showNotification('❌ Error al eliminar producto', 'error');
            }
        } catch (error) {
            console.error('Error eliminando producto:', error);
            showNotification('Error al eliminar producto', 'error');
        }
    }
}
