<template>
	<view class="contaier">
		<NavBar title="学习中心" backgroundColor="#F4F7F9" />
		<view class="lineChart">
			<view class="tips">
				近7天学习时间
			</view>
			<canvas canvas-id="canvasLine" id="canvasLine" class="charts" @touchstart="touchLine"></canvas>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import uCharts from '@/tools/uChart/u-charts.min.js'
	let canvasLine = null
	let that
	export default {
		name: 'Study',
		components: {
			NavBar
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: ''
			}
		},
		onLoad() {
			that = this
			this.cWidth = uni.upx2px(630)
			this.cHeight = uni.upx2px(308)
			this.showLine('canvasLine')
		},
		methods: {
			showLine(canvasId) {
				canvasLine = new uCharts({
					$this: that,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: false,
						padding: 0,
						lineHeight: 11,
						margin: 0,
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: that.pixelRatio,
					categories: ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7'],
					series: [{
						"name": "",
						"data": [35, 36, 31, 33, 13, 34, 55],
						"color": "#2BD0FF"
					}],
					animation: true,
					xAxis: {
						boundaryGap: 'center',
						disableGrid: true,
						axisLine: false
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#F0F0F0',
						dashLength: 1,
						splitNumber: 4,
						data: [{
							axisLine: false,
							format: (val) => {
								return val.toFixed(0) + 'h'
							}
						}],
					},
					width: that.cWidth * that.pixelRatio,
					height: that.cHeight * that.pixelRatio,
					extra: {
						line: {
							type: 'curve'
						},
						tooltip: {
							gridColor: '#fff'
						}
					}
				})
			},
			toJSON () {},
			touchLine(e) {
				// canvasLine.touchLegend(e)
				canvasLine.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/study.scss"
</style>
