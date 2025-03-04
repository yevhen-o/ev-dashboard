import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const ReactCompilerConfig = {
  /* ... */
};

// https://vite.dev/config/
export default defineConfig({
  base: "/ev-dashboard/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 51645, // Use the desired port
    strictPort: true, // Fail if the port is unavailable
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
