<template>
  <div id="shop-cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{length}})</div>
      </template>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import {mapGetters} from 'vuex'

  import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  name: "ShopCart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style lang="less" scoped>
  #shop-cart {
    .nav-bar {
      background-color: @color-tint;
      color: #fff;
      font-weight: 700;
    }
    .content {
      position: absolute;
      overflow: hidden;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 93px;
    }
  }
</style>
