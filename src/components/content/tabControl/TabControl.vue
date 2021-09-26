<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         :key="index"
         class="tab-control-item"
         :class="{active: currentIndex === index}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped lang="less">
  .tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
    .tab-control-item{
      flex: 1;
      span{
        padding: 5px;
      }
    }
    .active{
      color: @color-high-text;
      span{
        border-bottom: 3px solid @color-tint;
      }
    }
  }
</style>
