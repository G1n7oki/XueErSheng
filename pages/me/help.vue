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
				<view class="item">
					<uni-collapse>
						<uni-collapse-item title="自考会不会比较好？" showAnimation="true">
							<view class="text">
								包图网是上海包图网络科技有限公司旗下素材在线交易网站于2016年7月上线运营。主要服务是提供图片、视频、音频psd源文件等形式
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="index">Q1</view>
				</view>
				<view class="item">
					<uni-collapse>
						<uni-collapse-item title="收不到短信验证码是怎么回事？" showAnimation="true">
							<view class="text">
								包图网是上海包图网络科技有限公司旗下素材在线交易网站于2016年7月上线运营。主要服务是提供图片、视频、音频psd源文件等形式
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="index">Q2</view>
				</view>
				<view class="item">
					<uni-collapse>
						<uni-collapse-item title="如何绑定手机/邮箱？" showAnimation="true">
							<view class="text">
								包图网是上海包图网络科技有限公司旗下素材在线交易网站于2016年7月上线运营。主要服务是提供图片、视频、音频psd源文件等形式
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="index">Q3</view>
				</view>
				<view class="item">
					<uni-collapse>
						<uni-collapse-item title="忘记密码，怎么找回呢？" showAnimation="true">
							<view class="text">
								包图网是上海包图网络科技有限公司旗下素材在线交易网站于2016年7月上线运营。主要服务是提供图片、视频、音频psd源文件等形式
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="index">Q4</view>
				</view>
			</view>
			<!-- 账号问题 end -->
			<!-- 其他问题 start -->
			<view class="block">
				<title name="其他问题" />
				<view class="item">
					<uni-collapse>
						<uni-collapse-item title="自考会不会比较好？" showAnimation="true">
							<view class="text">
								包图网是上海包图网络科技有限公司旗下素材在线交易网站于2016年7月上线运营。主要服务是提供图片、视频、音频psd源文件等形式
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="index">Q1</view>
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
	export default {
		name: 'Help',
		components: {
			XesNavbar,
			Title,
			UniCollapse,
			UniCollapseItem
		},
		methods: {
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
