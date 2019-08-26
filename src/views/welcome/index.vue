<template>
  <div class='container' style="text-align:center">
    <img src="../../assets/images/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {
  created () {
    // 测试 调用接口 是否好使
    // this.$http.get('articles').then(res => console.log(res.data)).catch((err) => console.log(err))
  }
}
</script>

<style scoped lang='less'></style>
