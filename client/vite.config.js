import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: true,
        proxy: {
            "/api": {
                target: "http://localhost:8800",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [react()],
});
