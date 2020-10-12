<template>
	<view class="contaier">
		<xes-navbar
			title="登录"
			text-align="center"
			:is-arrow="true"
		/>
		<view class="inner" :style="{height: wHeight - statusBarHeight - 42 + 'px'}">
			<view class="title">
				手机号登陆
			</view>
			<view class="explain">
				新用户登陆之后自动生成账号
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入手机号" />
				<image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image>
			</view>
			<view @click="toSeccode">
				<uButton text="获取验证码" />
			</view>
			<navigator url="/pages/login/password" hover-class="none" class="password-login">
				密码登录
			</navigator>
			<view class="tripartite">
				<view class="text">
					第三方登录
				</view>
				<button
					class="weixin"
					open-type="getPhoneNumber"
					@getphonenumber="toPhoneLogin">
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import { wx_login, seccode } from '@/common/api/api.js'
	import { showToast } from '@/tools/util/util.js'
	import { isMobile } from '@/tools/verify/verify.js'
	export default {
		name: 'Login',
		components: { 
			XesNavbar,
			uButton
		},
		data() {
			return {
				mobile: '',
				wHeight: 0,
				statusBarHeight: 0,
				timer: null,
				timer1: null
			}
		},
		onLoad () {
			this.wHeight = uni.getSystemInfoSync()['windowHeight']
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
		},
		onUnload() {
			clearTimeout(this.timer)
			clearTimeout(this.timer1)
		},
		methods: {
			clearInput () {
				this.mobile = ''
			},
			// 微信手机号登录
			// encryptedData iv code 发给服务器
			toPhoneLogin (mobile) {
				uni.login({
					provider: 'weixin',
					success(event) {
						wx_login({
							code: event.code,
							encryptedData: mobile.detail.encryptedData,
							iv: mobile.detail.iv
						}).then(response => {
							const res = response.data
							showToast(res.status)
							uni.setStorageSync('token', res.data.token)
							this.timer = setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 1500)
						}).catch(error => {
							showToast(error.data.message)
						})
					}
				})
			},
			// 获取验证码
			toSeccode() {
				if (!isMobile(this.mobile)) {
					showToast('请输入正确的手机号码')
				} else {
					seccode({ phone: this.mobile }).then(response => {
						const res = response.data
						showToast(res.data)
						this.timer1 = setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/seccode?mobile=' + this.mobile
							})
						}, 1500)
					}).catch(error => {
						showToast(error.data.message)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.inner {
		box-sizing: border-box;
		position: relative;
		padding: 109upx 69upx 0;
		
		.title {
			font-size: 44upx;
			color: #303133;
			font-weight: bold;
		}
		
		.explain {
			font-size: 28upx;
			color: #606266;
			margin-top: 32upx;
			margin-bottom: 105upx;
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
		}
		
		.password-login {
			text-align: center;
			font-size: 32upx;
			font-weight: 500;
			color: #1283FF;
			text-decoration: underline;
			margin-top: 30upx;
		}
		
		.tripartite {
			width: 100%;
			text-align: center;
			position: absolute;
			left: 0;
			bottom: 80upx;
			
			.text {
				font-size: 28upx;
				font-weight: 500;
				color: #C0C4CC;
			}
			
			.weixin {
				width: 80upx;
				height: 80upx;
				background: url('http://api.liufangshan.com/images/login/weixin.png') 0 0 no-repeat;
				background-size: 100% 100%;
				margin: 67upx auto 0;
			}
		}
	}
</style>
