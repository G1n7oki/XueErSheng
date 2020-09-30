<template>
	<view class="contaier">
		<NavBar
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
		<swiper class="swiper" :current="tabbar.index" :duration="500" :style="{height: height}" @change="changeSwiper">
			<swiper-item>
				<scroll-view class="scroll-view" scroll-y="true">
					<view class="scroll-view__item">
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
					<view class="scroll-view__item">
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
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import Progress from '@/components/progress/progress.vue'
	export default {
		name: 'MeCourse',
		components: {
			NavBar,
			Progress
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
				height: 0
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
		},
		methods: {
			handleTabBarItem(id) {
				this.tabbar.index = id
			},
			changeSwiper(e) {
				this.tabbar.index = e.detail.current
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/me-course.scss'
</style>