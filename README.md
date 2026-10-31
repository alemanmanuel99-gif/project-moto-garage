# Moto Garage

Aplicación web para buscar motocicletas por marca o modelo y consultar su ficha técnica: motor, cilindrada, potencia, torque, velocidad máxima, peso y más. Es el proyecto final del programa de desarrollo web de TripleTen.

## Funcionalidad

- **Buscador** por marca o por modelo. La búsqueda se hace solo al enviar el formulario.
- **Tarjetas con ficha técnica** de cada moto. Como el servicio de datos no ofrece fotos, cada tipo de moto (deportiva, cruiser, off-road, scooter y demás) se representa con un ícono SVG propio.
- **"Mostrar más"**: los resultados se muestran de 6 en 6.
- **Estados de la interfaz**: indicador de carga mientras llega la respuesta, mensaje cuando no hay resultados y mensajes de error claros (por ejemplo, cuando se agota el límite de búsquedas por hora del servicio).
- **Página "Sobre el autor"**.
- **Diseño adaptable** desde 320px hasta escritorio.

## Tecnologías

- **React** + **TypeScript**, con **Vite** como herramienta de construcción
- **React Router** para la navegación entre páginas
- **API Ninjas – Motorcycles** como fuente de datos (third-party), consumida con `fetch`
- CSS con metodología **BEM**, Flexbox y Grid; **normalize.css** y la fuente **Inter** alojadas en el proyecto
- **oxlint** como linter
- Despliegue en **Vercel**

## Cómo ejecutarlo en local

```bash
cd client
npm install
```

Crea `client/.env` a partir de `client/.env.example` y pega tu clave de [API Ninjas](https://api-ninjas.com):

```
VITE_API_NINJAS_KEY=tu_clave_de_api_ninjas
```

Después:

```bash
npm run dev
```

## Créditos

Datos de motocicletas proporcionados por [API Ninjas](https://api-ninjas.com).
