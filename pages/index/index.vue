<template>
	<view class="contaier">
		<!-- banner start -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="banner">
					<image src="/static/image/home/banner.png" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="banner">
					<image src="/static/image/home/banner.png" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="banner">
					<image src="/static/image/home/banner.png" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- banner end -->
		<!-- 金刚区start -->
		<view class="main">
			<view class="top">
				<view v-if="!isPay" class="info-1">
					<view class="welcome">
						欢迎来到学尔升！
					</view>
					<view class="school">
						金融管理本科
					</view>
				</view>
				<view v-else class="info-2">
					<image class="icon" src="" mode=""></image>
					<view class="school-name">
						<view class="school">
							南昌大学
						</view>
						<view class="name">
							亲爱的黄亮同学
						</view>
					</view>
				</view>
				<button type="default" class="{isPay ? 'active' : ''}">
					{{ isPay ? '立即缴费' : '我要报考' }}
				</button>
			</view>
			<view class="bot">
				<view class="crumbs-area">
					<view class="left">
						<image class="icon" src="/static/image/home/crumbs-icon.png" mode=""></image>
						<view class="crumbs">
							<view class="crumbs-cell" v-for="(item, index) in treeList" :key="item">
								<view class="text">
									{{ item }}
								</view>
								<view class="symbol" v-if="treeList.length !== index + 1"></view>
							</view>
						</view>
					</view>
					<view @click="handleSwitch">
						<view-more text="切换" />
					</view>
				</view>
				<view class="icon-list">
					<view class="icon-cell">
						<image class="icon" src="/static/image/home/main-icon.png" mode=""></image>
						<text class="name">考生必看</text>
					</view>
					<view class="icon-cell">
						<image class="icon" src="/static/image/home/main-icon.png" mode=""></image>
						<text class="name">报考流程</text>
					</view>
					<view class="icon-cell">
						<image class="icon" src="/static/image/home/main-icon.png" mode=""></image>
						<text class="name">直播回顾</text>
					</view>
					<view class="icon-cell">
						<image class="icon" src="/static/image/home/main-icon.png" mode=""></image>
						<text class="name">我的课程</text>
					</view>
					<view class="icon-cell">
						<image class="icon" src="/static/image/home/main-icon.png" mode=""></image>
						<text class="name">学习记录</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 金刚区end -->
		<view class="line-body">
			<!-- 上进故事start -->
			<view class="block">
				<view class="top" style="margin-top: 0;">
					<title name="上进故事" />
					<view-more />
				</view>
				<image class="story" src="/static/image/home/banner.png" mode=""></image>
			</view>
			<!-- 上进故事end -->
			<!-- 直播预告start -->
			<view class="block">
				<view class="top">
					<title name="直播 · 预告" />
					<view-more />
				</view>
				<view class="live">
					<view class="live-cell" v-for="item in liveList" :key="item.id">
						<view class="date-time">
							<text class="item">{{ item.date }}</text>
							<text class="item">{{item.time}}</text>
						</view>
						<view class="bot">
							<view class="info">
								<image class="avatar" :src="item.icon" mode=""></image>
								<view class="course-name">
									<view class="course">
										{{ item.type }}
									</view>
									<view class="name">
										{{ item.name }}
										<image v-if="item.status === 1" class="icon" src="/static/image/home/live.png" mode=""></image>
									</view>
								</view>
							</view>
							<view class="status">
								<button v-if="item.status === 1" class="button-1" type="default">正在直播</button>
								<button v-else-if="item.status === 2" class="button-2" type="default">直播回放</button>
								<button v-else-if="item.status === 3" class="button-3" type="default">立即预约</button>
								<button v-else class="button-4" type="default">已预约</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 直播预告end -->
			<!-- 精选课程start -->
			<view class="block">
				<view class="top">
					<title name="精选课程" />
					<view-more />
				</view>
				<view class="course" style="margin-top: 32upx;">
					<view class="tips">
						全科
					</view>
					<image src="/static/image/home/banner.png" mode=""></image>
					<view class="info">
						<view class="name">
							[2020年秋] 金融管理本科-课程通关班
						</view>
						<view class="time-price">
							<view class="time">
								40课时
							</view>
							<view class="price">
								6800<text>元</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 精选课程end -->
			<!-- 全部课程start -->
			<view class="block">
				<view class="top">
					<title name="全部课程" />
				</view>
				<view class="control">
					<view class="item">
						<text>排序</text>
						<image class="arrow" src="/static/image/home/arrow-down.png" mode=""></image>
					</view>
					<view class="item">
						<text>科目</text>
						<image class="arrow" src="/static/image/home/arrow-down.png" mode=""></image>
					</view>
					<view class="item">
						<text>班型</text>
						<image class="arrow" src="/static/image/home/arrow-down.png" mode=""></image>
					</view>
					<view class="item" @click="handleFilter">
						<text>筛选</text>
						<image class="filter" src="/static/image/home/filter.png" mode=""></image>
					</view>
				</view>
				<view class="list">
					<view class="list-cell" v-for="item in courseList" :key="item.id">
						<view class="image">
							<image :src="item.image" mode=""></image>
						</view>
						<view class="info">
							<view class="name">
								{{ item.name }}
							</view>
							<view class="hour-price">
								<view class="hour">
									{{ item.hour }}
								</view>
								<view class="price">
									{{ item.price }}<text>元</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 全部课程end -->
			<view class="loading" v-if="loading">
				精彩马上就来
			</view>
		</view>
		<!-- 筛选 star -->
		<view class="filter-area" :class="{'active': filter === true}">
			<view class="mask"></view>
			<view class="content">
				<view class="title">
					筛选
				</view>
				<view class="filter-cell" v-for="item in filterList" :key="item.id">
					<text>{{ item.name }}</text>
					<view class="item-wrap">
						<view class="item" :class="{'active': cell.active === true}" v-for="cell in item.item" :key="cell.id" @click="handleItem(cell.name)">
							{{ cell.name }}
						</view>
					</view>
				</view>
				<view class="filter-cell">
					<text>价格区间</text>
					<view class="item-wrap">
						<view class="item">
							最低价
						</view>
						<view class="line"></view>
						<view class="item">
							最高价
						</view>
					</view>
				</view>
				<view class="button-group">
					<button class="reset" type="default">重置</button>
					<button class="affirm" type="default" @click="handleAffirm">确定</button>
				</view>
			</view>
		</view>
		<!-- 筛选 end -->
	</view>
</template>

<script>
	import ViewMore from '@/components/view-more/ViewMore.vue'
	import Title from '@/components/title/Title.vue'
	import json from '@/static/data.json'
	export default {
		components: {
			ViewMore,
			Title
		},
		data() {
			return {
				isPay: true,
				treeList: [],
				liveList: [],
				courseList: [],
				filterList: [],
				loading: false,
				filter: false
			}
		},
		onLoad() {
			this.liveList = json.home.liveList
			this.courseList = json.home.courseList
			this.filterList = json.home.filterList
		},
		onShow() {
			const crumbs = uni.getStorageSync('crumbs')
			if (!crumbs) {
				uni.navigateTo({
					url: '/pages/professional/professional'
				})
			} else {
				this.treeList = crumbs
			}
		},
		methods: {
			handleFilter () {
				this.filter = true
			},
			handleAffirm () {
				this.filter = false
			},
			handleItem (name) {
				this.filterList.forEach((item) => {
					
					item.item.findIndex((cell, indxe) => {
						if (cell.name === name && cell.active === false) {
							cell.active = true
						} else if (cell.name === name && cell.active === true) {
							cell.active = false
						} else {
							return
						}
					})
				})
			},
			handleSwitch () {
				uni.navigateTo({
					url: '/pages/professional/professional'
				})
			}
		},
		onReachBottom() {
			// 模拟上拉加载
			this.loading = true
			setTimeout(() => {
				for (let i = 0; i < 4; i++) {
					this.courseList.push({
						id: this.courseList.length + 1,
						name: '特许金融分析师',
						hour: '40课时',
						price: '680',
						image: '/static/image/home/banner.png'
					})
				}
				this.loading = false
			}, 2000)
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/home.scss"
</style>
