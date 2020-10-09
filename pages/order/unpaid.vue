<template>
	<view class="contaier">
		<xes-navbar
			title="待付款"
			textAlign="center"
			:is-arrow="true"
		/>
		<!-- 提示 start -->
		<view class="tips">
			<view class="name">
				待支付
			</view>
			<view class="price">
				需要支付299元
			</view>
		</view>
		<!-- 提示 end -->
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
						201904090909022345587
					</view>
				</view>
				<view class="item">
					<view class="name">
						下单时间
					</view>
					<view class="price">
						2020.09.06  10:20:26
					</view>
				</view>
			</view>
		</view>
		<!-- 订单信息 end -->
		<!-- 支付信息 start -->
		<view class="payment-info">
			<view class="item">
				<view class="name">
					订单原价
				</view>
				<view class="price">
					599 <text>元</text>
				</view>
			</view>
			<view class="item">
				<view class="name">
					实际支付
				</view>
				<view class="price active">
					299 <text class="active">元</text>
				</view>
			</view>
			<view class="button-group">
				<button type="default" class="cancel" hover-class="none">取消订单</button>
				<button type="default" class="payment" hover-class="none">去支付</button>
			</view>
		</view>
		<!-- 支付信息 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Unpaid',
		components: {
			XesNavbar
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/unpaid.scss'
</style>
