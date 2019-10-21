<template>
  <div class="myCollection">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <!-- 收藏列表 -->
    <articleSection v-for="item in collectionList" :key="item.id" :articl="item"></articleSection>
  </div>
</template>

<script>
import myheader from '@/components/myheader'
import articleSection from '@/components/articleSection.vue'
import { collectionArticleList } from '@/api/users.js'
export default {
  data () {
    return {
      collectionList: []
    }
  },
  components: {
    myheader,
    articleSection
  },
  mounted () {
    collectionArticleList().then(res => {
      console.log(res)
      if (res.status === 200) {
        this.collectionList = res.data.data
      }
    })
  }
}
</script>

<style>
</style>
