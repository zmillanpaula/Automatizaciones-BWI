import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      router.push("/login"); // Redirige al login si no está autenticado
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Panel de Opciones
        </h1>
        <p>Selecciona una acción:</p>
        <button
          onClick={() => router.push("/crear-usuario")}
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition mt-4"
        >
          Crear Usuario
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("isAuthenticated");
            router.push("/login");
          }}
          className="w-full bg-red-500 text-white font-bold py-3 rounded-md hover:bg-red-600 transition mt-4"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
