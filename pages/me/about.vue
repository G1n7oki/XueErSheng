<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="关于我们"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- logo/版本 start -->
		<view class="logo-version">
			<image class="logo" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/logo%402x.png" mode=""></image>
			<!-- <view class="version">版本号：V1.0</view> -->
		</view>
		<!-- logo/版本 end -->
		<!-- 导航 start -->
		<view class="navigation">
			<view class="item">
				<view class="name">客服电话</view>
				<view class="other">
					<view class="text" style="padding-right: 32upx;">4000-999-305</view>
				</view>
			</view>
			<view class="item">
				<view class="name">网址</view>
				<view class="other active">
					<view class="text">www.mdedu.com</view>
					<uni-icons 
						type="arrowright"
						size="20"
						color="#C0C4CC"
					/>
				</view>
			</view>
			<view class="item">
				<view class="name">服务协议</view>
				<view class="other active">
					<uni-icons 
						type="arrowright"
						size="20"
						color="#C0C4CC"
					/>
				</view>
			</view>
			<view class="item">
				<view class="name">隐私政策</view>
				<view class="other active">
					<uni-icons 
						type="arrowright"
						size="20"
						color="#C0C4CC"
					/>
				</view>
			</view>
		</view>
		<!-- 导航 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'About',
		components: {
			XesNavbar,
			UniIcons
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
		padding-top: 77upx;
	}
	// logo/版本
	.logo-version {
		text-align: center;
		
		.logo {
			width: 166upx;
			height: 166upx;
			border-radius: 20upx;
		}
		
		.version {
			font-size: 28upx;
			font-weight: 500;
			color: #90949A;
		}
	}
	// 导航
	.navigation {
		width: 686upx;
		height: 400upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 79upx auto 0;
		padding-left: 32upx;
		box-sizing: border-box;
		
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 99upx;
			border-bottom: 1px solid #DEDEDE;
			
			.name {
				font-size: 28upx;
				font-weight: 500;
				color: #303234;
			}
			
			.other {
				display: flex;
				align-items: center;
				
				.text {
					font-size: 28upx;
					font-weight: 500;
					color: #90949A;
					
					&.active {
						padding-right: 32upx;
					}
				}
				
				&.active {
					padding-right: 16upx;
				}
			}
			
			&:nth-last-child(1) {
				border-bottom: none;
			}
		}
	}
</style>
