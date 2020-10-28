<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="密码登陆"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<view class="inner">
			<!-- 页面小标题 start -->
			<view class="title">
				密码登陆
			</view>
			<!-- 页面小标题 end -->
			<!-- 提示 start -->
			<view class="tips">
				用户可在我的中修改登录密码
			</view>
			<!-- 提示 end -->
			<!-- 输入框 start -->
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入手机号" />
				<image class="close" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/close%402x.png" mode="" @click="clearInput"></image>
			</view>
			<view class="input-area">
				<input v-model="password" :type="type" value="" placeholder="请输入密码" />
				<image class="eye" :src="src" mode="" @click="chooseType"></image>
			</view>
			<!-- 输入框 end -->
			<!-- 按钮 start -->
			<view @click="handleLogin">
				<uButton text="登录" />
			</view>
			<!-- 按钮 start -->
			<!-- 忘记密码 start -->
			<navigator url="/pages/login/forgot" hover-class="none" class="forgot">
				忘记密码？
			</navigator>
			<!-- 忘记密码 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import { login } from '@/common/api/api.js'
	import { isMobile } from '@/tools/verify/verify.js'
	import { showToast } from '@/tools/util/util.js'
	export default {
		name: 'Password',
		components: {
			XesNavbar,
			uButton
		},
		data() {
			return {
				mobile: '', // 手机
				password: '', // 密码
				type: 'password', // 输入框类型
				src: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/eyeclose%402x.png'
			}
		},
		methods: {
			// 是否显示密码
			chooseType() {
				if (this.type === 'password') {
					this.type = 'text'
					this.src = 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/eye%402x.png'
				} else {
					this.type = 'password'
					this.src = 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/login/eyeclose%402x.png'
				}
			},
			// 点击登录按钮
			handleLogin() {
				if (!isMobile(this.mobile)) {
					showToast('请输入正确的手机号码')
					return false
				}
				
				if (this.password === '') {
					showToast('密码不能为空')
					return false
				}
				
				login({
					login_tel: this.mobile,
					password: this.password
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
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/login.scss'
</style>
