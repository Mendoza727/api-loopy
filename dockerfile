# Usa una imagen base de Node.js (si estás trabajando con Node.js, por ejemplo)
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de tu aplicación
RUN npm install

RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libpango1.0-dev \
    libpixman-1-dev \
    libgtk2.0-dev
    
# Copia todos los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto de tu aplicación (puede ser otro, dependiendo de tu configuración)
EXPOSE 8081

# Define el comando para arrancar tu aplicación
CMD ["npm", "start"]
