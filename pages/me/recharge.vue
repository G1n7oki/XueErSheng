<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="充值学币"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 余额 start -->
		<view class="balance">
			<view class="number">
				450.0
			</view>
			<view class="text">
				学币余额
			</view>
		</view>
		<!-- 余额 end -->
		<!-- 充值金额 start -->
		<view class="money">
			<title name="充值金额" />
			<view class="items">
				<view
					class="item"
					:class="{'active': item.money === current}"
					v-for="item in items"
					:key="item.number"
					@click="handleItem(item.money)"
				>
					<view 
						class="number"
						:class="{'active': item.money === current}"
					>
						{{ item.number }}<text :class="{'active': item.money === current}">学币</text>
					</view>
					<view 
						class="price"
						:class="{'active': item.money === current}"
					>
						{{ item.money }}
					</view>
				</view>
			</view>
		</view>
		<!-- 充值金额 end -->
		<!-- 自定义 start -->
		<view class="custom">
			<title name="自定义" />
			<view class="input-area">
				<view class="unit">
					￥
				</view>
				<input 
					class="input"
					type="number"
					value=""
					placeholder="支持任意整数金额"
					@input="input"
				/>
			</view>
		</view>
		<!-- 自定义 end -->
		<!-- 固定按钮 start -->
		<view class="fixed-button">
			<view class="price">
				应付 <text class="number">{{ price }}</text><text class="unit">元</text>
			</view>
			<button hover-class="none" class="button" @click="handlePay">去支付</button>
		</view>
		<!-- 固定按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	export default {
		name: 'Recharge',
		components: {
			XesNavbar,
			Title
		},
		data() {
			return {
				price: 100, // 应付金额
				current: 10, // 默认选择的充值金额
				items: [{
					number: 10,
					money: 10
				}, {
					number: 20,
					money: 20
				}, {
					number: 50,
					money: 50
				}, {
					number: 100,
					money: 100
				}, {
					number: 200,
					money: 200
				}, {
					number: 500,
					money: 500
				}, {
					number: 800,
					money: 800
				}, {
					number: 1200,
					money: 1200
				}, {
					number: 1800,
					money: 1800
				}]
			}
		},
		methods: {
			// 点击对应的Item
			handleItem(money) {
				this.price = money
				this.current = money
			},
			input(e) {
				let value = e.detail.value
				if (value === '') {
					value = 0
				}
				this.price = value
			},
			// 支付
			handlePay() {
				if (this.price == 0) {
					uni.showToast({
						icon: 'none',
						title: '充值金额不能为0'
					})
					return false
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 余额
	.balance {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 686upx;
		height: 260upx;
		background: linear-gradient(180deg, #3265FF 0%, #45B2FF 100%);
		border-radius: 20upx;
		margin: 32upx auto 48upx;
		
		.number {
			font-size: 72upx;
			font-family: DIN;
			font-weight: 500;
			color: #FFFFFF;
		}
		
		.text {
			font-size: 28upx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	// 充值金额
	.money {
		width: 686upx;
		margin: 0 auto;
		
		.items {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 32upx;
			
			.item {
				width: 206upx;
				padding: 28upx 0;
				background: #FFFFFF;
				border-radius: 20upx;
				text-align: center;
				margin-bottom: 32upx;
				
				&.active {
					background-color: rgba(250, 121, 53, .1);
				}
				
				.number {
					font-size: 40upx;
					font-family: DIN;
					font-weight: bold;
					color: #606266;
					
					&.active {
						color: #FA7935;
					}
					
					text {
						font-size: 20upx;
						font-weight: bold;
						color: #606266;
						margin-left: 8upx;
						
						&.active {
							color: #FA7935;
						}
					}
				}
				
				.price {
					font-size: 28upx;
					font-family: DIN;
					font-weight: 500;
					color: #909399;
					
					&.active {
						color: #FA7935;
					}
				}
			}
		}
	}
	// 自定义
	.custom {
		width: 686upx;
		margin: 0 auto 130upx;
		
		.input-area {
			display: flex;
			align-items: center;
			height: 90upx;
			background: #FFFFFF;
			border-radius: 20upx;
			margin-top: 32upx;
			padding: 0 32upx;
			
			.unit {
				font-size: 28upx;
				font-weight: bold;
				color: #303133;
				margin-right: 16upx;
			}
			
			.input {
				font-size: 28upx;
				font-weight: 500;
			}
		}
	}
	// 固定按钮
	.fixed-button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		padding: 15upx 32upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		
		.price {
			font-size: 24upx;
			font-weight: 500;
			color: #909399;
			
			.number {
				font-size: 44upx;
				font-family: DIN;
				font-weight: bold;
				color: #FA7935;
				margin: 0 8upx;
			}
			
			.unit {
				font-size: 20upx;
				font-weight: bold;
				color: #FA7935;
			}
		}
		
		.button {
			width: 280upx;
			height: 80upx;
			background-color: #FA7935;
			border-radius: 40upx;
			font-size: 32upx;
			font-weight: 500;
			color: #FEFEFE;
		}
	}
</style>
