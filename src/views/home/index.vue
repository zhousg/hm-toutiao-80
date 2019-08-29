<template>
  <el-container class="my-container">
    <el-aside :width="isCollapse?'64px':'200px'">
      <!-- logo -->
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
      <!-- 导航菜单 -->
      <!-- 你处于什么页面，激活什么菜单，怎么判断，通过路径判断。  -->
      <!-- 根据路径 去激活当前的菜单  怎么获取当前路径 -->
      <!-- $route 调用数据 this.$route.query|params   $router 调用函数  this.$router.push() -->
      <!-- query 获取地址栏 ?key=value 的传参  this.$route.query.key-->
      <!-- params 获取地址栏 user/:id === user/100 的传参 this.$route.params.id-->
      <!-- $route.path 当前路径 -->
      <!-- :default-active="当前路径"  -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <!-- 属性的时候  如果是布尔类型的属性  有属性代码true  没有属性代表false -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleAside()" class="icon el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown" @command="clickItem">
          <span class="el-dropdown-link">
            <img class="avatar" :src="photo" alt />
            <span class="name"> {{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- vue基础知识  插槽 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
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
import store from '@/store'
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    clickItem (command) {
      // 判断值  setting 还是 logout
      // 如果 command === setting 调用  this.setting()
      // 如果 command === logout 调用  this.logout()
      // 意思：const o = {a:10,b:20}  等价  o.a === o['a']
      this[command]()
    },
    // 绑定的是 click 事件，原生DOM支持的事件。
    // el-dropdown-item 组件，是否支持click事件，看文档。
    // 怎么给组件绑定原生的事件？？？
    // 按键修饰符：@keyup.enter  按下enter键后触发的事件
    // 事件修饰符：@click.stop  阻止事件冒泡
    // 事件修饰符：@click.native 给组件绑定原生的事件
    // 个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      // 1. 删除本地的用户信息
      store.delUser()
      // 2. 跳转到登录
      this.$router.push('/login')
    },
    toggleAside () {
      // 切换两个状态  展开  收起
      // vue 操作样式  :style  :class
      this.isCollapse = !this.isCollapse
    }
  }
}
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
    // logo 后面 覆盖之前的样式
    .miniLogo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
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
        display: inline-block;
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
