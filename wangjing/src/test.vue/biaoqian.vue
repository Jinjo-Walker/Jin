<template>
    <div class="ceshi">
        <van-index-bar :index-list="indexList" :sticky-offset-top='50' highlight-color='#E62ED7'>
            <div class="bj">
                <div class="img1" style="background-color:#fff;margin:1%;border-radius: 5px;">
                    <img src="logo1.png" alt="">
                </div>
                <div v-for="(item,index) in sp_type" :key="index">
                    <van-index-anchor :index="item.att">{{item.att}}</van-index-anchor>
                        <div class="card" v-for="(row,index) in item.alldata" :key="index">
                            <van-card
                                num="2"
                                tag="标签"
                                price="2.00"
                                desc="描述信息"
                                :title="row.sp_name"
                                thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
                            >
                            <template #footer>
                                <van-stepper v-model="stepper_value" theme="round" :min='0' button-size="1rem" disable-input /> 
                            </template>
                        </van-card>
                    </div>
                </div>
            </div>
        </van-index-bar>
    </div>
</template>
<script>
export default {
    props:{
        lid:Number
    },
    data(){
        return {
            typeList: [
                {tid:1,type_name:'烤串'}, 
                {tid:2,type_name:'凉菜'},
                {tid:3,type_name:'小吃'},
                {tid:4,type_name:'主食'},
                {tid:5,type_name:'饮料'},
                {tid:6,type_name:'酒水'},
                {tid:7,type_name:'海鲜'}
                ],
            indexList:[],
            product_List:[
                {spid:1,sp_type_id:1,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:2,sp_type_id:1,sp_name:'烤场',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:3,sp_type_id:2,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:4,sp_type_id:2,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:5,sp_type_id:3,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:6,sp_type_id:3,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:7,sp_type_id:4,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:8,sp_type_id:4,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:9,sp_type_id:5,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:10,sp_type_id:5,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:11,sp_type_id:6,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:12,sp_type_id:6,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:13,sp_type_id:7,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
                {spid:14,sp_type_id:7,sp_name:'烤腰子',keyword:'腰子',sp_img:'https://img01.yzcdn.cn/vant/ipad.jpeg',sp_descript:'腰子是当天新鲜宰杀的羊腰子，请放心食用',sp_detail_id:1,sp_price:'25.00',sp_estimate:1,sp_is_on:1,sp_sell_count:128,sp_time:'2021/08/01'},
            ],
            sp_type:[],
            //数量    
            stepper_value:0
        }
    },
    methods:{
        change(){
            console.log('nih')
        }
    },
    mounted(){
        for(var i of this.typeList){
            this.indexList.push(i.type_name)
        }
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
        (()=>{
            this.sp_type=find1(this.product_List,'sp_type_id')
            for(var j of this.sp_type){
                j.att=this.typeList[j.att-1].type_name
            }
            console.log(this.sp_type)
        })()
    }
}
</script>
<style lang="less">
    .product{
        .van-index-bar{
            .van-index-bar__sidebar{
                position: fixed;
                top: 20rem;
                left:0rem ;
                width: 3rem;
                background-color: rgba(255, 255, 255, 0);
                border-left: 0;
                .van-index-bar__index{
                    line-height: 1.2rem;
                    color: #4E05DF;
                    font-size: 12px;
                    font-weight: 800;
                    padding: 0;
                }
            }
            .van-index-anchor--sticky{
                color: black;
                font-weight: 800;
                font-size: 14px;
                
            }
            .bj{
                background-color: white;
                .img1{
                    overflow: hidden;
                    height: 2rem;
                    img{
                        width: 30%;
                        height: 2rem;
                        margin-left:40%
                    }
                }
                .van-index-anchor{
                margin-left: 12%;
                width: 85%;
                background-color:#E62ED7 ;
                padding: 0;
                color: black;
                font-weight: 800;
                font-size: 14px;
                border-radius: 5px;
                .card{
                    background-color: white;
                    padding: 0rem;
                    margin: 0.1rem 0.1rem 0rem 0.1rem;
                    border-bottom: 0.1rem solid #E62ED7;
                    .van-card__content{
                        .van-card__title{
                            color: black;
                            font-weight: 800;
                            font-size: 14px;
                        }
                        .van-card__desc{
                            color: #A7ABAA;
                            font-weight: 800;
                            font-size: 12px;
                        }
                        .van-card__price{
                            color:#E62ED7 ;
                        }
                    }
                    .van-card__footer{
                        .van-stepper{
                            margin-top: 80%;
                        }
                    }
                }
                
            }
            .van-index-anchor:last-child .card:last-child{
                    margin-bottom:  3.3rem;
                    border-bottom: 0.2rem solid #E62ED7;
                }
            }
            
        }
    }
</style>