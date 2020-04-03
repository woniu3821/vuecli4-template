const path = require('path')
const fs = require('fs')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const IS_DEV = ['development'].includes(process.env.NODE_ENV)

const argv = JSON.parse(process.env.npm_config_argv)
const cooked = argv.cooked[2] === '-test' ? '-test' : '-formal' //默认使用正式环境的cdn地址
const isFormal = cooked === '-formal'
const cdnURL = isFormal ? '//wecloud-fe-res' : '//wecloud-res-test'

const addStylusResource = rule => {
  rule
    .use('style-resouce')
    .loader('style-resources-loader')
    .options({
      patterns: [resolve('src/assets/stylus/variable.styl')]
    })
}

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录

  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)

    //为 stylus 提供全局变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStylusResource(config.module.rule('stylus').oneOf(type))
    )

    const cdn = {
      css: [`${cdnURL}.oss-cn-hangzhou.aliyuncs.com/platform/core.css`],
      js: [`${cdnURL}.oss-cn-hangzhou.aliyuncs.com/platform/core.js`]
    }

    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn

      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })

    if (IS_PROD) {
      // 压缩图片
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
        })

      // 打包分析
      // config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      //   {
      //     analyzerMode: 'static'
      //   }
      // ])
    }

    // 使用svg组件
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(/node_modules/)
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/svg'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // 添加别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))

    return config
  },
  configureWebpack: config => {
    config.externals = {
      axios: 'axios',
      iview: 'iview',
      utils: 'utils',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      vue: 'vue',
      qs: 'qs'
    }
  },
  lintOnSave: false,
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  pwa: {},
  css: {
    loaderOptions: {
      stylus: {
        preferPathResolver: 'webpack',
        paths: [path.join(__dirname, 'src/style')],
        import: ['global.styl']
      }
    }
  },
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    open: true, // 是否打开浏览器
    // host: "localhost",
    // port: "8080", // 代理断就
    // https: false,
    // hotOnly: false, // 热更新
    proxy: {
      '/api': {
        target:
          'https://www.easy-mock.com/mock/5bc75b55dc36971c160cad1b/sheets', // 目标代理接口地址
        secure: false,
        changeOrigin: true // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        // pathRewrite: {
        //   '^/api': '/'
        // }
      }
    }
  }
}
