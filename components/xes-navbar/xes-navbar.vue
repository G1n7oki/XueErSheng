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
				<view class="navbar-arrow-line" :class="{'active': isArrowColor === 'white' }" v-if="isArrow && isArrowType === 'line'" @click="handleArrow"></view>
				<view 
					v-if="isTitle"
					class="navbar-title"
					:style="{'justify-content': textAlign, 'margin-left': margin + 'rpx', color: color}"
					@click="handleCourseList"
				>
					{{ title }}
					<uni-icons 
						style="margin-left: 18rpx;"
						color="#0A0A0A"
						size="16"
						type="arrowdown"
						v-if="isTitleIcon"
					/>
				</view>
				<!-- 覆盖物 -->
				<slot></slot>
			</view>
		</view>
		<view v-if="isEmpty" class="navbar-empty" :style="{height: statusBarHeight + 42 + 'px'}"></view>
	</view>
</template>

<script>
	/**
	 * 导航栏组件
	 * @property {String} title 导航栏标题
	 * @property {String} color 导航栏标题字体颜色
	 * @property {String} backgroundColor 导航栏背景颜色
	 * @property {Boolean} isArrow 导航栏是否显示箭头
	 * @property {String} textAlign 导航栏标题文字所在的位置
	 * @property {String} isArrowType 导航栏箭头类型
	 * @property {Boolean} isEmpty 导航栏定位时是否需要空元素占位
	 * @property {Number} margin 标题和边界的空隙
	 * @property {Boolean} isTitleIcon 是否显示标题旁的icon
	 * @property {Boolean} isTitle 是否显示标题
	 * @property {String} isArrowColor 线体箭头的颜色
	 * @event {Function} handleCourseList 控制元素显示隐藏 
	 * @event {Function} handleArrow 返回上一级页面
	 * */
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'XesNavbar',
		components: { 
			UniIcons
		},
		props: {
			// 导航栏标题
			title: {
				type: String,
				default: ''
			},
			// 标题字体颜色
			color: {
				type: String,
				default: '#303133'
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
				default: ''
			},
			// 箭头类型 image, line
			isArrowType: {
				type: String,
				default: 'line'
			},
			// 箭头颜色
			isArrowColor: {
				type: String,
				default: 'black'
			},
			// 是否需要空元素占位
			isEmpty: {
				type: Boolean,
				default: true
			},
			margin: {
				type: Number,
				default: 0
			},
			isTitleIcon: {
				type: Boolean,
				default: false
			},
			// 是否显示标题
			isTitle: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				// 手机状态栏高度
				statusBarHeight: 0,
				showCourseList: false
			}
		},
		created() {
			// 获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
		},
		methods: {
			// 点击返回回到上一页
			handleArrow() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 控制是否显示课程列表
			handleCourseList() {
				this.showCourseList = !this.showCourseList
				this.$emit('showCourseList', this.showCourseList)
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
				
				&.active {
					border-bottom: 2px solid #fff;
					border-left: 2px solid #fff;
				}
			}
			
			.navbar-title {
				display: flex;
				align-items: center;
				width: 100%;
				font-size: 40upx;
				font-weight: bold;
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
