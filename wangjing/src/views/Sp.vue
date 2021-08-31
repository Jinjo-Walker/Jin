<template>
  <div class="sp">
        <product></product>
      <div>
        <shop-cart></shop-cart>
      </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
import Product from '../components/Product.vue'
import ShopCart from '../components/ShopCart.vue'
export default {
  components:{Product,ShopCart},
  data() {
    return {
      activeKey: 0,
      sidebarNumber:5,
    };
  },
  methods: {
    // 侧导航栏
    onChange(index) {
      Notify({ type: 'primary', message: index });
    },
  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll)
  },
};
</script>
<style scope>
</style>

