const express = require('express');
const { result } = require('underscore');
//引入连接池模块
const pool = require('../pool.js');
//创建路由器对象
var router = express.Router();


//字符串转数组
function str_to_arr(n){
	let a=n;
	let b = a.split(":");
	console.log(b);
	b.splice(0,1);
	let cart=[];
	for(var k=0 ;k<b.length/3;k++){
		cart.push({});
	}
	for(var i=0;i<b.length;i++){
		if(i%3==0){
			cart[Math.floor(i/3)].uid=parseInt(b[i]);
		}else if(i%3==1){
			cart[Math.floor(i/3)].spid=parseInt(b[i]);
		}else if(i%3==2){
			cart[Math.floor(i/3)].car_sp_number=parseInt(b[i]);
		} 
	}
	return cart;
}
// 1 加入购物车
//在用户加入购物车去结算时就会把购物车里的内容插入购物车表里，
router.post("/setCart",(req,res)=>{
    //判断用户是否登录
    /* if(req.session.auth){
        res.send({msg:"no login",code:201});
        return;
    } */
	var cart = str_to_arr(req.body.carts);
	console.log(cart);
	var n=0;                                       //用户记录插入购物车表的次数
	var newTime = new Date().toLocaleString();     //记录插入购物车的时间
	//用于判断用户在提交订单前是否又更改了购物车的内容
	pool.query("select * from jing_sp_car where uid=?",[cart[0].uid],(err,result1)=>{
		if(err) throw err;
		if(result1.length==0){    //用户未更改
			for(var i in cart){
				var sql = "insert into jing_sp_car(uid,spid,car_sp_number,car_create_time) values(?,?,?,?)";
				console.log(cart[i].uid,cart[i].spid,cart[i].car_sp_number,newTime);
				pool.query(sql,[cart[i].uid,cart[i].spid,cart[i].car_sp_number,newTime],(err,result2)=>{
					if(err) throw err;
					if(result2.affectedRows>0){
						n++;
						console.log(n)
						if(n==cart.length){
							res.send({msg:"insert ok",code:200})
						}
					}
				});
			}
		}else{  //用户已更改
			pool.query("delete from jing_sp_car where uid =?",[cart[0].uid],(err,result3)=>{
				if(err) throw err;
				if(result3.affectedRows>0){
					for(var i in cart){
						var sql = "insert into jing_sp_car(uid,spid,car_sp_number,car_create_time) values(?,?,?,?)";
						console.log(cart[i].uid,cart[i].spid,cart[i].car_sp_number,newTime);
						pool.query(sql,[cart[i].uid,cart[i].spid,cart[i].car_sp_number,newTime],(err,result2)=>{
							if(err) throw err;
							if(result2.affectedRows>0){
								n++;
								console.log(n)
								if(n==cart.length){
									res.send({msg:"insert ok",code:200})
								}
							}
						});
					}
				}
			})
		}
	})
    
    
});

// 2 清空购物车
router.delete("/clearCart",(req,res)=>{
    var uid = req.query.uid;
	console.log(uid);
    pool.query("delete from jing_sp_car where uid=?",[uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({msg:"clear ok",code:200});
        }else{
            res.send({msg:"clear failed",code:201})
        }
    });
});

//生成订单号
function orderCode(){
	var orderCode='';
	for(var i=0;i<6;i++){ //六位随机数用在加在时间戳后面
		orderCode+=Math.floor(Math.random()*10)
	}
	orderCode = new Date().getTime()+orderCode;  
	// console.log(orderCode);
	return orderCode;                                   //订单号
}
// 3 生成订单
router.post("/setOrder",(req,res)=>{
	var order = req.body;
	var carts = str_to_arr(order.carts);               //购物车信息
	// var carts = order.carts 
	var order_no = orderCode();                         //订单编号
	var order_time = new Date().toLocaleString();         //订单生成时间
	var uid = req.session.uid                                 //订单所属用户id
	var phone = order.phone                             //订单所属用户手机号
	var address = order.users_address                   //订单所属用户地址
	var updataTime = new Date().toLocaleString();         //订单更新时间
	var money = order.order_money                       //订单总金额
	var payStatus = order.order_pay_status              //订单支付状态
	var status = order.order_status                     //订单状态
	var isEstimate = 0;                                 //未评论状态
	var remarks = order.remarks                         //备注
	var user_name = order.user_name                   //姓名
	var sql='insert into jing_order values(null,?,?,?,?,?,?,?,?,?,?,?,?)';
	pool.query(sql,[uid,order_no,phone,address,order_time,updataTime,money,payStatus,status,isEstimate,remarks,user_name],(err,result)=>{
		if(err) throw err;
		// console.log(result)
		// console.log('点击科技')
		// console.log(carts)
		if(result.affectedRows>0){
			// 生成订单详情表
			var n=0; //用于记录详情表插入的次数
			for(let i in carts){
				console.log(carts)
				// 搜索该订单相关的所有商品
				var sql = "select sp_name,sp_price,sp_img from jing_sp where spid=? ";
				//根据商品的id查找订单详情表所需要的数据
				pool.query(sql,[carts[i].spid],(err,result1)=>{
					console.log(carts[i].spid)
					if(err) throw err;
					console.log('订单详情表获取的商品信息：'+result1[0].spid,result1[0].sp_name);
					if(result1.length>0){
						var sql='insert into jing_order_detail values(null,?,?,?,?,?,?)';
						pool.query(sql,[carts[i].spid,result1[0].sp_name,result1[0].sp_price,order_no,carts[i].car_sp_number,result1[0].sp_img],(err,result2)=>{
							if(err) throw err;
							if(result2.affectedRows>0){
								n++;
                                if(n==carts.length){
                                    res.send({msg:'ok',code:200,result:carts});
                                }
							}
						})
					}
				});
			}
		}else{
			res.send({msg:'order insert failed',code:201});
		}
	})

});


// 4 获取订单信息
router.get('/getOrder',(req,res)=>{
	//判断用户是否登录
	var uid = req.session.uid
	if(uid){
		pool.query(`select * from jing_order where uid=${uid}`,(err,result1)=>{
			if(err) throw err;
			if(result1.length>0){
				var order_details = [];    //用户存储订单详情的信息
				var n=0;                   //用于记录所属订单详情的个数
				for(var i=0;i<result1.length;i++){
					var sql = 'select * from jing_order_detail where order_no=?'
					pool.query(sql,[result1[i].order_no],(err,result2)=>{
						if(err) throw err;
						if(result2.length>0){
							
							order_details.push(result2);
							n++;
							if(n==result1.length){
								res.send({msg:'ok',code:200,order:result1,order_detail:order_details})
							}
						}

					})
				}
			}else{
				res.send({msg:'get order failed',code:201})
				// console.log(`你怕不是与i啥子${uid}`)
			}
		})
	}else{
		res.send({msg:'no login',code:-1})
	}
})

// 5 删除订单
router.delete('/delOrder',(req,res)=>{
	var order_id = req.query.oid;
	var order_no = req.query.order_no;
	pool.query('delete from jing_order where oid=?',[order_id],(err,result1)=>{
		if(err) throw err;
		if(result1.affectedRows>0){
			var sql = 'delete from jing_order_detail where order_no=?';
			pool.query(sql,[order_no],(err,result2)=>{
				if(err) throw err;
				if(result2.affectedRows>0){
					res.send({msg:'delete ok' ,code:200})
				}else{
                    res.send({msg:'delete order_detail failed' ,code:201});
                }
			})
		}else{
			res.send({msg:'delete order failed' ,code:202});
		}
	}) 
})

// 6 添加评论接口
router.post('/setEstimate',(req,res,next)=>{
	//获取post传递的数据(sp_id, uid, sp_estimate_content )
	let obj = req.body;
	let img = obj.user_img;                  //用户头像
	let uid = req.session.id                      //用户id
	let oid = obj.oid                        //评论所属的订单id
	let content = obj.sp_estimate_content;   //评论内容
	let star = obj.sp_estimate_star          //评论星级
	let newTime = new Date().toLocaleString() //评论时间
	// console.log(obj);
	var isEstimate = 1;   //用户已评论
	let name = obj.name;
	if(uid){
		var sql = "INSERT INTO jing_sp_estimate (oid,uid,name,sp_estimate_content,user_img,sp_estimate_star,sp_estimate_time) VALUES(?,?,?,?,?,?,?)"
		pool.query(sql,[oid,uid,name,content,img,star,newTime],(err,result)=>{
		if(err) throw err;
			if(result.affectedRows>0){
				//判断是否显示评论，用户只评论一次
				var sql = "update jing_order set isEstimate=? where oid=?";
				pool.query(sql,[isEstimate,obj.oid],(err,result2)=>{
					if(err) throw err;
					if(result2.affectedRows>0){
						res.send({code:200,msg:"ok"});
					}
				})
			}else{
				res.send({code:201,msg:"failed"});
			}
		})
	}
  })

// 7 获取评论并分页
  router.get('/getEstimate', (req, res) => {
// 获取客户端传递的page参数
let page = req.query.page? req.query.page : 1;
// 存储每页显示的记录数
let pagesize = 10;
// 通过公式来计算从第几条记录开始返回  offaet指当前页数从第几条数据开始
let offset = (page - 1) * pagesize;
// 用于存储获取到的总记录数
sql ='SELECT * FROM jing_sp_estimate order by eid desc LIMIT ?,?' ;
// sql ='SELECT*FROM jing_sp_estimate LIMIT ?,? ORDER BY eid DESC,  ASC'
//  'SELECT * FROM (select * from jing_sp_estimate order by eid desc limit 10)  ORDER BY eid'
	// 执行SQL
	pool.query(sql, [offset,pagesize], (error, result) => {
		if (error) throw error;
		if(result.length>0){
			res.send({ message: 'ok', code: 200,data:result});
		}else{
			res.send({ message: 'ok', code: 201})
		}
	});
});
// 8. 获取所有订单(后台)
router.get("/getAllOrder",(req,res)=>{
	// 获取客户端传递的page参数
	let page = req.query.page? req.query.page : 1;
	// 存储每页显示的记录数
	let pagesize = 5;
	// 通过公式来计算从第几条记录开始返回  offaet指当前页数从第几条数据开始
	let offset = (page - 1) * pagesize;
	// 用于存储获取到的总记录数
	let rowcount;
	// 获取订单的总个数
	let sql = 'SELECT COUNT(oid) AS count FROM jing_order';
	pool.query(sql,(error, results) => {
	  if (error) throw error;
	  // 将获取到总记录数赋给rowcount变量
	  rowcount = results[0].count;
	  // 根据总记录数和每页显示的记录数来计算总页数
	  let pagecount = Math.ceil(rowcount / pagesize);
	  // 查询SQL语句
	  sql = 'SELECT*FROM jing_order LIMIT ?,?';
	  // 执行SQL
	  pool.query(sql, [offset,pagesize], (error, result) => {
		if (error) throw error;
		if(result.length>0){
			res.send({ message: 'getAllOrder OK', code: 200,data:result , pagecount: pagecount,rowcount:rowcount});
		}else{
			res.send({msg:'getAllOrder failed',code:201});
		}
		
	  });
	});
})
module.exports = router;