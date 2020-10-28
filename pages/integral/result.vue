<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="兑换结果"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 提示 start -->
		<view class="tips">
			<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/xuanhzong%402x.png" mode=""></image>
			<view class="text">
				恭喜，兑换成功！
			</view>
		</view>
		<!-- 提示 end -->
		<!-- 线体 start -->
		<view class="line-body">
			<!-- 信息 start -->
			<view class="info">
				<view class="ticket">
					<image class="image" src="http://dummyimage.com/720x300" mode=""></image>
					<view>
						<view class="title">
							15元无门槛课程优惠券
						</view>
						<view class="indate">
							有效期还剩：844天
						</view>
						<view class="date">
							2020.08.05-2023.12.15
						</view>
					</view>
				</view>
				<view class="item">
					<view class="name">
						支付金额
					</view>
					<view class="foo active">
						150 <text>积分</text>
					</view>
				</view>
				<view class="item">
					<view class="name">
						订单编号
					</view>
					<view class="foo">
						201904090909022345587
					</view>
				</view>
				<view class="item">
					<view class="name">
						下单时间
					</view>
					<view class="foo">
						2020.09.07  10:05:36
					</view>
				</view>
			</view>
			<!-- 信息 end -->
			<!-- 使用流程 start -->
			<view class="block">
				<title name="使用流程"/>
				<view class="block-inner">
					<rich-text :nodes="process"></rich-text>
				</view>
			</view>
			<!-- 使用流程 end -->
		</view>
		<!-- 线体 end -->
		<!-- 固定按钮 start -->
		<view class="fixed-button">
			<button class="button">立即使用</button>
		</view>
		<!-- 固定按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	export default {
		name: 'Result',
		components: {
			XesNavbar,
			Title
		},
		data() {
			return {
				process: '<ol>' + 
          '<li>建筑联盟100元优惠券使用说明</li>' +
					'<li>用户领券后，可在网页/app等渠道使用，仅在设定的有效期中使用，过期无效</li>' +
					'<li>仅限本人账号使用，不可转赠他人</li>' + 
					'<li>同一门课程只可以使用一张优惠券</li>' + 
					'<li>若以使用优惠券下单，但为支付，可在我的订单内查询该订单进行支付，或者取消该订单重新使用优惠券</li>' +
        '</ol>'
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 提示
	.tips {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750upx;
		height: 106upx;
		background-color: #fff;
		
		.icon {
			width: 32upx;
			height: 32upx;
			margin-right: 18upx;
		}
		
		.text {
			font-size: 28upx;
			font-weight: 500;
			color: #303133;
		}
	}
	// 线体
	.line-body {
		padding: 32upx 32upx 130upx;
		background-color: #F4F7F9;
		// 信息
		.info {
			background-color: #FFFFFF;
			border-radius: 20upx;
			padding: 28upx 32upx;
			
			.ticket {
				display: flex;
				padding-bottom: 32upx;
				border-bottom: 1px solid #DEDEDE;
				
				.image {
					width: 212upx;
					height: 136upx;
					background-color: #eee;
					margin-right: 28upx;
				}
				
				.title {
					font-size: 28upx;
					font-weight: bold;
					color: #303133;
				}
				
				.indate {
					font-size: 24upx;
					font-weight: 500;
					color: #606266;
					margin: 20upx 0 10upx;
				}
				
				.date {
					font-size: 24upx;
					font-family: DIN;
					font-weight: 500;
					color: #909399;
				}
			}
			
			.item {
				display: flex;
				justify-content: space-between;
				margin-top: 36upx;
				
				.name {
					font-size: 28upx;
					font-weight: bold;
					color: #303133;
				}
				
				.foo {
					font-size: 28upx;
					font-family: DIN;
					font-weight: 500;
					color: #909399;
					
					&.active {
						font-size: 32upx;
						color: #FA7935;
					}
					
					text {
						font-size: 20upx;
						font-weight: bold;
						margin-left: 8upx;
					}
				}
			}
		}
		// 使用流程
		.block {
			margin-top: 48upx;
			
			.block-inner {
				background-color: #fff;
				border-radius: 20upx;
				padding: 28upx 32upx;
				margin-top: 32upx;
			}
		}
	}
	// 按钮
	.fixed-button {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 20upx 32upx;
		background-color: #fff;
		
		.button {
			height: 80upx;
			line-height: 80upx;
			background-color: #FA7935;
			border-radius: 12upx;
			font-size: 32upx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
