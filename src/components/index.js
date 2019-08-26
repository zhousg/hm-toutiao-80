// 封装一个插件，目的全局注册components下所有的组件。
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    // Vue 对象  main.js 使用 Vue.use(插件) 调用install函数，传入当前的Vue对象
    Vue.component(MyBread.name, MyBread)
  }
}
