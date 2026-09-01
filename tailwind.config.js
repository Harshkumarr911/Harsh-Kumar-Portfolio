/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0e17',
        ink2: '#0e1526',
        ink3: '#121b30',
        panel: '#111a2e',
        line: 'rgba(233,231,222,0.12)',
        paper: '#f2efe6',
        paperDim: '#c7c9d4',
        slate: '#8891a6',
        mint: '#7fe7c4',
        mintDim: 'rgba(127,231,196,0.14)',
        amber: '#f2c14e',
        coral: '#e8836b',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: {
        xl2: '22px',
      },
      keyframes: {
        blink: { '50%': { opacity: 0 } },
        marquee: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        marquee: 'marquee 24s linear infinite',
      },
    },
  },
  plugins: [],
}
