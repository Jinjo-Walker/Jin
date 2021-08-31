<template>
    <div class="setup" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">设置</span></template>
            <!-- <template #title_right><van-icon name="setting-o" color='#A7ABAA' size='1.1rem' /></template> -->
        </slot-header>
        <div class="body">
            <div class="card">
                <van-cell-group title="安全">
                    <van-cell title='修改密码' @click='xgmm' is-link/>
                </van-cell-group>
                <van-cell-group title="通用">
                    <van-cell title="通知消息">
                        <template #right-icon>
                            <van-switch v-model="checked" size='1rem' active-color='#E62ED7' inactive-color='#A7ABAA'/>
                        </template>
                    </van-cell>
                    <van-cell title='检查更新' @click="inspect" is-link>
                            <van-loading type="spinner" v-show="loading_show"/>
                    </van-cell>
                </van-cell-group>
                <van-cell-group title="关于">
                    <van-cell title='给望京小腰好评' is-link/>
                    <van-cell title='关于我们' is-link/>
                    <van-cell title='使用准则' is-link/>
                </van-cell-group>
            </div>
        </div>
        <div class="footer">
            <van-button :color="login_State?'#A7ABAA':'#E62ED7'" type="default" @click="out">{{login_State?'退出登录':'登录'}}</van-button> 
        </div>
        <!-- 弹出框 -->
        <van-dialog v-model="dialog_show" confirm-button-text='确定' :beforeClose='onBeforeClose'>
            <!-- 头部 -->
            <template #title>
                <van-cell-group>
                    <van-cell title="修改密码">
                        <template #right-icon>
                            <van-icon name="share-o" @click="dialog_close"/>
                        </template>
                    </van-cell>
                </van-cell-group>
            </template>
            <!-- 主体部分 -->
            <template #default>
                <div class="card">
                    <div class="input">
                        <van-cell-group>
                            <van-field 
                                label="旧密码"
                                placeholder="请输入旧密码"
                                v-model="old_pwd_value" 
                                type="text"
                                :maxlength='18'
                                :error-message="message_old_pwd==0?'':message_old_pwd==1?'':'与旧密码不一致'"
                            >
                            </van-field>
                        </van-cell-group>
                        <van-cell-group>
                            <van-field 
                                label="新密码"
                                placeholder="新密码不能和旧密码相同"
                                v-model="new_pwd_value" 
                                type="text"
                                :maxlength='18'
                                :error-message="message_new_pwd==0?'':message_new_pwd==1?'':message_new_pwd==2?'不能和旧密码一样':'密码为字母开头的八位字符'"
                            >
                            </van-field>
                        </van-cell-group>
                    </div>
                </div>
            </template>
        </van-dialog>
    </div>
</template>
<script>
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
// 引入弹出框的函数
import { Dialog } from 'vant' 
// 引入弹出消息框
import { Toast } from 'vant';
export default {
    data(){
        return{
            // 修改密码弹窗
            dialog_show:false,
            // 旧密码
            old_pwd_value:'',
            // 新密码
            new_pwd_value:'',
            // 旧密码验证
            message_old_pwd:0,
            message_new_pwd:0,
            // 初始状态 打开消息通知
            checked:true,
            // 检测更新异步加载动画
            loading_show:false,
            // 检查更新结果
            inspect_message:'很棒哦，当前版本为最新版本',
            // 记录登录状态以修改底部按钮内容
            login_State:false
        }
    },
    methods:{
        // 修改密码确认
        async onBeforeClose(action, done) {
            if(this.old_pwd_value==this.$store.state.user_Info.upwd){
                this.message_old_pwd=1
                var regPwd=/^[a-zA-Z]\w{7,15}$/
                if(regPwd.test(this.new_pwd_value)){
                    this.message_new_pwd=1
                    if(this.new_pwd_value!=this.old_pwd_value){
                        this.axios.put(
                            '/user/updatePwd',
                            `upwd=${this.new_pwd_value}`
                        ).then(res => {
                            // console.log(res)
                            if(res.data.code==200){
                                Toast({
                                    message: '密码修改成功',
                                    position: 'top',
                                });
                                this.new_pwd_value=''
                                this.old_pwd_value=''
                                return done()
                            }else{
                            Toast({
                                    message: '发生错误',
                                    position: 'top',
                                }); 
                                return done(false)
                            }
                        })
                    }else{
                        Toast({
                            message: '新旧密码不能一样',
                            position: 'top',
                        });
                        this.message_new_pwd=2
                        return done(false)
                    }
                }else{
                    this.message_new_pwd=3
                    Toast({
                        message: '密码格式有误',
                        position: 'top',
                    });
                    return done(false)
                }
            }else{
                this.message_old_pwd=2
                Toast({
                    message: '与旧密码不一致',
                    position: 'top',
                });
                return done(false)
            } 
        },
        // 点击修改密码按钮
        xgmm(){
            if(this.login_State){
                this.dialog_show=true
            }else{
                Toast({
                    message: '请登录',
                    position: 'top',
                });
            }
        },
        // 关闭绑定弹窗
        dialog_close(){
            this.old_pwd_value=''
            this.new_pwd_value=''
            this.dialog_show=false
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
        // 检查更新
        inspect(){
            this.loading_show=true
            setTimeout(()=>{
                Dialog.alert({
                message: this.inspect_message,
                }).then(() => {
                // on close
                this.loading_show=false
                });
            },1000)  
        },
        // 退出按钮点击事件
        out(){
            if(this.login_State){
                var beforeClose = (action, done)=> {
                    if (action === 'confirm') {
                        // 点击确定
                        this.axios.get(
                        '/user/logout'
                        ).then(res => {
                                if(res.data.code==200){
                                    Toast({
                                        message: '退出成功',
                                        position: 'top',
                                    });
                                    this.$store.commit('SetLogin_State',false)
                                    this.$store.commit('SetUser_Info',{})
                                    history.go(-1)
                                    // 修改购物车
                                    this.$store.commit('SetCart_List',{})
                                    // 修改地址列表
                                    this.$store.commit('SetAddress_List',[])
                                    // 修改商品列表
                                    this.$store.commit('SetProduct_List',[])
                                    // 修改商品分类列表
                                    this.$store.commit('SetTypeList',[])
                                    //修改订单
                                    this.$store.commit('SetOrder_List',[])
                                    // 修改钱包信息
                                    this.$store.commit('SetUser_Wallet',{})
                                    // 修改优惠券列表
                                    this.$store.commit('SetCoupon_List',[])
                                    // 修改选中的优惠券
                                    this.$store.commit('SetIs_Coupon',{})
                                    // 修改当前评价的订单
                                    this.$store.commit('SetIs_Estimate',{})
                                }
                        })
                        done()
                    } else {
                        Toast({
                            message: '还好你没有',
                            position: 'top',
                        });
                        // 点击取消
                        done()
                    }
                }
                Dialog.confirm({
                title: '是否退出？',
                message: '退出以后\n就不能使用全部功能了哦！',
                // theme:'round',
                confirmButtonColor:'#A7ABAA',
                cancelButtonColor:'#E62ED7',
                beforeClose,
                }).then(() => {
                    this.$socket.emit("logout");
                });
            }else{
                this.$router.push("/login")
                Toast({
                    message: '正在前往登录',
                    position: 'top',
                });

            }
        }
    },
    mounted(){
    // 获取服务器端登录状态
    this.login_State=this.$store.state.login_State
    }
}
</script>

<style lang="less">
    .setup{
        display:flex;
        justify-content: center;
        // align-items: center;
        // justify-content:space-between;
        flex-direction:column;
        height: 100vh;
        .slot-header{
            flex: 0;
        }
        .body{
            background-color: #e7e7e7cc;
            // height: 80vh;
            flex: 17;
            overflow: hidden;
            .card{
                width: 93%;
                margin:1.2rem auto;
                overflow: hidden;
                border-radius:0.5rem;
                background-color: white;
                .van-cell{
                    height: 3rem;
                    .custom-title {
                        margin-right: 2rem;
                        vertical-align: middle;
                    }

                    .search-icon {
                        font-size: 1.3rem;
                        line-height: inherit;
                    }
                }   
            }
        }
        .footer{
            width: 100vw;
            height:20rem ;
            margin: 0px;
            flex: 1;
            .van-button{
                // height: 5vh;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>