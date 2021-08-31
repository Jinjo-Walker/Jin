<template>
    <div class="estimate" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">评价</span></template>
            <template #title_right><van-icon name="success" @click="queding" color='#A7ABAA' size='1.1rem'/></template>
        </slot-header>
        <div class="body">
            <div class="card">
                <van-cell-group inset>
                    <van-cell title="给这一单打个分" :value="rate_text" />
                    <van-cell title=" ">
                        <template #label>
                            <van-rate
                                v-model="rate_value"
                                :size="25"
                                color="#E62ED7"
                                void-icon="star"
                                void-color="#eee"
                                @change='rate_change'
                            />
                        </template>
                    </van-cell>
                    <van-cell v-show="rate_text_show">
                        <template #title>
                            <van-field
                                v-model="rate_message"
                                label="评价"
                                rows="8"
                                maxlength="128"
                                show-word-limit
                                type="textarea"
                                placeholder="可以备注你想要的口味等"
                            />
                        </template>
                    </van-cell>
                </van-cell-group>
                
            </div>
        </div>
    </div>
</template>
<style  lang='less'>
    .estimate{
        height: 93vh;
        .body{
            .card{
                position: relative;
                height: 6rem;
                background: linear-gradient(#E62ED7,#E61ED6,#E62ED7,#E61ED6);
                // box-shadow: 2px 1px 4px 1px #A7ABAA;
                .van-cell-group{
                    width: 90%;
                    position: absolute;
                    top: 1.5rem;
                    left: 1%;
                    border-radius: 5px;
                    box-shadow: 2px 1px 4px 1px #a7abaa65;
                    .van-cell:first-child{
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
                                background-color:#e7e7e765
                            }
                    }
                    .van-cell:nth-child(2){
                        .van-cell__title{
                            .van-cell__label{
                                .van-rate{
                                    width: 100%;
                                    padding: 0 4rem;
                                    .van-rate__item{
                                        padding: 0 0.3rem;
                                    }
                                }
                            }
                        }
                    }
                    .van-cell:last-child{
                        line-height: 150px;
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
                                    line-height: 20px;
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
    }
</style>
<script>
import { Toast } from 'vant';
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
export default({
    data() {
        return{
            // 打分
            rate_value:0,
            // 评价
            rate_message:'',
            // 评价是否显示
            rate_text_show:false,
            // 评分别名
            rate_text:'',
            // 评价的订单
            is_Estimate:[],
        }   
    },
    methods:{
        // 右上角确定按钮
        queding(){
            var a =this.$store.state.is_Estimate 
            if(this.rate_value>0){
                if(this.rate_message.length>=5){
                    this.axios.post(
                    '/order/setEstimate',
                    `name=${this.$store.state.user_Info.user_name==null?this.$store.state.user_Info.uname:this.$store.state.user_Info.user_name}&user_img=${this.$store.state.user_Info.user_img}&oid=${a.oid}&sp_estimate_content=${this.rate_message}&sp_estimate_star=${this.rate_value}`
                    ).then(res => {
                        if(res.data.code==200){
                            this.$store.dispatch('GetOrder_List')
                            Toast({
                                message: `感谢你的评价`,
                                position: 'top',
                            });
                            setTimeout(()=>{
                                history.go(-1)
                            },500)
                        }else{
                        Toast({
                                message: `评价失败`,
                                position: 'top',
                            }); 
                        }
                    })
                }else{
                    Toast({
                        message: `评价必须大于5个字符`,
                        position: 'top',
                    });
                }
            }else{
               Toast({
                    message: `亲亲，你忘记给我们打分了`,
                    position: 'top',
                }); 
            }
            
        },   
        // 分值发生变化
        rate_change(){
            this.rate_text_show=true
            this.rate_value==1?this.rate_text='没法吃':this.rate_value==2?this.rate_text='巨难吃':this.rate_value==3?this.rate_text='不好吃':this.rate_value==4?this.rate_text='还行吧':this.rate_text='一个赞'
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
    }
})
</script>
