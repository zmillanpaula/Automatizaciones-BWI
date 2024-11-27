const express = require("express");
const { Builder } = require("selenium-webdriver");
require("selenium-webdriver/firefox");
require("selenium-webdriver/chrome");

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Endpoint para automatizar con Selenium
app.post("/automatizar", async (req, res) => {
  const { url, browser } = req.body;

  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ success: false, error: "URL inválida" });
  }
  if (!browser || !["chrome", "firefox"].includes(browser)) {
    return res
      .status(400)
      .json({
        success: false,
        error: 'Navegador no soportado. Usa "chrome" o "firefox".',
      });
  }

  try {
    // Conexión al servidor Selenium en Docker
    let driver = await new Builder()
      .usingServer("http://selenium-server:4444/wd/hub") // URL del contenedor Selenium
      .forBrowser(browser) // 'chrome' o 'firefox'
      .build();

    // Abrir la URL
    await driver.get(url);

    // Capturar el título de la página
    const title = await driver.getTitle();
    console.log(`Título de la página (${browser}):`, title);

    // Cerrar el navegador
    await driver.quit();

    res.json({ success: true, browser, title });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
