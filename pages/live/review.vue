<template>
	<view class="contaier">
		<!-- 导航栏 start -->
		<xes-navbar
			title="直播回顾"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 选项卡 start -->
		<view id="tabBar">
			<XesTextTabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<!-- 选项卡 end -->
		<!-- 数据列表 start -->
		<swiper
			class="swiper"
			:style="{height: height}"
			:duration="500"
			:current="tabbar.current"
			@change="chooseSwiper"
		>
			<swiper-item v-for="(n, index) in 4" :key="index">
				<scroll-view class="scroll-view" scroll-y="true" >
					<navigator 
						url="/pages/live/detail"
						class="item"
						v-for="item in listData"
						:key="item.id"
					>
						<view class="banner">
							<image class="image" :src="item.avatar" mode=""></image>
						</view>
						<view class="info">
							<view class="info-title">
								{{ item.title }}
							</view>
							<view class="space-between">
								<view class="left">
									<view class="user">
										<image class="avatar" :src="item.avatar" mode=""></image>
										<view class="name">{{ item.title }}</view>
										<view class="post">{{ item.post }}</view>
									</view>
									<view class="time-number">
										正在学习 {{ item.people }} 人 <text class="time">共{{ item.hour }}课时</text>
									</view>
								</view>
								<button class="button" hover-class="none" @click="start">开始学习</button>
							</view>
						</view>
					</navigator>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 数据列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import Json from '@/static/data.json'
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
				height: 0 ,// swiper的高度
				listData: [] // 模拟的数据
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
			
			this.listData = Json.review
			
			uni.login({
				provider: 'weixin',
				success(res) {
					console.log(res)
				}
			})
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
