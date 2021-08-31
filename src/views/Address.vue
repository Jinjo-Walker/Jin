<template>
    <div class="address" @touchstart='touchstart' @touchend='touchend'>
        <slot-header class="slot-header">
            <template #title_text><span class="title_text">地址管理</span></template>
            <template #title_right><van-icon name="success" @click="queding" color='#A7ABAA' size='1.1rem'/></template>
        </slot-header>
        <div class="body">
          <!-- 地址表 -->
            <div class="card" :v-show="address_List.length==0">
                <van-address-list
                  v-model="chosenAddressId"
                  :list="address_List"
                  default-tag-text="默认"
                  add-button-text='新增地址＋'
                  @add="onAdd"
                  @edit="onEdit"
                  @select='select'
                  @click-item='click_item'
                />
            </div>
          <!-- 弹出层 -->
          <van-popup v-model="address_edit_show" closeable position="bottom" :style="{ height: '50%' }">
            <!-- show-postal 邮政编码 -->
            <!-- tel-validator  -->
            <van-address-edit
              :show-delete='show_delete'
              show-set-default
              show-detail
              :is-saving='is_saving'
              :address-info='address_info'
              address='郑州市'
              :detail-rows='2'
              :show-area='false'
              :show-search-result='true'
              @save='save'
              @delete="delete_address"
            />
          </van-popup>
        </div>
    </div>
</template>
<style lang="less">
.address{ 
    display:flex;
    justify-content: center;
    flex-direction:column;
    height: 100vh;
    .slot-header{
        flex: 0;   
    }
    .body{
        background-color: #e7e7e7cc;
        height: 80vh;
        flex: 1;
        overflow:auto;
        margin-bottom: 2.5rem;
        .card{
            width: 95%;
            margin:0.5rem auto;
            overflow: hidden;
            border-radius:0.5rem;
            background-color: #e7e7e7cc;
            .van-address-list{
                padding: 0;
                .van-address-item{
                    background-color: white ;
                    .van-cell{
                      background-color: white;
                      // 单选框选中后的颜色
                        .van-radio__icon--checked{
                        .van-icon{
                          background-color: #E62ED7;
                          border-color: #E62ED7;
                        }
                      } 
                      // 标签的颜色
                      .van-tag--round{
                        background-color: #E62ED7;
                      }
                      // 名字的样式
                      .van-address-item__name{
                        color:#2A3139;font-weight:800;font-size:14px;
                      }
                      // 地址的样式
                      .van-address-item__address{
                        font-weight:800;font-size:12px;color:#a3a3a391;margin-right:1rem;
                      }
                    }
                }
                .van-address-list__bottom{
                    padding: 0;
                    background-color:'#e7e7e7cc';
                    .van-button{
                        padding:0;
                        margin: 0;
                        border-radius:0;
                        border: 1px solid #E62ED7;
                        background-color: white;
                        color: #E62ED7;
                        font-size: 0.8rem;
                        font-weight: 800;
                    }
                }
            }  
        }
        .van-address-edit{
          // 选中状态
          .van-switch--on{
            background-color:#E62ED7
          }
          .van-address-edit__buttons{
            // 新增地址表单提交按
            .van-button--danger{
              color: #E62ED7;
              background-color: white;
              border: 1px solid #E62ED7;
            }
          }
        }
    // 默认地址按钮样式
    .van-switch{
      background-color:#e7e7e7cc;
    }
  }
}
</style>
<script>
let startPoint = {}; //摁下时手指坐标
let disPoint = {};//手指移动距离
// 引入弹出消息框
import { Toast } from 'vant';
export default {
  data() {
    return {
      // 填写表单的初始值
      address_info:{},
      // 是否显示删除按钮
      show_delete:false,
      // 点击确定加载动画否
      is_saving:false,
      // 当前编辑的地址下标
      onAddressId:-1,
      // 以下是弹出层的显示隐藏
      address_edit_show:false,
      // 以下是地址列表
      chosenAddressId: '1',
      address_List: [],
    };
  },
  methods: {
    // 右上角确定按钮
    queding(){
      history.go(-1)
    },
    // 新增地址点击确认
    save(content){
      // console.log(content)
      // 新增地址时默认值为空
      this.address_info={}
      // 开启加载动画
      this.is_saving=true
      setTimeout(()=>{
        // 时间到关闭加载动画
        this.is_saving=false
        // console.log(content)
        // 新的地址对象
        var newlist ={
          name: content.name,
          tel: content.tel,
          address: content.addressDetail,
          isDefault:content.isDefault,
          isno:content.isDefault
        }
        // 如果设置默认地址，其他他地址取消默认地址
        // 判断列表中是否已包含此地址
        var isno = false
        for(var i of this.address_List){
          if(i.name==newlist.name&&i.tel==newlist.tel&&i.address==newlist.address){
            isno = true
          }else{
            // 判断默认按钮是否选中
            if(content.isDefault){
              this.chosenAddressId=newlist.id
              i.isDefault=false
            }
          }  
        }
        // 如果不显示删除按钮代表新增加的地址
        if(this.show_delete){
          this.axios.put(
            '/user/updateAddress',
            `name=${content.name}&tel=${content.tel}&users_address=${content.addressDetail}&is_address=${content.isDefault?'1':'0'}&aid=${content.aid}`
            ).then(res => {
              if(res.data.code==200){
                this.address_List[this.onAddressId]=newlist;
                this.address_edit_show=false;
                this.$store.commit('SetAddress_List',this.address_List)
                // 修改成功提示
                Toast({
                  message: '修改成功',
                  position: 'top',
                });
                // 恢复onAddressId为-1
                this.onAddressId=-1
              }else{
                Toast({
                  message: '修改失败',
                  position: 'top',
                });
              }
            })
          
        }else{
          if(isno){
            Toast({
            message: '地址已存在',
            position: 'top',
            });
          }else{
            // 往list列表里追加新地址
            this.address_List.push(newlist)
            this.axios.post(
            '/user/addAddress',
            `name=${content.name}&tel=${content.tel}&users_address=${content.addressDetail}&is_address=${content.isDefault?'1':'0'}`
            ).then(res => {
              if(res.data.code==200){
                this.address_edit_show=false;
                this.$store.commit('SetAddress_List',this.address_List)
                // 添加成功提示
                Toast({
                  message: '添加成功',
                  position: 'top',
                });
                this.onAddressId=-1
              }else{
                Toast({
                  message: '添加失败',
                  position: 'top',
                });
              }
            })
          } 
        }   
      },1000)
    },
    // 这是新增地址按钮
    onAdd() {
      // 新添加不显示删除按钮
      this.show_delete=false
      this.address_edit_show=true;
    },
    // 编辑地址按钮
    onEdit(item, index) {
      // console.log(item,index);
      // 设置当前编辑地址的下标
      this.onAddressId=index
      // 详细地址
      item.addressDetail = item.address;
      // 显示编辑列表
      this.address_edit_show=true;
      // 显示删除按钮
      this.show_delete=true;
      this.address_info=item;
    },
    // 地址选中事件
    click_item(item,index){
      // console.log(item,index)
    },
    // 编辑地址表单的删除按钮事件
    delete_address(content){
      var a 
      for(var i=0; i<this.address_List.length;i++){
        if(this.address_List[i].aid==content.aid){
          a = i
        }
      }
      this.axios.delete('/user/delAddress',{
        params:{aid:content.aid}
      }).then(res=>{
        if(res.data.code==200){
          this.address_List.splice(a,1)
          this.address_edit_show=false;
          this.$store.commit('SetAddress_List',this.address_List)
          // 删除地址成功提示
          Toast({
            message: '删除成功',
            position: 'top',
          });
        }else{
          Toast({
            message: '删除失败',
            position: 'top',
          });
        }
      })
      // 删除地址的事件可以写在这里
    },
    // 选中时的事件
    select(item,index){
      var a = 0
      for(var i of this.address_List){
        if(index==a){
          i.isno=true
        }else{
          i.isno=false
        }
        a++
      }
      this.$store.commit('SetAddress_List',this.address_List)
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
  },
  mounted(){
    this.address_List=this.$store.state.address_List
    // this.$store.dispatch('GetUser','uid=1')
    // this.$store.dispatch('GetOrder_List','1')
    // 赋值商品列表
  }
};
</script>
