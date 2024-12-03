import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def main():
    try:
        username, password = sys.argv[1:]
        print(f"Iniciando sesión con usuario: {username}")

        driver = webdriver.Chrome()
        driver.get("https://campusvirtual.bestwork.cl/login/index.php")
        print("Página de inicio de sesión cargada.")

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "username"))
        ).send_keys(username)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "password"))
        ).send_keys(password)

        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "loginbtn"))
        ).click()
        print("Inicio de sesión exitoso.")
        driver.quit()
    except Exception as e:
        print(f"Error en el proceso de inicio de sesión: {e}")

if __name__ == "__main__":
    main()
