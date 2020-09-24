<template>
	<view class="container">
		<!-- 导航栏 start -->
		<NavBar 
			:is-arrow="true"
			:is-empty="false"
			is-arrow-type="image"
			background-color="transparent"
		/>
		<!-- 导航栏 end -->
		<!-- video start -->
		<video class="video" src="http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8" controls></video>
		<!-- video end -->
		<!-- 优惠券 start -->
		<view class="discount">
			
		</view>
		<!-- 优惠券 end -->
		<!-- tabBar start -->
		<view class="tab-bar">
			<view 
				class="item"
				:class="{'active': tabBarIndex === index}"
				v-for="(item, index) in tabBarList"
				:key="item.id"
			>
				{{ item.name }}
			</view>
			<view class="line" :style="{left: (33.333 / 2) * (tabBarIndex + 1) + '%'}"></view>
		</view>
		<!-- tabBar end -->
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
			return {
				tabBarList: [{
					id: 0,
					name: '详情'
				}, {
					id: 1,
					name: '目录'
				}, {
					id: 2,
					name: '评价'
				}],
				tabBarIndex: 0
			}
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
