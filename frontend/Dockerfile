# Usar una imagen base oficial de Node.js
FROM node:latest

# Establecer el directorio de trabajo
WORKDIR /frontend-center

# Copiar package.json y package-lock.json
COPY package*.json ./

# Eliminar node_modules y package-lock.json si existen
RUN rm -rf node_modules package-lock.json

# Instalar las dependencias sin las dependencias opcionales
RUN npm install

# Exponer el puerto 5173 (puerto predeterminado de Vite)
EXPOSE 5173

# Ejecutar el servidor de desarrollo de Vite
CMD ["npm", "run", "dev"]
