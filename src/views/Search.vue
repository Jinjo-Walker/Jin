<template>
    <div class="srarch" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">搜索结果</span></template>
            <!-- <template #title_right><van-icon name="setting-o" color='#A7ABAA' size='1.1rem' /></template> -->
        </slot-header>
        <div style="margin-top:3.5rem">
            <div v-for="(item,index) of search_List" :key="index">
                <van-card
                    :tag="item.sp_is_on==1?'在售':'下架'"
                    :price="item.sp_price.toFixed(2)"
                    :title="item.sp_name"
                    :thumb="item.sp_img"
                >
                    <template #desc>
                        <div class="van-card__desc van-multi-ellipsis--l3">{{item.sp_descript}}</div>
                    </template>
                    <template #footer>
                        <div @click="detail_show(item)" style="color:#4E05DF;text-decoration:underline;font-size: 12px;">查看详情>></div>
                        <!-- <van-stepper v-model="stepper_value[item.spid-1]" @change='stepper_value_change()' theme="round" :min='0' button-size="1.2rem" disable-input />  -->
                    </template>
                </van-card>
            </div>
        </div>
         <!-- 展示详情 -->
      <van-action-sheet v-model="sp_detail_show" title="详情大图">
        <div class="content">
            <div class="content_no">
                <van-cell title="基础信息"/>
                <van-cell title="所属分类" icon="orders-o" :value="sp_detail.sp_type_id==10?'折扣':sp_detail.sp_type_id==20?'炭烤荤类':sp_detail.sp_type_id==30?'炭烤素类':'酒水饮料'" />
                <van-card
                    :price="sp_detail.sp_price==undefined?(0).toFixed(2):sp_detail.sp_price.toFixed(2)"
                    :title="sp_detail.sp_name"
                    :desc="sp_detail.sp_descript"
                    :thumb="sp_detail.sp_img"
                />
                <div class="sp_card">
                    <van-cell title="详细大图"/>
                    <div class="sp">
                        <div class="xxdt" v-for="(item,index) of sp_detail.sp_detail" :key="index">
                            <div class="xxdt_tu">
                                <van-image
                                    width="100%"
                                    fit="contain"
                                    :src="item.sp_detail_img"
                                />
                            </div>
                            <van-divider>描述</van-divider>
                            <div class="xxdt_text">
                                <span style="text-align: center;">{{item.sp_detail_describe}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </van-action-sheet>
    </div>
</template>
<script>
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
import { Toast } from 'vant';
export default {
    data() {
        return{
            // 搜索结果
            search_List:[],
            // 商品详情是否显示
            sp_detail_show:false,
            // 商品详情
            sp_detail:{
                // spid:
                // sp_name:
                // sp_type_id:
                // sp_descript:
                // sp_price:1,
                // sp_detail:{sp_detail1:{sp_detail_img1:,sp_detail_describe1},sp_detail2:{}}
            }
        }
    },
    methods:{
        // 获取详情
        detail_show(item){
            this.axios.get(
            '/product/getSpDetail',{
            params:{sp_id:item.spid}
            }).then(res => {
                console.log(res.data.data)
                 if(res.data.code==200){
                    var sp_detail={
                        spid:res.data.data[0].sp_id,
                        sp_name:res.data.data[0].untitled,
                        sp_img:item.sp_img,
                        sp_type_id:item.sp_type_id,
                        sp_descript:item.sp_descript,
                        sp_price:item.sp_price,
                        sp_detail:{sp_detail1:{sp_detail_img:res.data.data[0].sp_detail_img1,sp_detail_describe:res.data.data[0].sp_detail_describe1},sp_detail2:{sp_detail_img:res.data.data[0].sp_detail_img2,sp_detail_describe:res.data.data[0].sp_detail_describe2}}
                    }
                    this.sp_detail = sp_detail
                    this.sp_detail_show=true
                    console.log(item)
                 }else{
                    Toast({
                        message: `获取失败，稍后重试`,
                        position: 'top',
                    });
                 }
            })
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
    this.search_List = this.$store.state.search_List
    // console.log(this.$store.state.search_List)
    }
}
</script>
<style lang="less">
.srarch{
    .van-card{
        border-radius: 5px;
        margin: 0  0.5rem;
        margin-top: 0.5rem;
        background-color: white;
        box-shadow: 1px 1px 4px 1px #E62ED7;
        .van-card__header{
            .van-card__thumb{
                height: 5.5rem;
                width: 4rem;
            }
            .van-card__content{
                margin: 0;
                .van-card__title{
                    font-weight:800;font-size:14px;color:#4E05DF;
                }
                .van-card__desc{
                    font-weight:300;font-size:12px;color:#A7ABAA;width:8rem;line-height:14px;margin-top: 0.3rem;max-height: 2.5rem
                }
                .van-card__bottom{
                    .van-card__price{
                        font-weight:900;font-size:14px;color:#E62ED7;
                    }
                    .van-card__num{
                        font-weight:500;font-size:12px;color:#A7ABAA;
                    }
                }
            }
        }
    } 
    .van-popup--bottom{
            .van-action-sheet__header{
            background-color: #4E05DF;
            color: white;
            font-weight: 900;
            }
            .van-action-sheet__content{
                .content{
                    .content_no{
                        width: 99.5%;
                        box-shadow: 2px 1px 4px 1px #a7abaa65;
                        border-radius: 5px;
                        margin: 0 auto;
                        margin-top: 0.2rem;
                        .van-cell:first-child{
                            .van-cell__title{
                            font-weight: 900;
                            font-size: 14px;
                            color: #4E05DF;
                            }
                        }
                        .van-cell{
                            .van-cell__title{
                            font-weight: 900;
                            font-size: 12px;
                            color: black;
                            }
                            .van-cell__value{
                            font-weight: 900;
                            font-size: 12px;
                            color: #E62ED7;
                            }
                        }
                        .van-card{
                            .van-card__header{
                            height: 5rem;
                            width: 100%;
                            .van-card__thumb{
                                height: 5rem;
                            }
                            .van-card__content{
                                height: 3rem;
                                .van-card__title{
                                font-weight: 900;
                                font-size: 12px;
                                color: black;
                                margin-top: 0.1rem;
                                }
                                .van-card__bottom{
                                margin-bottom:  0.4rem;
                                .van-card__price{
                                    div{
                                    font-size: 12px;
                                    font-weight: 900;
                                    .van-card__price-currency{
                                    color:#4E05DF;
                                    font-weight: 900;
                                    font-size: 16px;
                                    margin-right: 0.5rem;
                                    }
                                    .van-card__price-integer{
                                        font-weight: 900;
                                        font-size: 14px;
                                    }
                                    }
                                }
                                .van-card__num{
                                    color:#E62ED7;
                                    font-weight: 900;
                                    font-size: 12px;
                                    margin-right: 0.5rem;
                                }
                                }
                            }
                            }
                        }
                        .sp_card{
                            .van-cell{
                                font-weight: 900;
                                font-size: 14px;
                                color: #4E05DF;
                            }
                            .sp{
                                .xxdt{
                                    padding: 1rem;
                                    .xxdt_tu{
                                        text-align: center;
                                    }
                                    .xxdt_text{
                                        font-weight: 900;
                                        font-size: 12px;
                                        text-align: center;
                                        color: lightslategray;
                                    }
                                }
                            }
                        }
                    }
                }
            }
    }
}
</style>