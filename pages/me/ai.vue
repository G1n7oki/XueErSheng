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
							{{ data.total }}
						</view>
						<view class="text">
							总分值
						</view>
					</view>
					<view class="professional">
						<view class="name">
							{{ data.professional }}
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
							{{ data.today }} <text>min</text>
						</view>
						<view class="text amount">
							{{ data.amount }} <text>道</text>
						</view>
						<view class="text accuracy">
							{{ data.accuracy }} <text>%</text>
						</view>
						<view class="text liveness">
							{{ data.liveness }} <text>%</text>
						</view>
						<view class="text continuous">
							{{ data.continuous }} <text>min</text>
						</view>
					</view>
					<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts" @click="touchLine"></canvas>
				</view>
			</view>
			<!-- 巨幕 end -->
			<!-- 用户信息 start -->
			<view class="user-box">
				<image class="avatar" :src="data.avatar" mode=""></image>
				<view class="nickname">
					{{ data.nickname }}
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
	import { ai } from '@/common/api/api.js'
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
						data: [],
						color: '#CCD2FD',
					}]
				},
				data: {
					avatar: '',
					nickname: '',
					total: 0,
					professional: '',
					today: 0,
					amount: 0,
					accuracy: 0,
					liveness: 0,
					continuous: 0,
					series: [0, 0, 0, 0, 0]
				},
				shareData: {
					avatar: '',
					nickname: '',
					total: 0,
					professional: '',
					today: 0,
					amount: 0,
					accuracy: 0,
					liveness: 0,
					continuous: 0,
					series: []
				}
			}
		},
		onShow() {
			this.toData()
		},
		// 页面分享
		onShareAppMessage() {
			this.shareData = JSON.stringify(this.data)
			
			return {
				title: 'AI智能评测',
				path: '/pages/me/ai-share?data=' + this.shareData
			}
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				this.data.professional = uni.getStorageSync('crumbs')[2]
				const data = await ai({ 
					profession_id: uni.getStorageSync('profession_id')
				})
				const { 
					avatars,
					username,
					active,
					keep,
					long_time,
					num,
					right
				} = data.data.data
				
				this.data.avatar = avatars
				this.data.nickname = username
				this.data.today = long_time
				this.data.amount = num
				this.data.accuracy = right
				this.data.liveness = active
				this.data.continuous = keep
				this.total = long + num + right + active + keep
				this.chartData.data = [long, num, right, active, keep]
				
				this.showRadar('canvasRadar', this.chartData)
				
				uni.hideLoading()
			},
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
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/ai.scss'
</style>
