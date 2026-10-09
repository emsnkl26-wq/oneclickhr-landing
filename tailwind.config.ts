import type { Config } from 'tailwindcss'

// Every color is an HSL triple CSS variable so Tailwind opacity modifiers
// (bg-brand-600/10) keep working and so dark mode can redefine the token
// instead of forcing a `dark:` variant on every element.
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: token('brand-50'),
          100: token('brand-100'),
          200: token('brand-200'),
          500: token('brand-500'),
          600: token('brand-600'),
          700: token('brand-700'),
          800: token('brand-800'),
          // `brand-ink` is the only orange allowed for body-size text:
          // brand-600 is 2.9:1 on white and fails WCAG AA.
          ink: token('brand-ink'),
        },
        charcoal: token('charcoal'),
        surface: {
          DEFAULT: token('surface'),
          card: token('surface-card'),
          muted: token('surface-muted'),
        },
        ink: {
          DEFAULT: token('ink'),
          muted: token('ink-muted'),
          subtle: token('ink-subtle'),
        },
        line: token('line'),
        success: token('success'),
        warning: token('warning'),
        info: token('info'),
        danger: token('danger'),
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: [
          'clamp(2.75rem, 5.2vw, 4.5rem)',
          { lineHeight: '1.04', letterSpacing: '-0.025em' },
        ],
        h1: ['clamp(2.25rem, 3.6vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
        h2: ['clamp(1.75rem, 2.6vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.25rem, 1.5vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.012em' }],
      },
      maxWidth: { content: '1200px' },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem' },
      boxShadow: {
        subtle: '0 1px 2px 0 hsl(var(--shadow) / 0.05)',
        lift: '0 8px 30px -12px hsl(var(--shadow) / 0.18)',
      },
      keyframes: {
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
      },
      animation: {
        'rise-in': 'rise-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 300ms ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
