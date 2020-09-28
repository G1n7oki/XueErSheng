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
				<view v-if="isTitle" class="navbar-title" :style="{'justify-content': textAlign, margin: margin + 'rpx'}">
					{{ title }}
					<uni-icons 
						style="margin-left: 18rpx;"
						color="#0A0A0A"
						size="16"
						type="arrowdown"
						@click="handleCourseList"
						v-if="isTitleIcon"
					/>
				</view>
				<!-- 图标组 start -->
				<view v-if="isIcons" class="navbar-icons">
					<view class="navbar-icons__cell" @click="clock">
						<!-- 计时器 start -->
						<image class="u-clock__icon" src="/static/image/topics/shijian@2x.png" mode=""></image>
						<view class="u-clock__text">
							<view class="u-clock__text--item">
								{{ minute }}:
							</view>
							<view class="u-clock__text--item">
								{{ second }}
							</view>
						</view>
						<!-- 计时器 end -->
					</view>
					<view class="navbar-icons__cell">
						<image class="navbar-icons--cell--icon" src="/static/image/topics/datika@2x.png" mode=""></image>
						<view class="navbar-icons--cell--text" style="font-size: 24rpx;">
							{{ current }}/{{ total }}
						</view>
					</view>
					<view class="navbar-icons__cell" @click="papers">
						<image class="navbar-icons--cell--icon" src="/static/image/topics/jiaojuan@2x.png" mode=""></image>
						<view class="navbar-icons--cell--text">
							交卷
						</view>
					</view>
					<view class="navbar-icons__cell">
						<image class="navbar-icons--cell--icon" src="/static/image/topics/shezhi@2x.png" mode=""></image>
						<view class="navbar-icons--cell--text" @click="toSet">
							设置
						</view>
					</view>
				</view>
				<!-- 图标组 end -->
			</view>
		</view>
		<view v-if="isEmpty" class="navbar-empty" :style="{height: statusBarHeight + 42 + 'px'}"></view>
	</view>
</template>

<script>
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'NavBar',
		components: { 
			UniIcons
		},
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
				default: ''
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
			},
			// 是否显示按钮组
			isIcons: {
				type: Boolean,
				default: false
			},
			// 当前练习题目的索引
			current: {
				type: Number,
				default: 0
			},
			// 题目总数
			total: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// 手机状态栏高度
				statusBarHeight: 0,
				showCourseList: false,
				minute: '00',
				second: '00',
				timer: null,
				count: 0
			}
		},
		created() {
			// 获取手机状态栏高度
			this.statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			
			// 是否需要计时器
			if (this.isIcons) {
				this.start()
			}
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
			},
			// 补零
			fillZero(num) {
				if (num < 10) {
					return '0' + num
				}
				return num
			},
			// 开始计时
			start() {
				this.timer = setInterval(() => {
					this.count++
					// 设置秒
					this.second = this.fillZero(this.count % 60)
					// 设置分
					this.minute = this.fillZero(parseInt(this.count / 60) % 60)
				}, 1000)
			},
			// 暂停计时
			pause() {
				const that = this
				clearInterval(this.timer)
				uni.showModal({
					title: `已用时${that.minute}:${that.second}`,
					content: '休息一下',
					showCancel: false,
					confirmText: '继续做题',
					success() {
						that.start()
					}
				})
			},
			clock() {
				this.pause()
			},
			// 交卷
			papers() {
				this.$emit('showPapers', true)
			},
			// 跳转设置页
			toSet() {
				
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
				display: flex;
				align-items: center;
				width: 100%;
				font-size: 40upx;
				font-weight: bold;
				color: #303133;
			}
			
			.navbar-icons {
				display: flex;
				position: absolute;
				left: 90upx;
				top: 50%;
				transform: translateY(-50%);
			}
			
			.navbar-icons__cell {
				margin-right: 60upx;
				text-align: center;
			}
			
			.navbar-icons--cell--icon {
				width: 32upx;
				height: 32upx;
			}
			
			.navbar-icons--cell--text {
				font-size: 20upx;
				font-weight: 500;
				color: #606266;
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
	
	.u-clock__icon {
		width: 32upx;
		height: 32upx;
	}
	
	.u-clock__text {
		display: flex;
	}
	
	.u-clock__text--item {
		font-size: 24upx;
		color: #606266;
	}
</style>
