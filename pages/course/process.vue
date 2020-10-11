<template>
	<view class="contaier">
		<XesNavbar 
			title="报考流程"
			:is-arrow="true"
			text-align="center"
		/>
		<view id="tabBar">
			<XesTextTabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<swiper
			:style="{height: height}"
			:duration="500"
			:current="tabbar.current"
			@change="chooseSwiper"
		>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<rich-text :nodes="node"></rich-text>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<rich-text :nodes="node"></rich-text>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import Json from '@/static/data.json'
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
				node: ''
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
			
			this.node = Json.discover.detail.strings
			
			this.tabbar.current = +options.id
		},
		methods: {
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
