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

    }
}