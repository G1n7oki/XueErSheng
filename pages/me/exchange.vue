<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="兑换码核销"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 输入框 start -->
		<input v-model="value" class="input" type="text" value="" placeholder="请输入兑换码" />
		<!-- 输入框 end -->
		<!-- 按钮 start -->
		<view @click="handleButton">
			<u-button text="确定" />
		</view>
		<!-- 按钮 end -->
		<!-- 兑换弹窗 start -->
		<uni-popup ref="dialog">
			<view class="dialog-box">
				<view class="title">
					您兑换成功了
				</view>
				<view class="item" v-for="n in 3">
					2019二级建造师法规精讲班二级建造师法规精讲班二级建造师法规精讲班
				</view>
				<view class="indate">
					课程有效期: 180天
				</view>
				<button class="button" @click="hide">知道了</button>
			</view>
		</uni-popup>
		<!-- 兑换弹窗 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import UniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: 'Exchange',
		components: {
			XesNavbar,
			uButton,
			UniPopup
		},
		data() {
			return {
				value: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			handleButton() {
				if (this.value === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的兑换码'
					})
					return false
				}
				this.show()
			},
			show() {
				this.$refs.dialog.open()
				this.value = ''
			},
			hide() {
				this.$refs.dialog.close()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
		padding: 0 32upx;
	}
	// 输入框
	.input {
		display: block;
		width: 686upx;
		height: 100upx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 32upx;
		margin-top: 20upx;
		border-radius: 20upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
	}
	// 弹出层
	.dialog-box {
		width: 600upx;
		padding: 32upx 0;
		border-radius: 20upx;
		background-color: #fff;
		
		.title {
			font-size: 28upx;
			font-weight: bold;
			color: #303133;
			text-align: center;
			margin-bottom: 30upx;
		}
		
		.item {
			width: 500upx;
			border: 1px solid #1283FF;
			text-align: center;
			border-radius: 32upx;
			font-size: 24upx;
			font-weight: 500;
			color: #909399;
			text-align: center;
			padding: 20upx;
			margin: 0 auto 20upx;
			box-sizing: border-box;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		
		.indate {
			text-align: center;
			font-size: 24upx;
			font-weight: 500;
			color: #909399;
			border-bottom: 1px solid #dedede;
			padding-bottom: 32upx;
		}
		
		.button {
			width: 120upx;
			height: 60upx;
			background-color: #1283FF;
			line-height: 60upx;
			font-size: 24upx;
			color: #fff;
			margin: 30upx auto;
			border-radius: 50upx;
		}
	}
</style>
