<template>
<<<<<<< HEAD
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
=======
  <div class="home" style="position: relative">
    <my-header @showPopup='getdata' ></my-header>
    <!-- 弹出分享 -->
    <van-share-sheet
      v-model='van_share_sheet_show'
      title="分享给好友有好礼"
      :options="options"
      @select="onSelect"
    />
    <!-- 弹窗广告 -->
    <van-overlay v-show="overlay" show>
      <template #default>
        <div class="wrapper" @click.stop>
          <div class="block" style="background-image: url('guanggao.png');background-size: 16rem 20rem;">
            <van-tag plain type="primary" style="float:right;margin: 0.5rem;">广告</van-tag>
          </div>
          <van-icon name="close" color='#E62ED7' size='2rem' style="margin-top:1.5rem" @click="close"/>
        </div>
      </template>
    </van-overlay>
    <!-- 侧滑栏内容 -->
    <van-popup style="background-image: url('guanggao.png');background-size:cover" v-model="show_ch" closeable close-icon="arrow-left" color='#e62ed76e' close-icon-position="top-right" position="left" :style="{ width: '80%',height:'100%' }">
      <!-- 侧边栏页头部分 -->
      <van-card>
          <template #title>
            <!-- 用户名写在这里 -->
            <div @click="login" style="line-height: 1.5rem;color:#fff;margin-top:1.2rem;font-size:1.3rem;font-weight: 900;margin-bottom:0.5rem;text-shadow:10px -3px 10px #E62ED7;">{{user_info.user_name?user_info.user_name:user_info.uname?user_info.uname:'登录'}}</div> 
          </template>
          <template #thumb>
            <van-image round  style="box-shadow: 1px 1px 10px 6px rgba(0, 0, 0, 0.411);border:1px solid rgba(0, 0, 0, 0.411);margin:0.6rem" width="4rem" height="3.8rem" :src="user_info.user_img==undefined?'https://img01.yzcdn.cn/vant/cat.jpeg':user_info.user_img"/>
          </template>
          <template #tags>
            <van-tag plain type="danger">消费达人</van-tag>
          </template>
      </van-card>
      <div class="img2" style="margin:1%;border-radius: 5px;">
        <img src="logo1.png" alt="">
      </div>
      <!-- 侧边栏功能部分 :clickable='true'-->
      <van-cell-group inset >
        <van-cell :border='false' :center='true' title="个人信息" icon="manager-o" @click="user"/>
        <van-cell :border='false' :center='true' title="消费记录" icon="description" @click="record"/>
        <van-cell :border='false' :center='true' title="我的钱包" :value="`￥${this.$store.state.user_Wallet.wallet_balances? Number(this.$store.state.user_Wallet.wallet_balances).toFixed(2):(0).toFixed(2)}`"  @click="wallet" icon="pending-payment"/>
        <van-cell :border='false' :center='true' title="领优惠券" icon="coupon-o" @click="coupon"/>
        <van-cell :border='false' :center='true' title="推荐有礼" icon="point-gift-o" @click='share' />
        <van-cell :border='false' :center='true' title="跟店长说" icon="chat-o" @click="chat"/>
        <!-- <van-cell :border='false' :center='true' title="设置" icon="location-o" /> -->
      </van-cell-group>
      <!-- 底部设置部分 -->
      <div class="shezhi">
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div style="display: flex;">
              <!-- 设置按钮 -->
              <div @click="setup" style="display: flex; flex-direction: column;align-items：center;justify-content :center">
                <van-icon name="setting-o" size='1.2rem'/>
                <span style="font-size:12px;font-weight:600">设置</span>
              </div>
              <!-- 风格更换 -->
              <div style="display: flex; flex-direction: column;align-items：center;justify-content :center;margin-left:15px">
                <van-icon name="smile-o" size='1.2rem'/>
                <span style="font-size:12px;font-weight:600">夜间</span>
              </div>
              <!-- 天气提醒 -->
              <div style="display: flex; flex-direction: column;align-items：center;justify-content :center;margin-left:15px">
                <span style="font-size:12px;font-weight:300;height:19px">30℃</span>
                <span style="font-size:12px;font-weight:600">郑州</span>
              </div>
            </div>
            <!-- <van-tag type="danger">标签</van-tag> -->
          </template>
        </van-cell>
      </div>
    </van-popup>
    <my-body @showPopup='getdata_'></my-body>
  </div>
</template>
<style lang='less'>
// 分享
.home .van-share-sheet{
  .van-share-sheet__title{
    font-weight: 900;
    font-size: 12px;
    color: #4E05DF;
  }
  .van-share-sheet__cancel{
    padding:0;
    margin: 0;
    border-radius:0;
    border: 1px solid #E62ED7;
    background-color: white;
    color: #E62ED7;
    font-size: 0.8rem;
    font-weight: 800;
  }
  .van-share-sheet__cancel::before{
   height: 0px;
  }
}
/* 侧滑logo */
.home .img2{
    overflow: hidden;
    height: 2rem;
    img{
        width: 30%;
        height: 2rem;
        margin-left:35%
    }
}
.home .van-overlay{
  z-index:1001
}
/* 一下时时弹窗样式 */
.home .wrapper {
  /* overflow: hidden; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* height: 100%; */
    width: 16rem;
    margin: 12rem auto;
    flex-wrap:wrap;
    
  }

 .home .block {
    width: 16rem;
    height: 20rem;
    
  }
  /*  */
.home .van-tabs__nav{
  height: 55px;
  padding-bottom: 0;
}
/* 标签下边框选中样式 */
.home  .van-tabs__line{
  
  z-index: 0;
  /* border-bottom-left-radius:2px; */
  /* border-top-right-radius:2px */
}


.home .van-tab .van-tab__text{
  display:flex;
  justify-content: center;
  align-items: center;
  overflow:visible;
  font-size: 14px;
  font-weight: 600;
  /* color: ; */
}
/* 侧边栏 */
.home .van-popup--left{
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
/* 侧边栏父 */
.home .van-card__thumb{
  height: 64px;
  width: 64px;
}
.home .van-card{
  flex: 0;
  display: flex;
  justify-content:space-between;
  align-items:center;
  background-color: rgba(255, 255, 255, 0);
}
/* 用户名主题 标签 */
.home .van-card__content{
  /* display: flex; 
  flex-wrap:wrap;
  align-items:center */
  height: 64px;
  margin-left: 20px ;
}
.home .van-image{
    
    img{
      text-align: center;
    }
} 
/* 侧边栏功能区 */
.home .van-cell-group{
flex: 1;
background-color: rgba(0, 0, 0, 0.205);
margin-top: 5%;
height: 50%;
/* box-shadow: 1px 1px 3px 2px #8D1BAE; */
}
.home .van-popup--left .van-cell{
background-color: rgba(0, 0, 0, 0);
font-weight:900;
color:white;
}
.home .van-cell-group .van-cell:nth-child(1){
  margin-top: 15%;
}
/* 侧边栏设置底部区域 */
.home .shezhi{
  flex: 0
}
</style>

<script>
// 引入弹出框的函数
import { Dialog } from 'vant';
import { Toast } from 'vant';
import moment from 'moment';
export default {
  data() {
    return {
      // 用户基本信息
      user_info:{},
      // 侧滑栏初始状态
      show_ch: false,
      // 广告窗口初始状态
      overlay:false,
      // 分享弹窗
      van_share_sheet_show: false,
      // 分享列表
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
    };
  },
  methods:{
    // 前往登录
    login(){
      if(!this.user_info.uname){
        this.$router.push("/login")
      }else{
        this.$router.push("/user")
      }
      
    },
    // 接到子元素页头的传来的值，控制侧滑栏的显示隐藏
   getdata(t){
     this.show_ch=t
   },
   getdata_(t){
     this.show_ch=t
   },
  //  点击个人信息按钮
  user(){
    if(this.$store.state.login_State){
      this.$router.push("/user")
      }else{
        Toast({
          message: '请登录',
          position: 'top',
        });
      }
  },
  // 点击消费记录
  record(){
    if(this.$store.state.login_State){
      this.$router.push("/record")
    }else{
        Toast({
          message: '请登录',
          position: 'top',
        });
      }
  },
  // 点击我的钱包
  wallet(){
    if(this.$store.state.login_State){
      this.$router.push("/wallet")
    }else{
        Toast({
          message: '请登录',
          position: 'top',
        });
      }
  },
  // 点击领优惠券
  coupon(){
    if(this.$store.state.login_State){
      this.$router.push("/coupon")
    }else{
        Toast({
          message: '请登录',
          position: 'top',
        });
      }
  },
  // 点击分享给好友
  share(){
    this.van_share_sheet_show = true;
  },
  // 点击分享选项
  onSelect(option) {
    Dialog.alert({
      message: `感谢您${option.name}分享\n为表示感谢:)\n特送出FJ2195优惠券\n可在一个月内使用`,
    }).then(() => {
      // on close
    });
    this.van_share_sheet_show = false;
  },
  //点击跟店长说
  chat(){
    this.$router.push('/chatBox');
  },
  //  设置按钮的点击事件
   setup(){
     this.$router.push("/setup")
   },
  //  关闭广告弹窗
   close(){
     this.overlay=false
     this.$store.commit('SetOverLay',false)
   }
  },
  mounted(){
    // 判断登录状态
    if(this.$store.state.login_State){
      // 获取消费记录表
      this.$store.dispatch('GetRecord_List')
      // 获取订单详情
      this.$store.dispatch('GetOrder_List')
      // 获取用户的地址表
      this.$store.dispatch('GetAddress_List')
      // console.log(this.$store.state.address_List)
      // 获取消费记录
      this.$store.dispatch('GetRecord_List')
      // 获取优惠券类型表
      this.$store.dispatch('GetCoupon_Type')
      //  获取用户优惠券表
      this.axios.post(
      '/coupon/getCoupon',
      ).then(res => {
        var coupon_List=[]
        var list = {}
        if(res.data.code==200){
          for(var i of res.data.data){
            list = {
              hid:i.hid,
              isTimeOut:i.isTimeOut,
              available: 1,
              condition: '全场可用',
              reason: '已经使用了',
              value:i.sp_coupon_type=='XZXZ66'?2:i.sp_coupon_type=='CV5690'?4:i.sp_coupon_type=='FJ2195'?10:i.sp_coupon_type=='56V8B0'?20:0,
              name: i.sp_coupon_type=='XZXZ66'?'满15减2':i.sp_coupon_type=='CV5690'?'满25减4':i.sp_coupon_type=='FJ2195'?'满50减10':i.sp_coupon_type=='56V8B0'?'满100减20':'八折',
              startAt: moment(i.lqsj).valueOf(),
              endAt:moment(i.dqsj).valueOf(),
              valueDesc:i.sp_coupon_type=='XZXZ66'?'2':i.sp_coupon_type=='CV5690'?'4':i.sp_coupon_type=='FJ2195'?'10':i.sp_coupon_type=='56V8B0'?'20':'0',
              unitDesc: '元',
            }
            coupon_List.push(list)
          }
          //  获得用户所有优惠券
          this.$store.commit('SetCoupon_List',coupon_List)
        }
      })
    }else{
      Toast({
        message: '请登录',
        position: 'top',
      });
      // this.$router.push("/login")
    }
    if(!this.$store.state.product_List[0]){
          // axios请求获取商品列表
        this.$store.dispatch('GetProduct_List','1')
    }
    if(!this.$store.state.typeList[0]){
      // axios请求获取商品分类
      this.$store.dispatch('GetTypeList','1')
    }
      // 获取弹窗广告状态
    this.overlay = this.$store.state.overLay
  },
  updated(){
    if(!this.user_info.uid){
      // 获取用户基本信息
      this.user_info = this.$store.state.user_Info
      // 获取服务器端登录状态
      this.$store.dispatch('GetLogin_State')
    }
  },
  created(){
    // 初始化钱包信息
    if(this.$store.state.user_Wallet.pay_pwd==undefined){
    // 获取用户的钱包
        this.$store.dispatch('GetUser_Wallet')
        // console.log(this.$store.state.user_Wallet)
    }
>>>>>>> 0756acf (wangjing-v 1.0.0.1)
  }
}
</script>
