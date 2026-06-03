/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        portal: '#00FFD1',
        alien: '#B8FF00',
        glitch: '#FF2D6B',
        neon: '#00F0FF',
      },
      animation: {
        glitch: 'glitch 0.35s infinite',
        portalPulse: 'portalPulse 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-4px, 4px)' },
          '40%': { transform: 'translate(4px, -4px)' },
          '60%': { transform: 'translate(-2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        portalPulse: {
          '0%, 100%': { boxShadow: '0 0 30px #00FFD1, 0 0 60px #00FFD170' },
          '50%': { boxShadow: '0 0 50px #00FFD1, 0 0 100px #B8FF00' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    }
  },
  plugins: [],
}
