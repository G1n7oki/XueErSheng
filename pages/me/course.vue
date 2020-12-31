<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="我的课程"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 切换卡 start -->
		<view class="tabbar" id="tabBar">
			<view 
				class="item"
				:class="{'active': item.id === tabbar.index}"
				v-for="item in tabbar.data"
				:key="item.id"
				@click="handleTabBarItem(item.id)"
			>
				{{ item.name }}
			</view>
			<view class="line" :class="{'active': tabbar.index === 1}"></view>
		</view>
		<!-- 切换卡 end -->
		<!-- 滚动区域 start -->
		<swiper 
			class="swiper"
			:current="tabbar.index"
			:duration="500"
			:style="{height: height}"
			@change="changeSwiper"
		>
			<swiper-item>
				<empty v-if="course.show" />
				<scroll-view 
					v-else
					class="scroll-view"
					scroll-y="true"
					@scrolltolower="pullUpLoading"
				>
					<navigator
						class="scroll-view__item"
						v-for="course in course.list"
						:key="course.id"
						hover-class="none"
						:url="'/pages/study/detail?id=' + course.id"
					>
						<image class="image" :src="course.cover" mode=""></image>
						<view class="info">
							<view class="name">
								{{ course.title }}
							</view>
							<view class="indate">
								{{ course.validity < 0 ? '已过期' : `课程有效期还剩：${course.validity}天` }}
							</view>
							<view class="bot">
								<view class="progress">
									<Progress 
										:show-info="false"
										:stroke-width="3"
										:percent="course.progress"
									/>
								</view>
								<view class="text">
									学习进度 {{ course.progress }}%
								</view>
							</view>
						</view>
					</navigator>
					<uni-load-more v-if="course.totalPage > 1" :status="course.loading" />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<empty v-if="live.show" />
				<scroll-view 
					class="scroll-view live"
					scroll-y="true"
				>
					<view
						class="item" 
						v-for="live in live.list"
						:key="live.id"
					>
						<image class="avatar" :src="live.banner" mode=""></image>
						<view class="info">
							<view class="type-title">
								{{ live.title }}
							</view>
							<view class="bot">
								<view class="user-status">
									<view class="user">
										{{ live.validity < 0 ? '已过期' : `课程有效期${live.validity}天` }}
									</view>
									<view class="status">
										共{{ live.count }}课时
									</view>
								</view>
								<button class="button button-1" @click="toLiveDetail(live.id)">开始学习</button>
							</view>
						</view>
					</view>
					<uni-load-more v-if="live.totalPage > 1" :status="live.loading" />
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 滚动区域 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Progress from '@/components/progress/progress.vue'
	import Empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { me_course, me_live } from '@/common/api/api.js'
	export default {
		name: 'MeCourse',
		components: {
			XesNavbar,
			Progress,
			Empty,
			UniLoadMore
		},
		data() {
			return {
				tabbar: {
					data: [{
						id: 0,
						name: '我的课程' 
					}, {
						id: 1,
						name: '我的在线课'
					}],
					index: 0
				},
				height: 0,
				course: {
					list: [],
					page: 1,
					totalPage: 1,
					show: false,
					loading: 'more'
				},
				live: {
					list: [],
					page: 1,
					totalPage: 1,
					show: false,
					loading: 'more'
				}
			}
		},
		onLoad() {
			const that = this
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 获取手机状态栏高度
			const statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
			// tabBar的高度
			const query = uni.createSelectorQuery().in(this)
			query.select('#tabBar').boundingClientRect(res => {
				const tHeight = res.height
				that.height = wHeight - tHeight - statusBarHeight - 42 + 'px'
			}).exec()
			
			this.toMeCourse()
		},
		methods: {
			handleTabBarItem(id) {
				this.tabbar.index = id
			},
			changeSwiper(e) {
				this.tabbar.index = e.detail.current
			},
			async toMeCourse() {
				uni.showLoading({
					title: '加载中...'
				})
				// 我的课程数据
				const course = await me_course({
					page: 1
				})
				this.course.list = course.data.data.data
				this.course.totalPage = course.data.data.last_page
				this.course.show = this.course.list.length <= 0 ? true : false
				// 我的直播课数据
				const live = await me_live({
					page: 1
				})
				this.live.list = live.data.data.list.data
				this.live.totalPage = live.data.data.list.last_page
				this.live.show = this.live.list.length <= 0 ? true : false
				uni.hideLoading()
			},
			// 上拉加载
			async pullUpLoading() {
				if (this.tabbar.index === 0) {
					this.course.page++
					if (this.course.page > this.course.totalPage) {
						this.course.loading = 'noMore'
						return false
					}
					this.course.loading = 'loading'
					const course = await me_course({
						page: this.course.page
					})
					this.course.list = [...this.course.list, ...course.data.data.data]
					this.course.loading = 'more'
				} else {
					this.live.page++
					if (this.live.page > this.live.totalPage) {
						this.live.loading = 'noMore'
						return false
					}
					this.live.loading = 'loading'
					const live = await me_course({
						page: this.live.page
					})
					this.live.list = [...this.live.list, ...live.data.data.list.data]
					this.live.loading = 'more'
				}
			},
			// 跳转到直播详情
			toLiveDetail(id) {
				uni.navigateTo({
					url: '/pages/live/detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/me-course.scss'
</style>
