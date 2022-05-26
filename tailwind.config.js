module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
    // "./nuxt.config.{js,ts}",
  ],
  plugins: [require('daisyui')],
  theme: {
    extend: {}
  },
  daisyui: {
    // themes: [
    //   {
    //     mytheme: {
    //       'primary': '#6265FF',
    //       'secondary': '#76D6FC',
    //       'accent': '#FF65A9',
    //       'neutral': '#494969',
    //       'base-100': '#F6F9FA',
    //       'info': '#5E76C9',
    //       'success': '#18D39F',
    //       'warning': '#FFCA65',
    //       'error': '#FE855A'
    //     }
    //   }
    // ]
  }
};
