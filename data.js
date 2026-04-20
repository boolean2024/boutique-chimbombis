// DATOS DE PRODUCTOS PRE-CARGADOS
const INITIAL_PRODUCTS = [
    {
        id: 1,
        name: 'Perfume Elegancia',
        description: 'Aroma floral y sofisticado con notas de rosa y jazmín. Perfecto para ocasiones especiales.',
        price: 120.00,
        category: 'perfume',
        stock: 15,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGPHJLY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGRjY2QzQiIi8+CiAgPHBhdGggZD0iTSAxNTAgNTAgQSA1MCw1MCAwIDAgMSAxNTAgMTUwIEEgNTAsNTAgMCAwIDEgMTUwIDUwIiBmaWxsPSIjRkZCNkMxIi8+CiAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iMjAwIiByPSI0MCIgZmlsbD0iI0ZGQkZFMCIvPgo8L3N2Zz4='
    },
    {
        id: 2,
        name: 'Perfume Fresco',
        description: 'Fragancia cítrica y refrescante. Ideal para el día a día con notas de limón y bergamota.',
        price: 85.00,
        category: 'perfume',
        stock: 20,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGPHJLY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiM4RUVFQ0QiIi8+CiAgPHBhdGggZD0iTSAxNTAgNTAgQSA1MCw1MCAwIDAgMSAxNTAgMTUwIEEgNTAsNTAgMCAwIDEgMTUwIDUwIiBmaWxsPSIjNDBFMEQwIi8+CiAgPHJlY3QgeD0iMTIwIiB5PSIxNjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI5MCIgZmlsbD0iIzIwQkYyMCIvPgo8L3N2Zz4='
    },
    {
        id: 3,
        name: 'Blusa Casual Blanca',
        description: 'Blusa de algodón 100% suave y cómoda. Perfecta para cualquier ocasión casual.',
        price: 35.00,
        category: 'ropa',
        stock: 25,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICagicakicAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGNUY1RjUiLz4KICAKICAGPHBHDGGGZD0iTSAxMjAgODAgTCAxMDAgMTYwIEwgMTUwIDE4MCBMMjAwIDE2MCBMMTgwIDgwIFoiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHBhdGggZD0iTSAxMjAgODAgTCA2MCAxNjAgTDExMCAyMjAgTDEyMCAxODAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHBhdGggZD0iTSAxODAgODAgTCAyNDAgMTYwIEwgMTkwIDIyMCBMMTgwIDE4MCIgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+'
    },
    {
        id: 4,
        name: 'Pantalón Deportivo',
        description: 'Pantalón deportivo versátil con tecnología transpirable. Ideal para entrenar o relajarse.',
        price: 55.00,
        category: 'ropa',
        stock: 18,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGICAKICAGPHJLY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNFOEY0Rjgiis8KiAgCiAgIDxwYXRoIGQ9Ik0gMTIwIDEwMCBMIDExMCAyMjAgTDEyMCAyNzAgTDEzMCAyMjAgTDEzMCAxMDAiIGZpbGw9IiMxRTMwRjAiIHN0cm9rZT0iIzEyMThBNiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgIDxwYXRoIGQ9Ik0gMTgwIDEwMCBMIDE5MCkyMjAgTCAxODAgMjcwIEwgMTcwIDIyMCBMMTcwIDEwMCIgZmlsbD0iIzFFMzBGMCIgc3Ryb2tlPSIjMTIxOEE2IiBzdHJva2Utd2lkdGg9IjIiLz4KICAKICAGICAKPC9zdmc+'
    },
    {
        id: 5,
        name: 'Zapatillas Running',
        description: 'Zapatillas con amortiguación avanzada y diseño ergonómico. Perfectas para correr.',
        price: 159.99,
        category: 'calzado',
        stock: 12,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGICAKICAGICAGICAGICAGICAGICAGICAGICAGICAGICAG8KiAgCiAgIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRUZFRkVGIi8+CiAgIDxwYXRoIGQ9Ik0gNjAgMjAwIEwgODAgMTUwIEwgMTIwIDE0MCBMMTQwIDE0MCBMMTYwIDE1MCBMMTgwIDE0MCBMMjIwIDE0MCBMMjQwIDE1MCBMMjYwIDE2MCBMMjgwIDIyMCBMIDI2MCAyNTAgTCA5MCwyNTAgTCA0MCAyMjAgWiIgZmlsbD0iI0ZGMzMzMyIgc3Ryb2tlPSIjQ0MwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz4KICAKPC9zdmc+'
    },
    {
        id: 6,
        name: 'Botas Invierno',
        description: 'Botas impermeables con aislamiento térmico. Perfectas para días fríos y lluvia.',
        price: 140.00,
        category: 'calzado',
        stock: 10,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGICAKICAGICAGICAGICAGICAGICAG8KiAgCiAgIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBFOEU4Ii8+CiAgIDxwYXRoIGQ9Ik0gNzAgMTcwIEwgODAgODAgTCAxMjAgODAgTCAxMzAgMTcwIEwgMTQwIDI3MCBMMjAgMjcwIFoiIGZpbGw9IiMzMzMzMzMiIHN0cm9rZT0iIzExMTExMSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgIDxwYXRoIGQ9Ik0gMjMwIDE3MCBMIDIwMCA4MCBMMjQwIDgwIEwgMjUwIDE3MCBMMjYwIDI3MCBMMTQwIDI3MCBaIiBmaWxsPSIjMzMzMzMzIiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMiIvPgogICAKPC9zdmc+'
    },
    {
        id: 7,
        name: 'Perfume Oriental',
        description: 'Esencia oriental cálida y misteriosa. Aroma envolvente con notas de ámbar y sándalo.',
        price: 110.00,
        category: 'perfume',
        stock: 14,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGICAKICAGICAGICAGICAGICAGICAG8KiAgCiAgIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVEOEI2Ii8+CiAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyMCIgcj0iNTAiIGZpbGw9IiNGRjhDNDIiLz4KICAKPC9zdmc+'
    },
    {
        id: 8,
        name: 'Sandalias Playa',
        description: 'Sandalias cómodas perfectas para playa y piscina. Material resistente y antideslizante.',
        price: 39.99,
        category: 'calzado',
        stock: 30,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGICAKICAGICAGICAGICAGICAGICAG8KiAgCiAgIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjQzBFRkZGIi8+CiAgIDxwYXRoIGQ9Ik0gODAgMjAwIEwgMTAwIDE0MCBMMTQwIDEzMCBMMTYwIDEzMCBMMjAwIDE0MCBMMjIwIDIwMCBMMjAwIDI0MCBMMTAwIDI0MCBaIiBmaWxsPSIjRkZDNzBCIiBzdHJva2U9IiNGRkE1MDAiIHN0cm9rZS13aWR0aD0iMiIvPgogICAKPC9zdmc+'
    },
    {
        id: 9,
        name: 'Chaqueta Casual',
        description: 'Chaqueta de estilo moderno y versátil. Perfecta para combinar con cualquier outfit.',
        price: 75.00,
        category: 'ropa',
        stock: 16,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGICAKICAGICAGICAGICAGICAGICAG8KiAgCiAgIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVFNkU2Ii8+CiAgIDxwYXRoIGQ9Ik0gMTAwIDEwMCBMIDEyMCA4MCBMMTgwIDgwIEwgMjAwIDEwMCBMMjEwIDIxMCBMMTUwIDIzMCBMMTUwIDI0MCBMMTUwIDIzMCBMMTUwIDIwMCBMMTMwIDIxMCBMMTMwIDEwMCBMMTIwIDExMCBMMTIwIDE5MCBMMTEwIDIwMCBMMTEwIDExMCBMMTAwIDEwMCBaIiBmaWxsPSIjMzMzMzMzIiBzdHJva2U9IiMxMTExMTEiIHN0cm9rZS13aWR0aD0iMiIvPgogICAKPC9zdmc+'
    },
    {
        id: 10,
        name: 'Zapatos Formales',
        description: 'Zapatos elegantes para oficina y eventos formales. Diseño clásico y cómodo.',
        price: 120.00,
        category: 'calzado',
        stock: 8,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAKICAGICAKICAGICAGICAGICAGICAGICAG8KiAgCiAgIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkVGNkY2Ii8+CiAgIDxwYXRoIGQ9Ik0gODAgMjIwIEwgMTAwIDE2MCBMMTQwIDE1MCBMMTYwIDE1MCBMMjAwIDE2MCBMMjIwIDIyMCBMMjEwIDI1MCBMMjAwIDI2MCBMMTAwIDI2MCBMMjAgMjUwIFoiIGZpbGw9IiMzMzMzMzMiIHN0cm9rZT0iIzExMTExMSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgIDxwYXRoIGQ9Ik0gMTAwIDIwMCBMMTQwIDI0MCIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIi8+CiAgIDxwYXRoIGQ9Ik0gMjAwIDIwMCBMMTYwIDI0MCIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIi8+CiAgIAo8L3N2Zz4='
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
