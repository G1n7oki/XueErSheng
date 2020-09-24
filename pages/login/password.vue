<template>
	<view class="contaier">
		<NavBar
			title="密码登陆"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="inner">
			<view class="title">
				密码登陆
			</view>
			<view class="tips">
				用户可在我的中修改登录密码
			</view>
			<uInput placeholder="请输入手机号" />
			<uInput placeholder="请输入密码" is-icon-type="eye" />
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import uInput from '@/components/uInput/uInput.vue'
	export default {
		name: 'Password',
		components: {
			NavBar,
			uInput
		},
		data() {
			return {}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/password.scss'
</style>
