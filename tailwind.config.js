/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors
        magido: {
          blue: '#315687',
          'blue-light': '#4a7ab5',
          'blue-dark': '#1e3a5c',
          orange: '#eb6c1c',
          'orange-light': '#f5923f',
          'orange-dark': '#c55210',
        },
        // Semantic colors using brand
        primary: {
          50: '#f0f4f9',
          100: '#dce5f0',
          200: '#b9cbe1',
          300: '#8dabc9',
          400: '#5d87ae',
          500: '#315687',  // Main brand blue
          600: '#2a4a74',
          700: '#1e3a5c',
          800: '#152b45',
          900: '#0d1b2e',
          950: '#060f1a',
        },
        accent: {
          50: '#fef4ee',
          100: '#fde5d4',
          200: '#fbc8a8',
          300: '#f8a471',
          400: '#f5923f',
          500: '#eb6c1c',  // Main brand orange
          600: '#c55210',
          700: '#a33f0e',
          800: '#843312',
          900: '#6c2c13',
          950: '#3a1308',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(49, 86, 135, 0.08) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(49, 86, 135, 0.08) 1px, transparent 1px)`,
        'grid-pattern-dark': `linear-gradient(rgba(49, 86, 135, 0.15) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(49, 86, 135, 0.15) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'var(--color-text-secondary)',
            a: {
              color: theme('colors.magido.orange'),
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': { color: theme('colors.magido.orange-dark') },
            },
            strong: {
              color: 'var(--color-text)',
              fontWeight: '600',
            },
            'ul > li::marker': {
              color: theme('colors.magido.orange'),
            },
            'ol > li::marker': {
              color: theme('colors.magido.orange'),
            },
            p: { marginBottom: '0.75rem' },
            'p:last-child': { marginBottom: '0' },
          },
        },
        invert: {
          css: {
            color: 'var(--color-text-secondary)',
            strong: { color: 'var(--color-text)' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
