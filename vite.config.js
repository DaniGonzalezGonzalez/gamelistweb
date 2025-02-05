import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { VitePWA } from 'vite-plugin-pwa';

// Cargar las variables de entorno desde .env
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ // Aquí agregamos el plugin de PWA
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.png', 'robots.txt'], // Archivos estáticos
      manifest: {
        name: 'GameList',
        short_name: 'GameList',
        description: 'Una aplicación web para gestionar tus juegos',
        theme_color: '#020617', // Color slate-950 en hexadecimal
        background_color: '#020617', // Color purple en hexadecimal
        start_url: '.', // La URL de inicio, puede ser relativa
        display: 'standalone', // Define la visualización como una app sin la interfaz del navegador
        icons: [
          {
            src: '/favicon.png', // Usa tu favicon como ícono
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon.png', // El mismo favicon para el ícono grande
            sizes: '512x512',
            type: 'image/png',
          },
        ],
 // Agregar pantallas de carga
        // splash_pages: [
        //   {
        //     src: '/splash-320x480.png',
        //     sizes: '320x480',
        //     type: 'image/png',
        //   },
        //   {
        //     src: '/splash-640x960.png',
        //     sizes: '640x960',
        //     type: 'image/png',
        //   },
        //   {
        //     src: '/splash-750x1334.png',
        //     sizes: '750x1334',
        //     type: 'image/png',
        //   },
        //   {
        //     src: '/splash-1080x1920.png',
        //     sizes: '1080x1920',
        //     type: 'image/png',
        //   },
        // ],
      },
    }),
  ],
});
