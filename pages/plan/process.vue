<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="报考流程"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 切换卡 start -->
		<view id="tabBar">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 滑块区域 start -->
		<swiper
			:style="{height: height}"
			:duration="500"
			:current="tabbar.current"
			@change="chooseSwiper"
		>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<rich-text :nodes="must"></rich-text>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<rich-text :nodes="process"></rich-text>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	<!-- 滑块区域 end -->
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import { plan_must, plan_process } from '@/common/api/api.js'
	export default {
		name: 'CourseProcess',
		components: {
			XesNavbar,
			XesTextTabbar
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '考生必看'
					}, {
						id: 1,
						name: '报考流程'
					}],
					current: 0
				},
				height: 0,
				must: '',
				process: ''
			}
		},
		onLoad(options) {
			const that = this
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 获取手机状态栏高度
			const statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			// tabBar的高度
			const query = uni.createSelectorQuery().in(this)
			query.select('#tabBar').boundingClientRect(res => {
				const tHeight = res.height
				that.height = wHeight - tHeight - statusBarHeight - 42 + 'px'
			}).exec()
			
			this.tabbar.current = +options.id
			
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				
				const must = await plan_must()
				this.must = must.data.data.content
				
				const process = await plan_process()
				this.process = process.data.data.content
				
				uni.hideLoading()
			},
			toId(i) {
				this.tabbar.current = i
			},
			chooseSwiper(e) {
				this.tabbar.current = e.target.current
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view {
		height: 100%;
		box-sizing: border-box;
		padding: 66upx 48upx;
	}
</style>
