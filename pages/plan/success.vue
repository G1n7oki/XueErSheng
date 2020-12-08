<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="提交成功"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 图片 start -->
		<image class="image" src="http://dummyimage.com/686x620" mode=""></image>
		<!-- 图片 end -->
		<!-- 跳过 start -->
		<navigator 
			url="/pages/index/index"
			hover-class="none"
			open-type="switchTab"
			class="skip"
			@click="handleSkip"
		>
			跳过
		</navigator>
		<!-- 跳过 end -->
		<!-- bot start -->
		<view class="bot">
			<view class="tips">
				* 自愿购买，购买后不予退还
			</view>
			<view class="button" @click="toInformation">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/goumai%402x.png" mode=""></image>
				<view class="text">
					购买学员上进礼包
				</view>
			</view>
		</view>
		<!-- bot end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Success',
		components: {
			XesNavbar
		},
		methods: {
			toInformation() {
				uni.navigateTo({
					url: '/pages/order/information'
				})
			},
			handleSkip() {
				uni.removeStorageSync('formData')
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 图片
	.image {
		display: block;
		width: 686upx;
		height: 620upx;
		margin: 58upx auto 0;
	}
	// 跳过
	.skip {
		font-size: 28upx;
		font-weight: 500;
		color: #606266;
		text-decoration: underline;
		margin-top: 32upx;
		text-align: center;
	}
	// bot
	.bot {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		// 提示
		.tips {
			font-size: 28upx;
			font-weight: 500;
			color: #C0C4CC;
			text-align: center;
			margin-bottom: 38upx;
		}
		// 按钮
		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100upx;
			background-color: #FA7935;
			
			.icon {
				width: 36upx;
				height: 34upx;
				margin-right: 12upx;
			}
			
			.text {
				font-size: 32upx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
