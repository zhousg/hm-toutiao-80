<template>
  <div class='container'>
    <!-- 组件内部 -->
    <div>header</div>
    <div><slot name="content" :msg="message" list="数组">默认内容</slot></div>
    <div><slot name="footer">底部内容</slot></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '组件内部数据com-a'
    }
  }
}
</script>

<style scoped lang='less'></style>
