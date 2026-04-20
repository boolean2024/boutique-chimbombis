// SUPABASE API SERVICE
// Reemplaza las llamadas locales con Supabase Cloud

// ============================
// VERIFICAR SUPABASE INICIALIZADO
// ============================

// Esperar a que Supabase esté listo (desde config.js)
if (!window.supabase_instance) {
    console.error('❌ window.supabase_instance no está disponible. Verifica que config.js se cargó antes.');
}

// ============================
// FUNCIONES SUPABASE
// ============================

// GET - Obtener todos los productos
async function fetchAllProducts() {
    try {
        if (!window.supabase_instance) {
            console.error('Supabase no configurado');
            return [];
        }

        const { data, error } = await window.supabase_instance
            .from('products')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// GET - Obtener un producto por ID
async function fetchProductById(productId) {
    try {
        if (!window.supabase_instance) {
            console.error('Supabase no configurado');
            return null;
        }

        const { data, error } = await window.supabase_instance
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

        if (error) {
            console.error('Error fetching product:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// POST - Crear nuevo producto
async function createProduct(productData) {
    try {
        if (!window.supabase_instance) {
            console.error('Supabase no configurado');
            return null;
        }

        const { data, error } = await window.supabase_instance
            .from('products')
            .insert([productData])
            .select()
            .single();

        if (error) {
            console.error('Error creating product:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
}

// PUT - Actualizar producto
async function updateProduct(productId, productData) {
    try {
        if (!window.supabase_instance) {
            console.error('Supabase no configurado');
            return null;
        }

        const { data, error } = await window.supabase_instance
            .from('products')
            .update(productData)
            .eq('id', productId)
            .select()
            .single();

        if (error) {
            console.error('Error updating product:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
}

// DELETE - Eliminar producto
async function apiDeleteProduct(productId) {
    try {
        if (!window.supabase_instance) {
            console.error('Supabase no configurado');
            return false;
        }

        const { error } = await window.supabase_instance
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) {
            console.error('Error deleting product:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}
