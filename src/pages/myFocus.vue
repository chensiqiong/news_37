<template>
  <div class="myfocus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="focusList">
      <div class="row" v-for="(value, index) in focusList" :key="index">
        <img :src="value.head_img" alt />
        <div class="center">
          <p>{{value.nickname}}</p>
          <span>2019</span>
        </div>
        <span @click="cancelMyFocus(value.id,index)">取消关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { getMyFocus, cancelMyFocus } from '@/api/users.js'
export default {
  data () {
    return {
      focusList: []
    }
  },
  components: {
    myheader
  },
  mounted () {
    // let id = localStorage.getItem('news_id_37')
    getMyFocus()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          this.focusList = res.data.data
          res.data.data.forEach(e => {
            e.head_img = localStorage.getItem('baseURL_37') + e.head_img
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    async cancelMyFocus (id, index) {
      let res = await cancelMyFocus(id)
      console.log(res)
      if (res.status === 200) {
        this.$toast.success(res.data.message)
        this.focusList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.row {
  display: flex;
  padding: 10px;
  align-items: center;
  > img {
    display: block;
    width: 50/360 * 100vw;
    height: 50/360 * 100vw;
    border-radius: 50%;
  }
  .center {
    padding: 0 10px;
    flex: 1;
    > p {
      line-height: 24px;
      font-size: 14px;
    }
    > span {
      font-size: 12px;
      color: #999;
    }
  }
  > span {
    height: 30px;
    background-color: #eee;
    font-size: 13px;
    border-radius: 30px;
    line-height: 30px;
    padding: 0px 15px;
  }
}
</style>
