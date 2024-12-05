export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Usa POST." });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son obligatorios." });
  }

  // Validar credenciales contra la lista de usuarios válidos
  const validUsers = [
    { username: "16244610k", password: "EnterTheMatrix_V7" },
    { username: "user1@example.com", password: "mypassword456" },
  ];

  const isValid = validUsers.some(
    (user) => user.username === username && user.password === password
  );

  if (!isValid) {
    return res.status(401).json({ error: "Credenciales inválidas." });
  }

  try {
    // Enviar solicitud al contenedor de Selenium Python
    const response = await fetch("http://selenium-python:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data); // Respuesta del contenedor
    } else {
      return res.status(response.status).json(data); // Error devuelto por el contenedor
    }
  } catch (error) {
    console.error("Error conectando al servicio selenium-python:", error);
    return res.status(500).json({ error: "Error conectando al contenedor." });
  }
}
