<template>
	<view class="contaier">
		<xes-navbar
			title="我的课程"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- tabbar start -->
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
		<!-- tabbar end -->
		<swiper 
			class="swiper"
			:current="tabbar.index"
			:duration="500"
			:style="{height: height}"
			@change="changeSwiper"
		>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true">
					<empty v-if="courseList.length <= 0" />
					<view
						class="scroll-view__item"
						v-for="item in courseList"
						:key="item.id"
					>
						<image class="image" src="/static/image/study/question.png" mode=""></image>
						<view class="info">
							<view class="name">
								童哲校长-新手股民必备技能童哲校长-新手股民必备技能
							</view>
							<view class="indate">
								课程有效期还剩：360天
							</view>
							<view class="bot">
								<view class="progress">
									<Progress 
										:show-info="false"
										:stroke-width="3"
										:percent="60"
									/>
								</view>
								<view class="text">
									学习进度 90%
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true">
					<empty v-if="liveList.length <= 0" />
					<view 
						class="scroll-view__item"
						v-for="item in liveList"
						:key="item.id"
					>
						<image class="image" src="/static/image/study/question.png" mode=""></image>
						<view class="info">
							<view class="name">
								童哲校长-新手股民必备技能童哲校长-新手股民必备技能
							</view>
							<view class="indate">
								课程有效期还剩：360天
							</view>
							<view class="bot">
								<view class="progress">
									<Progress 
										:show-info="false"
										:stroke-width="3"
										:percent="60"
									/>
								</view>
								<view class="text">
									学习进度 90%
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Progress from '@/components/progress/progress.vue'
	import Empty from '@/components/empty/empty.vue'
	import { me_course, me_live } from '@/common/api/api.js'
	import { showToast } from '@/tools/util/util.js'
	export default {
		name: 'MeCourse',
		components: {
			XesNavbar,
			Progress,
			Empty
		},
		data() {
			return {
				tabbar: {
					data: [{
						id: 0,
						name: '我的课程' 
					}, {
						id: 1,
						name: '我的直播课'
					}],
					index: 0
				},
				height: 0,
				courseList: [],
				liveList: []
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
				const course = await me_course()
				console.log(course)
				if (course.statusCode === 200) {
					this.courseList = course.data.data
				} else {
					showToast(course.data.message)
					uni.hideLoading()
					return false
				}
				// 我的直播课数据
				const live = await me_live()
				console.log(live)
				if (live.statusCode === 200) {
					this.liveList = course.data.data
				} else {
					showToast(live.data.message)
				}
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/me-course.scss'
</style>
