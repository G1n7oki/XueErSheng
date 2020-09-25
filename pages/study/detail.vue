<template>
	<view class="container">
		<!-- 导航栏 start -->
		<NavBar 
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
		<view class="discount">
			
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
		<swiper class="swiper" :style="{height: height + 'px'}" :duration="1000">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y="true" class="detail" >
					<view class="info">
						<view class="top">
							<view class="left">
								<view class="name">
									2019年二级建造师市政专业著名讲师开讲冲刺精讲班
								</view>
								<view class="date">
									<text>课程有效期:260天</text>
									<text style="margin: 0 10rpx;">|</text>
									<text>共18课时</text>
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
							本课程以Python简洁语法为基础，带你走进编程的世界。通过对工具的使用和了解，让你能够使用代码处理简单的数学问题，提升效率。最后学习机器中的线性回归预测和感知分类，帮助你进一步掌握机器学习的一般方法和步骤。                       
						</view>
					</view>
					<view class="prominent">
						<Title name="课程亮点" color="#1283FF" />
						<view class="item">
							<image src="/static/image/home/banner.png" mode=""></image>
							<view class="con">
								<view class="con-title">
									标题
								</view>
								<view class="con-content">
									内容
								</view>
							</view>
						</view>
						<view class="item" style="padding-left: 24rpx;">
							<view class="con">
								<view class="con-title">
									标题
								</view>
								<view class="con-content">
									内容
								</view>
							</view>
							<image src="/static/image/home/banner.png" mode=""></image>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="swiper-item">
				
			</swiper-item>
			<swiper-item class="swiper-item">
				
			</swiper-item>
		</swiper>
		<!-- swiper end -->
	</view>
</template>

<script>
	import NavBar from '@/components/nav-bar/NavBar.vue'
	import uButton from '@/components/u-button/uButton.vue'
	import Title from '@/components/title/Title.vue'
	export default {
		name: 'study-detail',
		components: {
			NavBar,
			uButton,
			Title
		},
		data() {
			return {
				tabBarList: [{
					id: 0,
					name: '详情'
				}, {
					id: 1,
					name: '目录'
				}, {
					id: 2,
					name: '评价'
				}],
				tabBarIndex: 0,
				height: 0
			}
		},
		onLoad() {
			const that = this
			// 屏幕的高度
			const wHeight = uni.getSystemInfoSync()['windowHeight']
			// 视频的高度
			let vHeight = 0
			// tabBar的高度
			let tHeight = 0
			
			const query = uni.createSelectorQuery().in(this)
			query.select('#video').boundingClientRect(res => {
				vHeight = res.height
				that.height = wHeight - vHeight
			}).exec()
			
			query.select('#tabBar').boundingClientRect(res => {
				tHeight = res.height
				that.height = that.height - tHeight
			}).exec()
		},
		methods: {
			handleBarItem(id) {
				this.tabBarIndex = id
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/scss/study-detail.scss'
</style>
