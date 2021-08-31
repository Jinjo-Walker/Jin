import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
=======
import axios from 'axios'
Vue.use(Vuex)
import moment from 'moment';
moment.locale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MM月DD日',
    LLL: 'YYYY年MM月DD日Ah点mm分',
    LLLL: 'YYYY年MM月DD日ddddAh点mm分',
    l: 'YYYY-M-D',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日dddd HH:mm'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (hour, meridiem) {
    if (hour === 12) {
      hour = 0;
    }
    if (meridiem === '凌晨' || meridiem === '早上' ||
      meridiem === '上午') {
      return hour;
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12;
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12;
    }
  },
  meridiem: function (hour, minute, isLower) {
    const hm = hour * 100 + minute;
    if (hm < 600) {
      return '凌晨';
    } else if (hm < 900) {
      return '早上';
    } else if (hm < 1130) {
      return '上午';
    } else if (hm < 1230) {
      return '中午';
    } else if (hm < 1800) {
      return '下午';
    } else {
      return '晚上';
    }
  },
  calendar: {
    sameDay: '[今天]LT',
    nextDay: '[明天]LT',
    nextWeek: '[下]ddddLT',
    lastDay: '[昨天]LT',
    lastWeek: '[上]ddddLT',
    sameElse: 'L'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
  ordinal: function (number, period) {
    switch (period) {
      case 'd':
      case 'D':
      case 'DDD':
        return number + '日';
      case 'M':
        return number + '月';
      case 'w':
      case 'W':
        return number + '周';
      default:
        return number;
    }
  },
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '几秒',
    ss: '%d秒',
    m: '1分钟',
    mm: '%d分钟',
    h: '1小时',
    hh: '%d小时',
    d: '1天',
    dd: '%d天',
    M: '1个月',
    MM: '%d个月',
    y: '1年',
    yy: '%d年'
  },
  week: {
    // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
})

export default new Vuex.Store({
  namespaced: true,
  state: {
    //记录聊天信息
    user:{},
    // 记录登录状态
    login_State:true,
    // 首页初始页
    activeName:'index',
    // 弹窗广告初始
    overLay:true,
    // 购物车列表
    cart_List:{
      uid:1,
      sp:[],
      car_status:0,
      car_create_time:'2021/08/02',
      car_update_time:'2021/08/03',
      Total_price:0
    },
    // 购物车商品数量
    cart_spsl:0,
    // 地址列表
    address_List: [
      // {
      //   id:uid
      //   aid: '1',
      //   name: '张三',
      //   tel: '13000000000',
      //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
      //   isDefault: true,
      //   isno:true
      // },
    ],
    // 商品列表
    product_List:[],
    // 商品分类列表
    typeList:[],
    // 用户地址表
    address_List:[],
    // 轮播图列表
    swipe_List:[],
    // 订单表
    order_List:[],
    // 用户基本信息
    user_Info:{},
    // 钱包
    user_Wallet:{},
    // 优惠券类型表
    coupon_Type:[],
    // 用户所有的优惠券表
    coupon_List:[],
    // 选中的优惠券
    is_Coupon:{},
    // 当前评价的订单
    is_Estimate:{},
    //消费记录表
    record_List:[],
    // 搜索内容
    search_List:[],
  },
  mutations: {
    //记录用户聊天信息
    SetUser(state,user){
        state.user=user;
     },
    // 记录登录状态
    SetLogin_State(state,name){
      state.login_State=name
    },
    // 记录首页
    SetActiveName(state,name){
      state.activeName=name
    },
    // 记录广告
    SetOverLay(state,name){
      state.overLay=name
    },
    // 修改购物车
    SetCart_List(state,name){
      state.cart_List=name
    },
    // 修改购物车商品数量
    SetCart_spsl(state,name){
      state.cart_spsl=name
    },
    // 修改地址列表
    SetAddress_List(state,name){
      state.address_List=name
    },
    // 修改商品列表
    SetProduct_List(state,name){
      state.product_List=name
    },
    // 修改商品分类列表
    SetTypeList(state,name){
      state.typeList=name
    },
    // 修改轮播图列表
    SetSwipe_List(state,name){
      state.swipe_List=name
    },
    //修改订单
    SetOrder_List(state,name){
      state.order_List=name
    },
    // 修改用户基本信息
    SetUser_Info(state,name){
      state.user_Info=name
    },
    // 修改钱包信息
    SetUser_Wallet(state,name){
      state.user_Wallet=name
    },
    // 修改优惠券类型
    SetCoupon_Type(state,name){
      state.coupon_Type=name
    },
    // 修改优惠券列表
    SetCoupon_List(state,name){
      state.coupon_List=name
    },
    // 修改选中的优惠券
    SetIs_Coupon(state,name){
      state.is_Coupon=name
    },
    // 修改当前评价的订单
    SetIs_Estimate(state,name){
      state.is_Estimate=name
    },
    // 修改消费记录表
    SetRecord_List(state,name){
      state.record_List=name
    },
    // 修改搜索内容
    SetSearch_List(state,name){
      state.search_List=name
    },
  },
  actions: {
    // 是否登录
    GetLogin_State(store,name){
      axios.post('/user/login_state',''
      ).then(res => {
            // console.log(res.data)
         if(res.data.code== -1){
            store.commit('SetLogin_State',false)
            store.commit('SetUser_Info',{})
         }else if(res.data.code== 201){
            console.log('初始化信息失败')
         }else if(res.data.code== 200){
            store.commit('SetLogin_State',true)
            var info = res.data.data
            info.ref_time = moment(info.ref_time).format('lll');  // 2021年8月24日 18:24
            info.birthday = moment(info.birthday).subtract(10, 'days').calendar()
            store.commit('SetUser_Info',info)
         }
      })
    },
    // 获取商品列表
    GetProduct_List(store,name){
      axios.get('/product/getSp').then(res => {
        // 更新state中的数据
        store.commit('SetProduct_List', res.data.data)
      })
    },
    // 获得商品分类列表
    GetTypeList(store,name){
      axios.get('/product/getType').then(res=> {
        store.commit('SetTypeList', res.data.data)
      })
    },
    // 获取地址表
    GetAddress_List(store,name){
      axios.get(
        '/user/getAddress',
      ).then(res=> {
        // console.log(res.data)
        if(res.data.code==200){
          var Laddress_List = []
          for(var i of res.data.data){
            var address_List={
              id:i.aid,
              aid:i.aid,
              name:i.name,
              tel:i.tel,
              address:i.users_address,
              isDefault:i.is_address=='1'?true:false,
              isno:i.is_address=='1'?true:false,
            }
            Laddress_List.push(address_List)
          }
          store.commit('SetAddress_List', Laddress_List)
        }else{

        }
      })
    },
    // 获取订单详情
    GetOrder_List(store,name){
      axios.get(
        '/order/getOrder').then(res=>{
      // console.log(res.data)
      if(res.data.code==200){
        var order_List = [];
        var b = 0
        for(var i of res.data.order){
            var a = {};
            a.order = i
            a.detail = res.data.order_detail[b]
            order_List.push(a)
            b++
        }
        order_List.reverse()
        store.commit('SetOrder_List',order_List)
        }
      })
    },
    // 获取钱包信息
    GetUser_Wallet(store,name){
      axios.get(
      '/wallet/getWallet'
      ).then(res=>{
        // console.log(res.data)
         if(res.data.code== 200){
            if(res.data.data[0]){
              store.commit('SetUser_Wallet',res.data.data[0])
            }
         }else{
           console.log('获取失败')
         }
      }).catch(e => {})
    },
    // 修改钱包的金额
    GetChange_Amount(store,name){
      axios.put(
        '/wallet/updateWallet',
        `wallet_balances=${name[0]}&consume_flow=${name[1]}`
        ).then(res => {
          store.commit('SetUser_Wallet',res.data.data[0])
        })
    },
    // 获取优惠券类型表
    GetCoupon_Type(store,name){
      axios.get(
      '/coupon/getCouponType',
      ).then(res => {
         if(res.data.code==200){
           store.commit('SetCoupon_Type',res.data.data)
         }else{
           console.log('优惠券类型获取失败')
         }
      })
    },
    //获取消费记录表
    GetRecord_List(store,name){
      axios.post(
      '/product/getRecord'
      ).then(res => {
         if(res.data.code==200){
           var record_List = []
          for(var i of res.data.data){
            var aiod={}
            aiod = i
            if(aiod.consume_time!=null){
                aiod.consume_time=moment(aiod.consume_time).format('lll')
            }
            if(aiod.recharge_time!=null){
                aiod.recharge_time=moment(aiod.recharge_time).format('lll')
            }
            record_List.push(aiod)
          }
          //  var adio = res.data.data.reverse()
           var oido = record_List.reverse()
           store.commit('SetRecord_List',oido)
          //  console.log(res.data.data)
         }else{
          store.commit('SetRecord_List',[])
         }
      })
    }
>>>>>>> 0756acf (wangjing-v 1.0.0.1)
  },
  modules: {
  }
})
