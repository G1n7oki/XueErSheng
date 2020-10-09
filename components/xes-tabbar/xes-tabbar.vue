<template>
	<view class="xrs-tabbar">
		<!-- 图标组 start -->
		<view class="navbar-icons">
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
		<!-- 交卷弹窗 start -->
		<view class="papers-dialog" v-if="isShowPapers">
			<view class="papers-dialog__inner">
				<view class="papers-dialog__inner--title">
					提示
				</view>
				<view class="papers-dialog__inner--content">
					亲, 还有39道题目未完成
				</view>
				<view class="papers-dialog__inner--item">
					查看未完成的题目
				</view>
				<view class="papers-dialog__inner--item">
					继续提交
				</view>
				<view class="papers-dialog__inner--item" @click="closePaper">
					关闭
				</view>
			</view>
		</view>
		<!-- 交卷弹窗 end -->
	</view>
</template>

<script>
	export default {
		name: 'XrsTabbar',
		data() {
			return {
				minute: '00',
				second: '00',
				timer: null,
				count: 0,
				isShowPapers: false
			}
		},
		created() {
			this.start()
		},
		props: {
			current: {
				type: Number,
				default: 0
			},
			total: {
				type: Number,
				default: 0
			}
		},
		methods: {
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
				this.isShowPapers = true
			},
			closePaper() {
				this.isShowPapers = false
			}
		}
	}
</script>

<style lang="scss">
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
	
	// 交卷弹窗
		.papers-dialog {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .3);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9999;
		}
		
		.papers-dialog__inner {
			width: 60%;
			padding: 20upx 0 0;
			border-radius: 20upx;
			position: absolute;
			top: 50%;
			left: 50%;
			background-color: #fff;
			transform: translate(-50%, -50%);
		}
		
		.papers-dialog__inner--title {
			font-size: 32upx;
			font-weight: bold;
			text-align: center;
		}
		
		.papers-dialog__inner--content {
			text-align: center;
			margin: 20upx 0;
		}
		
		.papers-dialog__inner--item {
			border-top: 1px solid #dedede;
			padding: 20upx 0;
			text-align: center;
			font-size: 28upx;
			color: #1283FF;
		}
</style>
