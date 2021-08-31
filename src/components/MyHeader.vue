<template>
    <div class="header" >
      <van-nav-bar title="" border :laceholder='true' :fixed='true' :placeholder='true'>
        <!-- 左侧用户侧滑按钮 -->
        <template #left>
         <van-icon name="manager-o"  @click="showPopup"  size="1.3rem" color='#E62ED7'/>
        </template>
        <!-- 定位选择 -->
        <template #title style="falot:left">
          <div v-if="header_show" style="display: flex;justify-content: center;align-items: center;">
            <van-icon name="location-o" color='#4E05DF'/>
            <van-dropdown-menu active-color='#E62ED7'>
              <van-dropdown-item v-model="value1"
               :options="option1" />
            </van-dropdown-menu>
          </div>
          <!-- 搜索框 -->
          <form v-else action="/" style="width:16.1rem;" :transition-appear='true'>
            <!-- <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel"/> -->
            <!-- autofocus	是否自动聚焦 -->
            <van-search v-model="value" show-action placeholder="请输入搜索关键词" style="" @keydown.13='keydown(value)' :autofocus='true' clear-trigger='focus' maxlength='12'>
              <template #left-icon>
                <van-icon name="search" size='1.1rem' color='#2A3139' style="margin:auto 0"/>
              </template>
              <template #right-icon>
                <div @click="onSearch(value)" style="color:#E62ED7;font-size:14px;font-weight:800">搜索</div>
                <!-- <van-icon name="close" /> -->
              </template>
              <template #action> 
                  <span @click="onCancel" style="color:#A7ABAA;font-size:14px;font-weight:800">取消</span>
              </template>
            </van-search>
          </form>
        </template>
        <!-- 右侧消息按钮 -->
        <template #right>
          <van-icon name="search" right-icon='close' v-show="header_show" style="margin-right:0.6rem" size="1.3rem" color='#2A3139' @click="search"/>
          <!-- <van-popover v-model="showPopover" placement="bottom-end" trigger="click" @select='showPopover_click' :actions="actions" >
            <template #reference> -->
              <van-icon name="scan" size="1.3rem" color='#2A3139' @click="saoyisao"/>
            <!-- </template> -->
          <!-- </van-popover> -->
        </template> 
      </van-nav-bar>
    </div>
</template>
<style lang='less'>
.header .van-nav-bar{
  z-index: 1001;
}
.header .van-dropdown-menu{
  background-color: rgba(255, 255, 255, 0);
}
.header .van-nav-bar__content{
  height: 3.2rem;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #e6e6e62a;
}
/* 搜索框样式 */
.header .van-field__control{
  font-size: 12px;
  font-weight: 600;
  color:#A7ABAA
}
/* 下拉餐单遮罩样式 */
.zhezhao{
  background-color:rgba(0, 0, 0, 0);
}
/* 左侧消息按钮 */
.header .van-nav-bar__right{
  padding-left: 0;
}
/* 左侧消息按钮下拉菜单 */
.header .van-nav-bar__right .van-popup{
  width: 4rem;
  position: fixed;
  left: 100%;
  top: 45px;
  margin-left: -4.1rem;
  margin-top: 25px;

}
.van-popover--light{
  .van-popover__arrow {
    right: -1px;
  }
  .van-popover__content{
    .van-nav-bar__right{
      margin:0 auto;
    }
  }
  
}
/* 页头定位标题的样式 */
.header .van-ellipsis{
  font-size: 14px;
  font-weight: 800;
  color: #A7ABAA;
}
/* 顶部定位选项 */
.header .van-ellipsis{
  overflow:visible;
}
.header .van-dropdown-menu__bar{
  color: #a7abaa00;
  box-shadow:none;
}
.header .van-cell{
  margin-top: 0;
}
.header .van-dropdown-menu span{
  padding: 5px;
}
</style>
<script>
import { Toast } from 'vant';
export default({
  data(){
    
    return{
      // showPopover: false,
      // actions: [
      //   { text: '消息', icon: 'smile-comment-o',router:'/chat'},
      //   { text: '扫一扫', icon: 'scan' ,router:'/saoyisao'},
      // ],
      // 一下是搜索框
      value:'',
      // 页头显示哪一项
      header_show:true,
      // 以下是定位给选项
      value1:0,
      show1:false,
      option1:[
        {text:'郑州金水区总店',value:0},
        {text:'其它分店敬请期待...',value:1}
      ]
    }
  },
  methods: {
    // 点击右侧扫一扫按钮
    saoyisao(){
      this.$router.push("/saoyisao")
    },
    // 一下搜索框事件
    onSearch(val){
      // console.log(`正在搜索${val}`)
      this.axios.get(
      '/product/selectSp',{
      params:{sp_name:val}
    }).then(res => {
         if(res.data.code==200){
          //  console.log('生异形啊')
           this.$store.commit('SetSearch_List',res.data.data)
           this.$router.push("/search")
         }else{
          Toast({
            message: '啥也没搜到',
            position: 'top',
          });
         }
      })
    },
    onCancel(){
      // Toast('取消');
      this.header_show=true
      // console.log('nihao')
      this.value = ''
    },
    // 搜索按钮
    search(){
      this.header_show=false
    },
    // 搜索框 按回车键后发生的事件
    keydown(val){
      console.log(`正在搜索${val}`)
    },
    // 侧边栏隐藏显示
    showPopup() {
      // 页头给主页父组件传值
    this.$emit('showPopup' , true)
   },
    // 消息栏点击事件 
    showPopover_click(action,index){
      // console.log(action,index)
      this.$router.push(action.router)
    },
  },
  mounted(){
   }
})
</script>
