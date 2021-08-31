var express = require('express');

const pool = require('../pool.js');

var router = express.Router();

// 1 获取轮播图
router.get('/getSwipe',(req,res)=>{
  pool.query('select * from jing_swipe ',(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({"code":201,"msg":"获取失败"})
    }else{
    res.send({ "code":200, "msg":"获取成功",data:result})  
    }
  })
})

// 2 获取商品类型
router.get('/getType',function(req,res,next){
    //执行SQL命令获取商品数据
    pool.query('select * from jing_sp_type',(err,result)=>{
        //err 可能产生的错误结果
        if(err) {throw err;}
        if(result.length>0){
            //  console.log(result);
             res.send({code:200,msg:"ok",data:result});
        }
      });
})

// 3 获取商品
router.get('/getSp',function(req,res,next){
  pool.query('select * from jing_sp',(err,result)=>{
    if(err) {throw err;}
        if(result.length>0){
            //  console.log(result);
             res.send({code:200,msg:"ok",data:result});
        }
        else{
          res.send({code:201,msg:"failed"});
        }
  })
})

// 4 获取商品详情 参数sp_id 
router.get('/getSpDetail',function(req,res,next){
    let sp_id = req.query.sp_id;
    var sql ="select * from jing_sp_detail where sp_id=?"
    pool.query(sql,[sp_id],(err,result)=>{
      if(err)throw err;
      else{res.send({code:200,msg:"ok",data:result});}
    })
})


// 5 获取消费记录  
router.post('/getRecord',(req,res,next)=>{
  let uid = req.session.uid;
  if(uid){
    pool.query('select * from jiang_consume_record where uid=?',[uid],(err,result)=>{
      //err 可能产生的错误结果
      if(err) {throw err;}
      if(result.length>0){
          //  console.log(result);
           res.send({code:200,msg:"ok",data:result});
      }else{
        res.send({code:201,msg:"no"});
      }
    });
  }else{
    res.send({msg:'get login',code:-1})
  }
})

// 6 修改商品状态  是否上架
router.put("/updateSp",(req,res)=>{
  var sql = "update jing_sp set sp_is_on=? where spid=?";
  pool.query(sql,[req.body.sp_is_on,req.body.spid],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({msg:'update ok',code:200});
    }else{
      res.send({msg:'update failed',code:201})
    }
  });
});
 
// 7 模糊搜索 商品
router.get("/selectSp",(req,res)=>{
  let name = "%"+req.query.sp_name+"%";
  pool.query("select * from jing_sp where sp_name like ? ",name,(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      res.send({msg:"search ok",code:200,data:result});
    }else{
      res.send({msg:"search failed",code:201});
    }
  })
});

// 8 获取商品并分页(后台)
router.get('/getAllSp',function(req,res,next){
    // 获取客户端传递的page参数
    let page = req.query.page? req.query.page : 1;
    // 存储每页显示的记录数
    let pagesize = 3;
    // 通过公式来计算从第几条记录开始返回  offaet指当前页数从第几条数据开始
    let offset = (page - 1) * pagesize;
    // 用于存储获取到的总记录数
    let rowcount;
    // 获取商品的总个数
    let sql = 'SELECT COUNT(spid) AS count FROM jing_sp';
    pool.query(sql,(error, results) => {
      if (error) throw error;
      // 将获取到总记录数赋给rowcount变量
      rowcount = results[0].count;
      // 根据总记录数和每页显示的记录数来计算总页数
      let pagecount = Math.ceil(rowcount / pagesize);
      // 查询SQL语句
      sql = 'select * from jing_sp LIMIT ?,?';
      // 执行SQL
      pool.query(sql, [offset,pagesize], (error, result) => {
      if (error) throw error;
      if(result.length>0){
        res.send({ message: 'getSp OK', code: 200,data:result , pagecount: pagecount,rowcount:rowcount});
      }else{
        res.send({msg:'getSp failed',code:201});
      }
      
      });
    });
  })
module.exports = router;
