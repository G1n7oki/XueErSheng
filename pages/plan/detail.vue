<template>
	<view class="container">
		<empty v-if="!image" />
		<view v-else>
			<view class="image">
				<image class="item" :src="image" mode=""></image>
			</view>
			<!-- 定位按钮 start -->
			<view class="fixed-button">
				<view class="slogan">
					参与筑梦计划享0元报名
				</view>
				<view class="consult" @click="call">
					<view class="line"></view>
					<uni-icons type="phone-filled" color="#fff" />
					<view class="text">
						咨询
					</view>
				</view>
				<navigator class="navigation" hover-class="none" :url="`/pages/plan/want?year=${year}&title=${title}&id=${id}&info_id=${info_id}`">立即报名</navigator>
			</view>
			<!-- 定位按钮 end -->
		</view>
	</view>
</template>

<script>
	import XesNavbar from '@/components/xes-navbar/xes-navbar.vue'
	import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import Empty from '@/components/empty/empty.vue'
	import { plan_detail } from '@/common/api/api.js'
	export default {
		name: 'PlanDetail',
		components: {
			XesNavbar,
			UniIcons,
			Empty
		},
		data() {
			return {
				show: true,
				image: '',
				year: '',
				title: '',
				id: '',
				info_id: ''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.toData(options.id)
		},
		methods: {
			async toData(id) {
				uni.showLoading({
					title: '加载中...'
				})
				const response = await plan_detail({
					type: id
				})
				const { image_url, year, title } = response.data.data
				this.image = image_url
				this.year = year
				this.title = title
				this.info_id = response.data.data.id
				uni.hideLoading()
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: '114'
				})
			}
		}
	}
</script>

<style lang="scss">
	.image {
		overflow: hidden;
		padding-bottom: 100upx;
		background-color: #F4F7F9;
		
		.item {
			width: 100%;
			float: left;
		}
	}
	
	.fixed-button {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		
		.slogan {
			width: 33.333%;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background-color: #FF9502;
			padding: 20upx 36upx;
			box-sizing: border-box;
		}
		
		.consult {
			display: flex;
			align-items: center;
			width: 33.333%;
			background-color: #FF9502;
			
			.line {
				width: 1px;
				height: 50upx;
				background-color: #fff;
				margin-right: 32upx;
			}
			
			.text {
				color: #fff;
				font-size: 28upx;
				margin-left: 10upx;
			}
		}
		
		.navigation {
			width: 33.333%;
			background-color: #FF4D4F;
			color: #fff;
			font-size: 32upx;
			line-height: 100upx;
			text-align: center;
		}
	}
</style>
