<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="忘记密码"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<view class="inner">
			<!-- 页面小标题 start -->
			<view class="title title-1">
				忘记密码
			</view>
			<!-- 页面小标题 end -->
			<!-- 输入框 start -->
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入手机号" />
				<!-- <image class="close" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/close%402x.png" mode="" @click="clearInput"></image> -->
			</view>
			<view class="input-area">
				<input v-model="seccode" type="text" value="" placeholder="请输入验证码" />
				<view v-if="countdown <= 0" class="text" @click="handleSeccode">
					获取验证码
				</view>
				<view v-else class="text countdown">
					{{ countdown }}秒后重新发送
				</view>
			</view>
			<view class="input-area">
				<input v-model="password" :type="type" value="" placeholder="请输入密码" />
				<image class="eye" :src="src" mode="" @click="chooseType"></image>
			</view>
			<!-- 输入框 end -->
			<!-- 按钮 start -->
			<view @click="handleForgot">
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
		name: 'Forgot',
		components: { 
			XesNavbar,
			uButton
		},
		data() {
			return {
				src: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/eyeclose%402x.png',
				mobile: '', // 手机号码
				password: '', // 密码
				seccode: '', // 验证码
				type: 'password',
				countdown: 0, // 倒计时
				timer: null, // 倒计时计时器
				timer2: null, // 一次性计时器
			}
		},
		onUnload() {
			clearInterval(this.timer)
			clearTimeout(this.timer2)
		},
		methods: {
			chooseType() {
				if (this.type === 'password') {
					this.type = 'text'
					this.src = 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/eye%402x.png'
				} else {
					this.type = 'password'
					this.src = 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/eyeclose%402x.png'
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
						clear(this.timer)
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
			// 登录
			handleForgot() {
				// 验证手机
				if (!isMobile(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					})
					return false
				}
				// 验证验证码
				if (this.seccode === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的验证码'
					})
					return false
				}
				// 验证密码
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '新密码至少6位数'
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
