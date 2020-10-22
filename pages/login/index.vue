<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="登录"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<view class="inner" :style="{height: wHeight - statusBarHeight - 42 + 'px'}">
			<!-- 页面小标题 start -->
			<view class="title">
				手机号登陆
			</view>
			<!-- 页面小标题 end -->
			<!-- 提示 start -->
			<view class="tips">
				新用户登陆之后自动生成账号
			</view>
			<!-- 提示 end -->
			<!-- 输入框 start -->
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入手机号" />
				<image class="close" src="http://dummyimage.com/120x600" mode="" @click="clearInput"></image>
			</view>
			<!-- 输入框 end -->
			<!-- 获取验证码 start -->
			<view @click="toSeccode">
				<uButton text="获取验证码" />
			</view>
			<!-- 获取验证码 end -->
			<!-- 密码登录 start -->
			<navigator url="/pages/login/password" hover-class="none" class="password-login">
				密码登录
			</navigator>
			<!-- 密码登录 end -->
			<!-- 三方 start -->
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
			<!-- 三方 end -->
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
							uni.reLaunch({
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
	@import '~@/static/scss/login.scss'
</style>
