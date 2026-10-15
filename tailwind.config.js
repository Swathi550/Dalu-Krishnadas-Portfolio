export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#de1b1c',
        'ink-hot': '#ff2a2b',
        accent: '#D90429',
        paper: '#ededed',
        black: '#000000',
        dark: '#060505',
        'dark-plate': '#0a090b',
        dim: '#8a8a8a',
        dimmer: '#4e4e4e',
        gold: '#ffa03c',
        'gold-light': '#EAD7BA',
        amber: '#ffa03c',
        cream: '#f4e9dc',
        soft: '#121216',
        muted: '#8a8a8a'
      },
      fontFamily: {
        anton: ['"Anton"', 'Impact', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        bodoni: ['"Bodoni Moda"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        display: ['"Anton"', '"Playfair Display"', 'Impact', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  }
}
