<template>
  <div class="mycomments">
    <div class="addComments" v-show="!isShow">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <i class="iconfont iconpinglun-" @click="$router.push('/goodComments/' + article.id)">
        <span class="number">{{article.comment_length}}</span>
      </i>
      <i
        class="iconfont iconshoucang"
        :class="{active: article.has_star }"
        @click="handlerCollection"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="writeComments" v-show="isShow">
      <textarea placeholder="写跟帖" ref="commtext" rows="5" autofocus></textarea>
      <span class="send" @click="sendComment">发送</span>
      <span class="cancel" @click="cancel">取消</span>
    </div>
  </div>
</template>

<script>
import { collectionArticles, sendComment } from '@/api/articals.js'
export default {
  props: ['article', 'reply'],
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    console.log(this.reply)
  },
  watch: {
    reply () {
      // 可是实现每次点击回复都有不同的内容
      // 实现点击回复弹出文本域
      // console.log(this.reply)
      // console.log(this.isShow)
      if (this.reply) {
        this.isShow = true
      }

      // console.log(this.isShow)
    }
  },
  methods: {
    handlerFocus () {
      this.isShow = !this.isShow
    },
    // 收藏
    async handlerCollection () {
      this.article.has_star = !this.article.has_star
      let res = await collectionArticles(this.article.id)
      console.log(res)
      if (res.status === 200 && res.data.message === '收藏成功') {
        this.$toast(res.data.message)
      } else {
        this.$toast(res.data.message)
      }
    },
    // 发表针对文章的评论
    async sendComment () {
      let articleId = this.article.id
      let data = { content: this.$refs.commtext.value }
      // console.log(content)
      // 在这里需要判断是针对文章的评论，还是回复其他用户的评论
      // 判断的条件就是reply是否为空
      // 如果reply不为空，说明我点击的是回复，就需要再传递一个parent_id
      // 如果reply为空，说明是针对文章发表的一级评论，不需要传递parent_id
      // 这里所需要的parent_id就是你点击的那条评论的id
      if (this.reply) {
        data.parent_id = this.reply.id
      }
      let res = await sendComment(articleId, data)
      console.log(res)
      if (res.status === 200 && res.data.message === '评论发布成功') {
        this.$toast.success(res.data.message)
        this.$refs.commtext.value = ''
        this.isShow = false
        // this.$router.push('/goodComments/' + articleId)
        // 刷新页面
        // 发射事件，告诉父组件要刷新页面
        this.$emit('refresh')
      }
    },
    cancel () {
      this.isShow = !this.isShow
      // console.log(this.isShow)

      this.$refs.commtext.value = ''
      // 当点击取消时要重置reply的值，否则第二点回复，reply没有变化不能触发侦听器，但是如果在子组件中直接修改，浏览器会报错，错误是不能再子组件中直接修改父组件传的值，所以我们应该告诉父组件，需要重置这个值
      // this.reply = {}
      // 发射事件
      this.$emit('resetReply')
    }
  }
}
</script>

<style lang="less" scoped>
.mycomments {
  .addComments {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50/360 * 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    > input {
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      border: none;
      background-color: #eee;
      padding-left: 20px;
      font-size: 14px;
    }
    > i {
      font-size: 26px;
      position: relative;
      &.active {
        color: #f00;
      }
      .number {
        position: absolute;
        left: 14px;
        top: -10px;
        font-size: 12px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        padding: 2px 4px;
        background-color: #f00;
        color: #fff;
        border-radius: 10px;
      }
    }
  }
  .writeComments {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    textarea {
      flex: 3;
      background-color: #eee;
      border: none;
      border-radius: 14px;
      padding: 10px;
      resize: none;
    }
    .send {
      display: block;
      flex: 1;
      height: 28px;
      line-height: 28px;
      background-color: #f00;
      color: #fff;
      text-align: center;
      border-radius: 14px;
      font-size: 12px;
      margin-left: 10px;
    }
    .cancel {
      display: block;
      flex: 1;
      height: 28px;
      line-height: 28px;
      background-color: #f00;
      color: #fff;
      text-align: center;
      border-radius: 14px;
      font-size: 12px;
      margin-left: 10px;
    }
  }
}
</style>
