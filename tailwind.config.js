/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'media', //'media' ou 'class'
  theme: {
    extend: {colors: {
        // Cores semânticas para facilitar sua vida
        fundo: {
          claro: '#FFFFFF',
          escuro: '#09090b', // zinc-950
        },
        card: {
          claro: '#f4f4f5',  // zinc-100
          escuro: '#18181b', // zinc-900
        },
        texto: {
          principal: {
            claro: '#09090b', // zinc-950
            escuro: '#ffffff',
          },
          secundario: {
            claro: '#71717a', // zinc-500
            escuro: '#a1a1aa', // zinc-400
          }
        }},
    }
  },
  plugins: [],
}