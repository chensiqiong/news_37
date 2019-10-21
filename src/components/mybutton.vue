<template>
  <div class="mybutton" @click="handlerclick">{{text}}</div>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    handlerclick (event) {
      // console.log('这是子组件')
      // 发射事件，将输入框中的值传给父组件
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less" scoped>
.mybutton {
  width: 100%;
  height: 40 / 360 * 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d81e06;
  color: #fff;
  border-radius: 50px;
  font-style: 20px;
}
</style>
