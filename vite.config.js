import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      // "9699-2401-4900-3b1c-602d-3978-1841-f496-3b3.ngrok-free.app",
    ], // Add your host here
  },
});
