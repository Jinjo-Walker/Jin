<template>
    <div class="payment" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">订单确定</span></template>

            <!-- <template #title_right><van-icon name="setting-o" color='#A7ABAA' size='1.1rem' /></template> -->
        </slot-header>
        <div class="body">
            <div class="head">
                <div class="card">
                    <div class="qian">
                        <van-tabs type="card"  @click='tabs_payment'>
                            <van-tab title="外卖">
                                <van-cell-group>
                                    <van-cell is-link :value="address.address" @click="select_address">
                                        <template #title>
                                            <span>请选择地址</span>
                                        </template>
                                        <template #label>
                                            <div><span>{{address.name}}</span> <span>{{address.tel}}</span> </div>
                                        </template>
                                    </van-cell>
                                </van-cell-group>
                            </van-tab>
                            <van-tab title="堂食">
                                <van-cell is-link value="郑州市金水区总店" >
                                    <template #title>
                                        <span>欢迎来店</span>
                                    </template>
                                    <template #label>
                                    </template>
                                </van-cell>
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div class="card_body">
                        <van-cell title="优惠券" :value="yhq_wan" is-link @click="select_coupon"/>
                        <van-cell title="用钱包支付享95折" :value="`使用钱包的价格：￥${(yhq_jmje*0.95).toFixed(2)}`"/>
                        <van-cell :title="`原价：￥${(parseInt(cart_List.Total_price)/100).toFixed(2)}`" :value="`优惠后价格：￥${yhq_jmje.toFixed(2)}`"/>
                    </div>
                    <div class="card_footer">
                        <van-cell title="餐品" value="数量" />
                        <div class="cell_sp"  v-for="(item,index) in cart_List.sp" :key="index">
                            <van-cell :title="item.sp_name" :label='`￥${item.sp_price}`'  :value="`x${item.car_sp_number}`" />
                        </div>
                    </div>
                    <div class="card_bz">
                        <van-cell>
                            <template #title>
                                <van-field
                                    v-model="message"
                                    label="备注"
                                    rows="2"
                                    maxlength="35"
                                    show-word-limit
                                    type="textarea"
                                    placeholder="可以备注你想要的口味等"
                                />
                            </template>
                        </van-cell>
                    </div>
                </div>
                <div class="zhanwei"></div>
                <!--  -->
                <div class='foot'>
                    <van-button type="primary" @click="onSubmit">确定</van-button>
                </div>
            </div>
        </div>
        <!-- 弹出框 -->
        <div class="dialog1">
            <van-dialog v-model="show_wm" confirm-button-text='提交' :beforeClose='onBeforeClose_wm'>
                <!-- 头部 -->
                <template #title>
                    <van-cell-group>
                        <van-cell title="选择支付方式">
                            <template #right-icon>
                                <van-icon name="share-o" @click="dialog_close"/>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </template>
                <!-- 主体部分 -->
                <template #default>
                    <div class="card">
                        <van-radio-group v-model="radio_zf" direction="horizontal" checked-color='#E62ED7'>
                            <van-radio name="1" ><van-icon name="vip-card" color='#E62ED7' size='1rem'/>余额支付</van-radio>
                            <van-radio name="2"><van-icon name="alipay" color='#1976FF' size='1rem'/>支付宝</van-radio>
                            <van-radio name="3"><van-icon name="wechat-pay" color='#00C800' size='1rem'/>微信</van-radio>
                        </van-radio-group>
                        <h3>需要支付金额：<span style="font-weight: 900;font-size: 22px;color:#7f57d1">&yen;{{radio_zf=='1'?(yhq_jmje*0.95).toFixed(2):radio_zf!='1'?yhq_jmje.toFixed(2):yhq_jmje.toFixed(2)}}</span></h3>
                    </div>
                </template>
            </van-dialog>
        </div>
        <!-- 堂食 -->
        <div class="dialog2">
            <van-dialog v-model="show_ts" confirm-button-text='确定' :beforeClose='onBeforeClose_ts'>
                <div style="width:100%;height:10rem;background:url('https://img01.yzcdn.cn/vant/ipad.jpeg'),100px,100px;"></div>
                <!-- 头部 -->
                <template #title>
                    <van-cell-group>
                        <van-cell title="订单二维码">
                            <template #right-icon>
                                <van-icon name="share-o" @click="dialog_close"/>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </template>
                <!-- 主体部分 -->
                <template #default>
                    <div class="card">
                        <van-image
                            width="10rem"
                            height="5rem"
                            fit="contain"
                            src="liantu.svg"
                        />
                    </div>
                    <van-cell value="请将二维码展示给服务人员" />
                </template>
                
            </van-dialog>
        </div>
        <div class="tanchaung">
            <van-popup v-model="password_show" position="bottom" :style="popup_height">
                <van-cell title="请输入密码"/>
                <van-password-input
                    :value="password_value"
                    info="请输入6位支付密码"
                    :error-info="errorInfo"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
                />
                <van-number-keyboard
                    v-model="password_value"
                    :show="showKeyboard"
                    maxlength='6'
                    @blur="showKeyboard = false"
                    @show='key_show'
                    @hide='key_hide'
                />
            </van-popup>
        </div>
    </div>
</template>
<script>
// 引入弹出消息框
import { Toast } from 'vant';
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
import moment from 'moment';
export default({
    data(){
        return{
            // 密码值
            password_value: '',
            // 错误信息
            errorInfo:'',
            // 键盘显示否
            showKeyboard: true,
            // 输入密码显示fou
            password_show:false,
            // 底部弹窗高度
            popup_height:{height:'58%'},
            // 备注文字
            message:'',
            // 支付方式
            radio_zf:'1',
            // 支付弹窗
            show_wm:false,
            show_ts:false,
            // 订单方式
            isno_wm:true,
            // 购物车
            cart_List:{},
            // 中转
            sp:[],
            // 优惠券类型
            yhq:'25-3',
            address:{},
            // 菜品数量
            stepper_value:[],
            // 优惠券文案
            yhq_wan:'',
            // 最后支付的金额
            yhq_jmje:0,
            // 钱包
            user_Wallet:{},
        }
    },
    methods: {
        // 密码数字键完全出现时事件
        key_show(){
            this.popup_height={height:'58%'}
        },
        // 密码数字键完全消失事件
        key_hide(){
            this.popup_height={}
        },
        // 点击选择收货地址
        select_address(){
            this.$router.push("/address")
        },
        // 点击选择优惠券
        select_coupon(){
            this.$router.push("/coupon")
        },
        // 点击提交按钮
        onSubmit(){
            if(this.isno_wm){
                this.show_wm=true
            }else{
                this.show_ts=true
            } 
        },
        // 外卖确认支付
        async onBeforeClose_wm(action, done) {
            if(this.address.tel==undefined){
                done()
                Toast({
                    message: `请选择地址`,
                    position: 'top',
                });
            }else{
                // var zf= `${this.radio_zf=='1'?'余额支付':this.radio_zf=='2'?'支付宝支付':'微信支付'}`
                if(this.radio_zf == '1'){
                    if(this.$store.state.user_Wallet.pay_pwd){
                        setTimeout(()=>{
                            Toast({
                                message: `请输入密码`,
                                position: 'top',
                            });
                            done()
                            this.password_show=true
                        },1000)
                    }else{
                        Toast({
                            message: `你未开通余额支付`,
                            position: 'top',
                        });
                        
                        setTimeout(()=>{
                            Toast({
                                message: `请先开通余额功能`,
                                position: 'top',
                            });
                            done()
                            this.$router.push("/wallet")
                        },1500)
                        
                    }
                }else{
                    Toast({
                        message: `正在跳转第三方支付`,
                        position: 'top',
                    }); 
                    done()
                }
            }  
        },
        // 堂食确认
        async onBeforeClose_ts(action, done) {
            setTimeout(()=>{
                Toast({
                message: `可在订单中查看二维码`,
                position: 'top',
                });
                done()
            },1000)
        },
        // 取消支付
        dialog_close(){
            this.show_wm=false
            this.show_ts=false
        },
        // 堂食外卖选项卡
        tabs_payment(name,title){
            // console.log(name,title)
            if(title=='外卖'){
                this.isno_wm=true
            }else{
                this.isno_wm=false
            }
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
        // 初始化钱包、
        this.user_Wallet=this.$store.state.user_Wallet
        // 初始化商品列表
        this.cart_List=this.$store.state.cart_List
        // console.log(this.cart_List)
        this.sp=[]
        for(var i of this.$store.state.cart_List.sp){
            if(i.car_sp_number!=0){
                this.sp.push(i)
            }
        }
        this.cart_List.sp = this.sp
        // 地址选择初始化
        for(var j of this.$store.state.address_List){
            if(j.isno){
                this.address=j
            }
        } 
        // 优惠券初始化
        if(this.$store.state.is_Coupon.value!=undefined){
            this.yhq_wan =this.$store.state.is_Coupon.name
            this.yhq_jmje = parseInt(this.cart_List.Total_price)/100-this.$store.state.is_Coupon.value
            var clt = parseInt(this.cart_List.Total_price)/100-0
            if(this.cart_List.Total_price/100<15){
                if(this.$store.state.is_Coupon.value>=2){
                    this.yhq_jmje=clt
                }
            }else if(this.cart_List.Total_price/100<25){
                if(this.$store.state.is_Coupon.value>=4){
                    this.yhq_jmje=clt
                }
            }else if(this.cart_List.Total_price/100<50){
                if(this.$store.state.is_Coupon.value>=10){
                    this.yhq_jmje=clt
                }
            }else if(this.cart_List.Total_price/100<100){
                if(this.$store.state.is_Coupon.value>=20){
                    this.yhq_jmje=clt
                }
            }
        }else{
            this.yhq_wan ='未选择优惠券'
            this.yhq_jmje = this.cart_List.Total_price/100
        }
    },
    watch:{
        // 支付密码判断
        password_value() {
            if(this.password_value.length>0){
                this.errorInfo =''
            }
            if (this.password_value.length === 6){
                if(this.password_value != this.$store.state.user_Wallet.pay_pwd){
                    this.errorInfo = '密码错误';
                    this.password_value='';
                } else if(this.password_value == this.$store.state.user_Wallet.pay_pwd){
                    // 密码正确扣款
                    var qian = this.$store.state.user_Wallet.wallet_balances-this.yhq_jmje*0.95
                    var ysqian = this.$store.state.user_Wallet.wallet_balances
                    if(qian>=0){
                            this.user_Wallet.wallet_balances=qian
                            this.$store.commit('SetUser_Wallet',this.user_Wallet)
                            this.$store.dispatch('GetChange_Amount',[this.user_Wallet.wallet_balances,'1']).then(()=>{
                            if(this.$store.state.user_Wallet.wallet_balances<=ysqian){
                                 // 生成订单
                                 var cart_List = ''
                                //  console.log(this.cart_List.sp)
                                 for(var i of this.cart_List.sp){
                                     var cart=`{
                                         uid:${this.$store.state.user_Info.uid},
                                         spid:${i.spid},
                                         car_sp_number:${i.car_sp_number}
                                     },`
                                       cart_List += cart
                                 }
                                //  var aa = `[${cart_List}]`
                                //  console.log(cart_List)
                                this.axios.post(
                                '/order/setOrder',
                                `carts=${cart_List}&phone=${this.address.tel}&users_address=${this.address.address}&order_money=${this.yhq_jmje*0.95}&order_pay_status=1&order_status=0&remarks=${this.message}&user_name=${this.address.name}`
                                ).then(res => {
                                    // console.log(`提交订单获得的数据1${res.data}`)
                                    if(res.data.code==200){
                                        // console.log(`提交订单获得的数据2${res.data}`)
                                        // 优惠券过期
                                        if(this.$store.state.is_Coupon.value!=undefined){
                                            this.axios.put(
                                            '/coupon/updateCoupon',
                                            `isTimeOut=1&hid=${this.$store.state.is_Coupon.hid}`
                                            ).then(res=>{
                                                if(res.data.code==200){
                                                    var coupon_List=[]
                                                    var list = {}
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
                                                    // console.log(res.data.data)
                                                    //  获得用户所有优惠券
                                                    this.$store.commit('SetCoupon_List',coupon_List)
                                                }
                                            })
                                        }
                                        Toast({
                                            message: `支付成功`,
                                            position: 'top',
                                        });
                                        this.errorInfo = '';
                                        this.password_value='';
                                        this.$store.commit('SetCart_spsl',0)
                                        this.$store.commit('SetCart_List',{
                                            uid:1,
                                            sp:[],
                                            car_status:0,
                                            car_create_time:'',
                                            car_update_time:'',
                                            Total_price:0
                                        })
                                        history.go(-2)  
                                        this.password_show=false
                                    }
                                    
                                })
                                
                            }else{
                                Toast({
                                    message: `支付失败`,
                                    position: 'top',
                                });
                                this.password_show=false
                            }
                        })
                    }else{
                        Toast({
                            message: `余额不足，请充值`,
                            position: 'top',
                        });
                        this.password_show=false
                    } 
                }
            }
        }
    }
})
</script>

<style lang="less">
.payment{
    height: 90vh;
    .body{
        .head{
            .card{
                position: relative;
                height: 5rem;
                background: linear-gradient(#E62ED7,#E61ED6,#E62ED7,#E61ED6);
                // box-shadow: 2px 1px 4px 1px #A7ABAA;
                .qian{
                    position: absolute;    
                    left: 50%;
                    top: 50%;
                    margin-top: -2rem;
                    margin-left: -10.5rem;
                    margin-right: 7.5rem;
                    width: 21rem;
                    height: 7rem;
                    background-color: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 2px 1px 4px 1px #a7abaa65;
                    .van-tabs--card{
                        width: 99%;
                        margin: 0 auto;
                        margin-top: 0.6rem;
                        .van-tabs__nav--card{
                            border: 1px solid #4E05DF ;
                            .van-tab.van-tab--active{
                                background-color: #4E05DF;
                                border-right: 1px solid #4E05DF ;
                            }
                        }
                        // .van-tabs__wrap{
                            
                        // }
                        .van-tabs__content{
                            margin-top: 1rem;
                            .van-cell__title{
                                color:#4E05DF ;
                                font-weight: 900;
                                font-size: 14px;
                            }
                            .van-cell__value{
                                font-weight: 300;
                                font-size: 12px;
                                height: 3rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }   
                    }
                }
                .card_body{
                    position: absolute;    
                    left: 50%;
                    top: 50%;
                    margin-top: 5.6rem;
                    margin-left: -10.5rem;
                    margin-right: 7.5rem;
                    width: 21rem;
                    height: 8.5rem;
                    background-color: white;
                    border-radius: 10px;
                    overflow:auto;
                    box-shadow: 2px 1px 4px 1px #a7abaa65;
                    .van-cell:first-child {
                        .van-cell__title{
                            color:#4E05DF ;
                            font-weight: 900;
                            font-size: 14px;
                        }
                        .van-cell__value{
                            font-weight: 300;
                            font-size: 12px;
                        }
                    }
                    .van-cell:nth-child(2){
                        .van-cell__title{
                            color:red;
                            font-weight: 900;
                            font-size: 12px;
                        }
                        .van-cell__value{
                            font-weight: 600;
                            color: #E62ED7;
                            font-size: 12px;
                        }
                    } 
                    .van-cell:last-child{
                        .van-cell__title{
                            color:#a7abaa;
                            text-decoration:line-through;
                            font-weight: 500;
                            font-size: 12px;
                        }
                        .van-cell__value{
                            font-weight: 600;
                            color: red;
                            font-size: 12px;
                        }
                    }
                }
                .card_footer{
                    position: absolute;    
                    left: 50%;
                    top: 50%;
                    margin-top: 14.5rem;
                    margin-left: -10.5rem;
                    margin-right: 7.5rem;
                    width: 21rem;
                    height: 14.5rem;
                    background-color: white;
                    border-radius: 10px;
                    overflow:auto;
                    box-shadow: 2px 1px 4px 1px #a7abaa65;
                    .van-cell:first-child {
                        .van-cell__title{
                            color:#4E05DF ;
                            font-weight: 900;
                            font-size: 16px;
                        }
                        .van-cell__value{
                            font-weight: 300;
                            font-size: 12px;
                        }
                    }
                    .van-cell:last-child{
                        .van-cell__title{
                            color:#E62ED7;
                            font-weight: 600;
                            font-size: 12px;
                        }
                        .van-cell__value{
                            font-weight: 300;
                            font-size: 12px;
                        }
                    } 
                }
                .card_bz{
                    position: absolute;    
                    left: 50%;
                    top: 50%;
                    margin-top: 29.5rem;
                    margin-left: -10.5rem;
                    margin-right: 7.5rem;
                    width: 21rem;
                    height: 4rem;
                    background-color: white;
                    border-radius: 10px;
                    overflow:auto;
                    box-shadow: 2px 1px 4px 1px #a7abaa65;
                    .van-cell{
                        height: 100%;
                        .van-cell__title{
                            .van-field{
                                padding: 0;
                                height: 100%;
                                .van-cell__title{
                                    margin-right: 0;
                                    width: 15%;
                                    margin:auto 0;
                                    color:#4E05DF ;
                                    font-weight: 900;
                                    font-size: 16px;
                                }
                                .van-cell__value{
                                    margin:auto 0;
                                    margin: 0;
                                    background-color:#e7e7e765 ;
                                    .van-field__control{
                                        min-height: 100%;
                                        color: black;
                                        font-weight: 400;
                                        font-size: 12px;
                                        padding-left: 0.2rem;
                                        padding-top: 0.1rem;
                                        line-height: 15px;
                                    }
                                    .van-field__word-limit{
                                        margin-top: 0;color: #E62ED7;
                                        .van-field__word-num{color: black;}
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .zhanwei{
                width: 100%;
                height: 3.2rem;
                background-color: white;
            }
        }
        .foot{
            position: absolute;
            bottom: 0;
            .van-button{
                width: 100vw;
            }
        }
    }
    .dialog1{
        .van-dialog{
        .van-dialog__header{
            padding: 0;
            width: 100%;
            .van-cell-group{
                margin: 0;
                .van-cell{
                    border: 0;
                    margin: 0;
                    .van-cell__title{
                        span{
                            font-weight: 900;
                            font-size: 14px;
                            color: #4E05DF;
                        }
                    }
                }
            } 
        }
        .van-dialog__content{
            height: 7rem;
            h3{
                font-size: 16px;
                font-weight: bold;
                text-align: center;
            }
            .van-radio-group{
                margin-top: 0.8rem;
                
                display: flex;
                .van-radio{
                    font-size: 14px;
                    font-weight: 900;
                    margin: 0 auto;
                    .van-icon{
                        margin-top: 0.5rem;
                        padding: 0;
                        margin: 0;
                    }
                }
                .van-radio:first-child{
                    margin-left: 0.5rem;
                }
            }
        }
        .van-dialog__footer{
            .van-button__content{
                background-color: #7f57d1;
                .van-button__text{
                    font-weight: 900;
                    // font-size: 14px;
                    color: white;
                }
            }
        }
        }
    }
    .dialog2{
        .van-dialog{
            .van-dialog__header{
                padding: 0;
            }
            .van-dialog__content{
                .card{
                    display: flex;
                    flex-direction:column;
                    align-items:center;
                    padding: 0.5rem;
                    .van-image{
                        width: 100%;
                        flex: 1.9;
                    }
                }
                .van-cell{
                    .van-cell__value{
                        span{
                            margin: 0 4.5rem;
                            color: #E62ED7;
                            font-weight: 900;
                            font-size: 12px;
                        }
                    }
                }
            }
            .van-dialog__footer{
                .van-button--default{
                    background-color: #7f57d1;
                    .van-button__content{
                        .van-button__text{
                            font-weight: 900;
                            // font-size: 14px;
                            color: white;
                        }
                    }
                }
            }
        }
    }
}
</style>