<template>
	<view class="container">
		<xes-navbar 
			title="我的卡包"
			text-align="center"
			:is-arrow="true"
		/>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Card',
		components: {
			XesNavbar
		}
	}
</script>

<style lang="scss">
	
</style>
