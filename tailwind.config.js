/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'border-animation': 'border-animation 6s ease infinite', // Animación del borde
        'bg-animation': 'bg-animation 40s ease infinite',         // Animación del fondo
      },
      keyframes: {
        'border-animation': {
          '0%': { borderColor: '#d1d5db' },  // Gris muy claro (slate-200)
          '25%': { borderColor: '#9ca3af' },  // Gris medio (slate-500)
          '50%': { borderColor: '#4b5563' },  // Gris oscuro (slate-700)
          '75%': { borderColor: '#9ca3af' },  // Gris medio (slate-500)
          '100%': { borderColor: '#d1d5db' }, // Gris muy claro (slate-200)
        },
        'bg-animation': {
          '0%': { backgroundColor: '#1e3a8a' },    // Azul oscuro
          '16%': { backgroundColor: '#3b82f6' },   // Azul brillante
          '33%': { backgroundColor: '#8b5cf6' },   // Morado brillante
          '50%': { backgroundColor: '#a855f7' },   // Morado claro
          '66%': { backgroundColor: '#6ee7b7' },    // Verde claro
          '83%': { backgroundColor: '#fca5a1' },    // Rojo suave
          '100%': { backgroundColor: '#1e3a8a' },   // Regresa al azul oscuro
        },
      },
      scale: {
        '102': '1.02',  // Agregar escala personalizada
        '103': '1.03',  // Puedes agregar más si es necesario
      },
    },
  },
  plugins: [],
}
