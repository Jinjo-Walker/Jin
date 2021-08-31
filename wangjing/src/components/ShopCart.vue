<template>
    <div class="shopcart">
        <div class="cart">
            <van-submit-bar :price="$store.state.cart_List.Total_price" button-text="提交订单" @submit="onSubmit">
                <!-- <van-checkbox v-model="checked">全选</van-checkbox> -->
                    <template #top>
                        <van-action-sheet
                            v-model="sheet_show"
                            :overlay='false'
                            close-on-popstate
                        >
                            <template #description>
                                <span>购物车</span>
                                <van-tag type="success">{{cart_List.car_status==0?'未支付':'已支付'}}</van-tag>
                            </template>
                        
                            <template #default>
                                <div class="card" v-for="(item,index) of cart_List.sp" :key="index">
                                    <van-card
                                        :num='item.car_sp_number'
                                        :price='item.sp_price.toFixed(2)'
                                        :title='item.sp_name'
                                        :thumb="item.sp_img"
                                    >
                                    <template #desc>
                                        <div class="van-card__desc">{{item.sp_descript}}</div>
                                    </template>
                                        <!-- <template #footer>
                                            <van-stepper v-model="stepper_value" theme="round" :min='0' button-size="1rem" disable-input /> 
                                        </template> -->
                                    </van-card>
                                </div>
                            </template>
                        </van-action-sheet>
                    </template>
                    
                    <template #default>
                        <div style="border-radius: 50%;padding:0.6rem;background-color:#7f57d1;margin-bottom:1.6rem;z-index: 3000;" @click="action_sheet_show">
                            <van-icon name="cart-o" size='2.4rem' color='#E62ED7'  :badge="$store.state.cart_spsl"/>
                        </div>
                    </template>
            </van-submit-bar>
        </div>
    </div>
</template>
<script>
import Bus from '../common/js/bus.js'
// 引入弹出框的函数
import { Dialog } from 'vant' 
// 引入弹出消息框
import { Toast } from 'vant';
export default {
    data() {
        return {
        // 购物车
        sheet_show:false,
        cart_List:{
                uid:1,
                sp:[],
                car_status:0,
                car_create_time:'2021/08/02',
                car_update_time:'2021/08/03',
                Total_price:0.00
            },
        sp:[],
        };
    },
    methods: {
        // 
        // 点击提交按钮
        onSubmit(e){
            if(this.$store.state.cart_List.Total_price/100<=0){
                Toast({
                message: `请点餐`,
                position: 'top',
                });
            }else{
                if(this.$store.state.login_State){
                    this.$router.push("/payment")
                }else{
                    Toast({
                        message: '请登录',
                        position: 'top',
                    });
                }  
            }
            
        },
        // 打开订单详情
        action_sheet_show(){
            if(this.$store.state.cart_spsl==0){
                Toast({
                    message: '购物车是空的',
                    position: 'top',
                });
            }else{
                if(this.sheet_show==false){
                    this.sheet_show=true
                    this.sp=[]
                    for(var i of this.$store.state.cart_List.sp){
                        if(i.car_sp_number!=0){
                            this.sp.push(i)
                        }
                    }
                    this.cart_List.sp = this.sp
                    // console.log(this.cart_List.sp)
                }else{
                    this.sheet_show=false
                }
            }
        }
    },
    watch:{
        
       
    },
    mounted(){
        
    },
    updated(){
        for(var i of this.$store.state.cart_List.sp){
            if(i.car_sp_number!=0){
                this.spsl++
            }
        }
    },
}
</script>
<style lang="less">
.shopcart{
    .cart{
        overflow: hidden;
       .van-submit-bar{
           width: 100%;
           height: 3.2rem;
           margin: 0.004rem;
           background-color: #7f57d1;
           .van-overlay{
                background-color: rgba(255, 255, 255, 0);
           }
           .van-popup{
               border:2px solid #7f57d1;
               width: 99%;
               .van-action-sheet__description{
                    padding: 0.5rem 0.5rem;
                    color: white;
                    background-color: #7f57d1;
                    font-weight: 800;
                    font-size: 20px;
                }
               .card{
                   .van-card{
                        height: 6.2rem;
                        background-color: white;
                        .van-card__header{
                            .van-card__thumb{
                                height: 5rem;
                            }
                            .van-card__title{
                                color: black;
                                font-weight: 800;
                                font-size: 14px;
                            }
                            .van-card__desc{
                                color: #A7ABAA;
                                font-weight:300;font-size:12px;color:#A7ABAA;display: block;width:15rem;overflow: hidden;
                            }
                            .van-card__price{
                                color:#E62ED7;
                            }
                        }
                        .van-card__footer{
                           margin-top: 10%;
                        }
                   }
               }
            }
            .van-popup--bottom{
                bottom: 3.2rem;
                z-index: -1;
            }
        } 
    }
}
    

</style>