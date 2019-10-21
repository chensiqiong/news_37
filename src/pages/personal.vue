<template>
  <div class="personal">
    <router-link to="/editPersonal">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>
            {{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.currentDate | timeformat}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <div>
      <router-link to="/myFocus">
        <mycell title="我的关注" desc="关注的用户"></mycell>
      </router-link>
      <router-link to="/myComments">
        <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
      </router-link>
      <router-link to="/myCollection">
        <mycell title="我的收藏" desc="文章/视频"></mycell>
        <mycell title="设置"></mycell>
      </router-link>
    </div>
    <div class="logout">
      <van-button class="logoutBtn" type="danger" size="large" @click="logout">退出</van-button>
    </div>
  </div>
</template>

<script>
import { getUserData } from '@/api/users.js'
import mycell from '@/components/mycell.vue'
import { timeformat } from '@/utils/myfilters.js'

export default {
  data () {
    return {
      currentUser: {
        head_img: '',
        nickname: '',
        currentDate: Date.now()
      }
    }
  },
  components: {
    mycell
  },
  filters: {
    timeformat
  },
  mounted () {
    let id = localStorage.getItem('news_id_37')
    console.log(id)
    getUserData(id)
      .then(res => {
        console.log(res)
        this.currentUser.nickname = res.data.data.nickname
        this.currentUser.head_img = res.data.data.head_img
        if (this.currentUser.head_img) {
          this.currentUser.head_img =
            localStorage.getItem('baseURL_37') + res.data.data.head_img
        } else {
          this.currentUser.head_img = './IMG1568705287936.jpeg'
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    logout () {
      this.$dialog
        .confirm({
          title: '退出',
          message: '确定要退出吗？'
        })
        .then(() => {
          // on confirm
          localStorage.removeItem('news_37')
          localStorage.removeItem('news_id_37')
          this.$router.push('/')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.logout {
  width: 100%;
  text-align: center;
  padding: 40px 20px;
  box-sizing: border-box;
  .logoutBtn {
    width: 100%;
  }
}
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;
  background-color: #fff;
  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
