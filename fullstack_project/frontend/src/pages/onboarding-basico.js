import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../utils/axiosClient";

const OnboardingBasico = () => {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [nivel, setNivel] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [asignacionConfirmada, setAsignacionConfirmada] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (!router.query.correo) {
        setMessage({ text: "No se proporcionó un correo.", type: "error" });
      } else {
        setCorreo(router.query.correo);
      }
    }
  }, [router.isReady, router.query]);

  const manejarAsignacion = async () => {
    if (!nivel) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/asignar_nivel", {
        correo,
        nivel,
      });

      if (response.data.message) {
        setAsignacionConfirmada(true);
        setMessage({ text: response.data.message, type: "success" });
      } else {
        setMessage({
          text: response.data.error || "Error desconocido",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Error al comunicarse con el servidor",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const cerrarOnboarding = () => {
    router.push("/cierreOnboarding");
  };

  const volverDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Onboarding Campus Virtual Niveles Básicos
      </h2>

      {correo && (
        <p className="text-center text-gray-600 mb-4">
          Asignando para: <span className="font-semibold">{correo}</span>
        </p>
      )}

      <div className="mb-4">
        <label
          htmlFor="nivel"
          className="block text-sm font-medium text-gray-700"
        >
          Selecciona el Nivel del estudiante y confirma su asignación
        </label>
        <select
          id="nivel"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Seleccionar...</option>
          <option value="1A">1A</option>
          <option value="1B">1B</option>
          <option value="2A">2A</option>
          <option value="2B">2B</option>
        </select>
      </div>

      {message?.text && (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        onClick={manejarAsignacion}
        disabled={!correo || !nivel || loading}
        className={`w-full py-2 px-4 mb-4 rounded-md font-medium text-white ${
          !correo || !nivel || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Asignando..." : "Confirmar Asignación"}
      </button>

      {asignacionConfirmada && (
        <button
          onClick={cerrarOnboarding}
          className="w-full py-2 px-4 mb-4 rounded-md bg-green-500 text-white font-medium hover:bg-green-600"
        >
          Finalizar Onboaring
        </button>
      )}

      <button
        onClick={volverDashboard}
        className="w-full py-2 px-4 rounded-md bg-gray-600 text-white font-medium hover:bg-gray-700"
      >
        Volver al Dashboard
      </button>
    </div>
  );
};

export default OnboardingBasico;
