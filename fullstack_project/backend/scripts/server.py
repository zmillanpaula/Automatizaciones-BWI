import os
from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS

# Crear la aplicación Flask
app = Flask(__name__)
CORS(app)

# Configurar rutas de scripts y entorno virtual
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VENV_PYTHON = "python3"
LOGIN_SCRIPT_PATH = os.path.join(BASE_DIR, 'login.py')
CREAR_USUARIO_SCRIPT_PATH = os.path.join(BASE_DIR, 'crear_usuario.py')

@app.route('/login', methods=['POST'], strict_slashes=False)
def login():
    try:
        app.logger.info("Solicitud recibida en /login")
        data = request.json
        if data is None:
            return jsonify({"error": "El cuerpo de la solicitud está vacío o no es JSON válido"}), 400
        
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Usuario y contraseña son obligatorios"}), 400

        result = subprocess.run(
            [VENV_PYTHON, LOGIN_SCRIPT_PATH, username, password],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        if result.returncode != 0:
            app.logger.error(f"Error ejecutando login.py: {result.stderr.strip()}")
            return jsonify({"error": result.stderr.strip()}), 500

        return jsonify({"message": "Inicio de sesión ejecutado.", "output": result.stdout.strip()})
    except Exception as e:
        app.logger.error(f"Error en /login: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    try:
        app.logger.info("Solicitud recibida en /crear_usuario")
        data = request.json
        if data is None:
            return jsonify({"error": "El cuerpo de la solicitud está vacío o no es JSON válido"}), 400

        nombre = data.get('nombre')
        apellido = data.get('apellido')
        correo = data.get('correo')
        telefono = data.get('telefono')
        rut = data.get('rut')

        if not all([nombre, apellido, correo, telefono, rut]):
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        result = subprocess.run(
            [VENV_PYTHON, CREAR_USUARIO_SCRIPT_PATH, nombre, apellido, correo, telefono, rut],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        if result.returncode != 0:
            app.logger.error(f"Error ejecutando crear_usuario.py: {result.stderr.strip()}")
            return jsonify({"error": result.stderr.strip()}), 500

        return jsonify({"message": "Usuario creado exitosamente.", "output": result.stdout.strip()})
    except Exception as e:
        app.logger.error(f"Error en /crear_usuario: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "¡Bienvenido al servidor Flask!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
