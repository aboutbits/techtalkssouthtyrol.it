import formatjs from '@aboutbits/eslint-config/configs/formatjs'
import react from '@aboutbits/eslint-config/configs/react'
import tailwind from '@aboutbits/eslint-config/configs/tailwind'
import ts from '@aboutbits/eslint-config/configs/ts'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ts,
  react,
  tailwind,
  formatjs,
  {
    ignores: ['node_modules', '.next'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    rules: {
      'better-tailwindcss/no-unknown-classes': [
        'error',
        // The plugin does not recognize custom utilities with Tailwind 3,
        // so we ignore the custom pastel background from globals.css
        { ignore: ['^bg-pastel$'] },
      ],
    },
  },
])
