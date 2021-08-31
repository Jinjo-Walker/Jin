<template>
  <div class="order">
    <div class="img" style="background-color:#fff;margin:1%;border-radius: 5px;">
      <img src="/image/banner/banner1.png" alt="">
    </div>
    <div class="heng" style="background-color:#fff;margin:0 1%;border-radius: 5px;padding:1rem">
      <h4 style='margin:0;text-align: center;color:#A7ABAA;'>订单有疑惑?拨打客服电话<span style="font-size:12px;margin-left:2%;color: #4E05DF;text-decoration:underline;">400-5821-5566</span></h4>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="card" v-for="(item,index) of order_List" :key="index">
        <van-card
          :price='Number(item.order.order_money).toFixed(2)'
          :desc="`下单时间${item.order.order_update_time}`"
          :thumb="item.detail[0].sp_img"
        >
          <template #title>
            <span class="ckxq" @click="order_xq(index)">点击查看详情>></span> 
          </template>
          <template #tags>
            <van-tag plain type="danger">外卖</van-tag>
          </template>
          <template #tag>
            <van-tag type="primary" v-if="item.order.order_pay_status==1&&item.order.order_status==0">已支付</van-tag>
            <van-tag type="success" v-else-if="item.order.order_pay_status==0&&item.order.order_status==1">未使用</van-tag>
            <van-tag type="danger" v-else>未支付</van-tag>
          </template>
          <template #footer>
            <div style="display: flex;flex-direction:column; ">
              <van-icon name="delete-o" style="width: 1.3rem;margin-left:80%" size='1.3rem' color='#4E05DF' @click="delete_card(index)"/>
              <div style="margin-top:3rem">
                <van-button size="mini" color='#4E05DF' @click="Again(item.detail)">再来一单</van-button>
                <van-button size="mini" :color="item.order.isEstimate==0?'#E62ED7':'#a7abaa'" @click="estimate(item.order)">评价</van-button>
              </div>
            </div>
          </template>
        </van-card>
      </div>
    </van-list>
    <!-- <div class="footer"> -->
    <!-- 展示详情 -->
      <van-action-sheet v-model="order_show" title="订单详情">
        <div class="content">
          <div class="content_no">
            <van-cell title="基础信息"/>
            <van-cell title="订单编号" icon="orders-o" :value="actions.order.order_no" />
            <van-cell title="总价" icon="balance-list-o" :value="`￥${Number(actions.order.order_money).toFixed(2)}`" />
            <van-cell title="下单时间" icon="todo-list-o" :value="actions.order.order_time" />
            <van-cell title="联系地址" icon="location-o" :value="`${actions.order.user_name}/${actions.order.phone}`"  :label="actions.order.users_address"/>
            <van-cell title="备注信息" icon="records" :value="actions.order.remarks" />
          </div>
          <div class="sp_card">
            <van-cell title="商品信息"/>
            <div class="sp" v-for="(item,index) in actions.detail" :key="index">
              <van-card
                :num="item.sp_number"
                :price="Number(item.sp_price).toFixed(2)"
                :title="item.sp_uname"
                :thumb="item.sp_img"
              >
              </van-card>
            </div>
          </div>
        </div>
      </van-action-sheet>
    <!-- </div> -->
  </div>
</template>
<style lang="scss">
.order{
  margin-top: 3rem;
  .img{
    overflow: hidden;
    height: 10rem;
    img{
      width: 100%;
      height: 10rem;
      // text-align: center;
    }
  }
  // height: 85.3vh;
  background-color: #f0f0f0;
  // overflow: hidden;
  .van-list{
    .card{
    padding: 1%;
      .van-card{
        background-color: white;
        border-radius: 5px;
        .van-card__header{
          .van-card__thumb{
            height: 88px;
          }
          .van-card__content{
            width: 8rem;
            .ckxq{color: #604f81;font-size: 12px;}
            .van-card__bottom{
              width: 100%;
              .van-card__price{
                div{
                  font-size: 12px;
                  font-weight: 900;
                  .van-card__price-currency{
                  color:#e4393c;
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
            }
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
          height: 20.8rem;
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
              line-height: 14px;
              color: #E62ED7;
            }
          }
          .van-cell:last-child{
            .van-cell__title{
              font-weight: 900;
              font-size: 12px;
              color: black;
            }
            .van-cell__value{
              font-weight: 900;
              font-size: 12px;
              line-height: 14px;
              color: #a7abaa;
            }
          }
        }
        .sp_card{
          position: relative;
          // height: 9rem;
          width: 99.5%;
          box-shadow: 2px 1px 4px 1px #a7abaa65;
          border-radius: 5px;
          margin: 0 auto;
          margin-top: 0.2rem;
          // overflow: auto;
          margin-bottom: 0.2rem;
          .van-cell{
            font-weight: 900;
            font-size: 14px;
            color: #4E05DF;
          }
          .sp{
            .van-card{
              
              .van-card__header{
                height: 4rem;
                width: 100%;
                .van-card__thumb{
                  height: 4rem;
                }
                .van-card__content{
                  height: 2rem;
                  .van-card__title{
                    font-weight: 900;
                    font-size: 12px;
                    color: black;
                    margin-top: 0rem;
                  }
                  .van-card__bottom{
                    margin-bottom:  1.8rem;
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
          }
        }
      }
    }
  }
}
</style>
<script>
// 引入弹出框的函数
import { Dialog } from 'vant' 
// 引入弹出消息框
import { Toast } from 'vant';
export default {
  data(){
    return{
      order_List:[],
      loading: false,
      finished: false,
      order_show:false,
      actions: {
        order:[{
        isEstimate: 0,
        oid: 6,
        order_money: 27.5025,
        order_no: "1629906115280462802",
        order_pay_status: "1",
        order_status: "0",
        order_time: "2021-08-25T15:41:55.000Z",
        order_update_time: "2021-08-25T15:41:55.000Z",
        phone: "18535865569",
        remarks: "",
        uid: 7,
        user_name: "天要下雨",
        users_address: "郑州市金水区优胜北路1号芯互联大厦16楼",
      }],
      detail:[{odid: 7,
      order_no: "1629906115280462802",
      sp_id: 5,
      sp_img: "image/shop/yangrou1.png",
      sp_number: 3,
      sp_price: 3,
      sp_uname: "烤羊肉串"}]
      },
    }
  },
  methods:{
    // 点击评价按钮
    estimate(i){
      if(i.isEstimate==0){
        this.$store.commit('SetIs_Estimate',i)
        this.$router.push("/estimate")
      }else{
        Toast({
          message: '已经评论过了',
          position: 'top',
        });
      } 
    },
    // 点击再来一单
    Again(item){
      console.log(item)
      var sp=[]
      var cart_List={}
      for(var z of item){
        var sp_name=z.sp_uname
        var sp_price=z.sp_price
        var sp_descript=z.sp_descript
        var spid=z.sp_id
        var sp_img=z.sp_img
        sp.push({
            spid:spid,
            sp_name:sp_name,
            car_sp_number:z.sp_number,
            sp_price:sp_price,
            sp_descript:sp_descript,
            sp_img:sp_img
        })
      }
      cart_List.sp = sp
      // Bus.$emit('GetCart_List',this.cart_List)
      // 修改总价
      cart_List.car_update_time = new Date().toLocaleString()
      cart_List.car_create_time = new Date().toLocaleString()
      cart_List.Total_price=0.00
      var spsl=0
      for(var i of cart_List.sp){
        if(i.car_sp_number!=0){
            cart_List.Total_price+=i.car_sp_number*i.sp_price*100
            spsl++
        }
      }
      console.log(cart_List)
      this.$store.commit('SetCart_spsl',spsl)
      this.$store.commit('SetCart_List',cart_List)
      this.$router.push("/home/sp")
      this.$store.commit('SetActiveName','sp')
    },
    // 点击卡片查看详情
    order_xq(index){
      this.actions = this.order_List[index]
      this.order_show=true
    },
    // 删除订单记录
    delete_card(index){
      var beforeClose=(action, done)=>{
        if (action === 'confirm') {
            // 点击确定
            setTimeout(function(){
                done()
            }, 1000);
        } else {
            // 点击取消
            done()
        }
      }
      Dialog.confirm({
      title: '确定删除？',
      message: '删除后不能恢复哦！',
      // theme:'round',
      confirmButtonColor:'#A7ABAA',
      cancelButtonColor:'#E62ED7',
      beforeClose,
      }).then(()=>{
        this.axios.delete(
        '/order/delOrder',{
        params:{oid:this.order_List[index].order.oid,order_no:this.order_List[index].order.order_no}
        }).then(res => {
           if(res.data.code==200){
              this.order_List.splice(index,1)
              this.$store.commit('SetOrder_List',this.order_List)
              Toast({
                message: '删除成功',
                position: 'top',
              });
           }
        })
        
      })
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      var list = this.order_List.length
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          list++
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (list >= this.order_List.length) {
          this.finished = true;
        }
      }, 1000);
    }, 
  },
  mounted(){
    this.order_List= this.$store.state.order_List
    // console.log(this.$store.state.order_List)
  },
}
</script>