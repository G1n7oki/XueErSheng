<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="我的收藏"
			:is-arrow="true"
			text-align="center"
		/>
		<!-- 导航栏 end -->
		<!-- 空数据 start -->
		<empty v-if="show" />
		<!-- 空数据 end -->
		<!-- 列表 start -->
		<view v-else class="list">
			<view 
				class="item"
				v-for="(item, index) in favorite"
				:key="item.id"
				@longpress="handleItem(index)"
			>
				<image class="image" :src="item.cover" mode=""></image>
				<view class="info">
					<view class="name">
						{{ item.title }}
					</view>
					<view class="validity">
						课程有效期还剩：{{ item.validity }}天
					</view>
					<view class="price">
						{{ item.price }}<text>元</text>
					</view>
				</view>
			</view>
			<view class="tips">
				长按可以删除
			</view>
			<uni-load-more v-if="favorite.length > 5" :status="loading" />
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Empty from '@/components/empty/empty.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import { me_favorite } from '@/common/api/api.js'
	export default {
		name: 'Favorite',
		components: {
			XesNavbar,
			Empty,
			UniLoadMore
		},
		data() {
			return {
				favorite: [],
				show: false,
				loading: 'more',
				page: 1,
				totalPage: 1
			}
		},
		onLoad() {
			this.toData()
		},
		// 上拉加载
		async onReachBottom() {
			this.loading = 'loading'
			this.page++
			if (this.page > this.totalPage) {
				this.loading = 'noMore'
				return false
			}
			const response = await me_favorite({
				page: this.page
			})
			const { data } = response.data.data
			data.map(item => {
				item.validity = Math.floor(item.validity / 86400)
			})
			this.favorite = [...this.favorite, ...data]
			this.loading = 'more'
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await me_favorite()
				const { data, last_page } = response.data.data
				data.map(item => {
					item.validity = Math.floor(item.validity / 86400)
				})
				this.favorite = data
				this.show = this.favorite.length <= 0 ? true : false
				this.totalPage = last_page
				uni.hideLoading()
			},
			// 长按删除
			handleItem(index) {
				const that = this
				uni.showModal({
					title: '提示',
					content: '确定删除此条记录吗?',
					success(res) {
						res.confirm ? that.removeListItem(index) : console.log('取消')
					}
				})
			},
			// 数组删除
			removeListItem(index) {
				this.favorite.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}

	.list {
		padding: 32upx 32upx 0;
		background-color: #F4F7F9;

		.item {
			display: flex;
			width: 100%;
			box-sizing: border-box;
			padding: 32upx;
			background-color: #fff;
			border-radius: 20upx;
			margin-bottom: 32upx;
			
			.image {
				width: 212upx;
				height: 136upx;
			}
			
			.info {
				margin-left: 25upx;
				
				.name {
					width: 325upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 28upx;
					font-weight: bold;
					color: #303234;
				}
				
				.validity {
					font-size: 24upx;
					font-weight: 500;
					color: #606266;
					margin: 16upx 0;
				}
				
				.price {
					font-size: 32upx;
					font-family: DIN;
					font-weight: bold;
					color: #FA7A36;
					
					text {
						font-size: 20upx;
						margin-left: 8upx;
						font-weight: 500;
					}
				}
			}
		}
		
		.tips {
			font-size: 24upx;
			font-weight: 500;
			color: #606266;
			text-align: center;
		}
	}
</style>
