import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      router.push("/dashboard"); // Redirige al dashboard si está autenticado
    } else {
      router.push("/login"); // Redirige al login si no está autenticado
    }
  }, []);

  return null; // No renderiza contenido mientras redirige
}
