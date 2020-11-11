<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="提问"
			text-align="center"
			:is-arrow="true"
		>
		</xes-navbar>
		<!-- 导航栏 end -->
		<!-- 提示 start -->
		<input class="tips" type="text" value="" placeholder="写下您的问题" />
		<!-- 提示 end -->
		<!-- 文本框 start -->
		<textarea  value="" placeholder="请简述您遇到的问题和困难点，便于老师针对难点进行 解答。" />
		<!-- 文本框 end -->
		<!-- 图片 start -->
		<view class="">
			<image class="image" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/add%402x.png" mode=""></image>
		</view>
		<!-- 图片 end -->
		<!-- 小提示 start -->
		<view class="text">
			小提示:最多可上传4张照片哦
		</view>
		<!-- 小提示 end -->
		<view>
			<u-button text="提交" />
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Ask',
		components: {
			XesNavbar,
			uButton
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 32upx;
	}
	// 提示
	.tips {
		padding: 34upx 0;
		font-size: 28upx;
		font-weight: 500;
		color: #909399;
		border-bottom: 1px solid #DEDEDE;
	}
	// 文本框
	textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 34upx 0;
		font-size: 28upx;
		font-weight: 500;
	}
	// 图片
	.image {
		width: 200upx;
		height: 200upx;
	}
	// 小提示
	.text {
		font-size: 24upx;
		font-weight: 500;
		color: #909399;
		margin-top: 15upx;
	}
</style>
