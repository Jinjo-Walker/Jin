const express = require("express");
//引入body-parser中间件模块                                      
const bodyParser=require('body-parser');                        
//引入跨域管理模块                                               
const cors = require("cors");                                   
//npm i express-session                                         
const session = require("express-session");

//引入项目路由器
const userRouter = require("./router/user.js");             //用户
const productRouter = require('./router/products.js');      //商品
const orderRouter = require('./router/order.js');           //订单
const couponRouter = require('./router/coupon.js');         //优惠券
const walletRouter = require('./router/wallet.js');         //钱包                                                            //              
 
//创建WEB服务器                                                  
const app=express();     

//配置websocket
//获取express底层所使用的http模块
const http = require('http').createServer(app);
//websocket需要把通信相关路由注册到该底层http模块
const socketio = require('socket.io')(http,{
  //解决socketio跨域问题+vue.config.js配置
  cors:{
    origin:'*'
  }});

//node js 的underscore扩展中的findWhere方法，可以在对象集合中，通过对象的属性值找到该对象
const _ = require('underscore');
var userList=[]; //用于存储所有在线的用户信息
var n=0;    //用于记录查找用户列表可以查找到用户
//用于监听连接的客户端
socketio.on("connection",(socket)=>{
  console.log('有客户端进来了：'+socket.id);
  socket.on("hello",(data)=>{
    console.log(`收到客户端的消息：${data}`);
  });
  //监听登录的用户
  socket.on("login",(user)=>{
      //把登录的用户信息存到用户列表中
      user.id = socket.id;
      userList.push(user);
      console.log("建立连接的所有用户信息"+userList);
      socket.emit("userInfo",user);
  })
  //监听用户退出登录
  socket.on("logout",()=>{    
      // 查找到退出登录的所属用户
      var user = _.findWhere(userList,{id:socket.id});
      console.log("退出的用户",user);
      if(user){
          // 删除在线用户列表中的该用户
          userList = _.without(userList,user);
          //给所有用户发送更新之后的用户列表
          socketio.emit("usetList",userList);
          console.log(111);
      }
  });
  //向建立‘tosend’连接的所有用户广播
  socket.on("tosend",function(msgobj){
    //根据用户名查找用户列表找到对应的socketid，发送给该用户
    for(var i in userList){
      if(msgobj.toname==userList[i].uname)
      {
        n=1;  break;
      }
    }
    console.log("n的值："+n);
    if(n==1){
      //把查找到的用户socketid加入到消息对象中
      console.log(i,userList[i].id)
      msgobj.to = userList[i].id; 
      socketio.emit("tosend",msgobj);
      socketio.emit('userList',userList);
    }
    
  })  
})

//http服务器监听端口3000
//启动服务,不能再使用server.listen 而应该调用http.listen
//因为socketio将通信相关路由注册到http模块，而非express
//所以http才可以接收到websocket请求， express则只用于处理http                                                       
http.listen(3000,function(){
  console.log("server is runing ... 3000");
});                                               
       

//托管静态资源到public目录                                        
app.use( express.static('public') );                            

//配置允许跨域程序                                                 
app.use(cors({                                                  
   origin:["http://127.0.0.1:8080","http://localhost:8080","http://localhost:8081","http://127.0.0.1:8081"],    
   credentials:true,
}))                                                             
//使用body-parser中间件，将post请求的数据解析为对象                
app.use(express.urlencoded({                                 
  extended:false                                                
}));                                                            
//session配置 可保存登录状态或验证答案                                                                                       
app.use(session({                                               
    name: 'session-id',                                         
    secret: '12345-67890',                                      
    saveUninitialized: true,                                    
    resave: true                                                
}))   

//挂载路由
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use('/order',orderRouter);
app.use('/coupon',couponRouter);
app.use('/wallet',walletRouter);