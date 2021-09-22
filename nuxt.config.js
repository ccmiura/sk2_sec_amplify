import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sk2_sec_amplify',
    title: 'sk2_sec_amplify',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './node_modules/@mdi/font/css/materialdesignicons.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/globalMixins.js', ssr: false },
    { src: '~/plugins/amplify.js', ssr: false },
    { src: '~/plugins/authUtilitys.js', ssr: false },
    { src: '~/plugins/questionsUtilitys.js', ssr: false },
    { src: '~/plugins/userResultUtilitys.js', ssr: false },
    { src: '~/plugins/executer.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light:       {
          primary: colors.amber.base,
          secondary: colors.orange.base,
          accent: colors.deepOrange.base,
          error: colors.red.base,
          warning: colors.yellow.base,
          info: colors.cyan.base,
          success: colors.green.base,
          background: colors.orange.lighten-5
          }
        
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ],
    },
  },
  router: {
    middleware: ["auth", "routeCheck", "title"]
  },
  server: {
    host: '0.0.0.0' // デフォルト: localhost
  }
}
