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
		<!-- 列表 start -->
		<view class="list">
			<view 
				class="item"
				v-for="(item, index) in 10"
			>
				<view class="stamp"></view>
				<view class="worth">
					<view class="type">
						课程优惠券
					</view>
					<view class="text">
						<text class="unit">￥</text> 15
					</view>
				</view>
				<view class="explain">
					<view class="title">
						满199减100
					</view>
					<view class="source">
						签到获得
					</view>
					<view class="date">
						2019.04.05~2021.04.05
					</view>
				</view>
			</view>
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import XesTextTabbar from '@/components/xes-text-tabbar/xes-text-tabbar.vue'
	export default {
		name: 'Card',
		components: {
			XesNavbar,
			XesTextTabbar
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
				top: 0 // tabbar的top值
			}
		},
		onLoad() {
			const navbar = uni.createSelectorQuery().in(this)
			navbar.select('#navbar').boundingClientRect(navbar => {
				this.top = navbar.height
			}).exec()
		},
		methods: {
			toId(id) {
				this.tabbar.current = id
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
		padding: 40upx 35upx;
		margin-top: 104upx;
		
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 176upx;
			border: 1px solid #C6272A;
			position: relative;
			padding: 0 145upx 0 30upx;
			margin-bottom: 40upx;
			
			.stamp {
				width: 112upx;
				height: 112upx;
				background-color: #CDCDCD;
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
