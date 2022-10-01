import * as bodyParser from 'body-parser';
import * as axios from 'axios'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: 'universal',
  head: {
    title: 'nuxt-project',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans',
      },
    ],
  },

  loading: {
    color: '#fa6923f',
    height: '4px',
    duration: 5000,
  },
  loadingIndicator: { name: 'circle', color: '#fa6923f' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/core-components.js', '~plugins/date-filter.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL:
      process.env.BASE_URL ||
      'https://nuxt-blog-8e612-default-rtdb.firebaseio.com',
    credentials: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseUrl:
      process.env.BASE_URL ||
      'https://nuxt-blog-8e612-default-rtdb.firebaseio.com',
    apiKey: 'AIzaSyAFvUu9OiT41zl1VVUWRF27SzXKsZ3X6ek',
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/index.vue'),
      })
    },
    // middleware: 'log',
  },
  transition: {
    name: 'fade',
    mode: 'out-in',
  },
  serverMiddleware: [
    bodyParser.json(),
    '~/api'
  ],
  generate: {
    routes() {
      return axios.get('https://nuxt-blog-8e612-default-rtdb.firebaseio.com/posts.json')
      .then(res=>{
        const routes =[]
        for (const key in res.data) {
          routes.push({route: `/posts/${key}`,
        payload: {
          postData: res.data
        }})
        }
        return routes
      })
    }
  }
}
