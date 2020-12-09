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
			<video 
				class="video"
				id="video"
				:poster="video.image"
				:src="video.url"
				@play="play"
				@timeupdate="timeupdate"
				controls
			></video>
			<view class="cover" v-if="!playing">
				<image class="image" :src="video.image" mode=""></image>
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/plays%402x.png" mode="" @click="play()"></image>
			</view>
		</view>
		<!-- video end -->
		<!-- 优惠券 start -->
		<view v-if="info.count_down > 0 && !info.have" class="discount" id="discount">
			<view class="left">
				<image class="sale" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/xianhitehui%402x.png" mode=""></image>
				<view class="price-time">
					<view class="price">
						<view class="current">
							￥{{ info.price }}
						</view>
						<view class="old">
							{{ info.virtual_price }}
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
				<uni-countdown 
					color="#D82A13"
					:day="info.days"
					:hour="info.hours"
					:minute="info.minutes"
					:second="info.seconds"
				/>
				<view class="text">
					恢复原价
				</view>
			</view>
		</view>
		<!-- 优惠券 end -->
		<!-- tabBar start -->
		<view class="tab-bar" id="tabbar">
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
		<swiper class="swiper" :current="tabBarIndex" :style="{height: info.count_down > 0 && !info.have ? height - 52 + 'px' : height + 'px'}" :duration="500" @change="handleSwiper">
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
									{{ info.mark }}
								</view>
								<view class="text">
									评分
								</view>
							</view>
						</view>
						<view class="control">
							<view class="item" @click="handlefavorite">
								<image :src="favorite.flag ? favorite.used : favorite.unused" mode=""></image>
								<view class="text">{{ favorite.flag ? '已收藏' : '收藏' }}</view>
							</view>
							<view class="item" @click="handleNotes">
								<image src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/jinagyi%402x.png" mode=""></image>
								<view class="text">讲义</view>
							</view>
							<navigator url="/pages/issue/choose" hover-class="none" class="item">
								<image src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/tiwen%402x.png" mode=""></image>
								<view class="text">提问</view>
							</navigator>
						</view>
					</view>
					<view class="coupon" v-if="info.card > 0">
						<view class="text">
							您有优惠券可领取
						</view>
						<view @click="handleGet">
							<uButton size="small" text="领取" />
						</view>
					</view>
					<view class="split-line"></view>
					<view class="prominent">
						<rich-text class="rich-text" :nodes="info.intro.replace(/\<img/gi, '<img style=max-width:100%;height:auto')"></rich-text>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- info end -->
			<!-- 目录 start -->
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="catalog" >
					<uni-collapse
						v-for="(chapter, index) in chapterList"
						:key="chapter.name"
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
										<view class="name" :class="{'active': video.live === true, 'hover': video.active === true}">
											{{ video.name }}
										</view>
										<view class="time">
											{{ video.duration }}
										</view>
									</view>
									<image v-if="!watch && video.is_try === 0" class="status-1" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/suo%402x.png" mode=""></image>
									<view v-else-if="!watch && video.is_try === 1" class="status-2" @click="handlePlay(video, chapter)">
										试看
									</view>
									<image v-else-if="watch && video.live" class="status-3" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/live.gif" mode=""></image>
									<image v-else class="status-4" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/bofang%402x.png" mode="" @click="handlePlay(video, chapter)"></image>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</scroll-view>
			</swiper-item>
			<!-- 目录 end -->
			<!-- 评价 start -->
			<swiper-item class="swiper-item">
				<scroll-view 
					scroll-y="true"
					class="evaluate"
					@scrolltolower="pullUpLoading"
				>
					<view class="exhibition">
						<view class="left">
							<uni-rate
								:readonly="true"
								:size="16"
								:margin="5"
								:allowHalf="true"
								:value="evaluate.mark"
							/>
							<view class="line-point">
								<view class="line"></view>
								<view class="point">
									<view class="number">
										{{ evaluate.mark }}
									</view>
									<view class="unit">
										评分
									</view>
								</view>
							</view>
						</view>
						<navigator class="button" :url="'/pages/study/evaluation?id=' + courseId" hover-class="none">
							我要评价
						</navigator>
					</view>
					<view class="split-line"></view>
					<view class="list">
						<view class="top">
							<Title name="所有评价" />
							<view class="text">
								共{{ evaluate.total }}个评价
							</view>
						</view>
						<view class="item" 
							v-for="list in evaluate.list"
							:key="list.id"
						>
							<view class="info">
								<view class="avatar-name">
									<image class="avatar" :src="list.avatars" mode=""></image>
									<view class="name-tips">
										<view class="name">
											{{ list.username }}
										</view>
										<view class="tips">
											学习{{ list.period }}个课时评价
										</view>
									</view>
								</view>
								<view class="date">
									{{ list.add_time }}
								</view>
							</view>
							<view class="content">
								{{ list.content }}
							</view>
							<view class="rate">
								<uni-rate 
									:readonly="true"
									:size="16"
									:margin="5"
									:allowHalf="true"
									:value="list.mark"
								/>
							</view>
						</view>
					</view>
					<uni-load-more 
						v-if="evaluate.total > 1"
						:status="evaluate.loading"
						:iconSize="14"
					/>
				</scroll-view>
			</swiper-item>
			<!-- 评价 end -->
		</swiper>
		<!-- swiper end -->
		<!-- fixed start -->
		<view class="fiexd" v-if="tabBarIndex === 0 && !info.have">
			<view class="left">
				<view class="price-time">
					<view class="price">
						<view class="current">
							{{ info.price }} <text>元</text>
						</view>
						<view class="old">
							<view class="number">
								{{ info.virtual_price }}
							</view>
							<view class="text">
								元
							</view>
						</view>
					</view>
					<view class="time">
						自购买之日起1年内有效
					</view>
				</view>
				<view class="icons">
					<view class="icons-cell" @click="toChapter">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/shiting%402x.png" mode=""></image>
						<view class="text">
							试听
						</view>
					</view>
					<view class="icons-cell">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/zixun%402x.png" mode=""></image>
						<view class="text">
							咨询
						</view>
						<button class="button" hover-class="none" open-type="contact"></button>
					</view>
				</view>
			</view>
			<view class="button">
				<view class="icon">
					+
				</view>
				<navigator :url="'/pages/order/information?id=' + courseId + '&type=' + info.type" hover-class="none" class="text">
					加入学习
				</navigator>
			</view>
		</view>
		<!-- fixed end -->
		<!-- 优惠券弹窗 start -->
		<uni-popup ref="popup" type="bottom">
			<scroll-view class="coupon-popup" scroll-y="true">
				<view class="title">
					领取优惠券
				</view>
				<view 
					class="item"
					v-for="coupon in coupon.list"
					:key="coupon.id"
					@click="handleCouponItem(coupon.id, coupon.type)"
				>
					<view class="worth">
						<view class="type">
							{{ coupon.type === 1 ? '满减券' : '课程月卡' }}
						</view>
						<view class="text" v-if="coupon.type === 1">
							<text class="unit">￥</text>
							{{ coupon.cut_money }}
						</view>
						<view class="text active" v-else>
							<view>
								课程
							</view>
							<view>
								月卡
							</view>
						</view>
					</view>
					<view class="explain">
						<view class="title">
							{{ coupon.type === 1 ? `每满${ coupon.need_money }使用` : '1个月使用期限' }}
						</view>
						<view class="date">
							{{ coupon.valid_start }}~{{ coupon.valid_end }}
						</view>
					</view>
				</view>
				<!-- <view class="item">
					<view class="worth">
						<view class="type">
							随机立减券
						</view>
						<view class="text active">
							<view>
								随机
							</view>
							<view>
								立减
							</view>
						</view>
					</view>
					<view class="explain">
						<view class="title">
							无门槛使用
						</view>
						<view class="source">
							100~500之间
						</view>
						<view class="date">
							2019.04.05~2021.04.05
						</view>
					</view>
				</view>
				<view class="item">
					<view class="worth">
						<view class="type">
							打折券
						</view>
						<view class="text">
							9.8
							<text class="unit">折</text>
						</view>
					</view>
					<view class="explain">
						<view class="title">
							无门槛使用
						</view>
						<view class="date">
							2019.04.05~2021.04.05
						</view>
					</view>
				</view> -->
			</scroll-view>
		</uni-popup>
		<!-- 优惠券弹窗 end -->
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
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import UniPopup from '@/components/uni-popup/uni-popup.vue'
	import { 
		course_info,
		course_chapter,
		course_evaluate,
		course_coupon,
		course_coupon_receive,
		course_favorite_1,
		course_favorite_2,
		course_url,
		study_save
	} from '@/common/api/api.js'
	export default {
		name: 'study-detail',
		components: {
			XesNavbar,
			uButton,
			Title,
			UniCollapse,
			UniCollapseItem,
			UniRate,
			UniCountDown,
			UniLoadMore
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
				info: { // 课程详情
					title: '',
					validity: 0,
					video_num: 0,
					mark: 0,
					intro: ''
				},
				chapterList: [], // 课程章节
				evaluate: {
					list: [], // 评价列表
					total: 0, // 总评论数
					page: 1, // 当前页数
					totalPage: 0, // 总页数
					loading: 'more', // loading状态
					mark: ''
				},
				watch: false, // 观看权限
				poster: '', // 封面
				favorite: {
					unused: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/shoucang%402x.png',
					used: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/shoucang-hover%402x.png',
					flag: 0
				},
				// 课程优惠券
				coupon: {
					list: []
				},
				// 播放链接
				video: {
					url: '',
					image: '',
					try: 0
				},
				// 上次播放的链接
				last: {},
				playing: false,
				timer: null,
				save: {
					video: 0, // 视频id
					course: 0, // 课程id
					chapter: 0, // 章节id
					progress: 0, // 进度
				}
			}
		},
		onLoad(options) {
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			
			this.courseId = +options.id
			
			this.toData(this.courseId)
			
			this.calculate(wHeight)
		},
		onHide() {
			clearInterval(this.timer)
		},
		onUnload() {
			clearInterval(this.timer)
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
			},
			// 计算swiper的高度
			calculate(height) {
				// 每次获取元素前都必须使用createSelectorQuery否则会多次执行boundingClientRect
				// 首先使用屏幕的高度减去视频的高度
				const video = uni.createSelectorQuery().in(this)
				video.select('#video').boundingClientRect(video => {
					this.height = height - video.height
				}).exec()
				
				// 计算后的高度减去选项卡的高度
				const tabbar = uni.createSelectorQuery().in(this)
				tabbar.select('#tabbar').boundingClientRect(tabbar => {
					this.height = this.height - tabbar.height
				}).exec()
			},
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取课程详情数据
				const info = await course_info(id)
				const infoData = info.data.data
				const { count_down, validity } = infoData
				// 记录课程id
				this.save.course = infoData.id
				// 格式化时间
				infoData.days = parseInt(count_down / 60 / 60 / 24) // 计算天数
				infoData.hours = parseInt(count_down / 60 / 60 % 24) // 计算小时数
				infoData.minutes = parseInt(count_down / 60 % 60) // 计算分数
				infoData.seconds = parseInt(count_down % 60) // 计算秒数
				infoData.validity = parseInt(validity / 60 / 60 / 24) // 计算有效期
				
				this.info = infoData
				this.favorite.flag = infoData.collect
				
				// 获取课程章节数据
				const chapter = await course_chapter({ id })
				const chapterData = chapter.data.data
				this.watch = chapterData.watch
				this.chapterList = chapterData.chapter
				// 第一条视频数据
				const item = chapterData.chapter[0].video[0]
				this.save.chapter = chapterData.chapter[0].id
				
				// 第一次进来获取视频数据
				const once = await course_url({
					video_id: item.aliyun_id
				})
				const { m3u8_url, video_cover } = once.data.data
				this.video.url = m3u8_url
				this.video.image = video_cover
				item.live = true
				item.active = true
				this.last = item
				
				// 获取评价数据
				const evaluate = await course_evaluate({ id })
				const evaluateData = evaluate.data.data
				// 格式化时间格式
				// evaluateData.list_info.data.map(item => {
				// 	item.add_time = item.add_time.substring(0, 10)
				// })
				this.evaluate.list = evaluateData.list_info.data
				this.evaluate.total = evaluateData.list_info.total
				this.evaluate.totalPage = evaluateData.list_info.last_page
				this.evaluate.mark = evaluateData.mark
				// 课程优惠券列表
				const coupon = await course_coupon({ id, type: 1 })
				const { data } = coupon.data
				data.map(item => {
					item.valid_start = item.valid_start.substring(0, 10)
					item.valid_end = item.valid_end.substring(0, 10)
				})
				this.coupon.list = data
				uni.hideLoading()
			},
			// 上拉加载
			pullUpLoading() {
				this.evaluate.page++
				if (this.evaluate.page > this.evaluate.totalPage) {
					this.evaluate.loading = 'noMore'
					return false
				}
				this.evaluate.loading = 'loading'
				course_evaluate({
					id: this.courseId
				}).then(response => {
					const res = response.data.data
					this.evaluate.list = this.evaluate.list.concat(res.list_info.data)
				})
			},
			// 播放视频
			play() {
				this.playing = false
				const that = this
				const video = uni.createVideoContext('video')
				if (!this.watch && this.video.try !== 1) {
					uni.showModal({
						title: '提示',
						content: '您没有权限观看, 是否购买?',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/order/information?id=' + that.courseId + '&type=' + that.info.type
								})
							}
						}
					})
					video.pause()
				} else {
					this.playing = true
					const { video, course, chapter } = this.save
					this.timer = setInterval(() => {
						study_save({
							video_id: video,
							courses_id: course,
							chapters_id: chapter,
							progress: this.save.progress
						}).then(response => {})
					}, 30000)
				}
			},
			// 点击章节播放按钮
			async handlePlay(parms, chapter) {
				this.save.chapter = chapter.id
				this.save.video = parms.id
				// 每次点击播放重置一下当前的播放链接
				this.video = {
					url: '',
					iamge: ''
				}
				this.last.live = false
				const video = uni.createVideoContext('video')
				const response = await course_url({
					video_id: parms.aliyun_id
				})
				const { m3u8_url, video_cover } = response.data.data
				this.video.url = m3u8_url
				this.video.image = video_cover
				this.video.try = parms.is_try 
				setTimeout(() => {
					video.play()
				}, 500)
				parms.live = true
				parms.active = true
				this.last = parms
			},
			// 领取优惠券
			handleGet() {
				this.$refs.popup.open()
			},
			// 点击讲义
			handleNotes() {
				uni.navigateTo({
					url: `/pages/study/notes?id=${this.courseId}`
				})
			},
			// 点击收藏
			async handlefavorite() {
				if (this.favorite.flag) {
					const used = await course_favorite_2({
						id: this.courseId,
						type: 1,
						papers_id: ''
					})
					uni.showToast({
						icon: 'none',
						title: '取消成功'
					})
				} else {
					const used = await course_favorite_1({
						id: this.courseId,
						type: 1,
						papers_id: ''
					})
					uni.showToast({
						icon: 'none',
						title: '收藏成功'
					})
				}
				this.favorite.flag = !this.favorite.flag
			},
			// 领取优惠券
			async handleCouponItem(id, type) {
				const coupon = await course_coupon_receive({ id, type })
				uni.showToast({
					icon: 'none',
					title: '领取成功'
				})
			},
			// 获取进度
			timeupdate(e) {
				this.save.progress = parseInt(e.detail.currentTime)
			},
			toChapter() {
				this.tabBarIndex = 1
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/study-detail.scss'
</style>
