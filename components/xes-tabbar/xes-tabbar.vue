<template>
	<view class="xrs-tabbar">
		<!-- 图标组 start -->
		<view class="navbar-icons">
			<view class="navbar-icons__cell" @click="clock">
				<!-- 计时器 start -->
				<image class="u-clock__icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/shijian%402x.png" mode=""></image>
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
			<view class="navbar-icons__cell" @click="show('answer-dialog')">
				<image class="navbar-icons--cell--icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/datika%402x.png" mode=""></image>
				<view class="navbar-icons--cell--text" style="font-size: 24rpx;">
					{{ current }}/{{ total }}
				</view>
			</view>
			<view class="navbar-icons__cell" @click="show('papers-dialog')">
				<image class="navbar-icons--cell--icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/jiaojuan%402x.png" mode=""></image>
				<view class="navbar-icons--cell--text">
					交卷
				</view>
			</view>
			<view class="navbar-icons__cell" @click="show('set-dialog')">
				<image class="navbar-icons--cell--icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/shezhi%402x.png" mode=""></image>
				<view class="navbar-icons--cell--text">
					设置
				</view>
			</view>
		</view>
		<!-- 图标组 end -->
		<!-- 交卷弹窗 start -->
		<uni-popup ref="papers-dialog" type="center">
			<view class="papers-dialog">
				<view class="papers-dialog__inner">
					<view class="papers-dialog__inner--title">
						提示
					</view>
					<view class="papers-dialog__inner--content">
						亲, 还有{{ unfinished }}道题目未完成
					</view>
					<view class="papers-dialog__inner--item" @click="handleUnfinished">
						查看未完成的题目
					</view>
					<view class="papers-dialog__inner--item" @click="handleHand">
						继续提交
					</view>
					<view class="papers-dialog__inner--item" @click="hide('papers-dialog')">
						关闭
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 交卷弹窗 end -->
		<!-- 答题卡 start -->
		<uni-popup ref="answer-dialog" type="bottom">
			<scroll-view scroll-y="true" class="answer-sheet">
				<view class="answer-sheet-close" @click="hide('answer-dialog')">
					<uni-icons type="closeempty" :size="22" color="#C0C4CC" />
				</view>
				<view class="answer-sheet-tips">
					<view class="finished">
						已答：<text class="text">{{ finished }}</text>
					</view>
					<view class="unfinished">
						未答：<text class="text">{{ unfinished }}</text>
					</view>
				</view>
				<view class="answer-sheet-item">
					<view 
						class="item"
						:class="{'active': item.analysis === true}"
						v-for="(item, index) in list"
						:key="index"
					>
						{{ index + 1}}
					</view>
				</view>
			</scroll-view>
			<view class="answer-sheet-button">
				<view class="inner">提交练习</view>
			</view>
		</uni-popup>
		<!-- 答题卡 end -->
		<!-- 设置遮罩 start -->
		<uni-popup ref="set-dialog" type="center">
			<view class="set-mask" @click="hide('set-dialog')">
				<view class="set-dialog" :style="{top: top}">
					<view class="triangle"></view>
					<view class="item-area">
						<!-- <view class="item" @click="handleItem">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/yejianmoshi%402x.png" mode=""></image>
							<view class="name">
								夜间模式
							</view>
						</view>
						<view class="item">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/ziti%402x.png" mode=""></image>
							<view class="name">
								字体放大
							</view>
						</view> -->
						<navigator url="/pages/topics/correction" hover-class="none" class="item">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/jiucuo%402x.png" mode=""></image>
							<view class="name">
								题目纠错
							</view>
						</navigator>
						<view class="item">
							<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/topics/tiwen%402x.png" mode=""></image>
							<view class="name">
								我要提问
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 设置遮罩 end -->
	</view>
	
</template>

<script>
	import UniPopup from '@/components/uni-popup/uni-popup.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import { topics_hand } from '@/common/api/api.js'
	export default {
		name: 'XrsTabbar',
		components: {
			UniPopup,
			UniIcons
		},
		data() {
			return {
				minute: '00',
				second: '00',
				timer: null,
				count: 0,
				isShowPapers: false,
				top: 0,
				unfinished: 0,
				finished: 0
			}
		},
		created() {
			this.start()
			
			const statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			
			this.top = statusBarHeight + 36 + 'px'
		},
		props: {
			current: {
				type: Number,
				default: 0
			},
			total: {
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default: function () {
					return []
				}
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
			show(str) {
				this.$refs[str].open()
			},
			hide(str) {
				this.$refs[str].close()
			},
			// 点击查看未完成的题目
			handleUnfinished() {
				this.$refs['papers-dialog'].close()
				this.$refs['answer-dialog'].open()
			},
			handleItem() {
				console.log('111')
			},
			// 交卷
			async handleHand() {
				const response = await topics_hand({
					paper_id: '',
					finish: 0,
					profession_id: uni.getStorageSync('profession_id'),
					total: this.total,
					time: this.count,
					exam_id: '',
					answer_json: []
				})
			}
		},
		watch: {
			list(newValue) {
				const finished = []
				newValue.map(item => {
					if (item.choose) {
						finished.push(item)
					}
				})
				this.finished = finished.length
				this.unfinished = newValue.length - this.finished
			}
		}
	}
</script>

<style lang="scss">
	// 选项卡
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
		.papers-dialog__inner {
			width: 500upx;
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
		
		// 答题卡
		.answer-sheet {
			width:100%;
			height: 630upx;
			box-sizing: border-box;
			background-color: #fff;
			position: relative;
			padding: 0 34upx;
		}
		
		.answer-sheet-close {
			position: fixed;
			top: 20upx;
			right: 20upx;
			z-index: 10;
		}
		
		.answer-sheet-tips {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 80upx;
			position: fixed;
			top: 0;
			left: 0;
			background-color: #fff;
			
			.finished {
				font-size: 32upx;
				font-weight: bold;
				color: #303133;
				
				.text {
					color: #1283FF;
				}
			}
			
			.unfinished {
				font-size: 32upx;
				font-weight: bold;
				color: #303133;
				margin-left: 20upx;
			}
		}
		
		.answer-sheet-item {
			display: flex;
			flex-wrap: wrap;
			margin-top: 100upx;
			
			.item {
				width: 64upx;
				height: 64upx;
				background: #F0F0F0;
				border-radius: 50%;
				margin-right: 70upx;
				text-align: center;
				line-height: 64upx;
				color: #909399;
				margin-bottom: 50upx;
				
				&:nth-child(5n) {
					margin-right: 0;
				}
				
				&.active {
					background-color: #1283FF;
					color: #fff;
				}
			}
		}
		
		.answer-sheet-button {
			border-top: 1px solid #DEDEDE;
			background-color: #fff;
			padding: 24upx 0;
			
			.inner {
				width: 682upx;
				height: 80upx;
				background: #007AFF;
				border-radius: 12upx;
				font-size: 32upx;
				font-weight: 500;
				color: #FFFFFF;
				text-align: center;
				line-height: 80upx;
				margin: 0 auto;
			}
		}
		
		// 设置弹窗
		.set-dialog {
			width: 240upx;
			position: fixed;
			left: 226upx;
			
			.triangle {
				width: 0;
				height: 0;
				border-left: 14upx solid transparent;
				border-right: 14upx solid transparent;
				border-bottom: 22upx solid #fff;
				position: absolute;
				top: 0;
				right: 22upx;
			}
			
			.item-area {
				border-radius: 12upx;
				background-color: #fff;
				margin-top: 22upx;
				
				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 90upx;
					border-bottom: 1px solid #DEDEDE;
					
					&:nth-last-child(1) {
						border: none;
					}
					
					.icon {
						width: 32upx;
						height: 32upx;
						margin-right: 20upx;
					}
					
					.name {
						font-size: 28upx;
						font-weight: 500;
						color: #303133;
					}
				}
			}
		}
		
		.set-mask {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .2);
			position: fixed;
			top: 0;
			left: 0;
		}
</style>
