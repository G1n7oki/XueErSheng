<template>
	<view class="beautiful-title">
		<view class="name" :style="{color: color}">
			{{ name }}
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		name: 'Title',
		props: {
			name: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#303133'
			}
		}
	}
</script>

<style lang="scss">
	.beautiful-title {
		display: inline-block;
		position: relative;
		
		.name {
			font-size: 32upx;
			font-weight: bold;
		}
		
		.line {
			width: 100%;
			height: 10upx;
			border-radius: 5upx;
			opacity: .3;
			background-color: #1283FF;
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}
</style>
