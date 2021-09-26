<template>
  <div class="bottom-bar">
    <div class="check-button">
      <check-button :is-check="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">合计:{{totalPrice}}</div>
    <div class="buy" @click="buttonClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price.substr(1) * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        return this.cartList.every(item => item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      buttonClick() {
        if (this.cartList.length === 0) {
          this.$toast.show('请选择购买的商品')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .bottom-bar {
    height: 44px;
    background-color: #eee;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 49px;
    display: flex;
    line-height: 44px;
    font-size: 14px;
    .check-button {
      &>div {
        flex: 0;
      }
      width: 70px;
      display: flex;
      align-items: center;
      margin-left: 10px;
      span {
        margin-left: 5px;
      }
    }
    .total-price {
      margin-left: 20px;
      flex: 1;
    }
    .buy {
      width: 90px;
      background-color: red;
      color: #fff;
      text-align: center;
    }
  }
</style>
