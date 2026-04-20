# Boutique Chimbombis 👜

Aplicación web moderna para gestionar una boutique con dos modos: **Comprador** y **Administrador**. Datos almacenados localmente con soporte para subida de imágenes.

## ✨ Características

- **Modo Comprador**: Explora productos, búsqueda, filtros por categoría, carrito de compras
- **Modo Administrador**: Gestiona productos, agregar/editar/eliminar, subida de imágenes propias
- **Almacenamiento Local**: Todos los datos se guardan en el navegador (localStorage)
- **Interfaz Hermosa**: Diseño moderno con animaciones fluidas
- **Completamente Responsivo**: Funciona perfectamente en móvil, tablet y desktop
- **Sin Dependencias**: Puro HTML, CSS y JavaScript vanilla

## 🚀 Inicio Rápido

### Opción 1: Abrir Localmente
```bash
# Simplemente abre index.html en tu navegador
# Windows: Doble clic en index.html
# Mac/Linux: Abre en navegador
```

### Opción 2: Desplegar en Vercel
1. Fork o copia este repositorio a GitHub
2. Ve a https://vercel.com
3. Importa tu repositorio
4. Haz clic en Deploy

Tu app estará en línea en segundos ⚡

## 📁 Estructura del Proyecto

```
Boutique-Chimbombis/
├── index.html        # Interfaz principal
├── style.css         # Estilos (animaciones, colores, responsive)
├── data.js           # Datos de productos pre-cargados
├── admin.js          # Lógica del panel de administrador
├── buyer.js          # Lógica de comprador
├── main-init.js      # Script principal
└── README.md         # Este archivo
```

## 🎯 Cómo Usar

### Modo Comprador
1. Selecciona "Comprador" en la pantalla inicial
2. Explora productos con filtros por categoría
3. Usa búsqueda para encontrar rápido
4. Agrega productos al carrito
5. El carrito se guarda automáticamente

### Modo Administrador
1. Selecciona "Administrador" en la pantalla inicial
2. Ve todas las estadísticas (productos, valor total, stock)
3. **Agregar Producto**:
   - Haz clic en "+ Agregar Producto"
   - Completa los datos
   - **Sube tu propia imagen** (JPG, PNG)
   - Haz clic en Guardar
4. **Editar**: Haz clic en el icono de lápiz
5. **Eliminar**: Haz clic en el icono de papelera

## 💾 Almacenamiento de Datos

- **Productos**: Se guardan en `localStorage` como JSON
- **Imágenes**: Se convierten a Base64 y se guardan localmente
- **Carrito**: Se persiste automáticamente

Los datos son accesibles desde cualquier dispositivo simplemente abriendo la URL.

## 🎨 Características de Diseño

- **Colores Modernos**: Gradientes púrpura y rosa
- **Animaciones**: Transiciones suaves en todo
- **Iconos**: Font Awesome 6.4
- **Responsivo**: Mobile-first design
- **Dark/Light**: Interfaz clara y contraste perfecto

## 📦 Productos Pre-cargados

- 10 productos de ejemplo (perfumes, ropa, calzado)
- Con imágenes SVG bonitas
- Datos realistas de precios y stock

## 🔧 Personalización

### Cambiar Colores
Edita las variables en `style.css`:
```css
:root {
    --primary: #8B5CF6;      /* Púrpura */
    --secondary: #EC4899;    /* Rosa */
    ...
}
```

### Agregar Más Productos
En `data.js`, agrega a `INITIAL_PRODUCTS`:
```javascript
{
    id: 11,
    name: 'Tu Producto',
    description: 'Descripción...',
    price: 99.99,
    category: 'perfume|ropa|calzado',
    stock: 20,
    image: 'data:image/...' // Base64
}
```

## 🌐 Despliegue

### GitHub + Vercel
```bash
# 1. Inicializar Git
git init
git add .
git commit -m "Initial commit"

# 2. Crear repo en GitHub
# Ir a github.com → New repository → boutique-chimbombis

# 3. Empujar código
git remote add origin https://github.com/tu-usuario/boutique-chimbombis.git
git push -u origin main

# 4. Desplegar en Vercel
# Vercel → New Project → Importar desde GitHub → Deploy
```

## 📱 Funcionalidades Futuras

- [ ] Integración con Stripe para pagos
- [ ] Panel de estadísticas avanzadas
- [ ] Historial de compras
- [ ] Sistema de usuarios
- [ ] Notificaciones por email

## 📄 Licencia

MIT - Úsalo libremente

## 🙌 Hecho con ❤️ para Boutique Chimbombis

---

**¡Disfruta tu tienda online!** 🛍️
