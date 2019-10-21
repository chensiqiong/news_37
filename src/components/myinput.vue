<template>
  <input
    class="myinput"
    :placeholder="placeholder"
    :value="value"
    @input="handlerInput"
    @blur="handlerBlur"
    :class="{success: status === 'success', error: status === 'error'}"
  />
</template>

<script>
export default {
  props: ['placeholder', 'value', 'rules', 'err_msg'],
  data () {
    return {
      status: ''
    }
  },
  methods: {
    // 每次输入框中的内容有变化时就会触发这个函数
    handlerInput (event) {
      // 收集输入框的值
      let { value } = event.target
      // console.log(value)
      // 发射事件，传递数据
      this.$emit('input', value)

      // 实现输入框边输入变判断是否合法
      if (this.rules) {
        if (this.rules.test(value)) {
          this.status = 'success'
        } else {
          this.status = 'error'
        }
      }
    },
    // 失去焦点时触发，验证手机号码
    handlerBlur (event) {
      // console.log(this.rules)
      let { value } = event.target
      if (this.rules) {
        if (!this.rules.test(value)) {
          // console.log('请输入正确的手机号码')
          this.$toast(this.err_msg || '请输入正确的手机号码')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myinput {
  width: 100%;
  height: 38 / 360 * 100vw;
  padding: 20px 0;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-bottom: 2px #666 solid;
  outline: none;
  font-size: 18px;
}

.success {
  border-bottom-color: rgb(92, 161, 92);
  background-color: rgba(146, 199, 146, 0.3);
}

.error {
  border-bottom-color: #d81e06;
  background-color: rgba(202, 108, 108, 0.3);
}
</style>
