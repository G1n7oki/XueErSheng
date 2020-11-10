<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="我的订单"
			textAlign="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 切换卡 start -->
		<view id="tabBar">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.index"
				@postId="toId"
			/>
		</view>
		<!-- 切换卡 end -->
		<!-- 列表 start -->
		<scroll-view
			class="scroll-view"
			scroll-y="true"
			:style="{height: height}"
			@scrolltolower="pullUpLoading"
		>
			<empty v-if="order.show" />
			<view 
				v-else
				class="swiper-item"
				v-for="order in order.list"
				:key="order.id"
			>
				<view class="image-info">
					<image class="image" :src="order.cover" mode=""></image>
					<view class="info">
						<view class="info-title">
							{{ order.goods_name }}
						</view>
						<view class="info-date">
							课程有效期还剩：{{ order.validity }}天
						</view>
						<view class="info-price">
							{{ order.real_amount }} <text>元</text>
						</view>
					</view>
				</view>
				<view class="bot">
					<view class="status" :class="{'active': order.order_status === 0}">
						{{ order.order_status === 0 ? '待付款' : '已付款' }}
						<view class="date" v-if="order.order_status === 0">
							剩余 <text>{{ order.day }}</text> 天 <text>{{ order.hour }}</text> 小时
						</view>
					</view>
					<button 
						:class="{'active': order.order_status === 1 }"
						hover-class="none"
						@click="handleItem(order)"
					>
						{{ order.order_status === 0 ? '去支付' : '去学习' }}
					</button>
				</view>
			</view>
			<uni-load-more v-if="order.list.length > 5" :status="order.loading" />
		</scroll-view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import Empty from '@/components/empty/empty.vue'
	import { me_order } from '@/common/api/api.js'
	export default {
		name: 'Order',
		components: {
			XesTextTabbar,
			XesNavbar,
			UniLoadMore,
			Empty
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '全部'
					}, {
						id: 1,
						name: '待付款'
					}, {
						id: 2,
						name: '已付款'
					}],
					index: 0
				},
				height: 0,
				order: {
					list: [],
					page: 1,
					totalPage: 1,
					loading: 'more',
					show: false
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
			
			this.toData()
		},
		methods: {
			async toData() {
				// 获取数据
				uni.showLoading({
					title: '加载中...'
				})
				const order = await me_order({
					status: this.tabbar.index,
					page: this.order.page
				})
				const { data, last_page } = order.data.data
				data.map(item => {
					item.validity = Math.floor(item.validity / 86400)
					item.day = Math.floor(item.wait / 86400)
					item.hour = Math.floor(item.wait / (60 * 60)) - (item.day * 24)
				})
				this.order.list = data
				this.order.show = this.order.list.length <= 0 ? true : false
				this.order.totalPage = last_page
				uni.hideLoading()
			},
			// 切换卡
			toId(id) {
				this.tabbar.index = id
				this.order.page = 1
				this.order.list = []
				this.toData()
			},
			// 点击按钮
			handleItem(order) {
				if (order.order_status === 0) {
					uni.navigateTo({
						url: `/pages/order/unpaid?id=${order.goods_id}&type=${order.order_type}` 
					})
				} else if (order.order_status === 1) {
					uni.navigateTo({
						url: `/pages/study/detail?id=${order.goods_id}`
					})
				} else {
					return false
				}
			},
			// 上拉加载
			async pullUpLoading() {
				this.order.loading = 'loading'
				const { totalPage } = this.order
				const page = ++this.order.page 
				if (page > totalPage) {
					this.order.loading = 'noMore'
					return false
				}
				const order = await me_order({
					status: this.tabbar.index,
					page: this.order.page
				})
				const { data } = order.data.data
				data.map(item => {
					item.validity = Math.floor(item.validity / 86400)
					item.day = Math.floor(item.wait / 86400)
					item.hour = Math.floor(item.wait / (60 * 60)) - (item.day * 24)
				})
				this.order.list = [...this.order.list, ...data]
				this.order.loading = 'more'
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/static/scss/order.scss'
</style>
