import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      current: 'currentColor',
      transparent: 'rgba(0, 0, 0, 0)',
      white: '#ffffff',
      navy: {
        DEFAULT: '#071b2d',
        light: '#0f2840',
      },
      slate: {
        DEFAULT: '#31404f',
        light: '#4a5a6a',
        muted: '#a3b0bd',
      },
      cream: '#fef3ce',
      blush: '#fbdcda',
      mist: '#bcd5dc',
      sky: '#a0d4e0',
    },
    fontFamily: {
      sans: ['var(--font-inter)', 'Arial', 'Helvetica', 'sans-serif'],
    },
    fontSize: {
      display: [
        'clamp(3.5rem, 11vw, 9rem)',
        { lineHeight: '0.95', letterSpacing: '-0.04em' },
      ],
      h1: [
        'clamp(2.75rem, 7vw, 5.5rem)',
        { lineHeight: '1', letterSpacing: '-0.035em' },
      ],
      h2: [
        'clamp(2.25rem, 5vw, 4rem)',
        { lineHeight: '1.05', letterSpacing: '-0.03em' },
      ],
      h3: [
        'clamp(1.5rem, 3vw, 2.25rem)',
        { lineHeight: '1.15', letterSpacing: '-0.02em' },
      ],
      xl: ['1.75rem', '2.25rem'],
      lg: ['1.375rem', '2rem'],
      md: ['1.125rem', '1.75rem'],
      base: ['1rem', '1.5rem'],
      sm: ['0.875rem', '1.25rem'],
      xs: ['0.75rem', '1rem'],
    },
    extend: {
      spacing: {
        18: '4.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        content: '80rem',
      },
      // The keyframes use "translate" and not "transform", so that they do not
      // block transform utilities such as hover:-translate-y-1
      keyframes: {
        enter: {
          from: { opacity: '0', translate: '0 1rem' },
        },
        'brace-in': {
          from: { opacity: '0', translate: '30% 0' },
        },
      },
      animation: {
        enter: 'enter 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'brace-in': 'brace-in 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
}
export default config
