// import { COLORS } from './src/utils/app_color'
/** @type {import('tailwindcss').Config} */

module.exports = {
  // darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        // ...COLORS,
        neutral: {
          900: '#242424',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    fontFamily: {
      sans: ['var(--font-inter)'],
    },
  },
  plugins: [
    // import('tailwindcss-animate'),
    // import('@tailwindcss/typography'),
    // import('tailwind-scrollbar'),
  ],
}
