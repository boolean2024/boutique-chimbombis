const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Helpers
function readProducts() {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data).products;
    } catch (error) {
        console.error('Error reading products:', error);
        return [];
    }
}

function writeProducts(products) {
    try {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({ products }, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing products:', error);
        return false;
    }
}

function getNextId(products) {
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

// ========================
// ENDPOINTS
// ========================

// 1. GET - Todos los productos
app.get('/api/products', (req, res) => {
    try {
        const products = readProducts();
        res.status(200).json({
            success: true,
            message: 'Productos obtenidos exitosamente',
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            error: error.message
        });
    }
});

// 2. GET - Producto por ID
app.get('/api/products/:id', (req, res) => {
    try {
        const products = readProducts();
        const product = products.find(p => p.id === parseInt(req.params.id));

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto obtenido exitosamente',
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener producto',
            error: error.message
        });
    }
});

// 3. POST - Crear nuevo producto
app.post('/api/products', (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;

        // Validación
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'El nombre y precio son obligatorios'
            });
        }

        const products = readProducts();
        const newProduct = {
            id: getNextId(products),
            name,
            description: description || '',
            price: parseFloat(price),
            category: category || 'otro',
            stock: parseInt(stock) || 0,
            image: image || ''
        };

        products.push(newProduct);

        if (writeProducts(products)) {
            res.status(201).json({
                success: true,
                message: 'Producto creado exitosamente',
                data: newProduct
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error al guardar el producto'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear producto',
            error: error.message
        });
    }
});

// 4. PUT - Actualizar producto
app.put('/api/products/:id', (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;
        const products = readProducts();
        const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Actualizar solo los campos proporcionados
        if (name !== undefined) products[productIndex].name = name;
        if (description !== undefined) products[productIndex].description = description;
        if (price !== undefined) products[productIndex].price = parseFloat(price);
        if (category !== undefined) products[productIndex].category = category;
        if (stock !== undefined) products[productIndex].stock = parseInt(stock);
        if (image !== undefined) products[productIndex].image = image;

        if (writeProducts(products)) {
            res.status(200).json({
                success: true,
                message: 'Producto actualizado exitosamente',
                data: products[productIndex]
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error al guardar los cambios'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar producto',
            error: error.message
        });
    }
});

// 5. DELETE - Eliminar producto
app.delete('/api/products/:id', (req, res) => {
    try {
        const products = readProducts();
        const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));

        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        const deletedProduct = products.splice(productIndex, 1);

        if (writeProducts(products)) {
            res.status(200).json({
                success: true,
                message: 'Producto eliminado exitosamente',
                data: deletedProduct[0]
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el producto'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar producto',
            error: error.message
        });
    }
});

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Servidor funcionando correctamente',
        timestamp: new Date()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║  BOUTIQUE CHIMBOMBIS - BACKEND API    ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('');
    console.log(`✅ Servidor ejecutándose en: http://localhost:${PORT}`);
    console.log('');
    console.log('📍 Endpoints disponibles:');
    console.log(`  GET    http://localhost:${PORT}/api/products`);
    console.log(`  GET    http://localhost:${PORT}/api/products/:id`);
    console.log(`  POST   http://localhost:${PORT}/api/products`);
    console.log(`  PUT    http://localhost:${PORT}/api/products/:id`);
    console.log(`  DELETE http://localhost:${PORT}/api/products/:id`);
    console.log(`  GET    http://localhost:${PORT}/api/health`);
    console.log('');
    console.log('🧪 Prueba con Postman o curl');
    console.log('');
});

module.exports = app;
