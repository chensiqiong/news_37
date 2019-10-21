<template>
  <div class="myheader">
    <span>
      <slot name="left"></slot>
    </span>
    <span>{{title}}</span>
    <span>
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
.myheader {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  background-color: rgb(226, 223, 223);
}
</style>
