<template>
	<view class="view-contaier" @click="handleView">
		<view class="view-text">
			{{ text }}
		</view>
		<view class="view-arrow"></view>
	</view>
</template>

<script>
	export default {
		name: 'ViewMore',
		props: {
			text: {
				type: String,
				default: '全部'
			},
			url: {
				type: String,
				default: ''
			}
		},
		methods: {
			handleView() {
				if (this.url === '') {
					return false
				}
				uni.navigateTo({
					url: this.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.view-contaier {
		display: flex;
		align-items: center;
		
		.view-text {
			font-size: 24upx;
			color: #606266;
			margin-right: 8upx;
		}
		
		.view-arrow {
			width: 10upx;
			height: 10upx;
			border-right: 1px solid #606266;
			border-top: 1px solid #606266;
			transform: rotate(45deg);
		}
	}
</style>
