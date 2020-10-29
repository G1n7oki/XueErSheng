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
			<view class="item">
				<view class="tips">
					LIVE
				</view>
				<image class="image" src="http://dummyimage.com/180x180" mode=""></image>
				<view class="info">
					<view class="title">
						金融管理本科专业解读全金融管理本科专业解读全
					</view>
					<view class="user">
						马正涛 <text>市政</text>
					</view>
					<view class="status">
						正在直播
					</view>
					<view class="watch">
						正在观看50人
					</view>
				</view>
				<button 
					class="button button-1"
					hover-class="none"
					type="default"
					@click="handleBtn"
				>
					正在直播
				</button>
			</view>
			<!-- 直播/预告卡片 end -->
			<view class="item">
				<view class="tips">
					LIVE
				</view>
				<image class="image" src="http://dummyimage.com/180x180" mode=""></image>
				<view class="info">
					<view class="title">
						金融管理本科专业解读全金融管理本科专业解读全
					</view>
					<view class="user">
						马正涛 <text>市政</text>
					</view>
					<view class="status">
						2020.10.10   18:00-20:00
					</view>
					<view class="watch">
						已预约50人
					</view>
				</view>
				<button 
					class="button button-2"
					hover-class="none"
					type="default"
					@click="handleBtn"
				>
					立即预约
				</button>
			</view>
			<view class="item">
				<image class="image" src="http://dummyimage.com/180x180" mode=""></image>
				<view class="info">
					<view class="title">
						金融管理本科专业解读全金融管理本科专业解读全
					</view>
					<view class="user">
						马正涛 <text>市政</text>
					</view>
					<view class="status">
						2020.10.10   18:00-20:00
					</view>
					<view class="watch">
						已预约50人
					</view>
				</view>
				<button 
					class="button button-3"
					hover-class="none"
					type="default"
					@click="handleBtn"
				>
					已预约
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	export default {
		name: 'Live',
		components: {
			XesNavbar
		},
		methods: {
			handleBtn() {
				uni.navigateTo({
					url: '/pages/live/live-play'
				})
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
