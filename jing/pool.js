//****************连接池的设置*********************/
// 引入mysql模块
const	mysql = require('mysql');
const	pool =mysql.createPool({
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
	database:'jing',
	connectionLimit:'15' //连接池的大小
});
module.exports =pool;