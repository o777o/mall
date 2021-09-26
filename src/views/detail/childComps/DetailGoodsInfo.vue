<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" 
           :src="item" 
           :key="index"
           @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped lang="less">
  .base() {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .base-sq() {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
    .info-desc {
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .start {
        .base();
        &::before {
          .base-sq();
        }
      }
      .end {
        .base();
        align-self: flex-end;
        &::after {
          .base-sq();
          right: 0;
        }
      }
      .desc {
        padding: 15px 0;
        font-size: 14px;
      }
    }
    .info-key {
      margin: 10px 0 10px 15px;
      color: #333;
      font-size: 15px;
    }
    .info-list img {
      width: 100%;
    }
  }
</style>
