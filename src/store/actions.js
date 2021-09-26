import {ADD_COUNTER, ADD_TO_CART} from './mutation-types.js'

export default {
  addCart(context, payload) {
    return new Promise(reslove => {
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.id === payload.id)

      // 2.判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        reslove('当前的商品数量+1')
      } else {
        context.commit(ADD_TO_CART, payload)
        reslove('添加了新的商品')
      }
    })
  }
}
