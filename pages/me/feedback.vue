<template>
	<view class="container">
		<!-- 导航栏 start -->
		<XesNavbar 
			title="意见反馈"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 内容输入区域 start -->
		<textarea 
			v-model="value"
			placeholder="请输入您的意见或建议，以便我们更好的改进~"
			:maxlength="-1"
		/>
		<!-- 内容输入区域 end -->
		<!-- 按钮 start -->
		<view class="button" @click="handleSubmit">
			<uButton text="提交" />
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Feedback',
		components: {
			XesNavbar,
			uButton
		},
		data() {
			return {
				value: '' // 提交的内容
			}
		},
		methods: {
			// 提交
			handleSubmit() {
				if (this.value === '') {
					uni.showToast({
						icon: 'none',
						title: '至少写点东西吧!'
					})
					return false
				} 
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 内容输入区域
	textarea {
		display: block;
		width: 686upx;
		height: 300upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 20upx auto 0;
		padding: 30upx;
		box-sizing: border-box;
		font-size: 28upx;
	}
	// 按钮
	.button {
		width: 686upx;
		margin: 0 auto;
	}
</style>
