<template>
    <div class="wallet" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">我的钱包</span></template>
            <template #title_right><van-icon name="setting-o" color='#A7ABAA' size='1.1rem' @click="wallet_pwd"/></template>
        </slot-header>
        <div class="body">
            <div class="card">
                <div class="qian">
                    <div class="qian_header">
                        <span>可用余额（元）</span>
                        <h2>{{user_Wallet.wallet_balances?Number(user_Wallet.wallet_balances).toFixed(2):(0).toFixed(2)}}</h2>
                        <div class="h6">优先使用余额 / 使用余额一律<span style="color:#4E05DF">95</span>折</div>
                    </div>
                    <div class="qian_footer">
                        <van-button type="default" color='#A7ABAA' @click="tixian">提现</van-button>
                        <van-button type="default" color='#E62ED7' @click="action_sheet_show=true">充值</van-button>
                    </div>
                </div>
            </div>
            <div class="zhanwei"></div>
            <div class="shen">
                <van-cell value="查看全部" @click="all_record" is-link>
                    <template #right-icon>
                        <van-icon name="arrow" color='#4E05DF' size='1rem' style="margin-top:0.25rem"/>
                    </template>
                    <template #title>
                        <span class="custom-title" style="font-weight:900;font-size:14px;color:#A7ABAA;">余额变动明细</span>
                    </template>
                </van-cell>
                <van-divider>最近明细</van-divider>
                <van-cell center :label="item.consume_flow=='1'||item.consume_flow=='3'?item.consume_time:item.recharge_time" v-for="(item,index) of record_List" :key="index">
                    <template #title>
                        <span style="font-weight:900;font-size:14px;color:#2A3139;margin:0 0.2rem 0rem 0.1rem">{{item.consume_flow=='1'?'消费':item.consume_flow=='2'?'充值':'提现'}}</span>
                         <van-tag  :type="item.consume_flow=='1'?'primary':item.consume_flow=='2'?'success':'warning'">{{item.consume_flow=='1'?'已送达':item.consume_flow=='2'?'实时到账':'提现成功'}}</van-tag>
                    </template>
                    <template #default>
                        <span style="font-weight:800;font-size:12px;color:#A7ABAA">结余￥</span><span style="color:#4E05DF;font-weight:800;font-size:16px;">{{item.consume_flow=='1'?Number(item.consume_money).toFixed(2):Number(item.recharge_money).toFixed(2)}}</span><br>
                    </template>
                </van-cell>
            </div>
        </div>
        <div class="footer">
            <van-action-sheet v-model="action_sheet_show" title="充值">
                <van-cell>
                    <template #title>
                        <div style="margin-top:0.7rem">请选择充值方式：</div>
                    </template>
                    <template #default>
                        <van-dropdown-menu>
                            <van-dropdown-item v-model="dropdown_value" :overlay='false' :options="[{ text: '银行卡', value: 0 },{ text: '支付宝', value: 1 },{ text: '微信', value: 2 }]" />
                        </van-dropdown-menu>
                    </template>
                </van-cell>
                <van-field
                    v-model="digit_value"
                    type="digit"
                    label="金额（￥）："
                    input-align="left"
                />
                <van-button type="info" @click="digit_value_button">确定充值</van-button>
            </van-action-sheet>
        </div>
        <!-- 弹出框 -->
        <div class="dialog1">
            <van-dialog v-model="show_xgmm" confirm-button-text='确定' :beforeClose='onBeforeClose_xgmm'>
                <!-- 头部 -->
                <template #title>
                    <van-cell-group>
                        <van-cell :title="dialog_title">
                            <template #right-icon>
                                <van-icon name="share-o" @click="dialog_close"/>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </template>
                <!-- 主体部分 -->
                <template #default>
                    <div class="card">
                        {{dialog_content}}
                    </div>
                </template>
            </van-dialog>
        </div>
        <!-- 修改密码弹窗 -->
        <div class="tanchaung">
            <van-popup v-model="wallet_password_show" :close-on-click-overlay='close_on_click_overlaye' position="bottom" :style="popup_height">
                <van-cell :title="xgmm_title"/>
                <van-password-input
                    :value="wallet_password_number==0?wallet_password_value:wallet_password_number==1?wallet_password_value1:wallet_password_value2"
                    info="密码为 6 位数字"
                    :error-info="errorInfo"
                    :focused="true"
                    @focus="wallet_password_number==0?showKeyboard=true:wallet_password_number==1?showKeyboard_1=true:showKeyboard_2=true"
                />
                <van-number-keyboard
                    v-model="wallet_password_value"
                    :show="showKeyboard"
                    maxlength='6'
                    @blur="showKeyboard = false"
                    @show='key_show'
                    @hide='key_hide'
                />
                <van-number-keyboard
                    v-model="wallet_password_value1"
                    :show="showKeyboard_1"
                    maxlength='6'
                    @blur="showKeyboard_1 = false"
                    @show='key_show'
                    @hide='key_hide'
                />
                <van-number-keyboard
                    v-model="wallet_password_value2"
                    :show="showKeyboard_2"
                    maxlength='6'
                    @blur="showKeyboard_2 = false"
                    @show='key_show'
                    @hide='key_hide'
                />
            </van-popup>
        </div>
    </div>
</template>
<style  lang='less'>
    .wallet{
        background-color:#e7e7e7cc ;
        .body{
            .card{
                position: relative;
                height: 10rem;
                background: linear-gradient(#E62ED7,#E61ED6,#E62ED7,#E61ED6);
                // box-shadow: 2px 1px 4px 1px #A7ABAA;
                .qian{
                    position: absolute;    
                    left: 50%;
                    top: 50%;
                    margin-top: -2rem;
                    margin-left: -10rem;
                    margin-right: 7.5rem;
                    width: 20rem;
                    height: 10rem;
                    background-color: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 2px 1px 4px 1px #a7abaa65;
                    .qian_header{
                        margin: 0 auto;
                        text-align: center;
                        span{
                            width: 100%;  
                            line-height: 2.5rem;
                            font-weight:bold;
                            font-size: 14px;
                            color: #4E05DF;
                        }
                        h2{
                           margin: 0.5rem 0;
                           color: #E62ED7;
                        }
                        .h6{
                            text-align: center;
                            font-size: 12px;
                            font-weight: 200;
                            color: rgb(0, 0, 0);
                            line-height: 8px;
                        }
                    }
                    .qian_footer{
                        position:absolute;
                        bottom: 0;
                        width: 100%;
                        
                        .van-button {
                            width: 50%;
                        }
                    }
                }
            }
            .zhanwei{
                width: 100%;
                height: 3.2rem;
                background-color: white;
            }
            .shen{
                margin: 0 auto;
                // padding-top: 4rem;
                // width: 95%;
                height: 34.5rem;
                padding: 0.2rem;
                background-color: white;
                // border-radius: 5px;
                border-end-start-radius: 5px;
                border-end-end-radius: 5px;
                // box-shadow: 2px 1px 4px 1px #a7abaa65;
                .van-cell__value{
                    color:#4E05DF ;
                }
            }
        }
        .footer{
            .van-popup--round{
                height: 18rem;
                .van-button--info{
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                }
            }
            .van-field{
                .van-field__control{
                    background-color:#a7abaa65;
                    margin: 0.2rem;
                    color: #4E05DF;
                    font-size: 16px;
                    font-weight: 900;
                    height: 4rem;
                    text-align: center;
                }
            }
            
        }
        .dialog1{
            .van-dialog{
                .van-dialog__header{
                    padding: 0;
                    .van-cell{
                        .van-cell__title{
                            span{
                                margin: 0 4.5rem;
                                color: #7f57d1;
                                font-weight: 900;
                                font-size: 12px;
                            }
                        }
                    }
                }
                .van-dialog__content{
                    .card{
                        display: flex;
                        flex-direction:column;
                        align-items:center;
                        padding: 1rem;
                        text-align: center;
                        color: black;
                        font-weight: 900;
                        font-size: 12px;
                        height: 3rem;
                        padding: 2rem;
                    }
                    
                }
                .van-dialog__footer{
                    .van-button--default{
                        background-color: #7f57d1;
                        .van-button__content{
                            .van-button__text{
                                // font-weight: 900;
                                // font-size: 14px;
                                color: white;
                                font-weight: 900;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
<script>
import { Toast } from 'vant';
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
export default({
    data() {
        return{
            // 是否修改密码提示框是否显示
            show_xgmm:false,
            // 支付密码弹窗
            wallet_password_show:false,
            // 弹窗高度
            popup_height:{height:'58%'},
            
            // 密码错误提示信息
            errorInfo:'',
            // 键盘0是否显示
            showKeyboard:false,
            // 键盘1是否显示
            showKeyboard_1:false,
            // 键盘2是否显示
            showKeyboard_2: false,
            // 输入金额
            digit_value:'',
            // 充值方式
            dropdown_value:0,
            // 充值
            action_sheet_show:false,
            //用户钱包信息
            user_Wallet:{},
            //键盘记录值
            key_value:'',
            // 记录第几次修改密码
            wallet_password_number:0,
            // 提现输入密码的值
            wallet_password_value:'',
            // 修改密码第一次修改的值
            wallet_password_value1:'',
            // 修改密码第二次的值
            wallet_password_value2:'',
            // 第几次修改密码提示标题
            xgmm_title:'',
            // ------右上角按钮弹窗提示内容
            dialog_content :'是否前往修改支付密码？',
            dialog_title:'温馨提示',
            // 是否点击键盘之外隐藏密码输入，新用户不隐藏
            close_on_click_overlaye:true,
            // 消费记录表
            record_List:[]
        }   
    },
    methods:{
        // 是否修改密码弹窗事件
        async onBeforeClose_xgmm(action, done) {
                setTimeout(()=>{
                    Toast({
                        message: `前往修改密码`,
                        position: 'top',
                    });
                    this.wallet_password_number=1
                    done()
                    this.wallet_password_show=true
                },1000)
        },
        // 密码数字键完全出现时事件
        key_show(){
            this.popup_height={height:'58%'} 
        },
        // 密码数字键完全消失事件
        key_hide(){
            this.popup_height={}
        },
        // 修改支付密码 右上角按钮
        wallet_pwd(){
            this.dialog_title='温馨提示'
            this.dialog_content='是否前往修改支付密码？'
            this.show_xgmm=true
            this.is_pay=false
        },
        // 修改密码弹窗 右上角的弹窗事件取消
        dialog_close(){
            if(this.$store.state.user_Wallet.pay_pwd==undefined){
                Toast({
                    message: '开通失败',
                    position: 'top',
                });
                history.go(-1)
            }else{
                this.show_xgmm=false
            }
        },
        // 前往消费明细
        all_record(){
            this.$router.push("/record")
        },
        // 充值按钮
        digit_value_button(){
            if(this.dropdown_value==0){
                this.user_Wallet.wallet_balances=(parseInt(this.user_Wallet.wallet_balances)+parseInt(this.digit_value)).toString()
                this.digit_value=''
                this.$store.commit('SetUser_Wallet',this.user_Wallet)
                this.$store.dispatch('GetChange_Amount',[this.user_Wallet.wallet_balances,'2']).then(()=>{
                    if(this.$store.state.user_Wallet){
                        // console.log(this.$store.state.user_Wallet.wallet_balances,parseInt(this.user_Wallet.wallet_balances))
                        if(this.$store.state.user_Wallet.wallet_balances == parseInt(this.user_Wallet.wallet_balances)){
                            Toast({
                                message: '银行卡充值成功',
                                position: 'top',
                            });
                            this.action_sheet_show=false
                        }else{
                        Toast({
                                message: '银行卡充值失败',
                                position: 'top',
                            });
                            this.action_sheet_show=false 
                        }
                    }
                })
                
                
            }else{
                Toast({
                    message: '正在进入第三方软件',
                    position: 'top',
                });
                this.action_sheet_show=false
            }
            
        },
        // 提现
        tixian(){
            if(parseInt(this.user_Wallet.wallet_balances)>=10){
                this.wallet_password_number=0
                this.wallet_password_show=true
                this.showKeyboard=true
                this.showKeyboard_1=false
                this.showKeyboard_2=false
            }else{
               Toast({
                    message: '不满十元无法提现',
                    position: 'top',
                }); 
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
        this.user_Wallet=this.$store.state.user_Wallet
        // 进入钱包检测到没有开通钱包功能
        if(this.$store.state.user_Wallet.wallet_balances==undefined){
            this.dialog_title='新用户你好'
            this.dialog_content='新用户请设置支付密码，\n设置完毕后即开通钱包功能'
            this.show_xgmm=true
            this.close_on_click_overlaye=false
            this.is_pay=false
        }
        // 获取消费记录
        if(this.record_List!=this.$store.state.record_List){
            var adio=()=>{
                return this.$store.state.record_List
            }
            if(this.$store.state.record_List.length<6){
                this.record_List = adio()
            }else{
                var ii = adio().slice(0,6)
                this.record_List = ii
            }
            
        }
    },
    watch:{
        // 监视第几次输入密码
        wallet_password_number(){
            if(this.wallet_password_number==1){
                this.xgmm_title='第一次输入密码'
                this.showKeyboard=false
                this.showKeyboard_1=true
                this.showKeyboard_2=false
            }else if(this.wallet_password_number==2){
                this.xgmm_title='第二次输入密码'
                this.showKeyboard_2=true
                this.showKeyboard_1=false
                this.showKeyboard=false
            }
        },
        // 提现监听事件
        wallet_password_value(){
            if(this.wallet_password_value.length!=0){
                this.errorInfo=''
            }
            if(this.wallet_password_value.length === 6){
                if(this.wallet_password_value==this.$store.state.user_Wallet.pay_pwd){
                    this.user_Wallet.wallet_balances=0
                    this.$store.commit('SetUser_Wallet',this.user_Wallet)
                    this.$store.dispatch('GetChange_Amount',[this.user_Wallet.wallet_balances,'3'])
                    this.wallet_password_value=''
                    Toast({
                        message: '提现成功',
                        position: 'buttom',
                    });
                    this.wallet_password_show=false
                    this.showKeyboard=false
                }else{
                    this.errorInfo='支付密码错误'
                    this.wallet_password_value=''
                }
            }
        },
        // 监视第一次输入的密码
        wallet_password_value1(){
            if(this.wallet_password_value1.length === 6){
                this.wallet_password_number=2 
            }
        },
        // 监视第二次输入的密码
        wallet_password_value2(){
            if(this.wallet_password_value2.length!=0){
                this.errorInfo=''
            }
            if(this.wallet_password_value2.length === 6&&this.wallet_password_value2 == this.wallet_password_value1){
                    this.user_Wallet.pay_pwd=this.wallet_password_value2
                    this.wallet_password_value1=''
                    this.wallet_password_value2=''
                    this.showKeyboard_2=false
                    this.showKeyboard_1=false
                    this.wallet_password_number=0
                    this.wallet_password_show=false
                if(this.$store.state.user_Wallet.wallet_balances!=undefined){
                    // 修改支付密码的事件
                    this.axios.post(
                        '/wallet/updatePayPwd',
                        `pay_pwd=${this.user_Wallet.pay_pwd}`
                    ).then(res => {
                        // console.log(res.data)
                        if(res.data.code==200){
                            // 全局同步
                            Toast({
                                message: '密码修改成功',
                                position: 'top',
                            });
                            this.$store.commit('SetUser_Wallet',this.user_Wallet)
                        }else{
                            Toast({
                                message: '密码修失败',
                                position: 'top',
                            });
                        }
                    });
                }else{
                    this.user_Wallet.wallet_balances='0'
                    // 新建钱包
                    this.axios.post(
                        '/wallet/pushWallet',
                        `pay_pwd=${this.user_Wallet.pay_pwd}&wallet_balances=${this.user_Wallet.wallet_balances}`
                    ).then(res=>{
                        if(res.data.code==200){
                            Toast({
                                message: '开通成功，请牢记密码',
                                position: 'top',
                            })
                            this.$store.commit('SetUser_Wallet',this.user_Wallet)
                        }else{
                            Toast({
                                message: '系统出错',
                                position: 'top',
                            });
                        }
                    })
                }
                // console.log(this.user_Wallet)
            }else if(this.wallet_password_value2.length === 6&&this.wallet_password_value2 != this.wallet_password_value1){
                this.errorInfo='两次密码不一致，请重新输入'
                this.wallet_password_value2=''
            }
        }
    },
})
</script>
