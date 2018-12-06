// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
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
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8083,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      /* 王国炎 */
      // '/jiKonCloud_1': {
      //   target: 'http://192.168.1.60:8080',
      //   changeOrigin: true
      // },

      /* 拜小磊 */
      // '/api': {
      //   target: 'http://192.168.1.9:8080',
      //   changeOrigin: true
      // }
      // '/api': {
      //   target: 'http://192.168.1.130:8080',
      //   changeOrigin: true
      // }

      /* 王鑫 */
      // '/api': {
      //   target: 'http://192.168.100.120:8080/',
      //   changeOrigin: true
      // }

      /* 余智贤 */
      // '/api': {
      //   target: 'http://192.168.100.176:9595',
      //   changeOrigin: true
      // }
      // '/api': {
      //   target: 'http://192.168.1.121:9595',
      //   changeOrigin: true
      // }

      /* 张益飞 */
      // '/api': {
      //   target: 'http://192.168.100.33:8080',
      //   changeOrigin: true
      // }
      // '/api': {
      //   target: 'http://192.168.1.107:8080',
      //   changeOrigin: true
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
