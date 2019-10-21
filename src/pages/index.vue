<template>
  <div class="index">
    <div class="header">
      <div class="logo iconfont iconnew"></div>
      <div class="search">
        <span>
          <van-icon name="search" />&nbsp;&nbsp;搜索新闻
        </span>
      </div>
      <van-icon class="user" name="contact" @click="$router.push('/personal')" />
    </div>
    <!-- 标签页 -->
    <van-tabs v-model="active" sticky swipeable @click="onClick">
      <van-tab v-for="cateItem in categoryList" :title="cateItem.name" :key="cateItem.id">
        <van-list
          :immediate-check="false"
          v-model="cateItem.loading"
          :finished="cateItem.finished"
          finished-text="没有更多了"
          :offset="10"
          @load="onLoad"
        >
          <van-pull-refresh v-model="cateItem.isLoading" @refresh="onRefresh">
            <articleSection
              v-for="(articl,index) in cateItem.articlList"
              :key="index"
              :articl="articl"
            ></articleSection>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/categories.js'
import articleSection from '@/components/articleSection.vue'
import { getArticalList } from '@/api/articals.js'
export default {
  data () {
    return {
      active: localStorage.getItem('news_37') ? 1 : 0,
      categoryList: []
    }
  },
  components: {
    articleSection
  },
  methods: {
    onClick () {
      console.log(this.active)
    },
    init () {
      getArticalList({
        category: this.categoryList[this.active].id,
        pageIndex: this.categoryList[this.active].pageIndex,
        pageSize: this.categoryList[this.active].pageSize
      }).then(res => {
        console.log(res)
        this.categoryList[this.active].articlList.push(...res.data.data)
        // 加载完毕后，将正在加载的标识重置为false，不然会一直显示“正在加载...”
        this.categoryList[this.active].loading = false
        // 本次刷新完成之后重置正在刷新的标识
        this.categoryList[this.active].isLoading = false
        // 当本次加载的文章数据不够一页时，说明已经没有数据了，不必再加载
        if (res.data.data.length < this.categoryList[this.active].pageSize) {
          this.categoryList[this.active].finished = true
        }
      })
      console.log(this.categoryList)
    },
    onLoad () {
      // 加载时页码+1
      this.categoryList[this.active].pageIndex++
      // 调用接口发送请求获取文章数据
      setTimeout(() => {
        this.init()
      }, 1000)
    },
    // 下拉刷新
    onRefresh () {
      // console.log('刷新')
      // 调用接口向服务器请求最新的文章数据
      // 重置页码
      this.categoryList[this.active].pageIndex = 1
      // 清空文章列表数组
      this.categoryList[this.active].articlList.length = 0
      setTimeout(() => {
        // 发送请求
        this.init()
      }, 1000)
    }
  },
  watch: {
    active (newValue, oldValue) {
      if (this.categoryList[newValue].articlList.length === 0) {
        this.init()
      }
    }
  },

  mounted () {
    getCategoryList().then(res => {
      console.log(res)
      if (res.status === 200) {
        this.categoryList = res.data.data
        // 基于后期的业务考虑，现在获取到的数据还远远不够，所以需要手动添加数据
        // 每个栏目的文章列表、下拉刷新、正在刷新、刷新完成、页码、显示新闻数目都应该是独立的，每个栏目都互不影响，所以我们需要给每个栏目的数组中都加上这些我们需要用到的数据
        this.categoryList = res.data.data.map(value => {
          return {
            ...value,
            articlList: [], // 当前栏目的文章列表
            pageIndex: 1, // 当前栏目的页码
            pageSize: 5, // 当前栏目每页显示几条新闻
            isLoading: false, // 下拉刷新的标识
            loading: false, // 正在刷新
            finished: false // 完成刷新
          }
        })
        this.init()
      }
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  width: 100%;
  height: 49/360 * 100vw;
  padding: 8px 10px;
  box-sizing: border-box;
  background-color: #f00;
  align-items: center;
  color: #fff;
  .logo {
    font-size: 54px;
    padding-right: 30px;
  }
  .search {
    flex: 1;
    background-color: rgba(255, 255, 255, 0.5);
    height: 100%;
    text-align: center;
    line-height: 33px;
    font-size: 16px;
    border-radius: 26px;
  }
  .user {
    font-size: 26px;
    padding-left: 30px;
  }
}
</style>
