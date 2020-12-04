<template>
	<view class="container">
		<!-- 导航栏 start -->
		<xes-navbar 
			title="成绩单"
			text-align="center"
			:is-arrow="true"
		/>
		<!-- 导航栏 end -->
		<!-- 成绩卡 start -->
		<view class="card">
			<view class="university">
				<image class="logo" :src="image" mode=""></image>
				<view class="professional">
					{{ name }}
				</view>
			</view>
			<image class="line" src="https://mdxes.oss-cn-shanghai.aliyuncs.com/ministatic/me/line.png" mode=""></image>
			<scroll-view class="info" scroll-y>
				<view class="tips">
					<view class="item">
						代码
					</view>
					<view class="item">
						课程名称
					</view>
					<view class="item">
						成绩
					</view>
				</view>
				<view class="content">
					<view class="cell" v-for="item in list" :key="item.id">
						<view class="item">
							{{ item.cours_code }}
						</view>
						<view class="item">
							{{ item.title }}
						</view>
						<view class="item">
							{{ item.point }}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 成绩卡 end -->
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import { me_transcript } from '@/common/api/api.js'
	export default {
		name: 'Transcript',
		components: {
			XesNavbar
		},
		data() {
			return {
				list: [],
				name: '', // 专业名称
				image: '' // 学校logo
			}
		},
		onLoad() {
			this.toData()
		},
		methods: {
			async toData() {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await me_transcript({
					profession_id: uni.getStorageSync('profession_id')
				})
				this.list = response.data.data
				if (this.list.length > 0) {
					this.name = this.list[0].name
					this.image = this.list[0].image
				}
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #F4F7F9;
	}
	// 成绩卡
	@mixin children-width {
		&:nth-child(1) {
			width: 82upx;
		}
		
		&:nth-child(2) {
			width: 224upx;
		}
		
		&:nth-child(3) {
			width: 60upx;
		}
	}
	
	.card {
		width: 686upx;
		height: 1000upx;
		margin: 0 auto;
		background-color: #fff;
		margin-top: 32upx;
		border-radius: 20upx;
		
		.university {
			text-align: center;
			padding-top: 80upx;
			
			.logo {
				width: 160upx;
				height: 160upx;
				border-radius: 50%;
				background-color: #eee;
			}
			
			.professional {
				font-size: 28upx;
				font-weight: bold;
				color: #000000;
				margin-top: 26upx;
			}
		}
		
		.line {
			width: 686upx;
			height: 23upx;
			margin: 90upx 0 80upx;
		}
		
		.info {
			height: 490upx;
			padding: 0 74upx;
			box-sizing: border-box;
			
			.tips {
				display: flex;
				justify-content: space-between;
				
				.item {
					font-size: 28upx;
					font-weight: 500;
					color: #90949A;
					text-align: center;
					
					@include children-width;
				}
			}
			
			.content {
				
				.cell {
					display: flex;
					justify-content: space-between;
					margin-top: 42upx;
					
					.item {
						font-size: 28upx;
						font-weight: bold;
						color: #000000;
						text-align: center;
						
						@include children-width;
					}
				}
			}
		}
	}
</style>
