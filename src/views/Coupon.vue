<template>
    <div class="coupon" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">优惠券</span></template>
            <template #title_right><van-icon name="success" @click="queding" color='#A7ABAA' size='1.1rem'/></template>
        </slot-header>
        <div class="body">
            <div class="head">
                <div class="card">
                    <van-coupon-list
                        :coupons="coupons"
                        :chosen-coupon="chosenCoupon"
                        :disabled-coupons="disabledCoupons"
                        @change="onChange"
                        @exchange="onExchange"
                        :exchange-button-loading='exchange_button_loading'
                    />  
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// var coupon={
//     available: 1,
//     condition: '全场可用',
//     reason: '来晚啦，过期咯',
//     value: 3,
//     name: '满30减3',
//     startAt: 1489104000,
//     endAt: 1514592000,
//     valueDesc: '3',
//     unitDesc: '元',
// };
// 引入弹出消息框
import { Toast } from 'vant';
import moment from 'moment';
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
export default({
    data(){
        return{
            // 兑换加载动画
            exchange_button_loading:false,
            chosenCoupon: -1,
            // 优惠券对象
            coupons: [],
            // 过期
            disabledCoupons: [],
            // 优惠券类型
            yhq:'25-3',
        }
    },
    methods: {
        // 选中优惠券
        onChange(index) {
            this.chosenCoupon = index; 
            // console.log(index)
            this.$store.commit('SetIs_Coupon',this.coupons[index])
            console.log(this.$store.state.is_Coupon)
        },
        // 兑换
        onExchange(code) {
            this.axios.post(
                '/coupon/addCoupon',
                `sp_coupon_type=${code}`
            ).then(res=>{
                if(res.data.code == 200){
                    var coupon
                    for(var i of this.$store.state.coupon_Type){
                        this.exchange_button_loading=true
                        if(code == i.sp_coupon_no){
                             coupon={
                                hid:res.data.data.hid,
                                available: 1,
                                condition: '全场可用',
                                reason: '已经使用了',
                                value:i.sp_coupon_type=='15-2'?2:i.sp_coupon_type=='25-4'?4:i.sp_coupon_type=='50-10'?10:i.sp_coupon_type=='100-20'?20:0,
                                name: i.sp_coupon_type=='15-2'?'满15减2':i.sp_coupon_type=='25-4'?'满25减4':i.sp_coupon_type=='50-10'?'满50减10':i.sp_coupon_type=='100-20'?'满100减20':'八折',
                                startAt: moment(i.coupon_start_time).valueOf(),
                                endAt:moment(i.coupon_end_time).valueOf(),
                                valueDesc:i.sp_coupon_type=='15-2'?'2':i.sp_coupon_type=='25-4'?'4':i.sp_coupon_type=='50-10'?'10':i.sp_coupon_type=='100-20'?'20':'0',
                                unitDesc: '元',
                            };
                        }
                    }
                    setTimeout(()=>{
                        Toast({
                            message: '领取成功',
                            position: 'top',
                        });
                        this.coupons.push(coupon);
                        this.exchange_button_loading=false
                    },1000)
                }else if(res.data.code == -1){
                    Toast({
                        message: '领取失败',
                        position: 'top',
                    });
                }else if(res.data.code ==201){
                    Toast({
                        message: '你已经领过了',
                        position: 'top',
                    });
                }
            })
            
        },
        // 右上角确定按钮
        queding(){
            history.go(-1)
        },
        // 以下是滑动退出事件
        touchstart({changedTouches}){
        startPoint = {
                x: changedTouches[0].pageX,
                y: changedTouches[0].pageY
            }
        // console.log(startPoint)
        },
        touchend(e){
            let touch = e.changedTouches[0];
            let nowPoint = {
                x: touch.pageX,
                y: touch.pageY
            };
            disPoint = {
                x: nowPoint.x - startPoint.x,
                y: nowPoint.y - startPoint.y
            };
            if(startPoint.x<20&&disPoint.x>120){
                history.go(-1)
            }
        },
        
    },
    mounted(){
        for(var i of this.$store.state.coupon_List){
            if(i.isTimeOut=='0'){
                this.coupons.push(i)
            }else{
                this.disabledCoupons.push(i)
            }
        }
        // this.coupons=this.$store.state.coupon_List
    },
})
</script>

<style lang="less">
.coupon{
    height: 90vh;
    .body{
        .head{
            .card{
                position: relative;
                height: 10rem;
                background: linear-gradient(#E62ED7,#E61ED6,#E62ED7,#E61ED6);
                // box-shadow: 2px 1px 4px 1px #A7ABAA;
                .van-coupon-list{
                    // position: absolute;
                    margin:0 auto;
                    top: 0.5rem;
                    width: 95%;
                    margin-left: 2.5%;
                    height: 36rem;
                    .van-coupon-list__exchange-bar{
                        .van-field__body{
                            border-radius: 0;
                        }
                        .van-button--plain{
                            color:#E62ED7 ;
                            font-weight: 900;
                        }
                    }
                    .van-coupon-list__tab{
                        .van-tabs__wrap{
                            .van-tab__text{
                                color: black;
                                font-weight: 900;
                                font-size: 14px;
                            }
                        }
                        .van-tabs__content{
                            .van-coupon__head{
                                .van-coupon__amount{
                                    color: #E62ED7;
                                }
                                .van-coupon__condition{
                                    color: dimgray;
                                }
                            }
                            .van-coupon__body{
                                .van-coupon__name{
                                    color: #4E05DF;
                                    font-weight: 900;
                                    font-size: 14px;
                                }
                                .van-checkbox{
                                    .van-checkbox__icon--checked 
                                    .van-icon {
                                        color: #fff;
                                        background-color: #E62ED7 !important;
                                        border-color: #E62ED7 !important;
                                    }
                                }
                            }
                        }
                    }
                    .van-coupon-list__bottom{
                        position:fixed;
                        bottom: 0;
                        padding: 0;
                        background-color:'#e7e7e7cc';
                        .van-button{
                            padding:0;
                            margin: 0;
                            border-radius:0;
                            border: 1px solid #E62ED7;
                            background-color: white;
                            color: #E62ED7;
                            font-size: 0.8rem;
                            font-weight: 800;
                        }
                    }
                }
            }
        }
    }
}
</style>