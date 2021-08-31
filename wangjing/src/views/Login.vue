<template>
    <div class="login">
        <div class="header">
            <van-cell-group>
                <van-cell title="">
                    <template #right-icon>
                        <span> <router-link to="/home">退出</router-link></span>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
        <div class="bj" style="background-image:url('guanggao.png')">
            <div class="img1" style="background-color: rgba(0, 0, 0, 0);position: absolute;top: 25%;left: 30%;">
                <img src="logo1.png" style="width:10rem" alt="">
            </div>
        </div>
        <!-- 弹出框 -->
        <van-dialog v-model="dialog_show" confirm-button-text='提交' :beforeClose='onBeforeClose'>
            <div style="width:100%;height:10rem;background:url('https://img01.yzcdn.cn/vant/ipad.jpeg'),100px,100px;"></div>
            <!-- 头部 -->
            <template #title>
                <van-cell-group>
                    <van-cell title="验证">
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
                        height="10rem"
                        fit="contain"
                        :src="yzm_img"
                        @click="gh_yzm"
                    />
                    <div class="input">
                        <van-cell-group>
                            <van-field 
                                v-model="value_upwd1" 
                                v-show='!uname_isno' 
                                :type="eye?'password':'text'" label="密码：" 
                                placeholder="再次输入密码" 
                                :maxlength='16'
                                :error-message="message_upwd1==0?'':message_upwd1==1?'':'密码不正确'"
                            >
                                <template #right-icon>
                                    <van-icon :name="eye?'closed-eye':'eye-o'" @click="open_eye" size='1.2rem'/>
                                </template>
                            </van-field>
                        </van-cell-group>
                        <van-cell-group>
                            <van-field
                                v-model="value_yzm" 
                                label="验证：" 
                                placeholder="请输入验证码"
                                :maxlength='4'
                                :error-message="message_yzm==0?'':message_yzm==1?'':'验证码不正确'"
                             />
                        </van-cell-group>
                    </div>
                </div>
            </template>
        </van-dialog>
        <div class="body">
            <div class="card">
                <van-cell-group>
                    <van-field
                        v-model="value_uname"
                        :error='false'
                        required
                        label="用户名"
                        :autofocus='true'
                        :clearable='true'
                        :maxlength='16'
                        placeholder="请输入用户名"
                        @input='uname_input'
                        :error-message="message_uname==-2?'':message_uname==1?'':message_uname==0?'用户名不能为空':'用户名格式不正确'"
                    />
                    <van-field
                        v-model="value_upwd"
                        :clearable='true'
                        :type="eye?'password':'text'"
                        required
                        label="密码"
                        :maxlength='16'
                        placeholder="请输入密码"
                        @input='upwd_input'
                        :error-message="message_upwd==-2?'':message_upwd==1?'':message_uname==0?'密码不能为空':'密码格式不正确'"
                    >   
                        <template #right-icon>
                            <van-icon :name="eye?'closed-eye':'eye-o'" style="margin-right:0.5rem" @click="open_eye" size='1.2rem'/>
                        </template>
                    </van-field>
                </van-cell-group>
                <van-checkbox v-model="checked_isno" checked-color="#E62ED7">我已阅读并同意<router-link to="">《隐私政策》</router-link>、<router-link to='' >《使用协议》</router-link> </van-checkbox>
                <div class="tijiao"><van-button :loading='button_loading' type="primary" @click="tijiao" loading-type="spinner" :disabled='!checked_isno' color='#4E05DF'>登录</van-button></div>
            </div>
        </div>
        <div class="footer" style="position: absolute;bottom:0;left:30%;"><span style="font-weight: 900;font-size:12px;color:rgba(170, 170, 170, 0.541);">忘记密码?|</span><span style="font-weight: 900;font-size:12px;color:rgba(170, 170, 170, 0.541);">没有账号将自动注册</span></div>
    </div>
</template>
<style lang="less">
.login{
    .header{
        position: absolute;
        top: 0;
        right:0;
        [class*=van-hairline]::after{
            border:0 solid rgba(230, 46, 215, 0)
        }
        .van-cell-group{
            background-color: rgba(0, 0, 0, 0);
            .van-cell{
                background-color: rgba(0, 0, 0, 0);
                a{
                    color: #E62ED7;
                    font-weight: 900;
                    font-size: 12px;
                }
            }
        }
    }
    .bj{
        height: 60vh;width: 100%;
        border-end-end-radius: 12.5%;
        border-end-start-radius: 12.5%;
    }
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
                    box-shadow: 1px 1px 2px 1px #b1b1b163;
                }
                .input{
                    box-shadow: 0.5px 0.5px 0.5px 0.5px #e6e6e62a;
                    flex: 3.1;
                    padding-top: 13%;
                    .van-cell-group{
                        .van-cell{
                            padding: 0.2rem 0.1rem 1rem 0.1rem;
                            height: 4rem;
                            .van-cell__title{
                                flex: 1.3;
                                color: #4E05DF;
                                font-weight: 900;
                                font-size: 14px;
                            }
                            .van-cell__value{
                                flex: 4;height: 2rem;line-height: 2rem;
                                // border: 1px solid 
                                background-color: #e6e6e648;
                            }
                        }
                    }
                }
            }
        }
        .van-dialog__footer{
            .van-button--default{
                background-color:#E62ED7 ;
                .van-button__text{
                    font-weight: 900;
                    color: white;
                    font-size: 14px;
                }
            }
        }
    }
    .body{
        .card{
            height: 37vh;
            background-color:white;
            // border: 1px solid black;
            width: 90%;
            position: absolute;
            bottom: 20%;
            left: 5%;
            margin-left:0 auto;
            .van-checkbox{
                margin-top: 0.5rem;
                 .van-checkbox__label{
                    font-weight: 900;
                    font-size: 14px;
                    color:#E62ED7 ;
                }
            }  
            .van-cell-group{
                .van-cell{
                    padding: 0.2rem 0.1rem 1rem 0.1rem;
                    height: 5.1rem;
                    .van-cell__title{
                        flex: 1;
                        color: #4E05DF;
                        font-weight: 900;
                        font-size: 14px;
                        margin-left: 1rem;
                    }
                    .van-cell__value{
                        flex: 5;height: 3rem;line-height: 3rem;
                        // border: 1px solid 
                        background-color: #e6e6e648;
                        margin-right: 1rem;
                        .van-field__error-message{
                            height: 1.3rem;
                            margin-bottom: 1rem;
                        }
                        .van-field__control{
                            padding-left: 0.5rem;
                            font-weight: 900;
                            font-size: 12px;
                            color: black;
                        }
                    }
                }
            }
            .tijiao{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                .van-button{
                    width: 100%;
                }
            }
        }
    }
}
</style>
<script>
import { Toast } from 'vant';
import { Dialog } from 'vant'
export default {
  data() {
    return {
        // 复选框是否选中
        checked_isno:false,
        // 账号是否存在？
        uname_isno:false,
        // 隐藏密码
        eye:true,
        // 按钮加载事件
        button_loading:false,
        // 格式验证
        message_uname:-2,
        message_upwd:-2,
        message_upwd1:0,
        message_yzm:0,
        // 是否显示弹窗
        dialog_show:false,
        value_uname:'',
        value_upwd:'',
        value_upwd1:'',
        value_yzm:'',
        pattern:/^[a-zA-Z]\w{7,15}$/,
        yzm_img:'/user/imgCode'
    };
  },
  sockets:{ //用于监听服务端发送回来的消息
      userInfo(user){
//           console.log(user);
          this.$store.commit("SetUser",user);
            localStorage.setItem(user.uname,user.id);
      }

  },
  methods: {
    //更换验证码
    gh_yzm(){
        var time = new Date().getTime()
        this.yzm_img=`/user/imgCode?t=${time}`
    },
    //   退出验证弹窗
    dialog_close(){
        this.dialog_show=false
        this.value_upwd1=''
        this.value_yzm=''
    },
    // 验证码确认
    async onBeforeClose(action, done) { 
        if(this.uname_isno){
            this.axios.post(
            '/user/login',
            `uname=${this.value_uname}&upwd=${this.value_upwd}&code=${this.value_yzm}`
            ).then(res => {
                // console.log(res.data)
                if(res.data.code==200){
                    //用户登录成功后把用户信息发送到服务器保存到用户列表中
                    //把用户登录时的socket对象id保存到用户信息中
                    res.data.data.id = this.$socket.id 
                    this.$socket.emit('login',res.data.data)

                    Toast({
                        message: '恭喜登录成功！',
                        position: 'top',
                    });
                    // 成功获取保存用户基本信息
                    this.$store.commit('SetUser_Info',res.data.data)
                    // 修改登录状态
                    this.$store.commit('SetLogin_State',true)
                    history.go(-1)
                    return done()
                }else if(res.data.code==-1){
                    this.message_yzm=-1
                    return done(false)
                }else if(res.data.code==201){
                    Toast({
                    message: '用户名或密码错误',
                    position: 'top',
                    });
                    return done()
                }else{
                    Toast({
                        message: '已经登录过了',
                        position: 'top',
                    });
                    return done() 
                }
            }).catch(e => {
                
            })
        }else{
            if(this.value_upwd==this.value_upwd1){
                this.message_upwd1=1
                // 注册并登录
                this.axios.post(
                '/user/register',
                `uname=${this.value_uname}&upwd=${this.value_upwd}&code=${this.value_yzm}`
                ).then(res => {
                    // console.log(res.data)
                    if(res.data.code==200){
                        //用户登录成功后把用户信息发送到服务器保存到用户列表中
                        //把用户登录时的socket对象id保存到用户信息中
                        res.data.data.id = this.$socket.id 
                        this.$socket.emit('login',res.data.data)
                        Toast({
                            message: '注册成功！',
                            position: 'top',
                        });
                        // 成功获取保存用户基本信息
                        this.$store.commit('SetUser_Info',res.data.data)
                        // 修改登录状态
                        this.$store.commit('SetLogin_State',true)
                        history.go(-1)
                        return done()
                    }else if(res.data.code==-1){
                        this.message_yzm=-1
                        return done(false)
                    }else if(res.data.code==201){
                        Toast({
                            message: '注册成功！请手动登录',
                            position: 'top',
                        });
                        return done()
                    }
                }).catch(e => {
                    
                })
            }else{
                this.message_upwd1=2
                return done(false)
            }
        }
    },
    //   查看密码
    open_eye(){
        if(this.eye){
            this.eye=false
        }else{
            this.eye=true
        }
    },
    // 验证格式
    uname_input(){
        if(this.value_uname.length==0){
            this.message_uname=0
        }else if(this.value_uname.length<8){
            this.message_uname=-1
        }else{
            if(this.pattern.test(this.value_uname)){
                this.message_uname=1
            }else{
                this.message_uname=-1
            }
        }
        
    },
    upwd_input(){
        if(this.value_upwd.length==0){
            this.message_upwd=0
        }else if(this.value_upwd.length<8){
            this.message_upwd=-1
        }else{
            if(this.pattern.test(this.value_upwd)){
                this.message_upwd=1
            }else{
                this.message_upwd=-1
            }
        }  
    },
    // 提交
    tijiao(){
        this.button_loading=true
        setTimeout(()=>{
            if(this.value_uname.length>=8||this.value_upwd.length>=8){
                if(this.message_uname!=1||this.message_upwd!=1){
                    this.button_loading=false
                    Toast({
                        message: '请检查',
                        position: 'top',
                    });
                }else{
                    this.axios.post(
                        "/user/check",
                        `uname=${this.value_uname}`
                    ).then(result=>{
                        // console.log(result.data)
                        if(result.data.code==0){
                            this.button_loading=false
                            // 用户不存在进行注册
                            Dialog.confirm({
                                title: '温馨提醒',
                                message: '系统检测到此账号并未注册\n是否注册并登录？',
                            })
                            .then(() => {
                                this.uname_isno=false
                                this.dialog_show=true
                            })
                            .catch(() => {
                                Toast({
                                    message: '系统出错',
                                    position: 'top',
                                });
                                this.button_loading=false
                            });
                        }else if(result.data.code==1){
                            // 用户存在进行登录
                            this.uname_isno=true
                            this.dialog_show=true
                            this.button_loading=false
                        }else{
                            // console.log(`系统出错`);
                            this.button_loading=false
                        }
                    })
                    
                }
            }else if(this.value_uname.length==0){
                this.button_loading=false
                Toast({
                    message: '不能为空',
                    position: 'top',
                });
            }else{
                this.button_loading=false
                Toast({
                    message: '格式不正确',
                    position: 'top',
                });
            }
            
        },1000)
        
        
        
    },
  },
  mounted(){

  }
};
</script>
