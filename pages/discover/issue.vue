<template>
	<view class="container">
		<XesNavbar
			title="发布圈子"
			:is-arrow="true"
			text-align="center"
		/>
		<textarea value="" placeholder="灵感稍纵即逝，赶紧记录下来吧~" />
		<view class="image-group">
			<image src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/add%402x.png" mode=""></image>
		</view>
		<view class="tips">
			小提示:个人发布的信息，将在圈子中出现
		</view>
		<uButton text="发布" />
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Issue',
		components: {
			XesNavbar,
			uButton
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 0 32upx;
	}
	
	textarea {
		width: 100%;
		height: 307upx;
		margin-top: 38upx;
	}
	
	.tips {
		font-size: 24upx;
		font-weight: 500;
		color: #90949A;
	}
	
	.image-group {
		display: flex;
		margin-bottom: 25upx;
			
		image {
			width: 200upx;
			height: 200upx;
		}
	}
</style>
