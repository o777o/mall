const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        common: "@/common",
        network: "@/network",
        views: "@/views"
      }
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.resolve(__dirname, "src\\assets\\css\\base.less")
      ]
    }
  },
  devServer: {
    before: require('./mock/index.js')
  },
	publicPath: './',
};
