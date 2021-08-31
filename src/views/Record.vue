<template>
    <div class="record" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">消费记录</span></template>
        </slot-header>
        <div class="body">
            <div class="card">
                <div class="qian">
                    <div class="qian_header">
                        <h2>全部记录</h2>
                        <div class="h6">如有疑惑可以拨打客服电话<span style="color:#4E05DF">400-5821-5566</span></div>
                    </div>
                </div>
            </div>
            <div class="shen">
                <van-divider>明细</van-divider>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <van-cell center :label="item.consume_flow=='1'||item.consume_flow=='3'?item.consume_time:item.recharge_time" v-for="(item,index) of record_List" :key="index">
                        <template #title>
                            <span style="font-weight:900;font-size:14px;color:#2A3139;margin:0 0.2rem 0rem 0.1rem">{{item.consume_flow=='1'?'消费':item.consume_flow=='2'?'充值':'提现'}}</span>
                            <van-tag  :type="item.consume_flow=='1'?'primary':item.consume_flow=='2'?'success':'warning'">{{item.consume_flow=='1'?'已送达':item.consume_flow=='2'?'实时到账':'提现成功'}}</van-tag>
                        </template>
                        <template #default>
                            <span style="font-weight:800;font-size:12px;color:#A7ABAA">结余￥</span><span style="color:#4E05DF;font-weight:800;font-size:16px;">{{item.consume_flow=='1'?Number(item.consume_money).toFixed(2):Number(item.recharge_money).toFixed(2)}}</span><br>
                        </template>
                    </van-cell>
                </van-list>
            </div>
        </div>
    </div>
</template>
<style  lang='less'>
    .record{
        background-color: white;
        height: 100%;
        .body{
            .card{
                position: relative;
                height: 10rem;
                background: linear-gradient(#E62ED7,#E61ED6,#E62ED7,#E61ED6);
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
                        padding: 10%;
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
                }
            }
            .shen{
                margin: 0 auto;
                padding: 0.2rem;
                padding-top: 2.5rem;
                background-color: white;
                border-radius: 5px;
                box-shadow: 2px 1px 4px 1px #a7abaa65;
            }
        }
    }
</style>
<script>
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
export default({
    data() {
        return{
            list: [],
            loading: false,
            finished: false,
            // 消费记录表
            record_List:[],
        }   
    },
    methods:{
        // 懒加载事件
        onLoad() {
        // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                for (var  i = 0; i < 5; i++) {
                this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (i=this.record_List.length) {
                this.finished = true;
                }
            }, 1000);
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
        if(this.record_List!=this.$store.state.record_List){
            this.record_List=this.$store.state.record_List
        }
    },
})
</script>
