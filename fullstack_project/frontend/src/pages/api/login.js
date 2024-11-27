import { Builder, By, until } from "selenium-webdriver";

export default async function handler(req, res) {
  // Aceptar solo solicitudes POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Extraer los datos del cuerpo de la solicitud
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros: username y password" });
  }

  let driver;

  try {
    // Conectar a Selenium en Docker
    driver = await new Builder()
      .usingServer("http://localhost:4444/wd/hub") // URL del servidor Selenium
      .forBrowser("chrome") // Usar Chrome
      .build();

    // Navegar a la página de inicio de sesión
    await driver.get("https://campusvirtual.bestwork.cl/login/");

    // Completar el formulario de inicio de sesión
    const usernameField = await driver.findElement(By.id("username"));
    const passwordField = await driver.findElement(By.id("password"));
    const loginButton = await driver.findElement(By.id("loginbtn"));

    await usernameField.sendKeys(username); // Ingresar el nombre de usuario
    await passwordField.sendKeys(password); // Ingresar la contraseña
    await loginButton.click(); // Hacer clic en el botón de inicio de sesión

    // Esperar hasta que la URL cambie indicando un inicio exitoso
    await driver.wait(until.urlContains("dashboard"), 5000); // Cambia 'dashboard' por la URL esperada

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error en Selenium:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
  } finally {
    if (driver) {
      await driver.quit(); // Cerrar el navegador
    }
  }
}
