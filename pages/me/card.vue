<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="我的卡包"
			text-align="center"
			:is-arrow="true"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<!-- 选项卡 start -->
		<view class="tabbar" :style="{top: top + 'px'}">
			<xes-text-tabbar
				:list="tabbar.list"
				:current="tabbar.current"
				@postId="toId"
			/>
		</view>
		<!-- 选项卡 end -->
		<empty v-if="card.show"/>
		<!-- 列表 start -->
		<view v-else class="list">
			<view
				class="item"
				v-for="card in card.list"
				:key="card.id"
			>
				<image class="stamp" :src="tabbar.current === 0 ? '' : tabbar.current === 1 ? usedUrl : dueUrl" mode=""></image>
				<view class="worth">
					<view class="type">
						{{ card.type === 1 ? '满减优惠券' : '课程月卡' }}
					</view>
					<view class="text" v-if="coupon.type === 1">
						<text class="unit">￥</text>
						{{ coupon.cut_money }}
					</view>
					<view class="text active" v-else>
						<view>
							课程
						</view>
						<view>
							月卡
						</view>
					</view>
				</view>
				<view class="explain">
					<view class="title">
						{{ coupon.type === 1 ? `每满${ coupon.need_money }使用` : '1个月使用期限' }}
					</view>
					<view class="source">
						{{ card.get_type === 1 ? '积分兑换' : card.get_type === 2 ? '签到获得' : '领取获得' }}
					</view>
					<view class="date">
						{{ card.valid_start }}~{{ card.valid_end }}
					</view>
				</view>
			</view>
			<uni-load-more v-if="card.list.length > 5" :status="card.loading" />
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import Empty from '@/components/empty/empty.vue'
	import { me_card } from '@/common/api/api.js'
	export default {
		name: 'Card',
		components: {
			XesNavbar,
			XesTextTabbar,
			Empty
		},
		data() {
			return {
				tabbar: {
					list: [{
						id: 0,
						name: '未使用'
					}, {
						id: 1,
						name: '已使用'
					}, {
						id: 2,
						name: '已过期'
					}],
					current: 0
				},
				top: 0, // tabbar的top值
				card: {
					list: [],
					page: 1,
					totalPage: 1,
					show: false,
					loading: 'more'
				},
				dueUrl: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/yiguoqi%402x.png',
				usedUrl: 'https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/yishiyong%402x.png'
			}
		},
		onLoad() {
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
			}).exec()
			
			this.toData()
		},
		// 上拉加载
		async onReachBottom() {
			this.card.loading = 'loading'
			const { totalPage } = this.card
			const page = ++this.card.page 
			if (page > totalPage) {
				this.card.loading = 'noMore'
				return false
			}
			const card = await me_card({
				page: this.card.page,
				status: this.tabbar.current
			})
			const { data } = card.data.data
			data.map(item => {
				item.valid_start = item.valid_start.substring(0, 10)
				item.valid_end = item.valid_end.substring(0, 10)
			})
			this.card.list = [...this.card.list, ...data]
			this.card.loading = 'more'
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await me_card({
					page: this.card.page,
					status: this.tabbar.current
				})
				const { data, last_page } = response.data.data
				data.map(item => {
					item.valid_start = item.valid_start.substring(0, 10)
					item.valid_end = item.valid_end.substring(0, 10)
				})
				this.card.list = data
				this.card.show = this.card.list.length <= 0 ? true : false
				this.card.totalPage = last_page
				uni.hideLoading()
			},
			toId(id) {
				this.tabbar.current = id
				this.card.page = 1
				this.card.list = []
				this.toData()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 选项卡
	.tabbar {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
	}
	// 列表
	.list {
		background-color: #F4F7F9;
		padding: 40upx 35upx 0;
		margin-top: 104upx;
		
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 192upx;
			position: relative;
			padding: 0 145upx 0 30upx;
			margin-bottom: 40upx;
			background: url('https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/border-1.png') 0 0 no-repeat;
			background-size: 100%;
			
			.stamp {
				width: 140upx;
				height: 112upx;
				border-radius: 50%;
				position: absolute;
				top: 50%;
				left: 30upx;
				transform: translateY(-50%);
			}
			
			.worth {
				display: flex;
				align-items: center;
				position: relative;
				z-index: 2;
				
				.type {
					display: flex;
					align-items: center;
					width: 42upx;
					height: 134upx;
					background-color: rgba(255, 211, 45, .68);
					font-size: 22upx;
					font-weight: 500;
					color: #C6272A;
					text-align: center;
					line-height: 24upx;
					box-sizing: border-box;
					border-radius: 6upx;
				}
				
				.text {
					font-size: 120upx;
					font-family: DIN;
					font-weight: bold;
					color: #C7282B;
					margin-left: 16upx;
					
					.unit {
						color: #E76262;
						font-size: 30upx;
					}
				}
			}
			
			.explain {
				text-align: center;
				
				.title {
					font-size: 28upx;
					font-weight: bold;
					color: #C6272A;
				}
				
				.source {
					font-size: 24upx;
					font-weight: 500;
					color: #C6272A;
					margin: 12upx 0;
				}
				
				.date {
					width: 190upx;
					height: 30upx;
					background-color: rgba(198, 39, 42, .68);
					border-radius: 15upx;
					font-size: 15upx;
					font-family: DIN;
					color: #FFFFFF;
					text-align: center;
					line-height: 30upx;
				}
			}
		}
	}
</style>
