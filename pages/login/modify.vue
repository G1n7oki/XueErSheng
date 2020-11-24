<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="修改密码"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<view class="inner">
			<!-- 页面小标题 start -->
			<view class="title">
				修改密码
			</view>
			<!-- 页面小标题 end -->
			<!-- 提示 start -->
			<view class="tips">
				验证码已发送至{{ mobile }}
			</view>
			<!-- 提示 end -->
			<!-- 输入框 start -->
			<view class="input-area">
				<input v-model="seccode" type="text" value="" placeholder="请输入验证码" />
				<view v-if="countdown <= 0" class="text" @click="handleSeccode">
					重新获取
				</view>
				<view v-else class="text countdown">
					{{ countdown }}秒后重新发送
				</view>
			</view>
			<view class="input-area">
				<input v-model="password" type="text" value="" placeholder="请输入新密码" />
				<!-- <image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image> -->
			</view>
			<view class="input-area">
				<input v-model="confirm" type="text" value="" placeholder="请再次输入新密码" />
				<!-- <image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image> -->
			</view>
			<!-- 输入框 end -->
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
	import uButton from '@/components/u-button/uButton.vue'
	import { seccode, forgot } from '@/common/api/api.js'
	import { isMobile } from '@/tools/verify/verify.js'
	export default {
		name: 'Modify',
		components: { 
			XesNavbar,
			uButton
		},
		data() {
			return {
				mobile: '', // 电话号码
				seccode: '', // 验证码
				password: '', // 密码
				confirm: '', // 确认密码
				type: 'password',
				countdown: 0, // 倒计时
				timer: null,
				timer2: null
			}
		},
		onLoad(options) {
			this.mobile = options.mobile
		},
		onUnload() {
			clearInterval(this.timer)
			clearTimeout(this.timer2)
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
			},
			// 点击获取验证码
			handleSeccode() {
				// 如果密码为空则不请求
				if (!isMobile(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					})
					return false
				}
				// 倒计时
				this.countdown = 300
				this.timer = setInterval(() => {
					if (this.countdown <= 0) {
						clearInterval(this.timer)
					}
					this.countdown--
				}, 1000)
				// 获取验证码
				seccode({
					phone: this.mobile
				}).then(response => {
					uni.showToast({
						icon: 'none',
						title: '验证码已发送'
					})
				})
			},
			// 点击登录
			handleLogin() {
				if (this.seccode === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return false
				}
				
				if (this.password.length < 6 || this.confirm.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '新密码格式错误'
					})
					return false
				}
				
				if (this.password !== this.confirm) {
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致'
					})
					return false
				}
				
				forgot({
					phone: this.mobile,
					code: this.seccode,
					password: this.password
				}).then(response => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					
					this.timer2 = setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/index'
						})
					}, 1500)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/login.scss'
</style>
