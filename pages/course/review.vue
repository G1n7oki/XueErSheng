<template>
	<view class="contaier">
		<XesNavbar
			title="直播回顾"
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
			class="swiper"
			:style="{height: height}"
			:duration="500"
			:current="tabbar.current"
			@change="chooseSwiper"
		>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button" @click="start">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button" @click="start">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button" @click="start">开始学习</button>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
					<view class="item">
						<view class="banner">
							<image class="image" src="/static/image/home/banner.png" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								汉语言文学-本科导学直播课
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" src="/static/image/discover/add@2x.png" mode=""></image>
										<view class="name">杨明波</view>
										<view class="post">江西省高级教师</view>
									</view>
									<view class="time-number">
										正在学习 50 人 <text class="time">共30课时</text>
									</view>
								</view>
								<button class="button">开始学习</button>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	export default {
		name: 'Review',
		components: {
			XesNavbar,
			XesTextTabbar
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '全部'
					}, {
						id: 1,
						name: '语文'
					}, {
						id: 2,
						name: '历史'
					}, {
						id: 3,
						name: '政治'
					}],
					current: 0
				},
				height: 0
			}
		},
		onLoad() {
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
		},
		methods: {
			toId(i) {
				this.tabbar.current = i
			},
			chooseSwiper(e) {
				this.tabbar.current = e.target.current
			},
			start() {
				uni.navigateTo({
					url: '/pages/course/review'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/review.scss'
</style>
