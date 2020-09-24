<template>
	<view class="navbar-area">
		<view
			class="navbar" 
			:style="{paddingTop: statusBarHeight + 'px', backgroundColor: backgroundColor}"
		>
			<view class="navbar-content">
				<view class="navbar-arrow-image" v-if="isArrow && isArrowType === 'image'" @click="handleArrow">
					<image class="image" src="/static/image/study/return.png" mode=""></image>
				</view>
				<view class="navbar-arrow-line" v-if="isArrow && isArrowType === 'line'" @click="handleArrow"></view>
				<view class="navbar-title" :style="{textAlign: textAlign}">
					{{ title }}
				</view>
			</view>
		</view>
		<view v-if="isEmpty" class="navbar-empty" :style="{height: statusBarHeight + 42 + 'px'}"></view>
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
				default: '#fff'
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
			},
			// 箭头类型 image, line
			isArrowType: {
				type: String,
				default: 'line'
			},
			// 是否需要空元素占位
			isEmpty: {
				type: Boolean,
				default: true
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
		},
		methods: {
			// 点击返回回到上一页
			handleArrow() {
				uni.navigateBack({
					delta: 1
				})
			}
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
			z-index: 999;
			
			.navbar-content {
				display: flex;
				align-items: center;
				width: 100%;
				height: 42px;
				position: relative;
			}
			
			.navbar-arrow-image {
				position: absolute;
				top: 50%;
				left: 32upx;
				transform: translateY(-50%);
				
				.image {
					width: 54upx;
					height: 54upx;
				}
			}
			
			.navbar-arrow-line {
				width: 20upx;
				height: 20upx;
				position: absolute;
				top: 50%;
				left: 32upx;
				border-bottom: 2px solid #000;
				border-left: 2px solid #000;
				transform: translateY(-50%) rotate(45deg);
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
