<template>
	<view class="contaier">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="修改昵称"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 按钮 start -->
		<view>
			<u-button text="完成" />
		</view>
		<!-- 按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'Nickname',
		components: {
			XesNavbar,
			uButton
		}
	}
</script>

<style lang="scss">
	
</style>
