import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email } = req.query; // Obtener el correo de los parámetros
  if (!email) {
    return res.status(400).json({ error: 'Falta el parámetro "email"' });
  }

  try {
    const API_KEY =
      "d2830a151e2d5ae79ee56b3bf8035c9728d27a1c75fbd2fe89eff5f11c57f078c0f93ae1";
    const API_URL = "https://sedsa.api-us1.com/api/3/contacts";
    const headers = { "Api-Token": API_KEY };

    const response = await axios.get(API_URL, {
      headers,
      params: { email },
    });

    if (response.data.contacts.length > 0) {
      res.status(200).json({ message: `Contacto encontrado: ${email}` });
    } else {
      res.status(404).json({ message: "El contacto no existe." });
    }
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    res.status(500).json({ error: "Error al conectar con la API externa." });
  }
}
