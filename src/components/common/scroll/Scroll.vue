<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import ObserveDOM from '@better-scroll/observe-dom'
  import Pullup from '@better-scroll/pull-up'

  BScroll.use(ObserveDOM)
  BScroll.use(Pullup)

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
      // 监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      // 封装finishPullUp()方法
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll.y
      }
    }
  }
</script>

<style>

</style>
