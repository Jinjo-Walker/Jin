module.exports={
        chainWebpack:config=>{
          config.plugins.delete("prefetch")
          //删除index.html开头的带有prefetch属性的link，不要异步下载暂时不需要的页面组件文件
        },
        devServer:{
            proxy:{
                "/":{
                target:"http://127.0.0.1:3000",
                changeOrigin:true
                }, //下面两个主要用于解决socketio跨域问题
                '/socket.io':{
                    target:'http://127.0.0.1:3000',
                    // ws:true,
                    changeOrigin:true,
                    logLevel:'debug'
                },
                '/sockjs-node':{
                    target:'http://127.0.0.1:3000',
                    ws:false,
                    changeOrigin:true
                }
            }
        },
      }
   