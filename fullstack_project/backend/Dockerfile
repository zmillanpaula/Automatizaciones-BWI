# Usa una imagen base de Python
FROM python:3.9

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los requisitos del backend
COPY scripts/requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código fuente del backend
COPY . .

# Expone el puerto donde corre Flask
EXPOSE 5001

# Comando para ejecutar la aplicación del backend
CMD ["python3", "scripts/server.py"]
