<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar
			title="直播回顾"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 数据列表 start -->
		<view class="list">
			<navigator
				:url="'/pages/live/detail?id=' + item.live_id"
				class="item"
				hover-class="none"
				v-for="item in list"
				:key="item.id"
			>
				<view class="banner">
					<image class="image" :src="item.banner" mode=""></image>
				</view>
				<view class="info">
					<view class="info-title">
						{{ item.title }}
					</view>
					<view class="space-between">
						<view class="left">
							<view class="user">
								<image class="avatar" :src="item.image" mode=""></image>
								<view class="name">{{ item.name }}</view>
							</view>
							<view class="time-number">
								正在学习 {{ item.buy_num }} 人 <text class="time">共{{ item.sol_num }}课时</text>
							</view>
						</view>
						<button class="button" hover-class="none">开始学习</button>
					</view>
				</view>
			</navigator>
			<uni-load-more
				v-if="totalPage > 1"
				:status="loading"
				:iconSize="14"
			/>
		</view>
		<!-- 数据列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { live_review } from '@/common/api/api.js'
	export default {
		name: 'Review',
		components: {
			XesNavbar,
			UniLoadMore
		},
		data() {
			return {
				list: [],
				loading: 'more',
				page: 1,
				totalPage: 1
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
			const response = await live_review({
				profession_id: uni.getStorageSync('profession_id'),
				page: this.page
			})
			const { data } = response.data.data
			this.list = [...this.list, data]
			this.loading = 'more'
		},
		methods: {
			async toData() {
				const response = await live_review({
					profession_id: uni.getStorageSync('profession_id'),
					page: 1
				})
				const { data, last_page } = response.data.data
				this.list = data
				this.totalPage = last_page
			}
		}
	}
</script>

<style lang="scss">
	.list {
		background-color: #F4F7F9;
		box-sizing: border-box;
		padding: 32upx 40upx;
		
		.item {
			border-radius: 20upx;
			overflow: hidden;
			margin-bottom: 40upx;
			background-color: #fff;
			
			.banner {
				width: 686upx;
				height: 300upx;
				overflow: hidden;
				
				.image {
					width: 100%;
					height: 100%;
					float: left;
				}
			}
			
			.info {
				padding: 32upx;
				background-color: #fff;
				
				.info-title {
					font-size: 28upx;
					font-weight: bold;
					color: #303133;
					margin-bottom: 24upx;
				}
				
				.space-between {
					display: flex;
					align-items: center;
					justify-content: space-between;
					
					.left {
						
						.user {
							display: flex;
							align-items: center;
							
							.avatar {
								width: 40upx;
								height: 40upx;
								border-radius: 50%;
							}
							
							.name {
								font-size: 24upx;
								font-weight: 500;
								color: #303133;
								margin: 0 18upx;
							}
							
							.post {
								font-size: 24upx;
								font-weight: 500;
								color: #909399;
							}
						}
						
						.time-number {
							font-size: 24upx;
							font-weight: 500;
							color: #606266;
							margin-top: 24upx;
							
							.time {
								margin-left: 32upx;
							}
						}
					}
					
					.button {
						width: 168upx;
						height: 64upx;
						background-color: #1283FF;
						border-radius: 32upx;
						font-size: 28upx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 64upx;
					}
				}
			}
		}
	}
</style>
