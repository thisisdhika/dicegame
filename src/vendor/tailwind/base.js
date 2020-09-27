const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addBase, theme, config }) {
  addBase({
    html: {
      fontFamily: config('theme.fontFamily.roboto'),
    },
    h1: {
      fontSize: config('theme.fontSize.4xl'),
      lineHieght: config('theme.lineHeight.tight'),
      marginBottom: config('theme.spacing.3'),
    },
    h2: {
      fontSize: config('theme.fontSize.3xl'),
      lineHieght: config('theme.lineHeight.tight'),
      marginBottom: config('theme.spacing.2'),
    },
    h3: {
      fontSize: config('theme.fontSize.2xl'),
      lineHieght: config('theme.lineHeight.tight'),
      marginBottom: config('theme.spacing.1'),
    },
    p: {
      display: 'block',
      marginBottom: config('theme.spacing.1'),
      lineHeight: 1.7,
    },
  })
})
