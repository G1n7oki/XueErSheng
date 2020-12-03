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
		<!-- 播放器 start -->
		<view class="video-area" id="video">
			<video 
				class="video" 
				id="video" 
				:src="url" 
				controls
				autoplay
				:poster="image"
			>
			</video>
		</view>
		<!-- 播放器 end -->
		<!-- 课程信息 start -->
		<view class="course-info">
			<view class="brief">
				<view class="title-hour">
					<view class="brief-title">
						{{ detail.title }}
					</view>
					<view class="brief-hour">
						共{{ detail.sol_num }}课时
					</view>
				</view>
				<navigator class="button" open-type="navigateBack">
					课程详情
				</navigator>
			</view>
			<scroll-view 
				class="list"
				scroll-x="true"
				:scroll-into-view="view"
			>
				<view
					class="item"
					:id="'item' + index"
					v-for="(item, index) in catalog"
					:key="item.id"
					@click="handleCatalogItem(item)"
				>
					<view class="icon-title">
						<view class="icon">{{ item.is_play === 0 ? '预告' : item.is_play === 1 ? '直播' : '回顾' }}</view>
						<view class="item-title">
							{{ item.title }}
						</view>
					</view>
					<view class="user">
						{{ item.name }} <!-- <text>市政</text> -->
					</view>
					<view class="play">
						{{ item.is_play === 0 ? item.start_time : item.is_play === 1 ? `${item.watch_num}人在线` : `${item.reviw_num}播放` }}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 课程信息 end -->
		<!-- 分割线 start -->
		<view class="split-line"></view>
		<!-- 分割线 end -->
		<!-- 切换卡 start -->
		<view id="tabbar" style="border-bottom: 1px solid #DEDEDE;">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@post-id="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 滚动区域 start -->
		<swiper 
			:duration="500"
			:style="{height: height + 'px'}"
			:current="tabbar.current"
		>
			<swiper-item>
				<!-- 课程介绍 start -->
				<scroll-view scroll-y="true" class="scroll-view review">
					<view class="rich-text">
						<rich-text :nodes="detail.details.replace(/\<img/gi, '<img style=max-width:100%;height:auto')"></rich-text>
					</view>
				</scroll-view>
				<!-- 课程介绍 end -->
			</swiper-item>
			<swiper-item>
				<!-- 课程讲义 start -->
				<scroll-view 
					scroll-y="true"
					class="scroll-view note"
				>
					<view 
						class="item"
						v-for="item in handout"
						:key="item.id"
						@click="handleHandout(item.src)"
					>
						<view class="info">
							<view class="name">
								{{ item.file_name }}
							</view>
						</view>
					</view>
				</scroll-view>
				<!-- 课程讲义 end -->
			</swiper-item>
		</swiper>
		<!-- 滚动区域 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import Title from '@/components/title/Title.vue'
	import { 
		live_package_detail,
		live_package,
		live_detail,
		course_url,
		live_handout_list
	} from '@/common/api/api.js'
	export default {
		name: 'ReviewPlay',
		components: {
			XesNavbar,
			XesTextTabbar,
			Title
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '课程介绍'
					}, {
						id: 1,
						name: '课程讲义'
					}],
					current: 0
				},
				height: 0, // swiper的高度
				detail: {
					title: '',
					buy_num: 0,
					sol_num: 0,
					details: '',
					price: 0
				},
				catalog: [],
				url: '', // 播放链接
				image: '', // 封面图
				view: '', // 滚动条滚动的位置
				handout: []
			}
		},
		onLoad(options) {
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			
			this.calculate(wHeight)
			
			this.toData(options.id, options.sol, +options.index)
			
		},
		methods: {
			// 获取数据
			async toData(id, sol, index) {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取课包信息
				const detail = await live_package_detail(id)
				this.detail = detail.data.data
				// 获取直播课包目录
				const catalog = await live_package({ id })
				this.catalog = catalog.data.data
				this.view = `item${index}`
				// 获取当前视频信息
				const current = await live_detail({ id: sol })
				const { review_video_id } = current.data.data
				// 讲义列表
				const handout = await live_handout_list({ live_id: id })
				this.handout = handout.data.data
				console.log(this.handout)
				// 获取当前视频播放链接
				const url = await course_url({ video_id: review_video_id })
				const { m3u8_url, video_cover } = url.data.data
				this.url = m3u8_url
				this.image = video_cover
				uni.hideLoading()
			},
			// 接受子组件传来的参数
			toId(id) {
				this.tabbar.current = id
			},
			// 计算swiper的高度
			calculate(height) {
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
			// 点击目录子元素
			async handleCatalogItem(raw) {
				const { sol_id, is_play } = raw
				if (is_play === 2) {
					this.url = ''
					this.image = ''
					uni.showLoading({
						title: '加载中...'
					})
					// 获取当前视频信息
					const current = await live_detail({ id: sol_id })
					const { review_video_id } = current.data.data
					// 获取当前视频播放链接
					const url = await course_url({ video_id: review_video_id })
					const { m3u8_url, video_cover } = url.data.data
					this.url = m3u8_url
					this.image = video_cover
					uni.hideLoading()
				} else {
					uni.navigateTo({
						url: `/pages/live/live-play?id=${sol_id}`
					})
				}
			},
			// 下载讲义
			handleHandout(src) {
				uni.showLoading({
					title: '加载中...'
				})
				
				uni.downloadFile({
				  url: src,
				  success: function (res) {
				    const filePath = res.tempFilePath
				    uni.openDocument({
				      filePath: filePath,
				      success: function (res) {
								console.log(res)
								uni.hideLoading()
				      },
							fail(error) {
								uni.showToast({
									icon: 'none',
									title: error
								})
							}
				    })
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/play.scss'
</style>
