<template>
	<view class="contaier">
		<xes-navbar
			title="修改密码"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="inner">
			<view class="title">
				修改密码
			</view>
			<view class="tips">
				验证码已发送至18870322365
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入验证码" />
				<view class="text">
					获取验证码
				</view>
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入新密码" />
				<!-- <image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image> -->
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请再次输入新密码" />
				<!-- <image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image> -->
			</view>
			<uButton text="登录" />
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Modify',
		components: { 
			XesNavbar,
			uButton
		},
		data() {
			return {
				src: '/static/image/login/eyeclose.png',
				mobile: '',
				password: '',
				type: 'password'
			}
		},
		methods: {
			chooseType() {
				if (this.type === 'password') {
					this.type = 'text'
					this.src = '/static/image/login/eye.png'
				} else {
					this.type = 'password'
					this.src = '/static/image/login/eyeclose.png'
				}
			}
		}
	}
</script>

<style lang="scss">
	.inner {
		padding: 0 70upx;
		
		.title {
			font-size: 44upx;
			font-weight: bold;
			color: #303133;
			margin-top: 108upx;
		}
		
		.tips {
			margin-top: 33upx;
			font-size: 28upx;
			font-weight: 500;
			color: #606266;
			margin-bottom: 100upx;
		}
		
		.input-area {
			position: relative;
			
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
				z-index: 10;
			}
			
			.eye {
				width: 35upx;
				height: 30upx;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				z-index: 10;
			}
			
			.text {
				font-size: 28upx;
				font-weight: 500;
				color: #1283FF;
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				z-index: 10;
			}
		}
	}
</style>
