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
				验证码已发送至18870322365
			</view>
			<!-- 提示 end -->
			<!-- 输入框 start -->
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入验证码" />
				<view class="text">
					获取验证码
				</view>
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请输入新密码" />
				<!-- <image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image> -->
			</view>
			<view class="input-area">
				<input v-model="mobile" type="text" value="" placeholder="请再次输入新密码" />
				<!-- <image class="close" src="/static/image/login/close.png" mode="" @click="clearInput"></image> -->
			</view>
			<!-- 输入框 end -->
			<!-- 按钮 start -->
			<uButton text="登录" />
			<!-- 按钮 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Modify',
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
	@import '~@/static/scss/login.scss'
</style>
