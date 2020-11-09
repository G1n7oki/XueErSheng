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
			<image class="avatar" :src="teacher.head" mode=""></image>
			<view class="name">
				{{ teacher.name }}
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
					{{ teacher.phone }}
				</view>
				<button class="button" @click="call">一键拨号</button>
			</view>
			<view class="item active">
				<view class="name">
					微信号
				</view>
				<view class="contact">
					{{ teacher.wechat_id }}
				</view>
				<button class="button" @click="copy">复制微信</button>
			</view>
			<view class="item">
				<view class="name">
					联系地址
				</view>
				<view class="text">
					{{ teacher.address }}
				</view>
			</view>
			<view class="item">
				<view class="name">
					我的签名
				</view>
				<view class="text">
					{{ teacher.signature }} 
				</view>
			</view>
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import { me_teacher } from '@/common/api/api.js'
	export default {
		name: 'Teacher',
		components: {
			XesNavbar
		},
		data() {
			return {
				teacher: {
					name: '', // 姓名
					phone: '', // 电话
					address: '', // 地址
					signature: '', // 签名
					wechat_id: '', // 微信号
					head: '' // 头像
				}
			}
		},
		onLoad() {
			this.toData()
		},
		methods: {
			async toData() {
				// 获取我的班主任信息
				const teacher = await me_teacher({
					profession_id: uni.getStorageSync('profession_id')
				})
				this.teacher = teacher.data.data
			},
			// 打电话
			call() {
				const that = this
				uni.makePhoneCall({
				   phoneNumber: that.teacher.phone
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
