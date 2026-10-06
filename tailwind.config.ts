import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
    },
    colors: {
      current: 'currentColor',
      transparent: 'rgba(0, 0, 0, 0)',
      white: '#ffffff',
      gray: {
        10: '#e8e8e8',
        20: '#d1d1d1',
        30: '#bababa',
        40: '#a3a3a3',
        50: '#878787',
        60: '#717171',
        70: '#5c5c5c',
        80: '#454545',
        90: '#303030',
        DEFAULT: '#191919',
      },
      lavender: '#e5d7ff',
      mint: '#d2faf0',
      yellow: '#fff5d2',
      violet: '#3d0078',
      green: '#003a20',
      brown: '#6f3c00',
    },
    fontFamily: {
      sans: ['Soehne', 'Arial', 'Helvetica', 'sans-serif'],
    },
    fontSize: {
      h1: ['7.5rem', '7.5rem'],
      h2: ['5.625rem', '5.625rem'],
      h3: ['4.375rem', '4.6875rem'],
      h4: ['2.8125rem', '3.125rem'],
      h5: ['2.25rem', '2.625rem'],
      lg: ['1.5rem', '2rem'],
      md: ['1.25rem', '1.75rem'],
      sm: ['0.875rem', '1.25rem'],
    },
    extend: {
      flex: {
        '2': '2 2 0%',
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        30: '7.5rem',
        45: '11.25rem',
      },
      listStyleType: {
        square: 'square',
      },
    },
  },
  plugins: [],
}
export default config
