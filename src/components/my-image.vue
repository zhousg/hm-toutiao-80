<template>
  <div class="img-container">
    <!-- 图片按钮 -->
    <div class="img_btn" @click="openDialog">
      <img :src="value||defaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- radio按钮 -->
          <el-radio-group @change="toggleCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->
          <div class="img_list">
            <div
              class="img_item"
              :class="{selected:item.url===selectedImageUrl}"
              @click="selectedImage(item.url)"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图组件 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  // 父组件传入的图片地址
  props: ['value'],
  data () {
    return {
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前激活的选项卡的name属性的值
      activeName: 'image',
      // 获取图片素材请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表数据
      images: [],
      // 图片总数
      total: 0,
      // 记录选中的图片的地址
      selectedImageUrl: null,
      // 上传图片需要的头
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 上传成功后的图片地址
      uploadImageUrl: null,
      // 图片按钮的src数据
      // confirmSrc: defaultImage
      // 默认图数据
      defaultImage
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      let src = null
      if (this.activeName === 'image') {
        // 使用 selectedImageUrl
        if (!this.selectedImageUrl) return this.$message.info('请选择素材图片')
        src = this.selectedImageUrl
      } else {
        // 使用 uploadImageUrl
        if (!this.uploadImageUrl) return this.$message.info('请上传素材图片')
        src = this.uploadImageUrl
      }
      // 给图片按钮的src属性赋值
      // this.confirmSrc = src
      // 确认的地址交给父组件
      this.$emit('input', src)
      this.dialogVisible = false
    },
    // 上传成功
    handleSuccess (res) {
      this.$message.success('上传图片成功')
      // 预览即可
      this.uploadImageUrl = res.data.url
    },
    // 选中图片
    selectedImage (url) {
      // 记录当前你点击的图片地址
      this.selectedImageUrl = url
    },
    // 切换全部与收藏
    toggleCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true
      // 重置数据
      this.activeName = 'image'
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      // 获取素材列表数据
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // 总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.img-container{
  display: inline-block;
  margin-right: 20px;
}
.img_btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  display: block;
  width: 100%;
}
.img_list {
  margin-top: 10px;
  .img_item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    &.selected {
      &::after {
        // .img_item.selected::after{} 添加选中效果
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center/ 50px;
      }
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      // 新的属性  设置图片的平铺方式
      object-fit: contain;
    }
  }
}
</style>
