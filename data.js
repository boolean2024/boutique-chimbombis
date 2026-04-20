// DATOS DE PRODUCTOS PRE-CARGADOS
const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: 'Perfume Elegancia',
        description: 'Aroma floral y sofisticado con notas de rosa y jazmín. Perfecto para ocasiones especiales.',
        price: 120.00,
        category: 'perfume',
        stock: 15,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23FF66C4"/><circle cx="150" cy="100" r="40" fill="%23FFB6C1"/><path d="M 150 140 L 140 200 L 160 200 Z" fill="%23FFBFE0"/><rect x="130" y="200" width="40" height="60" fill="%23FFB6C1"/></svg>'
    },
    {
        id: 2,
        name: 'Perfume Fresco',
        description: 'Fragancia cítrica y refrescante. Ideal para el día a día con notas de limón y bergamota.',
        price: 85.00,
        category: 'perfume',
        stock: 20,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%238EEECD"/><circle cx="150" cy="100" r="40" fill="%2340E0D0"/><circle cx="130" cy="80" r="8" fill="%23FFD700"/><circle cx="170" cy="80" r="8" fill="%23FFD700"/><path d="M 150 140 L 140 200 L 160 200 Z" fill="%2340E0D0"/></svg>'
    },
    {
        id: 3,
        name: 'Blusa Casual Blanca',
        description: 'Blusa de algodón 100% suave y cómoda. Perfecta para cualquier ocasión casual.',
        price: 35.00,
        category: 'ropa',
        stock: 25,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23F5F5F5"/><path d="M 120 80 L 90 120 L 100 200 L 200 200 L 210 120 L 180 80 Z" fill="%23FFFFFF" stroke="%23333" stroke-width="2"/><rect x="140" y="100" width="20" height="15" fill="%23FFB6C1"/></svg>'
    },
    {
        id: 4,
        name: 'Pantalón Deportivo',
        description: 'Pantalón deportivo versátil con tecnología transpirable. Ideal para entrenar o relajarse.',
        price: 55.00,
        category: 'ropa',
        stock: 18,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23E8F4F8"/><path d="M 120 100 L 100 180 L 110 260 L 140 260 L 150 180 L 150 100 Z" fill="%231E30F0" stroke="%23121A6" stroke-width="2"/><path d="M 180 100 L 200 180 L 190 260 L 160 260 L 150 180 L 150 100 Z" fill="%231E30F0" stroke="%23121A6" stroke-width="2"/></svg>'
    },
    {
        id: 5,
        name: 'Zapatillas Running',
        description: 'Zapatillas con amortiguación avanzada y diseño ergonómico. Perfectas para correr.',
        price: 159.99,
        category: 'calzado',
        stock: 12,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23EFEFEF"/><ellipse cx="150" cy="200" rx="80" ry="40" fill="%23FF3333" stroke="%23CC0000" stroke-width="2"/><path d="M 80 180 L 100 140 L 120 130 L 180 130 L 200 140 L 220 180" fill="%23FF3333" stroke="%23CC0000" stroke-width="2"/></svg>'
    },
    {
        id: 6,
        name: 'Botas Invierno',
        description: 'Botas impermeables con aislamiento térmico. Perfectas para días fríos y lluvia.',
        price: 140.00,
        category: 'calzado',
        stock: 10,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23F0E8E8"/><path d="M 100 100 L 90 160 L 95 260 L 135 260 L 140 160 L 140 100 Z" fill="%23333333" stroke="%23111" stroke-width="2"/><path d="M 200 100 L 210 160 L 205 260 L 165 260 L 160 160 L 160 100 Z" fill="%23333333" stroke="%23111" stroke-width="2"/></svg>'
    },
    {
        id: 7,
        name: 'Perfume Oriental',
        description: 'Esencia oriental cálida y misteriosa. Aroma envolvente con notas de ámbar y sándalo.',
        price: 110.00,
        category: 'perfume',
        stock: 14,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23FED8B6"/><circle cx="150" cy="100" r="50" fill="%23FF8C42"/><path d="M 150 160 L 140 220 L 160 220 Z" fill="%23FF8C42"/><circle cx="130" cy="140" r="15" fill="%23FFAA60"/></svg>'
    },
    {
        id: 8,
        name: 'Sandalias Playa',
        description: 'Sandalias cómodas perfectas para playa y piscina. Material resistente y antideslizante.',
        price: 39.99,
        category: 'calzado',
        stock: 30,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23C0EFFF"/><ellipse cx="120" cy="200" rx="35" ry="30" fill="%23FFC70B" stroke="%23FFA500" stroke-width="2"/><ellipse cx="180" cy="200" rx="35" ry="30" fill="%23FFC70B" stroke="%23FFA500" stroke-width="2"/><rect x="135" y="150" width="30" height="50" fill="%23FF6B6B"/></svg>'
    },
    {
        id: 9,
        name: 'Chaqueta Casual',
        description: 'Chaqueta de estilo moderno y versátil. Perfecta para combinar con cualquier outfit.',
        price: 75.00,
        category: 'ropa',
        stock: 16,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23F5E6E6"/><path d="M 90 100 L 110 80 L 190 80 L 210 100 L 220 220 L 80 220 Z" fill="%23333333" stroke="%23111" stroke-width="2"/><circle cx="110" cy="140" r="8" fill="%23555555"/><circle cx="190" cy="140" r="8" fill="%23555555"/></svg>'
    },
    {
        id: 10,
        name: 'Zapatos Formales',
        description: 'Zapatos elegantes para oficina y eventos formales. Diseño clásico y cómodo.',
        price: 120.00,
        category: 'calzado',
        stock: 8,
        image: 'data:image/svg+xml;utf8,<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="%23FEF6F6"/><ellipse cx="120" cy="200" rx="40" ry="35" fill="%23333333" stroke="%23111" stroke-width="2"/><ellipse cx="180" cy="200" rx="40" ry="35" fill="%23333333" stroke="%23111" stroke-width="2"/><path d="M 100 140 L 140 100 L 160 100 L 200 140 L 200 180 L 100 180 Z" fill="%23333333" stroke="%23111" stroke-width="2"/></svg>'
    }
];

// Función para cargar datos desde API
async function loadProducts() {
    try {
        const products = await fetchAllProducts();
        if (products.length > 0) {
            return products;
        } else {
            // Si la API no tiene datos, cargar datos iniciales
            console.warn('API vacía, cargando datos iniciales...');
            for (const product of INITIAL_PRODUCTS) {
                await createProduct(product);
            }
            return INITIAL_PRODUCTS;
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
        // Fallback a datos iniciales si hay error
        return INITIAL_PRODUCTS;
    }
}

// Función para guardar productos (ya no se usa, ahora todo va a la API)
function saveProducts(products) {
    // Deprecated - los datos se guardan en la API ahora
    console.log('saveProducts deprecated - usa la API');
}
