import { exec } from "child_process";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido. Usa POST." });
  }

  const { nombre, apellido, correo, telefono, rut } = req.body;

  // Validar los datos
  if (!nombre || !apellido || !correo || !telefono || !rut) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  // Ruta al script Python (usando la ruta absoluta correcta)
  const scriptPath =
    "/Users/paula/backend_bwi/fullstack_project/backend/scripts/crear_usuario.py";

  // Ejecutar el script de Python con los argumentos
  const comando = `python3 ${scriptPath} ${nombre} ${apellido} ${correo} ${telefono} ${rut}`;
  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error ejecutando el script: ${error.message}`);
      return res
        .status(500)
        .json({ error: "Error ejecutando el script de Python." });
    }

    if (stderr) {
      console.error(`Error en el script de Python: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    // Responder con la salida del script
    res
      .status(200)
      .json({ message: "Usuario creado exitosamente.", output: stdout });
  });
}
