const express = require('express');
//引入连接池模块
const pool = require('../pool.js');
//创建路由器对象
var router = express.Router();

// 1 获取钱包信息
router.get('/getWallet',(req,res)=>{
    //根据用户id搜索用户余额
	var uid = req.session.uid
	pool.query('select*from jing_usrs_wallet where uid=? ',[uid],(err,result)=>{
		if(err) throw err;
		if(result.pay_pwd){
			res.send({"code":201,"msg":"获取失败"})
		}else{
			console.log(result)
		  	res.send({ "code":200, "msg":"获取钱包成功",data:result})
		}
	})
 })
// 2 修改钱包信息
router.put("/updateWallet",(req,res)=>{
	var wallet_balances=req.body.wallet_balances;
	var consume_flow =req.body.consume_flow; //流水类型
    //根据用户id修改用户余额
	var uid = req.session.uid;
	var sql="update jing_usrs_wallet set wallet_balances = ? where uid=?"; 
	if(uid){
		pool.query(sql,[wallet_balances,uid],(err,result)=>{
			if(err) throw err;
			if(result.affectedRows>0){  //修改成功
				pool.query('select*from jing_usrs_wallet where uid=? ',[uid],(err,result)=>{
					if(err) throw err;
					// 增加流水记录
						var sql1 = "INSERT INTO jiang_consume_record(uid,consume_money,consume_time,consume_mode,consume_flow,recharge_no,recharge_money,recharge_time,recharge_mode) VALUES(?,?,?,?,?,?,?,?,?)"
						// var consume_flow = consume_flow //流水类型充值
						console.log(consume_flow)
						console.log('hahahahhahah ')
						var recharge_no = result[0].wid //用户钱包id
						var recharge_money//充值金额
						var recharge_time//充值时间
						var recharge_mode//充值方式
						var consume_time//消费时间
						var consume_money//消费金额
						var consume_mode//消费方式
						if(consume_flow==2){
							recharge_money = wallet_balances
							recharge_time = new Date().toLocaleString();
							recharge_mode = '2'
						}else{
							consume_time = new Date().toLocaleString();
							consume_money = wallet_balances
							consume_mode = '1'
						}
						pool.query(sql1,[uid,consume_money,consume_time,consume_mode,consume_flow,recharge_no,recharge_money,recharge_time,recharge_mode],(err,result1)=>{
							if(err) throw err;
							console.log(result1)
						})
						// 钱包信息修改成功返回数据
					// console.log(result)
					res.send({message:'update ok',code:200,data:result});
				})
				
			}else{                      //修改失败
				res.send({message:'update failed',code:201});
			}
		});
	}
	
});
// 增加钱包用户
router.post('/pushWallet',(req,res)=>{
	var pay_pwd=req.body.pay_pwd
	var wallet_balances=req.body.wallet_balances
	var uid = req.session.uid;
	var sql = 'INSERT INTO jing_usrs_wallet(uid,wallet_balances,pay_pwd) VALUES(?,?,?)'
	pool.query(sql,[uid,wallet_balances,pay_pwd],(err,result)=>{
		if(err) throw err;
        if(result.length==0){
            res.send({"code":201,"msg":"find failed"})
        }else{
            res.send({ "code":200, "msg":"check ok","data":result});
        }
	})
})
// 3 验证支付密码
router.post('/checkPayPwd',(req,res)=>{
    let wallet = req.body;
	var uid = req.session.uid;
    pool.query('select pay_pwd from jing_usrs_wallet where uid=?',[uid],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.send({"code":201,"msg":"find failed"})
        }else if(wallet.pay_pwd==result[0].pay_pwd){
            res.send({ "code":200, "msg":"check ok"});
        }
    })
})
// 4 修改支付密码
router.post("/updatePayPwd",(req,res)=>{
	var wallet=req.body;
	var uid = req.session.uid;
    //根据用户id修改用户余额
	var sql="update jing_usrs_wallet set pay_pwd = ? where uid=?"; 
	pool.query(sql,[wallet.pay_pwd,uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){  //修改成功
			res.send({message:'update ok',code:200});
		}else{                      //修改失败
			res.send({message:'update failed',code:201});
		}
	});
});
module.exports = router;