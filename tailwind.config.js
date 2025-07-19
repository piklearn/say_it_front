// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'click-effect': 'clickEffect 0.4s ease-out',
      },
      keyframes: {
        clickEffect: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '75%': { transform: 'scale(1.05) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0)' },
        }
      }
    }
  }
}