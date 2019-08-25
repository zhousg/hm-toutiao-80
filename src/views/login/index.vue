<template>
  <div class='container' ref="box">
    <!-- 卡片 element-ui 组件 -->
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px;margin-right:10px"></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
           <el-button @click="login()" type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  // mounted () {
  //   // 渲染完毕
  //   // $refs  是当前组件上所有使用过ref属性的元素集合（对象）
  //   // ref="value" value就是你集合中的属性名称
  //   // const box = this.$refs.box  标签  dom
  //   // const loginForm = this.$refs.loginForm
  //   // console.log(box)   组件  vue实例
  //   // console.log(loginForm)
  // },
  data () {
    // 定义一个校验函数
    const checkMobile = (rule, value, callback) => {
      // 实现校验逻辑
      // 是否是合法手机号：第一位数字 只能1 第二位数字 3-9 其余9位数字结尾 即可
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号不合法'))
      }
      callback()
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      // 表单校验规则对象
      loginRules: {
        // 给字段加校验规则（多个）
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // change 值改变触发 校验规则
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '验证码长度6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 调用 validate 对整体表进行校验
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 校验成功  调用登录接口
          this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // 成功 跳转
              // 注意 登录 不够完善
              // res是响应对象--->res.data响应主体---->res.data.data响应主体包含（message,data）
              // 用户信息  res.data.data
              // 操作用户信息 就是操作 store 存储  写一个模块进行用户信息的操作。
              store.setUser(res.data.data)
              this.$router.push('/')
            })
            .catch(() => {
              // 失败 提示
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .my-card{
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}

</style>
