<template>
    <div class="product">
        <my-header ></my-header>
        <div class="img1" style="background-color:#fff;margin:1%;border-radius: 5px;">
            <img src="logo1.png" alt="">
        </div>
        <van-index-bar :index-list="indexList" :sticky-offset-top='91' highlight-color='#E62ED7'>
            <div v-for="(item,index) in sp_type" :key="index">
                <van-index-anchor :index="item.att">{{item.att}}</van-index-anchor>
                <div class="card" v-for="(row,index) in item.alldata" :key="index">
                    <van-card
                        :tag="row.sp_is_on==1?'在售':'下架'"
                        :price="row.sp_price.toFixed(2)"
                        :title="row.sp_name"
                        :thumb="row.sp_img"
                    >
                        <template #desc>
                            <div class="van-card__desc van-multi-ellipsis--l3">{{row.sp_descript}}</div>
                        </template>
                        <template #footer>
                            <div @click="detail_show(row)" style="margin-bottom:3rem;color:#4E05DF;text-decoration:underline;font-size: 12px;">查看详情>></div>
                            <van-stepper v-model="stepper_value[row.spid-1]" @change='stepper_value_change()' theme="round" :min='0' button-size="1.2rem" disable-input /> 
                        </template>
                    </van-card>
                </div>
            </div>
        </van-index-bar>
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
<style lang="less">
.product{
    .img1{
        overflow: hidden;
        height: 2rem;
        img{
            width: 30%;
            height: 2rem;
            margin-left:40%
        }
    }
    .van-index-bar{
        width: 80%;
        .van-index-bar__sidebar{
            left: -4%;
            top:60%;
            width: 20%;
            .van-index-bar__index{
                line-height: 1.2rem;
                color: #4E05DF;
                font-size: 12px;
                font-weight: 800;
                padding-left: 1rem;
            }
            
        }
        .van-index-anchor{
            width: 100%;
            padding: 0;
            margin-left: 16.1%;
            margin-right: 0.5rem;
            font-weight:800;
            font-size:14px;
            color:#8d8d8d;
            // background-color:#E62ED7;
        }
        .card{
            margin-left: 20%;
            margin-right: 0.4rem;
            width: 100%;
            .van-card{
                margin-bottom: 0.3rem;
                border-radius: 5px;
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
        }
        .card:last-child{
            margin-bottom: 3.4rem;
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
<script>
import Bus from '../common/js/bus.js'
import { Toast } from 'vant';
export default {
    data() {
        return {
            // 商品详情是否显示
            sp_detail_show:false,
            // 购物车初始化
            stepper_value:[],
            // 菜单分类表
            typeList: [
                    // {tid:1,type_name:'烤串'}, 
                    // {tid:2,type_name:'凉菜'},
                    // {tid:3,type_name:'小吃'},
                    // {tid:4,type_name:'主食'},
                    // {tid:5,type_name:'饮料'},
                    // {tid:6,type_name:'酒水'},
                    // {tid:7,type_name:'海鲜'}
                    ],
            indexList:[],
            // 菜单表
            product_List:[
                    {spid:1,sp_type_id:1,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'}
                ],
            sp_type:[],
            cart_List:{
                uid:1,
                sp:[],
                car_status:0,
                car_create_time:'2021/08/02',
                car_update_time:'2021/08/03',
                Total_price:0
            },
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
        // 查看详情按钮
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
                    // console.log(item)
                 }else{
                    Toast({
                        message: `获取失败，稍后重试`,
                        position: 'top',
                    });
                 }
            })
        },
        // 购物车事件
        stepper_value_change(){
            if(this.$store.state.cart_List.sp!=undefined){
                this.cart_List.sp=[];
                for(var z of this.product_List){
                    var sp_name=z.sp_name
                    var sp_price=z.sp_price
                    var sp_descript=z.sp_descript
                    var spid=z.spid
                    var sp_img=z.sp_img
                    this.cart_List.sp.push({
                        spid:spid,
                        sp_name:sp_name,
                        car_sp_number:this.stepper_value[spid-1],
                        sp_price:sp_price,
                        sp_descript:sp_descript,
                        sp_img:sp_img
                    })
                }

                // Bus.$emit('GetCart_List',this.cart_List)
                // 修改总价
                this.cart_List.car_update_time = new Date().toLocaleString()
                this.cart_List.car_create_time = new Date().toLocaleString()
                this.cart_List.Total_price=0.00
                var spsl=0
                for(var i of this.$store.state.cart_List.sp){
                    if(i.car_sp_number!=0){
                        this.cart_List.Total_price+=i.car_sp_number*i.sp_price*100
                        spsl++
                    }
                }
                this.$store.commit('SetCart_spsl',spsl)
                this.$store.commit('SetCart_List',this.cart_List)
                // console.log(this.$store.state.cart_List.sp)
            }else{
                history.go(0)
            }
            
        }
    },
     mounted(){
        //  赋值商品列表
        this.product_List=this.$store.state.product_List
        // 赋值商品分类
        this.typeList=this.$store.state.typeList
        // 购物车里所有商品数量为0
        if(this.product_List.length>0){
            for(var z of this.product_List){
                this.stepper_value.push(0)
            }
        }
        // 获取购物车修改数量
        if(this.$store.state.cart_List.length>0){
            for(var x of this.$store.state.cart_List.sp){
                this.stepper_value[x.spid-1]=x.car_sp_number
            } 
        }
        // 给商品分类
        function  find1(data,att){
            const arr = []
            const obj = {}
            data.forEach(element => {
                if(!obj[element[att]]){
                    arr.push({
                        att:element[att],
                        alldata:[element],
                    })
                    obj[element[att]]=element
                }else{
                    arr.forEach(ele=>{
                        if(ele.att===element[att]){
                            ele.alldata.push(element)
                        }
                    })
                }
            });
            return arr
        }
            Bus.$emit('GetCart_List',this.cart_List);
            if(this.typeList.length>0){
                for(var i of this.typeList){
                    this.sp_type.push(i.type_name)
                }
            }
            //执行分类
            if(this.product_List.length>0){
                this.sp_type=find1(this.product_List,'sp_type_id')
                // 给类型取别名
                for(var j of this.sp_type){
                    var name = this.typeList[(j.att)/10-1].sp_type_name
                    j.att=name
                    this.indexList.push(name)
                }
            }
    }
}

</script>
