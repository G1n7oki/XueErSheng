<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			:is-arrow="true"
			:is-empty="false"
			is-arrow-type="image"
			background-color="transparent"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<!-- 播放器 start -->
		<view class="live-area" id="video">
			<view class="live-mask">
				<view class="text" v-if="login">
					立即购买或激活课程，即可解锁观看 若已购买，请 <text @click="toLogin">登录</text>
				</view>
				<view class="button">
					开始学习
				</view>
			</view>
		</view>
		<!-- 播放器 end -->
		<!-- 简略信息 start -->
		<view class="brief-info" id="brief">
			<view class="title">
				{{ detail.title }}
			</view>
			<view class="bot">
				<!-- <view class="user">
					<image class="avatar" src="" mode=""></image>
					<view class="name">杨明波</view>
					<view class="post">江西省高级教师</view>
				</view> -->
				<view class="number">
					<view class="watch">购买人数:{{ detail.buy_num }}人</view>
					<view class="line">|</view>
					<view class="hour">共{{ detail.sol_num }}课时</view>
				</view>
			</view>
		</view>
		<!-- 简略信息 end -->
		<!-- 切换卡 start -->
		<view class="tabbar" id="tabbar">
			<view 
				class="tabbar-item"
				:class="{'active': tabbar.current === index}"
				v-for="item in tabbar.list"
				:key="item.id"
				@click="handleTabbar(item.id)"
			>
				{{ item.name }}
			</view>
			<view class="tabbar-line" :style="{left: 33.333 * tabbar.current + '%'}">
				<view class="inner"></view>
			</view>
		</view>
		<!-- 切换卡 end -->
		<!-- 滑块区域 start -->
		<swiper 
			:current="tabbar.current"
			:duration="500"
			class="swiper"
			:style="{height: height + 'px'}"
			@change="changeSwiper"
		>
			<!-- 详情 start -->
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="detail">
						<view class="rich-text">
							<rich-text :nodes="detail.details.replace(/\<img/gi, '<img style=max-width:100%;height:auto')"></rich-text>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 详情 end -->
			<!-- 目录 start -->
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="catalog">
						<view
							class="item"
							v-for="(item, index) in catalog"
							:key="item.id"
							@click="handleCatalogItem(item, index)"
						>
							<view class="date">
								<view class="text">{{ item.start_time.substring(5, 10) }}</view>
								<view class="dot"></view>
							</view>
							<view class="content">
								<view class="line" v-if="index + 1 !== catalog.length"></view>
								<view class="box">
									<view class="tips">{{ item.is_play === 0 ? '预告' : item.is_play === 1 ? '直播' : '回顾' }}</view>
									<text class="box-text">{{ item.title }}</text>
									<view class="name">
										{{ item.name }} <!-- <text>市政</text> -->
									</view>
									<view class="box-watch">
										{{ item.is_play === 0 ? item.start_time : item.is_play === 1 ? `${item.watch_num}人在线` : `${item.reviw_num}播放` }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 目录 end -->
			<!-- 评论 start -->
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true" >
					<view class="evaluation">
						<view class="info">
							<view class="rate">
								<uni-rate 
									:readonly="true"
									:size="16"
									:margin="5"
									:allowHalf="true"
									:value="4.6"
								/>
								<view class="line"></view>
								<view class="number-unit">
									<view class="number">4.6</view>
									<view class="unit">评分</view>
								</view>
							</view>
							<navigator url="/pages/study/evaluation" hover-class="none" class="button">
								我要评价
							</navigator>
						</view>
						<view class="split-line"></view>
						<view class="list">
							<view class="list-title">
								<title name="所有评价" />
								<view class="total">共40个评价</view>
							</view>
							<view class="list-item">
								<view class="item-top">
									<view class="avatar-user">
										<image class="avatar" src="http://dummyimage.com/40x40" mode=""></image>
										<view class="user">
											<view class="username">一只大肥羊</view>
											<view class="hour">学习1个课时评价</view>
										</view>
									</view>
									<view class="date">
										2020.08.05
									</view>
								</view>
								<view class="content">
									老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
								</view>
								<view class="list-rate">
									<uni-rate
										:readonly="true"
										:size="16"
										:margin="5"
										:allowHalf="true"
										:value="5"
									/>
								</view>
							</view>
							<view class="list-item">
								<view class="item-top">
									<view class="avatar-user">
										<image class="avatar" src="" mode=""></image>
										<view class="user">
											<view class="username">一只大肥羊</view>
											<view class="hour">学习1个课时评价</view>
										</view>
									</view>
									<view class="date">
										2020.08.05
									</view>
								</view>
								<view class="content">
									老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
								</view>
								<view class="list-rate">
									<uni-rate
										:readonly="true"
										:size="16"
										:margin="5"
										:allowHalf="true"
										:value="5"
									/>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 评论 end -->
		</swiper>
		<!-- 滑块区域 end -->
		<!-- fixed start -->
		<view class="fixed-area" v-if="tabbar.current === 0 && detail.is_buy === 0">
			<view class="price-info">
				<view class="price">
					<view class="present">
						{{ detail.price }} <text>元</text>
					</view>
					<view class="original">
						<text class="num">{{ detail.virtual_price }}</text>
						<text class="unit">元</text>
					</view>
				</view>
				<view class="number">
					已有{{ detail.buy_num }}人购买
				</view>
			</view>
			<view class="advisory">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/zixun%402x.png" mode=""></image>
				<view class="text">咨询</view>
				<button class="button" hover-class="none" open-type="contact"></button>
			</view>
			<view class="button" @click="toOrderInfo">
				<text class="symbol">+</text>
				<text class="text">加入学习</text>
			</view>
		</view>
		<!-- fixed end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import UniRate from '@/components/uni-rate/uni-rate.vue'
	import { live_package_detail, live_package } from '@/common/api/api.js'
	export default {
		name: 'LiveDetail',
		components: {
			XesNavbar,
			Title,
			UniRate
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '详情'
					}, {
						id: 1,
						name: '目录'
					}, {
						id: 2,
						name: '评价'
					}],
					current: 0
				}, // 切换卡参数
				height: 0, // swiper的高度
				login: false,
				id: 0,
				detail: { // 直播详情
					title: '',
					buy_num: 0,
					sol_num: 0,
					details: '',
					price: 0
				},
				catalog: []
			}
		},
		onLoad(options) {
			const that = this
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			
			this.calculate(wHeight)
			
			uni.getStorage({
				key: 'token',
				success(res) {
					if (res.data) {
						that.login = false
					} else {
						that.login = true
					}
				}
			})
			this.id = options.id
			this.toData(options.id)
		},
		methods: {
			// 点击选项卡
			handleTabbar(id) {
				this.tabbar.current = id
			},
			// 切换滑块
			changeSwiper(e) {
				this.tabbar.current = e.target.current
			},
			// 计算swiper的高度
			calculate(height) {
				// 每次获取元素前都必须使用createSelectorQuery否则会多次执行boundingClientRect
				// 首先使用屏幕的高度减去视频的高度
				const video = uni.createSelectorQuery().in(this)
				video.select('#video').boundingClientRect(video => {
					this.height = height - video.height
				}).exec()
				// 计算后的高度减去简略介绍的高度
				const brief = uni.createSelectorQuery().in(this)
				brief.select('#brief').boundingClientRect(brief => {
					this.height = this.height - brief.height
				}).exec()
				// 计算后的高度减去选项卡的高度
				const tabbar = uni.createSelectorQuery().in(this)
				tabbar.select('#tabbar').boundingClientRect(tabbar => {
					this.height = this.height - tabbar.height - 10
				}).exec()
			},
			// 路由切换
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取详情信息
				const detail = await live_package_detail(id)
				this.detail = detail.data.data
				// 获取直播课包目录
				const catalog = await live_package({ id })
				this.catalog = catalog.data.data
				uni.hideLoading()
			},
			toOrderInfo() {
				uni.navigateTo({
					url: '/pages/order/information?id=' + this.id + '&type=2'
				})
			},
			handleCatalogItem(raw, index) {
				const { is_buy } = this.detail
				// if (is_buy < 1) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '您还没有购买该直播课包'
				// 	})
				// 	return false
				// }
				const { is_play, sol_id } = raw
				if (is_play === 2) {
					uni.navigateTo({
						url: `/pages/live/review-play?id=${this.id}&sol=${sol_id}$index=${index}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/live/live-play?id=${sol_id}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/live-detail.scss'
</style>
