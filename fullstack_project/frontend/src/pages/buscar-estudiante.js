// pages/buscar-estudiante.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "../../utils/axiosClient";

const BuscarEstudiante = () => {
  const router = useRouter();
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [correo, setCorreo] = useState("");
  const [resultado, setResultado] = useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const manejarBusqueda = async (e) => {
    e.preventDefault();
    setResultado("");
    setUsuarioEncontrado(false);
    setCargando(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/buscar_estudiante`,
        {
          admin_username: adminUsername,
          admin_password: adminPassword,
          correo,
        }
      );

      console.log("Respuesta del backend:", response.data);

      setCargando(false);

      if (response.data.existe) {
        setUsuarioEncontrado(true);
        setResultado(`Estudiante encontrado: ${response.data.nombre}`);
      } else {
        setResultado(response.data.error || "No se encontró el estudiante.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setCargando(false);
      setResultado("Error al comunicarse con el servidor.");
    }
  };

  const irAsignacionBasica = () => {
    router.push({
      pathname: "/onboarding-basico",
      query: { correo },
    });
  };

  const irAsignacionAvanzada = () => {
    router.push({
      pathname: "/onboarding-avanzado",
      query: { correo },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Buscar Estudiante
      </h2>
      <form onSubmit={manejarBusqueda} className="space-y-4">
        <div>
          <label
            htmlFor="adminUsername"
            className="block text-sm font-medium text-gray-700"
          >
            Usuario Admin
          </label>
          <input
            type="text"
            id="adminUsername"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            placeholder="Ingresa tu usuario"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="adminPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña Admin
          </label>
          <input
            type="password"
            id="adminPassword"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Espacio adicional entre login y búsqueda */}
        <div className="mt-6">
          <label
            htmlFor="correo"
            className="block text-sm font-medium text-gray-700"
          >
            Correo del estudiante
          </label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa el correo"
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md font-medium text-white ${
            cargando
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={cargando}
        >
          {cargando ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {resultado && (
        <div
          className={`mt-6 p-4 rounded-md ${
            usuarioEncontrado
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {resultado}
        </div>
      )}

      {usuarioEncontrado && (
        <div className="mt-6 space-y-4">
          <h5 className="text-lg font-semibold text-gray-700">
            Acciones disponibles:
          </h5>
          <button
            className="w-full py-2 px-4 rounded-md bg-green-500 text-white font-medium hover:bg-green-600"
            onClick={irAsignacionBasica}
          >
            Asignación Niveles Básicos (1A - 2B)
          </button>
          <button
            className="w-full py-2 px-4 rounded-md bg-yellow-500 text-white font-medium hover:bg-yellow-600"
            onClick={irAsignacionAvanzada}
          >
            Asignación Niveles Avanzados (3A - 6B)
          </button>
        </div>
      )}
    </div>
  );
};

export default BuscarEstudiante;
