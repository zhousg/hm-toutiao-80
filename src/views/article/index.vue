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
           <!-- 使用组件 v-model === :value @input -->
           <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <!-- 表格 -->
      <el-table :data="articles">
        <!-- 封面 cover.images[0] 默认取第一张 -->
        <!-- 假设字段可以取出数据  值是图片地址 -->
        <!-- prop 作用把字段背后的值 渲染在列位置 -->
        <!-- 需要是图片需要往组件传入额外的内容才显示图片 -->
        <!-- 使用插槽  渲染图片需要数据  使用作用域插槽 -->
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              style="width:160px;height:100px;border:1px solid #ddd"
              fit="contain"
            >
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="160" height="100" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="$router.push('/publish?id='+scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button
              type="danger"
              @click="delArticle(scope.row.id)"
              icon="el-icon-delete"
              plain
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pager"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
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
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 日期数据  格式数组 [起始日期，结束日期]
      dateArr: [],
      // 表格数据
      articles: [],
      // 文章总数
      total: 0
    }
  },
  created () {
    // 获取文章列表数据
    this.getArticles()
  },
  methods: {
    // 删除函数
    delArticle (id) {
      // 确认框
      this.$confirm('老铁，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        // 地址  articles/id  请求 delete
        // get 获取数据 post 添加数据 delete 删除属性 put 完整修改数据 patch 局部修改数据
        await this.$http.delete(`articles/${id}`)
        // 代码走这 成功
        this.$message.success('删除成功')
        this.getArticles()
      }).catch(() => {
        // 点击取消
      })
    },
    // 搜索 筛选
    search () {
      // 根据新的筛选条件（动态绑定）  获取数据
      // 页码重置到 1
      this.reqParams.page = 1
      // 严谨处理 channel_id === "" 改成 null
      // if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.getArticles()
    },
    // 选择日期范围后触发的函数
    changeDate (valueArr) {
      // valueArr 选中的日期范围值  [起始日期，结束日期]
      // 清空功能 valueArr === null
      if (valueArr) {
        this.reqParams.begin_pubdate = valueArr[0]
        this.reqParams.end_pubdate = valueArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 改变分页后触发的函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      // data.results 才是文章列表
      // post 请求  post(url,数据)
      // get 请求 get(url,{params:数据})
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 文章总数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
.pager {
  text-align: center;
  margin-top: 20px;
}
</style>
