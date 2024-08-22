import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde .env
dotenv.config();

export default defineConfig({
  plugins: [react()]
});