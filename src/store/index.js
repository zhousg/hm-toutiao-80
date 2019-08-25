// 负责：用户信息的  存储 获取 删除 三个函数
const KEY = 'hm-toutiao-80-user'
export default {
  setUser (user) {
    // 存储用户信息
    // user 数据类型  对象
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    // 获取用户信息
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    // 可能没有数据  返回的null  通过null.token报错 但是{}.token 值 undefined
    return JSON.parse(jsonStr)
  },
  delUser () {
    // 删除用户信息
    window.sessionStorage.removeItem(KEY)
  }
}
