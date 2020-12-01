<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="订单信息"
			textAlign="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 订单信息 start -->
		<view class="order-info">
			<view class="head">
				<image class="image" :src="infoData.cover" mode=""></image>
				<view class="info">
					<view class="name">
						{{ infoData.title }}
					</view>
					<view class="date">
						课程有效期还剩：{{ infoData.validity }}天
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item">
					<view class="name">
						订单原价
					</view>
					<view class="price">
						{{ infoData.virtual_price }} <text>元</text>
					</view>
				</view>
				<view class="item">
					<view class="name">
						已优惠
					</view>
					<view class="price active">
						-399 <text class="active">元</text>
					</view>
				</view>
				<view class="item">
					<view class="name">
						优惠券
					</view>
					<view class="price">
						暂无优惠券
					</view>
				</view>
				<view class="item">
					<view class="name">
						学币抵扣
					</view>
					<view class="price active">
						-299 <text class="active">元</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 end -->
		<!-- 优惠券信息 start -->
		<view class="coupon-info">
			<view class="item">
				<view class="name">
					优惠券
				</view>
				<view class="detail">
					<view class="text">
						有 2 张可用
					</view>
					<uni-icons type="forward" size="16" color="#C0C4CC" />
				</view>
			</view>
			<view class="item">
				<view class="name">
					学币抵扣
				</view>
				<view class="detail">
					<view class="text">
						可用学币抵扣100元
					</view>
					<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/xuanhzong%402x.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 优惠券信息 end -->
		<!-- 固定定位 start -->
		<view class="fixed-area">
			<view class="actual">
				实际支付 <text class="price">200</text> <text class="unit">元</text>
			</view>
			<button type="default" hover-class="none" @click="handlePay">去支付</button>
		</view>
		<!-- 固定定位 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { order_information, order_create, order_pay } from '@/common/api/api.js'
	export default {
		name: 'Information',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				infoData: {
					cover: '',
					title: ''
				},
				type: 0, // 订单类型
				id: 0, // 商品id
			}
		},
		onLoad(options) {
			this.type = options.type
			this.id = options.id
			this.toData(+options.id, options.type)
		},
		methods: {
			async toData(id, type) {
				uni.showLoading({
					title: '加载中...'
				})
				// 订单信息预览
				const response = await order_information({
					id,
					order_type: type
				})
				const { info } = response.data.data
				this.infoData = info
				uni.hideLoading()
			},
			async handlePay() {
				let code = ''
				// 创建订单
				const create = await order_create({
					order_type: this.type,
					id: this.id,
					card_id: ''
				})
				const { order_num } = create.data.data
				// 获取微信code
				await uni.login({
					provider: 'weixin',
					success(res) {
						code = res.code
					}
				})
				// 支付
				const pay = await order_pay({
					order_num: order_num,
					type: 'js',
					code: code
				})
				
				console.log(pay)
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/information.scss'
</style>
