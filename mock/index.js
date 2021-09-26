const fs = require('fs');
const path = require('path');
const Mock = require('mockjs'); //mockjs 导入依赖模块
const JSON5 = require('json5');

Mock.Random.extend({
    discountdesc: function(date) {
        var discountdescs = ['活动价', '优惠价', '今日特价']
        return this.pick(discountdescs)
    },
    shopinfo: function(date) {
        var shopinfos = ['仲陌美', 'hw旗舰店']
        return this.pick(shopinfos)
    },
    goodsdesc: function(date) {
      var goodsdescs = ['新款上市~', '【2件69元】【新品特惠】【赠送运费险】【七天无理由退换货】【无忧售后】']
      return this.pick(goodsdescs)
    }
})

//读取指定json文件
function getJsonFile(filePath) {
  // 读取指定json文件
  var json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
  // 解析并返回
  return JSON5.parse(json)
}

// 返回一个函数
module.exports = function(app) {
  app.get('/home/data', function(rep, res) {
    setTimeout(() => {
      // 每次响应请求时读取mock data的json文件
      // getJsonFile方法定义了如何读取json文件并解析成数据对象
      var json = getJsonFile('./goodsItem.json5')
      // 将json传入 Mock.mock 方法中, 生成的数据返回给浏览器
      res.json(Mock.mock(json))
    }, 400)
  })

  app.get('/detail', function(rep, res) {
    setTimeout(() => {
      // 每次响应请求时读取mock data的json文件
      // getJsonFile方法定义了如何读取json文件并解析成数据对象
      var json = getJsonFile('./detailItem.json5')
      // 将json传入 Mock.mock 方法中, 生成的数据返回给浏览器
      res.json(Mock.mock(json))
    }, 400)
  })
  
  app.get('/recommend', function(rep, res) {
    setTimeout(() => {
      // 每次响应请求时读取mock data的json文件
      // getJsonFile方法定义了如何读取json文件并解析成数据对象
      var json = getJsonFile('./recommend.json5')
      // 将json传入 Mock.mock 方法中, 生成的数据返回给浏览器
      res.json(Mock.mock(json))
    }, 400)
  })
}
