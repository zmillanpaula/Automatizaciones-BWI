from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium_manager import SeleniumManager
from buscar_estudiante import login_y_buscar_estudiante
from asignar_nivel import asignar_nivel_campus
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

selenium_manager = SeleniumManager()  # Instancia global para manejar la sesión

# Configuración de logs
logging.basicConfig(level=logging.INFO)

@app.route('/buscar_estudiante', methods=['POST'])
def buscar_estudiante_endpoint():
    try:
        data = request.json
        username = data.get('admin_username')
        password = data.get('admin_password')
        correo = data.get('correo')

        if not all([username, password, correo]):
            return jsonify({"error": "Faltan datos requeridos"}), 400

        logging.info("Iniciando búsqueda de estudiante...")
        resultado = selenium_manager.run(
            lambda driver: login_y_buscar_estudiante(driver, username, password, correo)
        )
        logging.info(f"Resultado de búsqueda: {resultado}")
        return jsonify(resultado)
    except Exception as e:
        logging.error(f"Error en /buscar_estudiante: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/asignar_nivel', methods=['POST'])
def asignar_nivel_endpoint():
    try:
        data = request.json
        correo = data.get('correo')
        nivel = data.get('nivel')

        if not all([correo, nivel]):
            return jsonify({"error": "Faltan datos requeridos"}), 400

        logging.info("Iniciando asignación de nivel...")
        resultado = selenium_manager.run(
            lambda driver: asignar_nivel_campus(driver, correo, nivel)
        )
        logging.info(f"Resultado de asignación: {resultado}")
        return jsonify(resultado)
    except Exception as e:
        logging.error(f"Error en /asignar_nivel: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "¡Bienvenido al servidor Flask!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)