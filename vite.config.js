import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "digimenu-frontend.vercel.app",
      "68a8-2401-4900-3b1c-602d-642f-3f69-e34e-2aff.ngrok-free.app",
    ], // Add your host here
  },
});
