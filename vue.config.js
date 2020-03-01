const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/musiclist/',
    lintOnSave: false,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('api',resolve('src/api'))
            .set('common',resolve('src/common'))
            .set('store',resolve('src/store'))
            .set('router',resolve('src/router'))
            .set('components',resolve('src/components'))
            .set('assets',resolve('src/assets'))
            .set('pages',resolve('src/pages'))   
    }
   }