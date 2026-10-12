import { readFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Publica src/data/catalogo.json en /catalogo.json para que n8n calcule
// el monto y la firma de Wompi con los mismos precios del sitio.
const CATALOGO = "src/data/catalogo.json";
function publicarCatalogo(): Plugin {
  return {
    name: "publicar-catalogo",
    configureServer(server) {
      server.middlewares.use("/catalogo.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(readFileSync(CATALOGO, "utf8"));
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "catalogo.json", source: readFileSync(CATALOGO, "utf8") });
    },
  };
}

export default defineConfig({
  plugins: [
    publicarCatalogo(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
});
