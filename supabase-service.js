// SUPABASE API SERVICE
// Reemplaza las llamadas locales con Supabase Cloud

// ============================
// HELPER - Esperar a que Supabase esté listo
// ============================

async function waitForSupabase(maxRetries = 10) {
    for (let i = 0; i < maxRetries; i++) {
        if (window.supabase_instance) {
            console.log('✅ Supabase listo');
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.error('❌ Supabase no se pudo inicializar después de esperar');
    return false;
}

// ============================
// FUNCIONES SUPABASE
// =============================

// GET - Obtener todos los productos
async function fetchAllProducts() {
    try {
        // Esperar a que Supabase esté listo
        const ready = await waitForSupabase();
        if (!ready || !window.supabase_instance) {
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

        console.log('✅ Productos obtenidos:', data?.length);
        return data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// GET - Obtener un producto por ID
async function fetchProductById(productId) {
    try {
        const ready = await waitForSupabase();
        if (!ready || !window.supabase_instance) {
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
        const ready = await waitForSupabase();
        if (!ready || !window.supabase_instance) {
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
        const ready = await waitForSupabase();
        if (!ready || !window.supabase_instance) {
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
        const ready = await waitForSupabase();
        if (!ready || !window.supabase_instance) {
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
