module.exports = {
    // devServer: {
    //     host: 'localhost',
    //     port:8080,
    //     proxy: {
    //         '/api': {
    //              target:'https://www.imooc.com',
    //              secure: false,
    //              changeOrigin:true,
    //              pathRewrite:{
    //                  '/api':''
    //              }
    //         }
    //     }

    // },
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV == 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
        })

        config.plugin('html').tap(args => {
            args[0].isProd = true
            return args
        })

        // 开发模式
        config.when(process.env.NODE_ENV == 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })

        config.plugin('html').tap(args => {
            args[0].isProd = false
            return args
        })

    }
}