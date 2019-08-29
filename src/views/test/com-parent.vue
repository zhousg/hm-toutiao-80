<template>
  <div class='container'>
    Parent {{parentMsg}}
    <hr>
    <child @input="fn"></child>
  </div>
</template>

<script>
import Child from './com-child'
export default {
  components: { Child },
  data () {
    return {
      parentMsg: ''
    }
  },
  methods: {
    fn (data) {
      // 当子组件触发 input 事件的时候
      this.parentMsg = data
    }
  }
}
</script>

<style scoped lang='less'></style>
