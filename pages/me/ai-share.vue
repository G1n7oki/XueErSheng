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
							{{ info.total }}
						</view>
						<view class="text">
							总分值
						</view>
					</view>
					<view class="professional">
						<view class="name">
							{{ info.professional }}
						</view>
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
							{{ info.today }} <text>min</text>
						</view>
						<view class="text amount">
							{{ info.amount }} <text>道</text>
						</view>
						<view class="text accuracy">
							{{ info.accuracy }} <text>%</text>
						</view>
						<view class="text liveness">
							{{ info.liveness }} <text>%</text>
						</view>
						<view class="text continuous">
							{{ info.continuous }} <text>min</text>
						</view>
					</view>
					<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
				</view>
			</view>
			<!-- 巨幕 end -->
			<!-- 用户信息 start -->
			<view class="user-box">
				<image class="avatar" :src="info.avatar" mode=""></image>
				<view class="nickname">
					{{ info.nickname }}
				</view>
				<view class="signature">
					<image class="quotes" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/quotes-left.png" mode=""></image>
					<view class="text">
						只争朝夕，不负韶华
					</view>
					<image class="quotes" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/quotes-right.png" mode=""></image>
				</view>
			</view>
			<!-- 用户信息 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uCharts from '@/tools/uChart/u-charts.min.js'
	export default {
		name: 'AIShare',
		components: {
			XesNavbar
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				chartData: {
					categories: ['今日学习', '练题数量', '正确率', '活跃度', '连续学习'],
					series: [{
						name: '',
						data: [],
						color: '#CCD2FD',
					}]
				},
				info: {
					avatar: '',
					nickname: '',
					total: '',
					professional: '',
					today: '',
					amount: '',
					accuracy: '',
					liveness: '',
					continuous: ''
				}
			}
		},
		onLoad(options) {
			console.log(options)
			// 赋值
			const data = JSON.parse(options.data)
			this.chartData.series.data = data.series
			this.info = data
			
			this.cWidth = uni.upx2px(620)
			this.cHeight = uni.upx2px(540)
			
			this.showRadar('canvasRadar', this.chartData)
		},
		methods: {
			showRadar(canvasId, chartData) {
				new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'radar',
					fontSize: 11,
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
