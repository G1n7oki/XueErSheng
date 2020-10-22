<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="验证码"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏end -->
		<view class="inner">
			<!-- 页面小标题 start -->
			<view class="title">
				输入验证码
			</view>
			<!-- 页面小标题 end -->
			<!-- 提示 start -->
			<view class="tips">
				验证码已发送至{{ mobile }}
			</view>
			<!-- 提示 end -->
			<!-- 验证码 start -->
			<view class="seccode">
				<Seccode ref="code" :maxlength="6" :isPwd="false" @finish="getCode" />
			</view>
			<!-- 验证码 end -->
			<!-- 重新发送 start -->
			<view class="resend">
				还没收到验证码？<text @click="resend">重新发送</text>
			</view>
			<!-- 重新发送 end -->
			<!-- 按钮 start -->
			<view @click="handleLogin">
				<uButton text="登录" />
			</view>
			<!-- 按钮 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Seccode from '@/components/seccode/seccode.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import { seccode_login, seccode } from '@/common/api/api.js'
	import { isMobile } from '@/tools/verify/verify.js'
	import { showToast } from '@/tools/util/util.js'
	export default {
		name: 'Seccode',
		components: {
			XesNavbar,
			Seccode,
			uButton
		},
		data() {
			return {
				code: '', // 验证码
				mobile: '', // 手机号码
				timer: null // 计时器
			}
		},
		onLoad(options) {
			if (!options.mobile) {
				return false
			}
			this.mobile = options.mobile
		},
		onUnload() {
			clearTimeout(this.timer)
		},
		methods: {
			// 获取输入的验证码
			getCode(val) {
				this.code = val
			},
			// 验证码登录
			handleLogin() {
				let that = this
				if (this.code === '') {
					showToast('验证码不能为空')
					return false
				}
				
				seccode_login({
					phone: this.mobile,
					code: this.code
				}).then(response => {
					const res = response.data
					showToast(res.status)
					uni.setStorageSync('token', res.data.token)
					this.timer = setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 1500)
				}).catch(error => {
					showToast(error.data.message)
				})
			},
			// 重新发送
			resend() {
				if (!this.mobile) {
					showToast('因为某些原因号码丢失')
					return false
				}
				
				seccode({ phone: this.mobile }).then(response => {
					const res = response.data
					showToast(res.data)
				}).catch(error => {
					showToast(error.data.message)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/login.scss'
</style>
