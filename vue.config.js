module.exports = {
    devServer: {
        host: 'localhost',
        port:8080,
        proxy: {
            '/api': {
                 target:'https://www.imooc.com',
                 secure: false,
                 changeOrigin:true,
                 pathRewrite:{
                     '/api':''
                 }
            }
        }

    },
    chainWebpack:config=>{
        config.when(process.env.NODE_ENV=='production',config=>{
            config.entry('app').clear().add('./src/main-prod.js')
        })
        config.when(process.env.NODE_ENV=='devlopment',config=>{
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}