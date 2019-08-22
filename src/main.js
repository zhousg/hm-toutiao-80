import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// main.js 作用入口文件  具体的职责：
// 1. 负责依赖资源的全局导入
// 2. 创建一个vue根实例 去管理index.html中app容器
