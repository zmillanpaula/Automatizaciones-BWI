/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: "http://127.0.0.1:5003/login", // Redirige el endpoint de login al backend Flask
      },
      {
        source: "/api/crear_usuario",
        destination: "http://127.0.0.1:5003/crear_usuario", // Redirige el endpoint de creación de usuarios al backend Flask
      },
    ];
  },
};

export default nextConfig;
