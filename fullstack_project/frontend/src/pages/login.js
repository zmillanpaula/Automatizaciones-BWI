import { useState } from "react";
import { useRouter } from "next/router";
import axiosClient from "../../utils/axiosClient"; // Importa el cliente configurado

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("Procesando tu solicitud, por favor espera...");

    try {
      // Enviar solicitud usando axiosClient
      const res = await axiosClient.post("/login", formData);
      const { token } = res.data; // Extrae el token de la respuesta

      // Guarda el token y la autenticación en el almacenamiento local
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", true);

      setResponseMessage("¡Inicio de sesión exitoso! Redirigiendo...");
      setTimeout(() => router.push("/dashboard"), 2000); // Redirige al dashboard
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      // Muestra el mensaje de error devuelto por el servidor o uno predeterminado
      setResponseMessage(
        `Error: ${
          err.response?.data?.error ||
          "Credenciales inválidas o error del servidor."
        }`
      );
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-center mb-4">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-bold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        {responseMessage && (
          <div
            className={`mt-4 p-3 text-center rounded-md ${
              responseMessage.startsWith("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {responseMessage}
          </div>
        )}
      </div>
    </div>
  );
}
