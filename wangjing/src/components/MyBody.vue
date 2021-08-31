<template>
    <div class="body" style="position:absolute;top:3.1rem;width:100vw;">
        <!-- 通过 sticky 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶。 -->
        <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
        <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
        <div class='body_head' style="position:fixed;z-index:3">
            <van-tabs v-model="activeName" @click='tabs' type="line" title-inactive-color='#A7ABAA' title-active-color='#13221C' color='#e62ed78e' line-height='8px' line-width='45px'  :animated='true' :sticky='true' :offset-top='offset_top'>
                <van-tab name="index">
                    <template #title> <van-icon name="home-o" size="1.1rem" />主页</template>
                </van-tab>
                <van-tab name="sp">
                    <!-- dot	是否在标题右上角显示小红点 -->
                    <template #title> <van-icon name="records" size="1.1rem"/>点餐</template>
                </van-tab>
                <van-tab name="order">
                    <!-- dot	是否在标题右上角显示小红点 -->
                    <template #title> <van-icon name="sign" size="1.1rem"/>订单</template>
                </van-tab>
            </van-tabs>
        </div>
        <div class="body_body" style="osition: relative;">
            <div @touchstart='touchstart' @touchend='touchend'>
                <span @click="showPopup"></span>
                <router-view/>
            </div>
        </div>
    </div>
</template>
<style lang='less'>

</style>
<script>
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
export default {
    data() {
        return {
        // 标签初始选中页选中
        activeName: 'index',
        // 标签栏顶部高度
        offset_top:'3.2rem'
        }
    },
    methods:{
        // 打开策划栏
        showPopup(){
            this.$emit('showPopup' , true)
        },
        tabs(e){
            this.$router.push(`/home/${e}`)
        },
        // ////////
        index(){
            this.$router.push("/home/sp")
            this.$store.commit('SetActiveName','sp')
        },
        sp(){
            if(disPoint.x<-120){
                this.$router.push("/home/order")
                this.$store.commit('SetActiveName','order')
            }else{
                this.$router.push("/home/index")
                this.$store.commit('SetActiveName','index')
            } 
        },
        order(){
            this.$router.push("/home/sp")
            this.$store.commit('SetActiveName','sp')
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
            // console.log(nowPoint)
            // console.log(disPoint)
            // 如果按下的位置
            if(startPoint.x>20){
                var activeName = this.$store.state.activeName
                if(disPoint.x>240){
                    if(activeName=='index'){
                        // this.index()
                    }else if(activeName=='sp'){
                        this.sp()
                    }else{
                        this.order()
                    }
                }else if(disPoint.x<-240){
                    if(activeName=='index'){
                        this.index()
                    }else if(activeName=='sp'){
                        this.sp()
                    }else{
                    }
                }
            }else{
                if(disPoint.x>240){
                console.log('打开侧滑栏')
                this.showPopup()
                }
            }
        }
    },
    mounted(){
        this.activeName = this.$store.state.activeName
        this.$router.push(`/home/${this.activeName}`)
    },
    watch:{
        activeName(){
            this.$store.commit('SetActiveName',this.activeName)
        },
    },
    // 界面更新以后执行
    updated(){
        this.activeName = this.$store.state.activeName
    },
}

</script>
