// pages/dashboard.js
import React from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const irBuscarEstudiante = () => {
    router.push("/buscar-estudiante");
  };

  const irOnboardingAvanzado = () => {
    router.push("/onboarding-avanzado");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Dashboard
      </h1>
      <div className="space-y-4">
        <button
          onClick={irBuscarEstudiante}
          className="w-full py-3 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          Onboarding
        </button>
        <button
          onClick={irOnboardingAvanzado}
          className="w-full py-3 px-4 rounded-md bg-green-500 text-white font-medium hover:bg-green-600"
        >
          Onboarding Avanzado
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
