<template>
  <div class="container">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputs">
      <myinput
        placeholder="请输入手机号"
        v-model="userdata.username"
        :rules="/^1\d{10}$/"
        err_msg="请输入正确的手机号码"
      />
      <br />
      <myinput placeholder="密码" type="password" v-model="userdata.password" />
    </div>
    <p class="tips">
      没有账号？
      <a href="#/register" class>去注册</a>
    </p>
    <mybutton class="button" text="登录" @click="login"></mybutton>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { login } from '@/api/users.js'
export default {
  data () {
    return {
      userdata: {
        username: '123456',
        password: '123456'
      }
    }
  },
  components: {
    mybutton,
    myinput
  },
  methods: {
    // 处理登录业务
    login () {
      // console.log('这是父组件')
      console.log(this.userdata)
      login(this.userdata)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // 登录成功时将token和id存进本地存储中
            let { token } = res.data.data
            let { id } = res.data.data.user
            // 在本地存储中存储token和id
            localStorage.setItem('news_37', token)
            localStorage.setItem('news_id_37', id)
            // 信息提示
            this.$toast.success(res.data.message)
            // 切换到个人中心组件
            this.$router.push({ name: 'Personal' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
  }
}
</style>
