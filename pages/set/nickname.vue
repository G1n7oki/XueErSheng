<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="修改昵称"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 用户昵称 start -->
		<input class="nickname-input" type="text" v-model="value" />
		<!-- 用户昵称 end -->
		<!-- 按钮 start -->
		<view class="nickname-button" @click="confirm">
			<u-button text="完成" />
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import { set_nickname } from '@/common/api/api.js'
	export default {
		name: 'Nickname',
		components: {
			XesNavbar,
			uButton
		},
		data() {
			return {
				value: ''
			}
		},
		onLoad(options) {
			this.value = options.nickname
		},
		methods: {
			// 确认修改
			async confirm() {
				if (this.value === '') {
					uni.showToast({
						icon: 'none',
						title: '取个好听的名字吧'
					})
					return false
				}
				
				const response = await set_nickname({
					name: this.value
				})
				
				uni.showToast({
					icon: 'none',
					title: '修改成功'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 昵称输入框
	.nickname-input {
		width: 686upx;
		height: 100upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 20upx auto 0;
		font-size: 28upx;
		font-weight: 500;
		box-sizing: border-box;
		padding-left: 32upx;
	}
	// 修改昵称按钮
	.nickname-button {
		width: 686upx;
		margin: 0 auto;
	}
</style>
