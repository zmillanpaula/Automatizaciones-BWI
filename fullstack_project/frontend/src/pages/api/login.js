import { exec } from "child_process";
import path from "path";

const validUsers = [
  { username: "16244610k", password: "EnterTheMatrix_V7" },
  { username: "user1@example.com", password: "mypassword456" },
];

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Usa POST." });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña son obligatorios." });
  }

  // Validar si las credenciales están en la lista
  const isValid = validUsers.some(
    (user) => user.username === username && user.password === password
  );

  if (!isValid) {
    return res.status(401).json({ error: "Credenciales inválidas." });
  }

  // Ruta al script Python
  const scriptPath =
    "/Users/paula/backend_bwi/fullstack_project/backend/scripts/login.py";

  const comando = `python3 ${scriptPath} ${username} ${password}`;
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `Error ejecutando el script de inicio de sesión: ${error.message}`
      );
      return res
        .status(500)
        .json({ error: "Error en el proceso de inicio de sesión." });
    }

    if (stderr) {
      console.error(`Error en el script: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    res
      .status(200)
      .json({ message: "Inicio de sesión exitoso.", output: stdout });
  });
}
