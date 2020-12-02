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
						-{{ discount }} <text class="active">元</text>
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
						0 <text class="active">元</text>
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
						有 {{ card.length }} 张可用
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
						可用学币抵扣{{ money.toString() }}元
					</view>
					<checkbox :checked="choose" @click="handleCheckbox"/>
				</view>
			</view>
		</view>
		<!-- 优惠券信息 end -->
		<!-- 固定定位 start -->
		<view class="fixed-area">
			<view class="actual">
				实际支付 <text class="price">{{ infoData.current_price }}</text> <text class="unit">元</text>
			</view>
			<button type="default" hover-class="none" @click="handlePay">去支付</button>
		</view>
		<!-- 固定定位 end -->
		<!-- 优惠券弹窗 start -->
		<uni-popup ref="popup" type="bottom">
			<scroll-view class="coupon-popup" scroll-y="true">
				<view class="title">
					选取优惠券
				</view>
				<view 
					class="item"
					v-for="coupon in coupon.list"
					:key="coupon.id"
					@click="handleCouponItem(coupon.id, coupon.type)"
				>
					<view class="worth">
						<view class="type">
							{{ coupon.type === 1 ? '满减券' : '课程月卡' }}
						</view>
						<view class="text" v-if="coupon.type === 1">
							<text class="unit">￥</text>
							{{ coupon.cut_money }}
						</view>
						<view class="text active" v-else>
							<view>
								课程
							</view>
							<view>
								月卡
							</view>
						</view>
					</view>
					<view class="explain">
						<view class="title">
							{{ coupon.type === 1 ? `每满${ coupon.need_money }使用` : '1个月使用期限' }}
						</view>
						<view class="date">
							{{ coupon.valid_start }}~{{ coupon.valid_end }}
						</view>
					</view>
				</view>
			</scroll-view>
		</uni-popup>
		<!-- 优惠券弹窗 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import UniPopup from '@/components/uni-popup/uni-popup.vue'
	import { order_information, order_create, order_pay, course_coupon } from '@/common/api/api.js'
	export default {
		name: 'Information',
		components: {
			XesNavbar,
			UniIcons,
			UniPopup
		},
		data() {
			return {
				infoData: {
					cover: '',
					title: ''
				},
				card: [],
				type: 0, // 订单类型
				id: 0, // 商品id
				money: '' ,// 学币
				discount: '', // 优惠
				coupon: {
					cid: '', // 优惠券id
					title: '', // 优惠券标题
					money: 0 // 优惠券抵扣的金额
				},
				choose: true, // 是否选择学币支付
			}
		},
		onLoad(options) {
			this.type = options.type
			this.id = options.id
			this.toData(+options.id, options.type)
			
			this.$refs.popup.open()
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
				const { info, card, money } = response.data.data
				info.current_price = parseFloat(info.current_price) - parseFloat(money)
				this.infoData = info
				this.card = card
				this.styleMoney(money, info.price)
				this.discount = info.virtual_price - info.price
				
				// 课程优惠券列表
				const coupon = await course_coupon({ id: 3, type: 1 })
				const { data } = coupon.data
				data.map(item => {
					item.valid_start = item.valid_start.substring(0, 10)
					item.valid_end = item.valid_end.substring(0, 10)
				})
				this.coupon.list = data
				
				uni.hideLoading()
			},
			async handlePay() {
				uni.showLoading({
					title: '订单生成中...'
				})
				// 创建订单
				const create = await order_create({
					order_type: this.type,
					id: this.id,
					card_id: this.coupon.cid,
					money: this.choose ? 1 : 0
				})
				const { order_num } = create.data.data
				// 获取微信code
				uni.login({
					provider: 'weixin',
					success(res) {
						// 支付
						order_pay({
							order_num: order_num,
							type: 'js',
							code: res.code
						}).then(response => {
							uni.hideLoading()
							
							const { 
								nonceStr,
								paySign,
								signType,
								timestamp
							} = response.data.data
							const packAge = response.data.data.package
							
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: timestamp,
								nonceStr,
								'package': packAge,
								signType,
								paySign,
								success(res) {
									uni.showToast({
										icon: 'none',
										title: '支付成功'
									})
									
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1500)
								}
							})
						})
					}
				})
			},
			// 学币展示样式
			styleMoney(money, price) {
				// 如果学币余额大于支付金额显示支付金额否则显示学币余额
				if (parseFloat(money) > parseFloat(price)) {
					this.money = parseFloat(price)
				} else {
					this.money = parseFloat(money)
				}
			},
			// 是否选择余额
			handleCheckbox() {
				this.choose = !this.choose
				// 当前支付
				const current = this.infoData.current_price
				if (this.choose) {
					
				} else {
					this.infoData.current_price = parseFloat(current) + parseFloat(this.money)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/information.scss'
</style>
