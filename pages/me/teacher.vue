<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="我的班主任"
			text-align="center"
			:is-arrow="true"
			:is-empty="false"
		/>
		<!-- 导航栏 end -->
		<!-- 巨幕 start -->
		<view class="jumbotron"></view>
		<!-- 巨幕 end -->
		<!-- 班主任信息 start -->
		<view class="info">
			<image class="avatar" src="http://dummyimage.com/100x100" mode=""></image>
			<view class="name">
				Dr. Bruce Fang 
			</view>
			<view class="post">
				班主任
			</view>
		</view>
		<!-- 班主任信息 end -->
		<!-- 列表 start -->
		<view class="list">
			<view class="item active">
				<view class="name">
					电话
				</view>
				<view class="contact">
					18870322365
				</view>
				<button class="button" @click="call">一键拨号</button>
			</view>
			<view class="item active">
				<view class="name">
					微信号
				</view>
				<view class="contact">
					brucefang
				</view>
				<button class="button" @click="copy">复制微信</button>
			</view>
			<view class="item">
				<view class="name">
					联系地址
				</view>
				<view class="text">
					江西省南昌市高新开发区紫阳大道1266号新力方2号楼
				</view>
			</view>
			<view class="item">
				<view class="name">
					我的签名
				</view>
				<view class="text">
					如果你无法简洁的表达你的想法，那只说明你还不够了解它。 
				</view>
			</view>
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Teacher',
		components: {
			XesNavbar
		},
		methods: {
			// 打电话
			call() {
				uni.makePhoneCall({
				   phoneNumber: '18870322365'
				})
			},
			// 复制
			copy() {
				uni.setClipboardData({
					data: 'brucefang',
					success(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	// 巨幕
	.jumbotron {
		width: 750upx;
		height: 369upx;
		background: url('https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/teacher.png') 0 0 no-repeat;
		background-size: 100%;
	}
	// 班主任信息
	.info {
		text-align: center;
		position: relative;
		z-index: 1;
		margin-top: -100upx;
		
		.avatar {
			width: 200upx;
			height: 200upx;
			border-radius: 50%;
			background-color: #eee;
		}
		
		.name {
			font-size: 32upx;
			font-weight: bold;
			color: #303133;
			margin: 20upx 0 0;
		}
		
		.post {
			font-size: 24upx;
			font-weight: 500;
			color: #909399;
		}
	}
	// 列表
	.list {
		padding-left: 32upx;
		
		.item {
			display: flex;
			justify-content: space-between;
			padding: 34upx 34upx 34upx 0;
			border-bottom: 1px solid #DEDEDE;
			
			&.active {
				align-items: center;
			}
			
			.name {
				flex-shrink: 0;
				width: 120upx;
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
			}
			
			.contact {
				flex: 1;
				font-size: 32upx;
				font-family: DIN;
				font-weight: 500;
				color: #303133;
				margin-left: 63upx;
			}
			
			.button {
				width: 144upx;
				height: 56upx;
				background-color: #FFFFFF;
				border: 2upx solid #1283FF;
				border-radius: 8upx;
				font-size: 28upx;
				font-weight: 500;
				color: #1283FF;
				line-height: 56upx;
			}
			
			.text {
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
				margin-left: 63upx;
			}
		}
	}
</style>
