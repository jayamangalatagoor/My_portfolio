/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // CSS-variable backed so a single `.light` class flips the whole palette
        base:    'rgb(var(--c-base) / <alpha-value>)',   // page canvas
        raised:  'rgb(var(--c-raised) / <alpha-value>)',  // elevated surface / modal
        ink:     'rgb(var(--c-ink) / <alpha-value>)',     // primary text
        sub:     'rgb(var(--c-sub) / <alpha-value>)',     // secondary text
        faint:   'rgb(var(--c-faint) / <alpha-value>)',   // muted text
        line:    'rgb(var(--c-line) / <alpha-value>)',    // borders + subtle fills
        accent:  '#6366F1',  // single indigo accent (both themes)
        accent2: '#818CF8',  // accent light
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99,102,241,0.25), 0 8px 40px -8px rgba(99,102,241,0.45)',
        soft: '0 24px 60px -24px rgba(0,0,0,0.7)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'float': 'float 7s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};
