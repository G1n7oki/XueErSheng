<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="成绩单"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 成绩卡 start -->
		<view class="card">
			<view class="university">
				<image class="logo" src="http://dummyimage.com/160x160" mode=""></image>
				<view class="professional">
					工商企业管理
				</view>
			</view>
			<image class="line" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/line.png" mode=""></image>
			<view class="info">
				<view class="tips">
					<view class="item">
						代码
					</view>
					<view class="item">
						课程名称
					</view>
					<view class="item">
						成绩
					</view>
				</view>
				<view class="content">
					<view class="cell">
						<view class="item">
							00152
						</view>
						<view class="item">
							南大国际贸易理论与实务
						</view>
						<view class="item">
							80
						</view>
					</view>
					<view class="cell">
						<view class="item">
							00152
						</view>
						<view class="item">
							经管本科
						</view>
						<view class="item">
							80
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 成绩卡 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Transcript',
		components: {
			XesNavbar
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 成绩卡
	@mixin children-width {
		&:nth-child(1) {
			width: 82upx;
		}
		
		&:nth-child(2) {
			width: 224upx;
		}
		
		&:nth-child(3) {
			width: 60upx;
		}
	}
	
	.card {
		width: 686upx;
		height: 1000upx;
		margin: 0 auto;
		background-color: #fff;
		margin-top: 32upx;
		border-radius: 20upx;
		
		.university {
			text-align: center;
			padding-top: 80upx;
			
			.logo {
				width: 160upx;
				height: 160upx;
				border-radius: 50%;
				background-color: #eee;
			}
			
			.professional {
				font-size: 28upx;
				font-weight: bold;
				color: #000000;
				margin-top: 26upx;
			}
		}
		
		.line {
			width: 686upx;
			height: 23upx;
			margin: 90upx 0 80upx;
		}
		
		.info {
			padding: 0 74upx;
			
			.tips {
				display: flex;
				justify-content: space-between;
				
				.item {
					font-size: 28upx;
					font-weight: 500;
					color: #90949A;
					text-align: center;
					
					@include children-width;
				}
			}
			
			.content {
				
				.cell {
					display: flex;
					justify-content: space-between;
					margin-top: 42upx;
					
					.item {
						font-size: 28upx;
						font-weight: bold;
						color: #000000;
						text-align: center;
						
						@include children-width;
					}
				}
			}
		}
	}
</style>
