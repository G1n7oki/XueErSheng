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
				<input v-model="mobile" type="text" value="" placeholder="请输入手机号" />
				<image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image>
			</view>
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
				<!-- <image src="" mode=""></image> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				mobile: ''
			}
		},
		methods: {
			clearInput () {
				this.mobile = ''
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/login.scss'
</style>
