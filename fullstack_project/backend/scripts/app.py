from flask import Flask, jsonify
from fullstack_project.backend.scripts.selenium_service import run_selenium_task

app = Flask(__name__)

@app.route('/run-selenium', methods=['GET'])
def selenium_task():
    try:
        # Ejecuta la función que contiene la lógica de Selenium
        run_selenium_task()
        return jsonify({"message": "Selenium task completed successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)