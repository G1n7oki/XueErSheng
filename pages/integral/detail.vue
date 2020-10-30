<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="兑换商品"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- banner start -->
		<view class="banner">
			<image class="image" src="http://dummyimage.com/720x480" mode=""></image>
		</view>
		<!-- banner end -->
		<view class="line-body">
			<!-- 信息 start -->
			<view class="info">
				<view class="title">
					时尚T恤一件（学尔升专属）
				</view>
				<view class="price">
					<view class="current">
						<view class="number">13</view>
						<text>积分</text>
					</view>
					<view class="history">
						<view class="number">680</view>
						<text>元</text>
					</view>
				</view>
				<view class="indate">
					有效期: <text>2019.05.08 ~ 2021.05.08</text>
				</view>
			</view>
			<!-- 信息 end -->
			<!-- 添加地址 start -->
			<view class="address">
				<view class="text">
					您还未选择收货地址
				</view>
				<image class="icon" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/integral/zengjia%402x.png" mode="" @click="toAddress"></image>
			</view>
			<!-- 添加地址 end -->
			<!-- 商品详情 start -->
			<view class="block">
				<title name="商品详情"/>
				<view class="block-inner">
					<rich-text :nodes="detail"></rich-text>
				</view>
			</view>
			<!-- 商品详情 end -->
			<!-- 使用说明 start -->
			<view class="block">
				<title name="使用说明"/>
				<view class="block-inner">
					<rich-text :nodes="explain"></rich-text>
				</view>
			</view>
			<!-- 使用说明 end -->
		</view>
		<!-- 固定按钮 start -->
		<view class="fixed-button">
			<button class="button" @click="conversion">立即兑换</button>
		</view>
		<!-- 固定按钮 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import Title from '@/components/title/Title.vue'
	import uButton from '@/components/u-button/uButton.vue'
	export default {
		name: 'IntegralDetail',
		components: {
			XesNavbar,
			Title,
			uButton
		},
		data() {
			return {
				detail: '<div>波德莱尔是散文诗的最初创造者之一。他说过：“当我们人类野心滋长的时候，谁没有梦想到那散文诗的神秘，－－声律和谐，而没有节奏，那立意的精辟辞章的跌宕，足以应付那心灵的情绪、思想的起伏和知觉的变幻。”。他还说：散文诗这种形式，“足以适应灵魂的抒情性的动荡、梦幻的波动和意识的惊跳。”动荡、波动、惊跳，这说出了散文诗的主要艺术特征。</div>',
				explain: '<div>散文诗是诗和文的渗透、交叉产生的新文体，如果说散文诗是散文与诗“嫁接”出来的品种，这也是没有疑问的。散文诗具有诗与散文的“两栖”特征，散文诗既吸收诗表现主观心灵和情绪的功能，也吸收了散文自由、随便抒怀状物的功能，并使两者浑然一体，形成了自己的独特性。可以说不熟悉诗与散文这两种文体，就很难创作散文诗。但是散文诗究竟是一种新的文体，还是如有人说的：散文诗是“散文的诗”和“诗的散文”？关键要看散文诗是否具有独特的艺术特征，或者说散文诗区别于诗和抒情散文的艺术特征是什么</div>'
			}
		},
		methods: {
			// 点击兑换
			conversion() {
				uni.showModal({
					title: '确定使用13积分兑换?',
					content: '请按照后续提示使用',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/integral/result'
							})
						}
					}
				})
			},
			toAddress() {
				uni.navigateTo({
					url: '/pages/set/address'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// banner
	.banner {
		width: 750upx;
		height: 480upx;
		overflow: hidden;
		
		.image {
			width: 100%;
			height: 100%;
			float: left;
			background-color: #eee;
		}
	}
	// inner
	.line-body {
		background-color: #F4F7F9;
		padding: 32upx 32upx 130upx;
		// 信息
		.info {
			background-color: #fff;
			border-radius: 20upx;
			padding: 34upx;
			
			.title {
				font-size: 32upx;
				font-weight: bold;
				color: #303133;
			}
			
			.price {
				display: flex;
				align-items: flex-end;
				margin: 15upx 0;
				
				.current {
					display: flex;
					align-items: center;
					
					.number {
						font-size: 44upx;
						font-family: DIN;
						font-weight: bold;
						color: #FA7935;
					}
					
					text {
						font-size: 20upx;
						font-weight: bold;
						color: #FA7935;
						margin-left: 5upx;
					}
				}
				
				.history {
					display: flex;
					align-items: center;
					margin-left: 20upx;
					
					.number {
						font-size: 32upx;
						font-family: DIN;
						font-weight: 500;
						text-decoration: line-through;
						color: #C0C4CC;
					}
					
					text {
						font-size: 18upx;
						font-weight: bold;
						color: #C0C4CC;
						margin-left: 5upx;
					}
				}
			}
			
			.indate {
				font-size: 24upx;
				font-weight: 500;
				color: #606266;
				
				text {
					font-family: DIN;
				}
			}
		}
		// 添加地址
		.address {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 20upx;
			padding: 36upx 32upx;
			margin-top: 32upx;
			
			.text {
				font-size: 28upx;
				font-weight: 500;
				color: #303133;
			}
			
			.icon {
				width: 32upx;
				height: 32upx;
			}
		}
		// 商品详情、使用说明
		.block {
			margin-top: 48upx;
			
			.block-inner {
				background-color: #fff;
				border-radius: 20upx;
				padding: 28upx 32upx;
				margin-top: 32upx;
			}
		}
	}
	
	.fixed-button {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 20upx 32upx;
		background-color: #fff;
		
		.button {
			height: 80upx;
			line-height: 80upx;
			background-color: #FA7935;
			border-radius: 12upx;
			font-size: 32upx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
