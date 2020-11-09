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
				poster="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1604557737&di=6ac45f974c280ed5c9e2420884bcc4e1&src=http://h.hiphotos.baidu.com/zhidao/pic/item/0dd7912397dda144dac4acc9b2b7d0a20df486f8.jpg"
				src="http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8"
				@play="play"
				controls
			></video>
		</view>
		<!-- video end -->
		<!-- 优惠券 start -->
		<view class="discount" id="discount">
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
				<uni-countdown color="#D82A13" :day="1" :hour="23" :minute="14" :second="24" />
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
							<view class="item" @click="handlefavorite">
								<image :src="favorite.url" mode=""></image>
								<view class="text">收藏</view>
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
					<view class="coupon">
						<view class="text">
							您有优惠券可领取
						</view>
						<view @click="handleGet">
							<uButton size="small" text="领取" />
						</view>
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
									<image v-if="!watch && video.try === 0" class="status-1" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/suo%402x.png" mode=""></image>
									<view v-else-if="!watch && video.try === 1" class="status-2" @click="preview">
										试看
									</view>
									<image v-else-if="watch && video.active" class="status-3" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/live.gif" mode=""></image>
									<image v-else src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/bofang%402x.png" mode=""></image>
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
						v-if="evaluate.total > 2"
						:status="evaluate.loading"
						:iconSize="14"
					/>
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
					<view class="icons-cell">
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
						<view class="text">
							<text class="unit">￥</text>
							{{ coupon.cut_money }}
						</view>
					</view>
					<view class="explain">
						<view class="title">
							每满{{ coupon.need_money }}使用
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
		course_favorite_2
	} from '@/common/api/api.js'
	import { msec2day } from '@/tools/util/util.js'
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
				info: {}, // 课程详情
				chapterList: [], // 课程章节
				evaluate: {
					list: [], // 评价列表
					total: 0, // 总评论数
					page: 1, // 当前页数
					totalPage: 0, // 总页数
					loading: 'more' // loading状态
				},
				watch: false, // 观看权限
				poster: '', // 封面
				favorite: {
					unused: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/shoucang%402x.png',
					used: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/shoucang-hover%402x.png',
					flag: false,
					url: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/study/shoucang%402x.png'
				},
				// 课程优惠券
				coupon: {
					list: []
				}
			}
		},
		onLoad(options) {
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			
			this.calculate(wHeight)
			
			this.courseId = +options.id
			
			this.toData(this.courseId)
			
			// this.$refs.popup.open()
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
				// 计算后的高度减去简略介绍的高度
				const discount = uni.createSelectorQuery().in(this)
				discount.select('#discount').boundingClientRect(discount => {
					this.height = this.height - discount.height
				}).exec()
				// 计算后的高度减去选项卡的高度
				const tabbar = uni.createSelectorQuery().in(this)
				tabbar.select('#tabbar').boundingClientRect(tabbar => {
					this.height = this.height - tabbar.height - 10
				}).exec()
			},
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取课程详情数据
				const info = await course_info(id)
				const infoData = info.data.data
				infoData.validity = msec2day(infoData.validity)
				this.info = infoData
				
				// 获取课程章节数据
				// const chapter = await course_chapter({ id })
				// const chapterData = chapter.data.data
				// this.watch = chapterData.watch
				// this.poster = chapterData.chapter[0].video[0].video_cover
				// this.chapterList = chapterData.chapter
				
				// 获取评价数据
				const evaluate = await course_evaluate({ id })
				const evaluateData = evaluate.data.data
				// 格式化时间格式
				evaluateData.list_info.data.map(item => {
					item.add_time = item.add_time.substring(0, 10)
				})
				this.evaluate.list = evaluateData.list_info.data
				this.evaluate.total = evaluateData.list_info.total
				this.evaluate.totalPage = evaluateData.list_info.last_page
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
				const that = this
				const video = uni.createVideoContext('video')
				if (!this.watch) {
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
				}
			},
			// 预览
			preview() {
				
			},
			// 领取优惠券
			handleGet() {
				this.$refs.popup.open()
			},
			// 点击讲义
			handleNotes() {
				uni.downloadFile({
				  url: 'http://www.windriver.com.cn/downloads/pdfviewer/web/viewer.aspx?pdfurl=/downloads/files/WP_Medical_Device_Safety_Through_Software.pdf',
				  success: function (res) {
						console.log(res)
				    var filePath = res.tempFilePath
				    uni.openDocument({
				      filePath: filePath,
				      success: function (res) {
								console.log(res)
				        console.log('打开文档成功')
				      },
							fail(error) {
								console.log(error)
							}
				    })
				  }
				})
			},
			// 点击收藏
			async handlefavorite() {
				this.favorite.flag = !this.favorite.flag
				if (this.favorite.flag) {
					const used = course_favorite_1({
						id: this.courseId,
						type: 1,
						papers_id: ''
					})
					this.favorite.url = this.favorite.used
					uni.showToast({
						icon: 'none',
						title: '收藏成功'
					})
				} else {
					const used = course_favorite_2({
						id: this.courseId,
						type: 1,
						papers_id: ''
					})
					this.favorite.url = this.favorite.unused
					uni.showToast({
						icon: 'none',
						title: '取消成功'
					})
				}
			},
			// 领取优惠券
			async handleCouponItem(id, type) {
				const coupon = await course_coupon_receive({ id, type })
				uni.showToast({
					icon: 'none',
					title: '领取成功'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/study-detail.scss'
</style>
