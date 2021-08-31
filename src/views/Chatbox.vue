<template>
    <div class="chatbox" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">店长老王</span></template>
            <!-- <template #title_right><van-icon name="setting-o" color='#A7ABAA' size='1.1rem' /></template> -->
        </slot-header>
        <div class="body">
            <!-- <div style="padding:1rem">
                <div class="chat_user_left">
                    <div class="user_img"><van-image width="3rem" height="3rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg"/></div>
                    <div class="user-message">111</div>
                    <div class="user-time">19:36</div>
                </div>
            </div>
            <div style="padding:1rem">
                <div class="chat_user_right">
                    <div class="user_img"><van-image width="3rem" height="3rem" fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg"/></div>
                    <div class="user-message">111</div>
                    <div class="user-time">19:36</div>
                </div>
            </div> -->
        </div>
        <div class="footer">
            <div class='footer_char'>
                <div class="input">
                    <van-cell-group>
                        <van-field v-model="message_value" rows="5" autofocus maxlength="100" autosize placeholder="请输入" />
                    </van-cell-group>
                </div>
                <div class="buttom">
                    <van-button type="info" @click="faso">发送</van-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { ContactEdit } from 'vant';
// import io from "socket.io-client"
// const socket = io('http:127.0.0.1:3000');
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离

export default {
    /* created(){
        socket.removeListener('message');
        socket.on('message',(data)=>{
            console.log(data);
        })
    }, */
    data(){
        return{
            message_value:'',
            message_List:[],
            msgobj:{}, //用于存储用户发送的消息
        }
    },
    sockets:{
        tosend(data){
            // 判断服务器发送的内容是否是给该用户的
            let socketid = localStorage.getItem(data.toname);
            if(data.to==socketid){
                this.message_List.push(data)
                var body = document.getElementsByClassName('body')[0]
                body.innerHTML+=`
                    <div class="user-time">${data.time}</div>
                    <div class="chat_user_left">
                        <div ><img class="user_img" style='width:50px;height:50px' src="${data.user.user_img}"/></div>
                        <div class="message"><span class="user-message">${data.message}</span></div>   
                    </div>`
                }
        }
    },
    methods:{
        // 发送消息
        faso(){
            // console.log(this.message_value);
            var time = new Date().toLocaleString()
            // this.$socket.emit('hello',this.message_value);
            this.msgobj.user = this.$store.state.user_Info;
            // console.log("vuex中的 用户信息："+this.$store.state.user_Info);
            this.msgobj.toname = "admin";
            this.msgobj.message = this.message_value;
            this.msgobj.time = time;
            this.$socket.emit('tosend',this.msgobj); 

            /* var message={
                id:1,name:'科瓦',message:this.message_value,user_img:"logo1.png",time:time
            } */
            this.message_List.push(this.msgobj)
            // console.log(this.msgobj.user.user_img)
            var body = document.getElementsByClassName('body')[0]
            body.innerHTML+=`
                <div class="user-time">${time}</div>
                <div class="chat_user_right">
                    <div> <img class="user_img" style='width:50px;height:50px' src='http://127.0.0.1:3000/${this.msgobj.user.user_img}'/></div>
                    <div class="message"><span class="user-message">${this.message_value}</span></div>
                </div>`
            this.message_value=''
            body.scrollTop = body.scrollHeight;
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
        function orderSort(obj1,obj2){
            var a=parseInt(obj1.time)
            var b= parseInt(obj2.time)                                                    
            if(a>b){    
                return 1
            }else if(a<b){    
                return -1
            }else{
                return 0
            }              
        };
        var a = this.message_List.sort(orderSort);
        this.message_List = a
        var body = document.getElementsByClassName('body')[0]
        for(var i of this.message_List){
            body.innerHTML+=`<div class="user-time">${i.time}</div>`
            if(i.id==1){
                body.innerHTML+=`
                    <div class="chat_user_left">
                        <div ><img class="user_img" style='width:50px;height:50px' src="${i.user_img}"/></div>
                        <div class="message"><span class="user-message">${i.message}</span></div>   
                    </div>`
            }else{
                body.innerHTML+=`
                    <div class="chat_user_right">
                        <div ><img class="user_img" style='width:50px;height:50px' src=${i.user_img}/></div>
                        <div class="message"><span class="user-message">${i.message}</span></div>
                    </div>`
            }
        }
    },
}
</script>
<style lang="less">
.chatbox{
    background-color:white;
    .body{
        width: 100vw;
        margin-bottom: 2.8rem;
        
        // background-color:#eeeeee ;
        // overflow: hidden;
        .chat_user_left{
            padding: 0.5rem;
            overflow: hidden;
            .user_img{
                float: left;

            }
            .user-message{
                position: relative;
                float:left;
                left: 15px;
                
            }
            
        }
        .chat_user_right{
            padding: 0.5rem;
            overflow: hidden;
            .user_img{
                float: right;
            }
            .user-message{
                position: relative;
                float:right;
                
            }
        }
    }
    .footer{
        .footer_char{
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100vw;
            .input{
                flex: 9;
                // box-shadow: -2px 0 2px 1px gray;
                .van-field{
                    width: 100%;
                    font-weight: 900;
                    font-size: 12px;
                }
            }
            .buttom{
                flex: 2;
                .van-button{
                    width: 100%;
                    // box-shadow: -2px 0 2px 1px #E62ED7;
                    background-color: #E62ED7;
                    border: 1px solid #E62ED7;
                    font-weight: 900;
                    font-size: 14px;
                }
            }
        }
    }
}
//用户头像
.user_img{
    border-radius: 50%;
    vertical-align: middle;
}
//消息时间
.user-time{
    text-align: center;
    padding: 10px 0;
    color: rgb(85, 64, 64);
    font-weight: 900;
    font-size: 12px;
}
//消息内容
.message{
    margin-top: 5px;
    .user-message{
        padding-top:5px;
        padding:10px;
        min-width: 100px;
        max-width: 15rem;
        word-wrap:break-word;
        background: #eeeeee;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 1rem;
        font-weight: 900;
    }
}

</style>