<template>
  <div class="index">
    <div class="header">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
        <van-swipe-item v-for="(p,i) in lunbo" :key="i">
          <van-image :src="`/image/banner/${lunbo[i].simg_url}`"/>
        </van-swipe-item>
        
      </van-swipe>
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <span class="custom-title">店长推荐</span>
          <van-tag type="danger">热门</van-tag>
        </template>
      </van-cell>
      <van-grid :column-num="2">
          <van-grid-item >
            <van-image src="/image/shop/jizhao1.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="/image/shop/doupi1.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="/image/shop/paigu1.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image src="/image/shop/shenghao1.png" />
          </van-grid-item>
      </van-grid>
    </div>
    <div class="body">
        <van-cell>
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">热评</span>
            <van-tag type="success">快来围观</van-tag>
          </template>
        </van-cell>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :offset="juliBottom"
          @load="onLoad"
        >
          <div class="card" v-for="(item,i) in estimate_List" :key="i" :loading="loading">
            <div class="bg">
              <van-cell class="cell" :value='item.sp_estimate_time'>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                  <van-image  cover width="2.5rem" height='2.5rem' round class="img"
                  :src="item.user_img" alt=""/>
                  <span class="uname">{{item.name}}</span>
                </template>

              </van-cell>
              <div class="rate">
                <van-rate v-model="item.sp_estimate_star" readonly size="14px"/>
                <span>{{status[item.sp_estimate_star-1]}}</span>
              </div>
              <div class="content">{{item.sp_estimate_content}}</div>
            </div>
          </div>
        </van-list>
    </div>
  </div>
</template>
<script>
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
import {getIndex} from '../assets/js/indexapi.js'
export default {
  data(){
    return{
      juliBottom:100,      //滚动条距离底部的位置
      estimate_List: [],   //评论列表
      estimate:[], 
      lunbo:[],           //轮播图列表
      loading: false, 
      finished: false,
      loading:false,
      status:['没法吃','巨难吃','不好吃','还行吧','一个赞'],
      NoPage:0,
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      this.NoPage++;
      // console.log(11111);
      setTimeout(()=>{
        this.axios.get("/order/getEstimate",{
            params:{ page: this.NoPage}
        }).then(result=>{
          // console.log(result.data)
          if(result.data.code==200){
            for(var io of result.data.data){
              io.sp_estimate_time = moment(io.sp_estimate_time).format('lll');
            }
            this.estimate_List.push(...result.data.data)
            this.loading = false; 
          }else{
            this.finished = true;
          }
        })
      },500)
    },
  },
  mounted(){
    //轮播图数据
    var lunbo ="/product/getSwipe";
    getIndex(lunbo).then(res=>{
      // console.log(res.data);
      this.lunbo = res.data;
    });
  }
}
</script>
<style lang='less' scope>

.index{
  background-color:#fff;
  margin-top: 3rem;
  .header{
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      // line-height: 150px;
      text-align: center;
      // background-color: #39a9ed;
    }
  
  }

//评论区域样式
// .index{
  .card{
    box-shadow: 2px 1px 4px 1px #a7abaa65;
    border-radius: 5px;
    padding: 0.5rem;
    .bg{
    margin:10px;
    padding:3px;
    //头像和名称
      .cell{
        padding: 0;
        .img{
          
          vertical-align: middle;
        }
        .uname{
          font-size: 14px;
          font-weight: 900;
          color: #E62ED7;
          padding-left: 6px;
        }
      }
      //评分
      .rate{
        background-color: white;
        padding: 10px 0 ;
        span{
          padding-left: 8px;
          font-size: 12px;
          font-weight: 600;
          color:#4E05DF;
        }
      }
      //评论内容
      .content{
        // background-color: white;
        padding-bottom: 10px;
        background-color: rgb(250, 245, 241);
      }
    }
  }
}


</style>