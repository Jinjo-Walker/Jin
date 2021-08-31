<template>
    <div class="slotheader">
        <header>
            <!-- 左侧退出部分 -->
            <section class="head_goback">
                <!-- <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" >
                <polyline points="12,16 4,9 12,0" style="fill:none;stroke:#A7ABAA;stroke-width:2"/>
                </svg> -->
                <van-icon name="arrow-left" @click="close" color='#A7ABAA' size='1.1rem'/>
            </section>
            <!-- 中间标题部分 -->
            <section class="title_head ellipsis">
                <div class="title_text">
                    <slot name="title_text"></slot>
                </div>
            </section>
            <!-- 右侧餐单栏 -->
            <section class="title_right">
                <slot name="title_right"></slot>
            </section>
        </header>
    </div>
</template>
<script>
export default {
    methods:{
        // 退出
        close(){
            // var url = this.$store.state.activeName
            // this.$router.push(`/home/${url}`)
            history.go(-1)
        }
    },
}
</script>
<style scoped lang="less">
  .slotheader{  
    
    margin-bottom: 2.6rem;
    header{
      z-index: 10;
      position:fixed;
      top: 0;
      left: 0;
      width: 100vw;
      // background-color: #E62ED7;
      // background-image：radial-gradient(#c429b7 0 30% ,#E62ED7 30% 70% ,#c429b7 70% 100%;);
      background: linear-gradient(#E62ED7,#E61ED6,#E62ED7,#E61ED6);
      box-shadow: 0.2px 0.2px 2px 0.2px #E62ED7;
      height: 2.6rem;
      border-radius: 1px;
      width: 100%;
      text-align: center;
      line-height: 2.6rem;
      display: flex;
      /*position: fixed;*/
      top:0;
      z-index: 1;
      /deep/ .head_goback{
        padding-top: 0.2rem;
        width: 0.6rem;
        height: 0.8533rem;
        padding-left: 0.2rem;
      }
      /deep/ .title_head{
        width: 92%;
        text-align: center;
        color:rgb(255, 255, 255);
        font-weight: 800;
        font-size: 1.1rem;
        letter-spacing: 3px;
      }
      /deep/ .title_right{
        padding-top: 0.2rem;
        width: 0.6rem;
        height: 0.8533rem;
        text-align: center;
        color: #A7ABAA;
        padding-right: 0.9rem;
      }
    }
  }
</style>