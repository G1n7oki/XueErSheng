<template>
	<view class="contaier">
		<xes-navbar
			title="我的订单"
			textAlign="center"
			:is-arrow="true"
		/>
		<view id="tabBar">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.index"
				@postId="toId"
			/>
		</view>
		<!-- 列表 start -->
		<swiper 
			class="swiper"
			:duration="500"
			:style="{height: height}"
			:current="tabbar.index"
			@change="chooseSwiper"
		>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true">
					<view class="swiper-item" @click="handleItem">
						<view class="image-info">
							<image class="image" src="/static/image/discover/add@2x.png" mode=""></image>
							<view class="info">
								<view class="info-title">
									特许金融分析师(CFA三级)
								</view>
								<view class="info-date">
									课程有效期还剩：360天
								</view>
								<view class="info-price">
									542 <text>元</text>
								</view>
							</view>
						</view>
						<view class="bot">
							<view class="status active">
								待付款
								<view class="date">
									剩余 <text>1</text> 天 <text>23</text> 小时
								</view>
							</view>
							<button type="default" hover-class="none">去支付</button>
						</view>
					</view>
					<view class="swiper-item">
						<view class="image-info">
							<image class="image" src="/static/image/discover/add@2x.png" mode=""></image>
							<view class="info">
								<view class="info-title">
									特许金融分析师(CFA三级)
								</view>
								<view class="info-date">
									课程有效期还剩：360天
								</view>
								<view class="info-price">
									542 <text>元</text>
								</view>
							</view>
						</view>
						<view class="bot">
							<view class="status">
								待付款
							</view>
							<button class="active" type="default" hover-class="none">去学习</button>
						</view>
					</view>
					<view class="swiper-item">
						<view class="image-info">
							<image class="image" src="/static/image/discover/add@2x.png" mode=""></image>
							<view class="info">
								<view class="info-title">
									特许金融分析师(CFA三级)
								</view>
								<view class="info-date">
									课程有效期还剩：360天
								</view>
								<view class="info-price">
									542 <text>元</text>
								</view>
							</view>
						</view>
						<view class="bot">
							<view class="status">
								待付款
							</view>
							<button class="active" type="default" hover-class="none">去学习</button>
						</view>
					</view>
					<view class="swiper-item">
						<view class="image-info">
							<image class="image" src="/static/image/discover/add@2x.png" mode=""></image>
							<view class="info">
								<view class="info-title">
									特许金融分析师(CFA三级)
								</view>
								<view class="info-date">
									课程有效期还剩：360天
								</view>
								<view class="info-price">
									542 <text>元</text>
								</view>
							</view>
						</view>
						<view class="bot">
							<view class="status">
								待付款
							</view>
							<button class="active" type="default" hover-class="none">去学习</button>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="image-info">
						<image class="image" src="/static/image/discover/add@2x.png" mode=""></image>
						<view class="info">
							<view class="info-title">
								特许金融分析师(CFA三级)
							</view>
							<view class="info-date">
								课程有效期还剩：360天
							</view>
							<view class="info-price">
								542 <text>元</text>
							</view>
						</view>
					</view>
					<view class="bot">
						<view class="status">
							待付款
						</view>
						<button class="active" type="default" hover-class="none">去学习</button>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="image-info">
						<image class="image" src="/static/image/discover/add@2x.png" mode=""></image>
						<view class="info">
							<view class="info-title">
								特许金融分析师(CFA三级)
							</view>
							<view class="info-date">
								课程有效期还剩：360天
							</view>
							<view class="info-price">
								542 <text>元</text>
							</view>
						</view>
					</view>
					<view class="bot">
						<view class="status">
							待付款
						</view>
						<button class="active" type="default" hover-class="none">去学习</button>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	export default {
		name: 'Order',
		components: {
			XesTextTabbar,
			XesNavbar
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '全部'
					}, {
						id: 1,
						name: '待付款'
					}, {
						id: 2,
						name: '已付款'
					}],
					index: 0
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
			chooseSwiper(e) {
				this.tabbar.index = e.target.current
			},
			toId(id) {
				this.tabbar.index = id
			},
			handleItem() {
				uni.navigateTo({
					url: '/pages/order/information'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/order.scss'
</style>
