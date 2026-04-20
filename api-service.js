// API SERVICE - Boutique Chimbombis
// Este archivo maneja todas las peticiones al backend

const API_BASE_URL = 'http://localhost:3000/api';

// ============================
// FUNCIONES API
// ============================

// GET - Obtener todos los productos
async function fetchAllProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        } else {
            console.error('Error:', result.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// GET - Obtener un producto por ID
async function fetchProductById(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        } else {
            console.error('Error:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// POST - Crear nuevo producto
async function createProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        } else {
            console.error('Error:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
}

// PUT - Actualizar producto
async function updateProduct(productId, productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return result.data;
        } else {
            console.error('Error:', result.message);
            return null;
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
}

// DELETE - Eliminar producto
async function apiDeleteProduct(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.success) {
            return true;
        } else {
            console.error('Error:', result.message);
            return false;
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}

// Comprobar si el backend está disponible
async function isBackendAvailable() {
    try {
        const response = await fetch(`${API_BASE_URL}/../health`, {
            method: 'GET'
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}
