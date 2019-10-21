<template>
  <div class="goodComments">
    <myheader title="精彩跟帖">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="comments">
      <div class="item" v-for="item in commentsList" :key="item.id">
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replyComments(item)">回复</span>
        </div>
        <div>
          <!-- 这个组件是为了生成item中parent中的评论数据结构，但是这个parent不一定会有，所以要先进行判断，如果有parent中的评论数据，就生成这个结构，并且把parent中的数据传给子组件，让子组件渲染数据 -->
          <commentItem v-if="item.parent" :comment="item.parent" @replyComments="replyComments"></commentItem>
        </div>
        <div class="text">{{item.content}}</div>
      </div>
      <div style="height: 52px; width: 100%;"></div>
      <!-- 写跟帖 -->
      <mycomments :article="article" :reply="reply" @resetReply="resetReply" @refresh="refresh"></mycomments>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import commentItem from '@/components/commentItem.vue'
import mycomments from '@/components/mycomments.vue'
import { getCommentList, getArticleById } from '@/api/articals.js'
export default {
  data () {
    return {
      commentsList: [],
      article: {},
      reply: null
    }
  },
  components: {
    myheader,
    commentItem,
    mycomments
  },
  mounted () {
    this.init()
  },
  methods: {
    refresh () {
      this.init()
    },
    resetReply () {
      this.reply = null
    },
    replyComments (item) {
      console.log(123)
      this.reply = item
      // console.log(this.reply)
    },
    init () {
      // 获取文章id
      let id = this.$route.params.id
      getCommentList(id).then(res => {
        console.log(res)
        if (res.status === 200) {
          res.data.data.forEach((e, i) => {
            if (res.data.data[i].user.head_img) {
              e.user.head_img =
                localStorage.getItem('baseURL_37') + e.user.head_img
            } else {
              e.user.head_img = './IMG1568705287936.jpeg'
            }
          })
          this.commentsList = res.data.data
          // 根据id获取文章的详细信息
          getArticleById(id).then(res => {
            console.log(res)
            if (res.status === 200) {
              this.article = res.data.data
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.goodComments {
  .comments {
    border-top: 5px solid #ddd;
    box-sizing: border-box;
    .item {
      padding: 10px 15px;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
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
        padding: 16px 0 8px 0;
      }
    }
  }
}
</style>
