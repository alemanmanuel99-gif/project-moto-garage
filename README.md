# Moto Garage

Aplicación web full stack para buscar motocicletas por marca o modelo, consultar su ficha técnica y guardar las que te interesan en tu propio garage, con tu calificación, tu estado y una reseña breve. Es el proyecto final del programa de desarrollo web de TripleTen.

## Despliegue

- **Front end:** https://project-moto-garage.vercel.app
- **API:** https://project-moto-garage-api.vercel.app

## Funcionalidad

- **Buscador** por marca o por modelo, con datos de API Ninjas. Valida que la búsqueda no esté vacía ni tenga solo espacios.
- **Tarjetas con ficha técnica**. Como el servicio de datos no ofrece fotos, cada tipo de moto (deportiva, cruiser, off-road, scooter y demás) se representa con un ícono SVG propio. Los resultados se muestran de 6 en 6 con "Mostrar más".
- **Registro e inicio de sesión** en ventanas modales. Los errores del servidor se muestran encima del botón.
- **Encabezado según la sesión**: sin sesión muestra "Iniciar sesión"; con sesión, el enlace a "Mi garage" y "Cerrar sesión".
- **Mi garage** (ruta protegida `/garage`): cada persona guarda motos con una calificación del 1 al 5, un estado (la quiero, la probé, la tengo) y una reseña, y solo ve las suyas. Quien abre la ruta sin sesión es enviado al inicio de sesión.
- **Avisos** después de cada acción: registro, inicio y cierre de sesión, moto guardada o eliminada.
- **Sesión persistente**: el token se guarda en `localStorage`; al volver, la sesión se recupera con `GET /users/me` y, si el token ya no sirve, se borra.
- **Diseño adaptable** desde 320px hasta escritorio.

## Tecnologías

**Front end (`client`)**

- React + TypeScript, con Vite
- React Router, `createContext` para el usuario actual
- `fetch` en `utils/`: `motorcyclesApi.ts` (API Ninjas), `mainApi.ts` (API propia) y `auth.ts` (registro e inicio de sesión)
- CSS con BEM, Flexbox y Grid; normalize.css y la fuente Inter alojadas en el proyecto
- oxlint

**Back end (`server`)**

- Node.js + Express + TypeScript
- MongoDB (Atlas) con Mongoose
- bcrypt para las contraseñas y JWT con caducidad de 7 días
- express-rate-limit en `/signup` y `/signin` (responde 429)
- Manejo de errores centralizado; ESLint

## API

| Método | Ruta | Autorización | Descripción |
|---|---|---|---|
| GET | `/health` | No | Estado del servidor |
| POST | `/signup` | No | Crea una cuenta (`name`, `email`, `password`) |
| POST | `/signin` | No | Devuelve el JWT y los datos de la cuenta |
| GET | `/users/me` | Sí | Datos de quien tiene la sesión abierta |
| GET | `/garage` | Sí | Motos guardadas por esa persona |
| POST | `/garage` | Sí | Guarda una moto (`make`, `model`, `year`, `rating`, `status`, `review`) |
| DELETE | `/garage/:id` | Sí | Elimina una moto propia (403 si es de otra persona) |

De API Ninjas solo se guarda lo que identifica cada moto (marca, modelo y año); el resto son datos de cada persona.

## Cómo ejecutarlo en local

1. Instala las dependencias de las dos partes:

   ```bash
   npm run install:all
   ```

2. Crea `server/.env` a partir de `server/.env.example`. Para `JWT_SECRET`, genera una clave con:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Crea `client/.env` a partir de `client/.env.example` y pega tu clave de [API Ninjas](https://api-ninjas.com).

4. Con MongoDB en ejecución, levanta las dos partes:

   ```bash
   npm run dev
   ```

   El front end abre en `http://localhost:5173` y la API en `http://localhost:3001`. También puedes levantarlas por separado con `npm run dev:server` y `npm run dev:client`.

## Créditos

Datos de motocicletas proporcionados por [API Ninjas](https://api-ninjas.com).
