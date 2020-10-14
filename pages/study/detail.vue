<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			:is-arrow="true"
			:is-empty="false"
			is-arrow-type="image"
			background-color="transparent"
		/>
		<!-- 导航栏 end -->
		<!-- video start -->
		<view class="video-area">
			<video class="video" id="video" src="http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8" controls></video>
		</view>
		<!-- video end -->
		<!-- 优惠券 start -->
		<view class="discount" id="discount">
			<view class="left">
				<image class="sale" src="/static/image/study/sale.png" mode=""></image>
				<view class="price-time">
					<view class="price">
						<view class="current">
							￥542
						</view>
						<view class="old">
							680
						</view>
					</view>
					<view class="time">
						自购买之日起1年内有效
					</view>
				</view>
			</view>
			<view class="countdown">
				<view class="text">
					剩
				</view>
				<uni-countdown color="#D82A13" :day="1" :hour="23" :minute="14" :second="24" />
				<view class="text">
					恢复原价
				</view>
			</view>
		</view>
		<!-- 优惠券 end -->
		<!-- tabBar start -->
		<view class="tab-bar" id="tabBar">
			<view 
				class="item"
				:class="{'active': tabBarIndex === index}"
				v-for="(item, index) in tabBarList"
				:key="item.id"
				@click="handleBarItem(item.id)"
			>
				{{ item.name }}
			</view>
			<view class="line-area" :style="{left: tabBarIndex * 33.333 + '%'}">
				<view class="line"></view>
			</view>
		</view>
		<!-- tabBar end -->
		<!-- swiepr start -->
		<swiper class="swiper" :current="tabBarIndex" :style="{height: height + 'px'}" :duration="500" @change="handleSwiper">
			<!-- info start -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="detail" >
					<view class="info">
						<view class="top">
							<view class="left">
								<view class="name">
									{{ info.title }}
								</view>
								<view class="date">
									<text>课程有效期:{{ info.validity }}天</text>
									<text style="margin: 0 10rpx;">|</text>
									<text>共{{ info.video_num }}课时</text>
								</view>
							</view>
							<view class="score">
								<view class="num">
									5.0
								</view>
								<view class="text">
									评分
								</view>
							</view>
						</view>
						<view class="control">
							<view class="item">
								<image src="/static/image/study/collect.png" mode=""></image>
								<view class="text">收藏</view>
							</view>
							<view class="item">
								<image src="/static/image/study/note.png" mode=""></image>
								<view class="text">讲义</view>
							</view>
							<view class="item">
								<image src="/static/image/study/issue.png" mode=""></image>
								<view class="text">提问</view>
							</view>
						</view>
					</view>
					<view class="coupon">
						<view class="text">
							您有优惠券可领取
						</view>
						<uButton size="small" text="领取" />
					</view>
					<view class="split-line"></view>
					<view class="recommend">
						<Title name="课程介绍" color="#1283FF" />
						<view class="text">
							{{ info.intro }}
						</view>
					</view>
					<view class="prominent">
						<view class="title-area">
							<Title name="课程亮点" color="#1283FF" />
						</view>
						<!-- <rich-text :nodes="info.detail"></rich-text> -->
						<view class="rich-text">
							{{ info.details }}
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- info end -->
			<!-- 目录 start -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="catalog" >
					<uni-collapse
						v-for="(chapter, index) in chapterList"
						:key="chapter.id"
					>
						<uni-collapse-item
							:number="index + 1 | formatId"
							:showAnimation="true"
							:title="chapter.name"
						>
							<view class="chapter">
								<view 
									class="item"
									v-for="video in chapter.video"
									:key="video.id"
								>
									<view class="info">
										<view class="name">
											{{ video.name }}
										</view>
										<view class="time">
											{{ video.duration }}
										</view>
									</view>
									<image v-if="!watch && video.try === 0" class="status-1" src="/static/image/study/lock.png" mode=""></image>
									<view v-else-if="!watch && video.try === 1" class="status-2">
										试看
									</view>
									<image v-else-if="watch && video.active" class="status-3" src="/static/image/study/live.png" mode=""></image>
									<image v-else src="/static/image/study/play.png" mode=""></image>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</scroll-view>
			</swiper-item>
			<!-- 目录 end -->
			<!-- 评价 start -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="evaluate">
					<view class="exhibition">
						<view class="left">
							<uni-rate
								:readonly="true"
								:size="16"
								:margin="5"
								:allowHalf="true"
								:value="4.6"
							/>
							<view class="line-point">
								<view class="line"></view>
								<view class="point">
									<view class="number">
										4.6
									</view>
									<view class="unit">
										评分
									</view>
								</view>
							</view>
						</view>
						<button hover-class="none" type="default">我要评价</button>
					</view>
					<view class="split-line"></view>
					<view class="list">
						<view class="top">
							<Title name="所有评价" />
							<view class="text">
								共40个评价
							</view>
						</view>
						<view class="item">
							<view class="info">
								<view class="avatar-name">
									<image class="avatar" src="/static/image/home/main-icon.png" mode=""></image>
									<view class="name-tips">
										<view class="name">
											一只大肥羊
										</view>
										<view class="tips">
											学习1个课时评价
										</view>
									</view>
								</view>
								<view class="date">
									2020.08.05
								</view>
							</view>
							<view class="content">
								老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
							</view>
							<view class="rate">
								<uni-rate 
									:readonly="true"
									:size="16"
									:margin="5"
									:allowHalf="true"
									:value="5"
								/>
							</view>
						</view>
						<view class="item">
							<view class="info">
								<view class="avatar-name">
									<image class="avatar" src="/static/image/home/main-icon.png" mode=""></image>
									<view class="name-tips">
										<view class="name">
											一只大肥羊
										</view>
										<view class="tips">
											学习1个课时评价
										</view>
									</view>
								</view>
								<view class="date">
									2020.08.05
								</view>
							</view>
							<view class="content">
								老师讲的很详细，本人在这次学习中收获了很多，感谢学尔升课堂提供的平台，希望开发人员能在后续的改版迭代中连续开发出更好的功能，为学员提供更好的服务。
							</view>
							<view class="rate">
								<uni-rate 
									:readonly="true"
									:size="16"
									:margin="5"
									:allowHalf="true"
									:value="5"
								/>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 评价 end -->
		</swiper>
		<!-- swiper end -->
		<!-- fixed start -->
		<view class="fiexd" v-if="tabBarIndex === 0">
			<view class="left">
				<view class="price-time">
					<view class="price">
						<view class="current">
							542 <text>元</text>
						</view>
						<view class="old">
							680 <text>元</text>
						</view>
					</view>
					<view class="time">
						自购买之日起1年内有效
					</view>
				</view>
				<view class="icons">
					<view class="icons-cell">
						<image class="icon" src="/static/image/study/listen.png" mode=""></image>
						<view class="text">
							试听
						</view>
					</view>
					<view class="icons-cell">
						<image class="icon" src="/static/image/study/advice.png" mode=""></image>
						<view class="text">
							咨询
						</view>
					</view>
				</view>
			</view>
			<view class="button">
				<view class="icon">
					+
				</view>
				<view class="text">
					加入学习
				</view>
			</view>
		</view>
		<!-- fixed end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import Title from '@/components/title/Title.vue'
	import UniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import UniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import UniRate from '@/components/uni-rate/uni-rate.vue'
	import UniCountDown from '@/components/uni-countdown/uni-countdown.vue'
	import { course_info, course_chapter } from '@/common/api/api.js'
	export default {
		name: 'study-detail',
		components: {
			XesNavbar,
			uButton,
			Title,
			UniCollapse,
			UniCollapseItem,
			UniRate,
			UniCountDown
		},
		data() {
			return {
				tabBarList: [{ // tabbar的信息
					id: 0,
					name: '详情'
				}, {
					id: 1,
					name: '目录'
				}, {
					id: 2,
					name: '评价'
				}],
				tabBarIndex: 0, // 显示滑块的索引
				height: 0, //scroll-view的高度
				courseId: 0, // 课程的id
				info: {}, // 课程详情
				chapterList: [], // 课程章节
				watch: false // 观看权限
			}
		},
		onLoad(options) {
			const that = this
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 视频的高度
			let vHeight = 0
			// tabBar的高度
			let tHeight = 0
			// 优惠券的高度
			let dHeight = 0
			
			const query = uni.createSelectorQuery().in(this)
			query.select('#video').boundingClientRect(res => {
				vHeight = res.height
				that.height = wHeight - vHeight
			}).exec()
			
			query.select('#tabBar').boundingClientRect(res => {
				tHeight = res.height
				that.height = that.height - tHeight
			}).exec()
			
			query.select('#discount').boundingClientRect(res => {
				dHeight = res.height
				that.height = that.height - dHeight
			}).exec()
			
			this.courseId = +options.id
			
			// 获取课程信息
			uni.showLoading({
				title: '加载中...'
			})
			course_info(this.courseId).then(response => {
				const res = response.data
				this.info = res.data
				uni.hideLoading()
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					title: error.data.message
				})
				uni.hideLoading()
			})
		},
		filters: {
			formatId(value) {
				if (value < 10) {
					return value = '0' + value
				}
				
				return value
			}
		},
		methods: {
			// 点击切换卡
			handleBarItem(id) {
				this.tabBarIndex = id
			},
			// 切换卡滑块
			handleSwiper(event) {
				this.tabBarIndex = event.detail.current
				if (this.tabBarIndex === 1) {
					this.toCourseChapter(1)
				}
			},
			// 获取课程章节数据
			toCourseChapter(id) {
				// 如果章节数组有数据则不需要请求
				if (this.chapterList.length > 0) {
					return false
				}
				
				uni.showLoading({
					title: '加载中...'
				})
				course_chapter({ id }).then(response => {
					let res = response.data
					this.watch = res.data.watch
					this.chapterList = res.data.chapter
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: error.data.message
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/study-detail.scss'
</style>
