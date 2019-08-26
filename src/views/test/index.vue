<template>
  <div class='container'>
    <!-- 使用组件 -->
    <com-a>
      <!-- slot="content" 指定插槽名称  -->
      <!-- slot-scope="scope" 接收作用域插槽上所有绑定的数据，数据的集合名字叫scope对象{msg:'',list:''} -->
      <!-- <div slot="content" slot-scope="scope">内容1 {{scope.msg}}</div> -->
      <!-- 在vue版本 2.6.0 之后提供了新的写法  v-slot:插槽名称="作用域数据对象" -->
      <template v-slot:content="scope">内容1 {{scope.msg}}</template>
      <div slot="footer">底部1</div>
    </com-a>
    <hr>
    <com-a></com-a>
  </div>
</template>

<script>
import ComA from './com-a'
export default {
  components: { ComA }
  // async created () {
  //   // 1. 使用promise 调用A接口后调用B接口获取所有的数据
  //   // this.$http.get('http://localhost:3000/a')
  //   //   .then(res => {
  //   //     console.log(res.data) // A
  //   //     return this.$http.get('http://localhost:3000/b')
  //   //   })
  //   //   .then(res => {
  //   //     console.log(res.data) // B
  //   //   })

  //   // 2. 使用async await 调用A接口后调用B接口获取所有的数据
  //   // 使用 await 修饰的函数（返回值promise） 那么：返回值成功后的结果
  //   // await 同步执行这个函数，阻碍当前程序执行
  //   // await 的使用必须在 async 修饰的函数内部 （await的外层函数必须加上async ）
  //   const resA = await this.$http.get('http://localhost:3000/a')
  //   const resB = await this.$http.get('http://localhost:3000/b')
  //   console.log(resA.data, resB.data)
  // }
}
</script>

<style scoped lang='less'></style>
