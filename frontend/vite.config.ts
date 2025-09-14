import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      protocol: 'ws',  // Asegura que use WebSockets
      host: 'frontend-center.local',  // Asegura que HMR funcione con el host correcto
      port: 5173, // Asegúrate de que coincida con el puerto de Vite
    },
    watch: {
      usePolling: true, // Necesario en Docker
    },
  },
})
