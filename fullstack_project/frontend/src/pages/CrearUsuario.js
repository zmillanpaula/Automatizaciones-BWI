import { useState } from "react";
import { useRouter } from "next/router";

export default function CrearUsuario() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    rut: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter(); // Usar el router para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/crearusuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setResponseMessage(data.message);
      } else {
        setResponseMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error al enviar la solicitud:", err);
      setResponseMessage("Error al enviar la solicitud.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    router.push("/dashboard"); // Redirige al dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Crear Usuario</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="rut"
            placeholder="RUT"
            value={formData.rut}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-md hover:bg-green-600 transition"
          >
            Crear Usuario
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
        {/* Botón de Volver */}
        <button
          onClick={handleBack}
          className="w-full mt-4 bg-gray-500 text-white font-bold py-3 rounded-md hover:bg-gray-600 transition"
        >
          Volver al Dashboard
        </button>
      </div>
    </div>
  );
}
