<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button @click.native="checkClick" :is-check="product.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

  export default {
    name: 'CartListItem',
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      }
    }
  }
</script>

<style scoped lang="less">
  .item-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .shop-item {
    display: flex;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    position: relative;
    .item-selector {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-img {
      padding: 5px;
      img {
        width: 80px;
        height: 100px;
        border-radius: 5px;
      }
    }
    .item-info {
      padding: 5px 10px;
      font-size: 17px;
      color: #333;
      position: relative;
      overflow: hidden;
      .item-desc {
        &:extend(.item-title);
        font-size: 14px;
        color: #666;
        margin-top: 15px;
      }
      .item-bottom {
        // margin-top: 10px;
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        .item-price {
          color: orangered;
        }
      }
    }
  }
</style>
