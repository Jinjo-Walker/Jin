const express = require('express');
//引入连接池模块
const pool = require('../pool.js');
// 加载MD5模块
const md5 = require('md5');
//创建路由器对象
var router = express.Router();

const formidable = require('formidable'); //上传功能的插件
const path = require('path')
const fs = require("fs");

//第三方图形验证码模块:
//下载  npm i svg-captcha
const svgCaptcha = require('svg-captcha');

// 1 图形验证码
router.get('/imgCode',(req, res)=>{
	const cap = svgCaptcha.create({
	 		inverse: false,     // 翻转颜色
	 		fontSize: 36,     	// 字体大小
	 		noise: 3,           // 噪声线条数
	 		width: 160,          // 宽度
			height: 120,         // 高度
	 		color:true,         //是否是彩色
	 		ignoreChars:"0o1iI", //忽略特殊字
	 		size:4,             //验证码长度
	});
  	req.session.captcha = cap.text; // session 存储验证码值 
//   console.log(req.session);
	res.type('svg'); // 响应的类型
	res.send(cap.data);
})

// 2 验证用户是否存在
router.post("/check",(req,res)=>{
	let uname = req.body.uname;
	let sql = 'SELECT COUNT(uid) AS count FROM jing_users WHERE uname=?';
	pool.query(sql,[uname],(error, results) => {
		if (error) throw error;
		let count = results[0].count;
		if (count == 0) {
			res.send({msg:"user no exist",code:0});
		}else if(count == 1){
			res.send({msg:"user exist",code:1});
		}else{
			res.send({msg:"check failed",code:2});
		}
	});
})
// 3 用户注册登录
router.post("/register",(req,res)=>{

	//验证码验证
	console.log(req.body.code,req.session,req.session.captcha);
	if(req.body.code != req.session.captcha){
	   res.send({ message: 'yzm err', code: -1 });
	   return;
	}
	req.session.captcha = ""; 
	
	// 获取用户信息
	let uname = req.body.uname;
	let upwd = req.body.upwd;
	let ref_time = new Date().toLocaleString();   //注册时间
	let user_img = 'image/touxiang/tou1.png';     //用户默认头像
	console.log(uname,upwd,ref_time,user_img);

	// 将用户的相关信息插入到数据表
	sql = 'INSERT jing_users(uname,upwd,ref_time,user_img) VALUES(?,?,?,?)';
	pool.query(sql, [uname, upwd,ref_time,user_img],(error, results) => {
		if (error) throw error;
		if(results.affectedRows>0){   //注册成功
			let sql = 'SELECT uid,uname,upwd,user_name,user_img,phone,sex,ref_time,user_email FROM jing_users WHERE uname=? AND upwd=?';
			pool.query(sql, [uname, upwd], (error, results) => {
				if (error) throw error;
				//   console.log(results,results[0].uid);
				if(results.length == 0){ //登录失败
					res.send({message:'login failed',code:201});
				}else {                 //登录成功
					req.session.uid = results[0].uid; //登录凭证 
				    res.send({message:'ok',code:200,data:results[0]});
				  
				 }
			});
		}else{
			res.send({ message: 'register failed', code: 202 });
		}
		
	})
	  
});
// 记录登录状态
router.post("/login_state",(req,res)=>{
	if(req.session.uid){
	 	var sql = 'SELECT uid,uname,user_name,upwd,user_img,phone,sex,ref_time,user_email,birthday FROM jing_users WHERE uid=?';
		 pool.query(sql,[req.session.uid], (error, results) => {
			if (error) throw error;
			if(results.length == 0){
			  res.send({message:'login failed',code:201});
			} else {
			  res.send({message:'ok',code:200,data:results[0]});
			}
		})
	}else{
		res.send({message:'not login',code:-1});
	}
})
// 3 用户登录
router.post("/login",(req,res)=>{
	
	//判断用户是否登录
	if(req.session.uid){
		res.send({message:'ok',code:1});
		return;
    }
	//验证码验证
	console.log(req.session.captcha)
	if(req.body.code != req.session.captcha){
		res.send({message:'ok',code:-1});
		return;
	}
	req.session.captcha = "";
	 
    //获取用户名和密码信息
	let uname = req.body.uname;
	let upwd = req.body.upwd;
	// SQL语句
	let sql = 'SELECT uid,uname,user_name,upwd,user_img,phone,sex,ref_time,user_email,birthday FROM jing_users WHERE uname=? AND upwd=?';
	// console.log(req.session.captcha);
	pool.query(sql, [uname, upwd], (error, results) => {
	  if (error) throw error;
	//   console.log(results,results[0].uid);
	  if(results.length == 0){ //登录失败
		res.send({message:'login failed',code:201});
	  } else {                 //登录成功
        req.session.uid = results[0].uid; //登录凭证 
		res.send({message:'ok',code:200,data:results[0]});
       
	  }
	});
})

// 4 修改密码
router.put("/updatePwd",(req,res)=>{
	var obj=req.body;
	var id = req.session.uid;
	var sql="update jing_users set upwd = ? where uid=?"; 
	// console.log(sql,obj);
	pool.query(sql,[obj.upwd,id],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){  //修改成功
			res.send({message:'update ok',code:200});
		}else{                      //修改失败
			res.send({message:'update failed',code:201});
		}
	});
});
// 上传修改头像
router.post('/image', (req, res, next) => {
  //上传文件只能通过这个插件接收  file是上传文件 fields是其他的
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '../public/image/touxiang/'); //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
  form.maxFieldsSize = 1 * 1024 * 1024; //用户头像大小限制为最大1M    
  form.keepExtensions = true; //使用文件的原扩展名  
  form.parse(req, function (err, fields, file) {
    var filePath = '';
    //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。  
    if (file.tmpFile) {
      filePath = file.tmpFile.path;
    } else {
      for (var key in file) {
        if (file[key].path && filePath === '') {
          filePath = file[key].path;
          break;
        }
      }
    }
    //文件移动的目录文件夹，不存在时创建目标文件夹  
    var targetDir = path.join(__dirname, '../public/image/touxiang/uploads');
    if (!fs.existsSync(targetDir)) {
      fs.mkdir(targetDir);
    }
    var fileExt = filePath.substring(filePath.lastIndexOf('.'));
    //判断文件类型是否允许上传  
    if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
      var err = new Error('此文件类型不允许上传');
      res.json({
        code: -1,
        message: '此文件类型不允许上传'
      });
    } else {
      //以当前时间戳对上传文件进行重命名  
      var fileName = new Date().getTime() + fileExt;
      var targetFile = path.join(targetDir, fileName);
      //移动文件  
      fs.rename(filePath, targetFile, function (err) {
        if (err) {
          console.info(err);
          res.json({
            code: -1,
            message: '操作失败'
          });
        } else {
            //上传成功，返回文件的相对路径  
            var fileUrl = '/image/touxiang/uploads/' + fileName;
			var uid = req.session.uid
			var sql="update jing_users set user_img=? where uid=?"; 
			// console.log(sql,obj);
			pool.query(sql,[fileUrl,uid],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows>0){
					res.send({message:fileUrl,code:200});
				}else{
					res.send({message:'update failed',code:201});
				}
			});

        }
      });
    }
  });
})

// 5修改用户信息
router.put("/updateUser",(req,res)=>{
	var obj=req.body;
	var uid = req.session.uid
	var sql="update jing_users set user_name = ?,user_email = ?, phone=?, birthday=? , sex=? where uid=?"; 
	// console.log(sql,obj);
	pool.query(sql,[obj.user_name,obj.user_email,obj.phone,obj.birthday,obj.sex,uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({message:'update ok',code:200});
		}else{
			res.send({message:'update failed',code:201});
		}
	});
});
// 6 退出账号
router.get("/logout",(req,res)=>{
	req.session.uid = null;
	req.session.destroy();
	res.send({code:200,msg:"退出成功"});
});



/*二, 地址表: jing_users_address
      2.1 添加地址:
             接口路由 :"/user/addAddress"
             请求方法: "post"
             参数: uid,  users_address
             返回值   200成功   201失败
*/
// 7  req 请求   res响应
router.post('/addAddress',(req,res)=>{
	console.log(req.body);
	//将获取的对象形式的数据插入到数据库jing下的jing_users_address表中
	// 执行sql命令
	// err可能产生的错误, result成功的结果
	var uid = req.session.uid
	var {name,tel,users_address,is_address} =req.body
	var sql="INSERT jing_users_address(uid,name,tel,users_address,is_address) VALUES(?,?,?,?,?)";
	if(uid){
		if(is_address=='1'){
			var sql1='update jing_users_address set is_address=? where uid=?';
			pool.query(sql1,['0',uid],(err,result)=>{
				if(err) throw err;
				pool.query(sql,[uid,name,tel,users_address,is_address],(err,result)=>{
					if(err) throw err;
					if(result.affectedRows>0){
						console.log(result);
						res.send({"code":200,"msg":"insert ok"})
					}else{
						res.send({"code":201,"msg":"insert failed"});
					}
				})
			})
		}else{
			pool.query(sql,[uid,name,tel,users_address,is_address],(err,result)=>{
				if(err) throw err;
				if(result.affectedRows>0){
					console.log(result);
					res.send({"code":200,"msg":"insert ok"})
				}else{
					res.send({"code":201,"msg":"insert failed"});
				}
			})
		}
	}
	
});

/*
     2.2 修改地址
           接口路由: "/user/updateAddress"
           请求方法: "put"
           参数: uid,  users_address
           返回值  200成功   201失败
*/
// 8 修改地址
router.put('/updateAddress',(req,res)=>{
 // 获取流传递的数据
//  console.log(req.body);
 var uid = req.session.uid
 var {name,tel,users_address,is_address,aid} =req.body
 var sql='update jing_users_address set name=?,tel=?,users_address=?,is_address=? where aid=?';
 // 执行sql命令
	if(uid==null){
		res.send({code:-1,msg:'你没有没登录'})
	}else{
		if(is_address=='1'){
			var sql1='update jing_users_address set is_address=? where uid=?';
			pool.query(sql1,['0',uid],(err,result)=>{
				if(err) throw err;
				pool.query(sql,[name,tel,users_address,is_address,aid],(err,result)=>{
					if(err) throw err;
					console.log(result); 
					//通过结果result下的affectedRows属性判断
					if(result.affectedRows===0){
						res.send({code:201,msg:'update failed'})
					}else{
						res.send({code:200,msg:'ok'})
					}
				})
			})
		}else{
			pool.query(sql,[name,tel,users_address,is_address,aid],(err,result)=>{
				if(err) throw err;
				console.log(result); 
				//通过结果result下的affectedRows属性判断
				if(result.affectedRows===0){
					res.send({code:201,msg:'update failed'})
				}else{
					res.send({code:200,msg:'ok'})
				}
			})
		}
		
	}
})



/*
   2.3 删除地址
          接口路由: "/user/delAddress"
          请求方法: "delete"
          参数: uid
          返回值  200成功   201失败
*/
//  9 删除地址                   
router.delete('/delAddress',(req,res)=>{
	console.log(req.query);
	//执行sql命令
	pool.query('delete from jing_users_address where aid=?',[req.query.aid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows==0){
			res.send({"code":201,"msg":"delete failed"	})
		}else{
		console.log(result);
		res.send({"code":200,"msg":"ok"})	
		}
	});
})



/*
   2.4 获取地址
         接口地址: "/user/detAddress"
         请求方法: "get"
         参数:  uid
         返回值{code:200, msg:"OK", data:result}
*/
// 10 获取地址
router.get('/getAddress',(req,res)=>{
	var uid = req.session.uid
	if(uid){
		 pool.query('select * from jing_users_address where uid=?',[uid],(err,result)=>{
		if(err) throw err;
		if(result.length==0){
			res.send({"code":201,"msg":"查询失败"})
		}else{
			console.log('chengg');
			res.send({ "code":200, "msg":"查询成功",data:result})  
		}
	})
	}else{
		res.send({msg:'get login',code:-1})
	}
})

//  11. 获取所有用户信息分页（后台）
router.get("/getUser",(req,res)=>{
	// 获取客户端传递的page参数
	let page = req.query.page? req.query.page : 1;
	// 存储每页显示的记录数
	let pagesize = 5;
	// 通过公式来计算从第几条记录开始返回  offaet指当前页数从第几条数据开始
	let offset = (page - 1) * pagesize;
	// 用于存储获取到的总记录数
	let rowcount;
	// 获取用户的总个数
	let sql = 'SELECT COUNT(uid) AS count FROM jing_users';
	pool.query(sql,(error, results) => {
	  if (error) throw error;
	  // 将获取到总记录数赋给rowcount变量
	  rowcount = results[0].count;
	  // 根据总记录数和每页显示的记录数来计算总页数
	  let pagecount = Math.ceil(rowcount / pagesize);
	  // 查询SQL语句
	  sql = 'select*from jing_users where user_type=? LIMIT ?,?';
	  // 执行SQL
	  pool.query(sql, [0,offset,pagesize], (error, result) => {
		if (error) throw error;
		if(result.length>0){
			res.send({ message: 'getUser OK', code: 200,data:result , pagecount: pagecount,rowcount:rowcount});
		}else{
			res.send({msg:'getUser failed',code:201});
		}
		
	  });
	});
})
module.exports= router;