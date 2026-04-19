# ⚡ INICIO RÁPIDO

Pasos para empezar en 5 minutos.

## Opción 1: Probar localmente SIN instalación

```bash
# Solo abre en el navegador
# Windows: Abre File Explorer → Navega a la carpeta → index.html → Doble clic
# Mac: Abre Finder → Navega a la carpeta → index.html → Doble clic
# Linux: Abre Nautilus → Navega a la carpeta → index.html → Doble clic
```

✅ El CRUD funciona totalmente con **localStorage** (sin servidor).

## Opción 2: Subir a GitHub en 5 minutos

### 1️⃣ Instalar Git
- [Windows](https://git-scm.com/download/win)
- [Mac](https://git-scm.com/download/mac)
- [Linux](https://git-scm.com/download/linux)

### 2️⃣ Configurar Git
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@gmail.com"
```

### 3️⃣ Crear repositorio en GitHub
1. Ve a [github.com](https://github.com)
2. Clic en ➕ → "New repository"
3. Nombre: `boutique-chimbombis`
4. Clic en "Create repository"
5. **Copia la URL que te muestra** (algo como `https://github.com/usuario/boutique-chimbombis.git`)

### 4️⃣ Subir código
```bash
cd "c:\Users\marci\OneDrive\Documentos\Boutique-Chimbombis"

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin AQUI_PEGA_LA_URL_DE_GITHUB
git push -u origin main
```

✅ **¡Tu código está en GitHub!**

## Opción 3: Desplegar en Vercel en 10 minutos

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up" → "Continue with GitHub"
3. Autoriza Vercel
4. Haz clic en "New Project"
5. Busca tu repositorio `boutique-chimbombis`
6. Haz clic en "Import"
7. Haz clic en "Deploy"

✅ **¡Tu app está en línea!** Te dará una URL como `https://boutique-chimbombis-xyz.vercel.app`

## Opción 4: Conectar Supabase para base de datos

### 1️⃣ Crear proyecto Supabase
- Ve a [supabase.com](https://supabase.com)
- Haz clic en "Sign Up"
- Elige región cercana
- Espera 2 minutos

### 2️⃣ Crear tabla
En **SQL Editor**:

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

ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow SELECT" ON productos FOR SELECT USING (true);
CREATE POLICY "Allow INSERT" ON productos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow UPDATE" ON productos FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow DELETE" ON productos FOR DELETE USING (true);

INSERT INTO productos (nombre, descripcion, precio, categoria, imagen_url, stock) VALUES
('Perfume Elegancia', 'Aroma sofisticado', 120.00, 'perfume', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400', 15),
('Blusa Casual', 'Blusa cómoda', 35.00, 'ropa', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 25),
('Zapatos Deportivos', 'Tenis cómodos', 85.00, 'calzado', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 12);
```

Clic en ▶️

### 3️⃣ Obtener credenciales
Ve a **Settings → API**:
- Copia `Project URL`
- Copia `anon public`

### 4️⃣ Configurar en app.js
Edita `app.js` línea 4-5:

```javascript
const SUPABASE_URL = 'AQUI_TU_URL';
const SUPABASE_KEY = 'AQUI_TU_KEY';
```

### 5️⃣ Prueba
Recarga la página. Deberías ver "🟢 Supabase" en arriba a la derecha.

---

## 🎯 Resumen de Comandos

### Git
```bash
# Primera vez
git init
git add .
git commit -m "mensaje"
git remote add origin URL_DE_GITHUB
git push -u origin main

# Actualizaciones posteriores
git add .
git commit -m "cambios"
git push origin main
```

### Ver estado
```bash
git status
git log
```

---

## 📚 Documentación Completa

Para pasos más detallados, lee:
- [README.md](README.md) - Documentación principal
- [GITHUB_VERCEL_SUPABASE.md](GITHUB_VERCEL_SUPABASE.md) - Guía completa

---

**¡Eso es! ¿Preguntas?** Abre un issue en GitHub.

Hecho con ❤️
