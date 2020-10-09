<template>
	<view class="contaier">
		<xes-navbar
			title="忘记密码"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="inner">
			<view class="title">
				忘记密码
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入手机号" />
				<!-- <image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image> -->
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入验证码" />
				<view class="text">
					获取验证码
				</view>
			</view>
			<view class="input-area">
				<input v-model="password" :type="type" value="" placeholder="请输入密码" />
				<image class="eye" :src="src" mode="" @click="chooseType"></image>
			</view>
			<uButton text="登录" />
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Forgot',
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
	@import '../../static/scss/forgot.scss'
</style>
