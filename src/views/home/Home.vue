<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center><div>购物车</div></template>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isShowTabControl">
    </tab-control>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue"
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {backTopMixin} from 'common/mixin.js'

export default {
  name: "Home",
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isShowTabControl: false,
      saveY: 0
    }
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 决定TabControl是否吸顶
      this.isShowTabControl = (-position.y) > this.tabOffsetTop
    },
    // 监听上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
      // 刷新scroll高度
      this.$refs.scroll.refresh()
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)

        // 结束上拉加载行为
        this.$refs.scroll.finishPullUp()
      })
      this.goods[type].page += 1
    }
  }
};
</script>

<style scoped lang="less">
#home {
  height: 100vh;
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .home-nav {
    background-color: @color-tint;
    color: #fff;
    position: relative;
    z-index: 9;
  }
  .content {
    position: absolute;
    right: 0;
    left: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }
}
</style>
