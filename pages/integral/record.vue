<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="兑换记录"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 列表 start -->
		<view class="list">
			<view class="item" v-for="n in 10" :key="n">
				<image class="image" src="http://dummyimage.com/250x250" mode=""></image>
				<view class="info">
					<view class="title">
						15元无门槛课程优惠券
					</view>
					<view class="indate" v-if="n % 2 === 0">
						有效期还剩：844天
					</view>
					<view class="date">
						2020.08.05-2023.12.15
					</view>
				</view>
			</view>
		</view>
		<!-- 列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Record',
		components: {
			XesNavbar
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 列表
	.list {
		background-color: #F4F7F9;
		padding: 32upx;
		
		.item {
			display: flex;
			background-color: #fff;
			border-radius: 10upx;
			padding: 32upx;
			margin-bottom: 32upx;
			
			.image {
				width: 212upx;
				height: 136upx;
				margin-right: 28upx;
			}
			
			.info {
				
				.title {
					font-size: 28upx;
					font-weight: bold;
					color: #303133;
				}
				
				.indate {
					font-size: 24upx;
					font-weight: 500;
					color: #606266;
					margin-top: 15upx;
				}
				
				.date {
					font-size: 24upx;
					font-family: DIN;
					font-weight: 500;
					color: #909399;
					margin-top: 10upx;
				}
			}
		}
	}
</style>
