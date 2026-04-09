import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        urbanist: ['var(--font-urbanist)', 'sans-serif'],
      },
      colors: {
        surface: {
          page: 'var(--surface-page)',
          raised: 'var(--surface-raised)',
          overlay: 'var(--surface-overlay)',
          active: 'var(--surface-active)',
        },
        content: {
          strong: 'var(--content-strong)',
          default: 'var(--content-default)',
          subtle: 'var(--content-subtle)',
        },
        interactive: {
          default: 'var(--interactive-default)',
          hover: 'var(--interactive-hover)',
          pressed: 'var(--interactive-pressed)',
        },
        border: {
          default: 'var(--border-default)',
          strong: 'var(--border-strong)',
          active: 'var(--border-active)',
        },
      },
    },
  },
  plugins: [],
}

export default config
