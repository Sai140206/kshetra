/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
        harvest: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706', // Warm Mustard accent
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        soil: {
          50: '#FAF8F5',
          100: '#F5EFE6',
          200: '#E8DCCB',
          800: '#452A18',
          900: '#2C1B10',
        },
        surface: {
          light: '#F8FAF6',
          mint: '#F0FDF4',
          card: '#FFFFFF',
          sunlight: '#FEFEFA',
        }
      },
      fontFamily: {
        sans: [
          'Mukta',
          'Noto Sans Devanagari',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
      boxShadow: {
        'farmer': '0 4px 20px -2px rgba(20, 83, 45, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'farmer-lg': '0 10px 25px -3px rgba(20, 83, 45, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'sos': '0 0 0 8px rgba(239, 68, 68, 0.2), 0 10px 25px -3px rgba(239, 68, 68, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
