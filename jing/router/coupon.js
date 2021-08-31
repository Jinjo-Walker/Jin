const express = require('express');
//引入连接池模块
const pool = require('../pool.js');
//创建路由器对象
var router = express.Router();


// 1 领取优惠券
router.post('/addCoupon',(req,res)=>{
	// console.log(req.body);
	//将获取的对象形式的数据插入到数据库jing下的jing_users_address表中
	// 执行sql命令
	// err可能产生的错误, result成功的结果
	let lqsj = new Date().toLocaleString();
	let dqsj = new Date('2021-09-24 23:49:31')
	var sql3 = 'select*from jing_coupon_have where sp_coupon_type=? and uid=?'
	var uid = req.session.uid
	if(uid){
		pool.query(sql3,[req.body.sp_coupon_type,uid],(err,result)=>{
			if(err) throw err;
			console.log(result)
			if(result.length==0){
				// 优惠券还没有领完 
				var number = result.coupon_number
				var sql='insert into jing_coupon_have(uid,lqsj,dqsj,sp_coupon_type) values(?,?,?,?)'
				pool.query(sql,[uid,lqsj,dqsj,req.body.sp_coupon_type],(err,result)=>{
					if(err) throw err;
					if(result.affectedRows>0){
						var uid = req.session.uid
						pool.query('select * from jing_coupon_have where sp_coupon_type=?',[req.body.sp_coupon_type],(err,result)=>{
							if(err) throw err;
							if(result.length==0){
								res.send({"code":201,"msg":"failed"})
							}else{
								res.send({ "code":200, "msg":"ok",data:result})  
							}
						})
					}else{
						res.send({ "code":-1, "msg":"领取失败"})
					}
				})	
			}else{
			res.send({ "code":201, "msg":"此优惠券你已经领过了"})  
			}
		})
	}
	
		
});
// 2 获取用户所有的优惠券
router.post('/getCoupon',(req,res)=>{
	// console.log(req.query);
	var uid = req.session.uid
	if(uid){
		pool.query('select * from jing_coupon_have where uid=?',[uid],(err,result)=>{
			if(err) throw err;
			if(result.length==0){
				res.send({"code":201,"msg":"failed"})
			}else{
				res.send({ "code":200, "msg":"ok",data:result})  
			}
		})
	}else{
		res.send({msg:'no login',code:-1})
	}
})
// 3 删除用户的优惠券
router.delete('/delCoupon',(req,res)=>{
	console.log(req.query);
	//执行sql命令
	pool.query('delete from jing_coupon_have where hid=?',[req.query.hid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows==0){
			res.send({"code":201,"msg":"failed"	})
		}else{
		console.log(result);
		res.send({"code":200,"msg":"ok"})	
		}
	});
})

// 4 修改优惠券
router.put('/updateCoupon',(req,res)=>{
    // 获取流传递的数据
    // console.log(req.body);
    // let number = req.body.have_coupon_number;    //拥有的优惠券数量
    // let isReceive = req.body.isReceive;          //是否领取
    let isTimeOut = req.body.isTimeOut;          //是否过期
    let hid = req.body.hid;                      //优惠券id
    // 执行sql命令
    var sql='update jing_coupon_have set isTimeOut=? where hid=?';
    pool.query(sql,[isTimeOut,hid],(err,result)=>{
        if(err) throw err;
        console.log(result); 
        //通过结果result下的affectedRows属性判断
        if(result.affectedRows===0){
            res.send({code:201,msg:'failed'})
        }else{
			var uid = req.session.uid
			pool.query('select * from jing_coupon_have where uid=?',[uid],(err,result)=>{
				if(err) throw err;
				if(result.length==0){
					res.send({"code":201,"msg":"failed"})
				}else{
					res.send({ "code":200, "msg":"ok",data:result})  
				}
			})
        }
    })	
});
// 获取优惠券类型表
router.get('/getCouponType',(req,res)=>{
   pool.query('select * from jing_sp_coupon',(err,result)=>{
	   if(err) throw err;
	   if(result.length==0){
		   res.send({"code":201,"msg":"failed"})
	   }else{
		 res.send({ "code":200, "msg":"ok",data:result})  
	   }
   })
})
module.exports = router;