# 🛍️ Boutique Chimbombis - E-commerce Cloud

Sistema de tienda online elegante, moderno y **100% en la nube**.

## ✨ Características

### 👥 Modo Comprador
- 🏪 Explorar productos
- 🔍 Búsqueda en tiempo real
- 🏷️ Filtrar por categoría
- 🛒 Carrito editable (agregar/quitar/cambiar cantidad)
- 📦 Ver detalles completos de productos
- 💳 Interfaz hermosa y responsiva

### 🔐 Modo Administrador
- ➕ Agregar nuevos productos
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos
- 📊 Ver estadísticas (total, valor, stock)
- 📸 Subir imágenes propias (cualquier JPG/PNG)
- 🔄 Cambios en tiempo real a Supabase

## 🏗️ Arquitectura

```
┌─────────────────────────┐
│  VERCEL (Frontend)      │
│  boutique-chimbombis    │
│  HTML/CSS/JavaScript    │
└────────────┬────────────┘
             │ HTTPS API
┌────────────▼────────────┐
│  SUPABASE (Backend)     │
│  PostgreSQL + REST API  │
│  5GB gratis + Backups   │
└─────────────────────────┘
```

**Sin servidor local. Todo en la nube. Automático.**

## 🚀 Deployment (3 pasos)

### Paso 1: Supabase (5 min)
```
1. https://supabase.com → Sign up (GitHub)
2. Crear nuevo proyecto
3. SQL Editor → Pegar script de SUPABASE_GUIA.txt
4. Settings → API → Copiar URL y Key
```

### Paso 2: Configurar (2 min)
```
Editar: config.js
Reemplazar:
- SUPABASE_URL = "https://your-project.supabase.co"
- SUPABASE_KEY = "your-key-here"

git push
```

### Paso 3: Vercel (2 min)
```
1. https://vercel.com → Sign up (GitHub)
2. New Project → Seleccionar boutique-chimbombis
3. Deploy
4. ¡LISTO! 🎉
```

👉 **Ver [INICIO_RAPIDO_NUBE.txt](INICIO_RAPIDO_NUBE.txt) para instrucciones paso a paso**

## 📁 Estructura

```
├── index.html              # Interfaz HTML
├── style.css               # Estilos responsivos + animaciones
├── config.js               # Credenciales Supabase ⚙️
├── supabase-service.js     # Funciones CRUD para Supabase
├── data.js                 # Gestión de datos
├── admin.js                # Lógica del administrador
├── buyer.js                # Lógica del comprador
├── main-init.js            # Inicialización y modos
│
├── INICIO_RAPIDO_NUBE.txt  # ← LÉELO PRIMERO
├── SUPABASE_GUIA.txt       # Instrucciones detalladas
├── CLOUD_ARCHITECTURE.md   # Diagrama técnico
├── .gitignore              # Git config
└── README.md               # Este archivo
```

## 🎨 Diseño

- **Colores**: Púrpura (#8B5CF6) + Rosa (#EC4899)
- **Animaciones**: Smooth transitions, slide effects, fade in
- **Layout**: Grid responsivo (auto-fill)
- **Icons**: Font Awesome 6.4.0
- **Mobile**: 100% responsive

## 🔧 Tecnologías

| Layer | Tecnología |
|-------|-----------|
| Frontend | HTML5 + CSS3 + Vanilla JS |
| Backend | Supabase (PostgreSQL) |
| API | REST (automática) |
| Hosting | Vercel |
| Versionado | Git + GitHub |

## 💾 Base de Datos

Tabla `products` en PostgreSQL:
```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category TEXT,
  stock INTEGER,
  image TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## 🔐 Seguridad

✅ Row Level Security en Supabase
✅ HTTPS automático en Vercel
✅ Políticas públicas configuradas
✅ Variables de entorno en Vercel
⚠️ No compartir credenciales en código

## 💰 Costos

**TOTALMENTE GRATIS para empezar:**

| Servicio | Cuota Gratis |
|----------|------------|
| Supabase | 500MB DB + 2GB archivos |
| Vercel | 100GB/mes ancho de banda |
| GitHub | Repositorios ilimitados |

Escalable pagando solo cuando crezcas.

## 🌐 URLs

- **App Live**: https://boutique-chimbombis.vercel.app
- **GitHub**: https://github.com/boolean2024/boutique-chimbombis
- **Supabase Console**: https://app.supabase.com

## ⚡ Performance

- 🚀 CDN global (Vercel)
- 📦 Compresión automática
- 🔄 Caché inteligente
- ⚡ Carga < 2 segundos

## 🔄 Workflow de Desarrollo

```bash
# Hacer cambios localmente
git add .
git commit -m "Descripción del cambio"
git push

# Vercel redeploy automático (2-3 minutos)
```

## 📝 Cambios Recientes

- ✅ Migrración a Supabase (PostgreSQL cloud)
- ✅ Despliegue en Vercel (frontend cloud)
- ✅ API REST automática
- ✅ Sin servidor local
- ✅ Sin Node.js requerido

## 🎯 Próximos Pasos

1. ⬜ Crear cuenta Supabase
2. ⬜ Ejecutar SQL para crear tabla
3. ⬜ Configurar credenciales (config.js)
4. ⬜ Desplegar en Vercel
5. ⬜ Agregar productos
6. ⬜ ¡Vender! 🎉

## 📚 Documentación

- **[INICIO_RAPIDO_NUBE.txt](INICIO_RAPIDO_NUBE.txt)** ← Empieza aquí (3 pasos)
- **[SUPABASE_GUIA.txt](SUPABASE_GUIA.txt)** - Setup completo de Supabase
- **[CLOUD_ARCHITECTURE.md](CLOUD_ARCHITECTURE.md)** - Diagrama técnico

## 🤝 Contribuir

```bash
git fork
git checkout -b feature/nueva-feature
git commit -am "Agregar feature"
git push origin feature/nueva-feature
# Pull Request en GitHub
```

## 📞 Soporte

- 🐛 Bugs: GitHub Issues
- 💬 Preguntas: Discussions
- 📧 Email: contacto@boutiquechimbombis.com

## 📄 Licencia

MIT - Libre para usar, modificar y distribuir

---

**Boutique Chimbombis - Elegancia en cada compra 💜**

*Construido con ❤️ en la nube*
