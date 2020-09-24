<template>
	<view class="contaier">
		<NavBar 
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
			<uInput placeholder="请输入手机号" />
			<button class="button" type="default">
				获取验证码
			</button>
			<navigator url="" class="password-login">
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
	import uInput from '@/components/uInput/uInput.vue'
	import NavBar from '@/components/nav-bar/NavBar.vue'
	export default {
		name: 'Login',
		components: { 
			NavBar,
			uInput
		},
		data() {
			return {
				mobile: '',
				wHeight: 0,
				statusBarHeight: 0
			}
		},
		onLoad () {
			this.wHeight = uni.getSystemInfoSync()['windowHeight']
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
		},
		methods: {
			// encryptedData iv code 发给服务器
			toPhoneLogin (mobile) {
				uni.login({
					provider: 'weixin',
					success(event) {
						uni.request({
							url: 'http://xes.test/api/mini',
							data: {
								code: event.code,
								encryptedData: mobile.detail.encryptedData,
								iv: mobile.detail.iv
							},
							method: 'GET',
							success() {
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								})
							}
						})
						console.log(event.code)
						console.log(mobile.detail.encryptedData)
						console.log(mobile.detail.iv)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/login.scss'
</style>
