'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {
    //   '/api': {
    //     target: "http://new-practice.local",
    //     changeOrigin: true,
    //     logLevel: 'debug',
    //   }
    // },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: 'https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/blog-static/',
    // assetsPublicPath: '/',
   assetsPublicPath: 'https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/ok-bug/dist/',  // 最新


    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // bundleAnalyzerReport: process.env.npm_config_report
  },

  dll: {
    entry: {
      vue: [
        'vue/dist/vue.esm.js',
        'vue-router',
        'vuex'
      ],
      ui: [
        'element-ui',
        'iview',
        'vuetify'
      ],
      // echarts: [
      //   'echarts'
      // ],
      utils: [
        'axios',
        // 'lodash',
        'jquery',
        'highlight.js',

        // 'moment'
      ],
      // other: [
      //   'perfect-scrollbar'
      // ]
    },
    outputPath: path.resolve(__dirname, '../dist/dll'),
    // publicPath: '/dll/'   // 默认
    // publicPath: 'http://118.24.194.224:20001/'  // 暂时将文件存放该路径，后期修改。
    // publicPath: 'https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/blog-static/'  // 暂时将文件存放该路径，后期修改。
   publicPath: 'https://blog-static-ntpush.oss-cn-beijing.aliyuncs.com/ok-bug/dist/dll/'  // 最新。
  }
}
