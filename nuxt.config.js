import pkg from './package'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    '~assets/shards/scss/date-range.scss',
    '~assets/scss/shards-dashboards.scss',
    // vendor website pro
    '~assets/app1.css',
    //menu editor
    '~assets/menu.scss',
    // Element ui
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/shards-vue.js',
    '@/plugins/element-ui',
    '@/plugins/fireauth.js',
    '@/plugins/axios.js',
    '~/plugins/validation'
  ],

  router: {
    middleware: 'auth-check'
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/toast',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#41b882'
      }
    ],
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            name: 'English',
            file: 'en-US.js'
          },
          {
            code: 'fr',
            iso: 'fr-FR',
            name: 'Français',
            file: 'fr-FR.js'
          }
        ],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'lang/',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'lang',
          alwaysRedirect: false,
          fallbackLocale: 'en'
        }
      }
    ]
  ],
  toast: {
    position: 'top-right'
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
