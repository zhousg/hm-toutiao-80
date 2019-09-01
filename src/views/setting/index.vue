<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格系统 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save()">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="upload"
          >
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 选择图片之后
    async upload (result) {
      // 1. 获取文件对象
      const file = result.file
      // 2. 使用 formData 追加文件数据
      const formData = new FormData()
      formData.append('photo', file)
      // 3. 使用axios发请求
      const { data: { data } } = await this.$http.patch('user/photo', formData)
      // 成功：提示 + 预览 + 更新本地存储头像 + 更新HOME组件头像
      this.$message.success('修改头像成功')
      this.userInfo.photo = data.photo
      const localUser = store.getUser()
      localUser.photo = data.photo
      store.setUser(localUser)
      eventBus.$emit('updatePhoto', data.photo)
    },
    async save () {
      const { name, intro, email } = this.userInfo
      await this.$http.patch('user/profile', { name, intro, email })
      // 成功
      // 提示
      this.$message.success('保存设置成功')
      // 更新 本地存储  用户名称
      const localUser = store.getUser()
      localUser.name = name
      store.setUser(localUser)
      // 更新 HOME组件  用户名称
      eventBus.$emit('updateName', name)
    },
    async getUserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    }
  }
}
</script>

<style scoped lang='less'></style>
