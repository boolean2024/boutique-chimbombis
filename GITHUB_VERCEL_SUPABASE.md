# 🚀 GUÍA COMPLETA: GitHub → Vercel → Supabase

Pasos para subir tu CRUD a GitHub, desplegar en Vercel y conectar Supabase.

---

## PARTE 1: Preparar Git y GitHub 🐙

### Paso 1: Instalar Git
**Windows**:
1. Descarga desde [git-scm.com](https://git-scm.com)
2. Instala con las opciones por defecto
3. Abre PowerShell y verifica: `git --version`

**Mac**:
```bash
brew install git
```

### Paso 2: Configurar Git
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@gmail.com"
```

### Paso 3: Crear repositorio en GitHub
1. Ve a [github.com](https://github.com)
2. Haz clic en ➕ → New repository
3. Nombre: `boutique-chimbombis`
4. Descripción: "CRUD de gestión de productos"
5. **NO** inicialices con README (lo hacemos localmente)
6. Clic en "Create repository"

### Paso 4: Inicializar Git localmente
En tu carpeta del proyecto:

```bash
cd "c:\Users\marci\OneDrive\Documentos\Boutique-Chimbombis"

# Inicializar repositorio
git init

# Agregar archivos
git add .

# Crear primer commit
git commit -m "Initial commit: Boutique Chimbombis CRUD"

# Cambiar rama a main (por defecto)
git branch -M main

# Agregar remoto (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/boutique-chimbombis.git

# Subir a GitHub
git push -u origin main
```

✅ **¡Listo!** Tu código está en GitHub.

---

## PARTE 2: Configurar Supabase 🛢️

### Paso 1: Crear cuenta y proyecto
1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Sign Up"
3. Crea una cuenta con Google o Email
4. Haz clic en "New Project"
5. Elige una región cercana a ti
6. Crea una contraseña
7. Espera 1-2 minutos a que se inicialice

### Paso 2: Crear tabla de productos
1. Ve a **SQL Editor** (en el menú izquierdo)
2. Haz clic en "+ New Query"
3. Copia y pega este código:

```sql
-- Crear tabla
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  categoria TEXT NOT NULL,
  imagen_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices
CREATE INDEX idx_categoria ON productos(categoria);
CREATE INDEX idx_created_at ON productos(created_at);

-- Habilitar Row Level Security
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Crear políticas (permitir todo públicamente)
CREATE POLICY "Allow SELECT" ON productos
  FOR SELECT USING (true);

CREATE POLICY "Allow INSERT" ON productos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow UPDATE" ON productos
  FOR UPDATE USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow DELETE" ON productos
  FOR DELETE USING (true);

-- Insertar datos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, stock) VALUES
('Perfume Elegancia', 'Aroma sofisticado para ocasiones especiales', 120.00, 'perfume', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400', 15),
('Perfume Fresco', 'Fragancia ligera y refrescante', 85.00, 'perfume', 'https://images.unsplash.com/photo-1508737763115-b8f8f5a83001?w=400', 20),
('Perfume Oriental', 'Esencias orientales cálida y misteriosa', 110.00, 'perfume', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', 10),
('Perfume Floral', 'Notas florales delicadas y femeninas', 95.00, 'perfume', 'https://images.unsplash.com/photo-1518005067752-dae8d6ef7f0e?w=400', 18),
('Blusa Casual', 'Blusa cómoda para el día a día', 35.00, 'ropa', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 25),
('Vestido Formal', 'Vestido elegante para eventos', 95.00, 'ropa', 'https://images.unsplash.com/photo-1595777707802-51ca6f37b237?w=400', 12),
('Jeans Premium', 'Pantalones vaqueros de alta calidad', 65.00, 'ropa', 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400', 30),
('Jacket Cuero', 'Chaqueta de cuero genuino', 180.00, 'ropa', 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400', 8),
('Zapatos Deportivos', 'Tenis cómodos para correr', 85.00, 'calzado', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 12),
('Zapatos Formales', 'Zapatos elegantes para oficina', 120.00, 'calzado', 'https://images.unsplash.com/photo-1549446881-cb1aea458c5e?w=400', 8),
('Botas Negras', 'Botas de cuero para invierno', 140.00, 'calzado', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 10),
('Sandalias Playa', 'Cómodas sandalias para playa', 35.00, 'calzado', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', 25);
```

4. Haz clic en ▶️ (Run)
5. Si aparece error de RLS, ignora (las políticas ya están creadas)

### Paso 3: Obtener credenciales
1. Ve a **Settings** (rueda ⚙️ en la esquina inferior izquierda)
2. Haz clic en **API**
3. Copia:
   - `Project URL`
   - `anon public`

### Paso 4: Configurar en tu app
Edita `app.js` (línea 4-5):

```javascript
const SUPABASE_URL = 'AQUI_TU_PROJECT_URL';
const SUPABASE_KEY = 'AQUI_TU_ANON_KEY';
```

**Ejemplo:**
```javascript
const SUPABASE_URL = 'https://abcdefg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

### Paso 5: Probar localmente
```bash
# Abre el archivo en el navegador o
python -m http.server 8000
# Abre http://localhost:8000 en el navegador
```

Deberías ver "🟢 Supabase" en la esquina superior derecha.

---

## PARTE 3: Desplegar en Vercel 🚀

### Paso 1: Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up"
3. Elige "Continue with GitHub"
4. Autoriza Vercel en GitHub

### Paso 2: Crear proyecto
1. En Vercel, haz clic en "New Project"
2. Busca tu repositorio "boutique-chimbombis"
3. Haz clic en "Import"

### Paso 3: Configuración del proyecto
- **Project Name**: `boutique-chimbombis`
- **Root Directory**: Déjalo en blanco
- **Build Command**: No necesitas (es HTML estático)
- Haz clic en "Deploy"

### Paso 4: Esperar despliegue
- Vercel mostrará progreso
- Cuando termine, te dará una URL: `https://boutique-chimbombis-xyz.vercel.app`

✅ **¡Listo!** Tu app está en línea.

---

## PARTE 4: Configurar Variables en Vercel

Si tienes variables de entorno, agrégalas en Vercel:

1. En tu proyecto de Vercel, ve a **Settings**
2. Busca **Environment Variables**
3. Haz clic en "Add"
4. **Name**: `VITE_SUPABASE_URL`
5. **Value**: Tu Supabase URL
6. Repite para `VITE_SUPABASE_KEY`

---

## PARTE 5: Actualizar Código (en el futuro)

Cuando hagas cambios:

```bash
cd "c:\Users\marci\OneDrive\Documentos\Boutique-Chimbombis"

# Ver cambios
git status

# Agregar cambios
git add .

# Crear commit
git commit -m "Descripción del cambio"

# Subir a GitHub
git push origin main
```

**Vercel se actualiza automáticamente** cuando haces push a GitHub.

---

## 📋 Resumen de URLs

| Servicio | URL |
|----------|-----|
| GitHub Repo | `https://github.com/TU-USUARIO/boutique-chimbombis` |
| Vercel App | `https://boutique-chimbombis-xyz.vercel.app` |
| Supabase Project | `https://app.supabase.com/project/...` |
| Tu CRUD | `https://boutique-chimbombis-xyz.vercel.app` |

---

## 🐛 Solucionar Problemas

### Error: "Authentication failed for GitHub"
- Verifica que tengas permisos en el repositorio
- Desconecta y reconecta Vercel con GitHub

### Error: "No permission to deploy"
- Asegúrate de ser el propietario del repositorio
- En GitHub, ve a Settings → Collaborators

### Supabase dice "Not found"
- Verifica que `SUPABASE_URL` sea correcto
- Asegúrate de que las políticas RLS estén creadas

### Las imágenes no cargan
- Usa URLs HTTPS válidas
- Prueba con Unsplash: `https://unsplash.com/` (búsca imágenes y copia enlace de descarga)

---

## 💡 Tips Finales

1. **Haz commits frecuentes** con mensajes descriptivos
2. **Prueba localmente primero** antes de hacer push
3. **Monitorea Vercel** en tiempo real en el dashboard
4. **Usa Supabase Console** para verificar datos

---

**¿Necesitas ayuda?** Abre un issue en GitHub o contacta al soporte.

Hecho con ❤️ para Boutique Chimbombis
