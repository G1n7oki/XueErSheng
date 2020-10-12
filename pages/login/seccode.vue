<template>
	<view class="contaier">
		<xes-navbar 
			title="验证码"
			:is-arrow="true"
			text-align="center"
		/>
		<view class="inner">
			<view class="title">
				输入验证码
			</view>
			<view class="tips">
				验证码已发送至{{ mobile }}
			</view>
			<view class="seccode">
				<Seccode ref="code" :maxlength="6" :isPwd="false" @finish="getCode" />
			</view>
			<view class="resend">
				还没收到验证码？<text @click="resend">重新发送</text>
			</view>
			<view @click="handleLogin">
				<uButton text="登录" />
			</view>
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
				code: '',
				mobile: '',
				timer: null
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
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 1500)
				}).catch(error => {
					showToast(error.data.message)
				})
			},
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
	.inner {
		padding: 0 70upx;
		
		.title {
			font-size: 44upx;
			font-weight: bold;
			color: #303133;
			margin-top: 108upx;
		}
		
		.tips {
			margin-top: 33upx;
			font-size: 28upx;
			font-weight: 500;
			color: #606266;
		}
		
		.seccode {
			margin-top: 80upx;
		}
		
		.resend {
			margin-top: 42upx;
			font-size: 28upx;
			font-weight: 500;
			color: #909399;
			text-align: center;
			
			text {
				color: #1283FF;
			}
		}
		
		// button {
		// 	width: 612upx;
		// 	height: 80upx;
		// 	line-height: 80upx;
		// 	font-size: 32upx;
		// 	font-weight: 500;
		// 	color: #FFFFFF;
		// 	background-color: #1283FF;
		// 	border-radius: 10upx;
		// 	margin-top: 163upx;
		// }
	}
</style>
