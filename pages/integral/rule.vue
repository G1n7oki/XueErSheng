<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="积分规则"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<view class="content">
			<rich-text :nodes="node"></rich-text>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Rule',
		comments: {
			XesNavbar
		},
		data() {
			return {
				node: '<div>富文本</div>'
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 42upx 32upx;
	}
</style>
