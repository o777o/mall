<template>
  <div v-show="isShow" class="toast">{{message}}</div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        isShow: false,
        message: '',
        timer: null
      }
    },
    methods: {
      show(message, duration=2000) {
        clearTimeout(this.timer)

        this.isShow = true
        this.message = message

        this.timer = setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .75);
    color: #fff;
    z-index: 999;
  }
</style>
