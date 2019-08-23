<template>
  <el-container class="my-container">
    <el-aside width="200px">
      <!-- logo -->
      <div class="logo"></div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span class="icon el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img class="avatar" src="../../assets/images/avatar.jpg" alt />
            <span class="name">用户名称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- vue基础知识  插槽 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 渲染二级路由对应组件的位置 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style scoped lang='less'>
// 标签选择器  渲染后显示组件的html标签  不是当前的自定义标签
// 渲染后的标签上 有一个类 类的名称和自定义标签（组件）的名称一致
// FE  front end  前端简写
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/images/logo_admin.png) no-repeat
        center / 140px auto;
    }
    .el-menu{
      border-right: none;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .name {
        color: #333;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
}
</style>
