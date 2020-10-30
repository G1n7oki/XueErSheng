<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="地址管理"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 地址列表 start -->
		<view class="address-list">
			<view class="item" v-for="n in 3" :key="n">
				<view class="info">
					<view class="user-mobile-tips">
						<view class="username">
							周礼远
						</view>
						<view class="mobile">
							18870322365
						</view>
						<view class="tips" v-if="n === 0">
							默认
						</view>
					</view>
					<view class="address">
						江西省南昌市高新区紫阳大道3303号云中城B座3905
					</view>
				</view>
				<view class="edit">
					编辑
				</view>
			</view>
			<!-- 添加 start -->
			<navigator url="/pages/set/edit" hover-class="none" class="add">
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/integral/zengjia%402x.png" mode=""></image>
				<view class="text">添加新地址</view>
				<view class="arrow">
					<uni-icons type="arrowright" size="20" color="#C0C4CC" />
				</view>
			</navigator>
			<!-- 添加 end -->
		</view>
		<!-- 地址列表 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		name: 'Address',
		components: {
			XesNavbar,
			UniIcons
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 地址列表
	.address-list {
		margin-top: 20upx;
		background-color: #fff;
		
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32upx 0;
			border-bottom: 1px solid #DEDEDE;
			margin-left: 32upx;
			
			.info {
				
				.user-mobile-tips {
					display: flex;
					align-items: flex-end;
					
					.username {
						font-size: 32upx;
						font-weight: 500;
						color: #000000;
					}
					
					.mobile {
						font-size: 28upx;
						font-weight: 500;
						color: #909399;
						margin: 0 20upx;
					}
					
					.tips {
						width: 64upx;
						height: 32upx;
						background-color: #EEEEEE;
						border-radius: 4upx;
						font-size: 24upx;
						font-weight: 500;
						color: #909399;
						text-align: center;
						line-height: 32upx;
					}
				}
				
				.address {
					width: 562upx;
					font-size: 28upx;
					font-weight: 500;
					color: #606266;
					margin-top: 20upx;
				}
			}
			
			.edit {
				flex-shrink: 0;
				height: 40upx;
				padding: 0 32upx;
				border-left: 1px solid #F4F7F9;
				line-height: 40upx;
				font-size: 28upx;
				font-weight: 500;
				color: #909399;
			}
		}
		// 添加
		.add {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 32upx 0;
			margin-left: 32upx;
			
			.icon {
				width: 32upx;
				height: 32upx;
			}
			
			.text {
				font-size: 32upx;
				font-weight: 500;
				color: #303133;
				flex: 1;
				margin-left: 12upx;
			}
			
			.arrow {
				margin-right: 20upx;
			}
		}
	}
</style>
