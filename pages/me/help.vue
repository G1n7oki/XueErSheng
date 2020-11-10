<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="帮助反馈"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<view class="content">
			<!-- 账号问题 start -->
			<view class="block">
				<title name="账号问题" />
				<view 
					class="item"
					v-for="(item, index) in account"
					:key="item.id"
				>
					<uni-collapse>
						<uni-collapse-item :title="item.title" showAnimation="true">
							<view class="text">
								{{ item.content }}
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="index">Q{{ index + 1 }}</view>
				</view>
			</view>
			<!-- 账号问题 end -->
			<!-- 其他问题 start -->
			<view class="block">
				<title name="其他问题" />
				<view 
					class="item"
					v-for="(item, index) in other"
					:key="item.id"
				>
					<uni-collapse>
						<uni-collapse-item :title="item.title" showAnimation="true">
							<view class="text">
								{{ item.content }}
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="index">Q{{ index + 1 }}</view>
				</view>
			</view>
			<!-- 其他问题 end -->
		</view>
		<!-- 按钮 start -->
		<view class="fixed-button">
			<button class="button service" open-type="contact">联系客服</button>
			<button class="button feedback" @click="toFeedback">意见反馈</button>
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import UniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import UniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import { help } from '@/common/api/api.js'
	export default {
		name: 'Help',
		components: {
			XesNavbar,
			Title,
			UniCollapse,
			UniCollapseItem
		},
		data() {
			return {
				account: [],
				other: []
			}
		},
		onLoad() {
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await help()
				const { account, other } = response.data.data
				this.account = account
				this.other = other
				uni.hideLoading()
			},
			toFeedback() {
				uni.navigateTo({
					url: '/pages/me/feedback'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	
	.content {
		padding-bottom: 150upx;
		background-color: #F4F7F9;
	}
	
	.block {
		padding: 40upx 32upx 0;
		
		.item {
			border-radius: 20upx;
			overflow: hidden;
			margin-top: 32upx;
			padding-left: 40upx;
			background-color: #fff;
			position: relative;
			
			.text {
				font-size: 24upx;
				font-weight: 500;
				color: #909399;
				padding: 0 32upx 32upx 50upx;
			}
			
			.index {
				width: 34upx;
				height: 33upx;
				background: url('https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/bg0101%402x.png') 0 0 no-repeat;
				background-size: 100% 100%;
				position: absolute;
				left: 32upx;
				top: 32upx;
				font-size: 20upx;
				font-family: DIN;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
	// 按钮
	.fixed-button {
		display: flex;
		justify-content: space-between;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 24upx 60upx;
		background-color: #fff;
		
		.button {
			width: 280upx;
			height: 72upx;
			line-height: 72upx;
			box-sizing: border-box;
			
			&.service {
				background-color: #fff;
				border: 1px solid #1283FF;
				font-size: 28upx;
				font-weight: 500;
				color: #1283FF;
			}
			
			&.feedback {
				background-color: #1283FF;
				font-size: 28upx;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
</style>
