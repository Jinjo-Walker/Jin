import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';

<<<<<<< HEAD
Vue.use(Vant);
Vue.config.productionTip = false
=======
import { Lazyload } from 'vant';
Vue.use(Lazyload);
// 引入vantui组件
Vue.use(Vant);
Vue.config.productionTip = false
// 引入moment
// import moment from 'moment';
// Vue.use(moment)
// 引入扫一扫模块
import Mui from 'vue-awesome-mui'
Vue.use(Mui)
// 引入axios
import axios from "axios"
Vue.prototype.axios=axios
// 引入主页页头
import MyHeader from '@/components/MyHeader.vue'
Vue.component("my-header",MyHeader)
// 引入主页身体
import MyBody from '@/components/MyBody.vue'
Vue.component("my-body",MyBody)
// 引入solt页头部分
import SlotHeader from '@/components/SlotHeader.vue';
Vue.component("slot-header",SlotHeader)

//socketio引入
import VueScoketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(new VueScoketIO({
  debug:false,        //用于调试
  connection:SocketIO('ws://127.0.0.1:3000')  //建立连接
}));
>>>>>>> 0756acf (wangjing-v 1.0.0.1)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
