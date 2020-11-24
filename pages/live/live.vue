<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="直播 · 预告"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<view class="inner">
			<!-- 直播/预告卡片 start -->
			<view
				class="item"
				v-for="item in list"
				:key="item.sol_id"
			>
				<view class="tips" v-if="item.is_play === 1">
					LIVE
				</view>
				<image class="image" :src="item.image"></image>
				<view class="info">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="user">
						{{ item.name }} <!-- <text>市政</text> '2020.10.10 18:00-20:00'-->
					</view>
					<view class="status">
						{{ item.is_play === 1 ? '正在直播' : `${item.start_time} -${item.end_time}` }}
					</view>
					<view class="watch">
						{{ item.is_play === 1 ? `正在观看人数${item.watch_num}` : `已预约${item.subscribe_num}人` }}
					</view>
				</view>
				<button
					v-if="item.is_play === 1"
					class="button button-1"
					hover-class="none"
					type="default"
					@click="toLivePlay(item.sol_id)"
				>
					正在直播
				</button>
				<button
					v-else-if="item.subscribe === 0"
					class="button button-2"
					hover-class="none"
					type="default"
					@click="handleAdvance(item)"
				>
					立即预约
				</button>
				<button
					v-else
					class="button button-3"
					hover-class="none"
					type="default"
				>
					已预约
				</button>
			</view>
			<!-- 直播/预告卡片 end -->
			<uni-load-more
				v-if="totalPage > 1"
				:status="loading"
				:iconSize="14"
			/>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { live_advance, advance } from '@/common/api/api.js'
	export default {
		name: 'Live',
		components: {
			XesNavbar,
			Empty,
			UniLoadMore
		},
		data() {
			return {
				page: 1,
				totalPage: 1,
				loading: 'more',
				show: false,
				list: []
			}
		},
		onLoad() {
			this.toData()
		},
		async onReachBottom() {
			this.page++
			if (this.page > this.totalPage) {
				this.loading = 'noMore'
				return false
			}
			this.loading = 'loading'
			const response = await live_advance({
				profession_id: uni.getStorageSync('profession_id'),
				page: this.page
			})
			const { data } = response.data.data
			data.forEach(item => {
				item.start_time = item.start_time.substring(0, 16)
				item.end_time = item.end_time.substring(10, 16)
			})
			this.list = [...this.list, ...data]
			this.loading = 'more'
		},
		methods: {
			// 获取数据
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await live_advance({
					profession_id: uni.getStorageSync('profession_id'),
					page: 1
				})
				const { data, last_page } = response.data.data
				data.forEach(item => {
					item.start_time = item.start_time.substring(0, 16)
					item.end_time = item.end_time.substring(10, 16)
				})
				this.list = data
				this.totalPage = last_page
				
				uni.hideLoading()
			},
			toLivePlay(id) {
				uni.navigateTo({
					url: '/pages/live/live-play?id=' + id
				})
			},
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
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	
	.inner {
		padding: 32upx;
		background-color: #F4F7F9;
		// 直播/预告卡片
		.item {
			display: flex;
			padding: 32upx;
			background-color: #fff;
			position: relative;
			margin-bottom: 32upx;
			
			.tips {
				background-color: #FA7A36;
				color: #fff;
				padding: 3upx 6upx;
				position: absolute;
				top: 50upx;
				left: 32upx;
				font-size: 24upx;
			}
			
			.image {
				flex-shrink: 0;
				width: 180upx;
				height: 180upx;
				background-color: #eee;
				border-radius: 20upx;
			}
			
			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 20upx;
				padding: 10upx 0;
				
				.title {
					width: 400upx;
					font-size: 28upx;
					font-weight: bold;
					color: #303234;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
				.user {
					display: flex;
					align-items: center;
					font-size: 24upx;
					font-weight: 500;
					color: #303234;
					
					text {
						width: 64upx;
						height: 32upx;
						background-color: #1484FF;
						border-radius: 4upx;
						text-align: center;
						line-height: 32upx;
						margin-left: 10upx;
						color: #fff;
					}
				}
				
				.status, .watch {
					font-size: 20upx;
					font-weight: 500;
					color: #606266;
				}
			}
			
			.button {
				width: 126upx;
				height: 50upx;
				border-radius: 28upx;
				text-align: center;
				line-height: 50upx;
				font-size: 24upx;
				position: absolute;
				bottom: 32upx;
				right: 32upx;
				box-sizing: border-box;
				
				@for $i from 1 through 3 {
					&.button-#{$i} {
						@if $i == 1 {
							color: #1284FF;
							background-color: #F6F9FA;
							border: 1px solid #1284FF;
						} @else if $i == 2 {
							color: #1284FF;
							background-color: #F6F9FA;
						} @else {
							color: #90949A;
						}
					}
				}
			}
		}
	}
</style>
