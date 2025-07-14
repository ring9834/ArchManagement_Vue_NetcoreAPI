const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  lintOnSave:false,
  
  devServer:{
    proxy:{
      '/OSPApplication':{
        target:'http://localhost:8080',
        ws: true, 
        changeOrigin: true, 
      //   pathRewrite: {
      //     '^/OSPApplication': '/0SPFileApplication'
      // }
      }
    }
  }
})
