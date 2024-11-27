const { Builder } = require("selenium-webdriver");

(async function testChrome() {
  // Configurar el driver de Chrome
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Abrir Google
    await driver.get("https://www.google.com");

    // Obtener el título de la página
    let title = await driver.getTitle();
    console.log("Título de la página:", title);
  } finally {
    // Cerrar el navegador
    await driver.quit();
  }
})();
