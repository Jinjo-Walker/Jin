-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2021-08-22 18:24:37
-- 服务器版本： 10.4.20-MariaDB
-- PHP 版本： 8.0.8
SET NAMES UTF8;
DROP DATABASE IF EXISTS jing;
CREATE DATABASE jing CHARSET=UTF8;
USE jing;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `jing`
--

-- --------------------------------------------------------

--
-- 表的结构 `jiang_consume_record`
--

CREATE TABLE `jiang_consume_record` (
  `crid` int(11) NOT NULL COMMENT 'crid',
  `uid` int(11) NOT NULL COMMENT 'uid',
  `order_no` int(11) DEFAULT NULL COMMENT '消费的订单编号',
  `consume_money` decimal(32,10) DEFAULT NULL COMMENT '消费金额',
  `consume_time` datetime DEFAULT NULL COMMENT '消费时间',
  `consume_mode` varchar(1) DEFAULT NULL COMMENT '消费方式 1.钱包2.第三方',
  `consume_flow` varchar(32) NOT NULL COMMENT '流水类型 1消费 2充值',
  `recharge_no` int(11) NOT NULL COMMENT '充值订单编号',
  `recharge_money` decimal(32,10) DEFAULT NULL COMMENT '充值金额',
  `recharge_time` datetime DEFAULT NULL COMMENT '充值时间',
  `recharge_mode` varchar(1) DEFAULT NULL COMMENT '充值方式 1.银行卡，2微信支付'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流水记录';

--
-- 转存表中的数据 `jiang_consume_record`
--

INSERT INTO `jiang_consume_record` (`crid`, `uid`, `order_no`, `consume_money`, `consume_time`, `consume_mode`, `consume_flow`, `recharge_no`, `recharge_money`, `recharge_time`, `recharge_mode`) VALUES
(1, 2, 1, '200.0000000000', '2021-08-14 19:58:23', '1', '1', 1, '200.0000000000', '2021-08-14 19:58:53', '1'),
(2, 2, 2, '300.0000000000', '2021-08-14 20:01:23', '2', '2', 2, '300.0000000000', '2021-08-14 20:02:43', '1'),
(3, 2, 3, '100.0000000000', '2021-08-14 20:04:11', '1', '2', 3, '100.0000000000', '2021-08-14 20:04:56', '2'),
(4, 2, 4, '400.0000000000', '2021-08-14 20:05:32', '2', '1', 4, '400.0000000000', '2021-08-14 20:06:33', '2');

-- --------------------------------------------------------

--
-- 表的结构 `jing_coupon_have`
--

CREATE TABLE `jing_coupon_have` (
  `hid` int(11) NOT NULL COMMENT 'hid',
  `uid` int(11) NOT NULL COMMENT 'uid',
  `sp_coupon_type` varchar(32) NOT NULL COMMENT '优惠券类型',
  `have_coupon_number` int(11) NOT NULL DEFAULT 1 COMMENT '拥有数量',
  `lqsj` datetime DEFAULT NULL COMMENT '领取时间',
  `dqsj` datetime DEFAULT NULL COMMENT '到期时间',
  `isReceive` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否领取',
  `isTimeOut` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否过期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='优惠券所属表';

--
-- 转存表中的数据 `jing_coupon_have`
--

INSERT INTO `jing_coupon_have` (`hid`, `uid`, `sp_coupon_type`, `have_coupon_number`, `lqsj`, `dqsj`, `isReceive`, `isTimeOut`) VALUES
(1, 2, '15-2', 1, '2021-08-14 19:58:23', '2021-08-14 19:58:23', 0, 0),
(2, 3, '25-4', 1, '2021-08-14 19:58:23', '2021-08-14 19:58:23', 0, 0),
(3, 4, '50-10', 1, '2021-08-14 19:58:23', '2021-08-14 19:58:23', 0, 0),
(4, 5, '100-20', 0, '2021-08-14 19:58:23', '2021-08-14 19:58:23', 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `jing_order`
--

CREATE TABLE `jing_order` (
  `oid` int(11) NOT NULL COMMENT 'oid',
  `uid` int(11) NOT NULL COMMENT 'uid',
  `order_no` varchar(64) NOT NULL COMMENT '订单编号',
  `phone` varchar(32) NOT NULL COMMENT 'phone',
  `users_address` varchar(256) NOT NULL COMMENT '用户地址',
  `order_time` datetime NOT NULL COMMENT '订单创建时间',
  `order_update_time` datetime NOT NULL COMMENT '更新时间',
  `order_money` decimal(32,10) NOT NULL COMMENT '总金额',
  `order_pay_status` varchar(1) NOT NULL COMMENT '支付状态',
  `order_status` varchar(1) NOT NULL COMMENT '订单状态',
  `isEstimate` tinyint(1) DEFAULT 0 COMMENT '是否评价',
  `remarks` varchar(512) NOT NULL COMMENT '备注',
  `user_name` varchar(20) NOT NULL COMMENT '姓名'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单';

--
-- 转存表中的数据 `jing_order`
--

INSERT INTO `jing_order` (`oid`, `uid`, `order_no`, `phone`, `users_address`, `order_time`, `order_update_time`, `order_money`, `order_pay_status`, `order_status`, `isEstimate`) VALUES
(1, 2, '1', '18937826678', '郑州市金水区南阳路街道卫生路33号温雅公寓', '2021-08-14 15:31:20', '2021-08-14 15:31:20', '69.7500000000', '1', '1', 0),
(2, 3, '2', '15637847758', '郑州市金水区北林路街道园田路2号院', '2021-08-14 15:32:23', '2021-08-14 15:32:23', '20.0000000000', '0', '1', 0),
(3, 4, '3', '13948758900', '郑州市金水区北林路街道园田路2号院', '2021-08-14 15:34:44', '2021-08-14 15:34:44', '55.0000000000', '0', '0', 1),
(4, 5, '4', '15678934436', '郑州市金水区优胜北路1号芯互联大厦16楼', '2021-08-14 15:38:04', '2021-08-14 15:38:04', '15.0000000000', '1', '0', 1);

-- --------------------------------------------------------

--
-- 表的结构 `jing_order_detail`
--

CREATE TABLE `jing_order_detail` (
  `odid` int(11) NOT NULL COMMENT 'odid',
  `sp_id` int(11) NOT NULL COMMENT '商品id',
  `sp_uname` varchar(128) NOT NULL COMMENT '商品名字',
  `sp_price` decimal(32,10) NOT NULL COMMENT '单价',
  `order_no` varchar(64) NOT NULL COMMENT '订单编号',
  `sp_number` int(11) NOT NULL COMMENT '商品数量',
  `sp_img` varchar(128) NOT NULL COMMENT '商品主图'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单详情表';

--
-- 转存表中的数据 `jing_order_detail`
--

INSERT INTO `jing_order_detail` (`odid`, `sp_id`, `sp_uname`, `sp_price`, `order_no`, `sp_number`, `sp_img`) VALUES
(1, 1, '蜜汁排骨', '13.9500000000', '1', 5, 'paigu1.png'),
(2, 2, '特色鸡翅', '10.0000000000', '2', 2, 'jichi1.png'),
(3, 3, '炭烤蒜苗', '5.5000000000', '3', 10, 'suanmiao1.png'),
(4, 4, '可口可乐', '5.0000000000', '4', 3, 'kele1.png');

-- --------------------------------------------------------

--
-- 表的结构 `jing_room_seat`
--

CREATE TABLE `jing_room_seat` (
  `rsid` int(11) NOT NULL COMMENT 'rsid',
  `seat_no` int(11) NOT NULL COMMENT '座位编号',
  `seat_number_people` varchar(32) NOT NULL COMMENT '人数',
  `order_no` varchar(32) NOT NULL COMMENT '订单编号',
  `seat_status` varchar(1) NOT NULL COMMENT '状态 1无人2没结账3已结账',
  `seat_time` datetime NOT NULL COMMENT '最近一单时间',
  `seat_is_reserve` varchar(1) NOT NULL COMMENT '是否被预定',
  `expect_consume` decimal(32,10) DEFAULT NULL COMMENT '预计消费金额'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='餐厅座位表';

--
-- 转存表中的数据 `jing_room_seat`
--

INSERT INTO `jing_room_seat` (`rsid`, `seat_no`, `seat_number_people`, `order_no`, `seat_status`, `seat_time`, `seat_is_reserve`, `expect_consume`) VALUES
(1, 1, '1', '1', '1', '2021-08-14 20:55:07', '0', '0.0000000000'),
(2, 2, '3', '2', '3', '2021-08-14 20:50:13', '1', '30.0000000000'),
(3, 3, '2', '3', '2', '2021-08-14 20:56:11', '1', '0.0000000000'),
(4, 4, '1', '4', '2', '2021-08-14 20:59:27', '1', '230.0000000000');

-- --------------------------------------------------------

--
-- 表的结构 `jing_sp`
--

CREATE TABLE `jing_sp` (
  `spid` int(11) NOT NULL COMMENT 'spid',
  `sp_type_id` int(11) NOT NULL COMMENT '分类id',
  `sp_name` varchar(128) NOT NULL COMMENT '名称',
  `sp_keyword` varchar(512) NOT NULL COMMENT '关键字',
  `sp_img` varchar(128) NOT NULL COMMENT '主图',
  `sp_descript` varchar(512) NOT NULL COMMENT '描述',
  `sp_detail_id` int(11) NOT NULL COMMENT '详情id',
  `sp_price` decimal(32,10) NOT NULL COMMENT '价格',
  `sp_estimate` int(11) NOT NULL COMMENT '评价id',
  `sp_is_on` varchar(1) NOT NULL DEFAULT '1' COMMENT '是否上架',
  `sp_sell_count` int(11) NOT NULL DEFAULT 0 COMMENT '销售数量',
  `sp_time` datetime NOT NULL COMMENT '上架时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品列表';

--
-- 转存表中的数据 `jing_sp`
--

INSERT INTO `jing_sp` (`spid`, `sp_type_id`, `sp_name`, `sp_keyword`, `sp_img`, `sp_descript`, `sp_detail_id`, `sp_price`, `sp_estimate`, `sp_is_on`, `sp_sell_count`, `sp_time`) VALUES
(1, 10, '蜜汁排骨', '排骨', 'image/shop/paigu1.png', '蜜汁排骨以猪排骨为主要食材，是一道色香味俱全的名肴，属于安徽菜的代表之一', 1, '13.9500000000', 1, '1', 356, '2021-08-14 15:40:07'),
(2, 20, '特色鸡翅', '鸡翅', 'image/shop/jichi1.png', '鸡腿被碳火烧的刺啦出油,刷上一层个性特征的料汁,迎面而来的香味令人胃口大好', 2, '10.0000000000', 5, '1', 785, '2021-08-14 15:41:22'),
(3, 30, '炭烤蒜苗', '蒜苗', 'image/shop/suanmiao1.png', '烤蒜苗是以蒜苗为主要材料制作而成的一道菜品，香味浓郁，可口下饭', 3, '5.5000000000', 7, '1', 1239, '2021-08-14 15:43:45'),
(4, 40, '可口可乐', '可乐', 'image/shop/kele1.png', '百年老号，冰凉爽口，老少皆宜', 4, '5.0000000000', 11, '1', 3639, '2021-08-14 15:44:05'),
(5, 10, '烤羊肉串', '羊肉串', 'image/shop/yangrou1.png', '新疆风味烤羊肉串，肉质鲜嫩，味咸辣，广受人们欢迎', 5, '3.0000000000', 2, '1', 667, '2021-08-17 19:53:22'),
(6, 10, '鸡关节', '鸡关节', 'image/shop/jiguanjie1.png', '农家新鲜土鸡鸡关节，肉质鲜嫩，味咸辣，广受人们欢迎', 6, '2.0000000000', 2, '1', 378, '2021-08-17 20:02:02'),
(7, 10, '烤辣椒', '辣椒', 'image/shop/lajiao1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 7, '1.0000000000', 2, '1', 256, '2021-08-17 21:10:06'),
(8, 10, '烤金针菇', '金针菇', 'image/shop/jinzhengu1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 8, '1.0000000000', 2, '1', 765, '2021-08-17 21:11:46'),
(9, 10, '雪碧', '雪碧', 'image/shop/xuebi1.png', '百年老号，冰凉爽口，老少皆宜', 9, '5.0000000000', 11, '1', 2564, '2021-08-17 21:26:05'),
(10, 10, '雪花啤酒', '啤酒', 'image/shop/pijiu1.png', '勇闯天涯，冰凉爽口，夏日伴侣', 10, '5.0000000000', 11, '1', 4517, '2021-08-17 21:27:08'),
(11, 20, '烤羊肉串', '羊肉串', 'image/shop/yangrou1.png', '新疆风味烤羊肉串，肉质鲜嫩，味咸辣，广受人们欢迎', 5, '3.0000000000', 2, '1', 667, '2021-08-17 19:53:22'),
(12, 20, '鸡关节', '鸡关节', 'image/shop/jiguanjie1.png', '农家新鲜土鸡鸡关节，肉质鲜嫩，味咸辣，广受人们欢迎', 6, '2.0000000000', 2, '1', 378, '2021-08-17 20:02:02'),
(13, 20, '烤牛肉', '牛肉', 'image/shop/niurou1.png', '烤牛肉香味浓郁，咸甜适口，烤香浓郁，风味独特，营养丰富', 11, '5.0000000000', 2, '1', 475, '2021-08-17 20:03:13'),
(14, 20, '特色板筋', '板筋', 'image/shop/banjin1.png', '川味牛板筋是以牛板筋为原材料制作而成的麻辣鲜香的一道美食，回味绵长，十分耐嚼。', 12, '5.0000000000', 2, '1', 226, '2021-08-17 20:03:55'),
(15, 20, '特色心管', '心管', 'image/shop/xinguan1.png', '以猪心管为原材料制作而成的一道美食，回味绵长，十分耐嚼。', 13, '10.0000000000', 2, '1', 126, '2021-08-17 20:04:15'),
(16, 20, '烤生蚝', '生蚝', 'image/shop/shenghao1.png', '将蒜蓉、姜末、酱等佐料放入刚刚撬开的生蚝内，再直接放到火上烤熟，最大限度地保证了蚝肉的新鲜还增加了蚝的野味感觉', 14, '15.0000000000', 2, '1', 589, '2021-08-17 20:04:55'),
(17, 20, '锡纸包鸡翅', '鸡翅', 'image/shop/xizhijichi1.png', '农家新鲜土鸡鸡翅，肉质鲜嫩，广受人们欢迎', 15, '15.0000000000', 2, '1', 1121, '2021-08-17 20:05:15'),
(18, 20, '烤猪皮', '猪皮', 'image/shop/zhupi1.png', '主要原料是猪皮，酥脆爽口，飘香美味，老少皆宜。', 16, '30.0000000000', 2, '1', 1031, '2021-08-17 20:06:23'),
(19, 20, '特色大虾', '虾', 'image/shop/xia1.png', '道特色名吃，色泽红润，醇香鲜嫩，咸鲜可口，滋味微甜。', 17, '45.0000000000', 2, '1', 356, '2021-08-17 20:07:23'),
(20, 20, '小黄花', '黄花鱼', 'image/shop/huanghuayu1.png', '道特色名吃，外焦里嫩，鲜嫩多汁的烤黄花鱼', 18, '25.0000000000', 2, '1', 667, '2021-08-17 20:08:25'),
(21, 20, '特色鸡爪', '鸡爪', 'image/shop/jizhao1.png', '冰凉弹牙的椒盐鸡爪,再配上冰啤酒,就再好不过了', 19, '25.0000000000', 2, '1', 1036, '2021-08-17 20:10:02'),
(22, 20, '烤脆骨', '脆骨', 'image/shop/cuigu1.png', '好吃易消化，外焦里嫩，鲜香麻辣，堪称健康版的解馋菜了', 20, '15.0000000000', 2, '1', 861, '2021-08-17 20:11:32'),
(23, 20, '烤扇贝', '扇贝', 'image/shop/shanbei1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', 21, '15.0000000000', 2, '1', 2103, '2021-08-17 20:15:36'),
(24, 20, '铁板鸭肠', '鸭肠', 'image/shop/yachang1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', 22, '15.0000000000', 2, '1', 761, '2021-08-17 20:16:56'),
(25, 20, '烤鱿鱼', '鱿鱼', 'image/shop/youyu1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', 23, '15.0000000000', 2, '1', 980, '2021-08-17 20:17:06'),
(26, 20, '炒螺丝', '螺丝', 'image/shop/luosi1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', 24, '50.0000000000', 2, '1', 764, '2021-08-17 20:19:26'),
(27, 30, '烤豆角', '豆角', 'image/shop/doujiao1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 25, '2.0000000000', 2, '1', 559, '2021-08-17 21:03:45'),
(28, 30, '烤茄子', '茄子', 'image/shop/qiezi1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 26, '35.0000000000', 2, '1', 467, '2021-08-17 21:04:05'),
(29, 30, '烤面包片', '面包', 'image/shop/mianbao1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 27, '2.0000000000', 2, '1', 114, '2021-08-17 21:05:13'),
(30, 30, '烤豆皮', '豆皮', 'image/shop/doupi1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 28, '1.0000000000', 2, '1', 846, '2021-08-17 21:06:44'),
(31, 30, '烤面筋', '面筋', 'image/shop/mianjin1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 29, '2.0000000000', 2, '1', 996, '2021-08-17 21:07:34'),
(32, 30, '烤馒头', '馒头', 'image/shop/mantou1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 30, '2.0000000000', 2, '1', 781, '2021-08-17 21:08:54'),
(33, 30, '烤韭菜', '韭菜', 'image/shop/jiucai1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 31, '1.0000000000', 2, '1', 467, '2021-08-17 21:09:14'),
(34, 30, '烤辣椒', '辣椒', 'image/shop/lajiao1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 7, '1.0000000000', 2, '1', 256, '2021-08-17 21:10:06'),
(35, 30, '烤金针菇', '金针菇', 'image/shop/jinzhengu1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', 8, '1.0000000000', 2, '1', 765, '2021-08-17 21:11:46'),
(36, 40, '雪碧', '雪碧', 'image/shop/xuebi1.png', '百年老号，冰凉爽口，老少皆宜', 9, '5.0000000000', 11, '1', 2564, '2021-08-17 21:26:05'),
(37, 40, '雪花啤酒', '啤酒', 'image/shop/pijiu1.png', '勇闯天涯，冰凉爽口，夏日伴侣', 10, '5.0000000000', 11, '1', 4517, '2021-08-17 21:27:08'),
(38, 40, '冰红茶', '冰红茶', 'image/shop/hongcha1.png', '百年老号，冰凉爽口，老少皆宜', 32, '5.0000000000', 11, '1', 3537, '2021-08-17 21:28:18'),
(39, 40, '绿茶', '绿茶', 'image/shop/lvcha1.png', '百年老号，冰凉爽口，老少皆宜', 33, '5.0000000000', 11, '1', 2567, '2021-08-17 21:29:56'),
(40, 40, '汇源果汁', '果汁', 'image/shop/guozhi1.png', '水果百分百，冰凉爽口，老少皆宜', 34, '5.0000000000', 11, '1', 4458, '2021-08-17 21:30:26'),
(41, 40, '江小白', '白酒', 'image/shop/xiaobai1.png', '约酒，一切皆有可能', 35, '5.0000000000', 11, '1', 2116, '2021-08-17 21:31:16'),
(42, 40, '老村长', '白酒', 'image/shop/cunzhnag1.png', '致富不忘共产党,喝酒不忘老村长', 36, '5.0000000000', 11, '1', 4116, '2021-08-17 21:32:33');

-- --------------------------------------------------------

--
-- 表的结构 `jing_sp_car`
--

CREATE TABLE `jing_sp_car` (
  `scid` int(11) NOT NULL COMMENT 'scid',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `spid` int(11) NOT NULL COMMENT '商品id',
  `car_sp_number` int(11) NOT NULL COMMENT '商品数量',
  `car_status` tinyint(1) DEFAULT 0 COMMENT '记录状态',
  `car_create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `car_update_time` datetime DEFAULT NULL COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购物车表';

--
-- 转存表中的数据 `jing_sp_car`
--

INSERT INTO `jing_sp_car` (`scid`, `uid`, `spid`, `car_sp_number`, `car_status`, `car_create_time`, `car_update_time`) VALUES
(2, 3, 2, 2, 0, '2021-08-14 19:27:16', '2021-08-14 19:27:16'),
(3, 4, 3, 2, 1, '2021-08-14 19:28:33', '2021-08-14 19:28:33'),
(4, 5, 4, 2, 1, '2021-08-14 19:30:45', '2021-08-14 19:30:45');

-- --------------------------------------------------------

--
-- 表的结构 `jing_sp_coupon`
--

CREATE TABLE `jing_sp_coupon` (
  `cid` int(11) NOT NULL COMMENT 'cid',
  `sp_coupon_type` varchar(32) NOT NULL COMMENT '优惠券类型',
  `sp_coupon_no` varchar(8) NOT NULL COMMENT '优惠券编号',
  `coupon_start_time` datetime NOT NULL COMMENT '优惠券起始时间',
  `coupon_end_time` datetime NOT NULL COMMENT '优惠券结束时间',
  `coupon_number` int(11) NOT NULL COMMENT '优惠券总数量'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品优惠券类型表';

--
-- 转存表中的数据 `jing_sp_coupon`
--

INSERT INTO `jing_sp_coupon` (`cid`, `sp_coupon_type`, `sp_coupon_no`, `coupon_start_time`, `coupon_end_time`, `coupon_number`) VALUES
(1, '15-2', 'XZXZ66', '2021-08-14 18:28:21', '2022-09-14 18:28:21', 1),
(2, '25-4', 'CV5690', '2021-08-14 18:28:21', '2022-09-14 18:28:21', 5),
(3, '50-10', 'FJ2195', '2021-08-14 18:28:21', '2022-09-14 18:28:21', 100),
(4, '100-20', '56V8B0', '2021-08-14 18:28:21', '2022-09-14 18:28:21', 200);

-- --------------------------------------------------------

--
-- 表的结构 `jing_sp_detail`
--

CREATE TABLE `jing_sp_detail` (
  `did` int(11) NOT NULL COMMENT 'did',
  `sp_id` int(11) NOT NULL COMMENT '商品id',
  `sp_detail_img1` varchar(128) DEFAULT NULL COMMENT '图片1',
  `sp_detail_describe1` varchar(512) DEFAULT NULL COMMENT '图片1描述',
  `sp_detail_img2` varchar(128) DEFAULT NULL COMMENT '图片2',
  `sp_detail_describe2` varchar(512) DEFAULT NULL COMMENT '图片2描述',
  `untitled` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品详情表';

--
-- 转存表中的数据 `jing_sp_detail`
--

INSERT INTO `jing_sp_detail` (`did`, `sp_id`, `sp_detail_img1`, `sp_detail_describe1`, `sp_detail_img2`, `sp_detail_describe2`, `untitled`) VALUES
(1, 1, '/image/shop/paigu1.png', '蜜汁排骨以猪排骨为主要食材，是一道色香味俱全的名肴，属于安徽菜的代表之一', '/image/shop/paigu2.png', '蜜汁排骨以猪排骨为主要食材，是一道色香味俱全的名肴，属于安徽菜的代表之一', '蜜汁排骨'),
(2, 2, '/image/shop/jichi1.png', '鸡腿被碳火烧的刺啦出油,刷上一层个性特征的料汁,迎面而来的香味令人胃口大好', '/image/shop/jichi2.png', '鸡腿被碳火烧的刺啦出油,刷上一层个性特征的料汁,迎面而来的香味令人胃口大好', '特色鸡翅'),
(3, 3, '/image/shop/suanmiao1.png', '烤蒜苗是以蒜苗为主要材料制作而成的一道菜品，香味浓郁，可口下饭', '/image/shop/suanmiao2.png', '烤蒜苗是以蒜苗为主要材料制作而成的一道菜品，香味浓郁，可口下饭', '炭烤蒜苗'),
(4, 4, '/image/shop/kele1.png', '百年老号，冰凉爽口，老少皆宜', '/image/shop/kele2.png', '百年老号，冰凉爽口，老少皆宜', '可口可乐'),
(5, 5, '/image/shop/yangrou1.png', '新疆风味烤羊肉串，肉质鲜嫩，味咸辣，广受人们欢迎', '/image/shop/yangrou2.png', '新疆风味烤羊肉串，肉质鲜嫩，味咸辣，广受人们欢迎', '烤羊肉串'),
(6, 6, '/image/shop/jiguanjie1.png', '农家新鲜土鸡鸡关节，肉质鲜嫩，味咸辣，广受人们欢迎', '/image/shop/jiguanjie2.png', '农家新鲜土鸡鸡关节，肉质鲜嫩，味咸辣，广受人们欢迎', '鸡关节'),
(7, 7, '/image/shop/lajiao1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/lajiao2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤辣椒'),
(8, 8, '/image/shop/jinzhengu1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/jinzhengu2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤金针菇'),
(9, 9, '/image/shop/xuebi1.png', '百年老号，冰凉爽口，老少皆宜', '/image/shop/xuebi2.png', '百年老号，冰凉爽口，老少皆宜', '雪碧'),
(10, 10, '/image/shop/pijiu1.png', '勇闯天涯，冰凉爽口，夏日伴侣', '/image/shop/pijiu2.png', '勇闯天涯，冰凉爽口，夏日伴侣', '雪花啤酒'),
(11, 11, '/image/shop/niurou1.png', '烤牛肉香味浓郁，咸甜适口，烤香浓郁，风味独特，营养丰富', '/image/shop/niurou2.png', '烤牛肉香味浓郁，咸甜适口，烤香浓郁，风味独特，营养丰富', '烤牛肉'),
(12, 12, '/image/shop/banjin1.png', '川味牛板筋是以牛板筋为原材料制作而成的麻辣鲜香的一道美食，回味绵长，十分耐嚼', '/image/shop/banjin2.png', '川味牛板筋是以牛板筋为原材料制作而成的麻辣鲜香的一道美食，回味绵长，十分耐嚼', '特色板筋'),
(13, 13, '/image/shop/xinguan1.png', '以猪心管为原材料制作而成的一道美食，回味绵长，十分耐嚼。', '/image/shop/xinguan2.png', '以猪心管为原材料制作而成的一道美食，回味绵长，十分耐嚼。', '特色心管'),
(14, 14, '/image/shop/shenghao1.png', '将蒜蓉、姜末、酱等佐料放入刚刚撬开的生蚝内，再直接放到火上烤熟，最大限度地保证了蚝肉的新鲜还增加了蚝的野味感觉', 'shenghao1.png', '将蒜蓉、姜末、酱等佐料放入刚刚撬开的生蚝内，再直接放到火上烤熟，最大限度地保证了蚝肉的新鲜还增加了蚝的野味感觉', '烤生蚝'),
(15, 15, '/image/shop/xizhijichi1.png', '农家新鲜土鸡鸡翅，肉质鲜嫩，广受人们欢迎', '/image/shop/xizhijichi2.png', '农家新鲜土鸡鸡翅，肉质鲜嫩，广受人们欢迎', '锡纸包鸡翅'),
(16, 16, '/image/shop/zhupi1.png', '主要原料是猪皮，酥脆爽口，飘香美味，老少皆宜。', '/image/shop/zhupi2.png', '主要原料是猪皮，酥脆爽口，飘香美味，老少皆宜。', '烤猪皮'),
(17, 17, '/image/shop/xia1.png', '道特色名吃，色泽红润，醇香鲜嫩，咸鲜可口，滋味微甜。', '/image/shop/xia2.png', '道特色名吃，色泽红润，醇香鲜嫩，咸鲜可口，滋味微甜。', '特色大虾'),
(18, 18, '/image/shop/huanghuayu1.png', '道特色名吃，外焦里嫩，鲜嫩多汁的烤黄花鱼', '/image/shop/huanghuayu2.png', '道特色名吃，外焦里嫩，鲜嫩多汁的烤黄花鱼', '小黄花'),
(19, 19, '/image/shop/jizhao1.png', '冰凉弹牙的椒盐鸡爪,再配上冰啤酒,就再好不过了', '/image/shop/jizhao2.png', '冰凉弹牙的椒盐鸡爪,再配上冰啤酒,就再好不过了', '特色鸡爪'),
(20, 20, '/image/shop/cuigu1.png', '好吃易消化，外焦里嫩，鲜香麻辣，堪称健康版的解馋菜了', '/image/shop/cuigu2.png', '好吃易消化，外焦里嫩，鲜香麻辣，堪称健康版的解馋菜了', '烤脆骨'),
(21, 21, '/image/shop/shanbei1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '/image/shop/shanbei2.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '烤扇贝'),
(22, 22, '/image/shop/yachang1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '/image/shop/yachang2.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '铁板鸭肠'),
(23, 23, '/image/shop/youyu1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '/image/shop/youyu2.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '烤鱿鱼'),
(24, 24, '/image/shop/luosi1.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '/image/shop/luosi2.png', '好吃易消化，肉质鲜嫩，鲜香麻辣，滋补养生', '炒螺丝'),
(25, 25, '/image/shop/doujiao1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/doujiao2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤豆角'),
(26, 26, '/image/shop/qiezi1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/qiezi2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤茄子'),
(27, 27, '/image/shop/mianbao1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/mianbao2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤面包片'),
(28, 28, '/image/shop/doupi1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/doupi2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤豆皮'),
(29, 29, '/image/shop/mianjin1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/mianjin2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤面筋'),
(30, 30, '/image/shop/mantou1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/mantou2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤馒头'),
(31, 31, '/image/shop/jiucai1.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '/image/shop/jiucai2.png', '好吃易消化，鲜香麻辣，滋补养生，香味浓郁，可口下饭', '烤韭菜'),
(32, 32, '/image/shop/hongcha1.png', '百年老号，冰凉爽口，老少皆宜', '/image/shop/hongcha2.png', '百年老号，冰凉爽口，老少皆宜', '冰红茶'),
(33, 33, '/image/shop/lvcha1.png', '百年老号，冰凉爽口，老少皆宜', '/image/shop/lvcha2.png', '百年老号，冰凉爽口，老少皆宜', '绿茶'),
(34, 34, '/image/shop/guozhi1.png', '水果百分百，冰凉爽口，老少皆宜', '/image/shop/guozhi2.png', '水果百分百，冰凉爽口，老少皆宜', '汇源果汁'),
(35, 35, '/image/shop/xiaobai1.png', '约酒，一切皆有可能', '/image/shop/xiaobai2.png', '约酒，一切皆有可能', '江小白'),
(36, 36, '/image/shop/cunzhnag1.png', '致富不忘共产党,喝酒不忘老村长', '/image/shop/cunzhnag2.png', '致富不忘共产党,喝酒不忘老村长', '江小白');

-- --------------------------------------------------------

--
-- 表的结构 `jing_sp_estimate`
--

CREATE TABLE `jing_sp_estimate` (
  `eid` int(11) NOT NULL COMMENT 'eid',
  `oid` int(11) NOT NULL COMMENT '订单id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(64) NOT NULL COMMENT '用户名',
  `user_img` varchar(128) DEFAULT NULL COMMENT '用户头像',
  `sp_estimate_content` varchar(512) NOT NULL COMMENT '评价内容',
  `sp_estimate_star` int(11) NOT NULL COMMENT '评级',
  `sp_estimate_time` datetime NOT NULL COMMENT '评价时间',
  `sp_estimate_zan` int(11) NOT NULL DEFAULT 0 COMMENT '赞数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品评价表';

--
-- 转存表中的数据 `jing_sp_estimate`
--

INSERT INTO `jing_sp_estimate` (`eid`, `oid`, `uid`, `user_img`, `sp_estimate_content`, `sp_estimate_star`, `sp_estimate_time`, `sp_estimate_zan`) VALUES
(1, 1, 2, '/image/touxiang/touxiang2.png', '他家的蜜汁排骨，色香味都是一流的，点赞！', 5, '2021-08-14 16:34:34', 255),
(2, 2, 3, '/image/touxiang/touxiang3.png', '好吃，点赞！', 5, '2021-08-14 16:35:40', 255),
(3, 3, 4, '/image/touxiang/touxiang4.png', '还行吧，没那么夸张', 4, '2021-08-14 16:35:55', 255),
(4, 4, 5, '/image/touxiang/touxiang5.png', '鸡翅不错，肉很嫩', 5, '2021-08-14 16:34:33', 146),
(5, 5, 4, '/image/touxiang/touxiang4.png', '为厨师疯狂打call', 5, '2021-08-14 16:35:46', 146),
(6, 6, 5, '/image/touxiang/touxiang5.png', '还行吧，没那么夸张', 4, '2021-08-14 16:35:57', 146),
(7, 7, 3, '/image/touxiang/touxiang3.png', '蒜苗烤的有点老了', 5, '2021-08-14 16:34:38', 146),
(8, 8, 4, '/image/touxiang/touxiang4.png', '没炒的好吃', 4, '2021-08-14 16:35:41', 146),
(9, 9, 2, '/image/touxiang/touxiang2.png', '还行吧，没那么夸张', 4, '2021-08-14 16:35:54', 146),
(10, 10, 3, '/image/touxiang/touxiang3.png', '冰凉爽口', 5, '2021-08-14 16:34:39', 235),
(11, 11, 2, '/image/touxiang/touxiang2.png', '原来的配方，原来的味道', 4, '2021-08-14 16:35:42', 235),
(12, 12, 5, '/image/touxiang/touxiang5.png', '还行吧，没那么夸张', 4, '2021-08-14 16:35:54', 235),
(14, 3, 4, '/image/touxiang/touxiang4.png', '味道真好，快乐多多', 3, '2021-08-22 00:00:00', 0);

-- --------------------------------------------------------

--
-- 表的结构 `jing_sp_type`
--

CREATE TABLE `jing_sp_type` (
  `tid` int(11) NOT NULL COMMENT 'tid',
  `sp_type_name` varchar(128) NOT NULL COMMENT '分类名称'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品分类';

--
-- 转存表中的数据 `jing_sp_type`
--

INSERT INTO `jing_sp_type` (`tid`, `sp_type_name`) VALUES
(10, '折扣'),
(20, '炭烤荤类'),
(30, '炭烤素类'),
(40, '酒水饮料');

-- --------------------------------------------------------

--
-- 表的结构 `jing_swipe`
--

CREATE TABLE `jing_swipe` (
  `sid` int(11) NOT NULL COMMENT 'sid',
  `simg_url` varchar(128) NOT NULL COMMENT '图片路径',
  `simg_time` datetime NOT NULL COMMENT '添加时间',
  `uid` int(11) NOT NULL COMMENT '添加人id',
  `sjump_src` varchar(32) DEFAULT NULL COMMENT '跳转链接',
  `sclick_num` int(11) NOT NULL DEFAULT 0 COMMENT '点击次数'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='轮播图表';

--
-- 转存表中的数据 `jing_swipe`
--

INSERT INTO `jing_swipe` (`sid`, `simg_url`, `simg_time`, `uid`, `sjump_src`, `sclick_num`) VALUES
(1, 'banner1.png', '2021-08-14 14:59:03', 1, '#', 1),
(2, 'banner2.png', '2021-08-14 15:00:13', 2, '#', 1),
(3, 'banner3.png', '2021-08-14 15:01:01', 3, '#', 1),
(4, 'banner4.png', '2021-08-14 15:02:23', 4, '#', 1);

-- --------------------------------------------------------

--
-- 表的结构 `jing_users`
--

CREATE TABLE `jing_users` (
  `uid` int(11) NOT NULL COMMENT 'uid',
  `uname` varchar(32) NOT NULL COMMENT '用户名',
  `upwd` varchar(32) NOT NULL COMMENT '密码',
  `sex` varchar(1) DEFAULT NULL COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `phone` varchar(32) NOT NULL COMMENT '手机号',
  `ref_time` datetime NOT NULL COMMENT '注册时间',
  `user_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '用户类型',
  `user_name` varchar(32) DEFAULT NULL COMMENT '昵称',
  `user_img` varchar(128) DEFAULT NULL COMMENT '头像',
  `user_email` varchar(64) DEFAULT NULL COMMENT '邮箱',
  `user_isnew` varchar(1) NOT NULL DEFAULT '1' COMMENT '是否为新用户',
  `aid` int(11) DEFAULT NULL COMMENT '默认地址id  address'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- 转存表中的数据 `jing_users`
--

INSERT INTO `jing_users` (`uid`, `uname`, `upwd`, `sex`, `birthday`, `phone`, `ref_time`, `user_type`, `user_name`, `user_img`, `user_email`, `user_isnew`, `aid`) VALUES
(1, 'admin', '123456', '0', '1985-08-16', '13827849076', '2020-02-22 13:34:56', 1, 'admin', 'tou2.png', 'admin@tedu.com', '1', 100),
(2, 'Tom', '123456', '1', '1995-08-16', '18937826678', '2021-08-14 10:30:23', 0, '大花猫', 'tou2.png', '283764875@qq.com', '1', 101),
(3, 'Jerry', '123456', '1', '2000-01-01', '15637847758', '2021-08-14 10:41:55', 0, '天边的云', 'tou2.png', '888374556@qq.com', '1', 101),
(4, 'Maria', '123456', '0', '1995-07-14', '13948758900', '2021-08-13 08:56:54', 0, 'Super girl', 'tou2.png', 'chao@sina.com', '1', 102),
(5, 'Alice', '123456', '0', '2002-03-08', '15678934436', '2021-08-14 16:04:23', 0, '爱丽丝', 'tou2.png', 'Alice@sina.com', '1', 102),
(6, 'bilibili', '123456', '1', '2000-12-30', '15936569851', '2021-08-22 01:55:24', 0, 'lilili', 'image/touxiang/tou1.png', '1990365070@qq.com', '1', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `jing_users_address`
--

CREATE TABLE `jing_users_address` (
  `aid` int(11) NOT NULL COMMENT 'aid',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(18) NOT NULL COMMENT '用户姓名',  
  `tel` varchar(11) NOT NULL COMMENT '手机',
  `users_address` varchar(512) NOT NULL COMMENT '具体地址',
  `is_address` varchar(1) NOT NULL COMMENT '是否为默认地址',
  `address_no` int(11) NOT NULL COMMENT '地址编号'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户地址表';

--
-- 转存表中的数据 `jing_users_address`
--

INSERT INTO `jing_users_address` (`aid`, `uid`, `name`, `tel`, `users_address`, `is_address`) VALUES
(0, 7, '天要下雨', '18535865569', '郑州市金水区优胜北路1号芯互联大厦16楼', '1'),
(1, 7, '娘要嫁人', '18535865569', '郑州市金水区南阳路街道卫生路33号温雅公寓', '0'),
(2, 7, '赖不住的', '18535865569', '郑州市金水区北林路街道园田路2号院', '0');

-- --------------------------------------------------------

--
-- 表的结构 `jing_users_chat`
--

CREATE TABLE `jing_users_chat` (
  `ucid` int(11) NOT NULL COMMENT 'ucid',
  `chat_messages` text NOT NULL COMMENT '消息内容',
  `chat_status` varchar(1) NOT NULL COMMENT '接收状态',
  `chat_time` datetime NOT NULL COMMENT '发送时间',
  `chat_from_id` int(11) NOT NULL COMMENT '发送者id',
  `chat_to_id` int(11) NOT NULL COMMENT '接受者id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户聊天记录表';

--
-- 转存表中的数据 `jing_users_chat`
--

INSERT INTO `jing_users_chat` (`ucid`, `chat_messages`, `chat_status`, `chat_time`, `chat_from_id`, `chat_to_id`) VALUES
(1, '你家饭菜真好吃', '1', '2021-08-14 18:54:22', 2, 1),
(2, '为大厨点赞', '1', '2021-08-14 18:54:55', 3, 1),
(3, '我决定要成为你家长期的饭票', '1', '2021-08-14 18:55:55', 4, 1),
(4, '你家饭菜里有苍蝇', '1', '2021-08-14 18:56:20', 5, 1);

-- --------------------------------------------------------

--
-- 表的结构 `jing_usrs_wallet`
--

CREATE TABLE `jing_usrs_wallet` (
  `wid` int(11) NOT NULL COMMENT 'wid',
  `uid` int(11) NOT NULL COMMENT 'uid',
  `wallet_balances` decimal(32,10) NOT NULL COMMENT '余额',
  `pay_pwd` varchar(32) NOT NULL COMMENT '支付密码'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户钱包列表';

--
-- 转存表中的数据 `jing_usrs_wallet`
--

INSERT INTO `jing_usrs_wallet` (`wid`, `uid`, `wallet_balances`, `pay_pwd`) VALUES
(1, 2, '500.0000000000', '123456'),
(2, 3, '88764.0000000000', '123456'),
(3, 4, '8763.0000000000', '666666'),
(4, 5, '6893.0000000000', '123456');

--
-- 转储表的索引
--

--
-- 表的索引 `jiang_consume_record`
--
ALTER TABLE `jiang_consume_record`
  ADD PRIMARY KEY (`crid`);

--
-- 表的索引 `jing_coupon_have`
--
ALTER TABLE `jing_coupon_have`
  ADD PRIMARY KEY (`hid`);

--
-- 表的索引 `jing_order`
--
ALTER TABLE `jing_order`
  ADD PRIMARY KEY (`oid`);

--
-- 表的索引 `jing_order_detail`
--
ALTER TABLE `jing_order_detail`
  ADD PRIMARY KEY (`odid`);

--
-- 表的索引 `jing_room_seat`
--
ALTER TABLE `jing_room_seat`
  ADD PRIMARY KEY (`rsid`);

--
-- 表的索引 `jing_sp`
--
ALTER TABLE `jing_sp`
  ADD PRIMARY KEY (`spid`);

--
-- 表的索引 `jing_sp_car`
--
ALTER TABLE `jing_sp_car`
  ADD PRIMARY KEY (`scid`);

--
-- 表的索引 `jing_sp_coupon`
--
ALTER TABLE `jing_sp_coupon`
  ADD PRIMARY KEY (`cid`);

--
-- 表的索引 `jing_sp_detail`
--
ALTER TABLE `jing_sp_detail`
  ADD PRIMARY KEY (`did`);

--
-- 表的索引 `jing_sp_estimate`
--
ALTER TABLE `jing_sp_estimate`
  ADD PRIMARY KEY (`eid`);

--
-- 表的索引 `jing_sp_type`
--
ALTER TABLE `jing_sp_type`
  ADD PRIMARY KEY (`tid`);

--
-- 表的索引 `jing_swipe`
--
ALTER TABLE `jing_swipe`
  ADD PRIMARY KEY (`sid`);

--
-- 表的索引 `jing_users`
--
ALTER TABLE `jing_users`
  ADD PRIMARY KEY (`uid`);

--
-- 表的索引 `jing_users_address`
--
ALTER TABLE `jing_users_address`
  ADD PRIMARY KEY (`aid`);

--
-- 表的索引 `jing_users_chat`
--
ALTER TABLE `jing_users_chat`
  ADD PRIMARY KEY (`ucid`);

--
-- 表的索引 `jing_usrs_wallet`
--
ALTER TABLE `jing_usrs_wallet`
  ADD PRIMARY KEY (`wid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `jiang_consume_record`
--
ALTER TABLE `jiang_consume_record`
  MODIFY `crid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'crid', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `jing_coupon_have`
--
ALTER TABLE `jing_coupon_have`
  MODIFY `hid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'hid', AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `jing_order`
--
ALTER TABLE `jing_order`
  MODIFY `oid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'oid', AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `jing_order_detail`
--
ALTER TABLE `jing_order_detail`
  MODIFY `odid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'odid', AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `jing_room_seat`
--
ALTER TABLE `jing_room_seat`
  MODIFY `rsid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'rsid', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `jing_sp`
--
ALTER TABLE `jing_sp`
  MODIFY `spid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'spid', AUTO_INCREMENT=43;

--
-- 使用表AUTO_INCREMENT `jing_sp_car`
--
ALTER TABLE `jing_sp_car`
  MODIFY `scid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'scid', AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `jing_sp_coupon`
--
ALTER TABLE `jing_sp_coupon`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'cid', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `jing_sp_detail`
--
ALTER TABLE `jing_sp_detail`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT COMMENT 'did', AUTO_INCREMENT=37;

--
-- 使用表AUTO_INCREMENT `jing_sp_estimate`
--
ALTER TABLE `jing_sp_estimate`
  MODIFY `eid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'eid', AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `jing_sp_type`
--
ALTER TABLE `jing_sp_type`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'tid', AUTO_INCREMENT=41;

--
-- 使用表AUTO_INCREMENT `jing_swipe`
--
ALTER TABLE `jing_swipe`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'sid', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `jing_users`
--
ALTER TABLE `jing_users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'uid', AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `jing_users_address`
--
ALTER TABLE `jing_users_address`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'aid', AUTO_INCREMENT=103;

--
-- 使用表AUTO_INCREMENT `jing_users_chat`
--
ALTER TABLE `jing_users_chat`
  MODIFY `ucid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ucid', AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `jing_usrs_wallet`
--
ALTER TABLE `jing_usrs_wallet`
  MODIFY `wid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'wid', AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
