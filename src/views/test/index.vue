<template>
  <div class='container'>Test</div>
</template>

<script>
export default {
  async created () {
    // 1. 使用promise 调用A接口后调用B接口获取所有的数据
    // this.$http.get('http://localhost:3000/a')
    //   .then(res => {
    //     console.log(res.data) // A
    //     return this.$http.get('http://localhost:3000/b')
    //   })
    //   .then(res => {
    //     console.log(res.data) // B
    //   })

    // 2. 使用async await 调用A接口后调用B接口获取所有的数据
    // 使用 await 修饰的函数（返回值promise） 那么：返回值成功后的结果
    // await 同步执行这个函数，阻碍当前程序执行
    // await 的使用必须在 async 修饰的函数内部 （await的外层函数必须加上async ）
    const resA = await this.$http.get('http://localhost:3000/a')
    const resB = await this.$http.get('http://localhost:3000/b')
    console.log(resA.data, resB.data)
  }
}
</script>

<style scoped lang='less'></style>
