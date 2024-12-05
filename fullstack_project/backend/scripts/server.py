from flask import Flask, request, jsonify
import subprocess  # Para ejecutar los scripts Python como procesos separados

# Crear la aplicación Flask
app = Flask(__name__)

# Endpoint para el script de login
@app.route('/login', methods=['POST'])
def login():
    try:
        # Obtener los datos enviados desde el cliente (frontend/backend)
        data = request.json
        username = data.get('username')
        password = data.get('password')

        # Validar los datos recibidos
        if not username or not password:
            return jsonify({"error": "Usuario y contraseña son obligatorios"}), 400

        # Ejecutar el script login.py con los argumentos
        result = subprocess.run(
            ['python3', 'login.py', username, password],  # Llamada al script con argumentos
            stdout=subprocess.PIPE,  # Captura la salida estándar
            stderr=subprocess.PIPE,  # Captura la salida de errores
            text=True  # Devuelve las salidas como cadenas de texto
        )

        # Validar si el script se ejecutó correctamente
        if result.returncode != 0:
            return jsonify({"error": result.stderr}), 500  # Enviar los errores al cliente

        # Devolver la salida estándar del script al cliente
        return jsonify({"message": "Inicio de sesión ejecutado.", "output": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Manejo de errores inesperados

# Endpoint para el script de creación de usuario
@app.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    try:
        # Obtener los datos enviados desde el cliente
        data = request.json
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        correo = data.get('correo')
        telefono = data.get('telefono')
        rut = data.get('rut')

        # Validar los datos recibidos
        if not all([nombre, apellido, correo, telefono, rut]):
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # Ejecutar el script crear_usuario.py con los argumentos
        result = subprocess.run(
            ['python3', 'crear_usuario.py', nombre, apellido, correo, telefono, rut],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        # Validar si el script se ejecutó correctamente
        if result.returncode != 0:
            return jsonify({"error": result.stderr}), 500

        # Devolver la salida estándar del script al cliente
        return jsonify({"message": "Usuario creado exitosamente.", "output": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Iniciar el servidor Flask
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Escucha en todas las interfaces de red y puerto 5000
