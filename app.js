/* ============================================
   APP JAVASCRIPT - BOUTIQUE CHIMBOMBIS
   ============================================ */

// Configuración de Supabase
const SUPABASE_URL = import.meta?.env?.VITE_SUPABASE_URL || 
                     (typeof window !== 'undefined' && window.SUPABASE_URL) ||
                     'https://tu-proyecto.supabase.co';

const SUPABASE_KEY = import.meta?.env?.VITE_SUPABASE_KEY ||
                     (typeof window !== 'undefined' && window.SUPABASE_KEY) ||
                     'tu_anon_key';

// Inicializar cliente de Supabase
let supabase = null;
let isConnected = false;

// Intentar conectar a Supabase
async function initSupabase() {
    try {
        if (SUPABASE_URL.includes('tu-proyecto') || SUPABASE_KEY === 'tu_anon_key') {
            console.log('⚠️ Usando modo localStorage (sin Supabase)');
            useLocalStorage();
            updateStatus('localStorage', false);
            return;
        }

        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        
        // Prueba conexión
        const { data, error } = await supabase.from('productos').select('count()', { count: 'exact' }).limit(0);
        
        if (error) throw error;
        
        isConnected = true;
        console.log('✅ Conectado a Supabase');
        updateStatus('Supabase', true);
        loadProductos();
    } catch (error) {
        console.error('Supabase connection error:', error);
        console.log('⚠️ Usando modo localStorage');
        useLocalStorage();
        updateStatus('localStorage', false);
    }
}

// Estado global
let productos = [];
let filtroActual = 'all';
let productoEditando = null;
let useLocalStorageMode = false;

const STORAGE_KEY = 'boutique_chimbombis_productos';

// ============================================
// MODO ALMACENAMIENTO
// ============================================

function useLocalStorage() {
    useLocalStorageMode = true;
    const datos = localStorage.getItem(STORAGE_KEY);
    if (datos) {
        productos = JSON.parse(datos);
    } else {
        productos = getProductosDefecto();
        guardarProductos();
    }
    renderizarProductos();
}

function guardarProductos() {
    if (useLocalStorageMode) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    }
    actualizarEstadisticas();
}

function getProductosDefecto() {
    return [
        {
            id: 1,
            nombre: 'Perfume Elegancia',
            descripcion: 'Aroma sofisticado para ocasiones especiales',
            precio: 120.00,
            categoria: 'perfume',
            imagen_url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop',
            stock: 15
        },
        {
            id: 2,
            nombre: 'Perfume Fresco',
            descripcion: 'Fragancia ligera y refrescante',
            precio: 85.00,
            categoria: 'perfume',
            imagen_url: 'https://images.unsplash.com/photo-1508737763115-b8f8f5a83001?w=400&h=400&fit=crop',
            stock: 20
        },
        {
            id: 3,
            nombre: 'Perfume Oriental',
            descripcion: 'Esencias orientales cálida y misteriosa',
            precio: 110.00,
            categoria: 'perfume',
            imagen_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
            stock: 10
        },
        {
            id: 4,
            nombre: 'Perfume Floral',
            descripcion: 'Notas florales delicadas y femeninas',
            precio: 95.00,
            categoria: 'perfume',
            imagen_url: 'https://images.unsplash.com/photo-1518005067752-dae8d6ef7f0e?w=400&h=400&fit=crop',
            stock: 18
        },
        {
            id: 5,
            nombre: 'Blusa Casual',
            descripcion: 'Blusa cómoda para el día a día',
            precio: 35.00,
            categoria: 'ropa',
            imagen_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
            stock: 25
        },
        {
            id: 6,
            nombre: 'Vestido Formal',
            descripcion: 'Vestido elegante para eventos',
            precio: 95.00,
            categoria: 'ropa',
            imagen_url: 'https://images.unsplash.com/photo-1595777707802-51ca6f37b237?w=400&h=400&fit=crop',
            stock: 12
        },
        {
            id: 7,
            nombre: 'Jeans Premium',
            descripcion: 'Pantalones vaqueros de alta calidad',
            precio: 65.00,
            categoria: 'ropa',
            imagen_url: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&h=400&fit=crop',
            stock: 30
        },
        {
            id: 8,
            nombre: 'Jacket Cuero',
            descripcion: 'Chaqueta de cuero genuino',
            precio: 180.00,
            categoria: 'ropa',
            imagen_url: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&h=400&fit=crop',
            stock: 8
        },
        {
            id: 9,
            nombre: 'Zapatos Deportivos',
            descripcion: 'Tenis cómodos para correr',
            precio: 85.00,
            categoria: 'calzado',
            imagen_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            stock: 12
        },
        {
            id: 10,
            nombre: 'Zapatos Formales',
            descripcion: 'Zapatos elegantes para oficina',
            precio: 120.00,
            categoria: 'calzado',
            imagen_url: 'https://images.unsplash.com/photo-1549446881-cb1aea458c5e?w=400&h=400&fit=crop',
            stock: 8
        },
        {
            id: 11,
            nombre: 'Botas Negras',
            descripcion: 'Botas de cuero para invierno',
            precio: 140.00,
            categoria: 'calzado',
            imagen_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
            stock: 10
        },
        {
            id: 12,
            nombre: 'Sandalias Playa',
            descripcion: 'Cómodas sandalias para playa',
            precio: 35.00,
            categoria: 'calzado',
            imagen_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
            stock: 25
        }
    ];
}

// ============================================
// CRUD OPERACIONES
// ============================================

async function loadProductos() {
    if (useLocalStorageMode) {
        renderizarProductos();
        return;
    }

    try {
        const { data, error } = await supabase.from('productos').select('*');
        if (error) throw error;
        productos = data || getProductosDefecto();
        renderizarProductos();
    } catch (error) {
        console.error('Error cargando productos:', error);
        useLocalStorage();
    }
}

async function agregarProducto(formData) {
    const producto = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria,
        imagen_url: formData.imagen_url,
        stock: parseInt(formData.stock)
    };

    try {
        if (useLocalStorageMode) {
            producto.id = Math.max(...productos.map(p => p.id || 0)) + 1;
            productos.push(producto);
            guardarProductos();
            mostrarNotificacion('Producto agregado correctamente', 'success');
        } else {
            const { data, error } = await supabase
                .from('productos')
                .insert([producto])
                .select();
            
            if (error) throw error;
            productos.push(data[0]);
            mostrarNotificacion('Producto agregado correctamente', 'success');
        }

        cerrarModal();
        renderizarProductos();
    } catch (error) {
        console.error('Error agregando producto:', error);
        mostrarNotificacion('Error al agregar producto', 'error');
    }
}

async function editarProducto(id, formData) {
    const producto = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        categoria: formData.categoria,
        imagen_url: formData.imagen_url,
        stock: parseInt(formData.stock)
    };

    try {
        if (useLocalStorageMode) {
            const index = productos.findIndex(p => p.id === id);
            if (index !== -1) {
                productos[index] = { ...productos[index], ...producto };
                guardarProductos();
            }
            mostrarNotificacion('Producto actualizado correctamente', 'success');
        } else {
            const { error } = await supabase
                .from('productos')
                .update(producto)
                .eq('id', id);
            
            if (error) throw error;
            
            const index = productos.findIndex(p => p.id === id);
            if (index !== -1) {
                productos[index] = { ...productos[index], ...producto };
            }
            mostrarNotificacion('Producto actualizado correctamente', 'success');
        }

        cerrarModal();
        renderizarProductos();
    } catch (error) {
        console.error('Error editando producto:', error);
        mostrarNotificacion('Error al actualizar producto', 'error');
    }
}

async function eliminarProducto(id) {
    try {
        if (useLocalStorageMode) {
            productos = productos.filter(p => p.id !== id);
            guardarProductos();
            mostrarNotificacion('Producto eliminado correctamente', 'success');
        } else {
            const { error } = await supabase
                .from('productos')
                .delete()
                .eq('id', id);
            
            if (error) throw error;
            productos = productos.filter(p => p.id !== id);
            mostrarNotificacion('Producto eliminado correctamente', 'success');
        }

        renderizarProductos();
    } catch (error) {
        console.error('Error eliminando producto:', error);
        mostrarNotificacion('Error al eliminar producto', 'error');
    }
}

// ============================================
// UI RENDERING
// ============================================

function renderizarProductos() {
    const grid = document.getElementById('productsGrid');
    const empty = document.getElementById('emptyState');
    
    let productosFiltrados = productos;
    if (filtroActual !== 'all') {
        productosFiltrados = productos.filter(p => p.categoria === filtroActual);
    }

    if (productosFiltrados.length === 0) {
        empty.style.display = 'block';
        grid.innerHTML = '';
        return;
    }

    empty.style.display = 'none';
    grid.innerHTML = productosFiltrados.map(p => `
        <div class="product-card">
            <div style="position: relative;">
                <img src="${escaparHtml(p.imagen_url)}" alt="${escaparHtml(p.nombre)}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400?text=Sin+Imagen'">
                <span class="product-category">${escaparHtml(p.categoria)}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${escaparHtml(p.nombre)}</h3>
                <p class="product-description">${escaparHtml(p.descripcion)}</p>
                <div class="product-details">
                    <span class="product-price">$${p.precio.toFixed(2)}</span>
                    <span class="product-stock ${p.stock === 0 ? 'out' : p.stock < 5 ? 'low' : ''}">
                        Stock: ${p.stock}
                    </span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="abrirEditarModal(${p.id})" style="flex: 1;">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger" onclick="confirmarEliminar(${p.id})" style="flex: 1;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    actualizarEstadisticas();
}

function actualizarEstadisticas() {
    const total = productos.length;
    const valor = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
    
    document.getElementById('totalProducts').textContent = total;
    document.getElementById('totalValue').textContent = valor.toFixed(2);
}

function updateStatus(mode, connected) {
    const badge = document.getElementById('statusBadge');
    if (connected) {
        badge.textContent = '🟢 ' + mode;
        badge.classList.add('connected');
    } else {
        badge.textContent = '🟡 ' + mode;
        badge.classList.remove('connected');
    }
}

// ============================================
// MODAL MANAGEMENT
// ============================================

function abrirAgregarModal() {
    productoEditando = null;
    document.getElementById('modalTitle').textContent = 'Agregar Producto';
    document.getElementById('form').reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('modal').style.display = 'flex';
}

function abrirEditarModal(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    productoEditando = id;
    document.getElementById('modalTitle').textContent = 'Editar Producto';
    
    document.getElementById('inputNombre').value = producto.nombre;
    document.getElementById('inputDescripcion').value = producto.descripcion;
    document.getElementById('inputCategoria').value = producto.categoria;
    document.getElementById('inputPrecio').value = producto.precio;
    document.getElementById('inputStock').value = producto.stock;
    document.getElementById('inputImagen').value = producto.imagen_url;
    
    mostrarPreview(producto.imagen_url);
    
    document.getElementById('modal').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('form').reset();
    document.getElementById('imagePreview').style.display = 'none';
    productoEditando = null;
}

function mostrarPreview(url) {
    if (!url) return;
    const preview = document.getElementById('imagePreview');
    const img = document.getElementById('imgPreview');
    img.src = url;
    preview.style.display = 'block';
}

function confirmarEliminar(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        eliminarProducto(id);
    }
}

// ============================================
// UTILIDADES
// ============================================

function escaparHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.className = `toast show ${tipo}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Botones
    document.getElementById('btnAgregar').addEventListener('click', abrirAgregarModal);
    document.getElementById('btnCloseModal').addEventListener('click', cerrarModal);
    document.getElementById('btnCancel').addEventListener('click', cerrarModal);

    // Formulario
    document.getElementById('form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            nombre: document.getElementById('inputNombre').value,
            descripcion: document.getElementById('inputDescripcion').value,
            categoria: document.getElementById('inputCategoria').value,
            precio: document.getElementById('inputPrecio').value,
            stock: document.getElementById('inputStock').value,
            imagen_url: document.getElementById('inputImagen').value
        };

        if (productoEditando) {
            await editarProducto(productoEditando, formData);
        } else {
            await agregarProducto(formData);
        }
    });

    // Preview de imagen
    document.getElementById('inputImagen').addEventListener('change', (e) => {
        if (e.target.value) {
            mostrarPreview(e.target.value);
        }
    });

    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('button').classList.add('active');
            filtroActual = e.target.closest('button').dataset.filter;
            renderizarProductos();
        });
    });

    // Cerrar modal al hacer click fuera
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            cerrarModal();
        }
    });

    // Inicializar
    initSupabase();
});
