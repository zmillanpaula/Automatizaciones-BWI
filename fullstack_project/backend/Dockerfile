# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install
COPY . .

# Expone el puerto 5000
EXPOSE 5000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
