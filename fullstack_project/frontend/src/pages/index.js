import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState(""); // Guarda el correo electrónico ingresado por el usuario
  const [result, setResult] = useState(""); // Guarda el resultado de la búsqueda
  const [loading, setLoading] = useState(false); // Controla el estado de carga

  // Maneja la búsqueda de contactos
  const handleSearch = async (e) => {
    e.preventDefault(); // Previene el envío tradicional del formulario
    setLoading(true); // Activa el estado de carga
    setResult(""); // Limpia resultados previos

    try {
      // Realiza una solicitud GET al endpoint `/api/search`
      const res = await fetch(`/api/search?email=${encodeURIComponent(email)}`);
      const data = await res.json(); // Convierte la respuesta a JSON

      if (res.ok) {
        // Muestra el mensaje del servidor si la solicitud fue exitosa
        setResult(data.message);
      } else {
        // Muestra el error si ocurrió algún problema
        setResult(data.message || "Error al buscar el contacto.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setResult("Error al conectar con el servidor.");
    }

    setLoading(false); // Desactiva el estado de carga
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Buscar Contacto</h1>
      <form onSubmit={handleSearch}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Introduce el correo"
          required
          style={{
            padding: "10px",
            width: "300px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#ff7f50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </form>
      {loading && <p>Buscando...</p>}
      {result && <p>{result}</p>}
    </div>
  );
}
