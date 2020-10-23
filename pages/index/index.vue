<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="欢迎来到学尔升"
			text-align="center"
			background-color="#F4F7F9"
		/>
		<!-- 导航栏 end -->
		<!-- banner start -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="banner">
					<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3475570381,2768348736&fm=26&gp=0.jpg" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="banner">
					<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3475570381,2768348736&fm=26&gp=0.jpg" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="banner">
					<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3475570381,2768348736&fm=26&gp=0.jpg" mode=""></image>
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
						{{ treeList[2] }}
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
				<button type="default" class="{isPay ? 'active' : ''}" @click="handleMainBtn">
					{{ isPay ? '立即缴费' : '我要报考' }}
				</button>
			</view>
			<view class="bot">
				<view class="crumbs-area">
					<view class="left">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
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
					<view class="icon-cell" @click="navigate('/pages/plan/process', 0)">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<text class="name">考生必看</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/plan/process', 1)">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<text class="name">报考流程</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/live/review', 0)">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<text class="name">直播回顾</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/me/course')">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
						<text class="name">我的课程</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/study/record')">
						<image class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
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
					<view-more 
						url="/pages/discover/discover"
						open-type="switchTab"
					/>
				</view>
				<image class="story" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3475570381,2768348736&fm=26&gp=0.jpg" mode=""></image>
			</view>
			<!-- 上进故事end -->
			<!-- 直播预告start -->
			<view class="block">
				<view class="top">
					<title name="直播 · 预告" />
					<view-more url="/pages/live/live" />
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
										<image v-if="item.status === 1" class="icon" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
									</view>
								</view>
							</view>
							<view class="status">
								<button v-if="item.status === 1" class="button-1" type="default" @click="toLivePlay">正在直播</button>
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
					<!-- <view-more /> -->
				</view>
				<view class="course" style="margin-top: 32upx;">
					<view class="tips">
						全科
					</view>
					<image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3475570381,2768348736&fm=26&gp=0.jpg" mode=""></image>
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
						<image class="arrow" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
					</view>
					<view class="item">
						<text>科目</text>
						<image class="arrow" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
					</view>
					<view class="item">
						<text>班型</text>
						<image class="arrow" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
					</view>
					<view class="item" @click="handleFilter">
						<text>筛选</text>
						<image class="filter" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602579342591&di=8781b7e64524a383c102a82bedabb7d0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F34%2F96%2F23573bca52a6b30.jpg" mode=""></image>
					</view>
				</view>
				<view class="list">
					<navigator 
						class="list-cell" 
						v-for="item in courseList" 
						:key="item.id"
						hover-class="none"
						:url="'/pages/study/detail?id=' + item.id"
					>
						<view class="image">
							<image :src="item.cover" mode=""></image>
						</view>
						<view class="info">
							<view class="name">
								{{ item.title }}
							</view>
							<view class="hour-price">
								<view class="hour">
									{{ item.video_num }}课时
								</view>
								<view class="price">
									{{ item.price }}<text>元</text>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
			<!-- 全部课程end -->
			<uni-load-more
				:status="loading"
				:iconSize="14"
			/>
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
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import ViewMore from '@/components/view-more/ViewMore.vue'
	import Title from '@/components/title/Title.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { courses } from '@/common/api/api.js'
	import json from '@/static/data.json'
	export default {
		components: {
			ViewMore,
			Title,
			XesNavbar,
			UniLoadMore
		},
		data() {
			return {
				isPay: false,
				treeList: [],
				liveList: [],
				courseList: [],
				filterList: [],
				loading: 'more',
				filter: false,
				page: 1,
				totalPage: 0
			}
		},
		onLoad(options) {
			this.liveList = json.home.liveList
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
			
			this.toHome()
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
			// 选择专业切换
			handleSwitch () {
				uni.navigateTo({
					url: '/pages/professional/professional'
				})
			},
			navigate(url, id) {
				uni.navigateTo({
					url: url + '?id=' + id
				})
			},
			// 获取首页数据
			toHome () {
				uni.showLoading({
					title: '加载中...'
				})
				courses({
					profession_id: uni.getStorageSync('profession_id'),
					page: this.page
				}).then(response => {
					const res = response.data
					this.courseList = res.data.data
					this.totalPage = res.data.last_page
					uni.hideLoading()
				}).catch(error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: error.data.message
					})
				})
			},
			// 点击缴费/支付按钮
			handleMainBtn() {
				this.isPay === true ? '' : this.navigate('/pages/plan/detail')
			},
			// 跳转直播播放页
			toLivePlay() {
				uni.navigateTo({
					url: '/pages/live/live-play'
				})
			}
		},
		onReachBottom() {
			++this.page
			// 如果当前页数大于总页数说明没有更多的数据了
			if (this.page > this.totalPage) {
				this.page = this.totalPage
				this.loading = 'noMore'
				return false
			}
			
			this.loading = 'loading'
			
			courses({
				profession_id: uni.getStorageSync('profession_id'),
				page: this.page
			}).then(response => {
				const res = response.data
				this.courseList = this.courseList.concat(res.data.data)
				this.loading = 'more'
			}).catch(error => {
				console.log(error)
				uni.showToast({
					icon: 'none',
					title: error.data.message
				})
			})
		}
	}
</script>

<style lang="scss">
	@import "../../static/scss/home.scss"
</style>
