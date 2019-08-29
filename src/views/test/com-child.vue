<template>
  <div class='container'>Child <button @click="sendMsg()">发送数据</button></div>
</template>

<script>
export default {
  data () {
    return {
      msg: '子组件的数据'
    }
  },
  methods: {
    sendMsg () {
      // 提交msg数据给父组件
      this.$emit('input', this.msg)
    }
  }
}
</script>

<style scoped lang='less'></style>
