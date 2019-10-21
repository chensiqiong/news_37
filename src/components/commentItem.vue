<template>
  <div class="commentItem">
    <div class="comment-floor">
      <!-- 通过名称也可以调用组件，调用的方式和组件的使用方式一样 -->
      <!-- 判断comment中是否还有parent，如果有，就创建组件生成页面结构并渲染数据 -->
      <mycomment v-if="comment.parent" :comment="comment.parent" @replyComments="replyComments"></mycomment>
      <div class="floor-header">
        <span>
          {{comment.user && comment.user.nickname}}
          <i>&nbsp;&nbsp;2小时前</i>
        </span>
        <em @click="replyComments(comment)">回复</em>
      </div>
      <p class="comment-content">{{comment.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mycomment',
  // comment是parent中的评论数据结构
  props: ['comment'],
  methods: {
    replyComments (comment) {
      // 发射事件，告诉父组件点击了回复，要写评论
      this.$emit('replyComments', comment)
    }
  }
}
</script>

<style lang="less" scoped>
.commentItem {
  .comment-floor {
    border: 1px #ccc solid;
    padding: 6px;
    background: #f6f6f6;
    font-size: 14px;
    .floor-header {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      font-size: 12px;
      color: #666;
      i {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>
