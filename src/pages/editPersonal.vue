<template>
  <div class="editPersonal">
    <myheader title="编辑个人信息">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="img">
      <img :src="userdata.head_img" class="avater" />
      <van-uploader :after-read="afterRead" />
    </div>
    <mycell title="昵称" :desc="userdata.nickname" @click="showNickname = !showNickname"></mycell>
    <van-dialog v-model="showNickname" title="昵称" show-cancel-button @confirm="updataNickname">
      <van-field :value="userdata.nickname" ref="nickname" label="昵称" placeholder="请输入昵称" required />
    </van-dialog>

    <mycell
      title="密码"
      type="password"
      :desc="userdata.password"
      @click="showPassword = !showPassword"
    ></mycell>
    <van-dialog
      v-model="showPassword"
      title="标题"
      show-cancel-button
      :before-close="beforeClose"
      @confirm="updataPassword"
    >
      <van-field type="password" ref="oldPassword" label="原密码" placeholder="请输入原密码" required />
      <van-field type="password" ref="newPassword" label="新密码" placeholder="请输入新密码" required />
    </van-dialog>

    <mycell title="性别" :desc="userdata.gender===1? '男' : '女'" @click="showGender = !showGender"></mycell>
    <van-dialog v-model="showGender" title="性别" show-cancel-button @confirm="updateGender">
      <van-picker :columns="columns" @change="onChange" :default-index="userdata.gender" />
    </van-dialog>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import mycell from '@/components/mycell.vue'
import { uploadFiles } from '@/api/uploadFiles.js'
import { updataUserData, getUserData } from '@/api/users.js'

export default {
  data () {
    return {
      userdata: {
        head_img: '',
        nickname: '',
        password: '',
        gender: ''
      },
      showNickname: false,
      showPassword: false,
      showGender: false,
      columns: ['女', '男'],
      pickGender: ''
    }
  },
  components: {
    myheader,
    mycell
  },
  // 页面加载时获取用户信息并且将数据填充
  mounted () {
    getUserData(localStorage.getItem('news_id_37'))
      .then(res => {
        console.log(res)
        // 填充数据
        if (res.status === 200) {
          let { nickname, password, gender } = res.data.data
          let headImg = res.data.data.head_img
          this.userdata.nickname = nickname
          this.userdata.password = password
          this.userdata.gender = gender
          this.userdata.head_img = headImg
          if (this.userdata.head_img) {
            this.userdata.head_img =
              localStorage.getItem('baseURL_37') + res.data.data.head_img
          } else {
            this.userdata.head_img = './IMG1568705287936.jpeg'
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 封装调用接口实现更新用户数据
    async updateUserInfo (data, callback) {
      let id = localStorage.getItem('news_id_37')
      let res = await updataUserData(id, data)
      if (res.status === 200) {
        callback && callback()
      }
    },
    // 上传文件时校验
    // 通过传入beforeRead函数可以在上传前进行校验，返回true表示校验通过，返回false表示校验失败。支持返回Promise进行异步校验
    // 返回布尔值
    beforeRead (file) {
      if (file.type.indexOf('image') !== 0) {
        this.$toast.fail('请上传正确格式的图片')
        return false
      }
      return true
    },
    // 上传文件并且修改数据库中的数据
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // 创建二进制文件对象
      let formdata = new FormData()
      // 添加二进制文件对象
      formdata.append('file', file.file)
      // console.log(file.file)
      // 调用接口将文件上传的服务器
      let uploadRes = await uploadFiles(formdata)
      console.log(uploadRes)
      if (uploadRes.status === 200) {
        // 用户提示信息
        this.$toast.success(uploadRes.data.message)
        // 修改页面上的图片路径
        // console.log(uploadRes.data.data.url)
        this.userdata.head_img =
          localStorage.getItem('baseURL_37') + uploadRes.data.data.url
        // 同时还要修改数据库中的图片路径
        // 调用接口更新数据库中的用户信息
        let updataRes = await updataUserData(
          localStorage.getItem('news_id_37'),
          { head_img: uploadRes.data.data.url }
        )
        console.log(updataRes)
      }
    },
    // 修改昵称
    // 用v-model实现数据的双向绑定虽然很方便，但是一旦修改了输入框中的昵称那么就算点击取消，页面上的昵称也会修改，因为数据是双向绑定的，所以我们通过ref和$refs来获取昵称的数据，页面数据的展示采用动态绑定
    async updataNickname () {
      console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value

      // 调用接口更新数据库中的昵称
      let id = localStorage.getItem('news_id_37')
      let res = await updataUserData(id, { nickname })
      console.log(res)
      if (res.status === 200) {
        this.$toast.success(res.data.message)
        this.userdata.nickname = nickname
      }
    },
    // 修改密码前的原密码验证  done() 关闭弹窗  done(false)  阻止弹窗关闭
    beforeClose (action, done) {
      // console.log(action)
      let oldPassword = this.$refs.oldPassword.$refs.input.value
      if (action === 'confirm' && oldPassword !== this.userdata.password) {
        this.$toast('原密码不正确')
        done(false)
      } else {
        done()
      }
    },
    // 修改密码
    async updataPassword () {
      let oldPassword = this.$refs.oldPassword.$refs.input.value
      if (oldPassword !== this.userdata.password) {
        this.$toast('原密码不正确')
        return
      }
      // console.log(this.$refs.newPassword.$refs.input.value)
      let password = this.$refs.newPassword.$refs.input.value
      // 调用更新用户数据接口修改数据库的密码
      let id = localStorage.getItem('news_id_37')
      let res = await updataUserData(id, { password })
      console.log(res)
      if (res.status === 200) {
        this.$toast.success(res.data.message)
        this.userdata.password = password
      }
    },

    // 选项改变时触发
    // 参数：Picker实例，选中值，选中值对应的索引
    onChange (picker, value, index) {
      this.pickGender = index
    },
    // 修改性别
    async updateGender () {
      // 调用接口修改性别
      let id = localStorage.getItem('news_id_37')
      let res = await updataUserData(id, { gender: this.pickGender })
      console.log(res)
      if (res.status === 200) {
        this.$toast.success(res.data.message)
        this.userdata.gender = res.data.data.gender
      }
    }
  }
}
</script>

<style lang="less" scoped>
.img {
  position: relative;
  .avater {
    display: block;
    width: 120/360 * 100vw;
    height: 120/360 * 100vw;
    margin: 50px auto;
    border-radius: 50%;
  }
  /deep/.van-uploader {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    opacity: 0;
    /deep/.van-uploader__upload {
      width: 120/360 * 100vw;
      height: 120/360 * 100vw;
    }
  }
}
</style>
