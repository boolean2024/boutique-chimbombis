# 🚀 Backend - Boutique Chimbombis

Backend REST API simple y rápido para Boutique Chimbombis.

## 📋 Requisitos

- Node.js 14+ instalado
- npm (viene con Node.js)

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

Esto instalará:
- **express**: Framework web rápido
- **cors**: Permitir peticiones desde el frontend
- **body-parser**: Parsear JSON

### 2. Iniciar el servidor

```bash
npm start
```

Verás en la terminal:

```
╔════════════════════════════════════════╗
║  BOUTIQUE CHIMBOMBIS - BACKEND API    ║
╚════════════════════════════════════════╝

✅ Servidor ejecutándose en: http://localhost:3000

📍 Endpoints disponibles:
  GET    http://localhost:3000/api/products
  GET    http://localhost:3000/api/products/:id
  POST   http://localhost:3000/api/products
  PUT    http://localhost:3000/api/products/:id
  DELETE http://localhost:3000/api/products/:id
  GET    http://localhost:3000/api/health
```

## ✅ Verificar que funciona

En tu navegador o Postman, abre:

```
http://localhost:3000/api/health
```

Deberías ver:

```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2024-04-20T12:34:56.789Z"
}
```

## 🔌 Endpoints API

### 1. GET - Todos los productos

```bash
curl http://localhost:3000/api/products
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Productos obtenidos exitosamente",
  "data": [
    {
      "id": 1,
      "name": "Perfume Elegancia",
      "price": 120.00,
      ...
    }
  ]
}
```

### 2. GET - Producto por ID

```bash
curl http://localhost:3000/api/products/1
```

### 3. POST - Crear producto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nuevo Producto",
    "description": "Descripción",
    "price": 99.99,
    "category": "perfume",
    "stock": 10,
    "image": "data:image/..."
  }'
```

### 4. PUT - Actualizar producto

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nombre Actualizado",
    "price": 150.00
  }'
```

### 5. DELETE - Eliminar producto

```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## 🗄️ Base de datos

Actualmente usa un archivo JSON: `backend/products.json`

**Ventajas:**
- ✅ Sin configuración de DB
- ✅ Rápido para desarrollo
- ✅ Fácil de respaldar

**Para producción, puedes cambiar a:**
- SQLite (más simple)
- PostgreSQL (profesional)
- MongoDB (NoSQL)

## 📁 Estructura

```
backend/
├── server.js          # Servidor Express con endpoints
├── products.json      # Base de datos (JSON)
├── package.json       # Dependencias
├── .env               # Variables de entorno
└── README.md          # Este archivo
```

## 🔧 Modificar Puerto

En `backend/.env`:

```
PORT=5000
```

Luego reinicia el servidor.

## ⚠️ Errores comunes

### "Port 3000 already in use"

El puerto 3000 está siendo usado. Soluciones:

1. Cambia el puerto en `.env` a 5000
2. O detén la otra aplicación que usa 3000

### "Cannot find module 'express'"

Asegúrate de instalar dependencias:

```bash
npm install
```

### CORS error en el frontend

Asegúrate que:
1. El backend está corriendo (`npm start`)
2. La URL en `api-service.js` es correcta
3. `cors` middleware está habilitado en `server.js`

## 🚀 Próximos pasos

1. **Conectar Frontend:** El archivo `api-service.js` en la raíz contiene todas las funciones para consumir la API

2. **Actualizar data.js:** Reemplazar localStorage con llamadas API

3. **Producción:** Desplegar en Heroku, Railway o Vercel

## 📚 Recursos

- [Express.js Docs](https://expressjs.com/)
- [Node.js Docs](https://nodejs.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)

---

**¿Necesitas ayuda?** Contacta al desarrollador o consulta el archivo POSTMAN_URLS.txt
