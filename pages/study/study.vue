<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar title="学习中心" backgroundColor="#F4F7F9" :margin="32" />
		<!-- 导航栏 end -->
		<view class="line-chart">
			<view class="tips">
				近7天学习时间
			</view>
			<canvas canvas-id="canvasLine" id="canvasLine" class="charts" @touchstart="touchLine"></canvas>
			<view class="statistical">
				<view class="item">
					<view class="top">
						{{ today }}<text>min</text>
					</view>
					<view class="bot">
						今日学习
					</view>
				</view>
				<view class="item">
					<view class="top">
						{{ total }}<text>min</text>
					</view>
					<view class="bot">
						累计学习
					</view>
				</view>
				<view class="item">
					<view class="top">
						{{ keep }}<text>day</text>
					</view>
					<view class="bot">
						连续学习
					</view>
				</view>
			</view>
		</view>
		<!-- 练习/问答 start -->
		<view class="exercise-question">
			<navigator class="item" url="/pages/topics/index">
				<image src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/tikulianxi%402x.png" mode=""></image>
			</navigator>
			<navigator class="item" url="/pages/issue/issue">
				<image src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/wodewenda%402x.png" mode=""></image>
			</navigator>
		</view>
		<!-- 练习/问答 end -->
		<!-- 课程/直播课 start -->
		<view class="course-live">
			<view class="tab" id="tabBar">
				<view class="item" @click="handleTabItem(0)">
					<text>我的课程</text>
				</view>
				<view class="item" @click="handleTabItem(1)">
					<text>我的直播课</text>
				</view>
				<view class="line" :class="{'active': tabIndex === 1}"></view>
			</view>
			<swiper 
				class="swiper"
				:current="tabIndex"
				:duration="500"
				:style="{height: swiperH}"
				@change="touchSwiper">
				<!-- 课程 -->
				<swiper-item>
					<scroll-view 
						class="scroll-view"
						scroll-y="true"
						@scrolltolower="pullUpLoading"
					>
						<empty v-if="course.show" />
						<view v-else class="course-list">
							<navigator
								class="item"
								v-for="course in course.list"
								:key="course.id"
								:url="'/pages/study/detail?id=' + course.id"
							>
								<image class="image" :src="course.cover" mode=""></image>
								<view class="info">
									<view class="name">
										{{ course.title }}
									</view>
									<view class="validity">
										{{ course.validity < 0 ? '已过期' : `课程有效期${course.validity }天` }}
									</view>
									<view class="bot">
										<view class="progress">
											<Progress 
												:percent="course.progress" 
												:show-info="false"
												:stroke-width="3"
											/>
										</view>
										<view class="text">
											学习进度 {{ course.progress }}%
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</scroll-view>
				</swiper-item>
				<!-- 直播课 -->
				<swiper-item>
					<scroll-view 
						class="scroll-view"
						scroll-y="true"
						@scrolltolower="pullUpLoading"
					>
						<empty v-if="live.show" />
						<view v-else class="live live-area">
							<view class="live-list">
								<view
									class="item" 
									v-for="live in live.list"
									:key="live.id"
								>
									<image class="avatar" :src="live.image" mode=""></image>
									<view class="info">
										<view class="type-title">
											{{ live.title }}
										</view>
										<view class="bot">
											<view class="user-status">
												<view class="user">
													{{ live.name }}
												</view>
												<view class="status">
													{{ live.is_play === 1 ? '正在直播' : live.start_time + '-' + live.end_time }}
													<image v-if="live.is_play === 1" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/live.gif" mode=""></image>
												</view>
											</view>
											<button v-if="live.is_play === 1" class="button button-1" @click="toLivePlay(live.live_id)">
												进入直播
											</button>
											<button v-else-if="live.is_play === 0 && live.subscribe === 0" class="button button-3" @click="handleAdvance(live)">立即预约</button>
											<button v-else class="button button-2">已预约</button>
										</view>
									</view>
								</view>
							</view>
							<view class="split" v-if="live.history.length >= 0">
								<image class="image" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/left%402x.png" mode=""></image>
								<view class="text">
									直播回顾
								</view>
								<image class="image" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/right%402x.png" mode=""></image>
							</view>
							<view class="live-list">
								<view
									class="item" 
									v-for="history in live.history"
									:key="history.id"
								>
									<image class="avatar1" :src="history.banner" mode=""></image>
									<view class="info">
										<view class="type-title">
											{{ history.title }}
										</view>
										<view class="bot">
											<view class="user-status">
												<view class="user">
													{{ history.validity < 0 ? '已过期' : `课程有效期${history.validity}天` }}
												</view>
												<view class="status">
													共{{ history.count }}课时
												</view>
											</view>
											<button class="button button-1" @click="toLiveDetail(history.id)">开始学习</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 课程/直播课 end -->
		<!-- 上次观看 start -->
		<view v-if="close" class="last-watch">
			<image class="image" :src="last.video_cover" mode=""></image>
			<view class="info">
				<view class="text">
					上次观看：
				</view>
				<view class="name">
					{{ last.title }}
				</view>
			</view>
			<image class="close" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/close.png" mode="" @click="handleClose"></image>
		</view>
		<!-- 上次观看 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Progress from '@/components/progress/progress.vue'
	import Empty from '@/components/empty/empty.vue'
	import { study_stats, me_course, me_live, advance } from '@/common/api/api.js'
	import uCharts from '@/tools/uChart/u-charts.min.js'
	import json from '@/static/data.json'
	let canvasLine = null
	let that
	export default {
		name: 'Study',
		components: {
			XesNavbar,
			Progress,
			Empty
		},
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1, // 像素
				course: { // 课程相关
					list: [],
					show: false,
					page: 1, // 当前页数
					total: 0 // 总页数
				},
				live: { // 直播相关
					list: [],
					show: false,
					history: [],
					page: 1,
					total: 0
				},
				tabIndex: 0, // 当前显示的索引
				swiperH: 0, // swiper的高度
				close: false, // 是否显示上次播放
				week: [], // 生成的日期
				series: [], // 7天的观看时间
				today: 0, // 今日学习
				total: 0, // 累计学习
				keep: 0, // 连续学习
				last: { // 上次观看
					title: '',
					video_cover: ''
				}
			}
		},
		onLoad() {
			that = this
			
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 获取手机状态栏高度
			const statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			// tabBar的高度
			const query = uni.createSelectorQuery().in(this)
			query.select('#tabBar').boundingClientRect(res => {
				const tHeight = res.height
				that.swiperH = wHeight - tHeight - statusBarHeight - 50 + 'px'
			}).exec()
			
			this.toStats()
			this.toMeCourse()
			this.toMeLive()
		},
		methods: {
			// 获取统计数据
			toStats() {
				study_stats().then(response => {
					const res = response.data.data
					res.top_record.map(item => {
						this.week.push(item.key)
						this.series.push(item.total_time)
					})
					
					this.today = res.record.today.value
					this.total = res.record.total.value
					this.keep = res.record.keep.value
					
					this.close = res.last.length > 0 ? true : false
					
					this.last = res.last[0]
					
					this.cWidth = uni.upx2px(630)
					this.cHeight = uni.upx2px(308)
					this.showLine('canvasLine')
				}).catch(error => {
					uni.showToast({
						icon: 'none',
						title: error.data.message
					})
				})
			},
			// 获取课程数据
			toMeCourse() {
				uni.showLoading({
					title: '加载中...'
				})
				me_course({
					page: this.course.page
				}).then(response => {
					const res = response.data.data
					this.course.list = this.course.list.concat(res.data)
					this.course.show = this.course.list.length <= 0 ? true : false
					this.course.total = res.last_page
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: error.data.message
					})
				})
			},
			// 获取直播数据
			toMeLive() {
				uni.showLoading({
					title: '加载中...'
				})
				me_live({
					page: this.live.page
				}).then(response => {
					const res = response.data.data
					res.live.map(item => {
						item.start_time = item.start_time.substring(5)
					})
					this.live.list = res.live
					this.live.history = this.live.history.concat(res.list.data)
					this.live.show = this.live.list.length <= 0 && this.live.history <= 0 ? true : false
					this.live.total = res.list.last_page
				}).catch(error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: error.data.message
					})
				})
			},
			// 跳转到直播详情
			toLiveDetail(id) {
				uni.navigateTo({
					url: '/pages/live/detail?id=' + id
				})
			},
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
					pixelRatio: 1,
					categories: that.week,
					series: [{
						"name": "",
						"data": that.series,
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
					width: that.cWidth,
					height: that.cHeight,
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
			touchLine(e) {
				canvasLine.showToolTip(e, {
					format: function (item, category) {
						return '今日' + item.data + '小时' 
					}
				});
			},
			// 点击tabBar
			handleTabItem (n) {
				this.tabIndex = n
			},
			// 滑块变化
			touchSwiper (event) {
				this.tabIndex = event.target.current
			},
			// 关闭上次观看提示
			handleClose () {
				this.close = false
			},
			// 上拉加载
			pullUpLoading() {
				if (this.tabIndex === 0) {
					let { page, total } = this.course
					this.course.page++
					if (page > total) {
						uni.showToast({
							icon: 'none',
							title: '没有更多数据了'
						})
						return false
					}
					this.toMeCourse()
				} else {
					this.live.page++
					if (this.live.page > this.live.total) {
						uni.showToast({
							icon: 'none',
							title: '没有更多数据了'
						})
						return false
					}
					uni.showLoading({
						title: '加载中...'
					})
					me_live({
						page: this.live.page
					}).then(response => {
						const res = response.data.data
						this.live.history = this.live.history.concat(res.list.data)
					}).catch(error => {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: error.data.message
						})
					})
				}
			},
			// 预约
			async handleAdvance(item) {
				uni.showLoading({
					title: '预约中...'
				})
				
				const response = await advance({
					id: item.sol_id
				})
				
				uni.hideLoading()
				
				uni.showToast({
					icon: 'none',
					title: '预约成功'
				})
				
				item.subscribe = 1
			},
			// 跳转到直播播放页
			toLivePlay(id) {
				uni.navigateTo({
					url: '/pages/live/live-play?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "~@/static/scss/study.scss"
</style>
