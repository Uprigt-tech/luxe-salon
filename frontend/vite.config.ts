import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        adminLoginRedirect: path.resolve(__dirname, 'admin-login.html'),
        adminDashboard: path.resolve(__dirname, 'admin-dashboard.html'),
        admin: path.resolve(__dirname, 'src/admin/index.html'),
      },
    },
  },
});
