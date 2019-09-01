<template>
  <div class='container'>
    <!-- 组件内部 -->
    <div>header</div>
    <div><slot name="content" :msg="message" list="数组">默认内容</slot></div>
    <div><slot name="footer">底部内容</slot></div>
    <b>{{message}}</b>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      message: '组件内部数据com-a'
    }
  },
  created () {
    eventBus.$on('b2a', (data) => {
      this.message = data
    })
  }
}
</script>

<style scoped lang='less'></style>
