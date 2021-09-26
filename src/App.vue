<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
   </keep-alive>
    <mainTabBar></mainTabBar>
  </div>
</template>

<script>
	import mainTabBar from './components/content/mainTabBar/mainTarBar.vue'
	export default {
		name: 'App',
		components: {
			mainTabBar
		}
	}
</script>

<style lang="less">
	// @import 'assets/css/base.less';
</style>
