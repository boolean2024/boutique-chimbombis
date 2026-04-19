/* ============================================
   APP JAVASCRIPT - BOUTIQUE CHIMBOMBIS
   CRUD con Supabase + localStorage fallback
   ============================================ */

// ⚙️ CONFIGURACIÓN
const SUPABASE_URL = 'https://stsiaokrumpicjhfnjwn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0c2lhb2tydW1waWNqaGZuanduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MzM2NjcsImV4cCI6MjA5MjIwOTY2N30.JPZGRuel_SZ9zCint7cP2LgfGCPQgWKBKPg6qcNRGQs';

// 🌍 GLOBAL STATE
let supabase = null;
let isConnected = false;
let productos = [];
let filtroActual = 'all';
let productoEditando = null;
let useLocalStorageMode = false;
const STORAGE_KEY = 'boutique_chimbombis_productos';

// ============================================
// 🚀 INICIALIZACIÓN SUPABASE
// ============================================

async function initSupabase() {
    try {
        // Esperar a que Supabase esté disponible
        let intentos = 0;
        while (!window.supabase && intentos < 20) {
            console.log('⏳ Esperando librería Supabase...');
            await new Promise(r => setTimeout(r, 500));
            intentos++;
        }

        if (!window.supabase) {
            throw new Error('Librería Supabase no cargó');
        }

        console.log('✅ Librería Supabase disponible');
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

        // Prueba de conexión
        console.log('🔗 Probando conexión a Supabase...');
        const { data, error } = await supabase.from('productos').select('count()', { count: 'exact' }).limit(0);

        if (error) throw error;

        isConnected = true;
        console.log('✅ Conectado a Supabase');
        updateStatus('Supabase', true);
        await loadProductos();

    } catch (error) {
        console.error('❌ Error Supabase:', error?.message || error);
        console.log('⚠️ Activando modo localStorage');
        useLocalStorage();
        updateStatus('localStorage', false);
    }
}

// ============================================
// 💾 MODO ALMACENAMIENTO LOCAL
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
        { id: 1, nombre: 'Perfume Elegancia', descripcion: 'Aroma sofisticado', precio: 120, categoria: 'perfume', imagen_url: 'https://via.placeholder.com/300?text=Perfume', stock: 15 },
        { id: 2, nombre: 'Perfume Fresco', descripcion: 'Fragancia ligera', precio: 85, categoria: 'perfume', imagen_url: 'https://via.placeholder.com/300?text=Perfume', stock: 20 },
        { id: 3, nombre: 'Blusa Casual', descripcion: 'Cómoda para el día', precio: 35, categoria: 'ropa', imagen_url: 'https://via.placeholder.com/300?text=Blusa', stock: 25 },
        { id: 4, nombre: 'Pantalón Casual', descripcion: 'Versátil y moderno', precio: 55, categoria: 'ropa', imagen_url: 'https://via.placeholder.com/300?text=Pantalon', stock: 18 },
        { id: 5, nombre: 'Zapatillas Running', descripcion: 'Con amortiguación', precio: 159.99, categoria: 'calzado', imagen_url: 'https://via.placeholder.com/300?text=Zapatillas', stock: 12 },
        { id: 6, nombre: 'Zapatos Formales', descripcion: 'Elegantes y cómodos', precio: 120, categoria: 'calzado', imagen_url: 'https://via.placeholder.com/300?text=Zapatos', stock: 8 }
    ];
}

// ============================================
// 📊 CRUD OPERACIONES
// ============================================

async function loadProductos() {
    try {
        if (useLocalStorageMode) {
            renderizarProductos();
            return;
        }

        console.log('📥 Cargando productos desde Supabase...');
        const { data, error } = await supabase.from('productos').select('*');

        if (error) throw error;

        productos = data || getProductosDefecto();
        console.log(`✅ ${productos.length} productos cargados`);
        renderizarProductos();

    } catch (error) {
        console.error('Error cargando:', error?.message);
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
            producto.id = Math.max(...productos.map(p => p.id || 0), 0) + 1;
            productos.push(producto);
            guardarProductos();
        } else {
            const { data, error } = await supabase.from('productos').insert([producto]).select();
            if (error) throw error;
            productos.push(data[0]);
        }

        mostrarNotificacion('✅ Producto agregado', 'success');
        cerrarModal();
        renderizarProductos();

    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('❌ Error al agregar', 'error');
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
            const idx = productos.findIndex(p => p.id === id);
            if (idx >= 0) productos[idx] = { ...productos[idx], ...producto };
            guardarProductos();
        } else {
            const { error } = await supabase.from('productos').update(producto).eq('id', id);
            if (error) throw error;
            const idx = productos.findIndex(p => p.id === id);
            if (idx >= 0) productos[idx] = { ...productos[idx], ...producto };
        }

        mostrarNotificacion('✅ Producto actualizado', 'success');
        cerrarModal();
        renderizarProductos();

    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('❌ Error al editar', 'error');
    }
}

async function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;

    try {
        if (useLocalStorageMode) {
            productos = productos.filter(p => p.id !== id);
            guardarProductos();
        } else {
            const { error } = await supabase.from('productos').delete().eq('id', id);
            if (error) throw error;
            productos = productos.filter(p => p.id !== id);
        }

        mostrarNotificacion('✅ Producto eliminado', 'success');
        renderizarProductos();

    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('❌ Error al eliminar', 'error');
    }
}

// ============================================
// 🎨 RENDERIZADO UI
// ============================================

function renderizarProductos() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let filtrados = productos;
    if (filtroActual !== 'all') {
        filtrados = productos.filter(p => p.categoria === filtroActual);
    }

    grid.innerHTML = filtrados.length ? filtrados.map(producto => `
        <div class="product-card" data-id="${producto.id}">
            <div class="product-image">
                <img src="${escaparHtml(producto.imagen_url)}" alt="${escaparHtml(producto.nombre)}" onerror="this.src='https://via.placeholder.com/300?text=Sin+Imagen'">
            </div>
            <div class="product-info">
                <h3>${escaparHtml(producto.nombre)}</h3>
                <p class="description">${escaparHtml(producto.descripcion)}</p>
                <div class="product-details">
                    <span class="category">${escaparHtml(producto.categoria)}</span>
                    <span class="stock">Stock: ${producto.stock}</span>
                </div>
                <div class="product-footer">
                    <span class="price">$${parseFloat(producto.precio).toFixed(2)}</span>
                    <div class="product-actions">
                        <button class="btn-icon" onclick="abrirEditarModal(${producto.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon danger" onclick="eliminarProducto(${producto.id})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('') : '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No hay productos en esta categoría</div>';

    actualizarEstadisticas();
}

function actualizarEstadisticas() {
    const totalProducts = document.getElementById('totalProducts');
    const totalValue = document.getElementById('totalValue');

    if (totalProducts) totalProducts.textContent = productos.length;
    if (totalValue) totalValue.textContent = productos.reduce((sum, p) => sum + (p.precio * p.stock), 0).toFixed(2);
}

function updateStatus(mode, connected) {
    const badge = document.getElementById('statusBadge');
    if (!badge) return;

    badge.textContent = (connected ? '🟢 ' : '🟡 ') + mode;
    badge.className = connected ? 'badge connected' : 'badge';
}

// ============================================
// 🪟 MODAL MANAGEMENT
// ============================================

function abrirAgregarModal() {
    productoEditando = null;
    document.getElementById('form').reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('modalTitle').textContent = '➕ Agregar Producto';
    document.getElementById('modal').classList.add('active');
}

function abrirEditarModal(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    productoEditando = id;
    document.getElementById('inputNombre').value = producto.nombre;
    document.getElementById('inputDescripcion').value = producto.descripcion;
    document.getElementById('inputCategoria').value = producto.categoria;
    document.getElementById('inputPrecio').value = producto.precio;
    document.getElementById('inputStock').value = producto.stock;
    document.getElementById('inputImagen').value = producto.imagen_url;

    mostrarPreview(producto.imagen_url);
    document.getElementById('modalTitle').textContent = '✏️ Editar Producto';
    document.getElementById('modal').classList.add('active');
}

function cerrarModal() {
    document.getElementById('modal').classList.remove('active');
    document.getElementById('form').reset();
    productoEditando = null;
}

function mostrarPreview(url) {
    const preview = document.getElementById('imagePreview');
    const img = document.getElementById('imgPreview');
    if (url && url.trim()) {
        img.src = url;
        preview.style.display = 'block';
    } else {
        preview.style.display = 'none';
    }
}

// ============================================
// 🛠️ UTILIDADES
// ============================================

function escaparHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = mensaje;
    toast.className = `toast show ${tipo}`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// 📱 EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Botones principales
    const btnAgregar = document.getElementById('btnAgregar');
    if (btnAgregar) btnAgregar.addEventListener('click', abrirAgregarModal);

    const btnCloseModal = document.getElementById('btnCloseModal');
    if (btnCloseModal) btnCloseModal.addEventListener('click', cerrarModal);

    const btnCancel = document.getElementById('btnCancel');
    if (btnCancel) btnCancel.addEventListener('click', cerrarModal);

    // Formulario
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                nombre: document.getElementById('inputNombre').value,
                descripcion: document.getElementById('inputDescripcion').value,
                categoria: document.getElementById('inputCategoria').value,
                precio: document.getElementById('inputPrecio').value,
                stock: document.getElementById('inputStock').value,
                imagen_url: document.getElementById('inputImagen').value
            };

            if (!formData.nombre || !formData.precio) {
                mostrarNotificacion('❌ Completa nombre y precio', 'error');
                return;
            }

            if (productoEditando) {
                await editarProducto(productoEditando, formData);
            } else {
                await agregarProducto(formData);
            }
        });
    }

    // Preview de imagen
    const inputImagen = document.getElementById('inputImagen');
    if (inputImagen) {
        inputImagen.addEventListener('change', (e) => {
            mostrarPreview(e.target.value);
        });
    }

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
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'modal') cerrarModal();
        });
    }

    // Inicializar app
    console.log('🚀 Inicializando Boutique Chimbombis...');
    initSupabase();
});
