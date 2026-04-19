# Instrucciones de Desarrollo

## Configuración Inicial

1. Instala las dependencias: `npm install`
2. Configura el archivo `.env.local` con tus credenciales de Supabase
3. Ejecuta el servidor: `npm run dev`

## Estructura del Proyecto

- `/src/app` - Páginas y layouts de Next.js
- `/src/store` - Stores de Zustand para estado global
- `/src/lib` - Funciones auxiliares y configuración

## Convenciones

- Usa TypeScript en todos los archivos
- Usa Tailwind CSS para estilos
- Usa Framer Motion para animaciones
- Mantén los componentes pequeños y reutilizables

## Deployment

Para desplegar en Vercel:

1. Push a GitHub
2. Conecta el repositorio a Vercel
3. Agrega las variables de entorno
4. El deployment es automático en cada push a main
