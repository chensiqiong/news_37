<template>
  <div class="search">
    <div class="header">
      <span class="arrow iconfont iconjiantou2" @click="$router.back()"></span>
      <form>
        <input type="text" placeholder="通灵兽消失术" v-model="keyword" />
        <van-icon name="search" class="icon-search" />
      </form>
      <span class="search-btn" @click="searchArticle">搜索</span>
    </div>
    <div class="content" v-if="!keyword">
      <div class="histroies">
        <h3>历史记录</h3>
        <div class="historiesList">
          <span v-for="item in historiesList" :key="item.id">{{item}}</span>
        </div>
      </div>
      <div class="hots">
        <h3>热门搜索</h3>
        <div class="hotsList">
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
          <span>花露水的妙用</span>
        </div>
      </div>
    </div>
    <div class="searchList" v-if="keyword">
      <div
        class="searchItem"
        v-for="item in searchList"
        :key="item.id"
        @click="$router.push('/articleDetails/' + item.id)"
      >
        <span class="title">{{item.title}}</span>
        <span class="arrow iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { searchArticle } from '@/api/articals.js'
export default {
  data () {
    return {
      keyword: '',
      searchList: [],
      historiesList: []
    }
  },
  watch: {
    async keyword () {
      let res = await searchArticle(this.keyword)
      console.log(res)
      if (res.status === 200) {
        this.searchList = res.data.data
      }
    }
  },
  mounted () {
    let jsonStr = localStorage.getItem('search_hostories_37')
    this.historiesList = JSON.parse(jsonStr)
    console.log(this.historiesList)
  },
  methods: {
    async searchArticle () {
      let res = await searchArticle(this.keyword)
      if (res.status === 200) {
        this.searchList = res.data.data
        let jsonStr = localStorage.getItem('search_hostories_37')
        let arr = JSON.parse(jsonStr)
        arr = arr || []
        if (arr.lenght > 10) {
          arr.splice(0, 1)
        }
        let index = arr.indexOf(this.keyword)
        if (index !== -1) {
          arr.splice(index, 1)
        }
        arr.push(this.keyword)
        localStorage.setItem('search_hostories_37', JSON.stringify(arr))
        this.$router.push('/articleDetails/' + res.data.data[0].id)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .header {
    display: flex;
    height: 42px;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    // border-bottom: 1px solid #d7d7d7;
    // box-sizing: border-box;
    > form {
      position: relative;
      font-size: 12px;
      padding: 0 18px;
      flex: 1;
      height: 100%;
      input {
        padding-left: 34px;
        border: 1px solid #d7d7d7;
        width: 100%;
        height: 100%;
        border-radius: 40px;
        box-sizing: border-box;
      }
      .icon-search {
        font-size: 16px;
        position: absolute;
        left: 32px;
        top: 14px;
      }
    }
  }
  .content {
    .histroies,
    .hots {
      color: #666;
      padding: 10px 10px;
      border-bottom: 1px solid #d7d7d7;
      font-size: 12px;
      line-height: 30px;
      h3 {
        font-size: 16px;
        font-weight: 700;
      }
      .hotsList,
      .historiesList {
        display: flex;
        flex-wrap: wrap;
        span {
          width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .historiesList {
        span {
          width: 25%;
        }
      }
    }
  }
  .searchList {
    font-size: 14px;
    .searchItem {
      color: #666;
      line-height: 30px;
      padding: 10px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d7d7d7;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
