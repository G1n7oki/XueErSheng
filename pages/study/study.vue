<template>
	<view class="container">
		<xes-navbar title="学习中心" backgroundColor="#F4F7F9" :margin="32" />
		<view class="lineChart">
			<view class="tips">
				近7天学习时间
			</view>
			<canvas canvas-id="canvasLine" id="canvasLine" class="charts" @touchstart="touchLine"></canvas>
			<view class="statistical">
				<view class="item">
					<view class="top">
						50<text>min</text>
					</view>
					<view class="bot">
						今日学习
					</view>
				</view>
				<view class="item">
					<view class="top">
						4<text>min</text>
					</view>
					<view class="bot">
						累计学习
					</view>
				</view>
				<view class="item">
					<view class="top">
						12<text>day</text>
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
			<view class="item">
				<image src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/wodewenda%402x.png" mode=""></image>
			</view>
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
				<swiper-item>
					<scroll-view class="scroll-view" scroll-y="true" >
						<empty v-if="showCourse" />
						<view v-else class="course-list">
							<view 
								class="item"
								v-for="course in courseList"
								:key="course.id"
							>
								<image class="image" :src="course.image" mode=""></image>
								<view class="info">
									<view class="name">
										{{ course.name }}
									</view>
									<view class="validity">
										课程有效期还剩：{{ course.validity }}天
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
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="scroll-view" scroll-y="true" >
						<empty v-if="showLive" />
						<view v-else class="live live-area">
							<view class="live-list">
								<view 
									class="item" 
									v-for="live in liveList"
									:key="live.id"
								>
									<image class="avatar" :src="live.avatar" mode=""></image>
									<view class="info">
										<view class="type-title">
											<view class="type">
												{{ live.type }}
											</view>
											<view class="title">
												{{ live.name }}
											</view>
										</view>
										<view class="bot">
											<view class="user-status">
												<view class="user">
													{{ live.user }} <text>{{ live.title }}</text>
												</view>
												<view class="status">
													{{ live.status === 1 ? '正在直播' : live.time }}
													<image v-if="live.status === 1" src="http://dummyimage.com/120x600" mode=""></image>
												</view>
											</view>
											<button v-if="live.status === 1" class="button button-1" type="default">
												进入直播
											</button>
											<button v-if="live.status === 2" class="button button-2" type="default">
												已预约
											</button>
										</view>
									</view>
								</view>
							</view>
							<view class="split" v-if="liveList.length > 0">
								<image class="image" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/left%402x.png" mode=""></image>
								<view class="text">
									直播回顾
								</view>
								<image class="image" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/right%402x.png" mode=""></image>
							</view>
							<view class="live-list">
								<view class="live-list">
									<view 
										class="item" 
										v-for="live in historyList"
										:key="live.id"
									>
										<image class="avatar" :src="live.avatar" mode=""></image>
										<view class="info">
											<view class="type-title">
												<view class="type">
													{{ live.type }}
												</view>
												<view class="title">
													{{ live.name }}
												</view>
											</view>
											<view class="bot">
												<view class="user-status">
													<view class="user">
														{{ live.user }} <text>{{ live.title }}</text>
													</view>
													<view class="status">
														{{ live.status === 1 ? '正在直播' : live.time }}
														<image v-if="live.status === 1" src="/static/image/home/live.png" mode=""></image>
													</view>
												</view>
												<button class="button button-1" type="default">
													开始学习
												</button>
											</view>
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
		<view v-if="!close" class="last-watch">
			<image class="image" src="http://dummyimage.com/120x600" mode=""></image>
			<view class="info">
				<view class="text">
					上次观看：
				</view>
				<view class="name">
					童哲校长-新手股民必备技能童哲校长-新手股民必备技能
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
	import { me_course, me_live } from '@/common/api/api.js'
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
				courseList: [], // 课程列表
				liveList: [], // 直播列表
				historyList: [], // 历史列表
				tabIndex: 0, // 当前显示的索引
				swiperH: 0, // swiper的高度
				close: false, // 是否显示上次播放
				showCourse: false, // 是否显课程列表的空状态
				showLive: false ,// 是否显现空状态的直播数据
				week: [] // 生成的日期
			}
		},
		onLoad() {
			this.generateWeekly()
			
			that = this
			this.cWidth = uni.upx2px(630)
			this.cHeight = uni.upx2px(308)
			this.showLine('canvasLine')
			
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
			
			this.courseList = json.study.courseList
			this.liveList = json.study.liveList
			this.historyList = json.study.historyList
			
			// this.toMeCourse()
			
		},
		methods: {
			// 生成当前日期向前推7天的时间
			generateWeekly() {
				// 得到当前的时间戳
				const timestamp = Date.now()
				// 循环获得当前时间向前推7天的时间戳
				const dateWeek = Array.from(new Array(7)).map((_, i) => {
					const weekTimestamp = new Date(timestamp - i * 24 * 60 * 60 * 1000)
					// 整成自己需要的样式
					const date = String(weekTimestamp.getMonth() + 1) + '.' + String(new Date(weekTimestamp).getDate())
					// 倒序插入
					this.week.unshift(date)
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
					pixelRatio: that.pixelRatio,
					categories: that.week,
					series: [{
						"name": "",
						"data": [15, 3, 5, 7, 9, 11, 15],
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
				this.close = true
			},
			toMeCourse() {
				
			}
		}
	}
</script>

<style lang="scss">
	@import "~@/static/scss/study.scss"
</style>
