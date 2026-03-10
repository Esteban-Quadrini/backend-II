# Backend-II - Entrega Final

## Resumen
Proyecto backend de ecommerce: DAO, Repository, DTO, servicios, middleware de autorización, recuperación de contraseña con mailing y lógica de compra con tickets.

## Requisitos
- Node.js >= 18
- npm
- MongoDB Atlas (o local)
- Variables de entorno (ver `.env.example`)

## Instalación
1. Clonar repo
2. Copiar `.env.example` a `.env` y completar variables
3. `npm install`
4. `npm run dev`

## Scripts útiles
- `npm run dev` — arranca con nodemon
- `node scripts/seedAdmin.js` — crea admin (admin@example.com / AdminPass123)
- `node scripts/seedProducts.js` — crea productos de prueba

## Endpoints principales
- `POST /api/users` — crear usuario
- `POST /api/sessions/login` — login (devuelve token)
- `GET /api/users/current` — info del usuario actual (DTO, sin datos sensibles)
- `POST /api/users/reset-request` — solicitar reset de contraseña (envía mail)
- `POST /api/users/reset/:token` — restablecer contraseña (token expira en 1h)
- `POST /api/products` — crear producto (admin only)
- `POST /api/purchase` — crear compra (user/premium)

## Notas de seguridad y arquitectura
- Contraseñas hasheadas con bcrypt.
- JWT para autenticación.
- Middleware `authorize` para roles.
- Patrón Repository: Services usan Repositories; Repositories usan DAOs.
- DTOs para evitar exponer datos sensibles.

## Verificación rápida
1. Crear usuario: `POST /api/users`
2. Login: `POST /api/sessions/login` → obtener token
3. Crear producto (admin) o usar seed
4. Hacer compra: `POST /api/purchase` con header `Authorization: Bearer <token>`

## Entrega
Subir repo a GitHub sin `node_modules`. Incluir `.env.example`.

