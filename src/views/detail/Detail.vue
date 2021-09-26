<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList'

  import {debounce} from 'common/utils.js'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'
  import {backTopMixin} from 'common/mixin.js'
  
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [backTopMixin],
    data() {
      return {
        id: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        refresh: null,
        getThemeTopY: null,
        currentY: 0
      }
    },
    created() {
      // 1.保存传入的id
      this.id = this.$route.params.id

      // 2.根据id请求详情数据
      getDetail(this.id).then(res => {
        // 1.获取顶部的图片轮播数据
        const data = res.result
        this.topImages = res.result.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    mounted() {
      // 1.给refresh赋值
      this.refresh = debounce(this.$refs.scroll.refresh, 50)

      // 2.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      }, 100)
    },
    methods: {
      imgLoad() {
        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
      },
      contentScroll(position) {
        // 滚动内容显示对应标题
        let positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++) {
          if(this.currentY !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentY = i
            this.$refs.nav.currentIndex = i
          }
        }

        // 判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.id = this.id

        // 2.将商品添加到购物车里
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    .detail-nav {
      position: relative;
      z-index: 9;
      background-color: #fff;
    }
    .content {
      position: absolute;
      top: 44px;
      bottom: 49px;
      overflow: hidden;
    }
  }
</style>
