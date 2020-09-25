<template>
	<view class="u-button">
		<button 
			:class="className"
			:style="{backgroundColor: background}"
			hover-class="none"
			type="default"
		>
			{{ text }}
		</button>
	</view>
</template>

<script>
	export default {
		name: 'uButton',
		data() {
			return {
				className: ''
			}
		},
		props: {
			// large medium samll mini
			size: {
				type: String,
				default: 'large'
			},
			// 按钮的文本
			text: {
				type: String,
				default: ''
			},
			// 按钮的背景颜色
			background: {
				type: String,
				default: '#1283FF'
			},
			color: {
				type: String,
				default: ''
			}
		},
		created() {
			this.className = this.size === 'large' ? 'large' : this.size === 'medium' ? 'medium' : 'small'
		}
	}
</script>

<style lang="scss">
	.large {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		border-radius: 10upx;
		margin-top: 120upx;
		font-size: 32upx;
		font-weight: 500;
		color: #FFFFFF !important;
	}
	
	.small {
		width: 108upx;
		height: 56upx;
		background-color: #1283FF;
		border-radius: 28upx;
		font-size: 28upx;
		font-weight: 500;
		line-height: 56upx;
		color: #FFFFFF !important;
	}
</style>
