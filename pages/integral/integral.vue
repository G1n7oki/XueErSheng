<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="积分商城"
			text-align="center"
			:is-arrow="true"
			id="navbar"
		/>
		<!-- 导航栏 end -->
		<!-- 选项卡 start -->
		<view class="integral-note" :style="{top: top + 'px'}">
			<view class="integral">
				<image class="icon" src="" mode=""></image>
				<view class="text">
					积分 <text>120</text>
				</view>
			</view>
			<view class="line"></view>
			<navigator url="/pages/integral/record" hover-class="none" class="note">
				<image class="icon" src="" mode=""></image>
				<view class="text">
					兑换记录 
				</view>
				<view class="arrow"></view>
			</navigator>
		</view>
		<!-- 选项卡 end -->
		<!-- 列表 start -->
		<view class="list">
			<!-- 积分规则 -->
			<navigator url="/pages/integral/rule" hover-class="none" class="integral-rule">
				积分规则
			</navigator>
			<!-- title -->
			<title name="积分商城" />
			<!-- item -->
			<view class="item-list">
				<view class="item"
					v-for="(item, index) in 10"
					:key="index"
					@click="handleItem"
				>
					<image class="image" src="" mode=""></image>
					<view class="title">
						15元课程优惠券
					</view>
					<view class="price">
						500 <text class="unit">积分</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表 end -->
		<!-- 加载更多 start -->
		<uni-load-more 
			:status="loading"
			:iconSize="12"
		/>
		<!-- 加载更多 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import Title from '@/components/title/Title.vue'
	export default {
		name: 'Integral',
		components: {
			XesNavbar,
			UniLoadMore,
			Title
		},
		data() {
			return {
				top: 0,
				loading: 'more'
			}
		},
		onLoad() {
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
			}).exec()
		},
		onReachBottom() {
			this.loading = 'loading'
			
			setTimeout(() => {
				this.loading = 'more'
			}, 1000)
		},
		methods: {
			handleItem() {
				uni.navigateTo({
					url: '/pages/integral/detail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 
	.integral-note {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100upx;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		
		.line {
			width: 3upx;
			height: 40upx;
			background-color: #F4F7F9;
		}
		
		.integral, .note {
			display: flex;
			align-items: center;
			
			.icon {
				width: 27upx;
				height: 30upx;
				background-color: #eee;
			}
			
			.text {
				font-size: 28upx;
				font-weight: bold;
				color: #303133;
				margin: 0 14upx;
				
				text {
					margin-left: 23upx;
				}
			}
			
			.arrow {
				width: 12upx;
				height: 12upx;
				border-top: 1px solid #303133;
				border-right: 1px solid #303133;
				transform: rotate(45deg);
			}
		}
	}
	// 列表
	.list {
		margin-top: 100upx;
		padding: 0 32upx;
		
		.integral-rule {
			font-size: 28upx;
			font-weight: 500;
			color: #303133;
			padding: 20upx 0;
			text-align: right;
		}
		
		.item-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			
			.item {
				width: 326upx;
				margin-top: 32upx;
				background-color: #fff;
				border-radius: 20upx;
				overflow: hidden;
				padding-bottom: 24upx;
				
				.image {
					width: 326upx;
					height: 210upx;
					background-color: #eee;
				}
				
				.title {
					font-size: 28upx;
					font-weight: 500;
					color: #303133;
					padding-left: 19upx;
					margin: 6upx 0;
				}
				
				.price {
					padding-left: 19upx;
					font-size: 32upx;
					font-family: DIN;
					font-weight: bold;
					color: #FA7935;
					
					.unit {
						font-size: 20upx;
						margin-left: 8upx;
					}
				}
			}
		}
	}
</style>
