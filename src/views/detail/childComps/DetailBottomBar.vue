<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped lang="less">
  .bottom-bar {
    height: 49px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    text-align: center;
    .bar-item {
      flex: 1;
      display: flex;
      &>div {
        flex: 1;
      }
    }
    .bar-left {
      .icon {
        width: 22px;
        height: 22px;
        display: block;
        background: url("~assets/img/detail/detail_bottom.png");
        background-size: 100%;
        margin: 6px auto 3px;
      }
      .service {
        background-position: 0 -53px;
      }
      .shop {
        background-position: 0 -99px;
      }
      span {
        font-size: 13px;
      }
    }
    .bar-right {
      font-size: 15px;
      line-height: 49px;
      color: #fff;
      .cart {
        background-color: #ffe817;
        color: #333;
      }
      .buy {
        background-color: #f69;
      }
    }
  }
</style>
