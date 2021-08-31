<template>
    <div class="user_info"  @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">个人信息</span></template>
            <template #title_right><van-icon name="success" @click="queding" color='#A7ABAA' size='1.1rem'/></template>
        </slot-header>
        <div class="body">
            <div class="card">
                <div>
                    <div style="width:6rem;height:6rem;position:fixed;top:3rem;left:2rem;margin:0.3rem;background-color: rgba(0, 0, 0, 0.1);z-index: 1000;overflow: hidden;">
                        <input class="scwj" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
                    </div>
                    <!-- 头像 -->
                    <van-image width="6rem" height="6rem" style="position:fixed;top:3rem;left:2rem;border:0.3rem solid white" fit="cover" :src="user_info.user_img==undefined?'https://img01.yzcdn.cn/vant/cat.jpeg':user_info.user_img"/>
                </div> 
                <div style="width:60vw;float:right;margin-top:0rem">
                    <van-cell-group class="input_header" title="用户名：" style="padding:0">
                        <van-cell style="margin:0;height:3rem;">
                            <template #title>
                                <!-- 用户昵称 -->
                                <input type="text" @blur='input_blur' @keydown.13='input_keydown' :class="{yhm_kq:yhm_kq,yhm_gb:yhm_gb}" id="input" style="outline:0;border:0;font-weight:800;width:80%;maxlength:10" :disabled='input_disabled' v-model="user_name">
                            </template>
                            <template #right-icon style="height:2rem">
                                <van-icon name="edit" style="margin:auto 0;padding:1px" :color='input_ic' size='1.2rem' @click="input_dis"/>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
                <van-divider dashed style="margin-top:6rem">完善信息</van-divider>
                <van-cell-group title="绑定">
                    <van-cell class="van-cell-style" title="手机号：" >
                        <template #right-icon>
                            <!-- 手机号码 -->
                            <span class="span-style">{{user_info.phone==null||user_info.phone==""?'未绑定':user_info.phone}}</span>
                            <van-icon name="edit" style="margin:auto 0;padding:1px" color="#5f5e5e" size='1.2rem' @click="yz_phone"/>
                        </template>
                    </van-cell>
                    <van-cell class="van-cell-style" title='邮箱号：' >
                        <template #right-icon>
                            <span class="span-style">{{user_info.user_email==null||user_info.user_email=='null'?'未绑定':user_info.user_email}}</span>
                            <van-icon name="edit" style="margin:auto 0;padding:1px" color="#5f5e5e" size='1.2rem' @click="yz_emily"/>
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-cell-group title="基本">
                    <van-cell class="van-cell-style" title='生日：'>
                        <template #right-icon>
                            <span class="span-style">{{user_info.birthday==null||user_info.birthday=='Invalid date'?'未设置':user_info.birthday}}</span>
                            <van-icon name="edit" style="margin:auto 0;padding:1px" color="#5f5e5e" size='1.2rem' @click="datetime_picker"/>
                        </template>
                    </van-cell>
                    <!-- <van-cell class="van-cell-style" title='性别' is-link/> -->
                    <van-collapse v-model="activeNames">
                        <van-collapse-item name="1">
                            <template #title>
                            <span class="van-cell-style">性别：</span>
                            </template>
                            <template #value>
                                <span>{{user_info.sex==1?'男':user_info.sex==0?'女':'保密'}}</span>
                            </template>
                            <template #default>
                                <van-radio-group v-model="sex_radio">
                                    <van-cell-group>
                                        <van-cell title="男" clickable @click="sex_radio = '1';user_info.sex=1">
                                            <template #right-icon>
                                                <van-radio name="1" checked-color='#E62ED7' />
                                            </template>
                                        </van-cell>
                                        <van-cell title="女" clickable @click="sex_radio = '0';user_info.sex=0">
                                            <template #right-icon>
                                                <van-radio name="0" checked-color='#E62ED7' />
                                            </template>
                                        </van-cell>
                                        <van-cell title="保密" clickable @click="sex_radio = '2';user_info.sex=2">
                                            <template #right-icon>
                                                <van-radio name="2" checked-color='#E62ED7' />
                                            </template>
                                        </van-cell>
                                    </van-cell-group>
                                </van-radio-group>
                            </template>
                        </van-collapse-item>
                    </van-collapse>
                    <van-cell class="van-cell-style" title='地址管理' is-link @click="address"/>
                    <van-cell class="van-cell-style" title='注册时间' is-link>
                        <template #right-icon>
                            <span class="span-style">{{user_info.ref_time==null?'未知':user_info.ref_time}}</span>
                            <van-icon name="arrow" style="margin:auto 0;padding:1px" color="#5f5e5e" size='1rem'/>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
            <!-- 生日选择器 -->
            <van-overlay :show="overlay_show" @click="overlay_show = false">
                <div class="wrapper" @click.stop>
                    <div class="block">
                        <van-datetime-picker v-model="currentDate" type="date" title="选择生日" @confirm='confirm' @cancel='cancel' :min-date="minDate" :max-date="maxDate">
                            <template #confirm>
                                <span style="font-weight:800;font-size:14px;color:#E62ED7">确定</span>
                            </template>
                        </van-datetime-picker>
                    </div>
                </div>
            </van-overlay>
        </div>
        <!-- 弹出框 -->
        <van-dialog v-model="dialog_show" confirm-button-text='提交' :beforeClose='onBeforeClose'>
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
                    <div class="input">
                        <van-cell-group>
                            <van-field 
                                v-model="message_value" 
                                :type="dialog_type"
                                :maxlength='value_maxlength'
                                :placeholder="dialog_placeholder"
                                @input='message_input'
                                :error-message="dialog_type=='tel'?message_phone==0?'':message_phone==1?'':'手机格式不正确':message_email==0?'':message_email==1?'':'邮箱格式不正确'"
                            >
                            </van-field>
                        </van-cell-group>
                    </div>
                </div>
            </template>
        </van-dialog>
    </div>
</template>
<style lang="less">
    .user_info{ 
        display:flex;
        justify-content: center;
        flex-direction:column;
        height: 100vh;
        
        .slot-header{
            flex: 0;
            
        }
        .body{
            background-color: #e7e7e7cc;
            // height: 80vh;
            flex: 1;
            overflow: hidden;
            .card{
                width: 93%;
                margin:2rem auto;
                overflow: hidden;
                border-radius:0.5rem;
                background-color: white;
                box-shadow: 2px 1px 4px 1px #a7abaa65;
                .scwj{
                    font-size: 0;
                    width: 6rem;
                    height: 6.4rem;
                    background-color: rgba(0, 0, 0, 0);
                    position:absolute;
                    top: -0.4rem;
                    
                }
                .yhm_kq{
                    background-color:#e7e7e7cc;
                    color:#4E05DF
                }
                .yhm_gb{
                    background-color:white;
                    color:#E62ED7
                }
                .van-cell-group__title{
                    padding:0.5rem 0rem 0.2rem 0.5rem;
                }
                .van-cell{
                    height: 3rem;
                }
                .input_header{
                    .van-cell:nth-child(1){
                    margin-top: 2rem;
                    }
                }
                .van-cell-group__title{
                    color:#A7ABAA;font-size:12px;font-weight:800;
                }
                .van-cell-style{
                    color:#2A3139;font-weight: 900;font-size:14px;
                    .span-style{
                        font-weight:400;font-size:12px;color:#4E05DF;margin-right:1rem;
                    }
                }
                // 性别样式
                .van-cell__value{
                    font-weight:400;font-size:12px;color:#4E05DF;margin-right:1rem;
                }
                
            }
            .wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
            }

            .block {
                width: 80vw;
                background-color: #fff;
            }
        }
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
                    padding: 0.5rem;
                    .van-field{
                        .van-field__control{
                            color: black;
                            font-weight: 900;
                            
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

</style>

<script>
// 引入事件处理模块
import { Toast } from 'vant';
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
export default({
    data(){
        return{
            // 绑定弹窗是否显示
            dialog_show:false,
            // 验证类型
            dialog_type:'tel',
            // 输入框长度
            value_maxlength:11,
            // 绑定弹窗标题
            dialog_title:'绑定手机号',
            // 绑定弹窗输入框提示文字
            dialog_placeholder:'',
            // 手机格式是否正确
            message_phone:0,
            // 邮箱格式是否正确
            message_email:0,
            // 弹出输入框绑定值
            message_value:'',
            // 用户信息
            user_info:{},
            // 用户名input
            user_name:"静静想静静",
            // 性别
            sex_radio:'1',
            activeNames: ['0'],
            input_disabled:true,
            yhm_kq:false,
            yhm_gb:true,
            input_ic:'#5f5e5e',
            // 日期选择
            overlay_show:false,
            minDate: new Date(1949, 1, 1),
            maxDate: new Date(),
            currentDate: new Date(),
        }
    },
    methods:{
        // 应用修改的信息  右上角确定
        queding(){
            this.axios.put(
                '/user/updateUser',
                `user_name=${this.user_name}&user_email=${this.user_info.user_email}&phone=${this.user_info.phone}&birthday=${this.user_info.birthday}&sex=${this.user_info.sex}`
            ).then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.$store.commit('SetUser_Info',this.user_info)
                    Toast({
                        message: '应用成功',
                        position: 'top',
                    });
                }else{
                    Toast({
                        message: '应用失败，请重试',
                        position: 'top',
                    });
                }
            })
        },
        // 修改头像
        update (e) {   // 上传照片
            let self = this
            let file = e.target.files[0]
            /* eslint-disable no-undef */
            let param = new FormData()  // 创建form对象
            param.append('file', file)  // 通过append向form对象添加数据
            param.append('chunk', '0') // 添加form表单中其他数据
            // console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            // 添加请求头
            this.axios.post('/user/image', param, config)
            .then(res => {
                // if(res.data.code==200){
                    console.log(res)
                    this.user_info.user_img = res.data.message
                // } 
            })
            

        },
        // 点击手机号
        yz_phone(){
            this.dialog_type='tel'
            this.dialog_title='绑定手机号'
            this.value_maxlength=11
            this.message_value=''
            this.dialog_show=true
            this.dialog_placeholder='请输入手机号'
        },
        // 点击邮箱号
        yz_emily(){
            this.dialog_type='text'
            this.dialog_title='绑定邮箱号'
            this.value_maxlength=22
            this.message_value=''
            this.dialog_show=true
            this.dialog_placeholder='请输入邮箱号'
        },
        // 关闭绑定弹窗
        dialog_close(){
            this.message_value=''
            this.dialog_show=false
        },
        // 弹出框格式验证
        message_input(){
            if(this.dialog_type=='tel'){
                var regPhone = /^1[3456789]{1}\d{9}$/
                if(regPhone.test(this.message_value)){
                    this.message_phone=1
                }else{
                   this.message_phone=2 
                }
            }else{
                var regEmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if(regEmail.test(this.message_value)){
                    this.message_email=1
                }else{
                   this.message_email=2 
                }
            }
        },
        // 绑定确认
    async onBeforeClose(action, done) { 
        if(this.dialog_type=='tel'){
            if(this.message_phone==1){
                this.user_info.phone=this.message_value
                Toast({
                    message: '手机号修改成功',
                    position: 'top',
                });
                return done()
            }else{
                Toast({
                    message: '手机号格式有误',
                    position: 'top',
                });
                return done(false)
            }
        }else{
            if(this.message_email==1){
            this.user_info.user_email=this.message_value
                Toast({
                    message: '邮箱号修改成功',
                    position: 'top',
                });
                return done() 
            }else{
                this.message_email=2
                Toast({
                    message: '邮箱号格式有误',
                    position: 'top',
                });
                return done(false)
            }
        }
    },
        //  点击地址管理事件
        address(){
            this.$router.push("/address")
        },
        // 生日按钮点击事件
        datetime_picker(){
            this.overlay_show=true
        },
        // 年月日事件
            // 确定
        confirm(val){
            // var data = moment(val).add(10, 'days').calendar();
            // console.log(val.toLocaleDateString())
            var data = val.toLocaleDateString()
            this.user_info.birthday=data
            this.overlay_show=false
        },
            // 取消
        cancel(){
            this.overlay_show=false
        },
        // 以下是input失去焦点事件
        input_blur(){
            this.user_info.user_name=this.user_name
            this.input_disabled=true
            this.yhm_gb=true
            this.yhm_kq=false
            this.input_ic='#5f5e5e'
        },
        // 按下回车键input的事件
        input_keydown(){
            this.user_info.user_name=this.user_name
            this.input_disabled=true
            this.yhm_gb=true
            this.yhm_kq=false
            this.input_ic='#5f5e5e'
        },
        // 以下是打开修改用户名按钮事件
        input_dis(){
            this.input_disabled=false
            this.yhm_gb=false
            this.yhm_kq=true
            input.focus()
            this.input_ic='#E62ED7'
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
        // 获取用户基本信息
        this.user_info = this.$store.state.user_Info
        this.user_name = `${this.user_info.user_name?this.user_info.user_name:this.user_info.uname==undefined?'京京想静静':this.user_info.uname}`
        this.sex_radio = this.user_info.sex
    }
})
</script>
