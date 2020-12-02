<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="订单信息"
			textAlign="center"
			backgroundColor="transparent"
			is-arrow-color="#fff"
			color="#fff"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 选择内容 start -->
		<view class="select-box">
			<view class="select-box-title">
				请选择报考类型...
			</view>
			<view class="select-box-content">
				<view class="item border">
					<image class="image" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/zixuekaoshi%402x.png" mode=""></image>
					<button class="button self" @click="handleButton('1')">自学考试</button>
				</view>
				<view class="item">
					<image class="image" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/chengrengaokao%402x.png" mode=""></image>
					<button class="button adult" @click="handleButton('2')">成人高考</button>
				</view>
			</view>
		</view>
		<!-- 选择内容 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Select',
		components: {
			XesNavbar
		},
		data() {
			return {}
		},
		methods: {
			handleButton(value) {
				uni.navigateTo({
					url: `/pages/plan/detail?id=${value}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background: linear-gradient(-45deg, #3265FF 0%, #45B2FF 100%);
	}
	
	.select-box {
		width: 686upx;
		box-sizing: border-box;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.select-box-title {
		font-size: 36upx;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
	}
	
	.select-box-content {
		display: flex;
		width: 686upx;
		height: 486upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin-top: 64upx;
		
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
			box-sizing: border-box;
			
			&.border {
				border-right: 1px solid #D5D5D5;
			}
						
			.image {
				width: 134upx;
				height: 238upx;
			}
			
			.button {
				width: 202upx;
				height: 59upx;
				border-radius: 30upx;
				font-size: 28upx;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 59upx;
				margin-top: 50upx;
				
				&.self {
					background-color: #1283FF;
				}
				
				&.adult {
					background-color: #FA7935;
				}
			}
		}
	}
</style>
