// SUPABASE API SERVICE
// Reemplaza las llamadas locales con Supabase Cloud

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_KEY = 'YOUR_PUBLIC_ANON_KEY';

// Cliente Supabase
const supabase = supabase_instance ? supabase_instance : null;

// ============================
// FUNCIONES SUPABASE
// ============================

// GET - Obtener todos los productos
async function fetchAllProducts() {
    try {
        if (!supabase) {
            console.error('Supabase no configurado');
            return [];
        }

        const { data, error } = await supabase
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
        if (!supabase) {
            console.error('Supabase no configurado');
            return null;
        }

        const { data, error } = await supabase
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
        if (!supabase) {
            console.error('Supabase no configurado');
            return null;
        }

        const { data, error } = await supabase
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
        if (!supabase) {
            console.error('Supabase no configurado');
            return null;
        }

        const { data, error } = await supabase
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
        if (!supabase) {
            console.error('Supabase no configurado');
            return false;
        }

        const { error } = await supabase
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
