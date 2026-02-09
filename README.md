# Backend-II (Entrega 1)

## Resumen
API REST para un ecommerce con CRUD de usuarios y autenticación/autorización usando Passport (local + JWT).  
Contraseñas encriptadas con `bcrypt.hashSync`. Modelo `User` incluye `first_name`, `last_name`, `email` único, `age`, `password` (hash), `cart` (ref a Carts) y `role` por defecto `user`.

## Estructura