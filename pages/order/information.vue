<template>
	<view class="contaier">
		<xes-navbar
			title="订单信息"
			textAlign="center"
			:is-arrow="true"
		/>
		<!-- 订单信息 start -->
		<view class="order-info">
			<view class="head">
				<image class="image" src="/static/image/discover/add@2x.png" mode=""></image>
				<view class="info">
					<view class="name">
						特许金融分析师(CFA三级)特许金融分析师(CFA三级)
					</view>
					<view class="date">
						课程有效期还剩：360天
					</view>
				</view>
			</view>
			<view class="list">
				<view class="item">
					<view class="name">
						订单编号
					</view>
					<view class="price">
						599 <text>元</text>
					</view>
				</view>
				<view class="item">
					<view class="name">
						下单时间
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
					<image class="icon" src="/static/image/order/xuanhzong@2x.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 优惠券信息 end -->
		<!-- 固定定位 start -->
		<view class="fixed-area">
			<view class="actual">
				实际支付 <text class="price">200</text> <text class="unit">元</text>
			</view>
			<button type="default" hover-class="none">去支付</button>
		</view>
		<!-- 固定定位 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'Information',
		components: {
			XesNavbar,
			UniIcons
		},
		onLoad(options) {
			console.log(options.id)
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/information.scss'
</style>
