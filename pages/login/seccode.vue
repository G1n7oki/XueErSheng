<template>
	<view class="contaier">
		<NavBar 
			title="验证码"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="inner">
			<view class="title">
				输入验证码
			</view>
			<view class="tips">
				验证码已发送至18770322365
			</view>
			<view class="seccode">
				<Seccode ref="code" :maxlength="6" :isPwd="false" @finish="getCode" />
			</view>
			<view class="resend">
				还没收到验证码？<text>重新发送</text>
			</view>
			<uButton text="登录" />
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import Seccode from '@/components/seccode/seccode.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Seccode',
		components: {
			NavBar,
			Seccode,
			uButton
		},
		data() {
			return {
				code: ''
			}
		},
		methods: {
			getCode(val) {
				this.code = val
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/seccode.scss'
</style>
