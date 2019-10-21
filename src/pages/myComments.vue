<template>
  <div class="myComments">
    <!-- 头部 -->
    <myheader title="我的跟帖">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <!-- 评论的列表 -->
    <div class="commentItem" v-for="value in commentList" :key="value.id">
      <div class="answer">
        <div class="time">1029-9-9 10:09</div>
        <div class="sour" v-if="value.parent">
          <p>回复：{{value.parent.user.nickname}}</p>
          <div>{{value.parent.content}}</div>
        </div>
        <div class="myanswer">{{value.content}}</div>
        <div class="content">{{value.post.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { getUserComments } from '@/api/users.js'
export default {
  data () {
    return {
      commentList: []
    }
  },
  components: {
    myheader
  },
  mounted () {
    getUserComments().then(res => {
      console.log(res)
      if (res.status === 200) {
        this.commentList = res.data.data
      }
    })
  }
}
</script>

<style lang="less" scoped>
.commentItem {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  > .source {
    > .time {
      color: #999;
      font-size: 13px;
    }
    padding: 15px 0;

    .title {
      font-size: 14px;
      padding: 20px 0;
    }
    .content {
      font-size: 12px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  > .answer {
    padding: 15px 0;
    > .time {
      color: #999;
      font-size: 13px;
      padding: 10px 0;
    }
    .sour {
      background-color: #eee;
      padding: 10px;
      color: #999;
      line-height: 25px;
      > p {
        font-size: 12px;
      }
      > div {
        font-size: 13px;
      }
    }
    .myanswer {
      font-weight: bold;
      padding: 16px 0;
    }
    .content {
      font-size: 14px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
