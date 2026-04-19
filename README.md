# Boutique Chimbombis - CRUD HTML/CSS/JS

Sistema de gestión de productos (CRUD) completamente funcional con HTML, CSS y JavaScript vanilla, conectado a Supabase.

## 🚀 Inicio Rápido

### Opción 1: Sin instalación (recomendado para probar)
1. Abre `index.html` en tu navegador
2. ¡Listo! El sistema funciona con `localStorage` por defecto

### Opción 2: Con Supabase (para producción)

#### Paso 1: Crear proyecto en Supabase
1. Ingresa a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Espera a que se inicialice

#### Paso 2: Crear tabla en Supabase
En el editor SQL de Supabase, ejecuta:

```sql
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  imagen_url TEXT,
  stock INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, stock) VALUES
('Perfume Elegancia', 'Aroma sofisticado para ocasiones especiales', 120.00, 'perfume', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400', 15),
('Perfume Fresco', 'Fragancia ligera y refrescante', 85.00, 'perfume', 'https://images.unsplash.com/photo-1508737763115-b8f8f5a83001?w=400', 20),
('Blusa Casual', 'Blusa cómoda para el día a día', 35.00, 'ropa', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 25),
('Vestido Formal', 'Vestido elegante para eventos', 95.00, 'ropa', 'https://images.unsplash.com/photo-1595777707802-51ca6f37b237?w=400', 12),
('Zapatos Deportivos', 'Tenis cómodos para correr', 85.00, 'calzado', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 12),
('Zapatos Formales', 'Zapatos elegantes para oficina', 120.00, 'calzado', 'https://images.unsplash.com/photo-1549446881-cb1aea458c5e?w=400', 8);

-- Permitir acceso público
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read"
  ON productos FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert"
  ON productos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON productos FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete"
  ON productos FOR DELETE
  USING (true);
```

#### Paso 3: Obtener credenciales
1. En Supabase, ve a **Settings → API**
2. Copia:
   - `Project URL` (SUPABASE_URL)
   - `anon public` key (SUPABASE_KEY)

#### Paso 4: Configurar proyecto
Edita `app.js` y reemplaza:

```javascript
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_KEY = 'tu_anon_key_aqui';
```

#### Paso 5: Prueba
Recarga la página. Deberías ver "🟢 Supabase" en la esquina superior derecha.

## 📁 Estructura de Archivos

```
/
├── index.html          ← Página principal
├── style.css           ← Estilos completos
├── app.js              ← Lógica de la aplicación
├── .env.local          ← Variables de entorno (no compartir)
├── .gitignore          ← Archivos a ignorar en Git
└── README.md           ← Este archivo
```

## ✨ Características

✅ **CRUD Completo**
- Agregar productos
- Editar productos
- Eliminar productos
- Ver todos los productos

✅ **Funcionalidades**
- Filtrado por categoría (Perfume, Ropa, Calzado)
- Búsqueda y validación de formularios
- Preview de imágenes
- Notificaciones toast
- Estadísticas en tiempo real

✅ **Base de Datos**
- localStorage (offline)
- Supabase (online)
- Cambio automático entre modos

✅ **Diseño**
- Responsive (mobile, tablet, desktop)
- Gradientes modernos
- Animaciones suaves
- Font Awesome icons

## 🚢 Desplegar en Vercel

### Paso 1: Crear repositorio GitHub
```bash
git init
git add .
git commit -m "Initial commit: Boutique Chimbombis CRUD"
git branch -M main
git remote add origin https://github.com/tu-usuario/boutique-chimbombis.git
git push -u origin main
```

### Paso 2: Desplegar en Vercel
1. Ingresa a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Selecciona tu repositorio
4. Haz clic en "Deploy"

¡Listo! Tu sitio estará en `https://tu-proyecto.vercel.app`

## 🌐 Desplegar en GitHub Pages

### Alternativa a Vercel (más rápido)
1. Ve a Settings → Pages
2. Source: Deploy from a branch
3. Branch: main, folder: / (root)
4. Guarda

Tu sitio estará en `https://tu-usuario.github.io/boutique-chimbombis/`

## 🔐 Variables de Entorno

No edites credenciales directamente en `app.js`. Crea un archivo `.env.local`:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_KEY=tu_anon_key_aqui
```

## 📋 Instalación Local

Para desarrollo local:

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/boutique-chimbombis.git
cd boutique-chimbombis

# Abrir en navegador
# Opción 1: Directamente
open index.html

# Opción 2: Con Live Server (VS Code)
# Click derecho en index.html → Open with Live Server

# Opción 3: Servidor Python
python -m http.server 8000
# Abre http://localhost:8000
```

## 🛠️ Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Grid, Flexbox, Gradientes
- **JavaScript Vanilla**: Sin dependencias
- **Supabase**: PostgreSQL en la nube (free)
- **Font Awesome**: Iconos profesionales

## 📊 Flujo de Datos

```
localStorage/Supabase
        ↓
    app.js
        ↓
  renderizarProductos()
        ↓
    index.html (DOM actualizado)
```

## 🐛 Solución de Problemas

### "Conectando..." no desaparece
- Verifica que SUPABASE_URL y SUPABASE_KEY sean correctos
- Comprueba permisos en Supabase (RLS policies)
- Abre la consola del navegador (F12) para ver errores

### Las imágenes no cargan
- Verifica que sean URLs HTTPS válidas
- Usa [unsplash.com](https://unsplash.com) para imágenes de prueba
- La imagen fallback aparecerá automáticamente

### Cambios no se guardan
- Verifica que localStorage esté habilitado
- Si usas Supabase, comprueba conexión en la consola
- Intenta recargar la página (Ctrl+Shift+R)

## 💡 Tips

1. **Imágenes**: Usa URLs de Unsplash, Pexels o similar
2. **Precios**: Usa formato decimal (120.50)
3. **Stock**: Números enteros positivos
4. **Descripciones**: Máximo 150 caracteres para mejor UI

## 📝 Licencia

MIT License - Siéntete libre de usar y modificar

## 🤝 Soporte

¿Preguntas? Abre un issue en GitHub o contacta al equipo de desarrollo.

---

**Hecho con ❤️ para Boutique Chimbombis**

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_aqui
```

### 3. Deploy

Vercel automáticamente desplegará en cada push a main.

## 📦 Scripts disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm start        # Inicia servidor de producción
npm run lint     # Ejecuta linter
```

## 🎯 Características Futuras

- [ ] Integración de pagos (Stripe/PayPal)
- [ ] Sistema de comentarios y reseñas
- [ ] Búsqueda avanzada de productos
- [ ] Sistema de notificaciones
- [ ] Panel de ventas del administrador
- [ ] Gestión de usuarios
- [ ] Descuentos y cupones

## 🔒 Seguridad

- Las rutas del admin están protegidas
- Validación de datos en el frontend
- Implementar validación en el backend con Supabase RLS
- Usar HTTPS en producción

## 📝 Notas Importantes

### Para Desarrollo

- Este proyecto usa datos mock para demostración
- Para usar Supabase real, actualiza `src/lib/supabase.ts`
- Implementa las llamadas API en funciones server-side

### Para Producción

- Configura las reglas de Row Level Security (RLS) en Supabase
- Implementa autenticación real con Supabase Auth
- Agrega validación de servidor
- Implementa procesamiento de pagos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para reportar problemas o sugerencias, abre un issue en el repositorio.

---

**Hecho con ❤️ para Boutique Chimbombis**
