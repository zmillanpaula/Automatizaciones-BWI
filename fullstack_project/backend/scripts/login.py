import sys
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

def main():
    logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
    driver = None
    try:
        username, password = sys.argv[1:]
        logging.info(f"Iniciando sesión con usuario: {username}")

        options = Options()
        #options.add_argument("--headless")  # Usar headless para ejecutar sin GUI
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")

        driver = webdriver.Remote(
            command_executor="http://selenium:4444/wd/hub",  # URL del contenedor Selenium
            options=options
        )
        driver.get("https://campusvirtual.bestwork.cl/login/index.php")
        logging.info("Página de inicio de sesión cargada.")

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "username"))
        ).send_keys(username)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "password"))
        ).send_keys(password)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "loginbtn"))
        ).click()
        logging.info("Inicio de sesión exitoso.")
    except Exception as e:
        logging.error(f"Error en el proceso de inicio de sesión: {e}")
    finally:
        if driver:
            driver.quit()

if __name__ == "__main__":
    main()
