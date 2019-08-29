<template>
  <!-- 依赖两项  下拉选择器的值  下拉选择器的选项 -->
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
// 默认功能：选择器结构  申明数据  获取数据
export default {
  name: 'my-channel',
  // 只读
  props: ['value'],
  data () {
    return {
      // value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 值改变事件
    changeChannel (channelId) {
      // 如果清空 值是“”  处理成null
      if (channelId === '') channelId = null
      // 将你选中的频道ID提交给父组件
      this.$emit('input', channelId)
    },
    async getChannelOptions () {
      // data.channels 数组 [{id,name}]
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
