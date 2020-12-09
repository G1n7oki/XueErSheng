<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="协议"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 富文本 start -->
		<view class="rich-text">
			<rich-text :nodes="nodes"></rich-text>
		</view>
		<!-- 富文本 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import { protocol } from '@/common/api/api.js'
	export default {
		name: 'Agrement',
		components: {
			XesNavbar
		},
		data() {
			return {
				nodes: ''
			}
		},
		onLoad() {
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await protocol()
				const { content } = response.data.data
				this.nodes = content
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	.rich-text {
		padding: 32upx;
	}
</style>
