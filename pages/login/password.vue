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
				<image class="close" src="http://dummyimage.com/120x600" mode="" @click="clearInput"></image>
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
				mobile: '',
				password: '',
				type: 'password',
				src: 'http://dummyimage.com/120x600'
			}
		},
		methods: {
			chooseType() {
				if (this.type === 'password') {
					this.type = 'text'
					this.src = 'http://dummyimage.com/120x600'
				} else {
					this.type = 'password'
					this.src = 'http://dummyimage.com/120x600'
				}
			},
			handleLogin() {
				if (!isMobile(this.mobile)) {
					showToast('请输入正确的手机号码')
					return false
				}
				
				if (this.password === '') {
					showToast('密码不能为空')
					return false
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/login.scss'
	
	// .inner {
	// 	padding: 0 70upx;
		
	// 	.title {
	// 		font-size: 44upx;
	// 		font-weight: bold;
	// 		color: #303133;
	// 		margin-top: 108upx;
	// 	}
		
	// 	.tips {
	// 		margin-top: 33upx;
	// 		font-size: 28upx;
	// 		font-weight: 500;
	// 		color: #606266;
	// 		margin-bottom: 100upx;
	// 	}
		
	// 	.input-area {
	// 		position: relative;
			
	// 		input {
	// 			height: 92upx;
	// 			border-bottom: 1px solid #F5F5F5;
	// 			font-size: 28upx;
	// 		}
			
	// 		.close {
	// 			width: 29upx;
	// 			height: 29upx;
	// 			position: absolute;
	// 			top: 50%;
	// 			right: 0;
	// 			transform: translateY(-50%);
	// 			z-index: 10;
	// 		}
			
	// 		.eye {
	// 			width: 35upx;
	// 			height: 30upx;
	// 			position: absolute;
	// 			top: 50%;
	// 			right: 0;
	// 			transform: translateY(-50%);
	// 			z-index: 10;
	// 		}
	// 	}
		
	// 	navigator {
	// 		font-size: 26upx;
	// 		font-weight: 500;
	// 		color: #1283FF;
	// 		text-align: right;
	// 		margin-top: 30upx;
	// 	}
	// }
</style>
