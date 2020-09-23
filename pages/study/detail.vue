<template>
	<view class="container">
		<NavBar 
			:is-arrow="true"
			:is-empty="false"
			is-arrow-type="image"
			background-color="transparent"
		/>
		<video class="video" src="http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8" controls></video>
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	export default {
		name: 'study-detail',
		components: {
			NavBar
		},
		data() {
			return {}
		},
		onLoad() {
			// uni.login({
			// 	provider: 'weixin',
			// 	success: function(res) {
			// 		console.log(res)
			// 	}
			// })
		},
		methods: {}
	}
</script>

<style lang="scss">
	@import '../../static/scss/study-detail.scss'
</style>
