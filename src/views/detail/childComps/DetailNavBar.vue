<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div class="title-item"
               v-for="(item, index) in titles"
               :key="index"
               :class="{active: currentIndex === index}"
               @click="titleClick(index)">{{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      }
    }
  }
</script>

<style scoped lang="less">
  .back img{
    margin-top: 12px;
  }
  .title {
    display: flex;
    font-size: 13px;
    .title-item {
      flex: 1;
    }
    .active {
      color: @color-high-text;
    }
  }
</style>
