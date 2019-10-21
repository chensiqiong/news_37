<template>
  <div class="mycell" @click="handlerClick">
    <div class="title">
      <span>{{title}}</span>
    </div>
    <div class="description">
      <span>{{desc}}</span>
      <i class="iconfont iconjiantou1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc'],
  methods: {
    handlerClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.mycell {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  padding: 6px 10px;
  border-bottom: 1px solid #ddd;
  .description {
    color: #ccc;
    > span {
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
</style>
