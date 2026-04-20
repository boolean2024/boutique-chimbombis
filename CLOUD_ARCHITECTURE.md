# 🚀 BOUTIQUE CHIMBOMBIS - ARQUITECTURA EN LA NUBE

## ☁️ Infraestructura

```
┌─────────────────────────┐
│   VERCEL (Frontend)      │
│  boutique-chimbombis    │
│  index.html + CSS/JS    │
└────────────┬────────────┘
             │ API REST
┌────────────▼────────────┐
│ SUPABASE (Backend)      │
│  PostgreSQL + Auth      │
│  API automática         │
└─────────────────────────┘
```

## 🔧 Componentes

### Frontend (Vercel)
- **Hosting**: Vercel (gratis, 100GB/mes)
- **Despliegue**: Automático desde GitHub
- **URL**: https://boutique-chimbombis.vercel.app

### Backend (Supabase)
- **Base de datos**: PostgreSQL (5GB gratis)
- **API**: REST automática (sin código)
- **Autenticación**: Supabase Auth (incluida)
- **URL**: https://your-project.supabase.co

## ⚡ Configuración Rápida

### 1. Supabase
```
1. https://supabase.com → Sign up con GitHub
2. Nuevo proyecto
3. Settings → API → Copiar credenciales
4. SQL Editor → Pegar script de SUPABASE_GUIA.txt
```

### 2. Código
```
1. Editar config.js con tus credenciales
2. git add . && git commit && git push
```

### 3. Vercel
```
1. https://vercel.com → Sign up con GitHub
2. Import proyecto boutique-chimbombis
3. Deploy
```

## 📚 Archivos Importantes

- **config.js** - Credenciales Supabase
- **supabase-service.js** - Funciones para Supabase
- **SUPABASE_GUIA.txt** - Instrucciones detalladas

## 🔐 Variables de Entorno (Producción)

En Vercel → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=eyJhbGc...
```

## 🆓 Planes Gratis

| Servicio | Cuota Gratis |
|----------|-------------|
| Supabase | 500MB DB, 2GB archivos |
| Vercel   | 100GB ancho de banda |
| GitHub   | Repositorios ilimitados |

## 📊 Coste Estimado

**TOTAL GRATIS** para uso normal

Cuando escales:
- Supabase: $25/mes (1TB)
- Vercel: $20/mes (Pro)

## ✅ Ventajas en la Nube

✅ Sin servidor local que mantener
✅ Escalable automáticamente
✅ HTTPS automático
✅ Backups automáticos
✅ Disponible 24/7
✅ Acceso desde cualquier dispositivo

---

**¡Tu aplicación está lista para producción!** 🎉
