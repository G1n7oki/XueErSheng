<template>
	<view class="contaier">
		<view class="inner">
			<view class="title">
				手机号登陆
			</view>
			<view class="explain">
				新用户登陆之后自动生成账号
			</view>
			<view class="input-area">
				<input type="text" value="" placeholder="请输入手机号" />
				<image class="close" src="/static/image/login/close.png" mode=""></image>
			</view>
			<button class="button" type="default">
				获取验证码
			</button>
			<view class="tripartite">
				<view class="text">
					第三方登录
				</view>
				<image src="" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.inner {
		padding: 0 69upx;
		
		.title {
			font-size: 44upx;
			color: #303133;
			font-weight: bold;
		}
		
		.explain {
			font-size: 28upx;
			color: #606266;
			margin-top: 32upx;
		}
		
		.input-area {
			position: relative;
			margin-top: 105upx;
			
			input {
				height: 92upx;
				border-bottom: 1px solid #F5F5F5;
				font-size: 28upx;
			}
			
			.close {
				width: 29upx;
				height: 29upx;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
			}
		}
		
		.button {
			width: 612upx;
			height: 80upx;
			margin: 0;
			padding: 0;
			font-size: 32upx;
			color: #FFFFFF;
			line-height: 80upx;
			background-color: #1283FF;
			margin-top: 120upx;
		}
	}
</style>
