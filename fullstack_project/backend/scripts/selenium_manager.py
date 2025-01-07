from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import logging

class SeleniumManager:
    def __init__(self):
        self.driver = None

    def __enter__(self):
        # Inicializa el WebDriver
        if not self.driver:
            self.start_driver()
        return self.driver

    def __exit__(self, exc_type, exc_value, traceback):
        # Cierra el WebDriver
        if self.driver:
            self.driver.quit()
            self.driver = None

    def run(self, operation):
        try:
            if not self.driver:
                self.start_driver()
            return operation(self.driver)
        except Exception as e:
            logging.error(f"Error en SeleniumManager: {e}")
            raise

    def start_driver(self):
        # Método para inicializar el WebDriver
        options = Options()
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        self.driver = webdriver.Remote(
            command_executor="http://selenium:4444/wd/hub",
            options=options
        )