<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="欢迎来到学尔升"
			text-align="center"
			background-color="#fff"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<!-- banner start -->
		<swiper 
			class="swiper"
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="1000"
			indicator-active-color="#fff"
		>
			<swiper-item
				v-for="banner in bannerList"
				:key="banner.id"
			>
				<view class="banner">
					<image :src="banner.image_url" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- banner end -->
		<!-- 金刚区start -->
		<view class="main">
			<view class="top">
				<view v-if="!isInfo" class="info-1">
					<view class="welcome">
						欢迎来到学尔升！
					</view>
					<view class="school">
						{{ major }}
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
				<button v-if="isButton" type="default" :class="{'active': isPay !== 9}" @click="handleMainBtn">
					{{ isPay === 0 ? '立即缴费' : isPay === 1 ? '已缴费' : '我要报名' }}
				</button>
			</view>
			<view class="bot">
				<view class="crumbs-area">
					<view class="left">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/crumbs.png" mode=""></image>
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
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/home/kaoshengbikan@2x.png" mode=""></image>
						<text class="name">考生必看</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/plan/process', 1)">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/home/baokaoliucehgn@2x.png" mode=""></image>
						<text class="name">报考流程</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/live/review', 0)">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/home/zhibiohuigu@2x.png" mode=""></image>
						<text class="name">播放回顾</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/me/course')">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/home/wodekecheng@2x.png" mode=""></image>
						<text class="name">我的课程</text>
					</view>
					<view class="icon-cell" @click="navigate('/pages/study/record')">
						<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/home/xuexijilu@2x.png" mode=""></image>
						<text class="name">学习记录</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 金刚区end -->
		<view class="line-body">
			<!-- 上进故事start -->
			<view class="block" v-if="story">
				<view class="top">
					<title name="上进故事" />
					<view-more
						url="/pages/discover/discover"
						open-type="switchTab"
					/>
				</view>
				<navigator :url="'/pages/discover/detail?id=' + story.id" hover-class="none">
					<image class="story" :src="story.preview" mode=""></image>
				</navigator>
			</view>
			<!-- 上进故事end -->
			<!-- 播放预告start -->
			<view class="block">
				<view class="top">
					<title name="播放 · 预告" />
					<view-more url="/pages/live/live" />
				</view>
				<view class="live">
					<view 
						class="live-cell"
						v-for="item in liveList"
						:key="item.sol_id"
					>
						<view class="date-time">
							<text class="item">{{ item.start_time }}</text>
						</view>
						<view class="bot">
							<view class="info">
								<image class="avatar" :src="item.image" mode=""></image>
								<view class="course-name">
									<view class="course">
										{{ item.title }}
									</view>
									<view class="name">
										讲师：{{ item.name }}
										<image v-if="item.is_play === 1" class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/live.gif" mode=""></image>
									</view>
								</view>
							</view>
							<view class="status">
								<button v-if="item.is_play === 1" class="button-1" @click="toLivePlay(item.sol_id)">正在播放</button>
								<!-- <button v-else-if="item.is_play === 2" class="button-2">播放回放</button> -->
								<button v-else-if="item.is_play === 0 && item.subscribe === 0" class="button-3" @click="handleAdvance(item)">立即预约</button>
								<button v-else class="button-4">已预约</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 播放预告end -->
			<!-- 精选课程start -->
			<view class="block">
				<view class="top">
					<title name="精选课程" />
				</view>
				<navigator :url="'/pages/study/detail?id=' + selection.id" hover-class="none" class="course" style="margin-top: 32upx;">
					<view class="tips">
						{{ selection.category_name }}
					</view>
					<image :src="selection.cover" mode=""></image>
					<view class="info">
						<view class="name">
							{{ selection.title }}
						</view>
						<view class="time-price">
							<view class="time">
								{{ selection.video_num }}课时
							</view>
							<view class="price">
								{{ selection.price }}<text>元</text>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<!-- 精选课程end -->
			<!-- 全部课程start -->
			<view class="block">
				<view class="top">
					<title name="全部课程" />
				</view>
				<view class="control">
					<view class="item">
						<picker
							class="picker" 
							:value="sort.data[sort.current].value"
							:range="sort.data"
							range-key="value"
							@change="selected($event, 'sort')"
						>
								<view class="text">{{ sort.data[sort.current].value }}</view>
						</picker>
						<image class="arrow" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
					</view>
					<view class="item">
						<picker
							class="picker" 
							:value="subject.data[subject.current].name"
							:range="subject.data"
							range-key="name"
							@change="selected($event, 'subject')"
						>
								<view class="text">{{ subject.data[subject.current].name }}</view>
						</picker>
						<image class="arrow" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
					</view>
					<view class="item">
						<picker
							class="picker" 
							:value="classType.data[classType.current].name"
							:range="classType.data"
							range-key="name"
							@change="selected($event, 'classType')"
						>
								<view class="text">{{ classType.data[classType.current].name }}</view>
						</picker>
						<image class="arrow" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/arrowdown.png" mode=""></image>
					</view>
					<view class="item" @click="handleFilter">
						<text class="text">筛选</text>
						<image class="filter" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/common/filter.png" mode=""></image>
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
				v-if="totalPage > 1"
				:status="loading"
				:iconSize="14"
			/>
		</view>
		<!-- 筛选 star -->
		<view class="filter-area" :class="{'active': filter.flag === true}">
			<view class="mask" @click="handleAffirm"></view>
			<view class="content" :style="{'padding-top': top}">
				<view class="title">
					筛选
				</view>
				<view class="filter-cell">
					<text>优惠/折扣</text>
					<view class="item-wrap">
						<view 
							class="item"
							:class="{'active': filter.sale === cell.key}"
							v-for="cell in filterList.sale"
							:key="cell.key"
							@click="handleSaleItem(cell.key)"
						>
							{{ cell.name }}
						</view>
					</view>
				</view>
				<view class="filter-cell">
					<text>上架时间</text>
					<view class="item-wrap">
						<view 
							class="item"
							:class="{'active': cell === filter.year}"
							v-for="cell in filterList.year"
							:key="cell"
							@click="handleYearItem(cell)"
						>
							{{ cell }}
						</view>
					</view>
				</view>
				<view class="filter-cell">
					<text>价格区间</text>
					<view class="item-wrap">
						<input class="item" v-model="min" type="text" placeholder="最低价" />
						<view class="line"></view>
						<input class="item" v-model="max" type="text" placeholder="最高价" />
					</view>
				</view>
				<view class="button-group">
					<button class="reset" type="default" @click="handleReset">重置</button>
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
	import { 
		home,
		courses,
		banners,
		filter,
		advance
	} from '@/common/api/api.js'
	export default {
		components: {
			ViewMore,
			Title,
			XesNavbar,
			UniLoadMore
		},
		data() {
			return {
				isInfo: null, // 是否显示用户信息
				isButton: false, // 是否显示按钮 
				isPay: 0, // 支付状态
				treeList: [], // 面包屑
				story: {}, // 上进故事
				liveList: [], // 播放预告
				courseList: [], // 全部课程
				selection: {}, // 精选课程
				bannerList: [], // Banner列表
				loading: 'more',
				filter: { // 筛选相关
					flag: false,
					sale: 0,
					year: ''
				},
				page: 1,
				totalPage: 0,
				major: '', // 专业名称
				profession_id: uni.getStorageSync('profession_id') || 44, // 默认选择的专业
				top: 0, // content的padding-top值
				sort: 0, // 排序
				filterList: {
					sale: [],
					year: []
				},
				max: '', // 最大价格
				min: '', // 最小价格
				sort: {
					data: [],
					current: 0
				},
				classType: {
					data: [{
						id: 0,
						name: '班型'
					}],
					current: 0
				},
				subject: {
					data: [{
						id: 0,
						name: '科目'
					}],
					current: 0
				},
				mr0: 'margin-top: 0'
			}
		},
		onLoad() {
			// 设置content的padding-top值
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height + 20 + 'px'
			}).exec()
		},
		onShow() {
			const crumbs = uni.getStorageSync('crumbs')
			if (!crumbs) {
				uni.navigateTo({
					url: '/pages/professional/professional'
				})
			} else {
				this.treeList = crumbs
				this.major = this.treeList[2]
			}
			
			this.page = 1
			
			this.toHome()
		},
		methods: {
			// 显示筛选
			handleFilter () {
				this.filter.flag = true
			},
			// 确认筛选
			handleAffirm () {
				this.toCoures()
				this.filter.flag = false
			},
			// 点击重置
			handleReset() {
				this.filter.year = ''
				this.filter.sale = ''
				this.min = ''
				this.max = ''
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
			async toHome() {
				uni.showLoading({
					title: '加载中...'
				})
				// 获取首页数据
				const homes = await home({ profession_id: uni.getStorageSync('profession_id') || 44 })
				const homeData = homes.data.data
				this.story = homeData.article
				this.liveList = homeData.sol
				this.selection = homeData.handpick
				this.isButton = homeData.applyButton
				this.isPay = homeData.applyStaus
				// 获取全部课程
				const course = await courses({
					profession_id: uni.getStorageSync('profession_id') || 44,
					page: 1
				})
				const { list_info, category, direction, sort } = course.data.data
				this.sort.data = sort
				this.subject.data = [...this.subject.data, ...direction]
				this.classType.data = [...this.classType.data, ...category]
				this.courseList = list_info.data
				this.totalPage = list_info.last_page
				// 获取Banner数据
				const banner = await banners({
					profession_id: uni.getStorageSync('profession_id') || 44
				})
				const bannerData = banner.data.data
				this.bannerList = bannerData.banner
				// 获取筛选数据
				const filterData = await filter()
				const { discount, year } = filterData.data.data
				this.filterList.sale = discount
				this.filterList.year = year
				uni.hideLoading()
			},
			// 点击缴费/支付按钮
			handleMainBtn() {
				this.isPay === 9 ? this.navigate('/pages/plan/select') : this.isPay === 0 ? this.navigate('/pages/order/information') : ''
			},
			// 跳转播放播放页
			toLivePlay(id) {
				uni.navigateTo({
					url: '/pages/live/live-play?id=' + id
				})
			},
			// 点击折扣选项
			handleSaleItem(key) {
				this.filter.sale = key
			},
			// 点击年份按钮
			handleYearItem(str) {
				this.filter.year = str
			},
			// picker
			selected(e, str) {
				this[str].current = e.target.value
				this.toCoures()
			},
			async toCoures() {
				this.page = 1
				this.loading = 'more'
				const response = await courses({
					profession_id: uni.getStorageSync('profession_id') || 44,
					page: this.page,
					sort: this.sort.data[this.sort.current].key,
					year: this.filter.year,
					discount: this.filter.sale,
					max: this.max,
					min: this.min,
					direction: this.subject.data[this.subject.current].id,
					category: this.classType.data[this.classType.current].id
				})
				const { list_info } = response.data.data
				this.courseList = list_info.data
				this.totalPage = list_info.last_page
			},
			// 预约
			async handleAdvance(item) {
				uni.showLoading({
					title: '预约中...'
				})
				
				const response = await advance({
					id: item.sol_id
				})
				
				uni.hideLoading()
				
				uni.showToast({
					icon: 'none',
					title: '预约成功'
				})
				
				item.subscribe = 1
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
				profession_id: uni.getStorageSync('profession_id') || 44,
				page: this.page,
				sort: this.sort.data[this.sort.current].key,
				year: this.filter.year,
				discount: this.filter.sale,
				max: this.max,
				min: this.min,
				direction: this.subject.data[this.subject.current].id,
				category: this.classType.data[this.classType.current].id
			}).then(response => {
				const res = response.data.data
				this.courseList = this.courseList.concat(res.list_info.data)
				this.loading = 'more'
			}).catch(error => {
				uni.showToast({
					icon: 'none',
					title: error.data.message
				})
			})
		}
	}
</script>

<style lang="scss">
	@import "~@/static/scss/home.scss"
</style>
