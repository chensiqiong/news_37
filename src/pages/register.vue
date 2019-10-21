<template>
  <div class="register">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputs">
      <myinput
        placeholder="请输入手机号"
        :rules="/^1\d{10}$/"
        err_msg="请输入正确的手机号码"
        v-model="userdata.username"
      />
      <myinput placeholder="昵称" v-model="userdata.nickname"></myinput>
      <br />
      <myinput type="password" placeholder="密码" v-model="userdata.password"></myinput>
    </div>
    <p class="tips">
      <a href="#/login" class>去登录</a>
    </p>
    <mybutton class="button" text="注册" @click="register"></mybutton>
  </div>
</template>

<script>
import myinput from '@/components/myinput.vue'
import mybutton from '@/components/mybutton.vue'
import { register } from '@/api/users.js'
export default {
  data () {
    return {
      userdata: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  components: {
    myinput,
    mybutton
  },
  methods: {
    async register () {
      const res = await register(this.userdata)
      if (res.status === 200) {
        this.$toast.success(res.data.message)
      } else {
        this.$toast.fail('注册失败')
      }
      // register(this.userdata)
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>

<style lang="less" scoper>
.register {
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
