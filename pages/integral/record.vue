<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="积分记录"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 没有记录 start -->
		<empty v-if="show" />
		<!-- 没有记录 end -->
		<!-- 记录 start -->
		<view v-else class="record">
			<view 
				class="item"
				v-for="(item, index) in 10"
				:key="index"
			>
				<view>
					<view class="title">
						积分商城兑换
					</view>
					<view class="date">
						2020.08.15  10:06:28
					</view>
				</view>
				<view class="number" :class="{'active': index % 2 === 0}">
					{{ index % 2 === 0 ? '-' : '+' }}154
				</view>
			</view>
			<!-- 加载更多 start -->
			<uni-load-more
				:status="loading"
				:iconSize="12"
			/>
			<!-- 加载更多 end -->
		</view>
		<!-- 记录 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import Empty from '@/components/empty/empty.vue'
	export default {
		name: 'IntegralRecord',
		components: {
			XesNavbar,
			UniLoadMore,
			Empty
		},
		data() {
			return {
				loading: 'more',
				show: true
			}
		},
		onReachBottom() {
			this.loading = 'loading'
			
			setTimeout(() => {
				this.loading = 'more'
			}, 1000)
		}
	}
</script>

<style lang="scss">
	.record {
		border-top: 1px solid #DEDEDE;
		padding-left: 32upx;
		
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #DEDEDE;
			padding: 40upx 32upx 40upx 0;
			
			.title {
				font-size: 28upx;
				font-weight: bold;
				color: #303133;
			}
			
			.date {
				font-size: 28upx;
				font-family: DIN;
				font-weight: 500;
				color: #909399;
				margin-top: 10upx;
			}
			
			.number {
				font-size: 36upx;
				font-family: DIN;
				font-weight: 500;
				color: #303133;
				
				&.active {
					color: #1283FF;
				}
			}
		}
	}
</style>
