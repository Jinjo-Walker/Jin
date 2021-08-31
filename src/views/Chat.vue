<template>
    <div class="chat" @touchstart='touchstart' @touchend='touchend'>
        <slot-header>
            <template #title_text><span class="title_text">消息</span></template>
            <!-- <template #title_right><van-icon name="ellipsis" color='#A7ABAA' size='1.1rem' /></template> -->
        </slot-header>
        <div class="body">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <div style="width=100%;height:38rem">
                    <van-cell size="large" v-for="(cell,i) of chat_list" :key="i">
                        <template #title>
                            <div style="display: flex;">
                                <van-image round width="2.5rem" height="2.5rem" src="https://img01.yzcdn.cn/vant/cat.jpeg"/>
                                <div style="margin-left:0.3rem;margin-top:0.5rem">
                                    <span style="font-weight:900;font-size:15px;color:#E62ED7">{{cell.name}}</span>
                                    <van-tag plain type="primary" color='#4E05DF'>{{cell.status==0?'未读':'已读'}}</van-tag>
                                </div>
                            </div>
                        </template>
                        <template #default>
                            <span style="font-weight:300;font-size:12px;color:#4E05DF;">{{cell.time}}</span>
                        </template>
                        <template #label>
                            <span style="font-weight:300;font-size:12px;color:#A7ABAA;display: block;width:15rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{cell.content}}</span>
                        </template>
                    </van-cell>
                    <!-- 消息为空时的状态 -->
                    <van-empty v-show='empty_show' description="`暂时还没有消息`" />
                </div>
            </van-pull-refresh>
        </div>
    </div>
</template>
<script>
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
export default {
    data() {
    return {
        empty_show:false,
        // 刷新次数
        count: 0,
        isLoading: false,
        // 消息列表
        chat_list:[
            {name:'望望客服',content:'亲，您的的美食正在后厨深加工中，请耐心等待哟',time:'2021/08/03',status:0},
            {name:'店长老王',content:'亲，您对这次的服务还满意吗？快来告诉我吧',time:'2021/08/04',status:1},
            {name:'外卖飞毛腿',content:'亲，我现在正在路上，美食马上就要到喽！',time:'2021/08/05',status:0},
        ]
    };
  },
    methods: {
        onRefresh() {
            this.empty_show=false
            setTimeout(() => {
                console.log('刷新成功');
                this.isLoading = false;
                this.count++;
                if(this.chat_list.length==0){
                    this.empty_show=true  
                }  
            }, 1000);
        },
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
}
</script>