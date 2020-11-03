<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="AI智能测评"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<view class="content">
			<!-- 巨幕 start -->
			<view class="jumbotron">
				<view class="box">
					<view class="total">
						<view class="point">
							150.0
						</view>
						<view class="text">
							总分值
						</view>
					</view>
					<view class="professional">
						<view class="name">
							金融管理学本科
						</view>
						<navigator url="/pages/professional/professional" hover-class="none" class="choose">
							<view class="text">
								切换专业
							</view>
							<uni-icons type="arrowright" :size="14" />
						</navigator>
					</view>
				</view>
				<view class="tips">
					<view class="text-large">
						AI智能评估值
					</view>
					<view class="text-small">
						通过5个维度对您进行评估
					</view>
				</view>
				<view class="charts-area">
					<view class="info">
						<view class="text today">
							30 <text>min</text>
						</view>
						<view class="text amount">
							30 <text>道</text>
						</view>
						<view class="text accuracy">
							30 <text>%</text>
						</view>
						<view class="text liveness">
							30 <text>%</text>
						</view>
						<view class="text continuous">
							30 <text>min</text>
						</view>
					</view>
					<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @click="touchLine"></canvas>
				</view>
			</view>
			<!-- 巨幕 end -->
			<!-- 用户信息 start -->
			<view class="user-box">
				<image class="avatar" src="http://dummyimage.com/136x136" mode=""></image>
				<view class="nickname">
					草长莺飞小虫虫
				</view>
				<view class="signature">
					<image class="quotes" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/quotes-left.png" mode=""></image>
					<view class="text">
						只争朝夕，不负韶华
					</view>
					<image class="quotes" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/quotes-right.png" mode=""></image>
				</view>
				<button class="button" open-type="share">分享给好友</button>
			</view>
			<!-- 用户信息 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import uCharts from '@/tools/uChart/u-charts.min.js'
	export default {
		name: 'AI',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				cWidth: 310,
				cHeight: 270,
				chartData: {
					categories: ['今日学习', '练题数量', '正确率', '活跃度', '连续学习'],
					series: [{
						name: '',
						data: [30, 30, 30, 30, 30],
						color: '#CCD2FD',
					}]
				},
				shareData: {
					avatar: 'http://dummyimage.com/136x136',
					nickname: '屌爆了',
					total: '150.0',
					professional: '金融管理学本科',
					today: 30,
					amount: 30,
					accuracy: 30,
					liveness: 30,
					continuous: 30,
					series: [30, 30, 30, 30, 30]
				}
			}
		},
		onLoad() {
			this.showRadar('canvasRadar', this.chartData)
		},
		// 页面分享
		onShareAppMessage() {
			this.shareData = JSON.stringify(this.shareData)
			
			return {
				title: 'AI智能评测',
				path: '/pages/me/ai-share?data=' + this.shareData
			}
		},
		methods: {
			showRadar(canvasId, chartData) {
				new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'radar',
					fontSize: 12,
					legend: {show: false},
					background: '#FFFFFF',
					pixelRatio: 1,
					animation: true,
					dataLabel: true,
					dataPointShape: false,
					categories: chartData.categories,
					series: chartData.series,
					width: this.cWidth,
					height: this.cHeight,
					padding: [0, 0, 0, 0],
					extra: {
						radar: {
							max: 100, //雷达数值的最大值
							labelColor: '#fff',
							opacity: 1,
							gridCount: 4
						}
					}
				})
			},
			toJSON() {}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/ai.scss'
</style>
