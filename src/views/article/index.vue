<template>
  <div class="container">
    <!-- 筛选项 -->
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <!-- 使用封装的组件 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 依赖两项  下拉选择器的值  下拉选择器的选项 -->
          <el-select v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交给后台的参数对象
      // 通过axios提交给后台，字段的值为null，这项数据不会提交。
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道的下拉选项数据
      channelOptions: [{ id: 100, name: 'php' }],
      // 日期数据  格式数组 [起始日期，结束日期]
      dateArr: []
    }
  }
}
</script>

<style scoped lang='less'></style>
