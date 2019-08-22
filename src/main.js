import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.less'

// @ 是vue-cli提供的src绝对路径别名
// index.js 省略了  在目录下默认索引文件（默认会去加载文件index名称）
// index.js index.vue index.json 优先级和书写顺序一致，默认三种文件
import router from '@/router'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// main.js 作用入口文件  具体的职责：
// 1. 负责依赖资源的全局导入
// 2. 创建一个vue根实例 去管理index.html中app容器
