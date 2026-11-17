# Tobyas by huellitas

Proyecto de React: una página web para adoptar perritos en Bogotá. Se pueden ver los perritos disponibles, buscarlos por raza, filtrarlos por tamaño, ver la ficha de cada uno con sus datos y la ubicación del refugio, agendar una visita viendo el clima del día y enviar una solicitud de adopción.

Hecho con React, TypeScript, Vite y Tailwind CSS.

Hecho por: Hanna Gabriela Castaño Beltrán

## Ver la página

https://tobyas-huellitas.vercel.app/

## APIs que usa

- **TheDogAPI**: razas de perros con foto, temperamento, peso, altura y años de vida.
- **Open-Meteo**: pronóstico del clima en Kennedy para el día de la visita.
- **OpenStreetMap**: mapa con la ubicación del refugio.

## Páginas

1. **Inicio**: perrito destacado, buscador, categorías por tamaño y lista de sugeridos.
2. **Ficha**: foto, datos de la raza, temperamento, descripción y mapa del refugio.
3. **Agendar visita**: elegir día, horario y número de personas, con el clima del día.
4. **Solicitud**: formulario con validaciones y confirmación con código.

## Cómo abrirlo en tu computador

1. Clona el repositorio:
   ```bash
   git clone https://github.com/gabycastb-prog/tobyas-huellitas.git
   ```
2. Entra a la carpeta:
   ```bash
   cd tobyas-huellitas
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea un archivo `.env.local` en la carpeta del proyecto con tu key de TheDogAPI (se saca gratis en thedogapi.com):
   ```
   VITE_DOG_API_KEY=tu_key
   ```
5. Corre el proyecto:
   ```bash
   npm run dev
   ```
6. Abre http://localhost:5173 en el navegador.