<template>
  <div class="articleDetails">
    <div class="header">
      <div class="left">
        <span class="arrow iconfont iconjiantou2" @click="$router.back()"></span>
        <span class="logo iconfont iconnew new"></span>
      </div>
      <span
        :class="{focus: true, active: articleDetails.has_follow}"
        @click="focusUser"
      >{{articleDetails.has_follow ? '已关注' : '关注'}}</span>
    </div>
    <!-- 文章内容 -->
    <div class="articleContent">
      <div class="title">
        <h3>{{articleDetails.title}}</h3>
      </div>
      <div class="description">
        <span>{{articleDetails.user.nickname}}</span>&nbsp;&nbsp;&nbsp;
        <span>2019-10-10</span>
      </div>
      <div class="details" v-html="articleDetails.content" v-if="articleDetails.type === 1"></div>
      <div class="video" v-if="articleDetails.type === 2">
        <video
          src="https://video.pearvideo.com/mp4/adshort/20191018/cont-1613665-14498367_adpkg-ad_hd.mp4"
          controls
          :poster="articleDetails.cover[0].url"
        ></video>
      </div>

      <div class="option">
        <span :class="{active: articleDetails.has_like}">
          <van-icon class="icon" name="good-job-o" @click="likeArticles" />
          {{articleDetails.like_length}}
        </span>
        <span>
          <van-icon class="icon" name="chat-o" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="comments" v-if="articleDetails.comment_length > 0">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../../public/IMG1568705287936.jpeg" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
        <!-- 更多跟帖 -->
      </div>
      <div class="more" @click="$router.push('/goodComments/' + articleDetails.id)">更多跟帖</div>
    </div>
    <div style="height: 50px; width: 100%;"></div>
    <!-- 写跟帖 -->
    <mycomments :article="articleDetails"></mycomments>
    <!-- 撑起底部空白区域 -->
  </div>
</template>

<script>
import { getArticleById, likeArticles } from '@/api/articals.js'
import mycomments from '@/components/mycomments.vue'
import { getMyFocus, cancelMyFocus } from '@/api/users.js'
export default {
  data () {
    return {
      articleDetails: {
        user: {}
      }
    }
  },
  components: {
    mycomments
  },
  mounted () {
    let { id } = this.$route.params
    // 调用接口请求文章详情
    getArticleById(id).then(res => {
      console.log(res)
      if (res.status === 200) {
        this.articleDetails = res.data.data
        // console.log(this.articleDetails.has_follow)
      }
    })
  },
  methods: {
    // 关注用户和取消关注
    async focusUser () {
      // 点击之后切换页面关注按钮的样式
      this.articleDetails.has_follow = !this.articleDetails.has_follow
      console.log(this.articleDetails.has_follow)
      // 判断点击时是关注还是取消关注
      let userId = this.articleDetails.user.id
      if (this.articleDetails.has_follow) {
        let res = await getMyFocus(userId)
        console.log(res)
        if (res.status === 200) {
          this.$toast(res.data.message)
        }
      } else {
        let res = await cancelMyFocus(userId)
        console.log(res)
        if (res.status === 200) {
          this.$toast(res.data.message)
        }
      }
    },
    // 点赞和取消点赞
    async likeArticles () {
      this.articleDetails.has_like = !this.articleDetails.has_like
      let articleId = this.articleDetails.id
      let res = await likeArticles(articleId)
      console.log(res)
      //  判断此次操作是点赞还是取消点赞
      if (res.status === 200 && res.data.message === '点赞成功') {
        ++this.articleDetails.like_length
        this.$toast(res.data.message)
      } else {
        --this.articleDetails.like_length
        this.$toast(res.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.articleDetails {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 16px;
    border-bottom: 1px solid #eee;
    .left {
      .arrow {
        position: absolute;
        top: 15px;
        left: 20px;
      }
      .logo {
        padding-left: 26px;
        font-size: 60px;
      }
    }
    .focus {
      width: 58px;
      height: 20px;
      line-height: 20px;
      border: 1px solid rgb(215, 215, 215);
      border-radius: 50px;
      text-align: center;
      font-size: 12px;
      // background-color: rgb(242, 242, 242);
      padding: 4px;
      &.active {
        border: 1px solid #f00;
        background-color: #f00;
        color: #fff;
      }
    }
  }
  .articleContent {
    padding: 20px 10px;
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px 0;
    }
    .description {
      line-height: 30px;
      color: #999;
      font-size: 13px;
    }
    .details {
      text-indent: 2em;
      line-height: 30px;
      font-size: 15px;
      padding-bottom: 38px;
      /deep/img {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
    .video {
      padding: 10px 0 30px 0;
      video {
        width: 100%;
      }
    }
    .option {
      display: flex;
      justify-content: space-around;
      span {
        height: 25px;
        padding: 4px 15px;
        font-size: 14px;
        line-height: 25px;
        text-align: center;
        border: 1px solid #999;
        border-radius: 24px;
        &.active {
          border: 1px solid #f00;
          color: #f00;
        }
      }
      .icon {
        font-size: 24px;
        vertical-align: top;
        padding: 0 6px;
      }
    }
  }
  .comments {
    border-top: 5px solid #ddd;

    box-sizing: border-box;
    > h2 {
      font-size: 20px;
      padding: 20px 0;
      text-align: center;
    }
    .item {
      padding: 10px 15px;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 40/360 * 100vw;
          height: 40/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 14px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 140px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #999;
      border-radius: 18px;
      margin: 20px auto;
      font-size: 14px;
    }
  }
}
</style>
