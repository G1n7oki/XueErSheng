<template>
	<view class="navbar-area">
		<view
			class="navbar" 
			:style="{paddingTop: statusBarHeight + 'px', backgroundColor: backgroundColor}"
		>
			<view class="navbar-content">
				<view class="navbar-arrow" v-if="isArrow"></view>
				<view class="navbar-title" :style="{textAlign: textAlign}">
					{{ title }}
				</view>
			</view>
		</view>
		<view class="navbar-empty" :style="{height: statusBarHeight + 42 + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name: 'NavBar',
		props: {
			// 导航栏标题
			title: {
				type: String,
				default: ''
			},
			// 导航栏背景颜色
			backgroundColor: {
				type: String,
				default: '#000000'
			},
			// 是否显示返回箭头
			isArrow: {
				type: Boolean,
				default: false
			},
			// 字体是否居中
			textAlign: {
				type: String,
				default: 'left'
			}
		},
		data() {
			return {
				// 手机状态栏高度
				statusBarHeight: 0
			}
		},
		created() {
			//获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
		}
	}
</script>

<style lang="scss">
	.navbar-area {
		
		.navbar {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			box-sizing: border-box;
			padding-left: 32upx;
			
			.navbar-content {
				display: flex;
				align-items: center;
				width: 100%;
				height: 42px;
				position: relative;
			}
			
			.navbar-arrow {
				width: 20upx;
				height: 20upx;
				position: absolute;
				bottom: 20upx;
				left: 10upx;
				border-bottom: 2px solid #000;
				border-left: 2px solid #000;
				transform: rotate(45deg);
			}
			
			.navbar-title {
				width: 100%;
				font-size: 40upx;
				font-weight: bold;
				color: #303133;
			}
			
			.navbar-cover {
				position: absolute;
				top: 50%;
				left: 50%;
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
				transform: translate(-50%, -50%);
			}
		}
	}
</style>
